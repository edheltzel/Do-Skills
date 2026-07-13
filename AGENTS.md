# DOX framework

- DOX is a highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Project Contract

This repository is Ed's agent-skills collection (`edheltzel/Skills`), installable via
`npx skills add edheltzel/skills` or as Claude Code skills. Skills live under
`skills/<bucket>/<skill-dir>/SKILL.md`; human docs pages live under `docs/`.

Four surfaces must stay in sync for every skill change — adding, renaming, moving,
or removing a skill touches all of them:

1. `skills/<bucket>/<skill-dir>/` — the skill itself (see `skills/AGENTS.md`)
2. `docs/<bucket>/<skill-dir>.md` — its docs page, promoted buckets only (see `docs/AGENTS.md`)
3. `skills.sh.json` — the skill's entry in its bucket grouping, alphabetical
4. READMEs — the bucket's `skills/<bucket>/README.md` table row, then regenerate the
   root `README.md` with `bash skills/personal/update-readme/update-readme.sh`

Detailed agent guides live in `.agents/` (`writing-docs.md`, `code-reviewer.md`) —
follow them where they apply; they predate DOX and remain authoritative for their
topics.

Repo workflow: feature branch → PR into `master` → Ed merges. Never commit
straight to `master`.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

- Keep skill imports surgical: atlas skills stay the base doctrine; graft external
  payloads into existing skills rather than adopting foreign pipelines wholesale
- On overlap, merge as a complementary union — lose neither side's feature set
- Attribute imported/adapted skills to their source in docs pages and commit messages
- Process skills keep confirm-first human gates (seams before tests, quiz before
  ticket publish, triage/wayfinder confirms); the TDD loop is strictly red→green
  with refactoring at review; `spec` synthesizes and publishes without pausing

## Child DOX Index

- `skills/AGENTS.md` — authoring and maintaining skills: bucket boundaries, SKILL.md layout, frontmatter and description conventions, references, and the sync surfaces a skill change must touch
- `docs/AGENTS.md` — the human-facing docs pages: when a page is required, its shape, and its verification

Owned by root (no child doc): `skills.sh.json`, top-level `README.md`, `.agents/` guides, `LICENSE`.
