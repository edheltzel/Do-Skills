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

`do-git-pr-babysit` watches your pull request through CI and review until it is ready to merge. Roborev reviews locally first; babysit then waits for Pullfrog to review the pushed head. On each wake it reads the PR's real state, fixes failing checks, sends review comments through triage, pushes the fixes through [commit](./commit.md) (which runs roborev again), and watches again.

A wake is news, not a merge decision. It reports ready only after it checks the merge gate itself on the latest head, and it never merges without your go.

## Example

```
/do-git-pr-babysit watch PR 184 for the login retry fix until CI is green and review threads are resolved
```

## When to reach for it

Type `/do-git-pr-babysit`, or the agent reaches for it on its own: [commit](./commit.md) starts it after `cp` or `cpp` when a PR is open, and you can ask it to watch a PR through CI.

Reach for it on your own PR. To review someone else's PR, use [git-pr-review](./git-pr-review.md).

## Prerequisites

The GitHub CLI (`gh`), signed in to the PR's repository. Roborev and Pullfrog are optional: each step runs only when the repo uses it.

## The watch

- **Roborev first.** Before the first watch it checks `roborev job wait <head>`. A failed or missing review goes back to `do-commit cp`, which fixes and pushes.
- **Then Pullfrog.** When the current head has a `pullfrog` or `pullfrog-approval` check that is not skipped, a `pullfrog[bot]` review of that head, or a confirmed dispatch for it, the watcher runs with `--require-review-bot pullfrog`: ready waits for Pullfrog's review of this head and a passing `pullfrog-approval` check on it. A review of an older head does not count. If Pullfrog, Greptile, or Macroscope first appears during the watch, ready waits for that bot on this head too. A `pullfrog.yml` that only runs on `workflow_dispatch` does not review a push by itself, so the file alone does not make the watch wait.
- **One watcher per PR.** The skill's `scripts/pr-wait` runs as one background job and locks the PR. It never writes its own sleep loop, and a second watcher does not start.
- **On a failed check.** It runs `do-debug` and tells flakes from real failures.
- **On review comments,** including Pullfrog's review and threads, it runs [git-pr-review-triage](./git-pr-review-triage.md), then [work](../loop/work.md) for the accepted fixes and `do-commit cp` to push them.
- **On the gate.** It checks required checks, approvals, open threads, branch protection, and base movement. A branch that is behind, conflicted, or unknown is not ready.

Every post or reply goes through [git-pr-comment](./git-pr-comment.md), and only when you asked for it.

## It's working if

- Only one watcher runs for the PR.
- Ready means the gate passed on the latest head, not that the watcher exited.
- Ready waited for roborev and, where it runs, Pullfrog on that head.
- Nothing merged or closed without your go.

## Where it fits

This is the last step of Ship. [commit](./commit.md) with `cp` or `cpp` starts it on the PR, and [it](../loop/it.md) runs it after `cpp`. Fixes go back to commit, and commit hands back here. When the PR is ready, the next step is `do-commit land`, only when you say go.
