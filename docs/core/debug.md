# Debug

Quickstart:

```bash
npx skills add edheltzel/skills --skill=debug
```

```bash
npx skills update debug
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/debug)

## What it does

`debug` finds and fixes the root cause when something breaks — a failing test, a
broken build, a bug report, behavior that doesn't match expectations. It fixes
the cause, never the symptom: deleting the failing check, swallowing the error,
or weakening the assertion are all off the table unless that genuinely is the
fix.

## When to reach for it

Type `/debug`, or the agent reaches for it automatically when a task fits.

Reach for it when a specific failure is in hand and needs explaining. That's the
boundary with [adversarial-review](../core/adversarial-review.md), which hunts
for bugs a change set *might* have introduced — `debug` chases a failure that
already happened. When the fix is known and just needs building, hand off to
[implement](../core/implement.md) or [tdd](../core/tdd.md).

## Build the feedback loop first

The method is six phases, and the first one *is* the skill: build a tight,
red-capable feedback loop — a single command, already run, that drives the real
bug path and asserts the user's exact symptom. Everything downstream just
consumes it: reproduce and minimise to the smallest scenario that still goes red,
generate 3–5 ranked falsifiable hypotheses before testing any, instrument one
variable at a time (debugger over logs, tagged `[DEBUG-…]` logs, measure-first
for performance), fix at a correct seam with the regression test written failing
first, then a post-mortem asking *what would have prevented this*. No fix lands
before the failure is reproduced and *explained*; if a loop genuinely can't be
built, the skill stops and asks for access or an artifact instead of guessing.
One bug at a time, and it stops when the fix needs a product or code-owner
decision.

## It's working if

- The report explains *why* the failure happened, not just what changed.
- A regression test exists that failed before the fix and passes after.
- The failing check that exposed the bug is still intact, not deleted or weakened.

## Where it fits

The recovery loop of the Deliver flow — reached for from any stage when
something breaks. Its regression-test-first move comes from
[tdd](../core/tdd.md), and fixes it produces flow back through the same review
gate as [implement](../core/implement.md). When the post-mortem points at an
architectural cause — no good test seam, tangled callers — it hands off to
[review-structure](../core/review-structure.md).
