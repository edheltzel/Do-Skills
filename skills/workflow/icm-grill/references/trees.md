# Six fleet trees

Source: Firstmate scout `icm-template-map-scout`. Each is opt-in. None is
required on project add. Pick one or stop when none applies. Do not invent a
seventh or use the designer as a fallback.

Topology labels are contractual. Every unmarked node in the selected stamp is
required. A node marked `optional` may be omitted. A node marked `conditional`
is omitted unless its stated condition is true; once selected, its unmarked
descendants are required. Lines marked `existing` or `subject tree` describe
preserved target context, not nodes to create. Round 5 may add optional nodes
but may not remove, rename, or replace required nodes. If the target cannot
support the fixed required topology, reject the stamp instead of adapting it.

Shared conventions for any tree that should pass the cloned ICMTemp kit:

- Layer 0 = `AGENTS.md`. Before replacing an existing `CLAUDE.md`, move every
  unique rule into `AGENTS.md` or the stamp's canonical catalog. Only then make
  `CLAUDE.md` a one-line pointer; never discard rules or create a twin.
- Layer 1 = root `CONTEXT.md` (routing only).
- Stages = `NN_slug` with `CONTEXT.md` + `references/` + `output/`. Emit
  `references/.gitkeep` or `output/.gitkeep` whenever the directory would
  otherwise be empty. These are structural placeholders, not artifacts, and
  never count toward stage status or completion. Artifact paths shown below
  are contracts; do not create those files until the stage produces them.
- Headings = Inputs, Process, Outputs, Review Gate, Verify.
- Root dirs = `_config/`, `_templates/`, `shared/`, `stages/` when it is a pipeline.
- Do not generate the designer (`00_intake` through `05_validation`).
- When the emitted tree includes `stages/`, bake the **Pipeline reset
  contract** below into `AGENTS.md`, or `_config/delivery.md` when that file
  exists. Do not write it for home, map, or any emitted tree without
  `stages/`.

### Pipeline reset contract

Before stage work begins on every confirmed new run, clear all prior artifacts
from every `stages/*/output/` directory while preserving `.gitkeep`. Ignore
`.gitkeep` when deriving stage status. Only artifacts written after that reset
count as current-run evidence or completion. Reuse the canonical output paths;
do not archive artifacts or create per-run namespaces.

Kit stage folder regex: `^\d{2}_[a-z0-9][a-z0-9_-]*$`. `01-audit-ia` fails
`icm validate --strict`.

## 1. Skill library

**When:** Atlas/Skills, Firstmate `.agents/skills`, Pi extensions,
`~/.agents/skills/*`. Repeating unit is a skill folder, not a weekly run.

If the job is one `SKILL.md`, do not build this. A saved prompt is enough.

```text
skill-workspace/
  AGENTS.md                         # Layer 0: how to add / migrate a skill
  CONTEXT.md                        # route: new skill | migrate | review
  _config/
    skill-frontmatter.md
    naming.md                       # lowercase-hyphen, Pi vs Claude
  _templates/
    skill-record/
      SKILL.md
      references/.gitkeep
  shared/
    glossary.md
    decision-log.md
  skills/                           # the library (product)
    <name>/
      SKILL.md
      references/
      assets/                       # optional
  stages/                           # only if authoring is repeating
    00_intake/        output/skill-brief.md
    01_outline/       output/skill-outline.md
    02_draft/         output/SKILL.md
    03_walk_test/     output/validation-report.md
```

## 2. Firstmate home map

**When:** a new firstmate / secondmate home, or documenting an existing one.
Repeating unit is a home + its projects, not a run.

Do not run `icm init` here. Do not invent `stages/` for spawn/supervise. A
`map/` is only justified if later agents keep getting lost. If this emit has
no `map/`, do not write glossary or decision-log under `map/_meta/`.

```text
<home>/
  AGENTS.md                         # already the catalog; keep it
  CLAUDE.md                         # conditional: existing or tool-required pointer
  CONTEXT.md                        # optional thin route table
  docs/
  map/                              # optional overlay, never a second catalog
    CONTEXT.md
    _meta/
      glossary.md
      decision-log.md
    objects/
      home.md
      project.md
      secondmate.md
      task.md
    processes/
      intake.md
      spawn.md
      supervise.md
      land.md
    effects/CONTEXT.md
  data/  state/  config/  projects/ # existing; do not rename
  bin/   .agents/skills/
```

