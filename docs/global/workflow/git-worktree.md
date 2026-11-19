# Git Worktree Management

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-worktree
```

```bash
npx skills update do-git-worktree
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-worktree)

## What it does

When you ask for a worktree, a separate workspace, or parallel branches, this
skill creates a linked git worktree next to the main checkout, at
`../<repo>-<name>`, one branch per worktree. Repo-level files such as
`todo.txt` and handoffs stay in the main checkout.

## When to reach for it

Type `/do-git-worktree`, or the agent reaches for it when you ask for a worktree or
want to work a second branch in parallel: a review, a hotfix, a long-running
feature.

## Operations

- **Create**: `git worktree add -b <branch> ../<repo>-<name>` (drop `-b` for an
  existing branch). The agent prints the new path so you can open a session there.
- **Remove**: `git worktree remove ../<repo>-<name>`. A worktree with uncommitted
  changes is named to you before any `--force`.
- **List**: `git worktree list`.
- **Prune**: `git worktree prune` clears records of deleted worktree folders.

## Where it fits

A reach-for-it-anytime standalone for parallel branches.
It pairs with the other Git workflow skills:
[git-safe-pr-workflow](./git-safe-pr-workflow.md) governs how a branch syncs
and merges once you're working in it, and
[git-pr-review-triage](./git-pr-review-triage.md) handles the review comments
that come back on its PR.
