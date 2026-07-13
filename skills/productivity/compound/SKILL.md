---
name: compound
description: "Capture a just-solved problem or hard-won practice as a searchable doc in docs/solutions/, so the next occurrence takes minutes instead of research. USE WHEN a problem was just fixed and verified ('that worked', 'it's fixed', 'working now'), or a durable practice/pattern/decision emerged from the work and is worth keeping. NOT FOR auditing or pruning the existing library (use compound-refresh), recording an architectural decision (use domain-modeling's ADR flow), or writing user-facing docs."
---

# Compound

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

Capture a solved problem while context is fresh, as a structured doc in `docs/solutions/<category>/<slug>.md` with YAML frontmatter for searchability. The first time a problem is solved takes research; documented, the next occurrence takes minutes. Each unit of work should make subsequent work easier — that is the compounding.

**One learning per run.** Grounding, overlap detection, and cross-referencing all assume a single solved problem. When a session produced several distinct learnings, run once per learning, sequentially — never batch and stitch cross-references between drafts (drafting-context numbering like "Learning 3" leaking into written docs is the failure this prevents).

**Preconditions** (advisory): the problem is solved — not in progress; the solution is verified working; and it is non-trivial — a typo fix compounds nothing.

## Workflow

Run as a single orchestrator, in order:

### 1. Extract

From the conversation, identify: the problem (exact error messages, observable behavior), what was tried that didn't work and why, the root cause, the working fix with code, and how to prevent recurrence.

Two grounding rules apply from the start:

- **Ground code-behavior claims in source, not conversation memory.** Before asserting how code behaves (enum values, limits, defaults, semantics), read the defining line in the current tree and cite `file:line`. A claim that cannot be verified against the tree is softened or attributed ("per this session's conclusion…"), never stated as fact.
- **Write merge-state claims for time.** Cite PR numbers, not bare commit SHAs — SHAs are rewritten by rebase and squash merges. A "fixed in X" claim requires the fix to be reachable from the current tree; otherwise phrase it as pending ("fix opened in #1608, unmerged as of this writing").

### 2. Classify

Read [references/schema.md](references/schema.md). Determine the **track** from the problem type — **bug** (a defect diagnosed and fixed) or **knowledge** (a practice, pattern, convention, or decision) — then the category directory and a filename: `<sanitized-problem-slug>.md`, no date suffix (the `date:` frontmatter field is the canonical creation date).

### 3. Check overlap

Search `docs/solutions/` for related docs before writing. Grep-first: extract keywords (module names, error strings, technical terms), search frontmatter fields (`title:`, `tags:`, `module:`), read only the frontmatter of candidates, fully read only strong matches. Then assess overlap with the doc you are about to write across **five dimensions**: problem statement, root cause, solution approach, referenced files, prevention rules.

| Overlap | Dimensions matching | Action |
|---------|--------------------|--------|
| **High** | 4–5 | **Update the existing doc** — fresher examples, updated references, added prevention. Keep its path and structure; add `last_updated: YYYY-MM-DD`. Two docs describing the same problem inevitably drift apart. |
| **Moderate** | 2–3 | Create the new doc; note the overlap as a consolidation candidate for `compound-refresh`. |
| **Low** | 0–1 | Create the new doc normally. |

### 4. Write

Assemble the doc from the track template in [references/templates.md](references/templates.md), frontmatter per [references/schema.md](references/schema.md) (including its YAML-safety quoting rules). `mkdir -p docs/solutions/<category>/` if needed. This is the one deliverable — the workflow writes no other tracked file.

### 5. Validate grounding

The doc is about to become permanent, trusted knowledge — future agents will act on its claims without re-verifying. Run the checks in [references/grounding.md](references/grounding.md): cited paths exist (or are marked historical), no bare SHAs where a PR number belongs, no drafting scaffold ("Learning 3", `{{…}}`), relative links resolve, and code-behavior claims match the defining source. Every flag is adjudicated — fix, annotate as historical, or confirm intentional — never auto-rewritten and never silently passed.

### 6. Hand off vocabulary

If the work pinned down **resolved** domain terms — entities, named processes, or status concepts with project-specific meaning whose definition is now settled, not still under discussion — hand them to `domain-modeling`, which owns the project glossary and decision records. Do not create or maintain a separate vocabulary file here. File paths, class names, and function signatures are not domain terms.

### 7. Report

End with a short summary: file written (created or updated), track, category, overlap outcome, grounding outcome, and — when warranted — a refresh recommendation (below). If the project's instruction files (AGENTS.md/CLAUDE.md) would not lead an agent to discover `docs/solutions/`, add one line: "consider mentioning docs/solutions/ in AGENTS.md." **Never edit instruction files from this skill** — that is the repo owner's call, made through their docs-maintenance discipline.

## Recommend a refresh — selectively

`compound-refresh` is not a default follow-up. Recommend it, with the narrowest useful scope hint (a specific file, module, or category), when the new learning is evidence that older docs drifted: the fix contradicts documented guidance, clearly supersedes an older solution, a refactor/rename/upgrade likely invalidated references, or step 3 found moderate overlap worth consolidating. Skip it when nothing related was found or related docs still hold. Always capture the new learning first — refresh is maintenance, not a prerequisite.
