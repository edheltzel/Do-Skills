---
name: code-review
description: >-
  Multi-lens code review orchestrator — selects the review lenses a diff warrants, runs them as
  bounded-parallel sub-agents, then dedups, confidence-ranks, and independently validates their
  findings into one report. Propose-only by default; applies fixes only in explicit apply mode.
  USE WHEN reviewing a branch or PR before merge, asking for a full review of a change, or
  wanting more than one reviewer's eyes on a diff. NOT FOR a single-lens pass you can run
  directly (use adversarial-review, review-structure, review-spec-conformance, or
  agent-native-review), or applying already-known review feedback (use resolve-pr-feedback).
user-invocable: true
argument-hint: "[apply] [base:<ref>] [spec:<path>] [blank for current branch, or a PR number/URL]"
---

# Code Review

Orchestrates a review by choosing which lenses a change earns, dispatching each as an independent sub-agent, and merging their returns into one confidence-ranked report. The lenses are this repo's own review skills — `adversarial-review` (correctness), `review-structure` (structural/standards), `agent-native-review` (human/agent parity), `review-spec-conformance` (the separate Spec axis), plus the framework lenses (`typescript`, `no-use-effect`, `ios-development`, `macos-swift-desktop`, `modern-css`, `tailwind-v4`, `react-native-expo`, `parse-dont-validate`) by name. Every lens reports under `review-verification-protocol` discipline.

**The defining constraint: this skill proposes, it does not apply.** By default it reviews and reports — it never edits the working tree. Applying fixes is a separate, explicit `apply` mode gated behind behavior-preservation verification. The two-axis rule is the other invariant: Spec-conformance findings live on their own axis and are never merged into, reranked against, or dedup'd with the correctness/standards findings.

## Arguments

Parse the invocation for optional tokens; strip each recognized token before treating the remainder as a PR number, URL, or branch name.

| Token | Effect |
|-------|--------|
| `apply` | **Apply mode** (opt-in). After review, apply the fixes the orchestrator is confident in, verify behavior preservation, and commit. Default (token absent) is propose-only: review and report, mutate nothing. |
| `base:<ref>` | Diff base on the current checkout (e.g. `base:origin/main`, `base:HEAD~5`). Skips base auto-detection. Do not combine with a PR/branch target. |
| `spec:<path>` | Spec/issue file for the Spec axis (`review-spec-conformance`). Explicit; otherwise the Spec axis discovers the source itself. |
| `depth:full` | Force the full lens roster — skip the small-diff lite path. Use when a deliberately thorough review is asked for. |

Stop with a one-line reason (do not dispatch) when incompatible scope selectors appear together — e.g. `base:` **and** a PR number/branch target (`base:` means "review the current checkout against this base").

## Operating principles

- **Propose by default; apply only on `apply`.** In the default mode this skill is read-only against the project: it reviews and reports. `apply` mode is the only path that mutates the tree, and only behind the Stage 6 behavior-preservation gate. Never push, open PRs, or file tickets in any mode — those are the user's outward steps.
- **No blocking prompts.** Infer intent, scope, and lens selection from tokens, git state, PR metadata, and conversation. Note uncertainty in Coverage; do not stop to ask.
- **Explicit mutations only.** Never `git checkout`/`switch` or `gh pr checkout`. A PR number, URL, or branch name selects **review scope**, not permission to change the working tree. To review a branch's local uncommitted work, be on that branch and pass `base:` or nothing.
- **Report outcomes, not machinery.** Surface what the user recognizes — the PR/branch under review, which lenses ran and the one-line reason for each conditional one, the findings, and (when it runs) the independent cross-model pass and which peer model runs it. Keep the plumbing (scope-mode codenames, parallel-dispatch bookkeeping, schema slots) out of user-facing text.

## Severity and confidence

Two independent axes, both from `review-verification-protocol`:

