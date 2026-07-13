---
name: pov
description: "Give a decisive, project-grounded verdict on an external input — adopt, switch, migrate, compare, or is-this-our-problem — judged against this project, not in the abstract. USE WHEN deciding whether to adopt or switch to a technology, library, pattern, platform, or architecture; comparing a candidate against what the project already uses; judging whether a CVE, deprecation, or ecosystem shift actually reaches this project; or for a mid-session second opinion. NOT FOR a neutral explainer or generating a field of options (use ideate), or stress-testing your own plan (use grilling)."
---

# Point of View

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

Return a decisive, **graded verdict** on something from the outside world — a library, pattern, platform, architecture, or an external change like a CVE or deprecation — judged against *this project*, not in the abstract. The subject is whatever this skill was invoked with, present in the prompt or conversation (whether the user asked directly or a calling skill — e.g. `grilling` — routed an adopt/switch/compare question here).

## The one rule that is the whole moat

**Do not issue a verdict you did not earn against the project's own context.** Generic research already covers "tell me about X"; the differentiator is the refusal to answer in the abstract. Every verdict must clear **two absolute, independent floors** (defined in [references/method.md](references/method.md)):

- a **project floor** — a concrete *verified* project fact: a named incumbent plus at least one touchpoint (`file:line`, dependency, issue, PR, doc passage), or the verified *absence* of an incumbent plus where a new one would fit, or a prior decision on the question;
- an **external floor** — at least one verified external source whose text supports the claim.

Strong external evidence never compensates for a thin project leg, and vice versa. Neither the conversation nor the user's own assertions substitute for grounding.

Ask the user a question only when framing is genuinely ambiguous, one at a time.

## Flow

### 1. Frame and classify

Orient cheaply on what you were given — fetch a bare link lightly to learn what it is, read a paste (orientation, not grounding) — then settle two things:

- **Subject and intent** — adopt / switch (migrate) / compare / is-this-our-problem / explainer. The same input supports very different verdicts, and guessing sends grounding after the wrong question. If the intent is ambiguous (a bare link or topic with no stated intent, or a warm second-opinion with no clear question), propose the concrete framings the input suggests and confirm before grounding. Do not guess and fan out.
- **Selection escape hatch** — if the input is a selection over a field ("what should we use for auth?"), it belongs here only when the realistic field is small (roughly five or fewer real candidates) and the criteria are knowable. If the field can't be bounded, **stop**: return a Hold and route to `ideate` to enumerate options, then offer to re-run.

Then classify the **reversibility tier**, which sizes the whole run:

- **Tier 1 — two-way door:** a dependency, lint rule, or config; trivially reversible. One-screen verdict off a single combined grounding pass.
- **Tier 2 — one-way but bounded:** a data store, internal API/contract, or a migration whose blast radius stays inside this codebase. Full grounding plus an alternatives pass.
- **Tier 3 — one-way and high-stakes:** a security, legal, or privacy surface; a public API/contract; or an irreversible migration. Deep external research, a precedent search, and a durable-record offer.

State the tier in the verdict and let the user override it. Do not run a Tier-3 workup on a trivial `npm i`, or hand a security decision the moderate Tier-2 treatment.

### 2. Ground

Gather the two legs. Search the code, git history, issue tracker, PRs, and docs for the project facts, and the web/official docs for the external evidence. Always check `docs/solutions/` and any ADRs for a prior stance on the question — a local adopt/reject decision is precedent that outranks fresh opinion.

Do the grounding yourself, and keep the results in separate buckets — *verified project facts* and *verified external facts* count toward the floors; conversation claims and assumptions do not until something corroborates them. Match the depth to the tier: Tier 1 needs 1-2 project + 1-2 external facts off a quick pass; Tier 2/3 warrants a wider search and, at Tier 3, two-source corroboration on every load-bearing external claim.

If a surface is unreachable (no web tools, no tracker access), record it and let it lower the verdict's stated confidence, or trip the matching floor — never silently proceed as if it were checked.

### 3. Verify against the two floors

Read [references/method.md](references/method.md), then apply the two-floor gate as a pass/fail checklist over your grounding. A failed floor forbids Adopt/Reject and returns the matching Hold subtype ("Hold — insufficient project grounding" with a numbered list of exactly what to inspect, or "Hold — external evidence unavailable"). Hold the skeptic stance: seek disconfirming evidence and keep "keep the incumbent" and "do nothing" as live alternatives.

### 4. Verdict

Emit the verdict contract from [references/method.md](references/method.md) — the grade vocabulary (Adopt / Trial / Hold / Reject / Not-our-problem), the schema fields, and the output economy. The verdict is a **compact chat block, not a research report**: lead with the call in plain words plus its label ("Hold — wait, don't switch now"), keep each field terse, cite evidence (`file:line`, PR#, url) rather than pasting it, and size the whole thing to the tier.

### 5. Follow-up

Compute the single best next move from the grade — not a fixed menu:

- **Adopt**, scope clear → `plan`.
- **Adopt**, scope still fuzzy → `grilling` or `ideate` to pin down what "adopt" means first.
- **Trial** → scope a timeboxed spike (`prototype` or `implement`).
- **Hold / Reject / Not-our-problem** → no handoff; nothing to take forward.

A full write-up and a durable `compound` capture of the decision are available **on request** only — the chat verdict is the default deliverable. A mid-session second opinion stays a guest: output the verdict, hand control back, and offer nothing further unless asked.
