# Review Verification Protocol

Quickstart:

```bash
npx skills add edheltzel/skills --skill=review-verification-protocol
```

```bash
npx skills update review-verification-protocol
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/review-verification-protocol)

## What it does

`review-verification-protocol` is the false-positive discipline layered under every
code review. Before any finding is reported, it requires a same-turn echo of the exact
code being judged (the anti-confabulation gate), evidence artifacts per issue type
(searches, file:line citations, tool output), calibrated severity, and a pass through
"valid patterns — do not flag" tables for TypeScript, React, and testing code.

## When to reach for it

Load it alongside any review pass — [adversarial-review](./adversarial-review.md),
[cleanup-web](../engineering/cleanup-web.md),
[cleanup-swift](../engineering/cleanup-swift.md), or
[review-structure](./review-structure.md) — before reporting findings. It governs how
findings are verified and reported, not how they are found.

## The echo gate

The core rule: a verdict issued without a same-turn quote of its target is invalid.
An LLM under contextual priming will confidently flag code that is not in the file;
the gate forces every finding to anchor on freshly read source, with the source winning
over recollection every time.

## Calibration that keeps reviews honest

Requests for net-new code that didn't exist in scope are Informational, never blocking.
Style preferences where both approaches are valid don't get flagged at all. Issue-type
checklists ("unused variable", "missing validation", "memory leak", "performance")
enumerate the checks that must produce artifacts before the flag ships.

## It's working if

- Every reported finding cites file:line from code read in the same turn.
- "Unused" claims come with a search result, not a hunch.
- The actionable count excludes Informational and style items.
- Re-reviews verify prior fixes instead of opening new discovery.

## Where it fits

The defensive complement to [adversarial-review](./adversarial-review.md): that skill
hunts bugs with evidence gates; this one keeps the report free of confabulated or
pedantic findings. Imported and adapted from the beagle skills marketplace
(existential-birds/beagle).
