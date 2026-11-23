# LFG

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-it
```

```bash
npx skills update do-it
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-it)

## What it does

`do-it` is the LFG runner: one explicit end-to-end ask, no menus, from the request to a shipped artifact. A feature goes plan, then build, then ship, then a watch on the PR until it is ready. A bug skips the plan and starts on the fix path. A PR you were asked to review goes to [git-pr-review](./git-pr-review.md) and never edits code.

It stops for missing plan input, a debug rethink, a no-mistakes ask-user gate, or a blocked child. Shipping follows [commit's publication routing](./commit.md#what-it-does). It never lands or merges. `/do-it commit` stops at a local commit instead of opening a PR.

## When to reach for it

Type `/do-it`, or the agent reaches for it when you say LFG or let's go on autonomous end-to-end work. It will not fire on a vague "continue".

Reach for this when you want the whole loop run without a stop at each skill. For a step you review before the next, use [plan](./plan.md), [work](./work.md), or [commit](./commit.md). A bug you want diagnosed before anyone edits belongs in `do-debug`, not here.

## The run

**LFG** means the route is already chosen. Feature: `do-plan`, then `do-work`, then `do-commit cpp` (commit, push, PR, CI green), then [git-pr-babysit](./git-pr-babysit.md). Bug: `do-debug` on the fix path, then the same ship step. External PR: [git-pr-review](./git-pr-review.md), which posts only when your ask named commenting. Children report back instead of offering their own menus, so the plan skips the Plannotator and Empryo approval gate.

The run ends with a short report: what ran, artifact paths, PR URL if one exists, and why it stopped if it did. Then a Next block. After babysit reports the PR ready, next is land only when you say go, or review triage when comments land. A babysit stop after the PR opened is reported; the PR and branch stay as they are. After `/do-it commit`, next is publishing that commit.

Leaving mid-run is `/do-handoff`, not a substitute summary.

## It's working if

- You were not asked to pick a skill in the middle of the run.
- A feature produced a plan path, a build, and either a PR URL or a stated stop.
- A bug did not grow a new plan.
- Nothing merged.

## Where it fits

This is the runner across the workflow, not a stage of it. Shape, build, and ship stay in [plan](./plan.md), `do-work`, [commit](./commit.md), and [git-pr-babysit](./git-pr-babysit.md). Parking the session for someone else is `do-handoff`. Review comments that arrive later go to [git-pr-review-triage](./git-pr-review-triage.md).
