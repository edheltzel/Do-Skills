---
name: improve-codebase-architecture
description: >-
  Scan a codebase for deepening opportunities — refactors that turn shallow modules into
  deep ones — and grill through whichever one the user picks. USE WHEN asked to find
  architectural friction, surface refactor candidates, review a codebase for testability or
  AI-navigability, or "where should we deepen this". NOT FOR the deep-module vocabulary
  itself (use codebase-design) or a structural review of a specific diff (use
  review-structure). User-invoked.
---

# Improve Codebase Architecture

Surface architectural friction and propose **deepening opportunities** — refactors that turn shallow modules into deep ones. The aim is testability and AI-navigability.

This skill is _informed_ by the project's domain model and built on a shared design vocabulary:

- Use the codebase-design skill for the architecture vocabulary (**module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**) and its principles (the deletion test, "the interface is the test surface", "one adapter = hypothetical seam, two = real"). Use these terms exactly in every suggestion — don't drift into "component," "service," "API," or "boundary."
- The domain language in `CONTEXT.md` gives names to good seams; ADRs in `docs/adr/` record decisions this skill should not re-litigate. Both are maintained by the domain-modeling skill.

## Process

### 1. Explore

Read the project's domain glossary (`CONTEXT.md`) and any ADRs in the area you're touching first.

Then use the Agent tool with `subagent_type=Explore` to walk the codebase. Don't follow rigid heuristics — explore organically and note where you experience friction:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where have pure functions been extracted just for testability, but the real bugs hide in how they're called (no **locality**)?
- Where do tightly-coupled modules leak across their seams?
- Which parts of the codebase are untested, or hard to test through their current interface?

Apply the **deletion test** to anything you suspect is shallow: would deleting it concentrate complexity, or just move it? A "yes, concentrates" is the signal you want.

### 2. Present the candidates

For each candidate, present:

- **Files** — which files/modules are involved
- **Problem** — why the current architecture is causing friction
- **Solution** — plain English description of what would change
- **Benefits** — explained in terms of locality and leverage, and how tests would improve
- **Before / After** — how the shallowness collapses into a deep module
- **Recommendation strength** — one of `Strong`, `Worth exploring`, `Speculative`

End with a **Top recommendation**: which candidate you'd tackle first and why.

**Use exactly:** module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality. **Never substitute:** component, service, unit; API, signature; boundary; layer, wrapper. Use `CONTEXT.md` vocabulary for the domain — if `CONTEXT.md` defines "Order," talk about "the Order intake module," not "the FooBarHandler" and not "the Order service."

**ADR conflicts**: if a candidate contradicts an existing ADR, only surface it when the friction is real enough to warrant revisiting the ADR. Mark it clearly (e.g. _"contradicts ADR-0007 — but worth reopening because…"_). Don't list every theoretical refactor an ADR forbids.

**Optional visual report.** A plain candidate list (above) is the default. When the user wants something more legible, render the candidates as a self-contained HTML report — before/after diagrams per candidate, written to the OS temp dir so nothing lands in the repo. See [references/HTML-REPORT.md](references/HTML-REPORT.md) for the Tailwind + Mermaid scaffold, diagram patterns, and styling. Skip it entirely when the plain list is enough — the report is a presentation nicety, not part of the analysis.

Do NOT propose interfaces yet. After presenting, ask the user: "Which of these would you like to explore?"

### 3. Grilling loop

Once the user picks a candidate, run the grilling skill to walk the design tree with them — constraints, dependencies, the shape of the deepened module, what sits behind the seam, what tests survive.

Side effects happen inline as decisions crystallize — run the domain-modeling skill to keep the domain model current as you go:

- **Naming a deepened module after a concept not in `CONTEXT.md`?** Add the term to `CONTEXT.md`. Create the file lazily if it doesn't exist.
- **Sharpening a fuzzy term during the conversation?** Update `CONTEXT.md` right there.
- **User rejects the candidate with a load-bearing reason?** Offer an ADR, framed as: _"Want me to record this as an ADR so future architecture reviews don't re-suggest it?"_ Only offer when the reason would actually be needed by a future explorer to avoid re-suggesting the same thing — skip ephemeral reasons ("not worth it right now") and self-evident ones.
- **Want to explore alternative interfaces for the deepened module?** Use the codebase-design skill's design-it-twice parallel sub-agent pattern.

Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
