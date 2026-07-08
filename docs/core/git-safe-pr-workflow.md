# Git Safe PR Workflow

Quickstart:

```bash
npx skills add edheltzel/skills --skill=git-safe-pr-workflow
```

```bash
npx skills update git-safe-pr-workflow
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/git-safe-pr-workflow)

## What it does

`git-safe-pr-workflow` guides you through a GitHub-first pull request flow —
branching, syncing, resolving conflicts, undoing mistakes, and landing changes —
that keeps `main` clean without demanding fluent git. The defining constraint is
that it biases toward safety over elegance: it prefers reversible operations,
merges `origin/main` into your feature branch instead of rebasing it, and reaches
for `git revert` over rewriting history whenever commits may already be pushed.

## When to reach for it

Type `/git-safe-pr-workflow`, or the agent reaches for it automatically on
triggers like "update my branch", "resolve git conflicts", "recover from a bad
rebase", "undo a pushed commit", or "keep main clean".

Reach for it when a git operation could lose work or rewrite shared history and
you want a walkthrough that inspects first and explains as it goes — especially if
you're not a confident git user. It teaches the next decision, not the whole tool.

## The safe posture

- **Inspect before acting.** Check current branch, clean vs. dirty tree, upstream
  tracking, and whether the branch is shared before any history-changing command.
  If shared status is unknown, assume shared and take the safer path.
- **Merge, don't rebase, pushed branches.** Sync with `fetch` then merge
  `origin/main`; rebase is offered only for clearly private, unpublished commits.
- **Revert, don't reset, pushed work.** Undo with `git revert`; destructive
  local undo is reserved for unpublished changes.
- **Squash and merge.** Land PRs with a squash so `main` stays readable, treating
  the PR title as the final commit message.
- **Refuse or warn hard** on committing to `main`, force-pushing protected
  branches, or `reset --hard` / `clean -fd` without a clear destructive request.

Deeper playbooks live in the skill's `references/` — `conflict-resolution.md`,
`recovery.md`, and `repo-settings.md`.

## It's working if

- Feature branches sync via a merge of `origin/main`, not a rebase of pushed
  commits.
- Mistakes on shared history get reverted rather than reset away.
- Conflict resolutions are verified against the final code, not just cleared of
  markers, and any behavior change is explained back to you.

## Where it fits

A reach-for-it-anytime standalone for the branch-to-merge lifecycle. It follows
[git-worktree](../core/git-worktree.md), which sets up where a branch lives, and
feeds [git-pr-review-triage](../core/git-pr-review-triage.md), which sorts the
review comments once the PR is open.
