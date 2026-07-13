# Research

Quickstart:

```bash
npx skills add edheltzel/skills --skill=research
```

```bash
npx skills update research
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/research)

Imported/adapted from [Matt Pocock's skills](https://github.com/mattpocock/skills) (MIT).

## What it does

`research` spins up a **background agent** to investigate a question while you
keep working, then captures the findings as a single cited Markdown note under
`docs/`. The defining constraint is the source standard: it reads **primary
sources** — official docs, source code, specs, first-party APIs — and follows
every claim back to the source that owns it, never a secondary write-up.

## When to reach for it

Type `/research`, or the agent reaches for it automatically when a task fits.

Reach for it when a question needs reading legwork you'd rather delegate — how a
library actually behaves, what an API contract really says, gathering the facts
before a decision. For breaking decided work into tickets, use
[plan](../core/plan.md); for an interactive, one-question-at-a-time design
conversation, use [grilling](../productivity/grilling.md).

## A cited note, not a summary

The output is a durable artifact: one Markdown file, each claim carrying its
source, saved where the repo already keeps such notes. Because it runs in the
background, the calling session isn't blocked on the reading — the note is there
to cite when it returns.

## Where it fits

A standalone you reach for anytime primary-source facts are needed, and a
building block for larger efforts: [wayfinder](../core/wayfinder.md) invokes it
as a `research`-type ticket to clear fog that hangs on outside knowledge.
