# Git Worktree Management

Quickstart:

```bash
npx skills add edheltzel/skills --skill=git-worktree
```

```bash
npx skills update git-worktree
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/git-worktree)

## What it does

`git-worktree` creates, removes, lists, and prunes git worktrees so you can check
out several branches at once without cloning the repo again or stashing your work.
The defining constraint is location: every worktree lands in a standardized path,
`~/.git-worktrees/<repo>/<branch>`, never inside a project directory — so your
working trees stay tidy and a worktree never gets mistaken for repo content.

Before creating anything it **detects existing isolation** — most harnesses open a
worktree at session start, so the common case is that isolation already exists and
the right move is to work in place, not nest a second one. When it does create, it
**prefers the harness's native worktree tool** over raw `git worktree add` so the
harness can track and clean up what it made.

## When to reach for it

Type `/git-worktree`, or the agent reaches for it automatically when you ask to
create, remove, or list a worktree. Given a bare branch name, it defaults to
**create**.

Reach for it when you want to work a second branch in parallel — a review, a
hotfix, a long-running feature — without disturbing your current checkout. After
creating one, it prints the worktree path so you can open a fresh session pointed
at it.

## Operations

- **Create** (the default): `git worktree add` into `~/.git-worktrees/<repo>/<branch>`,
  using `-b` to branch from `HEAD` when the branch doesn't exist yet.
- **Remove**: deletes the linked worktree; if it has uncommitted changes, you're
  warned before anything uses `--force`.
- **List**: shows every worktree and flags which is the main working tree.
- **Prune**: clears stale references left by a manually deleted directory.

Create works in two modes: **new work** branches a fresh feature branch from the
trunk; **isolate an existing ref** attaches a worktree to a branch, tag, commit,
or PR you name — a PR is checked out on a local branch (never a detached
`FETCH_HEAD`, which would orphan later commits) so the fix loop still updates it.
One hard rule governs both: a branch can live in only one worktree at a time, so a
ref already checked out elsewhere is reported, never forced into a second tree.

Safety is built in: `--force` never runs without your explicit confirmation,
ambiguous intent resolves to the non-destructive create, and a worktree that can't
be created (a sandbox or permission failure) blocks for your decision rather than
silently working in the checkout you meant to protect.

## Where it fits

A reach-for-it-anytime standalone for managing where your branches live on disk.
It pairs with the other git skills in this bucket:
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md) governs how a branch syncs
and merges once you're working in it, and
[git-pr-review-triage](../core/git-pr-review-triage.md) handles the review comments
that come back on its PR.
