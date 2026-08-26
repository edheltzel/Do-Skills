---
name: icm-grill
description: >
  Grill a workspace into one of six ICM fleet trees. Use when someone asks to
  ICM a folder, interview a process for Interpretable Context Methodology,
  design a skill library / firstmate home / product pipeline / docs bundle /
  brownfield map / scout workspace, or says icm-grill, icm-interview, grill
  this workspace. Opt-in only. Do not fire on ordinary project-add.
---

# ICM Grill

Interview like `grill-with-docs`. Emit one of six fleet trees. ICMTemp is a
**designer**, not a product catalog. Do not wrap RinDig `icm-architect` and
hope: its five generic questions are the wrong interviewer.

Load [references/trees.md](references/trees.md) and
[references/domain-model.md](references/domain-model.md) before opening Round
1 so the terminology rules shape the grill. Load
[references/walk-test.md](references/walk-test.md) only at confirm / emit.

## Hard rules

- **Opt-in.** If the work is once or twice, say a workspace is not worth it
  and stop. Chat or a skill beats folders.
- Look up disk facts yourself. Only decisions go to the human.
- Ask the current **frontier** only. Number every question. Give a
  recommended answer each time. Wait before the next round.
- Persist working docs in one tracked **active notes path** at the target root
  or cwd. Prefer `icm-grill-notes.md`. Canonicalize the target without creating
  it: make the path absolute and lexically normalized, resolve its deepest
  existing ancestor to a physical symlink-resolved path, then append the
  normalized unresolved suffix. Hash that exact canonical path as UTF-8 with
  SHA-256 and lowercase hexadecimal, with no trailing newline. Record only the
  digest, never the path, in
  `<!-- icm-grill-notes:v3 status=incomplete target-sha256="<digest>" -->`.
  Before creating a new scratch file, search the target root and cwd for marked
  `icm-grill-notes*.md` files. Resume only an incomplete `v3` file whose digest
  exactly matches this invocation. Preserve every marker recorded for another
  target; it is never reusable, overwriteable, or deletable by this invocation.
  Never resume `status=done-no-tree`. A targetless `v1` marker is legacy: never
  resume it automatically. Show its path and require confirmation that it
  belongs to this target, then replace its marker with the matching `v3`
  marker before writing anything else. A `v2` marker containing a raw target
  path is also legacy: resume it only when that path exactly matches the
  canonical target, and replace it with the matching `v3` marker before any
  other write. Resume a single matching incomplete scratch; if several match,
  ask which one. Only that selected scratch is reusable. If the preferred path
  is occupied by anything else, including user-owned notes, a nonmatching
  skill marker, or a done marker, preserve it and choose an unused
  `icm-grill-notes-<digest-prefix>-<counter>.md` path. Once selected, use the
  same active notes path for every later write.
  Write the brief and stage-map or map-plan **as they land**. Write glossary
  and decision-log sections as they land only after the selected emission is
  known to provide their canonical destinations; before then, keep settled
  source facts in the brief. Write a questionnaire only for stamps with
  `_config/`. Do not batch applicable sections at the end. After a successful
  emission, move every fact into its canonical stamp file. The decision log
  belongs in `shared/decision-log.md` when the stamp has `shared/`. Use
  `map/_meta/decision-log.md` only when this emit includes a `map/` overlay. A
  firstmate-home with no map gets neither glossary nor decision-log sections
  in the active notes and no files under `map/_meta/`. If resumed active notes
  already contain either section, retain the notes after a no-map emission
  unless every fact has moved to another approved canonical destination;
  never invent a destination to permit deletion. Never create a root decision
  log. Delete the active notes file only after all applicable Round 9 checks
  succeed and only when this invocation created it or resumed it under the
  matching `v3` target marker. Retain it while emission or validation is
  incomplete. Never delete or clobber user-owned or nonmatching notes. Do not
  copy the notes into the emitted tree.
- **Do not create the target tree** (`_config/`, `stages/`, `map/`,
  `shared/`, ...) until the frontier is empty **and** the human confirms
  shared understanding.
- The selected stamp's required topology is fixed. Every node in
  [references/trees.md](references/trees.md) that is not explicitly labeled
  optional or conditional is required; selecting a conditional parent makes
  its unmarked descendants required. Round 5 observations may add optional
  nodes, but may not remove, rename, or substitute a required node. If the
  target facts do not fit every required node, reject that stamp and stop or
  choose another; do not emit a modified version under the stamp's name.
