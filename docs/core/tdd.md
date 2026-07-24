# TDD

Quickstart:

```bash
npx skills add edheltzel/skills --skill=tdd
```

```bash
npx skills update tdd
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/tdd)

## What it does

`tdd` is the test-first variant of [implement](../core/implement.md): red —
write the smallest failing test and confirm it fails *for the expected reason* —
then green — the minimum implementation that passes — then refine. No
implementation code is written before a failing test for the behavior exists.

## When to reach for it

Type `/tdd`, or the agent reaches for it automatically when a task fits.

Reach for it when a failing test can describe the desired behavior up front — a
new behavior, a reproducible bug, retry logic, an edge case. It drives
*implementation*; for judging test quality, branch coverage, or safe executable
E2E plans, use [behavioral-testing](../core/behavioral-testing.md), which
reviews and runs tests but is not a red-green drive loop. Skip TDD entirely for
docs, formatting, or non-behavioral scaffolding.

## Red for the right reason

The loop's sharpest rule is that red must be *diagnostic*: a test failing on a
typo, a missing import, or bad setup proves nothing about behavior, so the
failure is confirmed to be the expected one before any implementation starts.
Tests describe behavior rather than implementation details, prefer real
boundaries over mocks, and failure-path tests are added where they matter. The
report names the test that failed before and passes after — the proof the loop
actually ran.

## Where it fits

A sibling of [implement](../core/implement.md) — same task in, same reviewed
change out, different drive. [task-to-pr](../core/task-to-pr.md) uses it when a
ticket's behavior is test-describable, and [debug](../core/debug.md) borrows its
core move: a failing regression test before the fix.
