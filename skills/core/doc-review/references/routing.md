# Routing and Presentation

How synthesized findings reach the user. Interactive mode runs the four-option routing question and the per-finding walk-through; non-interactive mode returns a report envelope.

## Non-interactive: report envelope

When no blocking question tool is available (or a caller wants a parseable result), emit the findings as a structured envelope and stop — no questions, no document edits (unless `apply` mode already applied the anchor-100 `safe_auto` fixes, which are listed under "Applied"). Use user-facing vocabulary — "fixes", "Proposed fixes", "Decisions", "FYI observations" — never the internal enum names.

```
Document review complete.

Applied N fixes:                          (apply mode only)
- <section>: <what changed> (<reviewer>)

Proposed fixes (concrete fix, needs confirmation):
[Major] <section> — <title> (<reviewer>, confidence <anchor>)
  Why: <why_it_matters>
  Fix: <suggested_fix>

Decisions (need judgment):
[Critical] <section> — <title> (<reviewer>, confidence <anchor>)
  Why: <why_it_matters>
  Dependents (resolve if this root is rejected):
    [Major] <section> — <title> (<reviewer>, confidence <anchor>)

FYI & Informational (anchor-50 findings, plus any Informational-severity finding regardless of anchor — surfaced for awareness, no decision):
[Minor] <section> — <title> (<reviewer>, confidence 50)
[Informational] <section> — <title> (<reviewer>, confidence <anchor>)   (net-new / advisory — excluded from the actionable count)

Residual concerns / Deferred questions:
- <item> (<source>)

Dropped: N   Chains: N root(s) with M dependents

Review complete
```

Omit any empty section. A root with dependents renders once, dependents nested beneath it — never re-listed at their own position. End with "Review complete" as the terminal signal.

## Interactive: routing question

After synthesis (and, in apply mode, after the anchor-100 `safe_auto` fixes are applied and listed), ask a four-option routing question with the blocking tool. If every remaining finding is FYI-only (no `gated_auto`/`manual` at anchor 75/100), skip this and go straight to the report.

**Stem:** `What should the agent do with the remaining N findings?`

```
A. Review each finding one by one — accept the recommendation or choose another action
B. Auto-resolve with best judgment — apply the per-finding edits the agent can defend, surface the rest
C. Append findings to the doc's Open Questions section and proceed
D. Report only — take no further action
```

No option is marked `(recommended)` — the route depends on user intent (engage / trust / triage / skim), not on the finding-set shape. If the document is read-only (Open Questions cannot be appended), suppress option C and say why. Dispatch: **A** runs the walk-through; **B** applies the agent-recommended action across every pending finding then reports; **C** appends every pending finding to the document's `## Deferred / Open Questions` section (no edits) then reports; **D** reports only.

## Per-finding walk-through (option A)

Iterate the actionable findings — anchor 75/100 with `autofix_class` `gated_auto`/`manual`, **excluding `Informational` severity** (Informational and anchor-50 findings are non-actionable and appear only in the FYI & Informational report bucket, never the walk-through) — in severity order, but **root-first**: a finding with `dependents` comes before them so its decision can cascade. For each finding, print a markdown block, then fire a plain-text question — never merge the two.

Block:

```
## Finding {N} of {M} — {severity} {plain-English title}

Section: {section}

**What's wrong**
{why_it_matters, rephrased as observable consequence}

**Proposed fix**
{suggested_fix as prose describing intent — not raw markup, no diff blocks}

**Why it works**
{short reasoning, grounded in a document/codebase pattern when available}
```

Question — four options, fixed order, the synthesis-recommended action marked `(recommended)` on A/B/C (never D):

```
A. Apply the proposed fix
B. Defer — append to the doc's Open Questions section
C. Skip — don't apply, don't append
D. Auto-resolve with best judgment on the rest
```

Adaptations: with exactly one pending finding, drop D and the `N of M` counter. If the document is read-only, drop B and remap any Defer recommendation to Skip. If Apply is picked on a finding with no `suggested_fix`, it is not executable — fire a sub-question offering Defer / Skip / Acknowledge-without-applying (record the acknowledgement; it counts as rejected for round suppression).

**Cascade.** When the user picks Skip or Defer on a root with dependents, announce it ("this will auto-resolve N dependent findings: {titles}") and offer `Cascade — apply the same action to all` (recommended) or `Decide each individually`. On Cascade, apply the root's action to every dependent and skip their entries. Picking Apply on a root does **not** cascade — the premise held, so each dependent still needs its own decision.

**State is in-memory.** Apply decisions accumulate in an Apply set and execute in one batch at the end; Defer appends happen inline; Skip is a no-op. An interrupted walk-through discards in-memory state cleanly — Apply decisions haven't been dispatched yet, so no document changes are half-applied.

## Execution and completion report

At the end of the walk-through (or after option B), apply every Apply-set finding's `suggested_fix` to the document in one inline pass via the edit tool (this skill has no fixer sub-agent — the orchestrator edits directly, since these are single-file markdown changes). Skip any Apply-set entry lacking a `suggested_fix`, recording it as a failure rather than failing the batch.

Then emit the completion report — the same structure for every terminal path:

- **Failures first** (any Apply that failed, any Open-Questions append that failed) — above the per-finding list.
- **Per-finding entries** grouped `Applied / Deferred / Skipped / Acknowledged`, each with title, severity, action, and a one-line reason (Deferred: append location; Skipped: the anchor or a `why_it_matters` snippet; Acknowledged: the acknowledgement reason).
- **Summary counts** per bucket (omit a bucket at zero).
- **Coverage** — FYI & Informational observations (anchor-50 findings plus any Informational-severity finding), residual concerns, deferred questions, and the footnotes (`Dropped:`, `Chains:`, round-suppression notes).
- **Verdict** — Ready / Ready with revisions / Not ready.

## Terminal question and iteration

After the completion report, in interactive mode fire a terminal question (blocking tool): apply pending decisions and proceed to the next stage (planning for a `requirements` doc, execution for a `plan`), re-review, or exit. After 2 refinement passes, recommend completion — diminishing returns are likely, though the user may continue (the decision primer suppresses repeat findings cleanly). Non-interactive mode returns "Review complete" immediately with no terminal question.
