# PR Takeover

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-pr-takeover
```

```bash
npx skills update do-git-pr-takeover
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-pr-takeover)

## What it does

`do-git-pr-takeover` takes over an existing PR, branch, agent thread, or `do-handoff` note and finishes it. It owns the original goal, not the original code, and it keeps credit with the people who did the work.

Commit authorship and co-author trailers carry over, and identities are checked against real commit data, never guessed. Closing the original PR needs your own explicit go.

## When to reach for it

Type `/do-git-pr-takeover`, or the agent reaches for it when you say "take over this PR".

For your own old PR that only needs updating, use [git-pr-modernize](./git-pr-modernize.md).

## The takeover

- **Recover.** Read the source, its reviews, and later corrections. Resolve it to real code, the current head, and the base. Ask when ownership is unclear.
- **Preserve.** Keep dirty changes as yours and work in a separate worktree ([git-worktree](./git-worktree.md)). A replacement PR starts on a new branch from the original commits, with fixes added on top.
- **Continue.** Run [git-pr-modernize](./git-pr-modernize.md) on the source and respect its disposition. When you asked to finish and publish, it then runs [work](./work.md), `do-commit cpp`, and [git-pr-babysit](./git-pr-babysit.md).

A report under `docs/plans/` covers the inherited state, both PR links, changes, checks, credit, and open decisions.

## It's working if

- Original authors and co-authors appear in the new commits and the PR body.
- The original PR is linked and still open unless you said close it.
- Nothing merged without your go.

## Where it fits

It builds on [git-pr-modernize](./git-pr-modernize.md) and hands off to [git-pr-babysit](./git-pr-babysit.md). Comments on the original PR go through [git-pr-comment](./git-pr-comment.md) only when you ask.
