# Review Spec Conformance

Quickstart:

```bash
npx skills add edheltzel/skills --skill=review-spec-conformance
```

```bash
npx skills update review-spec-conformance
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/review-spec-conformance)

## What it does

`review-spec-conformance` reviews a diff along **one axis only**: does the code faithfully
implement its originating issue or spec? Not "is the code good" — that's a different axis. It
reports what the spec asked for that's missing or partial, behaviour the spec never asked for
(scope creep), and requirements that look addressed but contradict what the spec described.
The defining constraint is the **no-rerank rule**: spec findings are reported under their own
heading and never merged or reordered against coding-standards or correctness findings,
because reranking lets one axis mask the other.

## When to reach for it

Type `/review-spec-conformance`, or the agent reaches for it when you ask "does this match the
issue/PRD?", want a branch or PR checked against what was requested, or need the spec lens
alongside a standards review.

Reach for it when the risk is *building the wrong thing*. For correctness bugs and regressions,
use [adversarial-review](../core/adversarial-review.md); for repo standards and structural
quality, use [review-structure](../core/review-structure.md); for the report-shape conventions
it defers to, see [review-verification-protocol](../core/review-verification-protocol.md).

## How it works

It pins the fixed point (three-dot diff against the merge-base), then **finds the spec** in a
fixed order: issue references in the commit messages (fetched with `gh issue view`), a path you
passed, a PRD under `docs/`/`specs/`, then asking you — and if there genuinely is no spec, it
stops and says so. Findings quote the spec line so you can check each one, and ambiguous
requirements are raised as questions rather than asserted as omissions. Because it carries only
the spec — never the coding standards — its judgement stays uncoloured; when you want a
two-axis review, run it as one **context-isolated sub-agent** in parallel with
[review-structure](../core/review-structure.md) or
[adversarial-review](../core/adversarial-review.md) and read the reports side by side.

## Where it fits

One of the review family's lenses, deliberately narrow: correctness lives in
[adversarial-review](../core/adversarial-review.md), structure and standards in
[review-structure](../core/review-structure.md), report discipline in
[review-verification-protocol](../core/review-verification-protocol.md), and *fidelity to the
ask* here. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT) —
extracted from the Spec axis of his two-axis code-review skill.
