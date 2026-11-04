# Redesign

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-redesign
```

```bash
npx skills update do-redesign
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-redesign)

## What it does

`do-redesign` is a diagnostic for an interface that already exists. It reads the screen, lists every generic pattern it finds, and waits. Only the findings you keep get fixed, in a fixed order, inside the stack the project already uses. It never rewrites the page.

## When to reach for it

Type `/do-redesign`, or the agent reaches for it when you say a screen looks generic, cheap, unfinished, or AI-made, or ask to polish or upgrade an existing UI.

Reach for it on a page or component that is already built. For a new landing page, use [landing-page](./landing-page.md). For a new component, use [design-system](./design-system.md).

## Report, then fix

The audit covers type, color, layout, motion, states, copy, and the things a generated page forgets (legal links, a 404, validation, a favicon). The report lands before any edit.

Fixes run in order: font, color, states, layout, motion, the generic components, loading and empty and error, copy, then the type scale. Replacement values come from `DESIGN.md` when the project has one, and from the shared visual system otherwise.

## It's working if

- You see the full list of findings before any file changes.
- The diff stays inside the existing framework and styling setup.
- Each fix maps to one approved finding.

## Where it fits

The audit skill in the frontend group, paired with [landing-page](./landing-page.md), which builds the page this one would later critique. Both read the same visual system and defer to a project `DESIGN.md`. Original to this repo; the idea comes from [elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill), with nothing copied. See the [notice](https://github.com/edheltzel/Do-Skills/blob/master/skills/project/frontend/references/NOTICE.md).
