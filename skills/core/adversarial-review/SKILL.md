---
name: adversarial-review
description: >-
  Adversarially hunt for correctness bugs and regressions in a change set. Use when reviewing
  a diff before finalizing, during a cleanup pass, or when asked to find bugs, pressure-test,
  or stress-test recently modified code. Triggers on: "find bugs", "what could break",
  "review for correctness", "did I break anything", "hunt regressions",
  "adversarial review", "pressure-test this change".
---

# Adversarial Review

Assume the change is wrong until a concrete input proves it right. Hunt correctness bugs the change introduced — not style, not security. One finding you can trigger beats ten you cannot.

## Stance

- Default to distrust. The diff is guilty until a named input clears it.
- No credit for good intent, partial fixes, or "probably fine."
- Happy-path-only is a defect. If code only works on the example input, that is the finding.
- A specific attack angle ("what input makes this throw?") finds bugs. "Review this code" produces polite nothing.

## Scope

Review only the specified change set and its blast radius. Every finding must tie to a changed line and pass the Evidence Gate below.

Hand off, do not duplicate. Style → `simplify`. Comment intent → `code-comments`. Type design → `parse-dont-validate`. Security → `security-review`. Framework idioms → `typescript` / `no-use-effect` / `macos-swift-desktop`. Structural/architecture health → `review-structure`.

Before reporting findings, apply `review-verification-protocol` — its anti-confabulation echo gate, per-issue-type checklists, and valid-pattern tables complement the Evidence Gate below on the false-positive side.

This is read-only. Propose fixes; do not apply them, and do not touch code outside the change.

## Evidence Requirements

An actionable finding starts at a line in the current diff. During the review pass, reread that
hunk and its enclosing symbol, then cite the file and changed line. Describe the code that is
actually present rather than relying on a task description, branch name, earlier snapshot, or
similar-looking code elsewhere.

Supply a concrete input, state, or event sequence that reaches the changed line and produces the
claimed failure. Trace the path through relevant callers, validation, guards, framework/runtime
semantics, and resource cleanup. Separate observations from deductions; source, tool output, or a
repeatable execution must support the path.

For each selected review surface, mark the material path and rebuttal checks as `complete` or
`blocked`. A blocked check belongs in coverage, not in the actionable count. Name what evidence or
environment is unavailable and which behavior therefore remains undecided. Missing evidence
neither proves a defect nor permits a clean result.

## What to hunt

| Bug class | The tell |
|---|---|
| Null / optional | A value from an API, map lookup, regex match, or DB row is dereferenced without a guard |
| Boundary / off-by-one | Index math, slice bounds, `<` vs `<=`, empty or single-element input |
| Swallowed error | Empty catch, catch-log-continue, ignored error/`Result` return, un-awaited rejection |
| Happy-path gap | Works on the demo input; empty / zero / negative / huge / missing-field / dependency-down untested |
| Race / ordering | Shared mutable state, check-then-act, an `await` between a read and its write |
| State mutation / aliasing | Mutates a passed-in object, array, or default arg the caller still holds |
| Async / await | A promise used as its value, a forgotten `await`, `async` inside `forEach`, sequential-vs-parallel slip |
| Type coercion | `==` vs `===`, truthy `0` / `""` / `[]`, implicit string↔number, `NaN` |
| Resource leak | Acquire (file, socket, lock, listener, subscription) with no release on every path — especially the error path |
| Inverted logic | Flipped boolean, wrong operator, bad default, De Morgan slip — plausible, but takes the wrong branch |
| Contract mismatch | Signature / units / nullability / return shape changed but not all callers; or a call with wrong or hallucinated args |
| Partial change | One branch updated but not its twin; a flag without the gated code; a migration without its reader; leftover TODO |

Weight the hunt: fresh, often agent-written code skews to happy-path gaps, missing null and edge guards, swallowed errors, mismatched or hallucinated APIs, and half-finished refactors. Look there first.

## Technique

For each changed function:

1. State its contract in one line before reading the body — inputs, output, side effects. Then check the body actually delivers it.
2. Assume every variable can be null and every external call can fail. Find the first line that does not survive that assumption.
3. Construct one concrete failing input and trace it line by line to the suspect spot. Verify it actually reaches that line — not a plausible neighbor.
4. Ask "if I deleted this change, what breaks?" — tests whether it is necessary and what it regresses.

## Finding Threshold And Calibration

Report a defect only when a named trigger reaches the changed code and demonstrates the incorrect
outcome. If the path cannot be established, keep it out of actionable findings. A question or
low-confidence lead may guide follow-up, but it is not a verified defect.

Assign severity from the demonstrated consequence:

| Severity | Required consequence |
|---|---|
| **Critical** | Reachable data loss or corruption, common-path crash, or a broken public contract that prevents safe release |
| **Major** | Reachable wrong behavior or failed recovery with material impact on ordinary use |
| **Minor** | Reachable, contained defect with limited impact and a usable workaround |
| **Informational** | Non-blocking observation or improvement; excluded from the actionable count |

Record confidence independently. `high` means both trigger and impact were directly established;
`medium` means reachability is established while one impact detail is inferred; `low` is an
investigation lead rather than a finding. Potential impact never compensates for weak evidence.

## Counterevidence Pass

Try to invalidate every candidate before reporting it. Recheck upstream callers, defensive
branches, sanitizers, runtime guarantees, error handling, and cleanup paths that could prevent or
contain the failure. Remove candidates defeated by this counterevidence. If a material check cannot
be completed, preserve that limitation in coverage and do not convert uncertainty into a pass.

## Output

Return:

- **Verdict** — `FINDINGS`, `HOLDS UP`, or `INCONCLUSIVE/BLOCKED`.
- **Actionable findings** — each includes the changed file and line, one-sentence defect,
  concrete trigger, demonstrated path and impact, severity, confidence, and a proposed fix that
  remains unapplied.
- **Coverage** — every selected surface with its material trigger-path and counterevidence checks
  marked complete or blocked. A blocked entry names the missing source, execution environment, or
  other artifact and the behavior left unresolved.

`HOLDS UP` is available only when no actionable findings survive and all required evidence checks
completed. Use `INCONCLUSIVE/BLOCKED` whenever a required path, guard, caller, runtime, or cleanup
check could not be completed, even if the actionable count is zero. Use `FINDINGS` when verified
defects remain; disclose blocked coverage alongside them rather than hiding it.

