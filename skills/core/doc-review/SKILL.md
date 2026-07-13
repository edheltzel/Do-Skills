---
name: doc-review
description: >-
  Persona review of a planning document — a spec, a design doc, or a plan — through role-specific
  lenses (coherence, feasibility, product, design, security, scope, adversarial), then synthesized
  into one routed report. Propose-only by default; applies fixes only in explicit apply mode.
  USE WHEN asked to review or improve a requirements doc, spec, design doc, or implementation plan
  before building from it. NOT FOR reviewing code changes (use code-review), checking a diff against
  its spec (use review-spec-conformance), or writing the document itself.
user-invocable: true
argument-hint: "[apply] [path/to/document.md]"
---

# Document Review

Reviews a planning document through several role-specific persona lenses running in parallel, then merges, confidence-ranks, and routes their findings for the user's decision. The personas are document reviewers — `coherence`, `feasibility`, `product`, `design`, `security`, `scope`, and `adversarial` — each seeded from a prompt asset under `references/personas/`.

**The defining constraint: this skill proposes, it does not silently change your document.** By default every finding, including the mechanically-fixable ones, is surfaced for your decision — nothing is auto-applied. An explicit `apply` mode is the only path that applies the clearly-safe fixes without per-finding confirmation. It works on generic document shapes (a `spec.md`, a design doc, a plan) classified by content, not by any special artifact contract.

## Arguments

Parse for an optional `apply` token and a document path; strip `apply` before treating the remainder as the path.

- `apply` — **apply mode** (opt-in): apply the anchor-100, one-clear-fix findings automatically, then route the rest. Default (token absent) is propose-only: surface every finding for decision, apply nothing up front.
- `<path>` — the document to review. If absent, ask which document (interactive), or fail with a one-line reason (non-interactive).

## Interactive vs non-interactive

- **Interactive** (a blocking question tool is available): after synthesis, run the four-option routing question and the per-finding walk-through (`references/routing.md`). Pre-load the question tool once at the top of the flow — in Claude Code, `AskUserQuestion` is deferred, so call `ToolSearch` with `select:AskUserQuestion` before the first question. The numbered-list fallback applies only when the harness genuinely lacks a blocking tool (`ToolSearch` returns no match, the call errors, or the mode does not expose it) — never render a decision question as narrative text.
- **Non-interactive** (no blocking tool, or a caller wants a parseable result): return the synthesized findings as a structured report envelope for the caller to handle; do not fire routing questions. This folds in what a report-only run needs.

## Phase 1: Get and classify the document

Read the document from disk (confirm it is readable before any dispatch — a persona team that discovers it cannot read the file wastes the whole run). If a path resolves only on an unchecked-out branch, stop and say so; if none was given, ask (interactive) or fail (non-interactive).

**Classify by content shape**, not file path (path is only a tie-breaker):

- **`requirements`** (what-to-build) — actors, flows, acceptance examples/criteria, `R#`/`AE#`-style IDs, prose framed around the user/business problem, scope boundaries, success criteria; no implementation units or per-unit file lists.
- **`plan`** (how-to-build) — implementation units, per-unit `Goal`/`Files`/`Approach`/`Test scenarios`, repo-relative paths, key technical decisions, sequencing, `U#`-style IDs.
- **`design-doc`** — a proposal framed around a technical approach and its tradeoffs (architecture, interfaces, alternatives considered) without a formal requirements or unit structure. Review it with the `plan` lens set plus a premise pass, since its premises are usually not validated upstream.

When shape is genuinely ambiguous, default to `requirements` (the more conservative classification — it activates fewer plan-grade feasibility checks). Pass the classification to each persona; they adapt their scrutiny to it.

**Upstream provenance.** If the document is a `plan` that derives from an upstream requirements doc it names (an `origin:`-style link, or a prose "from the requirements in X"), record that. Personas use it to suppress premise re-litigation — a plan whose what/why was settled upstream should be reviewed on its how, not sent back to first principles. A `design-doc` or a plan with no upstream requirements is greenfield: premise scrutiny applies fully.

