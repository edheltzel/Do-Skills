# Humanize

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-humanize
```

```bash
npx skills update do-humanize
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/slop-guard/do-humanize)

## What it does

`do-humanize` applies fixes from a previous
[review-ai-writing](./review-ai-writing.md) run. Safe findings are applied
automatically. Needs-review findings wait for confirmation.

`--dry-run` previews proposed text edits. The skill will not stash. If
`git status --porcelain` shows anything other than untracked
`ai-writing-review.json`, it stops.

## When to reach for it

You invoke this by typing `/do-humanize`. The agent won't reach for it on its
own.

Reach for it after a review JSON exists at `ai-writing-review.json`. For
a standalone install, install [review-ai-writing](./review-ai-writing.md) too.
This skill reads that report, and with `--all` it invokes that skill first. It
does not replace [bro](./bro.md), which only restates the last reply.

## Prerequisites

A prior `do-review-ai-writing` report at `ai-writing-review.json`, or
`--all` so this skill can invoke the review first. Both skills live in this
collection. A standalone copy of `do-humanize` still needs the review skill
beside it.

## Safe vs needs review

**Safe** means mechanical: delete a chat leak, swap a listed filler phrase,
drop an emoji. **Needs review** means a rewrite that could change meaning:
promotional language, tautological docs, structure. Git artifacts (commits,
PRs) are never auto-fixed.

## It's working if

- `--dry-run` lists the same partitions and does not stash.
- A normal review→humanize run leaves `ai-writing-review.json` readable after
  preflight (G1 allows that untracked file and nothing else).
- Applied files pass the skill's per-type validation. Failures are checked out
  and not listed as OK.
- Success deletes `ai-writing-review.json`. A failed validation keeps that file.

## Where it fits

A user-invoked rewrite pass in Slop Guard, always after
[review-ai-writing](./review-ai-writing.md). [bro](./bro.md) is the one-message
plain-language restatement. [tech-writing](../workflow/tech-writing.md) is the
voice to write with in the first place.
