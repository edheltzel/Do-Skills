# Implement

Quickstart:

```bash
npx skills add edheltzel/skills --skill=implement
```

```bash
npx skills update implement
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/implement)

## What it does

`implement` finishes one code task end to end: understand it, make the smallest
complete change, test it, get it reviewed, and report or open the requested PR.
Non-trivial diffs go to a fresh reviewer before the task counts as done — and if
no reviewer is available, the skill self-reviews and says so rather than
skipping the gate silently.

## When to reach for it

Type `/implement`, or the agent reaches for it automatically when a task fits.

Reach for it with one decided task — a ticket, a spec section, a clear request.
To drive the change test-first, use [tdd](../core/tdd.md) instead. For the full
ticket-to-pull-request loop with its own branch and worktree, use
[task-to-pr](../core/task-to-pr.md), which runs this skill's loop inside it.

## Smallest complete change

The defining discipline is scope: one task at a time, no public interface or
data-shape changes unless the task requires them, checks run focused-first and
widen only when shared or user-facing behavior changed. Unchecked work is never
hidden, and when the task, spec, or plan itself turns out to be wrong, the skill
stops and fixes the source of truth instead of pushing through. It
operationalizes the principles that
[karpathy-guidelines](../core/karpathy-guidelines.md) states.

## Where it fits

The core execution step of the Deliver flow. It consumes tickets from
[plan](../core/plan.md), pairs with [simplify](../core/simplify.md) for cleanup
and [adversarial-review](../core/adversarial-review.md) when correctness needs a
second hunt, and is composed by [task-to-pr](../core/task-to-pr.md) into the
full branch-to-PR loop.
