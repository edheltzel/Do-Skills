# Point of View

Quickstart:

```bash
npx skills add edheltzel/skills --skill=pov
```

```bash
npx skills update pov
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/pov)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`pov` returns a decisive, **graded verdict** on something from the outside world
— a library, pattern, platform, architecture, or an external change like a CVE
or deprecation — judged against *this project*, not in the abstract. It answers
adopt / switch / migrate / compare / is-this-our-problem questions, and it always
lands on a call. The defining constraint is that it **refuses to answer in the
abstract**: no verdict issues until it clears two independent evidence floors — a
project floor (a verified fact about *your* codebase) and an external floor (at
least one verified source about the candidate).

## When to reach for it

Type `/pov`, or the agent reaches for it automatically when a decision fits.

Reach for it when you need to commit: adopt or switch to a technology, compare a
candidate against what you already run, or judge whether an ecosystem change
actually reaches you — or when you want a fast second opinion mid-session. For a
neutral explainer or a spread of options rather than a verdict, use
[ideate](../productivity/ideate.md); to stress-test a plan you already hold, use
[grilling](../productivity/grilling.md) — which routes adopt/switch/compare
questions back here.

## Two floors and a reversibility tier

The whole moat is **don't issue a verdict you didn't earn against the project's
own context.** The project floor demands a named incumbent plus a real
touchpoint, or the verified absence of one plus where a new one would fit, or a
prior decision; the external floor demands a source whose text backs the claim.
The floors are absolute and independent — strong external evidence never rescues
a thin project leg. A **reversibility tier** then sizes the run: a two-way-door
`npm i` gets a one-screen verdict, while a one-way, high-stakes surface
(security, a public contract, an irreversible migration) earns deep research and
a precedent search. The output is a compact chat block with a fixed grade
vocabulary — Adopt, Trial, Hold, Reject, Not-our-problem — that cites evidence
rather than pasting it.

## Where it fits

A standalone you reach for at a decision point, not a pipeline stage. Its verdict
feeds the next move it computes: an Adopt with clear scope flows into
[plan](../core/plan.md), a Trial into a [prototype](../core/prototype.md) spike,
and — on request only — the decision can be captured into the durable library by
[compound](../productivity/compound.md).
