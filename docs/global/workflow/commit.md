# Commit

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-commit
```

```bash
npx skills update do-commit
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-commit)

## What it does

`do-commit` turns the current local changes into a Conventional Commit. It first checks that the diff is understood, chooses a message that matches it, and confirms that staging contains only the intended paths. If `but` is on PATH and `but status` succeeds, it commits with `but commit` instead of `git add`/`git commit`. Otherwise it keeps the git commands.

Its defining boundary is the argument. `/do-commit` ends after the commit and does not push. `/do-commit push`, or an explicit ask to push, publishes the commit. It will not push around a live No Mistakes gate. When `no-mistakes` is on PATH and the repo has a `no-mistakes` remote, it publishes with `no-mistakes axi run --intent "..."` and treats only axi `checks-passed` or `passed` as done. Otherwise it uses `but push` or `git push`, then checks that the branch caught up with its upstream.

## When to reach for it

You invoke this by typing `/do-commit` or `/do-commit push` — the agent will not reach for it on its own.

Reach for `/do-commit` when a reviewed set of local changes needs a deliberate, well-described commit and should stay on the machine. Reach for `/do-commit push` when that same commit should also leave the machine in one workflow, including No Mistakes publishing when that gate is initialized.

## The gates

The first three gates always run, in order: understand the staged and unstaged diff, draft a `type(scope): description` line, then verify the staged set before committing. The message uses imperative language, keeps its first line under 72 characters, and reserves an optional body for motivation rather than a restatement of the diff. A footer holds issue references when appropriate.

The push path adds two gates. Gate 4 confirms a real feature branch (not `gitbutler/workspace` or the default branch), then either starts axi or pushes. Gate 5 passes only on axi `checks-passed` or `passed`, or on upstream sync when No Mistakes is not in use. A parked `ask-user` gate is blocked, not a ship. `passed-with-skips` is reported, not treated as publication.

## Where it fits

This is the local-record step in a Git workflow, and the publish step when you pass `push`. [gh-stack](./gh-stack.md) is for arranging dependent work into reviewable branch layers. Teaching-oriented PR safety lives in [git-safe-pr-workflow](./git-safe-pr-workflow.md) — both skills hand publication to the same gate when it is initialized.
