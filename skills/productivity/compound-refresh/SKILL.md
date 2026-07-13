---
name: compound-refresh
description: "Audit docs/solutions/ learnings against the current codebase and keep the library trustworthy — per-doc Keep / Update / Consolidate / Replace / Delete verdicts plus document-set analysis across the whole library. USE WHEN auditing stale, overlapping, superseded, or drifted learnings, or sweeping docs/solutions/ as the code moves under it. NOT FOR capturing a freshly solved problem (use compound), general refactor / debug / code review unless docs/solutions/ is the explicit target, or editing domain vocabulary (use domain-modeling)."
---

# Compound Refresh

Maintain the quality of `docs/solutions/` over time. Review existing learnings against the *current* codebase, then refresh any derived pattern docs that depend on them.

*Imported/adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).*

`compound` writes a newly solved problem into `docs/solutions/`. `compound-refresh` is its maintenance sibling: it audits those learnings as the code evolves — both each doc's individual accuracy and the collective design of the document set.

## Maintenance model

For each candidate doc, assign exactly one outcome:

| Outcome | Meaning | Action |
|---------|---------|--------|
| **Keep** | Still accurate and useful | No file edit — report it was reviewed and remains trustworthy |
| **Update** | Solution still correct, references drifted | Evidence-backed in-place edits (paths, class names, links, snippets, metadata) |
| **Consolidate** | Two+ docs overlap heavily but are both correct | Merge unique content into the canonical doc, delete the subsumed doc |
| **Replace** | Old guidance is now misleading, and a better successor is knowable | Write a trustworthy successor, then delete the old doc |
| **Delete** | No longer useful, applicable, or distinct | Delete the file — git history is the archive |

When a verdict is genuinely ambiguous (Update vs Replace vs Consolidate vs Delete, or Replace with thin evidence) and a human is reachable, ask. Otherwise **mark the doc stale in place** — add `status: stale`, `stale_reason: [what you found]`, `stale_date: YYYY-MM-DD` to the frontmatter — and record it in the report. Err toward stale-marking over a wrong action.

## Core rules

1. **Evidence informs judgment.** The signals are inputs, not a scorecard. Decide with engineering judgment whether the doc is still trustworthy.
2. **Prefer no-write Keep.** Never edit a doc just to leave a review breadcrumb.
3. **Match docs to reality, not the reverse.** When current code differs from a learning, update the learning to match the code. This skill's job is doc accuracy, not code review — don't ask whether a code change was "intentional" or "a regression." That's a separate concern.
4. **Be decisive, minimize questions.** When evidence is clear (file renamed, class moved, reference broken), apply the fix. Ask only on genuine ambiguity; otherwise mark stale.
5. **Avoid low-value churn.** Don't Update for a typo, wording polish, or cosmetic change that doesn't materially improve accuracy or usability.
6. **Replace needs a real replacement** — a verified fix in this session, concrete replacement context from the user, a codebase investigation that documents the current approach, or strong successor evidence from newer docs/PRs/issues.
7. **Delete only when the code is gone and no successor exists** — and only after the inbound-link check (see per-action-flows). When torn between Keep and Delete, ask or mark stale.
8. **Evaluate document-set design, not just accuracy.** Whether each doc is still the right *unit of knowledge* matters as much as whether it's correct. Redundant docs are dangerous — two docs saying the same thing will eventually say different things.
9. **Delete, don't archive.** There is no `_archived/` directory. Git history preserves every deleted file (`git log --diff-filter=D -- docs/solutions/`). If an `_archived/` directory exists, flag it in the report as legacy to clean up.

## Scope

Find all `.md` files under `docs/solutions/`, excluding `README.md` and anything under `_archived/`.

If the user gave a scope hint, narrow with the first strategy that matches: a subdirectory name under `docs/solutions/`; a `module`/`component`/`tags` frontmatter field; a filename (partial is fine); a content keyword. If a hint matched nothing, report the miss and stop — don't silently widen to everything. If no candidate docs exist at all:

```text
No candidate docs found in docs/solutions/.
Run `compound` after solving problems to start building your knowledge base.
```

**Route by size** — pick the lightest path that fits. 1–2 named docs: investigate directly, then recommend. Up to ~8 mostly independent docs: investigate all, then present grouped recommendations. 9+ / ambiguous / repo-wide sweep: triage first (inventory frontmatter, cluster by module, spot-check whether primary referenced files still exist, start with the densest high-impact cluster), then investigate in batches. Gather evidence before asking any action question.

## Orchestration

A single orchestrator runs the whole refresh. It may use read-only investigation subagents for context isolation when artifacts are independent (3+ truly independent docs), but it performs **all** writes — edits, consolidations, deletions, stale-marking, and coordinating any Replace — centrally. Investigation subagents return file path, evidence, recommended action, confidence, and open questions; they never edit, create, or delete. Overlapping docs are investigated together, not parallelized apart.

## Investigate learnings

Refresh in order: individual learning docs first (they are the primary evidence), then pattern docs under `docs/solutions/patterns/` (derived from learnings — a stale learning can make a pattern look more valid than it is). If the user names a pattern doc first, start there to understand the concern but inspect its supporting learnings before changing it.

For each learning, read it and cross-reference its claims against the current code. A learning goes stale along several independent dimensions:

- **References** — do the file paths, class names, and modules still exist, or have they moved?
- **Recommended solution** — does the fix still match how the code actually works? A renamed file with a different implementation pattern is not just a path update.
- **Code examples** — do embedded snippets still reflect the implementation?
- **Related docs** — are cross-referenced learnings and patterns still present and consistent?
- **Overlap** — note when another in-scope doc covers the same problem domain, files, or solution. Record the two paths, which dimensions overlap, and which doc looks broader or more current. These feed document-set analysis.
- **Vocabulary** — note domain terms the learning leans on (entities, named processes, project-specific status concepts). Collect them centrally to hand off; **do not** define or edit vocabulary here — that is `domain-modeling`'s job (see Vocabulary handoff).

