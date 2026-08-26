# Domain model (as terms land)

From `grill-with-docs` / `domain-modeling`. This is the active discipline:
challenge terms, invent edge cases, and write the glossary when a term settles
once the selected emission has a canonical glossary destination. Before that
destination is known, keep settled source facts in the brief. Reading a
glossary is not this file.

During the grill, keep an applicable glossary inside the tracked active notes
path selected in `SKILL.md`. After the human confirms and the stamp is
emitted, move it to the stamp's canonical home:

- Skill library, product-app pipeline, docs bundle, or scout:
  `shared/glossary.md`.
- Brownfield map overlay, or firstmate-home when this emit includes `map/`:
  `map/_meta/glossary.md`.
- Firstmate-home with no map overlay: do not collect a glossary section or
  emit a glossary file.

Move the working decision log to `shared/decision-log.md` when the stamp has
`shared/`. Use `map/_meta/decision-log.md` only when this emit includes a
`map/` overlay. For firstmate-home, wait until the optional map decision is
settled before collecting glossary or decision-log sections. A firstmate-home
with no map gets neither section and no files under `map/_meta/`. Never create
a root decision log.

Root `CONTEXT.md` stays routing. Do not dump the glossary there.
After every working fact has moved to its canonical stamp file, retain the
active notes through the Round 9 walk test and any strict validation required
for a tree with `stages/`. Delete it only after those checks succeed and only
if this invocation created it or recognized it as skill-owned by the required
marker when resuming. If resumed notes already contain glossary or
decision-log facts and a firstmate-home emits no map, retain those notes unless
every fact has moved to another approved canonical destination. Never invent a
destination to permit deletion, delete or clobber a user-owned notes file, or
copy the notes into the emitted tree; the walk test must find one home for each
fact.

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

During the grill, keep every ADR draft in the active notes path, even when the
human asks to lock the decision. Add its proposed `docs/adr/0001-slug.md` path
to the Round 8 plan. Materialize it only after shared-understanding
confirmation and approval of any collision at that path.

Layer-0 catalog form is already decided for this fleet: DOX-native
`AGENTS.md`. Do not re-open that as a fresh ADR.
