# Code Review

Quickstart:

```bash
npx skills add edheltzel/skills --skill=code-review
```

```bash
npx skills update code-review
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/code-review)

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-code-review orchestrator, rewired to drive this repo's own review lenses.

## What it does

Orchestrates a code review over a diff: it decides which review lenses the change earns, runs each as an independent bounded-parallel sub-agent, then deduplicates, confidence-ranks, and independently validates their findings into one report. The lenses are this repo's own skills — `adversarial-review`, `review-structure`, `agent-native-review`, `review-spec-conformance`, and the framework lenses (`typescript`, `no-use-effect`, `ios-development`, and the rest) — selected by name from what the diff touches.

It proposes; it does not apply. By default it reviews and reports and never edits the working tree. Applying fixes is a separate, explicit `apply` mode, and even then every applied fix passes a behavior-preservation gate (typecheck, lint, scoped tests) before it is committed as an isolated `fix(review):` commit.

## When to reach for it

- **Invocation mode.** Type `/code-review` (optionally with `apply`, `base:<ref>`, `spec:<path>`, or a PR number/URL), or the agent reaches for it when you ask for a full review of a change.
- **Trigger boundary.** Reach for this when you want more than one reviewer's eyes on a branch or PR. For a single-lens pass you can run directly, use that lens — [adversarial-review](../core/adversarial-review.md), [review-structure](../core/review-structure.md), [review-spec-conformance](../core/review-spec-conformance.md), or [agent-native-review](../core/agent-native-review.md). To apply feedback you already have, use resolve-pr-feedback.

## The two axes

The review runs on two axes that never blur together. The **standards/correctness axis** (adversarial, structural, agent-native, framework lenses) is a confidence pool: findings are dedup'd by fingerprint, promoted a notch when two independent lenses agree, and gated at confidence anchor 75 unless Critical. The **Spec axis** (`review-spec-conformance`) runs isolated, carrying only the spec, and reports under its own `## Spec` heading — its findings are never merged into or reranked against the standards pool, because letting one axis mask the other defeats the point of reviewing both.

## Confidence, severity, and the net-new overlay

Severity (`Critical`/`Major`/`Minor`/`Informational`) orders urgency; confidence is a discrete anchor in `{0, 25, 50, 75, 100}` that gates where a finding surfaces. Anchor 75+ requires quoting the verbatim triggering line — a finding that cannot quote its trigger steps down. A finding that asks for code that never existed (a new module, test suite, or dependency) is Informational and excluded from the actionable count. Every lens reports under [review-verification-protocol](../core/review-verification-protocol.md) discipline, including its gate-0 echo.

## It's working if

- The lens team announced matches the diff — always-on adversarial + structural, plus a one-line reason for each conditional lens.
- Findings carry a `file:line`, a confidence anchor, and (when two lenses agree) both lens names.
- The Spec section, when present, sits apart from the severity tables.
- In the default mode the working tree is untouched; only `apply` mode edits, and only behind a green typecheck/lint/test gate.

## Where it fits

The heavyweight review entry point in `core/`. It composes the standalone lenses — [adversarial-review](../core/adversarial-review.md), [review-structure](../core/review-structure.md), [review-spec-conformance](../core/review-spec-conformance.md), [agent-native-review](../core/agent-native-review.md) — any of which you can also run directly for a focused pass, and leans on [review-verification-protocol](../core/review-verification-protocol.md) for report discipline. Reach for it before merging; hand its findings to the fix workflows afterward.
