# Visual system

Fallback values for `do-landing-page` and `do-redesign`. Read it only when the project has no `DESIGN.md`. When `DESIGN.md` exists, its type, spacing, radius, color, motion, and icon decisions replace this file entirely. Do not mix the two.

Values chosen for this repository. The idea of a single fallback table shared by both skills comes from [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) and [elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill). Credit only; see the [notice](https://github.com/edheltzel/Do-Skills/blob/master/skills/project/frontend/references/NOTICE.md).

## Type

**Faces:** Geist, Manrope, Geist Mono, Poppins. One face per site. Geist Mono joins it only for code, data, or numbers.

**Weight:** cap at bold. Use Medium and SemiBold for hierarchy, not Regular and Bold alone.

**Scale.** Every size lands on a step. A size between steps snaps to the step below and takes that step's line height.

| Step | Size | Line height |
|---|---|---|
| xs | 12px | 16px |
| sm | 14px | 20px |
| base | 16px | 24px |
| lg | 18px | 28px |
| xl | 20px | 28px |
| 2xl | 24px | 32px |
| 3xl | 30px | 36px |
| 4xl | 36px | 40px |
| 5xl | 48px | 1 |
| 6xl | 60px | 1 |
| 7xl | 72px | 1 |
| 8xl | 96px | 1 |
| 9xl | 128px | 1 |

**Named styles.** Every text node uses one. Define each once (`heading-1`, `body-4`, `button-md`) and apply the name.

| Style | Step | Weight | Use |
|---|---|---|---|
| Heading 1–6 | 6xl, 5xl, 4xl, 3xl, 2xl, xl | Semibold | Page and section headings. Heading 1 is the hero. |
| Title 1–5 | xl, lg, base, sm, xs | Medium | Card titles, list titles, nav items. |
| Body 1–3 | base | Semibold, Medium, Regular | Running text, strongest first. |
| Body 4–6 | sm | Semibold, Medium, Regular | Smaller running text. |
| Button lg / md / sm / xs | lg, base, sm, xs | Semibold | Button labels only. Main buttons use md. |
| Caption 1–2 | sm | Medium, Regular | Metadata, helper text, badges. |
| Caption 3–5 | xs | Semibold, Medium, Regular | Fine print. |

A new style takes the next number in its group, built from a scale step.

**Measure.** Headings and subheadings cap at 680px. Body caps near 65 characters. Break a heading where the thought breaks. `text-wrap: balance` on headings, `text-wrap: pretty` on body. Sentence case for headings and buttons. `font-variant-numeric: tabular-nums` on columns of numbers.

## Spacing

Only these, in px: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96. A value between two snaps to the nearest. Main buttons: 8 vertical, 12 horizontal.

## Radius

Tailwind's steps: 0, 2, 4, 6, 8, 12, 16, 24, full. When a shape sits inside another and the gap is under 32px, `inner radius = outer radius − gap`, applied only when the result is greater than 2. A 16px card with 8px of padding gives its inner shape 8px.

## Color

Surfaces are flat. One accent, kept under 80% saturation. A border runs all the way around or not at all. Divide rows with a filled 1px element, not a one-sided stroke.

Dark surfaces, only these: `#000000`, `#181818`, `#1F1F1F`, `#272727`, `#313131`, `#131209`.

The one gradient is the hero heading, left to right, on the text: dark theme `#FFFFFF` to `#9B9B9B`, light theme `#000000` to `#666666`. Check contrast at the lightest stop.

Contrast: 4.5:1 for body text, 3:1 for large text and UI parts. State is never color alone.

## Icons

Phosphor, Solar, or Iconamoon, at one stroke weight across the site.

## Motion

Base curve `cubic-bezier(0.22, 1, 0.36, 1)`. 500ms for layout and position, 300ms for color and opacity, never under 200ms. Animate `transform` and `opacity` only.

A section entering the viewport rises 32px and fades in over 600–800ms, once. Drive it with `IntersectionObserver` or `whileInView`. Under `prefers-reduced-motion`, replace movement with an opacity change.
