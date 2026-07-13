# Synthesis

Process the persona returns through this pipeline in order — each step depends on the previous.

## 1. Validate

Drop findings missing a required field or carrying an invalid enum value; note the persona in Coverage if its output was malformed. Do not narrate remap/validation diagnostics to the user — a malformed persona shows up only as a Coverage annotation.

## 2. Confidence gate (actionable tier only)

The gate governs the findings competing to enter routing — the actionable tier:

| Anchor | Route |
|--------|-------|
| `0`, `25` | Drop silently. Record the total as a Coverage footnote when non-zero (`Dropped: N`). |
| `50` | **FYI observation** — surface in the report's FYI section, no routing entry, no decision forced. |
| `75`, `100` | Actionable — enter the classification pipeline, routed by `autofix_class`. |

`Informational`-severity findings (including net-new) and the `residual_risks` / `deferred_questions` buckets are **non-actionable by definition** and surface for awareness regardless of anchor — the gate does not apply to them. Filter low (anchor 50 keeps advisory signal as FYI) and let routing handle volume: document review has no linter backstop, so the review *is* the backstop, and a surfaced-and-skipped finding is far cheaper than a missed-and-shipped one.

## 3. Deduplicate

Fingerprint each finding as `normalize(section) + normalize(title)` (lowercase, strip punctuation, collapse whitespace). On a match across personas: if the findings recommend opposing actions (one says cut, one says keep), do **not** merge — preserve both for step 5. Otherwise merge — keep highest severity, keep highest anchor (ties broken by document order), union evidence, note all agreeing personas. Attribute the merged finding to the highest-anchor persona and decrement the loser's counts so totals stay exact.

**Same-persona premise collapse.** When one persona files 3+ findings sharing the same root premise (same `finding_type`, overlapping `why_it_matters`, and fixes all mooted by the same upstream decision), keep the strongest and demote the rest to FYI (anchor 50), noting `(+N related variants demoted to FYI)` on the kept finding. This runs per-persona before step 4; it never collapses across personas — different personas converging on one concern is the independence signal step 4 rewards.

## 4. Cross-persona agreement promotion

When 2+ independent personas flagged the same merged finding, promote its anchor one step (`50 → 75`, `75 → 100`; `100` stays). Independent corroboration is stronger than any single persona's anchor. Note it in the reviewer attribution (e.g. `coherence, feasibility (+1 anchor)`).

## 5. Resolve contradictions

When personas disagree on the same section (one says keep, one says cut; one says impossible, one says essential), create a combined finding presenting both perspectives, set `autofix_class: manual` and `finding_type: error`, and frame it as a tradeoff for the user to decide — not a verdict.

## 6. Auto-promote

Scan `manual` findings for promotion to `gated_auto` (or `safe_auto` when genuinely one correct addition) when: the fix follows a specific cited codebase pattern; the document describes factually-incorrect behavior with a derivable correction; a standard security/reliability control is clearly missing with an established fix; a hand-rolled implementation duplicates a cited framework API; or the missing content follows mechanically from the document's own explicit decisions. Do not promote scope/priority changes where the author may have weighed invisible tradeoffs. If a `safe_auto` finding dismissed a genuinely plausible alternative, downgrade it to `gated_auto` so the user sees the tradeoff.

## 7. Premise-dependency chaining (optional)

Document reviews fan out: one premise challenge ("is this work justified?") spawns dependents that all dissolve if the premise is rejected ("the abstraction it needs is overkill", "its migration lacks rollback"). Surfacing each as an independent decision forces the user to re-litigate the root N times. When a `Critical`/`Major`, `manual`, framing-level finding challenges a foundational premise about a named component, link the dependents whose concern would dissolve if the root is rejected: annotate each dependent `depends_on: <root>` and the root `dependents: [...]`. Do **not** link a dependent that identifies a problem surviving root rejection (an operational obligation like rollback or test coverage, or one grounded in independent evidence) — when uncertain, do not link. Report `Chains: N root(s) with M dependents` in Coverage. Routing (`references/routing.md`) uses the annotation to cascade a single root decision.

## 8. Route by tier

Actionable findings (anchor 75/100) route by `autofix_class`:

- `safe_auto` at anchor `100` — the clearly-safe, one-correct-fix tier. In **apply mode** these are applied automatically first (see below); in propose-only they enter the walk-through with Apply recommended.
- `gated_auto` — a concrete fix; enter the walk-through with Apply recommended (requires `suggested_fix`; demote to `manual` if missing).
- `manual` — enter the walk-through with user-judgment framing.

Severity and `autofix_class` are independent (a `Critical` finding can be `safe_auto` if the fix is obvious); anchor gates the surface, `autofix_class` decides what routing does with it.

## Apply mode vs propose-only

- **Propose-only (default).** Apply nothing up front. Every finding, including `safe_auto`, is surfaced for the user's decision through routing. This is the inversion of the source skill's silent-apply default.
- **Apply mode (`apply` token).** Apply the anchor-100 `safe_auto` findings to the document automatically first (single inline pass via the edit tool; each requires a `suggested_fix`), list them in an Applied section, then route the remaining `gated_auto`/`manual` findings. Apply mode still never touches `gated_auto`/`manual` without the user's routing decision — it only removes the per-finding confirmation for the genuinely-one-correct-fix tier.

## Sort and round-suppression

Sort for presentation: `Critical → Major → Minor → Informational`, then errors before omissions, then anchor descending, then document order.

On round 2+ (decision primer non-empty), the orchestrator is the authoritative gate:

- **Rejected-finding suppression.** Drop a current-round finding that fingerprint-matches a prior-round Skipped/Deferred/Acknowledged finding with >50% evidence overlap — unless the section was substantively edited and the evidence quote no longer appears (then it is genuinely new). Record the suppression in Coverage.
- **Fix-landed verification.** For a current-round finding matching a prior-round Applied finding: strong evidence overlap (>50%) means the fix did not land — flag "fix did not land." Weak overlap means it likely landed — suppress a non-actionable "already addressed" observation and record `Verified: '<title>' landed`; otherwise treat as new.

## Protected content

Discard any finding recommending deletion of a document's own `## Deferred / Open Questions` staging area or of pipeline artifacts under `docs/plans/` or `docs/solutions/`.
