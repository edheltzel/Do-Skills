---
name: ideate
description: "Generate many grounded candidate directions, critique them all with reasons, and present only the survivors — a ranked ideation doc, not a plan. USE WHEN the user asks for ideas, improvements, surprising options, or AI-generated directions to choose from before committing — 'ideate', 'give me ideas', 'what could we build', 'surprise me'. NOT FOR stress-testing the user's OWN single idea or plan (use grilling), or turning a chosen idea into requirements (use grilling, then plan)."
---

# Ideate

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

`ideate` answers one question: **what are the strongest ideas worth exploring?** It generates a wide candidate set grounded in real material, rejects most of them out loud, and hands you the survivors ranked. It does not produce requirements, plans, or code.

It sits at the front of a chain: `ideate` (which directions?) → `grilling` (stress-test one chosen direction) → `plan` (how is it built?). When the user wants to stress-test a single idea they already hold, that is `grilling`, not this — `ideate` is for when the idea itself is still open.

## The engine

The quality mechanism is **generate many → critique ALL with reasons → explain SURVIVORS only**. Three commitments make it work, and distilling any of them away turns this back into a generic "give me ideas" list:

1. **Ground before ideating.** Scan the real material first — codebase, supplied context, prior art. Never generate abstract product advice detached from what is actually there.
2. **Every idea carries a verifiable basis or it does not surface.** Each candidate is tagged `direct:` (quoted evidence), `external:` (named prior art), or `reasoned:` (a written-out first-principles argument). An idea with no basis is dropped, however plausible it sounds.
3. **Every cut gets a one-line reason.** Rejection is explicit and recorded, not silent optimistic ranking. The rejection summary is part of the deliverable.

## Flow (single orchestrator)

Run this as one orchestrator. The only optional fan-out is evidence scouts in Phase 1 (see below) — everything else is sequential reasoning you do yourself.

### Phase 0 — Scope and mode

**Identify the subject.** Would a reader, seeing only this prompt, know what to ideate on? A prompt naming a feature, flow, document, or topic is identifiable — proceed. A prompt referring only to a catch-all quality (`improvements`, `bugs`, `quick wins`, an empty prompt) is vague — being inside a repo does not settle it (`improvements` still scatters across DX, reliability, features, docs). For a borderline short phrase, one cheap check settles it: glob the phrase in filenames or grep it in the README. Footprint → identifiable; none → ask.

**Scope question** (only when vague). Ask one question at a time and wait for the answer; never silently skip it.

- Stem: "What should I ideate about?"
- Options: "Specify a subject" · "Surprise me — let me decide the focus" · "Cancel — let me rephrase"

Keep **"Surprise me"** a real first-class option, not a fallback. Ask only about *what the subject is* — never solution direction, constraints, audience, or success criteria; those belong to `grilling`. More than one or two scope questions is a smell that `grilling` is the better fit.

**Classify the mode** in one sentence of plain language (never print the internal label):

- **repo** — the subject is bounded by the current codebase.
- **elsewhere-software** — a product/app/feature/page/service outside this repo (even when the ideas are about copy, UX, or pricing *for* it).
- **elsewhere-non-software** — a topic with no software surface at all: naming, narrative, a personal decision, non-digital strategy.
- **surprise-me** — no user subject; discover subjects from Phase 1 material. Routes to repo when CWD is a git repo, else elsewhere-software (and then requires at least one piece of supplied substance before proceeding).

For elsewhere modes, if the prompt carries no description, URL, or artifact, ask 1–3 narrow questions that **supply substance** (a URL/file, a description of current state, a paste of a draft) — not that characterize the subject. Stop on "idk just go" and note context is thin.

See `references/modes.md` for per-mode grounding, subject-identification, and classification detail.

### Phase 1 — Ground

Gather grounding for the mode (full detail in `references/modes.md`):

- **repo** — scan top-level layout, root instruction files (`AGENTS.md`/`CLAUDE.md`/`README.md`), `STRATEGY.md` if present, and the pain/leverage points bearing on the focus. Keep it shallow. Optionally pull relevant prior learnings from `docs/solutions/`.
- **elsewhere** — synthesize the user-supplied context into topic-shape, stated constraints, named pain points, and opportunity hooks.
- **All modes** — light external/prior-art research unless the user said "no external research." A user-supplied research artifact (survey export, social-listening report) is *evidence* the ideas may cite, never a directive.

