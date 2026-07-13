# Output Format

The canonical section skeleton for the review write-up. Copy the structure; the example shows one good rendering, not the only layout. Shape each finding for the reader's next action (what & where / why it matters / what response it needs / how sure). Findings are grouped by severity, not by lens. Follow `review-verification-protocol` for report discipline — every finding must have passed the gate-0 echo.

**Hard constraints (non-negotiable):** ASCII-safe only — no box-drawing or per-item horizontal-rule separators, no Unicode arrows or middot; use `->`. Do not paste file contents or re-print the diff — cite `file:line`. Stable `#` numbering, reused wherever a finding reappears. The Verdict and Actionable list are present, last, and self-sufficient. Escape literal `|` in table cells as `\|`.

## Two axes stay separate

Standards/correctness findings (from `adversarial-review`, `review-structure`, `agent-native-review`, framework lenses) are confidence-pooled, dedup'd, and severity-grouped. **Spec-conformance findings are a separate axis** — presented under their own `## Spec` heading, never merged into or reranked against the standards findings, and not part of the `#` numbering pool.

## Example

```markdown
## Code Review Results

**Scope:** merge-base with origin/main -> working tree (14 files, 342 lines)
**Intent:** Add order export endpoint with CSV and JSON support
**Mode:** propose-only
**Lenses:** adversarial-review, review-structure (always); agent-native-review — new export UI on an agent-integrated app; typescript — new TS service module

### Applied (apply mode only)

| # | File | Fix | Lens |
|---|------|-----|------|
| 6 | `export.test.ts:40` | Added test for the empty-format branch | adversarial-review |

Behavior preservation: typecheck clean, lint clean, export tests 11 -> 13 pass.
Committed: `fix(review): cover empty-format branch` (tree was clean before review).

### Critical

| # | File | Issue | Lens | Confidence |
|---|------|-------|------|------------|
| 1 | `orders.controller.ts:42` | User-supplied ID in lookup, no ownership check | adversarial-review | 100 |

- **#1** — `findById(params.id)` on the export path has no ownership scope, so any authenticated user can export another account's orders. Scope the lookup to the current account.

### Major

| # | File | Issue | Lens | Confidence |
|---|------|-------|------|------------|
| 2 | `export.service.ts:87` | Loads all orders into memory — unbounded | review-structure | 100 |
| 3 | `export.service.ts:91` | No pagination contract | review-structure | 75 |

- **#2** — materializes the full result set; a large account OOMs the worker. Stream or paginate.
- **#3** — returns every row in one response; needs a cursor/page contract. Design decision — see Actionable Findings.

### Minor

| # | File | Issue | Lens | Confidence |
|---|------|-------|------|------------|
| 4 | `export.helper.ts:12` | Format detection could use an early return | review-structure | 75 |

### Informational

| # | File | Issue | Lens | Confidence |
|---|------|-------|------|------------|
| 5 | — | No integration test suite for the export flow (net-new) | review-structure | 50 |

## Spec

Reviewed against `docs/orders/export.spec.md`.

- **Missing/partial** — spec asks for a rate limit on the export endpoint (line 34); the diff adds none.
- **Scope creep** — the diff adds a JSON format the spec did not request (harmless, but unreviewed against spec).
- Summary: 2 spec findings; worst is the missing rate limit.

### Agent-Native Gaps

- New export endpoint has no agent tool — agent users cannot trigger exports.

### Pre-existing

| # | File | Issue | Lens |
|---|------|-------|------|
| 1 | `orders.controller.ts:12` | Broad catch masking a failed permission check | adversarial-review |

### Coverage

- Suppressed: 2 Minor findings verified but below anchor 75 (1 at anchor 50, 1 at anchor 25) — too uncertain to surface as actionable. (Informational #5 is not suppressed: Informational findings are reported regardless of anchor.)
- Validator wave: 4 dispatched, 4 confirmed.
- Residual risks: no rate limiting on the export endpoint.
- Testing gaps: no test for concurrent export requests.

---

> **Verdict:** Ready with fixes
>
> **Reasoning:** 1 Critical auth bypass must be fixed. The memory/pagination issues (Major) should be addressed before production. Spec axis: the missing rate limit should be resolved or explicitly deferred.
>
> **Fix order:** Critical auth bypass -> Major memory/pagination -> spec rate limit
```

## Formatting rules

- **Severity-grouped sections** — `### Critical`, `### Major`, `### Minor`, `### Informational`. Omit empty levels.
- **Stable sequential `#`** — assigned once after sorting (Stage 5), continued across severity sections, reused wherever a finding reappears. A multi-file fix is one row with one `#`.
- **Always include `file:line`.** The **Lens column** shows which lens(es) flagged it — multiple = cross-lens agreement. The **Confidence column** is the integer anchor (`50`/`75`/`100`), never a float.
- **Detail line per finding, as needed** — keep the scannable line short (symptom + `file:line`); put why-it-matters + fix/options in a keyed detail line `- **#N** — …`. Usually earned by Critical/Major; Minor/Informational are often terse-only. No pasted code.
- **Applied section (apply mode only)** — list applied fixes first, with the behavior-preservation outcome (typecheck/lint/scoped-test results) and commit status (`fix(review): …` on a clean tree, or left uncommitted on a dirty one). Flag green-but-unverifiable edits (auth/contract/concurrency) inline. Omit in propose-only mode and when nothing was applied.
- **Spec section** — under `## Spec`, grouped as missing/partial, scope creep, implemented-but-wrong, each quoting the spec line. Never folded into the severity tables.
- **Pre-existing section** — separate table, does not count toward the verdict.
- **Coverage section** — suppressed counts by anchor, validator drops with reasons, degraded validations, lite-roster note, failed lenses, residual risks, testing gaps.
- **Verdict** — blockquoted, last, self-sufficient: verdict + reasoning + fix order. When an explicit spec has unaddressed requirements, the verdict reflects it. No time estimates.