- Preserve every existing target file by default. Before emission, show a
  path-by-path collision plan for every file the stamp would add or modify,
  including the exact merge or replacement proposed. A confirmed tree shape
  is not permission to overwrite anything; obtain explicit confirmation for
  each merge or replacement. A stamp node is optional only when
  [references/trees.md](references/trees.md) labels it optional or conditional.
  If a required node collides and its merge or replacement is not approved,
  abort emission; do not omit or relocate the node and still claim that stamp.
- After approval and immediately before emission, re-read every planned path
  and compare its existence, type, and contents with the state used for the
  approved collision plan. If any path changed, discard the stale plan,
  present a revised collision plan, and repeat the required confirmation and
  approvals before emitting anything.
- Emit **one** of the six trees. If none applies, record that conclusion and
  stop. Do not invent a seventh or fall back to the designer.
- **Never** run `icm new` or `icm init`. ICMTemp's designer is not a stamp.
- Layer 0 is a required `AGENTS.md`; its absence does not disqualify a stamp.
  If it is missing, add a thin catalog. If it exists, preserve every unique
  rule and propose any needed catalog merge in the Round 8 collision plan;
  never clobber it. Before replacing an existing `CLAUDE.md`, move every unique
  rule into `AGENTS.md` or the stamp's canonical catalog. Only then make
  `CLAUDE.md` a one-line pointer; never discard rules or create twin catalogs.
- Do not generate a designer (`00_intake` ... `05_validation`). If the job is
  a new workspace that is not one of the six, stop.
- Pipeline stages use `NN_slug` (kit regex). Maps have no prefix.
- No require-on-add. No Herdr lifecycle. No ICM twins.

## Round format

```
❓ **Q1** - **<title>**: <body, choices if useful>

➡️ <recommended answer>

---
```

A question that depends on an unanswered one belongs in a later round.

## Design tree

```
need ICM at all?
  +-- repeating unit or durable subject?
       +-- factory vs product
       +-- done artifact
       +-- primary reader (default: agents)
       +-- existing catalog? (AGENTS.md / DOX)
            +-- which of the six trees to copy
                 +-- pipeline path -> discover pauses
                 |    +-- stages, gates, handoffs, verify
                 +-- map path -> nouns, movements, effects, additive-only
                      +-- pipeline / library / bundle / scout -> factory questionnaire
                      +-- home / map -> skip factory setup
                           +-- walk test / icm validate (pipelines only)
```

## Round 0 - facts (no human questions)

In parallel, look up:

- Tree, existing `docs/`, `map/`, `stages/`, and rules unique to either
  `AGENTS.md` or `CLAUDE.md`
- Delivery posture if already recorded (do not invent)
- Whether one of the six trees already covers it
- Whether `icm validate` would even apply (needs `stages/`)

If an existing tree already covers the target, report the matching tree, route
the requested work to its existing contracts or maintenance workflow, and
stop. Do not create or resume notes and do not open Round 1. Otherwise report
the inventory, select the active notes path, and open Round 1.

## Round 1 - should this exist?

| Q | Recommend |
| --- | --- |
| Will this be used once, twice, repeatedly, or as a durable body later agents must maintain? | Once or twice: no workspace and stop. Repeating work or a durable maintained body: continue and pick the stamp in Round 4. |

If the answer is once or twice: stop. Write that in the active notes path,
set the marker to `status=done-no-tree`, and do not continue.

## Round 2 - repeating unit

| Q | Recommend |
| --- | --- |
| What one noun repeats, or what durable subject must remain navigable? | Name one unit or subject before choosing a tree. |

Add the settled unit or subject to the brief in the active notes path. Do not
create a glossary section before the selected emission is known to provide a
canonical glossary destination.

## Round 3 - factory / product / done

| Q | Recommend |
| --- | --- |
| What leaves the workspace? | One artifact path. |
| What stays the same every run or edit? | Pipeline stamps put it in `_config/` / `shared/`; map and home stamps put vocabulary in `map/_meta/`. |
| Who is the primary reader? | Agents. |

For a durable map or library, the product may be the maintained body itself
rather than a per-run artifact. Write the landed facts into the brief. Add
glossary or decision-log sections only after their canonical destinations are
known.

## Round 4 - choose the stamp

| Q | Recommend |
| --- | --- |
| Which of the six trees, or none, fits the landed facts and product boundary? | Pick one. Do not invent a seventh. |

If the answer is none: stop. Write that in the active notes path, set the
marker to `status=done-no-tree`, and do not create a tree.

A stamp fits only when all its required topology applies to the landed facts.
Reject it and choose another stamp or `none` when any required stage, card,
catalog, or routing node does not fit.

For Firstmate-home and brownfield-map stamps, stable map vocabulary belongs
in `map/_meta/`; keep existing operational configuration in place. Do not add
`_config/` or schedule factory setup for those stamps.

