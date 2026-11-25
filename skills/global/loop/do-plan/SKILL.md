---
name: do-plan
description: "Implementation plan as ordered units, each with a verification check. Use when asked to plan, break down implementation, or plan from a requirements file. NOT FOR figuring out what to build (do-brainstorm), executing the plan (do-work), attacking the idea (do-redteam), PRD or spec prose (do-tech-writing), or UX flow trees (do-ux-flow-plan)."
---

# Plan

Answer HOW. `do-brainstorm` answered WHAT, when it ran. A prior requirements file is optional. This skill does not implement, dispatch research agents, render HTML, or raise a model tier.

**Done:** the plan file is written, `do-doc-review` has finished or the run is `blocked` because it did not, and Next was shown, the plan was handed to Empryo plan mode, or a caller return was sent.

## Intake

Strip `mode:return-to-caller` if present and remember caller mode. Input is a requirements path, a feature description, or an existing plan path. If none, ask what to plan and wait.

Read a passed requirements file. Do not invent product behavior, scope, or success it does not contain. If those are missing, name the gap, write no units that depend on a guess, and set status `needs-human`.

An existing plan path is revised in place. Otherwise write a new file. Read the code the units will touch yourself. No subagent research pass.

## Write

Location: project `AGENTS.md` override for plan paths, else `docs/plans/`. Create it if missing.

Two files, same stem. `YYYY-MM-DD-<topic>-plan.md` is the agent version, and `YYYY-MM-DD-<topic>-plan.human.md` is the human version. Local date, short lowercase hyphenated topic. If the path exists, append `-2`, then `-3`. Do not overwrite a requirements file.

The human version follows [plans.md](https://github.com/edheltzel/GAP/blob/master/global/docs/agents/plans.md): a diagram or table first, then goal, now, next, and risks, on one screen. It carries the same steps and status as the agent version and no code, diffs, or long file lists. Update it whenever the agent version changes, including after a review revises the plan.

```
# <topic>

## Outcome
<from the requirements or the request, not a new product decision>

## Implementation Units
### U1. <name>
- Depends on: none
- Files: <paths this unit may create or edit>
- Change: <what changes>
- Done when: <observable>
- Verify: <command or check a later run can fail>

## Out of scope
## Blockers
## todo.txt
- <one line per follow-up>
```

Listed order is the run order. A later unit depends only on earlier ones. `Depends on` is that edge. `Files` are the only paths the unit owns. `Verify` is the verification note, including any test the plan names. Do not write a unit with no Verify line. Deferred detail is fine. An unverifiable step is not. Out of scope repeats the requirements boundary plus anything this plan refuses to pick up.

A Blocker line is a blocking question. Omit `## Blockers` when there are none. Do not offer build while one is open. `## todo.txt` always ends the file. Add its lines to the repo-root `todo.txt` with `do-todo`, if installed, tagged `+<project>` (lowercased repo-root basename) and `note:<absolute artifact path>`.

Do not change product code. A short sketch inside a unit is fine when it shows the change. Running the change belongs to `do-work`.

## Review

Invoke `do-doc-review`, if installed, in this session. Invoke the skill, not a subagent. Pass `mode:return-to-caller`, the absolute plan path, and this permission: fix gaps in units and verification so the plan matches the requirements. Do not change settled product decisions. Wait for its `status` and path. It edits the plan in place.

Not installed: say the review did not run. Do not write `Review complete` yourself. Caller mode returns `status: blocked` and names `do-doc-review` as the recovery. Interactive mode does not offer `do-work` until a review has run, unless the user asks for that rung anyway.

`needs-human` or `blocked` from the review sticks. Do not offer a build rung while that status holds. If the user answers the gap, revise the plan and run the review again. Caller mode: skip Next. Return `status: done | blocked | needs-human` plus the absolute artifact path. `done` only when the review finished and no blocker remains. A review that never started is not `done`.

## Approve

Interactive mode only, after the review finished with no blocker. Caller mode skips this section and Next.

**Plannotator.** Installed means a `plannotator` tool exists or `command -v plannotator` succeeds. Open the plan there without asking. If a Plannotator annotate tool exists (its name starts with `plannotator`), call it on the absolute plan path with the gate on, following its schema, end the turn, and wait for the feedback message. Otherwise run `plannotator annotate <absolute plan path> --gate --json` with a long or no timeout. It blocks until the user acts.

- `annotated`: revise the plan from the feedback, run Review again, then open it in Plannotator again.
- `approved`: continue to Empryo.
- `dismissed` or `denied`: go to Next.
- Any other decision: treat it as `annotated` when it carries feedback, otherwise as `dismissed`.

Not installed: continue to Empryo.

**Empryo.** Empryo is active only when the Empryo-only tools `final_response`, `genome_query` and `code_script` are all present (https://github.com/edheltzel/GAP/blob/master/global/docs/agents/harness-detection.md). Not active or unsure: go to Next, as before. `plan` may be a deferred tool that is missing from the visible list: load it with `tool_search("plan")` first, or call it through `run_tool({name: "plan", args: {...}})`. A `describe` lookup only inspects it. Go to Next only when that load fails. Otherwise hand the plan to Empryo plan mode with the `plan` tool:

- `title`: the topic. `depth`: `light`. `context`: the Outcome, the absolute plan path, and the line `Build with do-work, passing <absolute plan path>, unit by unit with each Verify.`
- `steps`: one per unit, in order. `id` is `U1`, `U2`, and so on. `label` is the unit name. `details` holds Change, Done when and Verify. The first step's `details` also start with the do-work line from `context`. `targetFiles` is the unit's Files.
- `files`: every path in the units' Files, with `create`, `modify` or `delete` and what changes there.
- `verification`: the Verify lines.

Empryo shows the plan with Implement, Clear & Implement and Revise, and saves its copy as `.empryo/plans/plan-*.md`. That review is the gate, so skip Next. On Implement or Clear & Implement, load `do-work` and build from the plan file, not from Empryo's checklist alone, so each unit's Verify and do-work's own Next still run. On Revise, change the plan file, run Review, and hand it over again. Outside plan mode the `plan` tool rejects a plan with fewer than 3 files. An agent cannot switch the tab's mode, so ask the user to run `/mode plan`, then hand it over again. When the user asks to review Empryo's copy in Plannotator, run the Plannotator step with that `.empryo/plans/plan-*.md` path.

## Next

End with this block. Run the next skill only when the user picks it. When a caller started this run (`mode:return-to-caller`, used by `do-it`), skip the block and return `status: done | blocked | needs-human` plus the artifact path.

Fill the Next line when you show the block:

- The review finished with no blocker, Plannotator approved the plan or is not installed, and the Empryo hand-off did not run: Next is `do-work` - build this plan in the current checkout, passing `<absolute artifact path>`.
- Plannotator dismissed or denied: Next is Review in Plannotator - approve the plan before anyone builds it. Dismiss is not a blocker, so `do-work` stays an Other move.
- While status is `blocked` or `needs-human`, or `do-doc-review` did not run, do not offer `do-work`. Name the blocker above the block.

Other moves:
1. `do-brainstorm` - requirements are unclear, if installed
2. `do-work` - build without approval, passing `<absolute artifact path>`. Only when Plannotator dismissed or denied the plan.
3. Review in Plannotator - annotate or approve `<artifact>` again. Omit this move when it is already the Next line, or when Plannotator is not installed.
4. Stop - the artifact is already saved.

Reply with a number, the label, or what you want instead.

Ask with the harness's blocking question tool when it has one, and drop the last line. Otherwise print the block and wait. A pick loads that skill now, in this session. Review in Plannotator runs the Plannotator step in Approve.
