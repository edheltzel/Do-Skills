# Per-action flows

Read this when executing a verdict. Find the section matching the action and follow that flow. Only one flow runs per candidate.

## Keep

No file edit by default. Summarize why the learning remains trustworthy. Add `last_refreshed` only if you are already making a meaningful edit for another reason — never to leave a review breadcrumb.

## Update

In-place edits only when the solution is still substantively correct. Valid updates:

- Rename a moved reference (`app/models/auth_token.rb` → `app/models/session_token.rb`).
- Fix a drifted `module`/`component` value or a broken link to a related doc.
- Refresh implementation notes after a directory move.

Not an Update — these are **Replace**: the old fix is now an anti-pattern, the architecture changed enough that the guidance misleads, or the troubleshooting path is materially different. Also not worth an edit: typo fixes, wording-only rewrites, cosmetic cleanup that doesn't materially improve accuracy.

## Consolidate

The orchestrator handles this directly — the docs are already read and the merge is a focused edit. Per topic cluster:

1. **Confirm the canonical doc** — the broader, more current, more accurate doc in the cluster.
2. **Extract unique content** from the subsumed doc(s) — edge cases, extra prevention rules, alternative approaches the canonical doc doesn't cover.
3. **Merge it in a natural location** — integrate where it logically belongs, don't just append. Inline a small addition; add a labeled section for a substantial sub-topic.
4. **Update cross-references** — repoint any docs that cited the subsumed doc to the canonical doc.
5. **Delete the subsumed doc.** No archive, no redirect metadata — git history preserves it.

For a 3+ doc cluster, process pairwise: consolidate the two most-overlapping first, then re-evaluate the merged result against the next doc. After merging, run the cited-claims check (below) on the canonical doc — merged content brings its citations along, and this is where cross-references most often dangle.

**Reverse case (split):** Consolidate also covers splitting one unwieldy doc that has grown to cover multiple distinct problems — but only when the sub-topics are genuinely independent and a maintainer might search for one without needing the other.

## Replace

Process Replace candidates one at a time. Write the successor following `compound`'s document format — the sibling skill owns the schema, so defer to it rather than inventing frontmatter fields or section order. The successor's body carries the standard shape: **problem → root cause → solution → prevention** (plus the frontmatter `compound` defines). Base the rewrite on the investigation evidence already gathered — what the old learning recommended, what the current code does, and why the old guidance misleads.

**When evidence is sufficient** (you understand both the old recommendation and the current approach — the investigation found the current code patterns, new locations, changed architecture):

1. Write the successor at the target path (same category as the old learning unless the category itself changed).
2. **Run the parser-safety checklist** on the new frontmatter (below) — silent-corruption bugs the prose rules miss.
3. **Run the cited-claims check** (below).
4. Delete the old learning file. The successor's frontmatter may include `supersedes: [old filename]` for traceability, but git history and the commit message already record it.

**When evidence is insufficient** (the drift is so fundamental you cannot confidently document the current approach — the subsystem was replaced, or the new architecture is too complex to grasp from a file scan): mark the old learning stale in place instead — add `status: stale`, `stale_reason: [what you found]`, `stale_date: YYYY-MM-DD` — report what's missing, and recommend running `compound` after the next real encounter with that area, when there's fresh problem-solving context.

### Parser-safety checklist

Apply by hand to the successor's frontmatter — these are silent corruptions, not loud parser errors:

1. The opening and closing delimiters are each a line whose content is exactly `---` (trailing whitespace is fine; `----` or `---extra` is not a valid delimiter).
2. For each **top-level** `key: value` entry (no leading indentation) whose value is **not** already quoted or structured (doesn't start with `"`, `'`, `[`, `{`, `|`, or `>`): the value must contain no unquoted ` #` (space-then-hash — YAML treats the rest as a comment and silently truncates) and no unquoted `: ` (colon-then-space — strict YAML may read it as a nested mapping). Quote the whole value if either appears.
3. For any array-of-strings field, wrap an item in double quotes if it starts with a reserved indicator — `` ` `` `[` `*` `&` `!` `|` `>` `%` `@` `?` — or contains `": "`. Strict YAML parsers otherwise reject the item.

### Cited-claims check

Scan the successor's body for: cited repo paths that aren't in the tree; commit SHAs that don't resolve; relative doc links that don't resolve; and leftover drafting scaffold (`Learning 3`, unresolved `{{...}}` tokens). A missing path is **adjudication input, not a failure** — a successor describing removed code legitimately cites paths that no longer exist. Resolve each: fix the citation, annotate it as historical, or confirm it intentional. Always fix scaffold leftovers.

## Delete

Delete only when the learning is clearly obsolete, redundant with no unique content to merge, or its problem domain is gone. Age alone is never a signal.

**Before deleting, check the problem domain is actually gone.** Missing referenced files prove the *implementation* is gone, not the *problem*. A learning about session-token storage whose `auth_token.rb` is gone — does the app still handle session tokens? If so, the concept persists under a new implementation: that's **Replace**, not Delete. A learning about a removed feature's endpoint — the whole domain is gone: that's Delete. Reason about where the problem lives now, don't grep mechanically for old keywords.

**Before deleting, run the inbound-link check.** Search the repo's markdown (other docs, plans, instruction files, READMEs — not source code, where citations are rare) for citations of the file. The filename slug is usually unique enough; read context lines around each match rather than whole files. Classify each citation:

- **Decorative** — the principle is stated inline; the citation is a "see also" or bare attribution. Delete is fine; clean up the citations in the same commit (drop the parenthetical or bare entry).
- **Substantive** — the citing doc relies on the cited doc for content not stated inline ("see X for details on Y", no inline Y). Signal **Replace** (write a successor at the same path) or **Keep with narrowed scope** if the doc's real content is broader than its title implies.
- **Mixed or unclear** — mark stale.

Cleanup is mechanical; the judgment is upstream — given the citations, is Delete still right or is Replace closer? **Auto-delete only when all three hold:** the implementation is gone (or fully superseded, or the doc is plainly redundant); the problem domain is gone; inbound links are absent or unambiguously decorative. If any condition fails, fill the gap with a Replace, Update, Consolidate, or stale-mark instead. If a substantive or unclear citation surfaces here that the earlier investigation missed, stop and reclassify — don't proceed with cleanup.
