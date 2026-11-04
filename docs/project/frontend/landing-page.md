# Landing Page

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-landing-page
```

```bash
npx skills update do-landing-page
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-landing-page)

## What it does

`do-landing-page` builds a page that wins one intent. A landing page is one offer, for one audience, ending in one action, and the skill settles the page before it draws it: intake, section order, copy, then the visual system. A missing price, stat, testimonial, or logo stays a marked placeholder. The skill never invents one.

## When to reach for it

Type `/do-landing-page`, or the agent reaches for it when the task is a new landing page, marketing page, or campaign page, or a rewrite of its hero, headline, or CTA.

Reach for it when the page does not exist yet. For an existing page that looks generic, use [redesign](./redesign.md). For a reusable component, use [design-system](./design-system.md).

## The page, then the look

The page comes first. Above the fold: headline, subheadline, one CTA, one proof signal, one visual. Then the argument (problem, benefits, three steps, proof beside its claim) and the close (FAQ, one risk reversal, the same CTA again). One layout is chosen and named: classic sections, long-form story, a short high-intent page, or a comparison.

The look comes second. A `DESIGN.md` at the project root replaces the fallback outright. Without one, the skill loads the shared visual system: one typeface, a fixed spacing scale, the nested radius rule, flat surfaces, one accent.

## It's working if

- The page has one action, and nothing above the fold competes with it.
- Proof sits next to the claim it supports, and every missing fact is a `{{placeholder}}`.
- Every size, space, and radius comes from `DESIGN.md` or the shared visual system.

## Where it fits

The marketing-page skill in the frontend group. It hands components to [design-system](./design-system.md), an existing screen to [redesign](./redesign.md), and CSS mechanics to [modern-css](./modern-css.md). Original to this repo; the idea comes from [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills), with nothing copied. See the [notice](https://github.com/edheltzel/Do-Skills/blob/master/skills/project/frontend/references/NOTICE.md).
