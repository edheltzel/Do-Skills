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

## Reproduce, explain, then pin it down

The loop is reproduce → trace to root cause → regression test → smallest fix.
No fix lands before the failure is reproduced and *explained* — if it can't be
reproduced, the skill keeps gathering information and reports observations
instead of guessing. The regression test is written failing first when
practical, so the bug's absence is proven the same way its presence was. One bug
at a time; unrelated failures and flaky infrastructure stay out of the task, and
the skill stops when the fix needs a product or code-owner decision.

## It's working if

- The report explains *why* the failure happened, not just what changed.
- A regression test exists that failed before the fix and passes after.
- The failing check that exposed the bug is still intact, not deleted or weakened.

## Where it fits

The recovery loop of the Deliver flow — reached for from any stage when
something breaks. Its regression-test-first move comes from
[tdd](../core/tdd.md), and fixes it produces flow back through the same review
gate as [implement](../core/implement.md).
