# Explain

Quickstart:

```bash
npx skills add edheltzel/skills --skill=explain
```

```bash
npx skills update explain
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/explain)

Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

`explain` turns one thing — a concept, a diff, an idea, or a window of your own recent work — into a dense, visual explainer written for *you personally*, then makes it stick with a check-in that has you produce before it reveals. It exists because agent-driven development removed the learning that writing code by hand used to give: the human keeps learning while agents do the writing.

The defining constraint is that the check-in is never headless — it runs live in the session, never inside the artifact. The explainer is display-only (no embedded quizzes or forms); the *doing* happens in chat, where your answers can be checked and corrected. Automating those answers would delete the product.

## When to reach for it

Type `/explain`, or the agent reaches for it automatically when a task fits — it is a single-shot personal explainer, not a course.

Reach for it when you want to *learn one thing well*: understand a change someone (or an agent) just made, get your head around a subsystem or an external concept, pressure-test your own idea, or catch up on what you did this week. For learning a skill or topic **across many sessions** in a stateful workspace, use [teach](./teach.md) instead. It is not documentation and not a verdict: judging whether to adopt or switch to a technology is `pov`, and documenting a solved problem for the repo's future is `compound`.

## Four modes, one check-in

`explain` classifies the input into one of four shapes and grounds each differently:

- **concept** — a repo topic (grounded in its call-sites) or an external subject (researched, or labelled *Unverified* when explained from model knowledge).
- **diff** — a resolved change, its files, and the doc that motivated it, gathered *silently*.
- **idea** — your proposal, explained as given: implications and trade-offs, never expanded into options.
- **work-recap** — what actually happened in the repo over a window, from git history and the docs that carry the *why*.

The check-in is what separates it from a summary. For a **diff**, it is predict-then-reveal: you see only the raw change, predict what it does and why, the turn ends, and only then does the explainer compose a reveal that names the gaps in your prediction. For concepts, ideas, and dense recaps, it is a handful of corrected exercises posed one at a time. The explainer itself is a single self-contained HTML file (inline SVG, system fonts, no external requests) — written into `docs/explainers/` under a name you choose.

## Where it fits

A standalone you reach for anytime you want to understand something rather than ship it — mid-session, after an agent lands a change, or before a standup. It is the single-shot sibling of [teach](./teach.md), which owns stateful, multi-session learning. Follow-ons route outward by name: when composing surfaces a new-capability idea it points you at `ideate`; when it spots code worth cleaning up it points you at `simplify`.
