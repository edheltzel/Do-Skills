# Grilling

Quickstart:

```bash
npx skills add edheltzel/skills --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/grilling)

## What it does

`grilling` runs a relentless interview that stress-tests a plan or design before you build it. The agent walks every branch of the design tree, resolving decisions one at a time until you and it reach a shared understanding.

The defining constraint is the fact/decision split: if a question can be answered by exploring the codebase, the agent looks it up instead of asking; the *decisions* are yours, put to you one at a time with a recommended answer attached. It asks a single question per turn — a barrage is bewildering — and it does not enact the plan until you confirm the understanding is shared.

## When to reach for it

Type `/grilling`, or the agent reaches for it automatically when you want to pressure-test a plan or use any "grill" phrasing. Reach for it before committing to a design, when a plan feels underspecified, or when you want the assumptions dragged into the open. For a grilling that also writes ADRs and a glossary as it goes, use [grill-with-docs](./grill-with-docs.md); for workflow specs specifically, use [loop-me](./loop-me.md); to mine raw fragments toward something to write, use [writing-fragments](./writing-fragments.md).

## The interview discipline

- **One question at a time.** Wait for the answer before the next. Never batch.
- **Every question carries a recommended answer** — the agent commits to a position, you correct it.
- **Facts are looked up, decisions are yours.** The agent does the legwork on anything the codebase can settle.
- **A confirm-first gate.** Nothing gets built until you say the understanding is shared.

## Where it fits

The base of a small family: [grill-me](./grill-me.md) is the hand-invoked alias that runs it unchanged, [grill-with-docs](./grill-with-docs.md) layers documentation onto it, and [loop-me](./loop-me.md) specialises the discipline to workflow specs. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
