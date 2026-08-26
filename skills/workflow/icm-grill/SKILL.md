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

Load [references/trees.md](references/trees.md) before recommending a stamp.
Load [references/domain-model.md](references/domain-model.md) when a term
settles. Load [references/walk-test.md](references/walk-test.md) only at
confirm / emit.

## Hard rules

- **Opt-in.** If the work is once or twice, say a workspace is not worth it
  and stop. Chat or a skill beats folders.
- Look up disk facts yourself. Only decisions go to the human.
- Ask the current **frontier** only. Number every question. Give a
  recommended answer each time. Wait before the next round.
- Persist working docs in one file, `icm-grill-notes.md`, at the target root
  or cwd. Write the brief, glossary, stage-map or map-plan, questionnaire,
  and decision log **as they land**. Do not batch them at the end.
- **Do not create the target tree** (`_config/`, `stages/`, `map/`,
  `shared/`, ...) until the frontier is empty **and** the human confirms
  shared understanding.
- Emit **one** of the six trees. If none applies, record that conclusion and
  stop. Do not invent a seventh or fall back to the designer.
- **Never** run `icm new` or `icm init`. ICMTemp's designer is not a stamp.
- Layer 0 is `AGENTS.md`. `CLAUDE.md` is a one-line pointer, never a twin.
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
  +-- repeating unit?  -> form (pipeline | library | bundle | map | home)
       +-- factory vs product
       +-- done artifact
       +-- primary reader (default: agents)
       +-- existing catalog? (AGENTS.md / DOX)
            +-- pipeline path -> stages, gates, handoffs, verify
            +-- map path -> nouns, movements, effects, additive-only
                 +-- factory files + questionnaire
                      +-- which of the six trees to copy
                           +-- walk test / icm validate (pipelines only)
```

## Round 0 - facts (no human questions)

In parallel, look up:

- Tree, `AGENTS.md` / `CLAUDE.md`, existing `docs/`, `map/`, `stages/`
- Delivery posture if already recorded (do not invent)
- Whether one of the six trees already covers it
- Whether `icm validate` would even apply (needs `stages/`)

Report the inventory, then open Round 1.

## Round 1 - should this exist?

| Q | Recommend |
| --- | --- |
| Repeating sequential reviewable work, a body later agents must edit, or a one-off? | One-off: no workspace. Edit job: brownfield map. Repeatable run: pipeline. |
| What is the repeating unit? | One noun. |
| Which of the six trees, or none? | Pick one. Do not invent a seventh. |

If the answer is none / one-off: stop. Write that in the notes and do not continue.

## Round 2 - factory / product / done

| Q | Recommend |
| --- | --- |
| What leaves the workspace? | One artifact path. |
| What stays the same every run? | Those files become `_config/` / `shared/`. |
| Who is the primary reader? | Agents. |
| Keep the existing `AGENTS.md`? | Yes. Pointer `CLAUDE.md` if a tool needs that name. |

Write the brief + first glossary terms into `icm-grill-notes.md`.

## Round 3 - structure

**Pipeline / skill / scout / docs:**

| Q | Recommend |
| --- | --- |
| Where does a human already pause? | Those pauses are the only stages. Three real beats beat seven imagined ones. |
| Handoff file at each pause? | One output per stage. |
| What must never be model judgment? | That goes in Verify / a script. |

**Map / home:**

| Q | Recommend |
| --- | --- |
| Nouns a later agent must not confuse? | Object cards, cite `path:line`. |
| What actually moves today? | Process cards only for those. Not aspirational. |
| Additive overlay only? | Yes. |

Write `stage-map.md` or `map-plan.md` into the notes. Offer an ADR only when
hard-to-reverse + surprising + a real trade-off. Layer-0 catalog form is
already decided for this fleet (DOX-native `AGENTS.md`).

## Round 4 - factory setup

Grill the **send**, not the subject: who answers, what must be baked into
`_config/` so no run re-asks it. Each question maps to one file.
System-level only. Write a one-pass `setup-questionnaire.md` in the notes.

## Round 5 - confirm, then copy

Show the filled target tree from [references/trees.md](references/trees.md).
Wait for "yes, that is the shared understanding." Then emit that stamp.
If none of the six applies, stop in Round 1 without creating a tree.

## Round 6 - walk / validate

After emit, run the walk test in [references/walk-test.md](references/walk-test.md).
Pipelines that claim kit compatibility: `icm validate --strict`.
Maps must **not** grow a fake `stages/` just to please the CLI.

## Write / do not write

**Write:** brief, glossary, stage-map or map-plan, questionnaire, then files
from the chosen stamp.

**Do not write:** a second designer inside a product repo; ICM twins;
require-on-add hooks; Herdr lifecycle; a workspace for a two-use chat.
