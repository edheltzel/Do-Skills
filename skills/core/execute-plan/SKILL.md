---
name: execute-plan
description: >-
  Execute a multi-unit plan end-to-end — read the plan, orchestrate parallel or serial subagents
  under a strict safety check, verify each unit with real evidence, and ship. USE WHEN implementing
  from a plan doc in docs/plans, a spec path, a work breakdown, or a clear multi-step build request;
  "execute the plan", "build this out", "implement the plan". NOT FOR a single unit or bug fix (use
  implement, or tdd for test-first work); open-ended debugging (use debug); producing the plan itself
  (use plan).
user-invocable: true
argument-hint: "[Plan doc path or description of work. Blank to auto-use the latest plan doc]"
---

# Execute Plan

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

Execute a plan or concrete work prompt by understanding requirements quickly, following existing
patterns, and maintaining quality throughout — the focus is **shipping complete features**, not
perfect process. The plan is a decision artifact, not an execution script.

**At TDD seams, defer to `tdd`.** When a unit's execution direction, the plan, or the user calls for
test-first work — or the seam is naturally test-driven — run it under `tdd`: strict red → green, no
implementation before a failing test that fails for the expected reason. Never soften that loop into
"write test and code together." `execute-plan` orchestrates; `tdd` owns the red-green discipline for
the units that need it.

## Phase 0: Input triage

**Parse a leading mode token first.** If the input begins with `mode:return-to-caller`, strip it: the
remainder is the plan path, and this run executes in **Return-to-Caller Mode** (see below) — implement
and locally verify only, then return the structured envelope instead of running the shipping tail. A
mode token with no following path is an error — report it.

Then determine how to proceed from what was provided (the `<input_document>`):

**Plan document** (a path to an existing plan or spec): read the plan's metadata first (YAML
frontmatter for markdown, header text for HTML). If the plan is only a **requirements/approach**
artifact — not implementation-ready (no implementation units, files, or verification to execute) —
stop and route the user back to `plan` to produce an implementation-ready plan rather than guessing.
Otherwise continue to Phase 1.

**Blank invocation:** glob `docs/plans/*.md` and `docs/plans/*.html`, inspect metadata for the newest
candidates, and auto-select only an implementation-ready plan. Stop and ask for an explicit path if the
newest artifact is requirements-only or ambiguous.

**Bare prompt** (a description of work, not a path):

1. **Scan the work area** — identify files likely to change, find their existing test files, note local
   patterns and conventions.
2. **Assess complexity and route:**

   | Complexity | Signals | Action |
   |-----------|---------|--------|
   | **Trivial** | 1-2 files, no behavioral change (typo, config, rename) | Implement directly — no task list, no loop. Apply Test Discovery if it touches behavior-bearing code |
   | **Small / Medium** | Clear scope, under ~10 files | Build a task list from discovery, proceed to Phase 1 |
   | **Large** | Cross-cutting, architectural decisions, 10+ files, touches auth/payments/migrations | Tell the user this would benefit from `plan` to surface edge cases and scope boundaries. If proceeding, build a task list and continue |

## Phase 1: Quick start

1. **Read the plan and clarify** _(skip for a bare prompt)._

   Size your read. A short plan can be read in full. For a **long implementation-ready plan, do not read
   the whole document first** — build a section map, then read only what the active unit needs. To build
   the map: in **markdown** scan headings (`rg -n '^#{1,3} ' <plan>`); in **HTML** scan `<h1>`–`<h3>`
   elements and their anchor ids. Match on stable section names / unit IDs (`Goal`, `Verification`,
   unit headings), ignoring wrapper tags.

   Treat the plan as a decision artifact. Use its Implementation Units, Requirements, Files, Test
   Scenarios, and Verification sections as the primary source for execution. Note any `Execution note`
   per unit (the plan's natural-language direction — e.g. start from a failing proof, characterize
   legacy behavior), any `Deferred to Implementation` questions, and any `Scope Boundaries` (explicit
   non-goals). If the user asks for TDD/test-first this session, honor it even without an `Execution
   note`. If anything is ambiguous, ask now. **Do not edit the plan body during execution** — progress
   lives in git commits and the task tracker, not the plan.

2. **Set up the environment.** Check the current branch and the default branch. If already on a
   meaningful feature branch, continue on it. If on the default branch or you want isolation, use
   `git:worktree` (it detects existing isolation, prefers the harness's native worktree tool, else
   creates one from the default branch). Never commit directly to the default branch without explicit
   permission.

3. **Create a task list** _(skip if Phase 0 built one or routed as Trivial)._ Break the plan into
   actionable tasks derived from its implementation units, dependencies, files, test targets, and
   verification criteria. Preserve each unit's ID as a prefix in the task subject (e.g. "U3: add parser
   coverage") so blockers and summaries stay anchored to the plan's identifiers. Carry each unit's
   `Execution note` and use its `Verification` field as the "done" signal.

