# Agent Context Layer

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-agent-context-layer
```

```bash
npx skills update do-agent-context-layer
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/core/do-agent-context-layer)

## What it does

`agent-context-layer` arranges a repository's documentation so an agent can form an accurate model quickly and then load only the context its task needs. It applies the Interpretable Context Methodology (ICM) to a code repository's context layer.

Its defining constraint is that entry files are catalogues, not manuals: they point to authoritative material instead of carrying it. The approach gives each fact one home and makes pointers name the relevant section in large documents.

## When to reach for it

Type `/do-agent-context-layer`, or the agent reaches for it automatically when you are making `AGENTS.md`, `CLAUDE.md`, or a `docs/` tree legible to agents.

Reach for it when the problem is routing and keeping context small, canonical, and findable. For code-side architecture enforcement and entropy management, use [agent-first-repo](../core/agent-first-repo.md); for the focused entry-file and codemap guidance, use [agents-md](../core/agents-md.md) and [architecture-md](../core/architecture-md.md).

## The catalogue model

Start from a thin, stable entry file, follow one or two pointers, and stop when the task has enough context. Add an `index.md` catalogue once a directory has three or more documents; do not create a full documentation tree before the repository needs it.

The optional five-layer model is a lens for placing documents, not a required mechanism. A code repository has no inherent execution stages, so its mapping is not one-to-one.

## Structural checks are not truth checks

CI can verify links and indexes, but it cannot establish that prose still describes the code. Keep the canonical set small, and put load-bearing invariants under tests or other mechanical enforcement where possible. A green documentation-freshness build means the structure is intact, not that its claims are true.

## Where it fits

A documentation-structure skill for new or existing repositories. It complements [agent-first-repo](../core/agent-first-repo.md), which covers the code-side agent-first discipline, while [agents-md](../core/agents-md.md) and [architecture-md](../core/architecture-md.md) help write two of the documents this skill routes through.
