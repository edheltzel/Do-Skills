# ICM Grill

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=icm-grill
```

```bash
npx skills update icm-grill
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/icm-grill)

## What it does

`icm-grill` interviews a process or folder until there is a shared
understanding, then emits one of six ICM fleet trees: skill library,
firstmate home map, product-app pipeline, docs bundle, brownfield map
overlay, or scout. The defining constraint is that the kit is a designer,
not a catalog of product templates: you copy a stamp after the frontier is
empty, and this skill never runs `icm new` or `icm init`.

## When to reach for it

Type `/icm-grill`, or the agent reaches for it when the ask is to ICM a
folder, grill a workspace, or design one of those six trees. It is opt-in.
It does not fire on ordinary project-add, and it stops if the work is once
or twice.

For a generic agent-first repo layout that is not ICM, use
[agent-first-repo](../core/agent-first-repo.md). For writing `AGENTS.md`
alone, use [agents-md](../core/agents-md.md).

## The grill, then the stamp

It works the design tree in frontier rounds. Each question gets a
recommended answer. Disk facts are looked up; only decisions go to the
human. Glossary terms land in `icm-grill-notes.md` as they settle. Folders
are not created until the human confirms the filled tree.

Layer 0 stays `AGENTS.md`. `CLAUDE.md` is a pointer, never a twin.

## It's working if

- Round 0 reports the existing tree before any human question.
- A one-off or two-use job is refused instead of scaffolded.
- The emitted tree is one of the six stamps, or an explicit "none".
- Neither `icm new` nor `icm init` was run.

## Where it fits

A run-once design interview that sits beside the shipping workflow skills.
Use it before folders exist. After a pipeline exists, ordinary change work
goes through [commit](./commit.md) and friends, not another grill.
