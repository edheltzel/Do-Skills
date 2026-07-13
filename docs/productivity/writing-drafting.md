# Writing Drafting

Quickstart:

```bash
npx skills add edheltzel/skills --skill=writing-drafting
```

```bash
npx skills update writing-drafting
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/writing-drafting)

## What it does

`writing-drafting` is the **exploit** phase of writing: you hand it a fixed pile of raw material — fragments, notes, a transcript — and it commits to a path through the pile and mines it into an article, one move at a time. The raw file stays read-only; the article grows in a separate file.

The constraint that governs every move is **grounding**: a concept must be grounded — the reader walked in knowing it, or an earlier move introduced it — before any later move can lean on it. A move that reaches for an ungrounded concept loses the reader, and that's the one move drafting can't make. The lever you set with the user up front is what to make a prerequisite versus what to ground inside the piece.

## When to reach for it

You invoke this by typing `/writing-drafting` with a pile to shape. Reach for it once the exploring is done and you're ready to commit to a structure. To build the pile in the first place, use [writing-fragments](./writing-fragments.md) — the explore phase that feeds this one.

## Two modes over one grounding model

Both modes obey grounding; they differ in how the article grows:

- **beats** — a choose-your-own-adventure journey. Each move is a **beat** (a sentence to several paragraphs) that does one thing then stops where the next can pivot. The agent offers 2–3 reachable next beats; you pick the path, and picking a beat that grounds concept X unlocks every beat that was waiting on X. Reach for this for essays, stories, talks — pieces that are a series of turns.
- **shape** — grow block by block, arguing the *form* of each block out loud (prose vs. list, inline vs. callout, table, quote, code). This is a grilling session inverted: "what is this article actually arguing, and in what order does the reader need to hear it?" Reach for this for how-tos, references, technical posts — pieces that are an argued structure.

## Where it fits

The second half of the writing pipeline: [writing-fragments](./writing-fragments.md) (explore) produces the pile, `writing-drafting` (exploit) shapes it. It unifies Matt Pocock's `writing-beats` and `writing-shape` into one skill so the shared grounding model is stated once. When the draft is done, [tech-writing](./tech-writing.md) handles type, format, and AI-tell removal. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
