# Commit

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-commit
```

```bash
npx skills update do-commit
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/do-commit)

## What it does

`do-commit` turns the current local changes into a Conventional Commit. It first checks that the diff is understood, chooses a message that matches it, and confirms that staging contains only the intended paths. If `but` is on PATH and `but status` succeeds, it commits with `but commit` instead of `git add`/`git commit`. Otherwise it keeps the git commands.

Its defining boundary is local: it ends after creating the commit and does not push it to a remote.

## When to reach for it

You invoke this by typing `/do-commit` — the agent will not reach for it on its own.

Reach for it when a reviewed set of local changes needs a deliberate, well-described commit. If that commit should also be published, use [Commit and Push](../workflow/commit-push.md) instead — which publishes through No Mistakes when that gate is initialized.

## The three gates

The workflow is evidence-led and ordered: understand the staged and unstaged diff, draft a `type(scope): description` line, then verify the staged set before committing. The message uses imperative language, keeps its first line under 72 characters, and reserves an optional body for motivation rather than a restatement of the diff.

## Where it fits

This is the local-record step in a Git workflow. It pairs naturally with [Commit and Push](../workflow/commit-push.md) when publication is intended, while [gh-stack](../workflow/gh-stack.md) is for arranging dependent work into reviewable branch layers.
