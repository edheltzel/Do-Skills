# Modes and grounding

`ideate` runs in one of four modes. The mode decides where grounding comes
from and how generation frames its subject — nothing else. Classify once, up
front, then ground accordingly.

## Subject-identification gate

Before classifying, check that the subject is identifiable. Every step
downstream needs to know what it is working on. A prompt that names or
plausibly names a specific feature, concept, document, flow, or topic is
identifiable — proceed. A prompt that refers only to a catch-all quality or
placeholder (`improvements`, `ideas`, `quick wins`, `bugs` alone, an empty
prompt) is vague.

Being inside a repo does not settle vagueness — `improvements` is still
scattered across DX, reliability, features, docs, tests, and architecture. On a
genuinely ambiguous short phrase, one cheap check settles it: glob the phrase in
filenames, or grep it in the README/docs. Any repo footprint → identifiable;
none and still vague → ask.

When you must ask, ask one question — "What should I ideate about?" — and always
keep **Surprise me** (let the agent pick the focus) on the menu as a real
option, not a fallback. Ideation is allowed to be greenfield by design. Never
ask about solution direction, constraints, audience, tone, or success criteria —
those belong to `grilling`. If more than one or two questions are needed to find
a subject, ideation is probably the wrong tool; suggest `grilling` instead.

## The four modes

**repo** — the subject is bounded by the current codebase: files, modules,
architecture, tests, workflows. The codebase supplies the substance.

**elsewhere-software** — the subject is a software artifact (product, app, page,
feature, flow, service) that lives outside this repo, even when the ideas
themselves are about copy, UX, pricing, or positioning *for* that product.
Grounding comes from user-supplied context plus web research.

**elsewhere-non-software** — the subject has no software surface at all: brand
naming, narrative writing, personal decisions, non-digital business strategy,
physical-product design. Grounding comes from user-supplied context plus web
research; institutional code-learnings are skipped (they don't transfer). Load
`references/generation.md` and generate in the topic's native domain — the six
frames still apply, described in domain-agnostic language.

**surprise-me** — the user delegated the focus. There is no settled subject:
discover subjects from the grounding material, letting different frames surface
different subjects (that divergence is the value). Route deterministically — a
git repo → repo grounding; otherwise elsewhere-software, and require at least one
piece of substance (URL, description, draft, paste) before generating, since
"surprise me" with neither subject nor repo has nothing to work from.

### Classifying a specified subject

Two binary calls:

1. **repo vs elsewhere** — repo when the prompt references repo files, code, or
   architecture, or the topic is clearly bounded by the codebase. Elsewhere when
   it names things absent from the repo (pricing, naming, narrative, brand,
   market positioning) or is creative, business, or personal with no code
   surface.
2. **software vs non-software** (only if elsewhere) — classify by whether the
   *subject* is a software artifact, not by where the ideas land. "Improve
   conversion on our sign-up page" → elsewhere-software (the subject is a page).
   "Name my new coffee shop" → elsewhere-non-software (a brand, no software
   surface).

State the inferred approach in one plain sentence ("Treating this as a topic in
this codebase — about X"), never the internal label. If the user disagrees they
will correct you.

## Grounding

Ground before generating — the quality of the ideas is capped by the quality of
the grounding. The orchestrator gathers this itself; it is not a fan-out.

**repo mode** — read the root agent-instruction file (`AGENTS.md`, `CLAUDE.md`)
and `README.md`, discover the top-level layout, and read `STRATEGY.md` if
present. Note the project shape, notable patterns, obvious pain points, and
likely leverage points. Keep it shallow — top-level docs and structure, not deep
code search. If the focus hint names a specific `*.md` file, read it in full and
treat it as a **constraint**; other root docs get a one-line gist as background.

**elsewhere modes** — synthesize the user-supplied context (description, brief,
draft, URL) into the same shape: topic shape, stated constraints, user-named
pain points, opportunity hooks. Web research (prior art, adjacent solutions,
cross-domain analogies) runs unless the user says "no external research." Skip
code-learnings in elsewhere-non-software.

**Optional parallel evidence scouts (repo mode).** The shallow scan is an
orientation gist — too thin to quote from. When depth is worth it, you may
dispatch one read-only scout per axis (see `references/decomposition.md`) to
gather verbatim quotes and `file:line` pointers into a short evidence note the
generation step cites from. This is the only fan-out `ideate` uses, and it is
optional — a single orchestrator reading targeted sections itself is a valid
substitute.

**Grounding is non-blocking.** If web research or any optional scout fails, warn
and proceed with what you have; note that grounding is thin so generation can
compensate with broader coverage.

Consolidate everything into one short grounding summary. That summary — plus any
evidence notes and the axis list — is what generation works from.
