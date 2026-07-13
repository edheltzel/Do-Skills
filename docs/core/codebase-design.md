# Codebase Design

Quickstart:

```bash
npx skills add edheltzel/skills --skill=codebase-design
```

```bash
npx skills update codebase-design
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/codebase-design)

## What it does

`codebase-design` is a shared vocabulary for designing **deep modules** — a lot of
behaviour behind a small interface, placed at a clean seam, testable through that interface.
The defining move is that depth is measured as **leverage at the interface**, not as a ratio
of implementation lines to interface lines: a module is deep when a caller can exercise a lot
of behaviour per unit of interface they have to learn, and the line-ratio framing is
explicitly rejected because it just rewards padding the implementation.

The whole point is consistent language. The skill hands you a fixed glossary — module,
interface, implementation, depth, seam, adapter, leverage, locality — and asks you to use
those words exactly, never substituting "component," "service," "API," or "boundary."

## When to reach for it

You invoke this by typing `/codebase-design`, or the agent reaches for it when a task turns
to designing or reshaping a module's interface, deciding where a seam goes, or making code
more testable — and other skills pull it in when they need the deep-module words.

Reach for it when the question is the *shape of an interface*. For a whole-repo structural
review of a diff, use [review-structure](../core/review-structure.md); to scan a codebase for
deepening candidates and report them, use
[improve-codebase-architecture](../core/improve-codebase-architecture.md).

## The vocabulary and its tests

The skill is a glossary plus a handful of tests you apply while designing: the **deletion
test** (delete the module — does complexity vanish or reappear across callers?), "the
interface is the test surface" (callers and tests cross the same seam), and "one adapter is a
hypothetical seam, two is a real one." References go deeper: `references/DEEPENING.md`
classifies dependencies into four categories with a per-category testing strategy, and
`references/DESIGN-IT-TWICE.md` spins up parallel sub-agents to design one interface several
radically different ways, then compares them on depth, locality, and seam placement.

A note it shares with [review-structure](../core/review-structure.md): the 1k-line file guard
measures *file* size, while depth measures *interface* size — a deep module can hold a large
implementation behind a small interface, so crossing the file budget means extracting internal
seams, not widening the interface.

## Where it fits

A foundational vocabulary skill that other design skills build on:
[improve-codebase-architecture](../core/improve-codebase-architecture.md) uses its language to
report deepening candidates, [setup-ts-deep-modules](../engineering/setup-ts-deep-modules.md)
enforces the entry-point/interface split in a TS repo, and
[architecture-md](../core/architecture-md.md) borrows its seam/depth terms when documenting a
codebase. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
