# Design Doc

Quickstart:

```bash
npx skills add edheltzel/skills --skill=design-doc
```

```bash
npx skills update design-doc
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/design-doc)

## What it does

`design-doc` writes a short design document — 1 to 3 pages at
`docs/<design-slug>/design.md` — for an architecture decision that is unclear,
expensive to reverse, or crosses team boundaries. The document exists to make
the choice and its tradeoffs easy to review, and it stops there: the skill never
continues into spec, plan, or implementation until a human confirms the
decision.

## When to reach for it

Type `/design-doc`, or the agent reaches for it automatically when a task fits.

Reach for it when the architecture is still an open question — several viable
options, an expensive migration, a boundary other people depend on. When the
architecture is already settled and only behavior, interfaces, or error handling
need decisions, skip ahead to [spec](../core/spec.md). To document the
architecture a codebase *already has*, use
[architecture-md](../core/architecture-md.md) instead.

## Alternatives and tradeoffs are the point

The template's load-bearing section is **Alternatives and tradeoffs** — each
option considered and why it lost. That is the section reviewers judge, because
it shows the decision was made rather than defaulted into. The doc focuses on
decisions code will not explain later, leaves Status as Draft and the Decision
section empty (both are filled during review), and asks its clarifying questions
one at a time, each with a recommended answer.

## Where it fits

The first stage of the Decide flow: `design-doc` → [spec](../core/spec.md) →
[plan](../core/plan.md), each with a human checkpoint between. Start here only
when architecture is genuinely unclear; small, already-decided changes can skip
straight to [implement](../core/implement.md).
