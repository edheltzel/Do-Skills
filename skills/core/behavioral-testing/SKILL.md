---
name: behavioral-testing
description: >
  Behavior-first testing for user-observable contracts, test quality review, and safe
  executable E2E plans. Use when writing or reviewing tests, planning coverage,
  generating an E2E plan, or executing a named E2E plan against a real environment.
  Triggers: writing tests, TDD, brittle tests, excessive mocks, test strategy,
  behavior-driven development, "generate an E2E test plan", "run the test plan",
  "execute end-to-end tests".
---

# Behavioral Testing

Prove what a user can observe. A refactor that preserves behavior should not break the test.

## Core Laws

1. Assert on rendered output, navigation, responses, persisted state, files, or process behavior—not internal wiring.
2. Name tests for the behavior and boundary they prove.
3. Mock only external boundaries; a mock is isolation, never proof of product behavior.
4. Keep setup to the minimum needed to expose the contract.
5. Verify a new test fails under a plausible behavior regression.

## Test Shape

```text
Arrange: establish the minimum preconditions
Act:     perform the action a user or caller performs
Assert:  inspect the outcome that user or caller can observe
```

Prioritize boundaries and transitions: empty or malformed input, visible errors, loading-to-success and loading-to-error transitions, retry and recovery, duplicate actions, authorization changes, and persistence across the boundary. Avoid helper-call order, internal state-container details, and mock call counts unless the call itself is the public contract.

## Executable E2E Contract

Load [the E2E plan reference](references/e2e-test-plan.md) before generating or executing a plan. The following contract applies in full:

- **Generation and execution are separate operations.** Generate writes a plan from verified repository and environment facts; it does not run the plan or disguise an automated test suite as E2E coverage. Execute requires a named, existing, valid plan and never silently regenerates missing content.
- **A plan contains real product coverage.** It must define at least one executable case through a user-facing application, browser, CLI, API, device, or simulator entry point. Setup-only plans, empty case lists, placeholders, and commands that merely invoke existing test suites are invalid.
- **Safety is decided before setup.** Classify the environment as `local`, `test`, `staging`, `production`, or `unknown`, then classify every command, API call, database operation, and filesystem action by mutation, target, scope, reversibility, and cleanup ownership. `unknown` is unsafe. Production is rejected unless the user explicitly overrides that default for the disclosed run.
- **Mutation requires proof and authority.** Any destructive or non-local mutation requires explicit user authorization for the named environment, exact action, and bounded scope. Use isolated test accounts and data. Missing authorization, isolation, scope, reversibility, or environment evidence blocks execution before mutation.
- **Cleanup is bounded.** Define cleanup before execution; remove only resources created or owned by this run, apply cleanup after success, failure, or blockage where safe, and retain cleanup evidence. Cleanup must not broaden the original mutation or erase failure evidence.
- **Evidence is part of the result.** Every setup gate and every case ID receives `PASS`, `FAIL`, `BLOCKED`, or `NOT RUN`, a reason, and retrievable evidence or an explicit statement that evidence is unavailable. A passing assertion cites the observed value or artifact; command success alone is not proof of product behavior.

### Overall Result

Apply these predicates in order:

1. `FAIL` — a required gate or case ran and an observed result violated its expected outcome.
2. `BLOCKED` — no required result failed, but a specific safety, environment, authorization, prerequisite, service, or health condition prevented a required action.
3. `INCOMPLETE` — neither failure nor blocker was established, but required execution, statuses, cleanup accounting, or evidence are missing.
4. `PASS` — every required gate and case ran and passed with retrievable evidence, cleanup is accounted for, and at least one real product case passed.

An empty case set, a `0/0` run, a setup-only run, an unexecuted required case, or missing required evidence can never be `PASS`. Stop on the first required case failure, preserve its evidence, mark later cases `NOT RUN`, and perform only the run-owned cleanup that remains safe.

## Review Checks

- Would the assertion still pass after an internal refactor that preserves behavior?
- Does the test name state an observable contract?
- Is the assertion reading a real output rather than a mock?
- Does each mock isolate an external boundary?
- Does the test fail when the behavior is plausibly broken?
- For E2E execution, did preflight prove environment, mutation scope, authorization, isolation, and cleanup before setup?

## Detailed References

- [Anti-patterns](references/anti-patterns.md)
- [Test templates](references/test-templates.md)
- [Branch coverage](references/branch-coverage.md)
- [Executable E2E plans](references/e2e-test-plan.md)
- [E2E execution mechanics](references/e2e-execution-mechanics.md)
