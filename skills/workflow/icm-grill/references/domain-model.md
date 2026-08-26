# Domain model (as terms land)

From `grill-with-docs` / `domain-modeling`. This is the active discipline:
challenge terms, invent edge cases, write the glossary the moment a term
settles. Reading a glossary is not this file.

During the grill, keep the glossary inside the tracked active notes path
selected in `SKILL.md`. After the human confirms and the stamp is emitted,
move it to the stamp's canonical home:

- Skill library, product-app pipeline, docs bundle, or scout:
  `shared/glossary.md`.
- Firstmate home map or brownfield map overlay: `map/_meta/glossary.md`.

Root `CONTEXT.md` stays routing. Do not dump the glossary there.
After every working fact has moved to its canonical stamp file, delete the
active notes file only if this invocation created it or recognized it as
skill-owned by the required marker when resuming. Never delete or clobber a
user-owned notes file. Never copy the notes into the emitted tree; the walk
test must find one home for each fact.

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
