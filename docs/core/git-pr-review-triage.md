# PR Review Triage

Quickstart:

```bash
npx skills add edheltzel/skills --skill=git-pr-review-triage
```

```bash
npx skills update git-pr-review-triage
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/git-pr-review-triage)

## What it does

`git-pr-review-triage` pulls the review comments on your PR, classifies each one,
and proposes an action with a draft response — separating substantive feedback
from bikeshedding, stale comments, misreads, AI slop, and other noise. The
defining constraint is that it triages and drafts only: it never edits your code
or posts a reply, so you stay the one who decides and sends.

## When to reach for it

Type `/git-pr-review-triage`, or the agent reaches for it automatically whenever
you mention PR comments or code-review feedback — "review my PR comments", "triage
this feedback", "go through my PR" — even without the word "triage".

Reach for it when a PR comes back with a wall of comments and you want to know what
actually needs addressing versus what to push back on. Not for writing PR
descriptions, reviewing someone else's PR, or applying the changes.

## The triage loop

- **Pull everything.** Via the `gh` CLI, gather both review-level and inline
  thread comments, capturing author, `file:line`, resolution status, and the
  commit SHA each was made against — noting where the code has since changed.
- **Classify.** Label each comment as substantive (`bug`, `design`, `domain`) or
  noise (`bikeshed`, `stale`, `misread`, `vague`, `ai-slop`, `scope-creep`,
  `unfounded`). The test: if you made the change, would the code be meaningfully
  better, or just different?
- **Recommend an action.** One of Address, Push back, Defer, Clarify, or Ignore —
  with one-line reasoning and, for push-back or clarify, a direct draft response
  (no apologetic preamble, no "great point!").
- **Group and tally.** Output is grouped by action so you work Address items
  first, ending with a count like "12 comments → 4 address, 5 push back, 2 defer,
  1 ignore."

The classification is a draft, not a verdict — you know your reviewer and team, so
it defers when you push back.

## Where it fits

A reach-for-it-anytime standalone for the review stage of a PR. It comes after
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md) has opened the PR, and the
branch it triages was likely set up with
[git-worktree](../core/git-worktree.md).