## Phase 1b: Select conditional personas

`coherence` and `feasibility` are always-on. Add the others when the document's content warrants:

- **`product`** — the document stakes a challengeable claim about what to build or why (non-obvious problem framing, a solution among plausible alternatives, prioritization, predicted outcomes), or carries strategic weight. Suppress premise-level product findings on a plan with validated upstream provenance.
- **`design`** — UI/UX references, user flows, screens/components, interaction or accessibility descriptions.
- **`security`** — auth/authz, endpoints exposed to external clients, PII/payments/tokens/credentials, third-party trust boundaries.
- **`scope`** — multiple priority tiers, a large requirement/unit count (>8), stretch goals or "future work," or scope language misaligned with goals.
- **`adversarial`** — a requirements doc with 2+ challengeable claims; a high-stakes domain (auth, payments, migrations, privacy, external integrations, crypto) regardless of doc type; a new abstraction/framework/architectural pattern; a plan with no validated upstream provenance; or an explicit alternatives/tradeoffs section. Do not activate on a routine plan derived from validated upstream requirements that stays in scope and introduces no high-stakes domain.

## Phase 2: Announce and dispatch

Announce the persona team with a one-line reason for each conditional lens. Then dispatch one generic sub-agent per selected persona using `references/subagent-template.md` (bounded parallel — queue and fill freed slots; treat concurrency-limit errors as backpressure, not failure; omit the `mode` parameter so the user's permission settings apply). Each sub-agent reads its persona prompt from `references/personas/<name>.md`, applies it, and **returns its findings JSON inline** — there is no artifact file. Personas are read-only against the project: they analyze and return JSON, never edit. Pass each the document type, upstream provenance, the document content, and the decision primer (below).

**Decision primer (multi-round).** On round 1, the primer is empty. On round 2+ in the same session, accumulate every prior-round decision — Applied, Skipped, Deferred, Acknowledged — each with the finding's section, title, reviewer, and the first ~120 chars of its evidence quote. Pass it so personas avoid re-raising rejected findings and synthesis can verify prior fixes landed (`references/synthesis.md`, round-suppression rules). Skip/Defer/Acknowledge all count as rejected for suppression; Applied entries stay so the next round can confirm the fix landed. Cross-session persistence is out of scope — a fresh invocation starts at round 1.

## Phases 3-5: Synthesize, present, route

After the personas return, read `references/synthesis.md` for the synthesis pipeline (validate, confidence gate, dedup, cross-persona promotion, contradiction resolution, auto-promotion, premise-dependency chaining, route by tier, round-suppression) and how apply mode differs from propose-only. Then read `references/routing.md` for the four-option routing question, the per-finding walk-through, and the completion report (interactive), or the report envelope (non-interactive). Do not load these before dispatch completes.

## Severity, confidence, and the net-new overlay

Both axes come from `review-verification-protocol`; every finding must pass its gate-0 echo (quote the document line from a source read this turn):

- **Severity** — `Critical` / `Major` / `Minor` / `Informational`. Orders urgency; `Informational` never counts toward the actionable total.
- **Confidence** — a discrete anchor in `{0, 25, 50, 75, 100}`. `0`/`25` are suppressed (a persona never emits them); `50` is a verified-but-minor/advisory finding that surfaces as an **FYI observation** (no decision forced); `75`/`100` are actionable (they enter routing). Anchor `75`+ requires quoting the document line that makes the finding true.
- **Net-new → Informational.** A finding that asks for content or scope the document never set out to cover — a whole new section, a feature the document deliberately excluded, a net-new abstraction — is `Informational`, surfaced for awareness and excluded from the actionable count. Fixing or completing what the document already commits to is not net-new.

## What not to do

- Do not rewrite the whole document, add sections the author did not discuss, or over-engineer.
- Do not create separate review files or metadata sections in the document.
- Do not modify any caller skill that invoked this one.

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-doc-review orchestrator, retargeted to generic document shapes and inverted to propose-only.
