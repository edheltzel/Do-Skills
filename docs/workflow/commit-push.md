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

`do-commit-push` creates a Conventional Commit from the current local changes, then publishes it. Before committing, it checks that the diff is understood, the message matches it, and staging contains only the intended paths. If `but` is on PATH and `but status` succeeds, it commits with `but commit` instead of `git add`/`git commit`.

Its defining boundary is publication: it will not push around a live No Mistakes gate. When `no-mistakes` is on PATH and the repo has a `no-mistakes` remote, it publishes with `no-mistakes axi run --intent "..."` and treats only axi `checks-passed` or `passed` as done. Otherwise it uses `but push` or `git push`, then checks that the branch caught up with its upstream.

## When to reach for it

You invoke this by typing `/do-commit-push` — the agent will not reach for it on its own.

Reach for it when the finished local change should be committed and sent off the machine in one workflow. If a local commit is all that is needed, use [Commit](../workflow/commit.md) instead.

## The five gates

The first three gates establish the commit: understand the diff, choose a `type(scope): description` line, and check the staged set. The final two gates establish publication: confirm a real feature branch (not `gitbutler/workspace` or the default branch), then either start axi or push. Gate 5 passes only on axi `checks-passed` or `passed`. A parked `ask-user` gate is blocked, not a ship. `passed-with-skips` is reported, not treated as publication.

The commit message follows Conventional Commits: use imperative language, keep its first line under 72 characters, explain *why* in an optional body, and use a footer for issue references when appropriate.

## Where it fits

Use this for a single branch that is ready to leave the local repository. For dependent branch layers and their PRs, use [gh-stack](../workflow/gh-stack.md); for a commit-only checkpoint, use [Commit](../workflow/commit.md). Teaching-oriented PR safety lives in [git-safe-pr-workflow](../workflow/git-safe-pr-workflow.md) — both skills hand publication to the same gate when it is initialized.
