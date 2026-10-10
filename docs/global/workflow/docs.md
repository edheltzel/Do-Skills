# Docs

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-docs
```

```bash
npx skills update do-docs
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-docs)

## What it does

`do-docs` authors or improves one Diataxis page: a tutorial, how-to, reference, or explanation. A page is one type. Mixing a lesson, a task, a lookup, and a why in the same section weakens all of them.

Write mode picks the type with the compass, then follows that type's template and gates. Improve mode (`/do-docs improve <path>`) classifies an existing markdown file and refines each section with the user before any overwrite.

## When to reach for it

Type `/do-docs`, or the agent reaches for it automatically when writing a tutorial, getting-started, onboarding, beginner, or learn-by-doing guide, a how-to, a reference, or an explanation.

Improve mode runs only when you ask to improve or review an existing doc. Pass the file path.

## One type, then the page

The leading idea is the **compass**: action or cognition, acquisition or application. That choice picks the reference (tutorial, how-to, reference, explanation) and the voice that goes with it. A tutorial is a lesson the teacher walks with the reader; each step ends in something they can see. A how-to assumes a goal. Reference states facts to look up. Explanation discusses why.

Improve is a two-phase loop: analyze and classify, then refine section by section (`yes` / `skip` / `modify`) and write only after every open issue has a terminal choice.

## It's working if

- The draft is one Diataxis type, not a mix.
- A tutorial step says what to do, then what the reader should see.
- Improve does not overwrite the file until every flagged section is applied, skipped, or modified to a close.

## Where it fits

A writing skill in Workflow, next to [tech-writing](./tech-writing.md) (shared prose posture). A README that drifted from the code belongs to [readme-update](./readme-update.md). Detection and rewrite of AI tone live in [humanize](../core/humanize.md).
