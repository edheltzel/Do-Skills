# Plan

Quickstart:

```bash
npx skills add edheltzel/skills --skill=plan
```

```bash
npx skills update plan
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/plan)

## What it does

`plan` breaks a spec, brief, or request into agent-ready tickets, each
delivering one working outcome with a goal, context, acceptance criteria, and a
runnable Verify step. Every ticket is a **vertical slice** — a narrow but
complete path through every layer, implementable, testable, and reviewable on
its own — never a layer: separate database, API, UI, or testing tickets are
explicitly rejected, and work is never split just to create more tickets. Each
ticket declares its **blocking edges**, the tickets that must land before it can
start.

## When to reach for it

Type `/plan`, or the agent reaches for it automatically when a task fits.

Reach for it when decided work needs splitting so agents (or you) can execute it
in parallel or in order. If decisions are still open, the skill stops and lists
them — resolve those first with [spec](../core/spec.md) or
[design-doc](../core/design-doc.md). Drafts land in chat by default; tickets are
published to GitHub Issues (via `gh`), Linear, or Jira only when asked, and only
after the skill quizzes you on the breakdown's granularity and blocking edges.

## Tickets a stranger can finish

Each ticket is written for a new agent with no access to the conversation that
produced it: enough context to execute cold, acceptance criteria stated as
observable results, a Verify section with the exact commands or manual checks
that prove completion, plus what must be preserved and what is out of scope.
That standard is what lets a ticket flow into
[task-to-pr](../core/task-to-pr.md) unattended.

## Plan the approach first, then prove each ticket

Before decomposing, the skill checks altitude: if the shape of the solution is
still open — which architecture, which sequencing, build-vs-adopt — it settles
that first, with a lightweight approach sketch or, for a larger fork,
[wayfinder](../core/wayfinder.md), rather than locking an unexamined approach
into tickets. Each ticket then carries its own **test scenarios**, enumerated by
the categories that apply — happy path, edge cases, error and failure paths,
integration — right-sized and naming input, action, and outcome (or "none" for
non-behavioral work). When the context implies a non-default execution
direction — test-first, characterization-first for fragile legacy, smoke-first
for config — the ticket says so in a phrase. When confidence is low or you ask,
an **interactive** deepening pass walks the breakdown with you before
publishing; it never deepens on its own. (These moves are adapted from Every's
Compound Engineering plugin, MIT.)

## Slices, wide refactors, and the frontier

Before slicing, the skill looks for prefactoring — "make the change easy, then
make the easy change" — and sequences it first. Vertical slices are the default,
but a **wide refactor** whose blast radius breaks thousands of call sites at once
can't land green as one slice; it is sequenced **expand–contract** instead: add
the new form beside the old, migrate call sites in batches sized by blast radius,
then delete the old form once no caller remains, with an integration branch when
even the batches can't stay green alone. Tickets are then worked on the
**frontier** — one at a time with [implement](../core/implement.md), context
cleared between them.

## Where it fits

The last stage of the Decide flow: [design-doc](../core/design-doc.md) →
[spec](../core/spec.md) → `plan`. Its tickets feed
[task-to-pr](../core/task-to-pr.md) for delivery and
[pm-tools](../productivity/pm-tools.md) for board execution — pm-tools' Execute
recipe consumes exactly the acceptance criteria this skill writes.
