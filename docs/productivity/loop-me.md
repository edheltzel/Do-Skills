# Loop Me

Quickstart:

```bash
npx skills add edheltzel/skills --skill=loop-me
```

```bash
npx skills update loop-me
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/loop-me)

## What it does

`loop-me` is a [grilling](./grilling.md) session specialised to one output: **workflow** specs. It uses the grilling discipline — relentless, one question at a time, a recommended answer on each — but aims it at the vocabulary and goal of workflow design, creating and editing specs as the interview resolves things.

The lens is the **loop**: a recurring pattern in your life — your week, your morning, a repeated activity. Picturing a life as loops within loops reveals how predictable its activities really are, which is exactly what makes them worth **delegating**. A workflow is the spec of one loop, made real.

## When to reach for it

You invoke this by typing `/loop-me`, optionally naming a workflow to design — or nothing, to have the agent use the lens to find one worth specifying. Reach for it when you want to design or spec an automatable workflow. For general plan or design grilling, use [grilling](./grilling.md).

## Prerequisites

A workspace it writes into: `workflows/*.md` holds one spec per workflow (the source of truth), and `NOTES.md` holds raw notes on your world — the tools you use, the channels you process, your own terms for both. When `NOTES.md` is thin, the first thing `loop-me` does is interview you about your world before specifying anything.

## The vocabulary

Reached for only when a workflow calls for it — nothing structural is mandated (no AI, no checkpoint, no schedule unless the grilling shows it's needed):

- **Trigger** — what fires each run: an event (a new email) or a schedule (every morning).
- **Checkpoint** — a human-in-the-loop point to verify or decide; some workflows have none.
- **Push right** — defer the checkpoint as far as it will go, so the human is asked once, late, with everything prepared.
- **Brief** — the decision-ready summary a checkpoint presents, never the raw output.

A spec is **done** when an implementer agent could build it without asking a single question — the grilling continues while any question remains.

## Where it fits

A specialised member of the grilling family, alongside [grill-me](./grill-me.md) and [grill-with-docs](./grill-with-docs.md); it depends on [grilling](./grilling.md) for its interview discipline. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
