import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { promisify } from "node:util";
import {
  checkRecord,
  judgePrompt,
  noteDiagnosis,
  openEval,
  proposeEdit,
  recordRun,
  rerunIds,
  runnerPrompt,
  summarizeRuns,
} from "./eval-record.mjs";

const execute = promisify(execFile);
const skillDirectory = fileURLToPath(new URL("..", import.meta.url));

const PREFERRED = "GRADE-PINE-EXPECT-FAIL-9f3a";
const OTHER_PREFERRED = "GRADE-OAK-EXPECT-FAIL-9f3a";

function base() {
  return openEval({
    skill: "SKILL-V1 reply APPLE",
    principles: "Reply with the one word the user named.",
    cases: [
      {
        id: "pine",
        input: "Reply with the single word PINE.",
        criteria: "The artifact is the single word PINE.",
        preferredVerdict: PREFERRED,
      },
      {
        id: "oak",
        input: "Reply with the single word OAK.",
        criteria: "The artifact is the single word OAK.",
        preferredVerdict: OTHER_PREFERRED,
      },
    ],
  });
}

function run(state, caseId, outcome, artifact) {
  return {
    type: "run",
    caseId,
    outcome,
    artifact,
    runnerPrompt: runnerPrompt(state, caseId),
    judgePrompt: judgePrompt(state, caseId, artifact),
  };
}

test("the skill name stays put and the description still loads", async () => {
  const source = await readFile(new URL("../SKILL.md", import.meta.url), "utf8");
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(frontmatter);
  assert.match(frontmatter[1], /^name: do-skill-craft$/m);
  const folded = frontmatter[1].match(/description: >-\n([\s\S]*)$/);
  assert.ok(folded);
  const description = folded[1].trim().replace(/\n\s*/g, " ");
  assert.ok(description.length > 0 && description.length <= 1024);
  assert.match(description, /evaluate a skill against fixed cases/);
  const evalReference = await readFile(new URL("../references/eval.md", import.meta.url), "utf8");
  assert.doesNotMatch(evalReference, /\]\([^)]+\)/);
});

test("a fixed case needs a concrete input and explicit criteria", () => {
  assert.throws(() => openEval({ skill: "S", principles: "P", cases: [{ id: "a", input: "  ", criteria: "done" }] }), /input is required/);
  assert.throws(() => openEval({ skill: "S", principles: "P", cases: [{ id: "a", input: "go", criteria: "" }] }), /criteria is required/);
  assert.throws(() => openEval({ skill: "S", principles: "P", cases: [] }), /at least one fixed case/);
  assert.throws(() => openEval({
    skill: "S",
    principles: "P",
    cases: [
      { id: "a", input: "one", criteria: "first" },
      { id: "a", input: "two", criteria: "second" },
    ],
  }), /duplicate case id/);
});

test("locked cases reject a later criteria swap", () => {
  const state = base();
  assert.throws(() => {
    state.cases[0].criteria = "changed after the run";
  }, TypeError);
});

test("the runner prompt is that case's skill and input", () => {
  const state = base();
  const prompt = runnerPrompt(state, "pine");
  assert.match(prompt, /SKILL-V1 reply APPLE/);
  assert.match(prompt, /Reply with the single word PINE\./);
  assert.doesNotMatch(prompt, /single word OAK/);
  assert.doesNotMatch(prompt, /The artifact is the single word/);
  assert.doesNotMatch(prompt, new RegExp(PREFERRED));
  assert.doesNotMatch(prompt, new RegExp(OTHER_PREFERRED));
});

test("the judge sees criteria and the artifact, not the preferred verdict", () => {
  const state = base();
  const prompt = judgePrompt(state, "pine", "APPLE");
  assert.match(prompt, /Reply with the one word the user named\./);
  assert.match(prompt, /The artifact is the single word PINE\./);
  assert.match(prompt, /Artifact:\nAPPLE/);
  assert.doesNotMatch(prompt, /The artifact is the single word OAK\./);
  assert.doesNotMatch(prompt, new RegExp(PREFERRED));
  assert.doesNotMatch(prompt, new RegExp(OTHER_PREFERRED));
});

test("a split result stays a count", () => {
  const summary = summarizeRuns(["pass", "fail", "pass"]);
  assert.deepEqual(summary, { count: "2/3", stable: false, passes: 2, total: 3 });
  assert.equal("passed" in summary, false);
  assert.equal("verdict" in summary, false);
  const steady = summarizeRuns(["fail", "fail"]);
  assert.equal(steady.count, "0/2");
  assert.equal(steady.stable, true);
  assert.equal("passed" in steady, false);
});

test("a bad case blocks an edit, and a skill defect allows one", () => {
  const state = base();
  recordRun(state, "pine", { outcome: "fail", artifact: "APPLE" });
  recordRun(state, "oak", { outcome: "fail", artifact: "APPLE" });
  noteDiagnosis(state, "pine", "skill-defect", "The skill says APPLE instead of the named word.");
  noteDiagnosis(state, "oak", "bad-case", "The criteria contradict what the skill is for.");
  assert.throws(() => proposeEdit(state, "oak", "teach BANANA", "SKILL-V2 say BANANA"), /skill defect/);
  proposeEdit(state, "pine", "Tell the runner to use the named word.", "SKILL-V2 use the named word");
  assert.match(runnerPrompt(state, "oak"), /SKILL-V2 use the named word/);
  assert.doesNotMatch(runnerPrompt(state, "oak"), /SKILL-V1/);
  assert.deepEqual(rerunIds(state), ["pine", "oak"]);
});

