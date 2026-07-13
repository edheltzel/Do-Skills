# Execute Plan

Quickstart:

```bash
npx skills add edheltzel/skills --skill=execute-plan
```

```bash
npx skills update execute-plan
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/execute-plan)

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

## What it does

`execute-plan` takes a multi-unit plan (or a clear build prompt) and runs it end
to end — reading the plan, orchestrating subagents, verifying each unit with real
evidence, and shipping. The defining constraint is that **the plan is a decision
artifact, not an execution script**: it reads only what the active unit needs
(building a section map for long plans rather than swallowing the whole file),
never edits the plan body during execution, and derives progress from git commits
and the task tracker instead.

## When to reach for it

Type `/execute-plan`, or the agent reaches for it when you ask to implement from a
plan in `docs/plans`, a spec path, or a clear multi-step build request. Blank, it
picks the latest implementation-ready plan.

Reach for it for structured, multi-unit work. For a single unit or bug fix use
[implement](../core/implement.md), or [tdd](../core/tdd.md) for test-first work;
for open-ended debugging use [debug](../core/debug.md); to produce the plan itself
use [plan](../core/plan.md).

## Orchestration under a safety check

For any structured multi-unit plan it prefers subagents — a fresh context window
per unit — and parallelizes independent units, but only after a **Parallel Safety
Check**: file overlap is necessary but not sufficient, so it also serializes units
that contend on shared types, migrations, lockfiles, snapshots, or an environment
singleton (one dev server, a shared database, a rate-limited service). Concurrency
is capped at a small batch, and a batch that produces broad unplanned edits or
repeated conflicts aborts to serial.

Every behavior-bearing unit carries a **verification-evidence contract**: the
worker chooses an evidence strategy and observes the red failure or
characterization baseline *before* changing production code, then reports it — the
orchestrator assembles that evidence from the workers, never reconstructs it from
the diff. **At a genuine TDD seam it defers to [tdd](../core/tdd.md)** for a strict
red → green cycle; it never softens that into writing test and code together. A
System-Wide Test Check traces callbacks, middleware, and error strategies two
levels out before a task is called done, and simplification runs at phase
boundaries rather than after every unit.

## It's working if

- Long plans are read via a section map, and the plan body is never edited during
  execution — progress lives in commits.
- Parallel batches only run genuinely non-contending units, and the orchestrator
  integrates from the actual tree, not the workers' reported paths.
- Behavior-bearing units show a red-before-implementation observation, and TDD
  seams run through `tdd`.

## Where it fits

The execution stage between planning and shipping. It consumes plans from
[plan](../core/plan.md), composes [implement](../core/implement.md),
[tdd](../core/tdd.md), and [simplify](../core/simplify.md) for the units and phase
boundaries, reviews with `code-review`, isolates work via
[git-worktree](../core/git-worktree.md), and exits through
[task-to-pr](../core/task-to-pr.md) (or a commit-and-push under
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md)). Under the autopilot
[lfg](../core/lfg.md) it runs in return-to-caller mode — implement and verify only,
leaving the shipping tail to the caller.
