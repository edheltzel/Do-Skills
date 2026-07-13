# Task To PR

Quickstart:

```bash
npx skills add edheltzel/skills --skill=task-to-pr
```

```bash
npx skills update task-to-pr
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/task-to-pr)

## What it does

`task-to-pr` turns one ticket — from GitHub, Linear, Jira, or pasted text — into
a tested, reviewed GitHub pull request on a dedicated branch and worktree. Every
acceptance criterion is checked and its proof recorded before the PR can open as
ready; unmet criteria or failing checks block it. It never merges.

## When to reach for it

Type `/task-to-pr`, or the agent reaches for it automatically when a task fits.

Reach for it with exactly one decided ticket to deliver end to end. Given
several tickets, it asks you to pick one. For the implementation step alone —
no branch, worktree, or PR — use [implement](../core/implement.md) or
[tdd](../core/tdd.md). Once the PR exists and review feedback arrives later,
[pr-to-ready](../core/pr-to-ready.md) takes over.

## The acceptance-criterion proof gate

The loop: read the ticket and capture goal, acceptance criteria, and checks →
resume or create a ticket-named branch off the latest remote default with a
dedicated worktree (the original checkout stays untouched) → smallest complete
change with tests → focused then wider checks, exercising browser-facing work in
a real browser at desktop and mobile sizes → fresh reviewer on the ticket, diff,
tests, and results → **check every acceptance criterion and record proof** →
Conventional Commit with the ticket ID, push, open a ready PR carrying the
acceptance proof, check results, review outcome, and risks. The ticket is
updated with the PR link and proof — the ticket, not the chat, is the record of
the work.

## It's working if

- One ticket maps to one branch, one worktree, one PR.
- The PR body shows proof per acceptance criterion, not just a summary.
- An interrupted run resumes its existing branch and PR instead of duplicating them.

## Where it fits

The flagship loop of the Deliver flow. It consumes tickets written by
[plan](../core/plan.md), composes [implement](../core/implement.md),
[tdd](../core/tdd.md), and [browser-verify](../core/browser-verify.md), and
relies on the isolation and push discipline of
[git-worktree](../core/git-worktree.md) and
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md). Merging is always a
human decision.