test("an edit is unfinished until every case has a later run", () => {
  const state = base();
  const first = [
    run(state, "pine", "fail", "APPLE"),
    run(state, "oak", "pass", "OAK"),
  ];
  state.skill = "SKILL-V1 reply APPLE";
  const recorded = { skill: state.skill, principles: state.principles, cases: state.cases, events: first };
  recorded.events.push({ type: "diagnosis", caseId: "pine", kind: "skill-defect", reason: "The skill says APPLE." });
  const edited = "SKILL-V2 use the named word";
  recorded.events.push({ type: "edit", caseId: "pine", change: "Use the named word.", skill: edited });
  const afterEdit = openEval(recorded);
  for (const event of first) if (event.type === "run") recordRun(afterEdit, event.caseId, event);
  noteDiagnosis(afterEdit, "pine", "skill-defect", "The skill says APPLE.");
  proposeEdit(afterEdit, "pine", "Use the named word.", edited);
  recorded.events.push(run(afterEdit, "pine", "pass", "PINE"));
  assert.throws(() => checkRecord(recorded), /generation 1 is missing oak/);
  recorded.events.push(run(afterEdit, "oak", "pass", "OAK"));
  const report = checkRecord(recorded);
  assert.equal(report.generation, 1);
  assert.equal(report.cases.find((entry) => entry.id === "oak").counts[1].count, "1/1");
  assert.equal(report.cases.find((entry) => entry.id === "pine").counts[0].count, "0/1");
  assert.equal(report.cases.find((entry) => entry.id === "pine").counts[1].count, "1/1");
});

test("a disagreed rerun is not stored as a pass", () => {
  const state = base();
  const events = [
    run(state, "pine", "fail", "APPLE"),
    run(state, "pine", "pass", "PINE"),
    run(state, "oak", "pass", "OAK"),
  ];
  const record = { skill: state.skill, principles: state.principles, cases: state.cases, events };
  assert.throws(() => checkRecord(record), /pine needs a skill-defect or bad-case label/);
  events.splice(2, 0, { type: "diagnosis", caseId: "pine", kind: "skill-defect", reason: "The runs disagree and one artifact is APPLE." });
  const report = checkRecord(record);
  const pine = report.cases.find((entry) => entry.id === "pine");
  assert.equal(pine.counts[0].count, "1/2");
  assert.equal(pine.counts[0].stable, false);
  assert.equal(pine.diagnosis.kind, "skill-defect");
});

test("the checker rejects a prompt that was not the fresh-context prompt", () => {
  const state = base();
  const event = run(state, "pine", "fail", "APPLE");
  event.judgePrompt = `${event.judgePrompt}\n${PREFERRED}`;
  assert.throws(() => checkRecord({
    skill: state.skill,
    principles: state.principles,
    cases: state.cases,
    events: [event, run(state, "oak", "pass", "OAK")],
  }), /not the independent judge prompt|preferred verdict leaked/);
});

test("check command accepts a finished record and rejects a partial rerun", async () => {
  const state = base();
  const events = [run(state, "pine", "fail", "APPLE"), run(state, "oak", "fail", "APPLE")];
  events.push({ type: "diagnosis", caseId: "pine", kind: "skill-defect", reason: "The skill says APPLE." });
  events.push({ type: "diagnosis", caseId: "oak", kind: "bad-case", reason: "OAK's criteria do not match the skill." });
  const directory = await mkdtemp(join(tmpdir(), "skill-eval-"));
  try {
    const partial = join(directory, "partial.json");
    const next = "SKILL-V2 use the named word";
    const replay = openEval(state);
    recordRun(replay, "pine", { outcome: "fail", artifact: "APPLE" });
    recordRun(replay, "oak", { outcome: "fail", artifact: "APPLE" });
    noteDiagnosis(replay, "pine", "skill-defect", "The skill says APPLE.");
    noteDiagnosis(replay, "oak", "bad-case", "OAK's criteria do not match the skill.");
    events.push({ type: "edit", caseId: "pine", change: "Use the named word.", skill: next });
    proposeEdit(replay, "pine", "Use the named word.", next);
    events.push(run(replay, "pine", "pass", "PINE"));
    await writeFile(partial, JSON.stringify({ skill: state.skill, principles: state.principles, cases: state.cases, events }));
    const rejected = await execute(process.execPath, ["scripts/eval-record.mjs", "check", partial], { cwd: skillDirectory }).then(() => {
      throw new Error("partial record should fail");
    }, (error) => error);
    assert.equal(rejected.code, 1);
    assert.match(rejected.stderr, /missing oak/);
    events.push(run(replay, "oak", "fail", "OAK"));
    const finished = join(directory, "finished.json");
    await writeFile(finished, JSON.stringify({ skill: state.skill, principles: state.principles, cases: state.cases, events }));
    const accepted = await execute(process.execPath, ["scripts/eval-record.mjs", "check", finished], { cwd: skillDirectory });
    const report = JSON.parse(accepted.stdout);
    assert.equal(report.cases.find((entry) => entry.id === "oak").diagnosis.kind, "bad-case");
    assert.equal(report.cases.find((entry) => entry.id === "pine").counts[1].count, "1/1");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