## 3. Product-app pipeline

**When:** Echo, Muse, Recall, Alianza, Cadis. A repo that already ships code
and needs a repeatable change line.

Implementation writes **code in the subject tree** and a short note in
`output/`. Do not make `output/` a second source of truth.

```text
<app>/
  AGENTS.md                         # existing product catalog stays Layer 0
  CLAUDE.md                         # conditional: existing or tool-required pointer
  CONTEXT.md                        # route: bug | feature | release
  src/ ... tests/ ...               # subject tree; ICM does not move it
  _config/
    delivery.md
    quality-gates.md
  _templates/
    run-brief.md
  shared/
    glossary.md
    decision-log.md
    acceptance-log.md
  stages/
    00_intake/        output/change-brief.md
    01_repro_or_spec/ output/repro.md | spec.md
    02_implement/     output/change-notes.md
    03_verify/        output/verify-report.md
    04_ship/          output/pr-notes.md
```

Review gates sit after intake, after spec/repro, and before ship.

## 4. Docs bundle

**When:** Standards trees, Muse docs, Firstmate `docs/`, Echo docs, a vault
that is the product.

```text
docs-workspace/
  AGENTS.md
  CONTEXT.md
  _config/
    voice.md
    source-rules.md                 # cite or don't claim
  _templates/
    page.md
    review-note.md
  shared/
    glossary.md
    decision-log.md
  corpus/                           # raw sources + checkbox index
  bundle/                           # navigable product
    index.md
    always/
    by-task/
    evidence/
  stages/
    00_intake/        output/docs-brief.md
    01_inventory/     output/source-inventory.md
    02_draft/         output/draft.md
    03_review/        output/review-report.md
    04_publish/       output/publish-notes.md
```

The canonical source inventory is
`stages/01_inventory/output/source-inventory.md`. If existing navigation
requires `shared/source-inventory.md`, make it a pointer to that canonical
artifact and store no inventory facts there.

## 5. Brownfield map overlay

**When:** an existing repo later agents must edit without slurping. Never
`icm init`.

Acceptance: the map overlay is all adds, with zero `src/` edits, and is
walkable cold from `AGENTS.md` plus one card. The only allowed modification to
existing root files is catalog migration: move rules unique to `CLAUDE.md`
into `AGENTS.md`, then make `CLAUDE.md` a pointer. Do not change either file
for any other brownfield-map purpose. Do not emit empty `processes/` or
`effects/`, and do not twin `AGENTS.md`.

This tree will **not** pass `icm validate` (no `stages/`). That is correct.
Do not bolt a fake pipeline onto a map so the CLI goes green.

```text
<existing-repo>/
  AGENTS.md                         # real catalog (DOX-native)
  CLAUDE.md                         # conditional: existing or tool-required pointer
  src/ ...                          # untouched by the overlay
  map/
    CONTEXT.md
    _meta/
      glossary.md
      decision-log.md
      schema.md
    _templates/
      object.md
      process.md
    objects/                        # nouns, cite path:line
    processes/                      # conditional: real movements only
    effects/CONTEXT.md              # conditional: real effects only
```

## 6. Scout

**When:** a Firstmate scout. Repeating unit is one investigation.

Do not stand this up as a new repo for every scout. The useful extract is
the stage contracts + report template, dropped into `data/<id>/`.

```text
scout-workspace/                    # or data/<id>/ as the product shelf
  AGENTS.md                         # "knowledge only; write report.md"
  CONTEXT.md
  _config/
    evidence-rules.md
    decision-hold.md
  _templates/
    report.md
    finding.md
  shared/
    glossary.md
    decision-log.md
  stages/
    00_intake/        output/question.md
    01_inventory/     output/sources.md
    02_findings/      output/findings.md
    03_report/        output/report.md
    04_holds/         output/hold-inventory.md
```

## Designer vs stamp

ICMTemp's six-stage tree (`00_intake` through `05_validation`) is a
**designer**, not a seventh stamp or a fallback. If none of the six stamps
fits, stop and say that none applies. This skill never runs `icm new` or
`icm init`.
