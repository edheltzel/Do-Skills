---
name: writing-drafting
description: Writing, exploit — shape a fixed pile of raw material into an article, grounding each concept before a later move leans on it. Two modes — beats (a choose-your-own-adventure journey of beats) and shape (block-by-block with explicit format choices and inverted grilling). USE WHEN you type its name with a pile of fragments, notes, or a transcript and want to commit to a structure — triggers include beats, shape, grounding, journey. Follows writing-fragments, the explore phase. NOT FOR widening the space of what could be written before there is a pile (use writing-fragments).
---

<what-to-do>

The user has (or will) pass a markdown file of raw material — anything from a tidy list of fragments to a wall of prose to a transcript. This is **exploit**: the exploring is done, the pile is fixed. Commit to a path through it and mine the pile to fill the article. Read the pile end-to-end before anything else.

The raw material file is read-only to this skill. Write the article to a separate file. If the user did not say where to save it, ask once and remember the path.

Two modes, sharing one model of **grounding**:

- **beats** — a choose-your-own-adventure journey. Each move is a **beat**; you offer candidate next beats and the user picks the path. Reach for this when the piece is a journey — an essay, a story, a talk — where the order is a series of turns rather than a fixed argument.
- **shape** — grow the article block by block, arguing the form of each block out loud. Reach for this when the piece is an argued structure — a how-to, a reference, a technical post — where each block earns its place and its format.

Ask which mode fits, or infer it from the user's language ("journey", "beats" → beats; "shape", "structure", "block" → shape). Both obey grounding.

</what-to-do>

<supporting-info>

## Grounding

Every **concept** has to be **grounded** before a move can lean on it: the reader either walked in knowing it or met it in an earlier move. A move that reaches for an ungrounded concept loses the reader — that is the one move drafting can't make. The unit is the concept, not the word for it: a move can lean on an idea the reader lacks even with no jargon in sight. Where a concept has a name — a **term** — grounding it means landing the idea and the term together.

A concept gets grounded one of two ways:

- **Prerequisite** — grounded before the first move. The reader brings it. Fixed at the start.
- **Introduced** — a move establishes it, and from then on it's grounded for every later move.

So each move does two jobs: it **requires** concepts that are already grounded, and it **grounds** new ones. Keep a running list of what's grounded so far, and update it each time a move lands.

**Establish the prerequisites first, with the user, before drafting.** Settle what the audience knows walking in. The big lever is what you make a prerequisite versus what you ground inside the piece: demand too much up front and you shut out readers who don't have it; ground too much inside and the opening drowns in definitions. Revisit it whenever a tempting move turns out to require a concept nothing has grounded yet — the fix is either a grounding move before it, or promoting the concept to a prerequisite.

## Mode: beats

A **beat** is one move in the journey. It does one thing — sets a scene, lands a point, asks a question, drops an aside, twists the angle — then stops, leaving the reader at a place where the next beat can pivot.

A beat is sized by what it needs: a single sentence if that's all the move is ("And then nothing happened for three weeks."), a short paragraph if the move needs setup, multiple paragraphs if the beat is a self-contained vignette, argument, or example. If a "beat" needs five paragraphs and three subheadings, it's two beats glued together — split it.

Run the journey choose-your-own-adventure style:

1. After prerequisites are settled, write 2–3 candidate **starting beats**, drawn from the raw material — different entry points into the article. Each may only lean on grounded concepts; note what new concepts each one grounds. Show the candidates before writing to the article file. The user picks one; preview what beats that pick unlocks, as if seeing a little way down the path.
2. Once the user picks, write **only that beat** to the article file. Stop there.
3. Re-read the article file from disk. Then offer 2–3 candidate **next beats** — different directions the journey could pivot to from where the article now stands. Each must be reachable from the current grounded set; note what each one grounds. A candidate beat is only reachable if everything it requires is already grounded; picking a beat that grounds concept X unlocks every beat that was waiting on X.
4. Loop steps 2–3 until the journey reaches a natural end.

The article ends when the journey is complete — not when the pile is empty. Most piles keep leftover fragments; that is the point of having more raw material than you need.

## Mode: shape

Grow the article block by block, arguing structure and form as you go.

1. After prerequisites are settled, draft 2–3 candidate **openings**, each implying a different thesis or angle. Show all of them. Force the user to pick or compose a hybrid. The chosen opening defines what the rest must do.
2. **Grow block by block.** After the opening lands, ask "given this, what does the reader need to hear next?" Pull material from the pile to answer. The next block may only lean on grounded concepts and grounds new ones as it lands. An ungrounded concept the next move needs is itself the answer: ground it first — here or earlier — or you can't make the move.
3. **Argue the form of each block out loud** — see [Format arguments](#format-arguments-to-actually-have). Each format choice should be deliberate and defensible.
4. Append each agreed block to the article file immediately. Loop step 2 until the user decides it's done.

This is a grilling session inverted. In explore, the question was "what are you actually noticing?" Here it's "what is this article actually arguing, and in what order does the reader need to hear it?" Push back. Refuse to let weak transitions slide. If a block doesn't earn its place, cut it. Moves to keep using:

- "What does this block do for the reader that the previous one didn't?"
- "If I cut this, what breaks?"
- "Is this prose, or should it be a list? Why prose?"
- "This sentence is doing two jobs — split it or pick one."
- "The opening promised X. We've drifted to Y. Either re-thread it or change the opening."

### Format arguments to actually have

When choosing how to render a block, weigh these tradeoffs out loud with the user, not silently:

- **Prose vs. list.** Prose carries argument; lists carry parallel items. If items aren't truly parallel, prose is better. If they are, a list is faster to scan.
- **Inline vs. callout.** Tips, warnings, and asides go in callouts (`> [!TIP]`, `> [!NOTE]`) — but only if they'd genuinely derail the main argument inline. Otherwise leave them inline.
- **Table vs. repeated structure.** If the same shape repeats 3+ times with the same fields, a table. Otherwise prose with bold leads.
- **Quote vs. paraphrase.** Quote when the original wording is the point. Paraphrase when only the idea matters.
- **Code block vs. inline code.** Multi-line, runnable, or illustrative → block. Single token or identifier → inline.

## Pulling from the pile

The pile is a quarry, not a script. Pull a fragment, rework it to fit its surroundings, and place it. A fragment may be split across moves, merged with another, paraphrased, or quoted. The pile's job is to be mined; the article's job is to read as one voice.

If the pile lacks something the article needs, name the gap explicitly: "We need an example here and the pile doesn't have one — give me one now or we cut this section."

## Writing rhythm

- Append one move at a time. Never write ahead.
- Re-read the article file from disk before every write — the user may have edited between turns. Preserve user edits absolutely; never overwrite blindly.
- If the user edits a previous move substantially, let it change what comes next.
- If the user says "rewrite that one" or "go back and try a different beat 3", edit that move in place and leave the rest alone.

## Out of scope

- Mining for new fragments that aren't in the pile (handle gaps as in [Pulling from the pile](#pulling-from-the-pile)).
- Editing the raw material file.
- Publishing, formatting for a specific platform, or adding frontmatter the user didn't ask for.

</supporting-info>
