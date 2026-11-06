#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const OUTCOMES = new Set(["pass", "fail"]);

function fail(message) {
  const error = new Error(message);
  error.code = "EVAL_RECORD";
  throw error;
}

function text(value, label) {
  if (typeof value !== "string" || !value.trim()) fail(`${label} is required`);
  return value;
}

function caseById(state, caseId) {
  const found = state.cases.find((entry) => entry.id === caseId);
  if (!found) fail(`unknown case ${caseId}`);
  return found;
}

function runsFor(state, caseId, generation) {
  return state.runs.filter((run) => run.caseId === caseId && run.generation === generation);
}

function cleared(summary) {
  return summary.stable && summary.passes === summary.total;
}

function leak(haystack, verdict) {
  if (!verdict) return;
  const note = verdict.trim();
  if (OUTCOMES.has(note.toLowerCase())) return;
  if (haystack.includes(note)) fail("preferred verdict leaked into a runner or judge prompt");
}

export function summarizeRuns(outcomes) {
  if (!Array.isArray(outcomes) || outcomes.length === 0) fail("a count needs at least one run");
  let passes = 0;
  for (const outcome of outcomes) {
    if (!OUTCOMES.has(outcome)) fail("a run is pass or fail");
    if (outcome === "pass") passes += 1;
  }
  return { count: `${passes}/${outcomes.length}`, stable: passes === 0 || passes === outcomes.length, passes, total: outcomes.length };
}

export function openEval({ skill, principles, cases }) {
  text(skill, "target skill");
  text(principles, "what the skill is for");
  if (!Array.isArray(cases) || cases.length === 0) fail("eval needs at least one fixed case");
  const seen = new Set();
  const locked = cases.map((entry) => {
    const id = text(entry?.id, "case id");
    if (seen.has(id)) fail(`duplicate case id ${id}`);
    seen.add(id);
    const preferredVerdict = entry?.preferredVerdict == null || entry.preferredVerdict === "" ? null : String(entry.preferredVerdict);
    return Object.freeze({
      id,
      input: text(entry?.input, `case ${id} input`),
      criteria: text(entry?.criteria, `case ${id} criteria`),
      preferredVerdict,
    });
  });
  return { skill, principles, cases: Object.freeze(locked), runs: [], diagnoses: [], edits: [], generation: 0 };
}

function diagnosisFor(state, caseId, generation) {
  return state.diagnoses.find((entry) => entry.caseId === caseId && entry.generation === generation) || null;
}

