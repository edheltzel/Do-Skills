# Caller-owned review loop

Use after `do-adversarial-review` runs from a caller. The reviewer reports only; the caller checks findings and owns fixes. Keep the original change scope and leave unrelated work untouched. Record the diff or snapshot reviewed each round, including untracked files in scope. Do not edit scoped files while a review is running.

## Base and brief

For a PR, fetch the head and base and use the merge-base of the PR head and `origin/<baseRefName>`. For local changes, use the merge-base of `HEAD` and `origin/<default-branch>`; without a remote use the user-named base or `HEAD` for uncommitted changes. Never check out a dirty tree. Keep the same base and scoped diff command across rounds; include scoped untracked files separately.

Record `git diff --shortstat <base>` before review. Give round 1 a fixed brief: scope and repo, base SHA, intent, out-of-scope, check results (including missing or pre-existing failures), diff command, and the P0-P3 rubric from the skill. Ask for review only, surrounding code and affected callers, no edits or posting, and this reply format: `VERDICT: APPROVE|CHANGES`, followed by stable finding IDs, severity, `file:line`, evidence and suggested fix.

## Rounds

1. Run the first review on the full scoped change after its covering checks. Record missing or pre-existing failures; do not call failing checks a pass.
2. Keep a ledger for each finding: stable ID, location, P0-P3 severity, evidence, reviewed snapshot, and disposition: fixed, declined with evidence, unresolved, or unverified. Judge each finding independently; P3 is not automatically a nit. An evidence-backed rejection as incorrect or out of scope closes a finding. Accepting a known defect is not a fix: report the risk and obtain any required user decision. A product decision goes to the user.
3. Apply accepted fixes within the caller's scope. Prefer the smallest change that addresses the trigger. Re-run the affected checks. If review grew the diff, cut unnecessary growth first; report `git diff --shortstat <base>` before and after, without deleting needed fixes or unrelated work.
4. If behavior changed or a material finding remains unresolved, review again within the remaining budget. Supply the original scope, ledger, previous snapshot and changes since it. Review the changed behavior, affected callers and invariants, and unresolved findings. A material scope expansion requires a full review of the expanded scope within the remaining budget.

A round is one orchestrated review pass, including its routed reviewer. The budget is three rounds across the entire invocation and its delegations, not per finding. Extend to at most five only if the user asks, or while an evidenced high-risk security, permissions, data-loss, state or concurrency finding remains unresolved. Do not nest loops. Use the review skill's existing engine selection and fallback; no particular model is required.

## Stop

Stop early when a round returns only P3s; assess each independently, and do not call unresolved material defects approved. A review is complete only when the current behavior diff has been reviewed, its checks pass, and material findings are resolved or explicitly declined with evidence. A review with no findings means only that none were found in the stated scope. Comment, documentation or format-only fixes and declined findings do not require another round.

An unavailable reviewer, failed checks, unreviewed behavior changes or unresolved material findings is not approval. If the budget ends before those are cleared, stop incomplete; a fix after the final round remains unreviewed even if tests pass. Return `blocked` for an incomplete review; return `needs-human` for a product decision or a finding still disputed after two replies. Report the scope, rounds, ledger, checks, and remaining uncertainty. Preserve a caller's explicitly permitted review skip, and name it as a skip, not a pass. Never push as part of this loop.

Only after approval, optionally include `Reviewed with do-adversarial-review loop: N rounds` in the PR body through the caller's normal PR workflow.

Adapted from t3dotgg/tstack `sol-loop` (MIT), SHA `1085050f3baed1ac724caa4a8166145fb2ac88af`.
