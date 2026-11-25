# PR Modernize

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-pr-modernize
```

```bash
npx skills update do-git-pr-modernize
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-pr-modernize)

## What it does

`do-git-pr-modernize` reassesses an old pull request against its current base and updates it when it still belongs. It modernizes the idea, not just the branch: a clean rebase does not prove the PR is still needed.

Before any push it names one disposition: MODERNIZE, REWORK, SUPERSEDED, or CLOSE. It never merges, closes, or retargets the PR.

## When to reach for it

Type `/do-git-pr-modernize`, or the agent reaches for it when you say "modernize PR" or an old PR needs a rebase and an intent check.

Reach for it on a stale PR you still own. To finish someone else's PR, use [git-pr-takeover](./git-pr-takeover.md).

## The disposition

- **MODERNIZE.** The goal and code still hold. Rebase onto the real base, compare with `git range-diff`, run focused checks, then push with a pinned `--force-with-lease`.
- **REWORK.** The goal holds but the code needs more than a rebase. It names the smallest rewrite and stops unless you asked for it.
- **SUPERSEDED.** Something else already solved it. It cites the replacement and stops.
- **CLOSE.** It recommends closing, with evidence, and stops.

The work happens in its own worktree ([git-worktree](./git-worktree.md)), so dirty files in your checkout stay untouched. A report under `docs/plans/` records the disposition and evidence.

## It's working if

- The report names one disposition with evidence from the base.
- Any push used a lease pinned to the head seen before the rebase.
- The PR was not closed, merged, or retargeted.

## Where it fits

After a MODERNIZE push, the next step is [git-pr-babysit](./git-pr-babysit.md). A REWORK goes to [work](../loop/work.md) when you ask for it. [git-pr-takeover](./git-pr-takeover.md) runs this skill first. Branch safety rules come from [git-safe-pr-workflow](./git-safe-pr-workflow.md).
