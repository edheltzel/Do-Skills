# Council

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-council
```

```bash
npx skills update do-council
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/core/do-council)

## What it does

`do-council` convenes three flagship models from three different providers, at high effort, to review or give feedback on the same request. It is read-only: members do not edit, post, commit, or push, and the caller owns every fix.

A missing member or provider stops the run. It reports what is missing and never swaps in a substitute model.

## Example

```
/do-council review the checkout retry logic in src/payments/retry.ts for missed failure cases
```

## When to reach for it

Type `/do-council`, or the agent reaches for it when you say council.

Reach for it when one reviewer is not enough and you want independent opinions that can disagree. For a single correctness hunt, use [adversarial-review](./adversarial-review.md). To apply the findings, use [work](../loop/work.md). For comments already on your PR, use [git-pr-review-triage](../workflow/git-pr-review-triage.md).

## Before the council

The caller fixes known issues, answers outstanding PR comments, and runs the relevant checks first. The council is for what nobody has found yet, not for work already on the list.

## The report

- **Findings.** Each member's findings, evidence, disagreements, and next steps.
- **Scores.** For code review, a score out of 10 per member, or `no score` when one is missing. Scores are never invented.
- **Rounds.** Each fresh pass counts as one round of the adversarial review loop and shares its budget.
- **PR section.** For work that ends in a PR, a `## Council review` section with the round count and a table of members and scores. It goes into the PR body through [commit](../workflow/commit.md) or [tech-writing](../workflow/tech-writing.md), never as a comment.

## It's working if

- Three providers answered, or the run stopped and named the missing one.
- No file changed and nothing posted.
- Every score is real or marked `no score`.

## Where it fits

A second-opinion lens next to [adversarial-review](./adversarial-review.md). [git-pr-review](../workflow/git-pr-review.md) can run it on a PR snapshot. Its next step is [work](../loop/work.md) with the council report.
