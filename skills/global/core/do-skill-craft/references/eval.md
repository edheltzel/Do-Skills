# Evaluate a skill

Eval is optional. Write mode does not run it.

An eval locks cases first, runs the skill in a fresh context, and has a separate judge grade the artifact. The record checker is `scripts/eval-record.mjs` in this skill. From the skill directory:

```bash
node scripts/eval-record.mjs check record.json
```

Exit 0 means the record is internally consistent. The checker compares the saved prompts with the ones it builds, reads one `VERDICT` from the judge reply and matches it to `outcome`, keeps an evidence quote only when that quote appears in the artifact, requires a label for each miss in the generation being read, and requires every case again after each edit. It does not prove those prompts were the only text a separate context received. Save the runner prompt, the judge prompt, and the judge reply for each attempt. Those transcripts are the execution proof.

## Lock the cases

Stop and ask if any of these is missing. Name the missing piece. Do not invent a case to fill a gap.

- The target skill, a real `SKILL.md` you can read. If more than one skill fits, name the matches and ask which one to use.
- What the skill is for, in one sentence taken from the skill. If the skill does not say, ask. That sentence stays put for the whole eval. It is what the judge grades against.
- At least one fixed case. Each case has an id, the input the skill will receive, and criteria. The input is concrete: a prompt, a file, a diff, a fixture. "Make this better" is not an input. Criteria say what is true of a good artifact. Write them so a judge can apply them without asking what you hoped would happen.

A preferred verdict is optional. It is your grade for that case: pass, fail, or a longer note about the result you expect. Store it only on the case. A longer note must not appear in the skill text, the input, the criteria, or either prompt. The words `pass` and `fail` are the outcome labels, so a preferred verdict that is only one of those words is not a separate secret.

Criteria are their own field. Do not paste them into the skill text or reuse one of their sentences as the input. The checker rejects a runner prompt that contains a case's criteria, or another case's input.

## Fresh runner, separate judge

One runner per case per attempt. Its prompt is the skill and that case's input, built by the checker (`runnerPrompt`). It does not receive the criteria, the preferred verdict, the other cases, or a hint about the grade. A repeat is a new context, not a follow-up in the same one.

The judge's prompt is one artifact, that case's criteria, and the sentence about what the skill is for (`judgePrompt`). The judge cites a quote from the artifact. It does not receive the preferred verdict, the other artifacts, or an instruction to make the case pass.

If this host cannot start another context, say that in the report and stop. Running the skill in this chat is not a fresh runner. Grading the artifact in this chat is not a separate judge.

If the skill has to write files, point the runner at an empty directory. When it returns, run `git status` in the checkout you mean to keep and remove files the run added.

## Read the result

Keep the judge's whole reply on the run as `judgeResponse`. It has one `VERDICT: pass` or `VERDICT: fail`, then `EVIDENCE:` and a quote. `outcome` has to be that verdict. The quote has to appear in the artifact, either as the evidence text or inside double quotes in that evidence. The checker copies that quote into the report. If the reply has no single verdict, or the quote is not in the artifact, the run has no outcome yet. Do not pick one for them.

For a case that matters, or a verdict that is close, run it two or three times, each in a fresh context. The summary is a count such as `2/3`. If the runs disagree, `stable` is false. Report the count. Do not replace a split with a single pass or fail.

## Label a miss

A case that is not a stable run of passes needs one label:

- **Skill defect.** The criteria match what the skill is for, and the skill did not produce that behavior. Say what to change. Apply the writing principles to the edit, and use a failure mode named there when one of them fits.
- **Bad case.** The criteria ask for something the skill should not do, or they reject an artifact the skill was right to produce. Say why. Leave the skill alone. The checker rejects an edit blamed on that case.

A miss has one label, not both. The label belongs to the generation you are reading. After an edit, a new miss needs its own label. The earlier label stays on the earlier generation.

## Edit, then rerun every case

Change the skill only for a skill defect, and only the part that miss points at. The edit event carries the new skill text.

Then rerun every fixed case, including cases that passed. An edit can break a case that was fine. The checker rejects the record while any later generation is missing a case.

Stop when the counts are acceptable, or when a remaining miss is a bad case, or when the skill cannot express the case. Report that limit. Leave the skill as it is when the case is the thing that is wrong.

## Report

Per case and generation: the count, the quotes, and the label if that generation missed. Then the edit, if you made one, and the rerun of every case. A passing check is the mechanical half. The transcripts beside the record are the half that shows the runner and the judge were separate contexts.

`record.json` uses this shape. `events` are in the order they happened. Prompts are the strings the checker builds, copied verbatim.

```json
{
  "skill": "the skill text at the start",
  "principles": "what the skill is for",
  "cases": [
    { "id": "pine", "input": "the input", "criteria": "what a good artifact does", "preferredVerdict": "optional note" }
  ],
  "events": [
    { "type": "run", "caseId": "pine", "outcome": "fail", "artifact": "the runner's artifact", "runnerPrompt": "", "judgePrompt": "", "judgeResponse": "VERDICT: fail\nEVIDENCE: \"a quote from the artifact\"" },
    { "type": "diagnosis", "caseId": "pine", "kind": "skill-defect", "reason": "what is wrong" },
    { "type": "edit", "caseId": "pine", "change": "what you changed", "skill": "the full skill text after the edit" }
  ]
}
```

`kind` is `skill-defect` or `bad-case`. After an edit, more `run` events follow, one or more for every case id.
