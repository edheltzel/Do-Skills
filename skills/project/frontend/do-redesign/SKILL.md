---
name: do-redesign
description: >-
  Audit an existing page or component for generic design, report every
  finding, then fix the approved ones in place. Use when the user says a
  screen looks generic, cheap, unfinished, or AI-made, or asks to polish,
  refine, or upgrade an existing UI. NOT FOR a new landing page
  (do-landing-page), a new component (do-design-system), or rebuilding a site
  (ensoul, if installed).
---

# Redesign

A diagnostic. Find what is wrong with an existing interface and fix it in place. Never rewrite it.

## Run

1. **Scan.** Name the framework and the styling method: Tailwind (check v3 or v4), vanilla CSS, CSS modules, styled-components.
2. **Diagnose.** Run the audit. List every finding. Stop and let the user veto items.
3. **Fix** the approved findings in the priority order, inside the existing stack. Check the dependency file before adding a library. Verify the changed screen after each priority.

`ensoul` or `impeccable`, when installed, owns a full redesign or a craft pass. This skill runs its audit only when neither is in play. Hand off rather than stacking a second opinion on the same screen.

## Values

Read `DESIGN.md` at the project root when it exists. It replaces the fallback.

With no `DESIGN.md`, load [references/visual-system.md](references/visual-system.md). Every replacement value comes from it. A value it does not cover is a question, not a guess.

## Audit

When `DESIGN.md` exists, audit against it. A choice it permits is not a finding, and a deviation from it is. The correctness checks apply either way. The taste checks apply only where `DESIGN.md` is silent.

**Correctness.** A scroll listener driving animation. Animating `top`, `left`, `width`, or `height`. No focus ring. `window.alert()`. A button pointing at `#`. No current-page indicator. No privacy or terms link, no way back, no branded 404, no form validation, no skip-to-content link, no favicon, no alt text, no meta description or `og:image`. An ad-only page left indexable. Two CTAs above the fold. Proof buried under the claim it supports. "Learn more" or "Submit". Invented prices, stats, testimonials, or logos. Placeholder Latin. Body wider than about 65 characters. A heading with one word alone on its last line. `100vh` where `100dvh` belongs. Baselines of titles, prices, and buttons that drift across side-by-side cards. A card with a border on one side.

**Taste, only where `DESIGN.md` is silent.** A browser default or Inter, Roboto, Arial, Open Sans, Helvetica. Two faces where the brief names one. Italics. Weights above bold. Only Regular and Bold in use. Sizes off the scale. All-caps subheaders. Proportional figures in a data column. Surfaces outside the approved set. Any background gradient. A hero heading in flat color. More than one accent, or one past 80% saturation. Warm and cool grays mixed. A dark band dropped into a light page. Everything centered. Three equal cards as the feature row: keep the three to five benefits, change the layout. No max-width container. Radii and spacing chosen by feel. A sidebar on every dashboard. `ease`, `linear`, or `ease-in-out`. A section that is simply present on scroll. A nav welded to the top edge. No hover, no press feedback. A spinner where a skeleton fits. A blank panel where an empty state fits. Vague verbs: streamline, optimize. No risk reversal. Title Case headings.

## Priority

1. Font
2. Color and surfaces
3. Hover, active, focus
4. Layout, spacing, radius
5. Motion
6. The generic components named above
7. Loading, empty, error
8. Copy
9. Type scale

## Hand off

- A new landing page: `do-landing-page`.
- New components or a `DESIGN.md`: `do-design-system`.
- CSS mechanics: `do-modern-css`.
