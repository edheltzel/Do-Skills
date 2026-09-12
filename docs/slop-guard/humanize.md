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

`--dry-run` previews proposed text edits. Upstream preflight and cleanup are
not explicitly excluded, so treat it as potentially state-changing. If
`git status --porcelain` is not empty, the skill runs
`git stash push -u -m "beagle-docs: pre-humanize backup"` before the dry-run
branch. On validation failure it reverts the file and tells you to
`git stash pop`. That stash message and rollback path are upstream Beagle
behavior. They are not renamed.

## When to reach for it

You invoke this by typing `/do-humanize`. The agent won't reach for it on its
own.

Reach for it after a review JSON exists at `.beagle/ai-writing-review.json`. For
a standalone install, install [review-ai-writing](./review-ai-writing.md) too.
This skill reads that report, and with `--all` it invokes that skill first. It
does not replace [bro](./bro.md), which only restates the last reply.

## Prerequisites

A prior `do-review-ai-writing` report at `.beagle/ai-writing-review.json`, or
`--all` so this skill can invoke the review first. Both skills live in this
collection. A standalone copy of `do-humanize` still needs the review skill
beside it.

## Safe vs needs review

**Safe** means mechanical: delete a chat leak, swap a listed filler phrase,
drop an emoji. **Needs review** means a rewrite that could change meaning:
promotional language, tautological docs, structure. Git artifacts (commits,
PRs) are never auto-fixed.

## It's working if

- `--dry-run` lists the same partitions. Do not assume the working tree is
  untouched. Preflight may have stashed, and cleanup is not dry-run-guarded.
- Applied files pass the skill's per-type validation. Failures are checked out
  and not listed as OK.
- Success deletes `.beagle/ai-writing-review.json`. A failed validation keeps
  that file and points at `git stash pop`.

## Where it fits

A user-invoked rewrite pass in Slop Guard, always after
[review-ai-writing](./review-ai-writing.md). [bro](./bro.md) is the one-message
plain-language restatement. [tech-writing](../workflow/tech-writing.md) is the
voice to write with in the first place.
