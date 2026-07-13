# Teach

Quickstart:

```bash
npx skills add edheltzel/skills --skill=teach
```

```bash
npx skills update teach
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/teach)

## What it does

`teach` turns the current directory into a stateful teaching workspace and teaches you a skill or concept across many sessions. It grounds every lesson in a **mission** — the real-world reason you're learning the thing — and tracks what you've learned so each session lands in your zone of proximal development.

The defining constraint is that it never trusts its own parametric knowledge: it gathers from high-trust resources you curate, and it optimises for **storage strength** (long-term retention through retrieval practice, spacing, and interleaving) over the illusory fluency of having just seen something.

## When to reach for it

You invoke this by typing `/teach` and naming what you want to learn — the request is stateful and spans sessions, so the agent won't fire it on its own. Reach for it for genuine skill acquisition over time, not a one-off answer. For a single explanation or drafting documentation, use [tech-writing](./tech-writing.md).

## Prerequisites

A directory to be the teaching workspace. `teach` populates it over time with `MISSION.md`, `RESOURCES.md`, `./lessons/`, `./learning-records/`, `./reference/`, and `./assets/`. The four `*-FORMAT.md` files shipped with the skill define the shapes of the mission, resources, learning records, and glossary. If the mission is unclear, the first session interviews you about *why* you want to learn the topic before teaching anything.

## How it teaches

- **Knowledge, skills, wisdom.** Knowledge is captured from trusted resources (difficulty is the enemy — it eats working memory). Skills are built through tight interactive feedback loops (difficulty is the tool — effortful retrieval builds retention). Wisdom is delegated to real communities where you test skills for real.
- **Lessons are the unit.** Each is one short, beautiful, self-contained HTML file tied to the mission, giving a single tangible win, built from reusable components in `./assets/` so the course looks like one thing.
- **Learning records steer.** ADR-style notes capture non-obvious lessons, disclosed prior knowledge, and corrected misconceptions — they set the floor for what to teach next.

## Where it fits

A long-lived, stateful standalone — closer to a course you return to than a skill you fire once. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
