# Grounding validation

The doc just written becomes permanent, trusted knowledge — future agents will act on its claims without re-verifying them. Check the claims against reality before they compound. No check here is a hard gate: every flag is **adjudicated**, because solution docs legitimately cite deleted paths and pre-fix states.

## Which tree is ground truth

- **Code-behavior claims** (enum values, status semantics, limits, defaults) verify against the **local working tree** — they describe what this session's work produced.
- **Merge-state claims** ("fixed in #1608", "landed", "shipped") verify against **remote truth** — the checkout may predate a merge, so `gh pr view <n> --json state,mergedAt` is primary and local git reachability is only the fallback. Optionally `git fetch --quiet` first (best-effort; the network is never a correctness dependency). When remote state cannot be checked, keep the claim, add an as-of qualifier, and note the degraded verification in the report.

## Mechanical checks

Scan the written doc for each of these and adjudicate — **fix**, **annotate as historical**, or **confirm intentional** — never an automatic rewrite, never an automatic pass:

| Flag | Likely meaning | Resolution |
|------|----------------|------------|
| Cited path not found anywhere | Typo, or drafted from memory | Fix the citation or remove the claim |
| Path deliberately gone (doc says removed/renamed) | Historical citation | Confirm the surrounding prose marks it historical ("removed by this fix"); add the marker if absent |
| Bare commit SHA | Rewritten by rebase/squash on other checkouts | Replace with the PR number |
| SHA reachable only from local HEAD | Local-only commit | Replace with the PR number |
| Drafting scaffold ("Learning 3", `{{…}}`) | Drafting-context leak | Always fix — rewrite as a real path or link |
| Relative link unresolved | Wrong target | Fix the path |

## Semantic checks

Re-verify the doc's factual claims in three categories:

1. **Code-behavior claims** — locate the defining source in the current tree and confirm against the defining line(s), citing `file:line`. Verdict: verified, contradicted (the quoted source, not the conversation, is authoritative — fix the doc from it), or unverifiable (soften or attribute: "per this session's conclusion…" — or drop).
2. **Merge-state claims** — check remote truth as above. Contradicted (PR open, not merged) → rephrase as pending. Unverifiable offline → as-of qualifier, note degradation.
3. **Internal completeness** — countable assertions ("three root causes", "all N consumers"): count the substantiating items in the doc itself; complete the enumeration or restate the count to match.

Ignore session narrative ("we first tried X") — it describes the conversation, not the tree. Re-check after any edit until clean or every remaining flag is confirmed intentional. Summarize the outcome in one line of the run report: flags adjudicated (fixed / annotated / confirmed), claims softened or corrected, and any degraded merge-state verification.
