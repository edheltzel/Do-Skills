# PR Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-pr-review
```

```bash
npx skills update do-git-pr-review
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-pr-review)

## What it does

`do-git-pr-review` reviews a remote pull request by URL or number and drafts comments you can act on. It reviews the PR head, not your working tree, and it never edits code, pushes, or merges.

The review is a COMMENT review by default. It approves or requests changes only when you ask for that event.

## When to reach for it

Type `/do-git-pr-review`, or the agent reaches for it when you ask to review a PR rather than local changes.

For comments already left on your own PR, use [git-pr-review-triage](./git-pr-review-triage.md). For local changes before a PR exists, use [adversarial-review](../core/adversarial-review.md).

## The review

1. Resolve the PR, its head, base, merge base, and checks. Fetch the head without touching your checkout.
2. State the intended behavior from the title, body, and linked issues.
3. Run [adversarial-review](../core/adversarial-review.md) on the merge-base-to-head diff, plus [council](../core/council.md) if you ask for one.
4. Draft one comment per finding: P0-P3, `file:line` on the head, trigger and impact, and a specific fix.

The review file `docs/plans/YYYY-MM-DD-pr-<number>-review.md` records the head SHA it reviewed, the findings, the drafts, and a `## todo.txt` section.

## It's working if

- The review file names the head SHA it reviewed.
- Every inline draft sits on a line in the head diff.
- Nothing posted until you said to post, and then only through [git-pr-comment](./git-pr-comment.md).

## Where it fits

The outside-PR counterpart to [git-pr-review-triage](./git-pr-review-triage.md). [it](./it.md) uses it for its external PR route. Posting is [git-pr-comment](./git-pr-comment.md); a re-check right before posting catches a head that moved.
