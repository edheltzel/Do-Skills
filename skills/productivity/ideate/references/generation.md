# Generation and critique — the engine

This is the mechanism that makes `ideate` worth running: **generate many →
critique all with reasons → keep only the survivors.** The quality control is
explicit rejection with a written reason, not optimistic ranking. Generate the
full candidate list *before* critiquing any idea.

The orchestrator runs this itself. The six frames below are lenses it generates
*through* in one pass, not agents to dispatch — the engine is agent-count
agnostic. (The only optional fan-out is the evidence scouts in
`references/modes.md`, and, at critique time, at most one optional fresh-context
verifier.)

## Generate many

Work through six frames. Each is a **starting bias, not a constraint** — begin
from its perspective, then follow any promising thread; cross-cutting ideas that
span frames are valuable. The same six apply in every mode, described in the
topic's native domain for non-software subjects.

1. **Pain and friction** — what is consistently slow, broken, or annoying for
   the user, operator, or topic.
2. **Inversion, removal, automation** — invert a painful step, remove it
   entirely, or automate it away. The result is a candidate even when the
   inversion itself is unrealistic.
3. **Assumption-breaking and reframing** — what is treated as fixed that is
   actually a choice; reframe one level up or sideways.
4. **Leverage and compounding** — choices that, once made, make many future
   moves cheaper or stronger; second-order effects.
5. **Cross-domain analogy** — how a completely different field solves a
   structurally analogous problem (other industries, biology, games,
   infrastructure, history). Push past the obvious analogy to non-obvious ones.
6. **Constraint-flipping** — invert the obvious constraint to its opposite or
   extreme (budget 10x or 0; team of 100 or 1; 1M users or none). Use the
   resulting design as a candidate even if the flip isn't realistic.

Aim for ~6-8 ideas per frame, ~36-48 raw. When an axis list exists, distribute
ideas across the axes rather than clustering on one, and tag each idea with the
axis it targets — a frame that plausibly reaches an axis should produce at least
one idea there before doubling up elsewhere.

**Ambition charter.** This ideation exists so the user can choose a direction
worth building — its value is decided by whether one idea changes what they do
next. Reach for the smartest, most inventive ideas each frame can find: ideas a
strong team would say "we have to do this" about. The first few per frame are the
obvious ones — treat them as warm-up and keep only the ones that still earn their
place once the non-obvious ideas exist. If an idea would appear in a generic
listicle about the topic, sharpen it with grounding evidence or drop it. Anchor
every idea in something specific from the grounding.

**Surprise-me mode.** With no user subject, use each frame's lens to explore the
grounding and pick the subject(s) most interesting through that lens. Different
frames finding different subjects is the feature. An idea's basis may include
identification of the subject itself — why *this* is worth ideating on, citing
what in the grounding signals it.

### Per-idea output contract

Every idea carries:

- **title**
- **summary** — 2-4 sentences.
- **axis** — the one axis it most centrally targets (omit when decomposition was
  skipped).
- **basis** (required, tagged) — one of:
  - `direct:` a quoted line, specific file, named issue, or explicit
    user-supplied context.
  - `external:` named prior art, domain research, or an adjacent pattern, with
    its source.
  - `reasoned:` an explicit first-principles argument, written out — not a
    gesture.
- **why it matters** — connects the basis to the move's significance.
- **meeting test** — one line confirming it would warrant team discussion
  (waived when the focus hint signals tactical scope: `polish`, `typos`,
  `quick wins`, `cleanup`).

**Basis is required, not optional.** An idea with no articulated basis of any
type does not surface. The failure mode this prevents is generic AI-slop ideas
that sound plausible but carry nothing the user can verify. Bias toward the
basis type a frame naturally produces (pain/inversion/leverage → `direct:`;
analogy/constraint-flipping → `reasoned:`) but don't exclude the others.

Stay within the subject's identity. Expansions, new surfaces, new markets, and
retirements are fair game when the basis supports them. Subject-replacement
moves — abandoning the project, pivoting to an unrelated domain — are out
regardless of basis. When the focus hint names one slice of a larger subject (a
flow, a section, a feature), ideate at full ambition *within that scope*;
widening to the whole product is a scope mismatch.

### After generating

1. Merge and dedupe into one master candidate list.
2. Synthesize cross-cutting combinations — scan for ideas from different frames
   that combine into something stronger (3-5 additions in specified mode; more in
   surprise-me, where this is the magic layer).
3. **Axis-coverage check** (when axes exist) — count ideas per axis. For any
   empty axis, generate a small batch (~3-5 ideas) targeting it with the
   best-fitting frame. Cap recovery at 2 axes; beyond that, accept thin coverage
   and note the gap. Re-dedupe after recovery.

## Critique all

Review every candidate critically before ranking. The orchestrator does this
itself. Optionally, under a `go deep` request or when the stakes justify it,
dispatch **one** fresh-context verifier — its payload is only the grounding
summary and the candidate list, none of the generation history — prompted to
refute: check that each `direct:` quote exists, each `external:` prior art is
real and analogous, each `reasoned:` argument holds, and each idea genuinely
passes the meeting test. Fresh context outperforms self-critique because the
orchestrator generated some of these and is anchored. Weigh its verdicts without
being bound by them.

Write a one-line reason for every rejected idea. Rejection criteria:

- too vague or not actionable
- duplicates a stronger idea
- not grounded in the stated context
- too expensive relative to likely value
- already covered by existing workflows or docs
- **unjustified** — no articulated basis, or the stated basis does not support
  the claimed move
- **basis refuted** — a cited quote is absent, prior art mischaracterized, or a
  reasoned argument unsound
- **below the ambition floor** — fails the meeting test (waived under tactical
  focus signals)
- **subject-replacement** — abandons or replaces the subject rather than
  operating on it
- **scope overrun** — expands beyond the asked scope (allowed only when the
  basis explicitly justifies it)

## Explain survivors

Score the survivors on a consistent rubric weighing: groundedness, **basis
strength** (`direct:` > `external:` > `reasoned:`, none excluded but
direct-evidence ideas score higher all else equal), expected value, novelty,
pragmatism, leverage on future work, implementation burden, overlap with
stronger ideas, and **axis spread** — a survivor set covering the surface
outscores one clustered on a single axis.

Axis spread is a list-level concern, not a per-idea reject reason: after per-idea
filtering, if coverage is uneven and stronger candidates exist on
under-represented axes, prefer the spread when promoting borderline candidates.
An axis that ends with zero survivors despite recovery is a deliberate,
noted gap — not a silent absence.

Target **5-7 survivors** by default (honor volume overrides like `top 3`). If too
many survive, run a second, stricter pass. If fewer than 5 survive, report that
honestly rather than lowering the bar.
