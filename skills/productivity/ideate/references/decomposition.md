# Topic-axis decomposition

Before generating, break the subject into **3-5 orthogonal axes** that name
*what aspects of the subject to think about*. Frames (in
`references/generation.md`) decide *how to think* — the lens. Axes decide *what
to think on* — the surface.

This matters because lens diversity alone does not produce surface coverage.
Without an explicit axis list, generation through six frames tends to converge
on whichever interpretation of the subject is most salient at first read; the
rest of the surface goes unexamined no matter how many frames run. The axis list
is the map that forces coverage.

Decomposition is a single pass over the grounding summary already in hand — no
extra research, no user-facing question.

## Axis criteria

- **3-5 axes.** Fewer than 3 means the subject is atomic — skip (below). More
  than 5 fragments coverage and thins each axis.
- **Orthogonal.** A single idea should fall naturally on one axis, not span
  several. Merge axes that overlap heavily.
- **Derived from grounding**, not a generic template. Do not apply
  "discovery / engagement / retention" to every topic; name what *this*
  grounding surfaced.
- **At one level of granularity.** Don't mix "the entire pricing page" with "the
  $9.99 tier copy."
- **Named in the topic's language.** "Send mechanics" beats "outbound flow
  optimization." Use words a reader of the topic would recognize.

## Worked examples

Illustrative — derive from the actual grounding, don't copy these.

| Subject | Axes |
|---|---|
| Social sharing of a page | Send mechanics; discovery (receive side); arrival/dwell experience; compounding over time; actor types |
| Improve our authentication system | Sign-in flow; session management; account recovery; permissions; identity providers |
| Dark mode for our app | Visual surfaces; toggle UX; system-preference detection; asset variants; edge cases |
| Cache invalidation in the data layer | Trigger surfaces; coordination across replicas; staleness tolerance per data class; observability |
| Brand strategy for a launch | Positioning; visual identity; voice; launch channels; pricing/packaging |
| Career options for the next 5 years | Domain; structure (employee/founder/freelance); geography; growth ambition; financial floor |

## When to skip

Some subjects are atomic and resist decomposition — a single string output (a
name, a tagline, a plot), a narrow tactical fix ("the typo on line 47"), or a
subject where the candidate axes *are* the deliverable ("what surface should the
API expose?"). When 3+ orthogonal axes that pass the criteria won't come, skip
decomposition and record `Decomposition skipped — atomic subject` in the
grounding summary.

In **surprise-me mode** there is no settled subject to decompose — different
frames will surface different subjects, and cross-cutting synthesis after
generation serves the coverage role instead. Skip and record
`Decomposition skipped — surprise-me mode`.

## After decomposition

Append the axis list (or the skip reason) to the grounding summary under
`Topic axes`. Generation distributes ideas across the axes and tags each idea
with the one it targets; critique scores axis spread across the survivor set;
the written artifact records the axes so the reader sees the surface that was
covered.
