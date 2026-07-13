---
name: strategy
description: "Create or update STRATEGY.md — a short, durable product anchor (target problem, approach, persona, metrics, tracks) built through a pushback interview. Use when starting a product, changing direction or roadmap, or when spec, plan, or ideate need upstream product grounding."
user-invocable: true
argument-hint: "<product or direction, or a section to revisit>"
---

# Strategy

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

Produce and maintain `STRATEGY.md` — a short, durable anchor that captures what the product is, who it serves, how it succeeds, and where the team is investing. It lives at the repo root as a canonical, well-known file (a peer of `README.md`). When it exists, `spec`, `plan`, and `ideate` read it as grounding.

The document is short and structured on purpose. Good answers to a handful of sharp questions produce a better strategy than any amount of prose. This skill asks those questions, pushes back on weak answers, and writes the doc. Ask one question at a time, waiting for the answer before the next — a batch of questions is bewildering. Look up *facts* from the codebase; the *decisions* are the user's, so put each to them and wait.

## Principles

1. **Anchor, not plan.** Strategy is what the product is and why. Features and requirements belong in `spec`; schedules belong in the issue tracker. Do not let either creep into the doc.
2. **Rigor in the questions, not the headings.** The section headers are plain English; the interview questions enforce the discipline.
3. **Short is a feature.** The template is constrained. Adding sections costs more than it looks. Push back on expansion.
4. **Durable across runs.** Rerunnable: on a second run it updates in place, preserves what works, and only challenges sections that look stale or weak.

## Flow

### 1. Route by file state

Read `STRATEGY.md`.

- **No file** → first run; go to step 2. Announce: "No strategy doc — let's write it."
- **File exists, argument names a section** (`metrics`, `approach`, `tracks`…) → targeted update; go to step 3.
- **File exists, no argument** → ask which section(s) to revisit, then step 3. Announce: "Found an existing strategy — let's review and update."

### 2. First-run interview

Read [references/interview.md](references/interview.md) — its pushback rules, anti-pattern examples, and per-section quality bar are the skill; improvising from memory produces a passive transcription instead of a strategy. Run the interview in document order:

1. Target problem
2. Our approach
3. Who it's for
4. Key metrics
5. Tracks
6. Milestones (optional)
7. Not working on (optional)
8. Marketing (optional)

For each section, ask the opening question, apply the pushback rules, and capture the answer in the user's own language. Do not skip the pushback — it is the core. Two rounds of pushback per section maximum; after that, capture what the user gave and note the section is worth revisiting.

When sections 1–5 are captured, read [references/strategy-template.md](references/strategy-template.md), fill it in, present the full draft in chat, offer one edit round, then write `STRATEGY.md`.

### 3. Update run

Read the existing `STRATEGY.md` and summarize its current state in a few lines so the user sees what is on file. Jump to the target section in [references/interview.md](references/interview.md) and re-interview it with full pushback — do not rubber-stamp existing weak content because it is already written. Preserve every other section exactly. For sections the user confirms are still accurate, leave them untouched. Set `last_updated` in the frontmatter to today's ISO date and write the doc back.

### 4. Handoff

Note in one line where the file lives and that `spec`, `plan`, and `ideate` pick it up as grounding on their next run. If no downstream skill has run on this repo yet, suggest `ideate` (to generate directions) or `spec` (to capture the first slice) as a next step.

## What it does not do

- Does not touch the issue tracker or reconcile in-flight work — strategy is the doc; execution lives elsewhere.
- Does not prioritize the backlog.
- Does not write requirements or implementation plans — those are `spec` and `plan`.
- Does not compute metric values — it records which metrics matter and where they live, not what they read today.

## Why these sections

The "target problem / approach / tracks" structure follows Richard Rumelt's *Good Strategy Bad Strategy* — his kernel of diagnosis, guiding policy, and coherent action. The interview questions are built to push past what he calls "bad strategy": fluff, goals dressed up as strategy, and feature lists in place of a guiding choice.
