---
name: debug
description: "Find and fix the root cause when something breaks: a failing test, a broken build, a bug report, or behavior that doesn't match expectations."
user-invocable: true
argument-hint: "<failure description, error output, or bug report>"
---

# Debug

A discipline for hard bugs and performance regressions. Skip phases only when explicitly justified. Use the project's domain vocabulary (see `domain-modeling`) for a clear mental model of the modules involved, and check ADRs in the area you're touching.

## Phase 1 — Build a feedback loop

**This is the skill.** Everything else is mechanical. With a tight pass/fail signal that goes red on *this* bug, bisection, hypothesis-testing, and instrumentation all just consume it; without one, staring at code won't save you. Spend disproportionate effort here — be aggressive, be creative, refuse to give up.

**Check for prior attempts first.** Before sinking effort into a loop, search the issue tracker and the merged/open PR history for earlier runs at this bug (`gh issue list --search`, `gh pr list --search`, `git log --grep`). A prior repro seeds your loop faster, and a *failed* fix is negative evidence — it tells you which hypotheses are already ruled out, so Phase 3 doesn't re-test them.

Ways to construct the loop, in roughly this order:

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer) — drives the UI, asserts on DOM, console, or network.
5. **Replay a captured trace** — save a real request, payload, or event log and replay it through the code path in isolation.
6. **Throwaway harness** — a minimal subset of the system (one service, mocked deps) exercising the bug path in a single function call.
7. **Property / fuzz loop** — for "sometimes wrong output", run 1000 random inputs and look for the failure mode.
8. **Bisection harness** — if the bug appeared between two known states, automate "boot at state X, check, repeat" so `git bisect run` can drive it.
9. **Differential loop** — run the same input through old vs new (or two configs) and diff outputs.
10. **HITL bash script** — last resort. If a human must click, drive *them* with [references/hitl-loop.template.sh](references/hitl-loop.template.sh) so the loop stays structured; captured output feeds back to you.

**Tighten the loop.** Treat it as a product: make it faster (cache setup, narrow scope), sharper (assert the specific symptom, not "didn't crash"), and more deterministic (pin time, seed RNG, isolate filesystem, freeze network). A 2-second deterministic loop is a debugging superpower; a 30-second flaky one barely helps.

**Non-deterministic bugs.** The goal is a higher reproduction rate, not a clean repro. Loop the trigger 100×, parallelise, add stress, narrow timing windows. A 50%-flake bug is debuggable; 1% is not — keep raising the rate.

**If you genuinely cannot build a loop,** stop and say so. List what you tried and ask the user for environment access, a captured artifact (HAR, log dump, core dump, timestamped recording), or permission to add temporary instrumentation. Do not hypothesise without a loop.

**Completion criterion.** Phase 1 is done when you can name one command — already run at least once, with the invocation and its output pasted — that is red-capable (drives the real bug path and asserts the user's exact symptom), deterministic, fast, and agent-runnable. No red-capable command, no Phase 2. Jumping straight to a hypothesis is the exact failure this skill prevents.

## Phase 2 — Reproduce and minimise

Run the loop; watch it go red. Confirm it produces the failure mode the *user* described — not a different nearby failure — and capture the exact symptom. Then shrink the repro to the smallest scenario that still goes red: cut inputs, callers, config, and steps one at a time, re-running after each cut. Done when every remaining element is load-bearing — removing any one makes the loop go green. A minimal repro shrinks the hypothesis space and becomes the clean regression test.

## Phase 3 — Hypothesise

Generate **3–5 ranked, falsifiable hypotheses** before testing any — single-hypothesis generation anchors on the first plausible idea. Each must state its prediction: "If X is the cause, then changing Y makes the bug disappear, or changing Z makes it worse." No prediction means it's a vibe — sharpen or discard it. Show the ranked list to the user before testing; they often re-rank instantly ("we just deployed #3") or know what they've ruled out. Don't block on it if they're AFK.

## Phase 4 — Instrument

Each probe maps to a specific prediction; change one variable at a time. Prefer a debugger or REPL (one breakpoint beats ten logs), then targeted logs at the boundaries that distinguish hypotheses. Never "log everything and grep". Tag every debug log with a unique prefix (e.g. `[DEBUG-a4f2]`) so cleanup is a single grep. For performance regressions, logs are usually wrong: establish a baseline measurement (timing harness, profiler, query plan), then bisect — measure first, fix second.

## Phase 5 — Fix and regression test

Write the regression test **before the fix**, but only if a **correct seam** exists — one where the test exercises the real bug pattern as it occurs at the call site. A too-shallow seam (a single-caller test for a multi-caller bug) gives false confidence; if no correct seam exists, that itself is the finding — note it and flag it for Phase 6. With a correct seam: turn the minimised repro into a failing test, watch it fail, apply the fix, watch it pass, then re-run the Phase 1 loop against the original un-minimised scenario.

**Consider defense-in-depth for the fix shape.** When the bug was invalid state reaching a vulnerable path — and the pattern recurs across files, the failure would be catastrophic, or the operation is dangerous regardless of caller — a single-point fix leaves the door open for a refactor or a new caller to reintroduce it. Load [references/defense-in-depth.md](references/defense-in-depth.md) and validate at multiple layers (entry validation / invariant / environment guard / diagnostic breadcrumb). Skip it for a one-off logic error with no realistic recurrence path — the trigger gate is in that file.

## Phase 6 — Cleanup and post-mortem

Before declaring done: the original repro no longer reproduces (re-run the Phase 1 loop), the regression test passes (or the absence of a seam is documented), all `[DEBUG-...]` instrumentation is removed (grep the prefix), throwaway prototypes are deleted, and the correct hypothesis is stated in the commit or PR message so the next debugger learns. Then ask: **what would have prevented this bug?** If the answer is architectural — no good test seam, tangled callers, hidden coupling — hand off to `review-structure` with the specifics. If it is a recurring invalid-state pattern that will resurface through other callers, the structural prevention is defense-in-depth ([references/defense-in-depth.md](references/defense-in-depth.md)) — apply it now if you did not in Phase 5. Make that recommendation after the fix is in, when you know the most.

## Rules

- Fix the cause, not the symptom. Do not delete the failing check, swallow the error, or weaken the assertion unless that is the real fix.
- One bug at a time.
- Do not pull unrelated failures or flaky infrastructure into the task.
- Stop when the fix needs a product or code-owner decision.
