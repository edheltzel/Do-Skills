# Ideate

Quickstart:

```bash
npx skills add edheltzel/skills --skill=ideate
```

```bash
npx skills update ideate
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/ideate)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`ideate` generates a wide set of candidate directions for an open question,
grounded in real material, then ranks the few worth your attention. It answers
"what are the strongest ideas here?" — not "how is one built?" — and writes the
result to a markdown ideation doc, never requirements or code.

What makes it more than a "give me ideas" list is that it rejects most of what it
generates, out loud, with a one-line reason for every cut. Each surviving idea
must carry a verifiable basis — a quoted line, a named prior art, or a written-out
argument — or it never surfaces. The deliverable is a ranked survivor set plus the
rejection table that shows what was considered and why it lost.

## When to reach for it

Type `/ideate`, or the agent reaches for it automatically when a task fits.

Reach for it when the idea itself is still open — you want options to choose from,
improvements you haven't thought of, or a surprising direction, before committing
to anything. When you instead hold *one* idea already and want it stress-tested,
that is [grilling](../productivity/grilling.md), not this: `ideate` generates many
candidates; `grilling` interrogates the single one you bring.

## The engine: generate many, critique all, explain survivors

The whole value is in the middle step most idea-generators skip. `ideate`
generates the full candidate list first, then critiques every candidate and
rejects with reasons, and only then explains the survivors. Three commitments hold
the quality up: it grounds before it ideates (scanning the codebase or supplied
context rather than dispensing abstract advice); every idea carries a tagged basis
(`direct:` quoted evidence, `external:` named prior art, or `reasoned:` a
first-principles argument) or is dropped; and every rejection is recorded, not
silently ranked away.

To keep parallel ideas from all converging on the most obvious reading of the
subject, `ideate` first decomposes the topic into 3–5 orthogonal **axes** — the
surface to cover — and generates through six **frames** — the lenses to think
with. Axes are *what* to think on; frames are *how*. Lens diversity alone does not
produce surface coverage, so the axis list is what forces it.

It runs in four modes depending on the subject: a repository, a software product
outside the repo, a non-software topic (naming, narrative, a personal decision),
or "surprise me" — where it discovers subjects from the grounding itself.

## Where it fits

`ideate` is the front of a chain: it finds directions, then hands the one you pick
onward. Choosing an idea routes to [grilling](../productivity/grilling.md) to
stress-test it before planning, and from there to [plan](../core/plan.md) to
work out how it is built. In non-repo modes the ideation doc is a legitimate
final artifact on its own — grilling one idea is optional deeper development, not a
required next step.
