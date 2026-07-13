# Triage

Quickstart:

```bash
npx skills add edheltzel/skills --skill=triage
```

```bash
npx skills update triage
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/triage)

Imported/adapted from [Matt Pocock's skills](https://github.com/mattpocock/skills) (MIT).

## What it does

`triage` moves GitHub issues through a small **state machine** of triage roles —
categorise as `bug` or `enhancement`, then land on a state: `needs-triage`,
`needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix`. Labels are
applied with `gh issue edit` against the repo's existing taxonomy. The defining
move is that it never rubber-stamps a claim: it verifies the report against the
codebase — reproducing a bug, searching for an already-built implementation,
checking prior rejections — before recommending where the issue goes.

## When to reach for it

You invoke this by typing `/triage` — the agent won't reach for it on its own.

Reach for it to work the issue backlog: to see what needs attention, to move a
specific issue toward `ready-for-agent`, or to decide what to build versus
reject. For the review comments *inside* a pull request — separating substantive
feedback from noise — use [git-pr-review-triage](../core/git-pr-review-triage.md)
instead; the two are complementary, and an external PR is triaged here only where
a repo explicitly treats PRs as a request surface.

## Verify, then grill, then brief

The workflow gates human judgment at every hand-off. The skill recommends a
category and state but waits for the maintainer's direction; it verifies the
claim before any grilling; and when a request needs fleshing out it runs
[grilling](../productivity/grilling.md) and
[domain-modeling](../core/domain-modeling.md) one question at a time. Reaching
`ready-for-agent` produces a **durable agent brief** — behavioral, not
procedural, with concrete acceptance criteria and no file paths that go stale.
Rejected enhancements are recorded in an `.out-of-scope/` knowledge base so the
same request doesn't return as fresh work.

## Where it fits

The entry point to the Decide flow on GitHub: an issue becomes `ready-for-agent`
here, then [plan](../core/plan.md) breaks it into tickets or
[implement](../core/implement.md) picks it up directly. It pairs with
[pm-tools](../productivity/pm-tools.md) for the board mechanics and hands the
label vocabulary off to it.
