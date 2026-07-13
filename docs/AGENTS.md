# docs/ — DOX

## Purpose

Human-facing pages, one per skill in a promoted bucket, read on GitHub. A page
orients one reader around one skill — what it does, when to reach for it, where
it sits among the others. It is not a copy of `SKILL.md`.

## Ownership

- `core/`, `engineering/`, `productivity/` — mirror the promoted buckets under
  `skills/`; every skill there has exactly one page at `docs/<bucket>/<skill-dir>.md`
- `skills/personal/` is not promoted and ships no docs pages
- `docs/README.md` — the docs index; update it only when buckets change

## Local Contracts

- The authoritative page guide is `.agents/writing-docs.md` — follow it for page
  shape, tone, and link rules; do not restate it here
- Standing shape: H1 title, Quickstart (`npx skills add edheltzel/skills
  --skill=<name>` and `npx skills update <name>`), Source link to the GitHub
  tree, "What it does", "When to reach for it", one or two substance sections,
  "Where it fits" with repo-relative links to sibling docs pages
- A skill rename/move/removal moves or deletes its page in the same change

## Work Guidance

Create or re-sync a page whenever a promoted skill is added, renamed, moved
between buckets, or has its behavior changed. Note imported/adapted skills'
source attribution on their pages.

## Verification

Repo-relative links on changed pages must resolve to existing files.

## Child DOX Index

None.