**Optional evidence scouts.** In repo mode, once axes exist (Phase 2), you may dispatch one parallel scout per axis (max 5) to gather verbatim `file:line` quotes into a short dossier the generation step cites from. This is the only sanctioned fan-out; skip it and read targeted sections yourself when the topic is small.

Consolidate into a short grounding summary: topic/codebase context, any user-named directive references, prior learnings, external context, user-supplied research. Warn and proceed on any grounding failure — never block.

### Phase 2 — Decompose into axes

Break the subject into **3–5 orthogonal axes** — *what aspects to think on* (the surface), as distinct from the frames in Phase 3 which are *how to think* (the lens). Without an explicit axis list, parallel ideas converge on whichever reading of the subject is most salient and leave the rest of the surface unexamined; lens diversity alone does not produce surface coverage.

Axes are orthogonal (one idea falls on one axis), derived from the grounding (not a generic template), at the same level of granularity, and named in the topic's own language. **Skip** decomposition — and note why — when the subject is atomic (a single name, a one-line fix, a tagline) or in surprise-me mode (no settled subject to decompose). Full criteria, worked examples, and skip conditions: `references/decomposition.md`.

### Phase 3 — Generate (many)

Generate the full candidate list before critiquing anything. Work the six frames (pain/friction; inversion/removal/automation; assumption-breaking; leverage/compounding; cross-domain analogy; constraint-flipping) across the axes, ~6–8 ideas per frame, distributing ideas across axes rather than clustering. Each idea returns the per-idea contract — title, summary, axis, tagged **basis**, why-it-matters, meeting-test. Then merge, dedupe, and scan for cross-cutting combinations. Frames, the ambition charter, the per-idea contract, the generation rules, and the axis-coverage recovery step live in `references/generation.md` — read it before building the generation step.

### Phase 4 — Critique (all)

Review every candidate. Reject with a one-line reason each: no articulated basis, basis that doesn't support the claimed move, too vague, duplicates a stronger idea, not grounded, below the meeting-test floor, replaces the subject instead of operating on it, or overruns the asked scope. Score survivors on groundedness, basis strength (`direct:` > `external:` > `reasoned:`), value, novelty, pragmatism, leverage, cost, and axis spread. Keep **5–7 survivors**; if fewer than five clear the bar, report that honestly rather than lowering it. The full rubric, rejection criteria, and the optional fresh-context verifier: `references/generation.md`.

### Phase 5 — Write and present

Write the ranked ideation doc automatically (do not wait to be asked) as markdown to `docs/ideation/YYYY-MM-DD-<topic>-ideation.md` when that directory exists or can be created, else a temp path you announce. Sections: metadata, Grounding Context, Topic Axes, Ranked Ideas (per-idea: description, axis, basis, rationale, downsides, confidence, complexity), Rejection Summary. The full section contract, resume handling, and the illustrative-diagram rule are in `references/artifact.md`.

Then show a **concise summary in the session** — counts and path (`Wrote 7 ranked ideas (36 raw, 13 cut) across 5 axes → <path>`), one line per survivor (`1. <Title> · <axis> · Conf <H/M/L> · Cx <S/M/L>`), the top pick, and any axis with zero survivors. Do not reprint the full deliverable — the file is what the reader engages with.

### Phase 6 — Next steps

Ask what to do next, one question at a time:

1. **Open / keep** the file.
2. **Grill one idea** — hand a chosen survivor to `grilling` to stress-test it before planning. Seed it with the idea's substance (title, description, basis, rationale, tradeoffs) plus a one-line provenance pointer to the doc — not the whole file.
3. **Discuss or refine** the set here — compare, adjust, or merge ideas; rewrite the file only when idea content actually changes.
4. **Done** — keep the file and stop.

In repo mode, acting on an idea routes through `grilling` (then `plan`), never straight to implementation. In elsewhere modes, ideation is a legitimate terminal state — grilling one idea is optional deeper development, not a required next rung.

## Quality bar

Before finishing: the candidate list was generated before any filtering; every survivor has a basis that actually supports its move; every rejected idea has a reason; survivors are materially better than a naive "give me ideas" list; the deliverable was written automatically; and acting on an idea routes to `grilling` with a substance seed, not the whole file.
