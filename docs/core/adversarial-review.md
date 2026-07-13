# Adversarial Review

Quickstart:

```bash
npx skills add edheltzel/skills --skill=adversarial-review
```

```bash
npx skills update adversarial-review
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/adversarial-review)

## What it does

`adversarial-review` hunts for correctness bugs and regressions introduced by a
change set. The defining constraint is triggerability: every reported finding
must name the concrete input or sequence that reaches the changed line and
causes the failure. One reproducible bug beats ten plausible suspicions.

## When to reach for it

Type `/adversarial-review`, or the agent reaches for it when reviewing a diff
before finalizing, pressure-testing recent changes, or answering “what could
break?”

Reach for it when the risk is incorrect behavior: missing guards, boundary
errors, stale callers, async ordering, swallowed failures, resource leaks, or a
half-finished refactor. For readability and unnecessary complexity, use
[simplify](./simplify.md). For feedback already left on a pull request, use
[git-pr-review-triage](./git-pr-review-triage.md).

## Trigger and source requirements

Every actionable defect begins with a specific input, state, or event sequence.
The reviewer must show that this trigger reaches a changed line and produces the
claimed behavior. A plausible risk without a reachable trigger remains a lead,
not a finding.

The evidence comes from the current change set. The reviewer rereads the exact
hunk and enclosing symbol, cites the changed file and line, and follows the path
through relevant callers, validation, guards, runtime or framework guarantees,
error handling, and cleanup. Task descriptions and remembered snapshots provide
context but cannot replace the code under review.

Common attack surfaces include empty or absent values, numeric boundaries,
dependency failures, asynchronous ordering, caller-visible mutation, contract
changes, resource lifetime, and edits applied to one branch but not its
counterpart.

## Counterevidence and calibration

Before reporting a candidate, the reviewer actively looks for facts that defeat
it: an upstream caller constraint, a guard, a sanitizer, a runtime guarantee, a
recovery branch, or guaranteed cleanup. Candidates disproved by that pass are
removed.

Severity describes the consequence that was actually demonstrated. Confidence
describes how directly the trigger, path, and impact were established. A severe
hypothesis with incomplete evidence is not promoted into a release blocker.
Low-confidence suspicions stay outside the actionable count.

## Verdict and coverage

The result contains:

- `FINDINGS` when one or more evidence-bound defects survive.
- `HOLDS UP` only when no actionable defects survive and every required path and
  counterevidence check for each selected review surface completed.
- `INCONCLUSIVE/BLOCKED` when any required evidence check cannot complete,
  including caller, guard, runtime, or cleanup inspection. This verdict applies
  even when the actionable count is zero.
- A coverage ledger marking every selected surface complete or blocked. Each
  blocked entry names the unavailable source, tool result, environment, or other
  artifact and the behavior that remains unresolved.

Unavailable evidence is neither proof of a bug nor evidence that the change is
safe. Blocked coverage remains visible beside any verified findings.

## It's working if

- Every actionable item cites a changed line and supplies a trigger that reaches
  it.
- The path assessment covers affected callers, validation and guards, runtime
  behavior, error handling, and cleanup where material.
- Each candidate is challenged with counterevidence before it survives.
- Severity follows demonstrated impact, while confidence separately describes
  the strength of the evidence.
- Blocked checks identify both the missing prerequisite and the behavior left
  unresolved.
- `HOLDS UP` is never used when a required evidence check is unavailable.

## Where it fits

A read-only correctness lens for the end of a change. It complements
[simplify](./simplify.md), [code-comments](./code-comments.md), and
[parse-dont-validate](../engineering/parse-dont-validate.md), each of which owns
a different concern. It also runs as the correctness lens inside
[cleanup-web](../engineering/cleanup-web.md) and
[cleanup-swift](../engineering/cleanup-swift.md).

