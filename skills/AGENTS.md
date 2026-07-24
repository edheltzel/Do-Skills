# skills/ — DOX

## Purpose

Every agent skill in the collection, one directory per skill, grouped into four
buckets. This doc is the contract for creating, editing, moving, and removing
skills.

## Ownership

- `core/` — always-on standards, process, and operational skills; stack-agnostic
- `engineering/` — stack-specific code craft (language, framework, platform)
- `productivity/` — non-code workflow tools
- `personal/` — tied to this repository's own tooling; not portable, not promoted

Buckets do not carry their own AGENTS.md — each bucket's `README.md` is a
human-facing table of its skills, maintained by hand (alphabetical, first
sentence of the skill's description), and this doc is the contract for all four.

## Local Contracts

- Layout: `skills/<bucket>/<skill-dir>/SKILL.md`, plus optional `references/*.md`
  for depth that would bloat SKILL.md (progressive disclosure; keep SKILL.md
  under ~300 lines where practical)
- Frontmatter: `name` and `description` only (plus `alwaysAllow` where a skill
  genuinely needs it). No `user-invocable`, `disable-model-invocation`, or other
  foreign keys
- `name` may use a namespace prefix (`git:worktree`) while the directory stays
  kebab-case (`git-worktree`)
- Description style: what the skill enables, "USE WHEN …" trigger phrases, and
  "NOT FOR …" boundaries that route to sibling skills by name
- Cross-reference sibling skills by bare name in prose; link own references by
  relative path; never leave links pointing outside the skill's directory tree
- Imported skills are adapted to these conventions before landing — strip
  foreign frontmatter, pipelines, and cross-repo links; attribute the source
- Authoring helpers: `distill-to-skill` (what knowledge becomes a skill),
  `skill-builder` (mechanics and validation gates)

## Work Guidance

Any skill add/rename/move/remove must also update, in the same change: the
bucket `README.md` row, `skills.sh.json` (alphabetical within the bucket
grouping), the docs page under `docs/` (promoted buckets only — see
`../docs/AGENTS.md`), and the regenerated root `README.md`.

## Verification

- `bash skills/personal/update-readme/update-readme.sh` must succeed and report
  the expected skill count — it parses every SKILL.md frontmatter, so a parse
  failure or a missing skill shows up here
- Relative links inside changed skills must resolve (check `references/` paths)

## Child DOX Index

None — bucket conventions are uniform and owned here.
