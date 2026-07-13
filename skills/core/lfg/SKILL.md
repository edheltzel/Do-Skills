---
name: lfg
description: >-
  Opt-in autopilot: run the full shipping pipeline end-to-end with no check-ins — plan, implement,
  simplify, review and fix, commit, push a branch, open a PR, and drive CI to green. USE ONLY WHEN
  the user explicitly asks to build or ship something autonomously all the way to an open PR, or
  invokes lfg directly. Invoking lfg authorizes this session's pushes and PR creation. NOT FOR
  in-the-loop work where the user reviews each step (use plan to plan, execute-plan to run a plan,
  debug to fix a bug, or git:safe-pr-workflow to commit and open a PR for existing changes).
user-invocable: true
argument-hint: "[feature description]"
---

# LFG — autonomous shipping autopilot

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

**This is the opt-in autopilot.** Nothing auto-invokes it — the user runs it deliberately. Invoking it
**authorizes this session's pushes and PR creation** and runs the whole chain hands-off, with no
check-ins: it plans, implements, simplifies, reviews and applies fixes, commits, pushes a branch, opens
a PR, and drives CI to green without stopping. If you want to review each step, do not use lfg — use
`plan`, `execute-plan`, `debug`, and `git:safe-pr-workflow` individually.

CRITICAL: execute every step below IN ORDER. Do NOT skip a required step or jump ahead to coding. The
plan phase (step 1) MUST complete and verify BEFORE any implementation. Violating this order produces
bad output.

When invoking a skill referenced below, use the platform's skill-invocation primitive (the `Skill`
tool in Claude Code) and match the skill's listed name exactly.

1. **Plan.** Invoke `plan` with the arguments you were invoked with.

   GATE: STOP. Verify `plan` produced a written plan file in `docs/plans/`. If none was created, invoke
   `plan` again. Do NOT proceed until a written, implementation-ready plan exists. **Record the plan
   file path** — it is passed to `execute-plan` in step 2 and to `code-review` in step 4. If the plan is
   only requirements/approach (not implementation-ready), stop and tell the user to enrich it with
   `plan` before shipping.

2. **Implement.** Invoke `execute-plan` with `mode:return-to-caller <plan-path-from-step-1>`.

   GATE: STOP. Verify implementation work was performed (files created/modified beyond the plan). Read
   the structured return and require `status: complete`, the same plan path, changed files, unit IDs
   attempted/completed when present, verification results, blocker list, and the behavior-change signal.
   When `behavior_change: true`, also require `verification_evidence` naming the relevant units, existing
   tests inspected, tests added/changed or used unchanged, red-failure or characterization evidence when
   applicable, and the verification run. Do NOT decide the test strategy inside lfg — the evidence is
   `execute-plan`'s contract.

   If `behavior_change: true` but `verification_evidence` is missing or too vague, invoke `execute-plan`
   once more with the same `mode:return-to-caller <plan-path>` argument (its idempotency path inspects
   the already-implemented work and fills the evidence without reimplementing). If the second return
   still lacks coherent evidence, stop as blocked and report the missing fields.

3. **Simplify.** Invoke `simplify` on the branch diff.

   This runs before review so step 4 covers the simplified code. **Skip** when the change is docs-only
   or trivial (roughly under 10 changed lines). Otherwise let `simplify` resolve the branch-diff scope
   itself; it preserves behavior and runs the test suite. **Do not commit here** — `simplify` leaves its
   changes in the working tree; step 4's review scopes the working tree and step 8 commits whatever
   remains.

4. **Review.** Invoke `code-review` on the branch diff, passing the plan path from step 1 so it can
   verify requirements completeness. Read the actionable findings it emits.

   `code-review` is report-only by design — it surfaces findings but never edits the tree; lfg applies
   the eligible ones in step 5. Frame this to the user as "review found X → applied X in step 5," not as
   "review did not auto-fix."

**Shipping precondition (steps 5–9).** Run `git remote` once before shipping. If it lists **no remote**
(a sandbox/throwaway checkout with `git init` but no `origin`), shipping is **local-only**: make every
commit the steps below call for, but **skip every push and PR create/edit and CI-watch action**. A
missing remote is a terminal local-only state, not an error — never retry a push or hunt for a remote.
Run steps 5–9 normally when a remote exists.

5. **Apply and persist review fixes.** Apply the eligible findings from step 4 (batch by file, dispatch
   fix subagents in parallel when file sets are disjoint), run the affected tests, then commit and push
   the fixes when a remote exists. Route the push through the **verified-push** boundary in
   `git:safe-pr-workflow` (after `git push`, freshly query the exact destination ref and require its
   remote OID to equal local `HEAD`). Do not proceed while eligible review fixes remain only in the
   working tree uncommitted.

6. **Record residual findings.** When step 4 reported actionable findings not applied in step 5, make
   them durable without prompting the user: write `docs/residual-review-findings/<branch-or-head-sha>.md`
   with each residual (severity, file:line, title, and reason if it could not be applied), commit
   `docs(review): record residual review findings`, and push it (verified) when a remote exists. Do not
   write a residual section into the PR body. Do not output DONE until residuals are durable (the record
   file committed).

7. **Browser-verify.** For user-visible changes, invoke `browser-verify` to exercise the affected flows.
   Skip when nothing user-facing changed.

8. **Commit, push, open the PR.** Follow `git:safe-pr-workflow`: commit any remaining changes (staged by
   name, logical commits), push the branch through the **verified-push** boundary, and open a PR whose
   title and body follow `git:safe-pr-workflow`'s `references/pr-description-writing.md` (write the body
   to a temp file and pass `--body-file`, never stdin). If step 6 already opened a PR, skip PR creation
   but still commit and push any remaining changes. **Per the shipping precondition, when no remote is
   configured, commit locally and skip the push and PR creation entirely.** (A ticket-scoped run may use
   `task-to-pr` for the PR exit instead.)

9. **Drive CI to green.** Only when an open PR exists for the current branch. Detect it
   (`gh pr view --json number,url,state`); if none exists or `gh` is unavailable, skip to step 10.

   Invoke `babysit-pr mode:pipeline <pr-url>`. It runs the bounded pipeline loop: watches CI, repairs
   real (convergent) failures via `debug` — never weakening, skipping, or mocking an assertion — resolves
   any review comments that arrived via `resolve-pr-feedback mode:pipeline`, and stops when CI is decided
   or its budget is hit. Collect its structured result (`{ status, fixes_applied, residuals }`). It
   surfaces unfixable CI as a run-report comment on the PR and returns residuals — do NOT write a
   `## CI Failures Unresolved` PR-body section. A `needs-human` residual (a fix needing a product/design
   decision) is deferred, not applied — that is the autopilot contract. Do not block DONE once babysit
   has surfaced residuals.

10. **Finish.** Output `<promise>DONE</promise>` when complete.

    If an open PR exists, first add one line pointing the user to the interactive watch-to-merge —
    pipeline mode stopped at "CI decided," not "merged," and the continuous watch is opt-in:
    `PR is moving — run /babysit-pr <pr-url> to watch it through review to merge.` Then output the DONE
    promise.

Start with step 1 now. Plan FIRST, then work. Never skip the plan.