- **Severity** — `Critical` / `Major` / `Minor` / `Informational`. Orders urgency. `Informational` never counts toward the actionable total.
- **Confidence** — a discrete anchor in `{0, 25, 50, 75, 100}`. Gates where a finding surfaces. `0`/`25` are suppressed (a lens never emits them); `50` is a verified-but-minor/uncertain finding that surfaces only when Critical or when routed to a soft bucket; `75`/`100` are actionable. Anchor `75`+ requires quoting the verbatim motivating line with `file:line` (the quote-the-line gate) — a finding that cannot quote its trigger steps down to `50`.

**Net-new overlay.** A finding that asks for code that did not exist before — a new module, test suite, abstraction, or dependency — is `Informational` regardless of merit, and is excluded from the actionable count (per `review-verification-protocol`). Restoring parity or fixing existing code is not net-new; adding a capability the code never had is.

## Stages

### Stage 1: Resolve scope

Compute the diff range, file list, and diff. Load `references/diff-scope.md` — it defines the three scope modes and the PR-remote vs local-aligned discipline that governs how every lens inspects code.

- **`base:` given** — `BASE=$(git merge-base HEAD "<ref>" 2>/dev/null) || BASE="<ref>"`, then diff `git diff -U10 $BASE`.
- **No argument (current branch)** — resolve the base branch (`gh pr view --json baseRefName,url` for the current branch, else the default branch), compute `BASE=$(git merge-base HEAD <base>)`, diff `git diff -U10 $BASE`. If no base resolves, **stop** — never fall back to `git diff HEAD` (it would miss committed work).
- **PR number/URL given** — do **not** check out the PR. Fetch metadata with `gh pr view <n> --json title,body,baseRefName,headRefName,headRefOid,isCrossRepository,url,files,comments`. Classify the scope mode per `references/diff-scope.md` (`local-aligned` only when HEAD equals the PR head and carries it; otherwise `pr-remote`, diffed via `gh pr diff`). Skip closed/merged PRs with a plain reason.
- **Branch name given** — if it equals the current branch, use the current-branch path; otherwise diff the resolved `origin/<branch>` without checkout (`branch-remote` scope).

Always capture untracked files (`git ls-files --others --exclude-standard`); they are out of scope unless staged — list any excluded paths in Coverage, never stop.

### Stage 1b: Cheap scope signals (deterministic)

Derive signals once so lens selection and the lite gate do not each re-reason over the diff. **This block only ever shrinks the roster, and it fails closed** — any failure surfaces as `UNKNOWN`, never a silent `0` that reads as trivial.

```bash
# EXEC_LINES: added+removed lines in code files only. Fail closed on an unresolved base.
if ! git rev-parse --verify --quiet "${BASE}^{commit}" >/dev/null 2>&1; then
  echo "EXEC_LINES:UNKNOWN"; echo "UNCOUNTED_FILES:1"
else
  git diff --numstat "$BASE" -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.swift' '*.rb' '*.py' '*.go' '*.rs' '*.java' '*.kt' '*.c' '*.cc' '*.cpp' '*.cs' '*.php' \
    | awk '{s+=$1+$2} END{print "EXEC_LINES:" s+0}'
  git diff --name-only "$BASE" | awk 'NF && $0 !~ /\.(ts|tsx|js|jsx|swift|rb|py|go|rs|java|kt|c|cc|cpp|cs|php)$/ {n++} END{print "UNCOUNTED_FILES:" n+0}'
fi
```

`UNCOUNTED_FILES` counts changed files outside the code set (config, CI, schemas, markdown, lockfiles, unknown extensions) — any `>0` disqualifies the lite path. Also read the file list for stack signals (`.tsx`/`.jsx`/`.css` → frontend; `.swift`/`.pbxproj` → iOS; routes/serializers/`.proto` → API). These are prompts to *consider* a framework lens, not decisions — confirm the runtime concern is real in the diff before selecting it.

### Stage 2: Intent and spec discovery

Write a 2-3 line intent summary from PR title/body (PR mode), `git log ${BASE}..HEAD` (branch/standalone), and conversation. Intent shapes how hard each lens looks, not which lenses run. Note uncertainty in Coverage when intent is ambiguous — never block.