Match depth to specificity: a learning citing exact paths and snippets needs more verification than one stating a general principle.

**Update vs Replace — the boundary.** Cosmetic drift (references moved, links broke, metadata stale, but the core approach still matches the code) is **Update** — fix it directly. Substantive drift (the recommended solution conflicts with current code, the architecture shifted, the pattern is no longer preferred) is **Replace** — a new successor must be written. If you find yourself rewriting the solution section, stop: that's Replace, not Update.

Three judgment traps: a recommendation that **contradicts** current code is actively misleading — strong Replace signal, not minor drift. **Age alone is not stale** — a 2-year-old learning that still matches code is fine; age only prompts a closer look. **Check for successors before deleting** — newer learnings, patterns, PRs, or issues covering the same space favor Replace over Delete so readers land on current guidance.

Pattern docs are higher-leverage: a stale pattern is more dangerous than a stale learning because future work treats it as broad guidance. A pattern doc with no clear supporting learnings is itself a stale signal.

## Document-set analysis

After investigating individual docs, step back and evaluate the set as a whole — this catches problems visible only when comparing docs to *each other*, not just to reality. Read [references/document-set-analysis.md](references/document-set-analysis.md) for the full rubric; the five moves are:

1. **Overlap detection** — for docs sharing a module/tags/problem domain, compare problem, solution shape, referenced files, prevention rules, and root cause. High overlap across 3+ dimensions is a strong Consolidate signal.
2. **Supersession** — spot "older narrow precursor, newer canonical doc" pairs where the newer doc subsumes the older's files, workflow, and scope.
3. **Canonical-doc selection** — for each topic cluster, name the one source of truth (usually the most recent, broadest, most accurate) that others should point to, not duplicate.
4. **Retrieval-value test** — before keeping two docs separate, ask: "six months from now, would separate docs improve discoverability, or just create drift risk?" They earn separation only for genuinely different sub-problems, different audiences/contexts, or when merging would harm navigation. Otherwise consolidate.
5. **Cross-doc conflict** — flag outright contradictions (A says "always X", B says "avoid X"; A cites a path B calls deprecated; A and B blame different root causes for the same problem). Contradictions are more urgent than individual staleness — they actively confuse readers.

## Execute

Assign each candidate one action, then run the matching flow. Read [references/per-action-flows.md](references/per-action-flows.md) and follow the single section that matches:

- **Keep** — no edit; summarize why it stays trustworthy.
- **Update** — in-place edits for drifted references only.
- **Consolidate** — merge unique content into the canonical doc, update cross-references, delete the subsumed doc.
- **Replace** — write a successor following `compound`'s document format (frontmatter + problem / root cause / solution / prevention), run the parser-safety and cited-claims checks, then delete the old. When evidence is insufficient, mark stale instead.
- **Delete** — final inbound-link check across the repo's markdown, then remove. Reclassify if a substantive citation surfaces late.

Apply the same five outcomes to pattern docs, judged as **derived guidance**: Keep if the underlying learnings still support the rule and examples stay representative; Update if the rule holds but examples/links/scope drifted; Consolidate two patterns generalizing the same learnings; Replace when the generalized rule is now misleading (base the rewrite on the refreshed learning set, not guesswork); Delete when the pattern no longer recurs or is fully subsumed.

## Vocabulary handoff

While investigating, you will surface domain terms the learnings depend on. **Do not** define, create, or edit any vocabulary file — atlas keeps its ubiquitous language in `domain-modeling`'s `CONTEXT.md` glossary and its decisions in `docs/adr/`. Collect the terms centrally and, in the report, hand them to `domain-modeling` by name: list the terms worth pinning down and note that `domain-modeling` owns adding or refining them. This skill audits learnings; it does not own the glossary.

## Report

The report is the primary deliverable — print it in full as markdown, never collapse it to a one-liner. Lead with a summary:

```text
Compound Refresh Summary
========================
Scanned: N learnings

Kept: X   Updated: Y   Consolidated: C   Replaced: Z   Deleted: W
Marked stale: S   Skipped: V
```

Then, for every file processed, list its path, classification (Keep / Update / Consolidate / Replace / Delete / Stale), the evidence found, and the action taken or recommended. For Consolidate, name the canonical doc, the unique content merged, and what was deleted. Group **Keep** outcomes under a reviewed-without-edits section so they're visible without git churn. If a write was blocked (e.g. read-only), record the action as a recommendation with enough context to apply by hand.

Close the report with two standing notes when they apply:

- **Vocabulary handoff** — the domain terms surfaced this run, handed to `domain-modeling`.
- **Discoverability** — if the root `AGENTS.md` / `CLAUDE.md` wouldn't lead an agent to discover `docs/solutions/`, add a single line: "Consider mentioning `docs/solutions/` in AGENTS.md so agents discover the knowledge store." Never edit the instruction files yourself — this is a report suggestion only.

## Commit

If any files changed, commit the refresh separately from unrelated work, staging only the docs this skill touched. Follow the repo's existing commit conventions and the atlas git workflow (feature branch → PR; never commit straight to the default branch) — see `git:worktree` and `task-to-pr`. A descriptive message summarizes what was refreshed ("update 3 stale learnings, consolidate 2 overlapping docs, delete 1 obsolete doc"); the details live in the changed files. Skip this step entirely if nothing was modified.
