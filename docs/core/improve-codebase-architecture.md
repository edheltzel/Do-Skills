# Improve Codebase Architecture

Quickstart:

```bash
npx skills add edheltzel/skills --skill=improve-codebase-architecture
```

```bash
npx skills update improve-codebase-architecture
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/improve-codebase-architecture)

## What it does

`improve-codebase-architecture` scans a codebase for **deepening opportunities** — refactors
that turn shallow modules into deep ones — presents them as candidates, then grills through
whichever one you pick. The defining stance is that it explores for *friction* rather than
running rigid heuristics: it walks the code noting where understanding one concept means
bouncing between many small modules, where an interface is nearly as complex as its
implementation, or where pure functions were extracted for testability but the real bugs hide
in how they're called. The **deletion test** is the filter — would removing a module
concentrate complexity, or just move it?

## When to reach for it

You invoke this by typing `/improve-codebase-architecture` — it's user-invoked and the agent
won't fire it on its own.

Reach for it when you want to find *where* to improve a codebase's structure, not when you
already know the module and just need to shape its interface — for that, use
[codebase-design](../core/codebase-design.md). For a strict structural review of a specific
diff, use [review-structure](../core/review-structure.md).

## The loop, and the optional report

Three steps: **explore** (read `CONTEXT.md` and relevant ADRs, then walk the code with an
Explore sub-agent), **present candidates** (files, problem, solution, before/after, and a
`Strong`/`Worth exploring`/`Speculative` strength, ending with a top recommendation), and a
**grilling loop** once you pick one — walking the design tree while keeping the domain model
current inline. A plain candidate list is the default output; a self-contained Tailwind +
Mermaid HTML report with before/after diagrams is an **optional** presentation nicety
(`references/HTML-REPORT.md`), skippable whenever the plain list is enough. Throughout, it
uses [codebase-design](../core/codebase-design.md)'s vocabulary exactly and never re-litigates
an existing ADR without flagging the conflict.

## Where it fits

Sits on top of two vocabulary skills: it borrows the architecture words from
[codebase-design](../core/codebase-design.md) and the domain words from
[domain-modeling](../core/domain-modeling.md), and hands off to the grilling skill (peer-owned)
once a candidate is chosen. Think of it as the discovery front-end that finds work
[codebase-design](../core/codebase-design.md) then shapes. Imported and adapted from Matt
Pocock's skills (github.com/mattpocock/skills, MIT).
