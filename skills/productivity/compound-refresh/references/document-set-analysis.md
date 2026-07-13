# Document-set analysis

Run this after investigating individual docs. Its job is to catch problems that only appear when comparing docs to *each other*, not just to the codebase. Accuracy asks "is this doc true?"; document-set analysis asks "is this still the right doc, and is it the only one saying this?"

## Overlap detection

For docs that share a module, component, tags, or problem domain, compare across five dimensions:

- **Problem statement** — do they describe the same underlying problem?
- **Solution shape** — do they recommend the same approach, even if worded differently?
- **Referenced files** — do they point at the same code paths?
- **Prevention rules** — do they repeat the same prevention bullets?
- **Root cause** — do they identify the same root cause?

High overlap across 3+ dimensions is a strong Consolidate signal. The question to settle it: "Would a future maintainer need to read both docs to get the current truth, or is one mostly repeating the other?"

## Supersession signals

Detect "older narrow precursor, newer canonical doc" pairs:

- A newer doc covers the same files and workflow plus broader runtime behavior than an older one.
- An older doc describes a specific incident that a newer doc generalizes into a pattern.
- Two docs recommend the same fix but the newer one has better context, examples, or scope.

When a newer doc clearly subsumes an older one, the older doc is a consolidation candidate — merge its unique content (if any) into the newer doc, then delete the older.

## Canonical-doc selection

For each topic cluster (docs sharing a problem domain), name the **canonical source of truth**: usually the most recent, broadest, most accurate doc — the one a maintainer should find first, that others should point to rather than duplicate. Every other doc in the cluster is then one of:

- **Distinct** — covers a meaningfully different sub-problem with independent retrieval value. Keep separate.
- **Subsumed** — its unique content fits as a section in the canonical doc. Consolidate.
- **Redundant** — adds nothing the canonical doc doesn't already say. Delete.

## Retrieval-value test

Before recommending two docs stay separate, apply: "If a maintainer searched for this topic six months from now, would separate docs improve discoverability, or just create drift risk?"

Separate docs earn their keep **only** when:

- they cover genuinely different sub-problems someone might search for independently, or
- they target different audiences or contexts (one about debugging, another about prevention), or
- merging would create an unwieldy doc harder to navigate than two focused ones.

If none apply, prefer consolidation. Two docs covering the same ground will eventually drift apart and contradict each other — worse than one slightly longer doc.

## Cross-doc conflict check

Look for outright contradictions between in-scope docs:

- Doc A says "always use approach X" while Doc B says "avoid approach X".
- Doc A references a path that Doc B says was deprecated.
- Doc A and Doc B describe different root causes for what looks like the same problem.

Contradictions are more urgent than individual staleness — they actively confuse readers. Resolve immediately, through Consolidate (if one is a stale version of the other's truth) or a targeted Update / Replace.
