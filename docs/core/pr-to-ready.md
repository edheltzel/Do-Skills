# PR To Ready

Quickstart:

```bash
npx skills add edheltzel/skills --skill=pr-to-ready
```

```bash
npx skills update pr-to-ready
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/pr-to-ready)

## What it does

`pr-to-ready` drives an open pull request to merge-ready: it reads the live PR
state, classifies every piece of feedback, fixes what's actionable, pushes back
where there's a concrete reason, and reports Ready, Not ready, or Blocked. It
never merges — even when asked "merge?", it answers and stops.

## When to reach for it

Type `/pr-to-ready`, or the agent reaches for it automatically when a task fits.

Reach for it when a PR has accumulated review comments, failing checks, or
unresolved threads and you want it driven back to mergeable. For reading and
sorting the feedback *without* acting on it, use
[git-pr-review-triage](../core/git-pr-review-triage.md) — that skill is the
analysis half; this one executes.

## Six-way feedback classification

Every thread lands in one bucket: **actionable** (fix it, small), **disputed**
(reply on the thread with a concrete reason — correctness, scope, or a
documented convention — and change nothing), **resolved**, **outdated**,
**informational**, or **needs-human**. Preference disagreements from a human
reviewer always go to needs-human rather than getting a rebuttal. The skill
trusts the live PR state over stale summaries, replies on each addressed thread
with what changed, and refuses to report Ready while required checks fail or
actionable feedback remains.

## It's working if

- Every review thread has a disposition — fixed, answered, or escalated.
- Push-backs cite correctness, scope, or a convention, never taste.
- The final report is one of exactly Ready, Not ready, or Blocked, with evidence.

## Where it fits

The feedback half of the Deliver flow: [task-to-pr](../core/task-to-pr.md)
opens the PR, reviewers respond, `pr-to-ready` closes the loop — repeatedly if
needed — until a human merges. It builds on
[git-pr-review-triage](../core/git-pr-review-triage.md)'s judgment about which
feedback is signal and which is noise.
