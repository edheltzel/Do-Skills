# Document Review

Quickstart:

```bash
npx skills add edheltzel/skills --skill=doc-review
```

```bash
npx skills update doc-review
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/doc-review)

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

Reviews a planning document — a requirements doc, a design doc, or an implementation plan — through several role-specific persona lenses running in parallel (coherence, feasibility, product, design, security, scope, adversarial), then merges, confidence-ranks, and routes their findings for your decision. Each persona is a document reviewer with a sharply bounded remit, so the coherence editor never wanders into security and the security architect never argues product strategy.

It proposes; it does not silently change your document. By default every finding — including the mechanically-fixable ones — is surfaced for your decision, and nothing is applied. An explicit `apply` mode is the only path that applies the clearly-safe, one-correct-fix findings without per-finding confirmation.

## When to reach for it

- **Invocation mode.** Type `/doc-review` (optionally with `apply` and a path), or the agent reaches for it when you ask to review or improve a planning document before building from it.
- **Trigger boundary.** Reach for this when the artifact under review is a *document* — a spec, design doc, or plan — and the risk is planning the wrong thing or planning it incompletely. To review a code change, use [code-review](../core/code-review.md); to check a diff against the spec it implements, use [review-spec-conformance](../core/review-spec-conformance.md); to write the document itself, use the planning skills.

## Generic shapes, classified by content

It works on any planning document, classified by what the content *is*, not by a special artifact format: a `requirements` doc (actors, flows, acceptance criteria, the what-to-build), a `plan` (implementation units, files, sequencing, the how-to-build), or a `design-doc` (an approach and its tradeoffs). The classification tunes each persona's scrutiny — plan-grade feasibility checks don't fire on a requirements doc that is intentionally deferring implementation detail — and a plan that derives from a validated upstream requirements doc has its premise left settled rather than re-litigated.

## Four-option routing and multi-round decisions

Interactively, synthesis ends in a four-option routing question — review each finding one by one, auto-resolve the defensible ones and surface the rest, append everything to the document's Open Questions section, or report only — none of them pre-recommended, because the right route depends on your intent, not the finding set. The per-finding walk-through cascades a single root decision across the dependents that dissolve with it, so you don't re-litigate one premise five times. Across rounds in a session, a decision primer carries every Skip, Defer, and Apply forward, so a second pass suppresses what you already rejected and verifies that the fixes you applied actually landed.

## Where it fits

The document-facing counterpart to [code-review](../core/code-review.md): same propose-only default, same severity and confidence vocabulary, same [review-verification-protocol](../core/review-verification-protocol.md) report discipline — but aimed at a plan before it is built rather than a diff after. Reach for it between drafting a spec/plan and executing it; hand its routed findings back into the document, then proceed to planning or implementation.