export function readJudge(judgeResponse, artifact) {
  const response = text(judgeResponse, "judge response");
  const body = text(artifact, "artifact");
  const verdicts = [...response.matchAll(/VERDICT:\s*(pass|fail)\b/g)].map((match) => match[1]);
  if (verdicts.length !== 1) fail("the judge response needs one VERDICT");
  const evidenceMatch = response.match(/EVIDENCE:\s*([\s\S]+)/);
  if (!evidenceMatch) fail("the judge response needs EVIDENCE");
  const evidence = evidenceMatch[1].trim();
  const quoted = [...evidence.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  const spans = quoted.length ? quoted : [evidence];
  for (const span of spans) {
    if (!body.includes(span)) fail("judge evidence is not in the artifact");
  }
  return { verdict: verdicts[0], quote: spans[0] };
}

export function runnerPrompt(state, caseId) {
  const entry = caseById(state, caseId);
  const prompt = `Follow this skill on the input. Return only the artifact.\n\nSkill:\n${state.skill}\n\nInput:\n${entry.input}\n`;
  for (const item of state.cases) {
    leak(prompt, item.preferredVerdict);
    if (item.id !== entry.id && item.input !== entry.input && prompt.includes(item.input)) {
      fail(`runner for ${entry.id} includes another case`);
    }
    if (prompt.includes(item.criteria)) fail(`runner for ${entry.id} includes criteria`);
  }
  return prompt;
}

export function judgePrompt(state, caseId, artifact) {
  const entry = caseById(state, caseId);
  const body = text(artifact, "artifact");
  const prompt = `Grade this one artifact against the criteria. Cite a quote from the artifact.\nReply VERDICT: pass or VERDICT: fail, then EVIDENCE: and the quote.\n\nWhat the skill is for:\n${state.principles}\n\nCriteria:\n${entry.criteria}\n\nArtifact:\n${body}\n`;
  for (const item of state.cases) leak(prompt, item.preferredVerdict);
  return prompt;
}

export function recordRun(state, caseId, { outcome, artifact, judgeResponse }) {
  caseById(state, caseId);
  const judged = readJudge(judgeResponse, artifact);
  if (outcome !== judged.verdict) fail(`outcome ${outcome} does not match the judge VERDICT ${judged.verdict}`);
  state.runs.push({ caseId, outcome: judged.verdict, artifact, quote: judged.quote, judgeResponse, generation: state.generation });
  return state;
}

export function noteDiagnosis(state, caseId, kind, reason) {
  caseById(state, caseId);
  if (kind !== "skill-defect" && kind !== "bad-case") fail("a miss is a skill defect or a bad case");
  if (diagnosisFor(state, caseId, state.generation)) fail(`case ${caseId} already has a label for this generation`);
  state.diagnoses.push({ caseId, generation: state.generation, kind, reason: text(reason, "diagnosis reason") });
  return state;
}

export function proposeEdit(state, caseId, change, skill) {
  for (const entry of state.cases) {
    const outcomes = runsFor(state, entry.id, state.generation).map((run) => run.outcome);
    if (outcomes.length === 0) fail(`run every case before an edit; missing ${entry.id}`);
    if (!cleared(summarizeRuns(outcomes)) && !diagnosisFor(state, entry.id, state.generation)) fail(`label ${entry.id} before an edit`);
  }
  const diagnosis = diagnosisFor(state, caseId, state.generation);
  if (!diagnosis || diagnosis.kind !== "skill-defect") fail("an edit has to come from a skill defect");
  const outcomes = runsFor(state, caseId, state.generation).map((run) => run.outcome);
  if (cleared(summarizeRuns(outcomes))) fail("a passing case is not a reason to edit the skill");
  text(change, "edit");
  const nextSkill = text(skill, "edited skill");
  if (nextSkill === state.skill) fail("an edit has to change the skill");
  state.skill = nextSkill;
  state.edits.push({ caseId, change });
  state.generation += 1;
  return state;
}

export function rerunIds(state) {
  return state.cases.map((entry) => entry.id);
}

export function assertRerunComplete(state) {
  for (let generation = 1; generation <= state.generation; generation += 1) {
    const missing = state.cases.filter((entry) => runsFor(state, entry.id, generation).length === 0).map((entry) => entry.id);
    if (missing.length) fail(`rerun every case after an edit; generation ${generation} is missing ${missing.join(", ")}`);
  }
  for (const entry of state.cases) {
    const outcomes = runsFor(state, entry.id, state.generation).map((run) => run.outcome);
    if (outcomes.length === 0) fail(`case ${entry.id} has no runs`);
    if (!cleared(summarizeRuns(outcomes)) && !diagnosisFor(state, entry.id, state.generation)) fail(`case ${entry.id} needs a skill-defect or bad-case label`);
  }
  return { complete: true, generation: state.generation };
}

export function report(state) {
  return {
    generation: state.generation,
    cases: state.cases.map((entry) => {
      const counts = [];
      for (let generation = 0; generation <= state.generation; generation += 1) {
        const runs = runsFor(state, entry.id, generation);
        if (!runs.length) continue;
        const diagnosis = diagnosisFor(state, entry.id, generation);
        counts.push({
          generation,
          ...summarizeRuns(runs.map((run) => run.outcome)),
          quotes: runs.map((run) => run.quote),
          diagnosis: diagnosis ? { kind: diagnosis.kind, reason: diagnosis.reason } : null,
        });
      }
      return { id: entry.id, counts };
    }),
  };
}

export function checkRecord(record) {
  const state = openEval(record);
  if (!Array.isArray(record.events)) fail("record needs events");
  for (const event of record.events) {
    const keys = Object.keys(event).sort().join(",");
    if (event.type === "run") {
      if (!Object.hasOwn(event, "judgeResponse")) fail("a run needs the judge response");
      if (keys !== "artifact,caseId,judgePrompt,judgeResponse,outcome,runnerPrompt,type") fail("a run records the prompts that were sent");
      const runner = runnerPrompt(state, event.caseId);
      const judge = judgePrompt(state, event.caseId, event.artifact);
      if (event.runnerPrompt !== runner) fail(`runner prompt for ${event.caseId} is not the fresh-context prompt`);
      if (event.judgePrompt !== judge) fail(`judge prompt for ${event.caseId} is not the independent judge prompt`);
      recordRun(state, event.caseId, event);
    } else if (event.type === "diagnosis") {
      if (keys !== "caseId,kind,reason,type") fail("a diagnosis is a skill defect or a bad case with a reason");
      noteDiagnosis(state, event.caseId, event.kind, event.reason);
    } else if (event.type === "edit") {
      if (keys !== "caseId,change,skill,type") fail("an edit records the case, the change, and the new skill");
      proposeEdit(state, event.caseId, event.change, event.skill);
    } else fail("unknown event");
  }
  assertRerunComplete(state);
  return report(state);
}

function main() {
  const [command, file] = process.argv.slice(2);
  if (command !== "check" || !file) {
    console.error("usage: node scripts/eval-record.mjs check <record.json>");
    process.exit(2);
  }
  try {
    const record = JSON.parse(readFileSync(file, "utf8"));
    console.log(JSON.stringify(checkRecord(record), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