Begin glossary and decision-log sections after stamp selection only when the
selected emission has their canonical destinations. For Firstmate-home, wait
until Round 5 settles whether the optional `map/` overlay will be emitted. If
it will not, do not collect either section.

## Round 5 - structure discovery

**Pipeline / skill / scout / docs:**

| Q | Recommend |
| --- | --- |
| Where does a human already pause beyond the required stamp stages? | Use those pauses only to propose optional stages. Do not remove or replace a required stage. |
| What must never be model judgment? | That goes in Verify / a script. |

**Map / home:**

| Q | Recommend |
| --- | --- |
| Nouns a later agent must not confuse? | Object cards, cite `path:line`. |
| What actually moves today beyond the required stamp cards? | Add optional process cards only for observed movements. Not aspirational. |
| Additive overlay only? | Yes. |

Write a draft `stage-map.md` or `map-plan.md` into the active notes path. Keep
the required stamp nodes intact and label every discovered addition optional.
If a required node is false for the target, return to Round 4 and reject the
stamp.

For Firstmate-home, settle whether `map/` will be emitted before collecting
glossary terms or decision-log entries. A no-map home skips both sections.

## Round 6 - derived contracts

Ask about the selected stamp's required nodes and any optional structure
discovered in Round 5.

**Pipeline / skill / scout / docs:**

| Q | Recommend |
| --- | --- |
| For each required or optional stage, what exact inputs, handoff artifact, and human gate apply? | One output per stage, with exact paths and one review gate. |

**Map / home:**

| Q | Recommend |
| --- | --- |
| Which required or optional card owns each noun or movement, and what source path proves it? | One canonical card per concept, citing `path:line`. |

Update `stage-map.md` or `map-plan.md` in the active notes path. Offer an ADR
only when hard-to-reverse + surprising + a real trade-off, and keep any ADR
draft in the active notes path until Round 8 confirmation and collision
approval. Layer-0 catalog form is already decided for this fleet (DOX-native
`AGENTS.md`).

## Round 7 - factory setup (stamps with `_config/` only)

Skip this round for Firstmate-home and brownfield-map stamps. Do not add
`_config/` or a setup questionnaire to either stamp.

Grill the **send**, not the subject: who answers, what must be baked into
`_config/` so no run re-asks it. Each question maps to one file.
System-level only. Write a one-pass `setup-questionnaire.md` in the active
notes path.

## Round 8 - confirm, then copy

Show the filled target tree from [references/trees.md](references/trees.md).
Resolve it against the current disk and show a collision plan with one row per
target file: path, current state, proposed action (`add`, `preserve`, `merge`,
or `replace`), and the exact content change for every merge or replacement.
Wait for "yes, that is the shared understanding" and explicit approval of
each merge or replacement. For an unapproved collision on an optional node,
preserve the existing file and omit that node. For an unapproved collision on
a required node, abort emission. Do not omit or relocate required catalogs,
routing files, or selected stage contracts and still claim that stamp. Never
infer overwrite permission from approval of the overall stamp. After all
approvals, re-resolve and re-read every planned path. Compare its existence,
type, and contents with the snapshot used for the approved plan. If any state
changed, emit nothing: present a revised collision plan and repeat the shared-
understanding confirmation and required approvals. Emit only the agreed
actions from a plan that still matches disk.
If none of the six applies, stop in Round 4 without creating a tree.
For an emitted tree that includes `stages/`, persist the complete **Pipeline
reset contract** from [references/trees.md](references/trees.md) in
`AGENTS.md`, or in `_config/delivery.md` when that file exists. Do not shorten
it to an overwrite statement. Do not write this reset contract for a home,
map, or any emitted tree without `stages/`.
After the canonical files are complete, retain the active notes file and run
Round 9. Keep it if emission does not complete.

## Round 9 - walk / validate

After emit, run the walk test in [references/walk-test.md](references/walk-test.md).
For every emitted tree that contains `stages/`, run `icm validate --strict`.
Do not run strict validation for a home or brownfield map without `stages/`,
and do not add fake stages to make one pass. Only after every applicable check
succeeds, delete the active notes file if this invocation created it or
resumed it under the matching `v3` target marker. Never delete user-owned or
nonmatching notes; retain the active notes when a check fails or remediation
is interrupted.

## Write / do not write

**Write:** brief and stage-map or map-plan in the active notes path; glossary
and decision log only when the selected emission provides canonical
destinations; a questionnaire only for stamps with `_config/`; then files from
the chosen stamp.

**Do not write:** a second designer inside a product repo; ICM twins;
require-on-add hooks; Herdr lifecycle; a workspace for a two-use chat.