For the Spec axis: if `spec:<path>` was passed, use it. Otherwise let `review-spec-conformance` discover the source (issue refs in commits, a PRD under `docs/`/`specs/`). If no spec exists, the Spec axis reports "no spec available" and is omitted — it never blocks the standards review.

### Stage 3: Select lenses

Always-on standards/correctness lenses: **`adversarial-review`** and **`review-structure`**. Conditional lenses, added only when the diff warrants them:

- **`review-spec-conformance`** (Spec axis) — a spec/issue exists (via `spec:` or discovery). Runs on its own axis; see the two-axis rule below.
- **`agent-native-review`** — the repo has agent integration (tool definitions, system-prompt construction, LLM API calls) and the diff touches user-facing capability.
- **Framework lenses by name** — when the diff meaningfully changes that stack's runtime behavior, not merely from a file extension: `typescript` / `no-use-effect` / `parse-dont-validate` / `lean-ts-patterns` (TS/React), `modern-css` / `tailwind-v4` (styling), `ios-development` / `macos-swift-desktop` (Swift/Apple), `react-native-expo` (RN). Add the lens whose idioms the change actually exercises.

**Two-axis rule (binding).** `review-spec-conformance` is the Spec axis: it runs as its own isolated sub-agent, carries only the spec (not the standards), and its findings are reported under a separate `## Spec` heading. Spec findings **never** enter the confidence pool — no dedup, no cross-lens promotion, no confidence gate, no merge with the standards/correctness findings. The two axes sit side by side; reranking one against the other lets one mask the other, which is the whole point of keeping them apart.

**`review-verification-protocol` is not a dispatched lens.** It is the report discipline every lens applies — the gate-0 echo (quote the target from a source read this turn), the per-issue-type checklists, and the severity calibration. Pass it into every sub-agent as the reporting contract; it produces no findings of its own.

Announce the team before dispatch: name the always-on lenses plainly, and give each conditional lens its one-line reason (the real concern, not the keyword). If the cross-model pass will run (Stage 4b), name the peer on its own line.

### Stage 3b: Small-diff lite gate (fail-closed)

`depth:full` hard-disables this gate. Otherwise collapse to a **lite roster** (`adversarial-review` + `review-structure` only; skip framework lenses, `agent-native-review`, and the validator wave) only when **all** hold:

- `EXEC_LINES` is a number in `1..39` (not `UNKNOWN`), AND
- `UNCOUNTED_FILES` is `0` (every changed file is code), AND
- no stack signals fired, AND
- no content-based risk read from the diff (auth, payments, data mutation, external API, secrets, crypto, concurrency), AND
- no conditional lens was selected.

`EXEC_LINES:UNKNOWN` or `UNCOUNTED_FILES > 0` are hard disqualifiers. When in doubt, run the full roster — the gate keys on risk, not size (a 12-line auth change needs the full roster). Announce the reduction and note it in Coverage.

### Stage 4: Dispatch lenses (bounded parallel)

Before assembling any spawn, read `references/subagent-template.md` (the dispatch shape and normalization contract) and `references/findings-schema.json` (the JSON return contract). Each standards/correctness lens sub-agent receives: the lens skill to apply (by name — the sub-agent reads that skill), `references/diff-scope.md`, the schema, the intent summary, the scope mode and any remote head ref, the file list, and the diff. It applies the named lens, then normalizes its findings into the schema (severity in atlas words, confidence anchors) and **returns the JSON in its final message** — there is no artifact file and no run-id; the orchestrator merges from the returns.

**Bounded parallel dispatch.** Respect the harness's active-subagent limit without hard-coding a number: queue the selected lenses, dispatch up to the accepted capacity, fill freed slots as lenses complete. Treat concurrency-limit spawn errors as backpressure (requeue and retry), not lens failure. Omit the `mode` parameter so the user's permission settings apply.

