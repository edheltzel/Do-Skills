# Red Team Integration Guide

## Skill Integration Order

**Use BEFORE RedTeam:**
- `research` - Gather context, find precedents

**Use DURING RedTeam:**
- `storyexplanation` - Decomposition methodology
- Custom agents (inline briefs launched with `general-purpose`) - Parallel assault

**Use AFTER RedTeam:**
- `extractalpha` - Highest-signal critiques
- `xpost` - Share findings

## do-first-principles Integration

RedTeam deeply integrates with do-first-principles skill:

- **Phase 1 Enhancement:** Use `do-first-principles/Deconstruct` to break arguments into fundamental parts
- **Phase 5 Enhancement:** Use `do-first-principles/Challenge` to classify constraints as hard/soft/assumption
- **Core Insight:** The most devastating critiques come from challenging hidden assumptions
- **Invocation:** "Use do-first-principles/Challenge on the stated constraints before parallel analysis"

## Output Format

- **Format:** Steelman + Counter-argument, each with 8 numbered points
- **Length:** 12-16 words per point (strict discipline)
- **Tone:** Direct, substantive, non-performative
- **Must Include:** First-principles analysis, convergence identification
- **Must Avoid:** Nitpicking, strawmanning, generic objections

---

**Last Updated:** 2025-12-20
