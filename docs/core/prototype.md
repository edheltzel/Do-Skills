# Prototype

Quickstart:

```bash
npx skills add edheltzel/skills --skill=prototype
```

```bash
npx skills update prototype
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/prototype)

Imported/adapted from [Matt Pocock's skills](https://github.com/mattpocock/skills) (MIT).

## What it does

`prototype` builds **throwaway code that answers a design question** — and the
question decides the shape. A logic question ("does this state model feel
right?") becomes a tiny interactive terminal app you drive by hand; a UI question
("what should this look like?") becomes several radically different variations on
one route, switchable from a floating bar. The code is throwaway from day one:
no tests, no persistence, no abstractions, marked as a prototype so nobody
mistakes it for production.

## When to reach for it

Type `/prototype`, or the agent reaches for it automatically when a task fits.

Reach for it when a design decision is cheaper to *feel* than to argue — a state
machine whose edge cases are hard to reason about on paper, or a screen you'd
otherwise pick between as vague mockups in your head. For building the real
feature once the question is settled, use [implement](../core/implement.md) or
[tdd](../core/tdd.md).

## One question, one throwaway artifact

The whole value is picking the right branch — [LOGIC.md](https://github.com/edheltzel/skills/tree/main/skills/core/prototype/LOGIC.md)
isolates a pure reducer or state machine behind a thin terminal shell so the
validated logic can be lifted into the real module later;
[UI.md](https://github.com/edheltzel/skills/tree/main/skills/core/prototype/UI.md)
generates structurally different variants, not recolored copies, so the real
feedback ("I want the header from B with the sidebar from C") can surface. When a
prototype has answered its question, the decision folds into the real code and
the prototype itself is captured as a primary source on a throwaway branch — not
left to rot in main.

## Where it fits

A standalone you reach for mid-decision. It feeds the surrounding flow: a snippet
it produces can be inlined into a [spec](../core/spec.md) when prose can't encode
a decision precisely, and [wayfinder](../core/wayfinder.md) invokes it as a
`prototype`-type ticket when "how should it look or behave" is the open question.