4. **Choose the execution engine, then the strategy.** For an implementation-ready plan, pick the engine
   that runs implementation — inline/subagent (default), goal-mode, or dynamic-workflow. Read
   `references/execution-engines.md` for the host-capability probe, the plan-shape selection table, and
   the tail-ownership rules. Legacy and bare-prompt work use the inline/subagent engine directly.

   For the inline/subagent engine, **prefer subagents for any structured multi-unit plan** — each worker
   gets a fresh context window for one unit. **Parallelize independent units whenever it is safe;** fall
   back to serial only when parallel isn't safe or the harness can't isolate concurrent writes.

   | Strategy | When to use |
   |----------|-------------|
   | **Inline** | Trivial work, work needing mid-flight user interaction, or bare prompts lacking structured units |
   | **Serial subagents** | The default for structured multi-unit plans whose units are dependent, few, or whose parallel-safety is uncertain — fresh context per unit, in dependency order |
   | **Parallel subagents** | Independent units (per the Parallel Safety Check) when the harness can isolate concurrent work — run a dependency layer at once, then the next |

   **Parallel Safety Check** — before dispatching a batch in parallel:

   1. Map files to units from each candidate unit's `Files:` section (Create/Modify/Test paths).
   2. **File overlap is necessary but not sufficient.** Also serialize units that contend on things
      absent from `Files:`: shared types/APIs/interfaces, DB migrations, generated artifacts or clients,
      lockfiles, snapshots, shared config/schema — or an **environment singleton** (one dev server/port,
      a shared database, browser sessions, package installs, rate-limited services). Reason about these;
      don't just diff paths.
   3. **No contention:** dispatch the batch in parallel.
   4. **Contention with harness-native isolation:** parallel is *recoverable* (isolated workers don't
      lose each other's writes) but **not automatically safe** — overlapping edits still need a real
      merge. Serialize contending units by default; run them parallel-isolated only when the expected
      merge is trivial. Log the predicted overlap.
   5. **Contention without isolation (shared workspace):** serialize — only the last writer survives.
   6. **Cap concurrency** at a bounded batch (~3-5 workers) even when more units are independent —
      over-parallelizing costs more in contention and integration than it saves.
   7. **Abort criteria:** if a batch produces broad unplanned edits, out-of-scope test failures, or
      repeated conflicts, stop parallelizing and finish serially.

   **Isolation is the harness's job, never `execute-plan`'s** — never run `git worktree add` yourself.
   Probe your subagent mechanism: harness-native isolated workers (Claude Code `Agent` with
   `isolation: "worktree"` + `run_in_background: true`) let you parallelize freely subject to the merge-cost
   judgment; a shared-workspace mechanism restricts parallelism to disjoint-file units; no subagent
   mechanism means run inline.

   **Dispatch** gives each worker: the plan path plus a **bounded unit packet** (the unit's Goal, Files,
   Approach, Execution note, Patterns, Test scenarios, Verification, and any resolved deferred questions —
   never "read the whole plan"); instruction to check the unit's test scenarios cover the applicable
   categories and supplement gaps; **instruction to choose the unit's evidence strategy and gather the
   evidence** (for behavior-bearing changes, default to proof-first or characterization-first — observe
   the red failure or baseline *before* changing production code); and **instruction to report, in its
   final message, both (a) the file paths it changed and (b) the unit's verification evidence**. Workers
   **do not commit** — the orchestrator owns staging, committing, and the authoritative test runs.

   **After each serial unit:** review the diff against the unit's scope and `Files:`, run the relevant
   tests, fix before dispatching the next (never on a broken tree), record the unit's verification
   evidence, update the task list, and commit.

   **After a parallel batch — the orchestrator integrates; never trust the handoff summary alone:** wait
   for every worker; **inspect the actual tree, not reported paths** (declared `Files:` are often
   incomplete); detect real collisions (2+ workers that modified the same file); review, test, and commit
   each unit in dependency order, capturing each worker's returned verification evidence — if a worker
   omitted it, re-derive what the tree allows and mark the rest unverified rather than fabricating a
   red-before-implementation observation; update the task list; **release the workers** (clean up each
   worktree/handle); then dispatch the next dependency layer.

## Phase 2: Execute

**Task execution loop.** For each task in priority order:

- Mark in-progress. Read referenced files. **If the unit's work is already present and matches the
  plan's intent** (files exist with the expected capability, or the `Verification` criteria already
  pass), it likely shipped on a prior branch/session — verify, mark complete, move on. Do not silently
  reimplement.
- Look for similar patterns; find existing test files (Test Discovery below).
- **Choose the evidence strategy before changing behavior.** For behavior-bearing changes, default to
  test-first or characterization-first when the code and test surface make it practical, even if the
  plan has no `Execution note`. When the strategy calls for pre-implementation proof, create/update/
  strengthen the test and **verify the expected failure or baseline before changing production code.**
  At a genuine TDD seam, hand the unit to `tdd` and let it own the strict red→green cycle.
- Implement following existing conventions. Add/update/remove tests to match the change.
- Run the System-Wide Test Check and the relevant tests. Record the task's verification evidence.
- Mark completed; evaluate for an incremental commit.

