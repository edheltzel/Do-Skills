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

With no `DESIGN.md`, load [references/visual-system.md](../references/visual-system.md). Every replacement value comes from it. A value it does not cover is a question, not a guess.

## Audit

**Type.** A browser default or Inter, Roboto, Arial, Open Sans, Helvetica. Two faces where the brief names one. Italics. Weights above bold. Only Regular and Bold in use. Sizes off the scale. Body wider than about 65 characters. A heading with one word alone on its last line. All-caps subheaders. Proportional figures in a data column.

**Color.** Surfaces outside the approved set. Any background gradient. A hero heading in flat color. More than one accent, or one past 80% saturation. Warm and cool grays mixed. A dark band dropped into a light page. A card with a border on one side.

**Layout.** Everything centered. Three equal cards as the feature row: keep the three to five benefits, change the layout to a zig-zag, an asymmetric grid, or a bento. `100vh` where `100dvh` belongs. No max-width container. Radii and spacing chosen by feel. Baselines of titles, prices, and buttons that drift across side-by-side cards. A sidebar on every dashboard.

**Motion and states.** `ease`, `linear`, or `ease-in-out`. A section that is simply present on scroll. A scroll listener driving animation. A nav welded to the top edge. No hover, no press feedback, no focus ring. A spinner where a skeleton fits. A blank panel where an empty state fits. `window.alert()`. A button pointing at `#`. No current-page indicator. Animating `top`, `left`, `width`, or `height`.

**Copy and content.** "Learn more" or "Submit". Two CTAs above the fold. Proof buried under the claim it supports. No risk reversal. Vague verbs: streamline, optimize. Invented prices, stats, testimonials, or logos. Placeholder Latin. Title Case headings.

**Left out.** No privacy or terms link, no way back, no branded 404, no form validation, no skip-to-content link, no favicon, no alt text, no meta description or `og:image`. An ad-only page left indexable.

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
