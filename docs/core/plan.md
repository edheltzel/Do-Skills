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
runnable Verify step. Every ticket must be a working slice — implementable,
testable, and reviewable on its own — never a layer: separate database, API, UI,
or testing tickets are explicitly rejected, and work is never split just to
create more tickets.

## When to reach for it

Type `/plan`, or the agent reaches for it automatically when a task fits.

Reach for it when decided work needs splitting so agents (or you) can execute it
in parallel or in order. If decisions are still open, the skill stops and lists
them — resolve those first with [spec](../core/spec.md) or
[design-doc](../core/design-doc.md). Drafts land in chat by default; tickets are
published to GitHub Issues, Linear, or Jira only when asked.

## Tickets a stranger can finish

Each ticket is written for a new agent with no access to the conversation that
produced it: enough context to execute cold, acceptance criteria stated as
observable results, a Verify section with the exact commands or manual checks
that prove completion, plus what must be preserved and what is out of scope.
That standard is what lets a ticket flow into
[task-to-pr](../core/task-to-pr.md) unattended.

## Where it fits

The last stage of the Decide flow: [design-doc](../core/design-doc.md) →
[spec](../core/spec.md) → `plan`. Its tickets feed
[task-to-pr](../core/task-to-pr.md) for delivery and
[pm-tools](../productivity/pm-tools.md) for board execution — pm-tools' Execute
recipe consumes exactly the acceptance criteria this skill writes.