Guardrails: do not write the test and implementation in the same step when working proof-first; do not
skip verifying a new/changed test fails for the expected reason first; do not over-implement beyond the
current slice; do not add a duplicate regression test when an existing test is the right home. Skip
proof-first discipline only for trivial renames, pure config/styling, generated artifacts, and
manual-only surfaces — and record the reason and replacement verification.

**Test Discovery** — before implementing changes to a file, find its existing test files (search for
test/spec files that import, reference, or share naming with the implementation file). When a plan
specifies test scenarios, start there, then check for coverage the plan may not have enumerated.

**Evidence Strategy** — test discovery decides where proof belongs:

| Situation | Action |
|-----------|--------|
| Existing test already fails for the intended behavior | Use that as the red evidence; do not add a duplicate |
| Existing test covers the contract but asserts the wrong expectation | Update it, run it, verify the failure before implementing |
| Existing test is over-mocked or misses the real chain | Strengthen it narrowly, then verify it fails for the right reason |
| No existing test covers the behavior | Add the smallest focused failing test or characterization test |
| Testing is inappropriate for the task | Record the no-test exception and replacement verification |

**System-Wide Test Check** — before marking a task done, pause and ask:

| Question | What to do |
|----------|------------|
| **What fires when this runs?** Callbacks, middleware, observers, event handlers — trace two levels out. | Read the actual code for callbacks, middleware, `after_*` hooks on what you touched. |
| **Do my tests exercise the real chain?** All-mocked tests prove logic in isolation, nothing about interaction. | Write at least one integration test using real objects through the full callback/middleware chain. |
| **Can failure leave orphaned state?** State persisted before a risky external call. | Trace the failure path with real objects; test cleanup or retry idempotence. |
| **What other interfaces expose this?** Mixins, DSLs, alternative entry points. | Grep for the behavior in related classes; add parity now, not as a follow-up. |
| **Do error strategies align across layers?** Retry + fallback + framework handling. | List the error classes at each layer; verify your rescue list matches what the lower layer raises. |

Skip it for leaf-node changes with no callbacks, no state persistence, no parallel interfaces.

**Incremental commits** — after each task, commit when you can write a message describing a complete,
valuable change (a logical unit done, tests passing, meaningful progress, or about to switch contexts /
attempt something risky). Don't commit a small part of a larger unit, a failing tree, or anything that
would need a "WIP" message. Stage only that unit's files by name (not `git add .`) with a clean
conventional message. Use the plan's Implementation Units as commit-boundary guides, adapting to what
you find.

**Simplify as you go** — after a cluster of related units (or every 2-3), review recently changed files
for simplification. Don't simplify after every single unit — early patterns may diverge intentionally
later. At a natural phase boundary (especially before Phase 3, when the diff is ≥30 lines), invoke
`simplify` on the changed files; otherwise review them yourself for reuse and consolidation.

**Frontend / browser work** — for user-visible changes, follow the repo's design-system conventions and,
when browser tooling is available, verify the changed UI with `browser-verify` at desktop and mobile
widths before final validation. If no browser access exists, do a code-level responsive review and
record that browser verification was unavailable.

## Phase 3-4: Quality check and finishing

When all Phase 2 tasks are complete:

1. **Review** — review the branch diff with `code-review` (it self-sizes). Skip dedicated review only
   for a purely mechanical diff (formatting, dep-bumps, lint-only, generated).
2. **Apply fixes** — review is review-only; it returns findings but never edits the tree. Apply the
   eligible findings (batch by file, dispatch fix subagents in parallel when file sets are disjoint),
   run tests, and commit. Unresolved actionable findings are recorded as residuals — in an autonomous
   session, accept and record them; in an interactive session, ask.
3. **Ship** — open the PR via `task-to-pr` (or commit-and-push per `git:safe-pr-workflow` when a PR
   already exists). Never merge.

## Return-to-Caller Mode

`mode:return-to-caller <plan-path>` is for orchestrators such as `lfg` that own simplification, review,
PR creation, and CI watching after implementation. In this mode `execute-plan` performs implementation
and local verification only, then returns a structured summary instead of the shipping tail:

- `status`: `complete`, `blocked`, or `failed`
- `plan_path`, `changed_files`, `u_ids_attempted`, `u_ids_completed`, `verification_results`
- `verification_evidence`: one entry per attempted behavior-bearing unit (plus any non-behavioral unit
  where tests were intentionally skipped) — unit/task, `behavior_changed`, existing tests inspected,
  tests added/changed or used unchanged, red failure or characterization observed when applicable,
  verification commands/results, any exception reason. For subagent-executed units, assemble this from
  each worker's returned evidence, not the diff — the red-before-implementation observation exists only
  in the worker's report.
- `blockers`, `behavior_change`, `standalone_shipping_skipped: true`

Return `status: complete` only when behavior-bearing work has verification evidence or a deliberate
exception. Do not open a PR, run the owner tail, or bypass the caller-owned gates in this mode.
