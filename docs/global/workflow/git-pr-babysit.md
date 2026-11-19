# PR Babysit

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-pr-babysit
```

```bash
npx skills update do-git-pr-babysit
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-pr-babysit)

## What it does

`do-git-pr-babysit` watches your pull request through CI and review until it is ready to merge. On each wake it reads the PR's real state, fixes failing checks, sends review comments through triage, pushes the fixes, and watches again.

A wake is news, not a merge decision. It reports ready only after it checks the merge gate itself on the latest head, and it never merges without your go.

## When to reach for it

Type `/do-git-pr-babysit`, or the agent reaches for it after [commit](./commit.md) opens a PR, or when you ask it to watch a PR through CI.

Reach for it on your own PR. To review someone else's PR, use [git-pr-review](./git-pr-review.md).

## Prerequisites

The GitHub CLI (`gh`), signed in to the PR's repository.

## The watch

- **One watcher per PR.** The skill's `scripts/pr-wait` runs as one background job and locks the PR. It never writes its own sleep loop, and a second watcher does not start.
- **On a failed check.** It runs `do-debug` and tells flakes from real failures.
- **On review comments.** It runs [git-pr-review-triage](./git-pr-review-triage.md), then [work](./work.md) for the accepted fixes and `do-commit cp` to push them.
- **On the gate.** It checks required checks, approvals, open threads, branch protection, and base movement. A branch that is behind, conflicted, or unknown is not ready.

Every post or reply goes through [git-pr-comment](./git-pr-comment.md), and only when you asked for it.

## It's working if

- Only one watcher runs for the PR.
- Ready means the gate passed on the latest head, not that the watcher exited.
- Nothing merged or closed without your go.

## Where it fits

This is the last step of Ship. [commit](./commit.md) with `cp` or `cpp` hands it the PR, and [it](./it.md) runs it after `cpp`. When the PR is ready, the next step is `do-commit land`, only when you say go.
