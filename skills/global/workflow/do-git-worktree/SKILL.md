---
name: do-git-worktree
description: "Create, remove, list, and prune git worktrees as sibling folders (`../<repo>-<name>`). Use when asked for a worktree, a separate workspace, or parallel branches."
alwaysAllow: ["Bash"]
---

# Git worktrees

Parallel work lives in a linked git worktree next to the main checkout: `../<repo>-<name>`, one branch per worktree.

Repo-level files (`todo.txt`, `done.txt`, handoffs) stay in the main checkout (the clone itself), never in a linked worktree.

## Commands

Run every command from the main checkout.

### Create (default)

If the user gives just a branch name, treat it as create.

```bash
repo=$(basename "$(git rev-parse --show-toplevel)")
git worktree add -b <branch> "../$repo-<name>"
```

For a branch that already exists, drop `-b`:

```bash
git worktree add "../$repo-<name>" <branch>
```

After creating it, show the path prominently so the user can open a new session there:

> Worktree created at: `../<repo>-<name>`

### Remove

```bash
git worktree remove "../$repo-<name>"
```

If the worktree has uncommitted changes, name them and ask the user before `--force`.

### List

```bash
git worktree list
```

### Prune

Clean up stale worktree records, for example after a worktree folder was deleted by hand:

```bash
git worktree prune
```

## Related skills

- Dependent PRs as a stack: `do-gh-stack`, if installed.
- Sync, conflicts, and undo: `do-git-safe-pr-workflow`, if installed.
