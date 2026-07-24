# Writing Great Skills

Quickstart:

```bash
npx skills add edheltzel/skills --skill=writing-great-skills
```

```bash
npx skills update writing-great-skills
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/writing-great-skills)

## What it does

`writing-great-skills` is the reference for *why* a skill is built the way it is — the vocabulary and principles behind good skill design, with a companion `GLOSSARY.md` that carries the full domain model. It is all reference, no steps: you consult it while authoring or editing a skill and reach for the term that names the problem in front of you.

Everything in it serves one idea: a skill exists to wrangle determinism out of a stochastic system, and **predictability** — the agent taking the same *process* every run, not producing the same output — is the root virtue every other lever serves.

## When to reach for it

You invoke this by typing `/writing-great-skills` — it is a reference you pull up deliberately, not one the agent fires on its own. Reach for it when you need the reasoning behind a structure choice: where a piece of content should sit, whether a skill should be model- or user-invoked, why a rule isn't changing the agent's behaviour. For the build-and-validate mechanics, use [skill-builder](./skill-builder.md); for deciding what knowledge becomes a skill, use [distill-to-skill](./distill-to-skill.md).

## The vocabulary it gives you

The glossary groups its terms on four axes, each a lever on predictability:

- **Invocation** — model-invoked vs user-invoked, and the two loads you trade between them: **context load** (a description sitting in the window every turn) and **cognitive load** (the human having to remember the skill exists).
- **Information hierarchy** — the ladder from in-skill steps down to disclosed reference, and **progressive disclosure** as the move down it.
- **Steering** — **leading words** (compact concepts from pretraining that anchor behaviour in few tokens), **completion criteria**, and **legwork**.
- **Pruning** — **single source of truth** against **duplication**, plus the failure modes: premature completion, sediment, sprawl, no-op, negation.

The **negation** principle is the one most authors get wrong: steering by prohibition drags the forbidden behaviour into context and makes it *more* available. Prompt the positive instead.

## Where it fits

The conceptual anchor of the skill-authoring trio: [skill-builder](./skill-builder.md) builds and validates the artifact, [distill-to-skill](./distill-to-skill.md) decides what knowledge it should hold, and this skill supplies the why both lean on. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT); the invocation mechanics are adapted to this collection, which keeps `name` and `description` on every skill rather than using a disable-model-invocation flag.
