# Tutorial Documentation

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-tutorial-docs
```

```bash
npx skills update do-tutorial-docs
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/do-tutorial-docs)

## What it does

`do-tutorial-docs` is a pattern book for Diataxis tutorials: learning-oriented
guides where the reader learns by doing under a teacher's guidance. It is not a
how-to, a reference, or an explanation.

The teacher owns the agenda. Every step is an action with a visible result
("you should see"), so the lesson is built to succeed. The journey uses "we".
Individual commands stay as imperatives.

## When to reach for it

Type `/do-tutorial-docs`, or the agent reaches for it automatically when writing
a tutorial, getting-started, onboarding, or other learn-by-doing guide.

Reach for it when the reader has no prior experience and should finish with a
working thing. For task-oriented "I have a goal" docs, this is the wrong type.
Confirm with the bundled Diataxis compass before drafting.

## Learn by doing

The skill's leading idea is the **lesson**: a sequence of actions the teacher
walks with the reader, each one producing something they can see. The bundled
weather-API example is the full template filled in. Core writing voice lives in
the bundled `docs-style` reference, not as a separate skill.

## It's working if

- Each step tells the reader what to do, then what they should see.
- The piece is one Diataxis type (tutorial), not mixed with how-to or reference.
- The close lists what they can now do, then a next lesson, not an API dump.

## Where it fits

A writing-pattern skill in Workflow, next to
[tech-writing](./tech-writing.md) (the shared prose posture) and
[roughdraft](./roughdraft.md) (the human review handoff). Detection and rewrite
of AI tone live in [review-ai-writing](../slop-guard/review-ai-writing.md) and
[humanize](../slop-guard/humanize.md).
