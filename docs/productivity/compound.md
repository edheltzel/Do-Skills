# Compound

Quickstart:

```bash
npx skills add edheltzel/skills --skill=compound
```

```bash
npx skills update compound
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/compound)

Imported/adapted from [Every's Compound Engineering plugin](https://github.com/EveryInc/compound-engineering) (MIT).

## What it does

`compound` captures a just-solved problem as a structured, searchable doc in
`docs/solutions/<category>/<slug>.md` — YAML frontmatter (`module`, `tags`,
`problem_type`), a bug-track or knowledge-track template, and grounding
validation that checks every claim against the actual tree before it lands.
It writes one doc per run, and before creating anything it scores overlap with
the existing library across five dimensions — matching docs get updated in
place rather than duplicated, because two docs describing the same problem
inevitably drift apart.

## When to reach for it

Type `/compound`, or the agent reaches for it when a fix has just been
verified ("that worked", "it's fixed") or a durable practice emerged from the
work. Reach for it while context is fresh — the conversation still holds what
didn't work and why. For auditing or pruning the library that already exists,
use [compound-refresh](../productivity/compound-refresh.md) instead; for
recording an architectural decision or domain vocabulary, use
[domain-modeling](../core/domain-modeling.md).

## The compounding loop

The first time a problem is solved takes research; documented, the next
occurrence takes minutes. Each doc records the symptoms, what didn't work,
the root cause, the working fix, and prevention — so the knowledge compounds
instead of evaporating with the session. Claims are held to grounding rules:
code behavior is cited from the defining source line, and merge state cites
PR numbers over commit SHAs (SHAs are rewritten by rebase and squash merges).
Resolved domain vocabulary is handed to
[domain-modeling](../core/domain-modeling.md), which owns the project
glossary — `compound` keeps no vocabulary file of its own, and it never edits
AGENTS.md; at most its report suggests mentioning `docs/solutions/` there.

## It's working if

- A solved problem produces exactly one doc under `docs/solutions/`, in the
  right category, with parseable frontmatter.
- Re-solving a documented problem starts from the doc, not from scratch.
- A near-duplicate learning updates the existing doc instead of creating a
  second one.

## Where it fits

The capture half of the knowledge library:
[compound-refresh](../productivity/compound-refresh.md) is the maintenance
half, auditing the same docs against the moving codebase. It naturally runs
after [debug](../core/debug.md) or [implement](../core/implement.md) sessions
that surfaced something worth keeping.
