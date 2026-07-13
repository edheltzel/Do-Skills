# The ideation artifact

`ideate` writes its result to a markdown file automatically — persistence is not
opt-in. The file holds the full detail; the session shows only a concise
summary, so the file is what the reader actually engages with.

## Where it goes

- **In a repo:** `docs/ideation/YYYY-MM-DD-<topic>-ideation.md` (create
  `docs/ideation/` if absent). Use `open-ideation` in place of `<topic>` when no
  focus was given.
- **No repo, or a subject unrelated to the repo:** write to a temp path and
  report the absolute location. Do not scatter a `docs/ideation/` tree into an
  unrelated CWD.

On a resume (a prior ideation doc for the same topic exists), update it in place:
carry the prior ideas and rejection summary forward and add to them rather than
overwriting.

## What the file contains

A ranked, critiqued candidate set, the grounding it was qualified against, and a
record of what was cut. It is a discovery document, not a requirements doc or a
plan — keep it about the ideas and their basis, not implementation.

There is **no status field** — not on the doc, not per idea. An ideation doc is a
point-in-time artifact with no lifecycle; whether an idea was later pursued is
knowable from the brainstorm or plan that picked it up, so it is not tracked here.

### Section shape

```markdown
---
date: YYYY-MM-DD
topic: <kebab-case-topic>
focus: <optional focus hint — omit when open-ended>
mode: <repo | elsewhere-software | elsewhere-non-software>
---

# Ideation: <Title>

## Grounding Context
[The Phase-1 grounding summary — "Codebase Context" in repo mode,
"Topic Context" in elsewhere mode.]

## Topic Axes
[3-5 axes, one per line, OR a single `Decomposition skipped — ...` line.
Omit the section when not applicable.]

## Ranked Ideas

### 1. <Idea Title>
**Description:** [Concrete explanation.]
**Axis:** [Axis this idea targets — omit when decomposition was skipped.]
**Basis:** [`direct:` quoted / `external:` cited / `reasoned:` written-out.]
**Rationale:** [How the basis connects to the move's significance.]
**Downsides:** [Tradeoffs or costs.]
**Confidence:** [0-100%.]
**Complexity:** [Low / Medium / High.]

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| 1 | <Idea> | <Reason rejected> |
```

Keep the idea cards expanded and readable in full — a reader picks a direction by
reading them, so don't collapse their substance. When an axis ended with zero
survivors despite recovery, add it as its own row in the Rejection Summary so the
coverage gap is visible rather than silently absent.

An occasional mermaid diagram is worth adding for an idea that **hinges on a
structure** — a flow, a before/after contrast, a cross-domain analogy mapping.
Keep it illustrative and at the idea's altitude (a rough sketch of a direction
nobody has committed to), never a spec, and never a substitute for the prose:
a reader who ignores the diagram still gets the complete idea. Most ideas need
none — a diagram with no shape to show, or one that just restates the title, is
decoration; skip it.

## Present a concise summary

Do not reprint the full deliverable in the session. Show a tight orientation:

- One line with counts and the path — e.g.
  `Wrote 7 ranked ideas (36 raw, 13 cut) across 5 axes → <absolute path>`.
- A ranked list, **one line per survivor**:
  `1. <Title> · <axis> · Conf <High/Med/Low> · Cx <S/M/L>`.
- The top pick called out in a sentence.
- Any zero-survivor axis noted in one line.

This ranked list doubles as the index the user references when choosing an idea
in the next step.
