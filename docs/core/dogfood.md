# Dogfood

Quickstart:

```bash
npx skills add edheltzel/skills --skill=dogfood
```

```bash
npx skills update dogfood
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/dogfood)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`dogfood` runs QA on the **active branch** the way a real user would — it exercises
every change in a real browser, fixes what breaks, and writes down whether the
branch is genuinely ready. The one fact that shapes everything else: it is
**diff-scoped**. Dogfood tests only what *this branch* introduced or changed versus
the trunk, never the whole app — so it starts by diffing branch against trunk and
building a flow map of exactly what moved.

That flow-first framing is the point. Dogfood maps the branch-vs-trunk journeys as
Mermaid flowcharts, derives a test matrix from them, and drives the browser through
each scenario — because a matrix built from a flat list of pages tests widgets in
isolation and misses the journey (the email that "sends" but lands in the wrong
thread).

## When to reach for it

Type `/dogfood`, or the agent reaches for it automatically when a task fits.

Reach for it when a branch or PR is functionally "done" and you want it exercised
end to end before merge — every changed flow driven in a real browser, defects
fixed with regression tests, and the experience judged, not just the correctness.
For driving a single URL or one flow in the browser, use
[browser-verify](../core/browser-verify.md) directly — dogfood is the diff-scoped
QA orchestration layer that sits on top of it. For open-ended bug diagnosis with no
matrix to work through, use [debug](../core/debug.md).

## Orchestration, not browser mechanics

Dogfood owns the reasoning — the flow map, the test matrix, the fix-and-regression
loop, the persona paper-cut pass, and the durable report. It does **not** drive the
browser itself: it hands each scenario to [browser-verify](../core/browser-verify.md),
which navigates, interacts, screenshots, and reports pass/fail with console and
network results, then reasons over what comes back. Root-cause help comes from
[debug](../core/debug.md); isolation from [git-worktree](../core/git-worktree.md);
a reusable lesson is captured with [compound](../productivity/compound.md).

## The paper-cut pass

The signature move is judging the **experience**, not just correctness. After a
scenario passes functionally, dogfood re-walks the journey as each of the product's
primary personas (drawn from `STRATEGY.md`, `VISION.md`, or a persona doc) and looks
for **paper cuts** — small frictions that no functional test would catch: a
confusing label, an extra click, an unexpected jump, missing feedback, copy that
does not match how that persona thinks. A scenario can be a functional `Pass` and
still carry paper cuts; a sharp one gets fixed now, the rest are logged.

## Propose-first, resumable

Dogfood follows the atlas propose-first posture: it confirms before creating a
worktree, commits fixes only in an apply/opt-in posture, and escalates a large or
ambiguous fix (architecture, schema, a product/UX trade-off) to the user as a
recorded decision rather than forcing it autonomously. Every autonomous fix is
paired with a regression test that fails before and passes after. A long run is
resumable: the test matrix is a live task list and the on-disk dogfood report is the
durable checkpoint, so an interrupted run picks up exactly where it stopped.

## Where it fits

A standalone QA pass you reach for late — after a branch is built and before it
merges. It composes with the surrounding flow: it isolates via
[git-worktree](../core/git-worktree.md), drives the browser through
[browser-verify](../core/browser-verify.md), leans on [debug](../core/debug.md) for
hard root causes, and leaves committing and PR-opening to
[task-to-pr](../core/task-to-pr.md) when you are in an apply posture. Its output is a
durable dogfood report under `docs/dogfood-reports/`.
