# Domain Modeling

Quickstart:

```bash
npx skills add edheltzel/skills --skill=domain-modeling
```

```bash
npx skills update domain-modeling
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/domain-modeling)

## What it does

`domain-modeling` actively builds and sharpens a project's domain model as you design:
a ubiquitous-language glossary in `CONTEXT.md` and architectural decision records in
`docs/adr/`. The defining constraint is that this is the *active* discipline — challenging
terms, sharpening fuzzy language, inventing edge-case scenarios, and writing definitions down
the moment they crystallise. Merely *reading* `CONTEXT.md` for vocabulary is not this skill;
that's a one-line habit any skill can do. This one is for when you're changing the model.

## When to reach for it

You invoke this by typing `/domain-modeling`, or the agent reaches for it when a session
turns to pinning down terminology, resolving an overloaded word, or recording a decision that
was genuinely hard to reverse.

Reach for it when the conversation is *deciding what the words mean*. To document how the
codebase is structured, use [architecture-md](../core/architecture-md.md); to name
branded/domain types in TypeScript from this glossary, use
[parse-dont-validate](../engineering/parse-dont-validate.md).

## Prerequisites

None to start — the skill creates `CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/adr/` **lazily**,
only when the first term is resolved or the first decision needs recording. A repo with a
single context gets one root `CONTEXT.md`; a multi-context repo gets a `CONTEXT-MAP.md` that
points at per-context files.

## The four in-session behaviors

The skill *is* four behaviors running while you design: **challenge** a term that conflicts
with the glossary, **sharpen** vague or overloaded language into a canonical term, **discuss
concrete scenarios** to stress-test boundaries, and **cross-reference with code** to catch
contradictions. Resolved terms land in `CONTEXT.md` inline — never batched. ADRs are offered
**sparingly**, only when a decision is hard to reverse, surprising without context, and the
result of a real trade-off; miss any one of the three and the ADR is skipped.
`references/CONTEXT-FORMAT.md` and `references/ADR-FORMAT.md` carry the exact formats.

## Where it fits

The domain-language counterpart to [codebase-design](../core/codebase-design.md)'s architecture
language: codebase-design names *seams*, domain-modeling names the *concepts* that give those
seams good names.
[improve-codebase-architecture](../core/improve-codebase-architecture.md) runs it inline to keep
the model current while grilling a refactor, and
[parse-dont-validate](../engineering/parse-dont-validate.md) draws its branded-type names from
the `CONTEXT.md` this skill maintains. Imported and adapted from Matt Pocock's skills
(github.com/mattpocock/skills, MIT).
