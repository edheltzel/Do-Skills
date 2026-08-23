# Commit and Push

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-commit-push
```

```bash
npx skills update do-commit-push
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/do-commit-push)

## What it does

`do-commit-push` creates a Conventional Commit from the current local changes, then pushes it to the remote. Before committing, it checks that the diff is understood, the message matches it, and staging contains only the intended paths.

Its defining boundary is publication: it confirms the current branch and remote before pushing, then verifies that the working tree is clean and the branch is synchronized with its upstream.

## When to reach for it

You invoke this by typing `/do-commit-push` — the agent will not reach for it on its own.

Reach for it when the finished local change should be committed and sent to its configured remote in one workflow. If a local commit is all that is needed, use [Commit](../workflow/commit.md) instead.

## The five gates

The first three gates establish the commit: understand the diff, choose a `type(scope): description` line, and check the staged set. The final two gates establish the push: inspect the branch and remote before sending it, then use `git status` and `git status -sb` to confirm the upstream caught up afterward.

The commit message follows Conventional Commits: use imperative language, keep its first line under 72 characters, explain *why* in an optional body, and use a footer for issue references when appropriate.

## Where it fits

Use this for a single branch that is ready to leave the local repository. For dependent branch layers and their PRs, use [gh-stack](../workflow/gh-stack.md); for a commit-only checkpoint, use [Commit](../workflow/commit.md).