Sub-agents are **read-only** against the project — they review and return JSON, never edit, and in `pr-remote`/`branch-remote` scope they inspect changed files via `git show <remote-head-ref>:<path>` or diff hunks only (never the workspace copy). Read-only permits non-mutating `git`/`gh` inspection.

**Inline fast pass.** In the same turn that fires the dispatch, do a quick first-principles scan of the diff for high-signal obvious issues (injection, a missing `await`, a swapped argument, an enum without its sibling switch), quoting the motivating line for each. Present them under a clearly preliminary header. The fast pass enters Stage 5 as a non-independent pseudo-lens `fast-pass`, **capped at anchor 50** and **never counting toward cross-lens promotion** — it is the orchestrator's own read and shares its blind spots. Reconcile withdrawn preliminary items in the final report.

Dispatch the Spec axis (`review-spec-conformance`) in the same wave but keep its return out of the pool (Stage 5 processes only the standards/correctness returns).

### Stage 4b: cross-model adversarial pass (optional, harness-gated)

When `adversarial-review` was selected **and** scope is `local-aligned`/standalone **and** the harness can shell out to a peer CLI, optionally run the adversarial brief through a different model family in a separate read-only process — genuine independence the in-process lens cannot provide. Launch it in this same dispatch wave (it is a background shell-out, not a sub-agent, so it does not consume the concurrency budget) and collect its result before Stage 5's cross-lens promotion. Load `references/cross-model-review.md`: it self-identifies the host, shells out to the peer (`codex` from a Claude host; `claude` from a Codex host), and returns a schema-shaped result that folds into Stage 5 as lens `adversarial-<peer>`. The pass is **non-blocking and optional** — skip silently when no peer is identified, the CLI is missing/unauthed, or the harness cannot background a shell command. Announce the peer on an interactive host; stay silent otherwise.

### Stage 5: Merge the standards/correctness findings

Convert the lens returns into one deduplicated, confidence-gated set. Spec-axis findings are **not** part of this stage.

