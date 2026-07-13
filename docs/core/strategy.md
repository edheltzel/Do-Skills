# Strategy

Quickstart:

```bash
npx skills add edheltzel/skills --skill=strategy
```

```bash
npx skills update strategy
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/strategy)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`strategy` produces and maintains `STRATEGY.md` — a short, durable anchor at the
repo root (a peer of `README.md`) that captures the product's target problem,
approach, primary persona, key metrics, and tracks of work. It builds the doc
through a **pushback interview**: it asks a handful of sharp questions and
challenges weak answers rather than transcribing whatever you say, because good
answers to a few questions make a better strategy than any amount of prose.

## When to reach for it

You invoke this by typing `/strategy` — the agent won't reach for it on its own.

Reach for it when you're starting a product, changing direction or roadmap, or
when a downstream skill needs product grounding it doesn't have. Pass a section
name (`metrics`, `approach`, `tracks`) to revisit just that part. If you want to
generate candidate directions rather than commit to one, use
[ideate](../productivity/ideate.md); to stress-test a plan you already hold, use
[grilling](../productivity/grilling.md).

## An anchor, not a plan

The defining discipline is **anchor, not plan**: strategy is what the product is
and why, so features and requirements belong in [spec](../core/spec.md) and
schedules belong in the issue tracker — neither is allowed to creep into the doc.
The rigor lives in the interview questions, not the headings: the section
structure (target problem / approach / tracks) follows Rumelt's kernel of
diagnosis, guiding policy, and coherent action, and the questions are built to
push past "bad strategy" — fluff, goals dressed up as strategy, and feature lists
in place of a guiding choice. The skill is rerunnable: a second run updates in
place, preserves what works, and re-challenges only the sections that look stale.

## Where it fits

Upstream of the build flow. When `STRATEGY.md` exists,
[spec](../core/spec.md), [plan](../core/plan.md), and
[ideate](../productivity/ideate.md) read it as grounding — so run `strategy`
first when the product's direction itself is unsettled, then let those skills
inherit the decisions it captures.
