# Domain model (as terms land)

From `grill-with-docs` / `domain-modeling`. This is the active discipline:
challenge terms, invent edge cases, write the glossary the moment a term
settles. Reading a glossary is not this file.

During the grill, keep the glossary inside `icm-grill-notes.md`. After the
human confirms and the stamp is emitted, move it to `shared/glossary.md`
(or a Language section of root `CONTEXT.md` if the tree has no `shared/`).

Root `CONTEXT.md` stays routing. Do not dump the glossary there.

## Challenge

- Term conflicts with a settled definition: stop and pick one.
- Vague or overloaded word: propose a canonical term and an `_Avoid_` list.
- Stated behavior contradicts the tree on disk: surface the contradiction.
  The disk wins until the human decides otherwise.

## Glossary format

```md
## Language

**Repeating unit**:
The noun one run or one record is.
_Avoid_: project, thing, workspace

**Factory**:
Files that stay the same every run (`_config/`, `shared/`).
_Avoid_: template, boilerplate

**Product**:
What a run emits (stage `output/`, or the library/map itself).
_Avoid_: deliverable soup
```

Rules:

- Opinionated. One word for one concept.
- One or two sentences. What it is, not what it does.
- Only terms specific to this workspace. General programming words stay out.

## ADRs

Offer an ADR only when all three are true:

1. Hard to reverse
2. Surprising without context
3. The result of a real trade-off

Otherwise skip it. One short paragraph is enough:

```md
# Keep AGENTS.md as Layer 0

The existing catalog already routes. A generated CLAUDE.md twin would
drift and overwrite DOX. Pointer file only if a tool requires the name.
```

Write ADRs lazily (`docs/adr/0001-slug.md`) after confirm, not during the
grill, unless the human asks to lock a decision now.

Layer-0 catalog form is already decided for this fleet: DOX-native
`AGENTS.md`. Do not re-open that as a fresh ADR.
