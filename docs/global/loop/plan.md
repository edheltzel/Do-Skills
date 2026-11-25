# Plan

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-plan
```

```bash
npx skills update do-plan
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/loop/do-plan)

## What it does

`do-plan` writes an implementation plan a later run can execute. The plan is ordered units. Each unit names the change, when it is done, and a check that can fail.

It does not invent product behavior the requirements left open, and it does not implement. There is no research-agent farm, no HTML renderer, and no model-tier switch. After the file is written, the skill runs [doc-review](./doc-review.md) on it. In interactive mode it then opens the plan in Plannotator when installed, and in Empryo hands it to Empryo plan mode; otherwise it waits for you to pick the next move.

## When to reach for it

Type `/do-plan`, or the agent reaches for it when you ask to plan, break down implementation, or plan from a requirements file. [brainstorm](./brainstorm.md) hands it the requirements path. A bug, or a feature whose behavior is still unsettled, is not this skill.

## Units and checks

An **Implementation Unit** is one ordered change under `## Implementation Units`. `Depends on` names an earlier unit or none. `Files` lists the paths that unit may create, edit or delete. `Verify` is the check a later run can fail, including any test the plan names. A step with no way to fail is not in the plan. A Blocker line is a blocking question, and build waits while one is open.

The file is `docs/plans/YYYY-MM-DD-<topic>-plan.md`, or the directory the project `AGENTS.md` names instead. Passing an existing plan path revises that file. The requirements file stays put.

In interactive mode, after review passes with no blocker, `do-plan` runs an approval gate:

- **Plannotator:** when installed, the skill opens the plan there automatically. Annotations send the plan back through revision and [doc-review](./doc-review.md) before reopening. Dismissing drops to the Next menu, which still offers [work](./work.md).
- **Empryo plan mode:** when running inside Empryo (detected by its tools), approval hands the plan to Empryo's `plan` tool, one step per unit. You get Empryo's Implement, Clear & Implement and Revise buttons and a saved `.empryo/plans/plan-*.md` copy. Implement and Clear & Implement build with [work](./work.md) from the plan file, so each unit's check still runs. If the agent cannot load Empryo's `plan` tool, you get the Next menu instead. With Plannotator installed too, you approve twice: once in Plannotator, then Implement in Empryo. Outside plan mode, Empryo rejects plans with fewer than 3 files, so the skill asks you to run `/mode plan` first. You can also ask to open Empryo's copy in Plannotator.
- **Outside Empryo:** approval (or no Plannotator) leads to the Next menu with [work](./work.md).

## It's working if

- Every unit has a Verify line.
- Product behavior matches the requirements, or the plan names the gap and does not guess.
- The run did not edit product code.
- In interactive mode, you approved the plan in Plannotator or Empryo, or dismissed it and picked the next move yourself.

## Where it fits

Shape, after [brainstorm](./brainstorm.md) and before [work](./work.md). [doc-review](./doc-review.md) edits the plan in place and leaves `Review complete` as its last line. Then the approval gate, then [work](./work.md). `do-it` can run this skill with `mode:return-to-caller` and take the status back instead of a menu.
