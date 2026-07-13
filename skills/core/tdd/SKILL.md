---
name: tdd
description: "Test-first variant of implement: confirm the seams, write a failing test, then make it pass. Refactoring is a separate review step, not part of the loop."
user-invocable: true
argument-hint: "<task reference or behavior> e.g. 'LIN-123' or 'retry logic for API client'"
---

# TDD

TDD is the red → green loop. Refactoring is **not** part of it — that belongs to the review stage. When the loop is done, hand off to `simplify` and `review-structure` for any cleanup.

1. Read the request, its sources, and the relevant code. Ask before writing tests only when a missing decision would change behavior, interfaces, or checks.
2. Confirm the seams. A **seam** is the public boundary you test at — the interface where you observe behavior without reaching inside. Prefer existing seams to new ones and the fewest possible; one is ideal. Write the seams under test down and confirm them with the user before writing any test. No test is written at an unconfirmed seam.
3. Red: write the smallest failing test that proves the behavior or reproduces the bug. Run it and confirm it fails for the expected reason.
4. Green: write the minimum implementation that passes. Don't change existing interfaces or user-visible behavior unless the task requires it. Add failure-path tests where they matter.
5. Repeat one slice at a time. Each test is a **tracer bullet** — a narrow, complete path through the behavior — that responds to what the last cycle taught you. Don't write all tests first, then all implementation.
6. Report the test that failed before, passes after, and final checks. Then hand off to `simplify` / `review-structure` for refactoring.

## Rules

- No implementation code before a failing test for the behavior.
- Red before green, one slice at a time — one seam, one test, one minimal implementation per cycle. Don't anticipate future tests or add speculative features.
- Refactoring is not part of the loop; it is the review stage.
- State low-risk assumptions and keep moving.
- Tests describe behavior, not implementation details.
- Prefer real boundaries over mocks when practical.
- Skip TDD for docs, formatting, or non-behavioral scaffolding.