1. **Validate.** Drop malformed returns/findings; record the count. Enforce the quote-the-line gate: any anchor-`75`/`100` finding missing its verbatim `first_evidence` line is demoted to `50`.
2. **Deduplicate.** Fingerprint = `normalize(file) + line_bucket(line, ±3) + normalize(title)`. On a match, merge: keep highest severity, keep highest anchor, note which lenses flagged it.
3. **Cross-lens promotion.** When 2+ **independent** lenses flag the same fingerprint, promote one anchor step (`50→75`, `75→100`). Promotion never bypasses the quote-the-line gate — two un-quoted `50`s cannot combine into a quote-free `75`. `fast-pass` never counts here. A cross-model `adversarial-<peer>` return counts as independent — its agreement with the in-process `adversarial-review` is the strongest signal in the set.
4. **Separate pre-existing.** Pull `pre_existing: true` findings into their own list (they do not count toward the verdict) — unless the change relies on the gap for its own correctness.
5. **Net-new → Informational.** Reclassify any finding requesting net-new code to `Informational`. It leaves the actionable count and is reported in the Informational section (step 6 does not gate it).
6. **Confidence gate (actionable tier only).** The gate governs the findings competing to surface as actionable — `Critical`/`Major`/`Minor`. Suppress those below anchor `75`, except `Critical` at anchor `50`+ (critical-but-uncertain must not be silently dropped); record the suppressed count by anchor for Coverage. **`Informational` findings are non-actionable by definition and are not subject to the gate** — they are reported in the Informational section regardless of anchor (this is where step 5's net-new findings land). Likewise the `residual_risks` and `testing_gaps` buckets are reported in Coverage regardless of anchor.
7. **Sort and number.** Order by severity (`Critical` first) → anchor (desc) → file → line, then assign stable `#` values across the whole set. Reuse each `#` everywhere the finding reappears.

### Stage 5b: Independent validator wave

Independent re-verification of each surviving standards/correctness finding — a fresh second opinion, not a critic of the original lens. Skip only when zero findings survive, or when Stage 3b ran the lite roster.

Read `references/validator-template.md`. Spawn one validator sub-agent per surviving finding (bounded parallel, same scheduler), each given the finding's fields, the diff, and the scope mode. Cap the wave at 15 findings by severity (never drop a `Critical`/`Major` from validation). Each returns `{"validated": true|false, "reason": "..."}`. A `validated:false` finding is dropped with its reason recorded; a `Critical`/`Major` hit by validator *infrastructure* failure (timeout, not a false verdict) is kept and marked degraded. Use the harness's mid-tier model for validators.

The orchestrator may directly verify a mechanical `Minor` finding at anchor `100` (confirm its `first_evidence` line exists and entails the claim) in place of a validator — but never for `Critical`/`Major`, or for anything hinging on runtime behavior or cross-file reasoning (security, concurrency, contracts), which keep the independent validator regardless of anchor.

### Stage 6: Apply (opt-in — `apply` mode only)

**Skip this stage entirely in the default propose-only mode.** It runs only when `apply` was passed and only when the working tree *is* what was reviewed (`local-aligned` or standalone — never `pr-remote`/`branch-remote`).

Apply the findings that are a clear improvement and a reversible edit (test hardening, dead-code removal, a localized fix with a concrete `suggested_fix`). Push back — do not apply — when the lens is wrong; skip taste calls, surfacing what was skipped and why. Then run the **behavior-preservation gate before committing**:

1. **Typecheck** the project (or the affected package).
2. **Lint** the changed files.
3. **Scoped tests** — the tests covering the changed surface (broaden when fixes span files).

If any step fails, revert that fix and report it as a finding instead — an unverified fix is not finished; never leave the tree red. Then, if the pre-review tree was clean (`git status --porcelain`), commit the applied fixes as one isolated commit: **`fix(review): <summary>`** (or the repo's nearest convention when `review` is not an allowed scope). If the tree was already dirty, apply but do not commit — the fixes ride along with the user's in-flight work. Never push. Never simplify away a safety check while applying (input validation, error handling, security checks, a11y are not removable boilerplate).

### Stage 7: Report

Load `references/output-format.md` and mirror its skeleton. Follow `review-verification-protocol` for report discipline — every finding must have passed the gate-0 echo. The report is ASCII-safe (`->` not arrows, no box-drawing), uses stable `#`s, and closes with a self-sufficient Verdict + Actionable list.

Structure: header (scope, intent, mode, lens team with per-conditional reasons); **Applied** (apply mode only — what changed, the behavior-preservation outcome, commit status); **Standards findings** grouped by severity (`### Critical`, `### Major`, `### Minor`, `### Informational`); **## Spec** (the Spec axis, reported separately under its own heading, never merged); **Agent-Native Gaps** (when `agent-native-review` ran); **Pre-existing** (separate, does not count toward the verdict); **Coverage** (suppressed counts, validator drops with reasons, degraded validations, lite-roster note, failed lenses, residual risks, testing gaps); and the **Verdict** (Ready to merge / Ready with fixes / Not ready) followed by the prioritized Actionable recap. When an explicit spec has unaddressed requirements, the verdict reflects it. Do not include time estimates.

## References

Load on demand at the stage that needs each — none is inlined.

| Reference | Load at | Purpose |
|-----------|---------|---------|
| `references/diff-scope.md` | Stage 1 / 4 | Scope modes and PR-remote vs local-aligned inspection discipline |
| `references/subagent-template.md` | Stage 4 | Dispatch shape; normalize a lens's output into the schema, return inline |
| `references/findings-schema.json` | Stage 4 | The JSON return contract |
| `references/validator-template.md` | Stage 5b | Per-finding independent validator |
| `references/cross-model-review.md` | Stage 4b (only when the cross-model pass runs) | Host self-id + peer-CLI shell-out |
| `references/output-format.md` | Stage 7 | Report skeleton |

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-code-review orchestrator, rewired to drive this repo's own review lenses.
