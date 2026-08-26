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
- Persist working docs in one notes file at the target root or cwd. Prefer
  `icm-grill-notes.md`. If that path already exists: resume it only when it
  is a recognized incomplete grill from this skill; otherwise use a unique
  scratch name and never overwrite the existing file. Write the brief,
  glossary, stage-map or map-plan, and decision log **as they land**. Write
  a questionnaire only for stamps with `_config/`. Do not batch them at the
  end. After a successful emission, move every fact into its canonical stamp
  file and delete only the notes file this invocation created. Never delete
  or clobber a user-owned notes file. Do not copy the notes into the emitted
  tree.
- **Do not create the target tree** (`_config/`, `stages/`, `map/`,
  `shared/`, ...) until the frontier is empty **and** the human confirms
  shared understanding.
- Preserve every existing target file by default. Before emission, show a
  path-by-path collision plan for every file the stamp would add or modify,
  including the exact merge or replacement proposed. A confirmed tree shape
  is not permission to overwrite anything; obtain explicit confirmation for
  each merge or replacement.
- Emit **one** of the six trees. If none applies, record that conclusion and
  stop. Do not invent a seventh or fall back to the designer.
- **Never** run `icm new` or `icm init`. ICMTemp's designer is not a stamp.
- Layer 0 is `AGENTS.md`. Before replacing an existing `CLAUDE.md`, move every
  unique rule into `AGENTS.md` or the stamp's canonical catalog. Only then make
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

Report the inventory, then open Round 1.

## Round 1 - should this exist?

| Q | Recommend |
| --- | --- |
| Repeating sequential reviewable work, a body later agents must edit, or a one-off? | One-off: no workspace and stop. Otherwise continue; pick the stamp in Round 4. |

If the answer is one-off: stop. Write that in the notes and do not continue.

## Round 2 - repeating unit

| Q | Recommend |
| --- | --- |
| What one noun repeats, or what durable subject must remain navigable? | Name one unit or subject before choosing a tree. |

Add the settled unit or subject to the brief and glossary.

## Round 3 - factory / product / done

| Q | Recommend |
| --- | --- |
| What leaves the workspace? | One artifact path. |
| What stays the same every run or edit? | Pipeline stamps put it in `_config/` / `shared/`; map and home stamps put vocabulary in `map/_meta/`. |
| Who is the primary reader? | Agents. |

For a durable map or library, the product may be the maintained body itself
rather than a per-run artifact. Write the brief + first glossary terms into
`icm-grill-notes.md`.

## Round 4 - choose the stamp

| Q | Recommend |
| --- | --- |
| Which of the six trees, or none, fits the landed facts and product boundary? | Pick one. Do not invent a seventh. |

If the answer is none: stop. Write that in the notes and do not create a tree.

For Firstmate-home and brownfield-map stamps, stable map vocabulary belongs
in `map/_meta/`; keep existing operational configuration in place. Do not add
`_config/` or schedule factory setup for those stamps.

## Round 5 - structure discovery

**Pipeline / skill / scout / docs:**

| Q | Recommend |
| --- | --- |
| Where does a human already pause? | Those pauses are the only stages. Three real beats beat seven imagined ones. |
| What must never be model judgment? | That goes in Verify / a script. |

**Map / home:**

| Q | Recommend |
| --- | --- |
| Nouns a later agent must not confuse? | Object cards, cite `path:line`. |
| What actually moves today? | Process cards only for those. Not aspirational. |
| Additive overlay only? | Yes. |

Write a draft `stage-map.md` or `map-plan.md` into the notes.

## Round 6 - derived contracts

Ask only about structure discovered in Round 5.

**Pipeline / skill / scout / docs:**

| Q | Recommend |
| --- | --- |
| For each confirmed pause, what exact inputs, handoff artifact, and human gate apply? | One output per stage, with exact paths and one review gate. |

**Map / home:**

| Q | Recommend |
| --- | --- |
| Which card owns each confirmed noun or movement, and what source path proves it? | One canonical card per concept, citing `path:line`. |

Update `stage-map.md` or `map-plan.md` in the notes. Offer an ADR only when
hard-to-reverse + surprising + a real trade-off. Layer-0 catalog form is
already decided for this fleet (DOX-native `AGENTS.md`).

## Round 7 - factory setup (stamps with `_config/` only)

Skip this round for Firstmate-home and brownfield-map stamps. Do not add
`_config/` or a setup questionnaire to either stamp.

Grill the **send**, not the subject: who answers, what must be baked into
`_config/` so no run re-asks it. Each question maps to one file.
System-level only. Write a one-pass `setup-questionnaire.md` in the notes.

## Round 8 - confirm, then copy

Show the filled target tree from [references/trees.md](references/trees.md).
Resolve it against the current disk and show a collision plan with one row per
target file: path, current state, proposed action (`add`, `preserve`, `merge`,
or `replace`), and the exact content change for every merge or replacement.
Wait for "yes, that is the shared understanding" and explicit approval of
each merge or replacement. Preserve unapproved collisions and revise the tree
around them; never infer overwrite permission from approval of the overall
stamp. Then emit only the agreed actions.
If none of the six applies, stop in Round 4 without creating a tree.
For an emitted tree that includes `stages/`, bake this line into an existing
file: write it to `AGENTS.md`, or to `_config/delivery.md` when that file
exists. The line: a new confirmed run
overwrites `stages/*/output/` in place; leftover output is not this run. Do not
add per-run namespaces or archive dirs. For an existing emitted pipeline,
apply that overwrite before stage work. Do not write this reset rule for a
home, map, or any emitted tree without `stages/`.
After the canonical files are complete, delete only the notes file this
invocation created, then run Round 9. Keep that file if emission does not
complete. Never delete a notes file this run did not create.

## Round 9 - walk / validate

After emit, run the walk test in [references/walk-test.md](references/walk-test.md).
Pipelines that claim kit compatibility: `icm validate --strict`.
Maps must **not** grow a fake `stages/` just to please the CLI.

## Write / do not write

**Write:** brief, glossary, stage-map or map-plan, a questionnaire only for
stamps with `_config/`, then files from the chosen stamp.

**Do not write:** a second designer inside a product repo; ICM twins;
require-on-add hooks; Herdr lifecycle; a workspace for a two-use chat.
