# Behavioral Testing

Quickstart:

```bash
npx skills add edheltzel/skills --skill=behavioral-testing
```

```bash
npx skills update behavioral-testing
```

[Skill files](../../skills/core/behavioral-testing/)

## What it does

`behavioral-testing` keeps tests anchored to outcomes a user or external caller can observe: rendered content, navigation, responses, persisted state, files, and process output. Internal refactors should not break tests when the behavior remains unchanged. Mocks isolate external boundaries; they do not prove product behavior.

The skill also generates and executes E2E plans against real application, browser, CLI, API, device, or simulator entry points. Existing automated tests may inform coverage, but invoking them is not an E2E product case.

## When to reach for it

Use `/behavioral-testing` when writing or reviewing tests, planning behavior and boundary coverage, repairing brittle or mock-heavy suites, generating an executable E2E plan, or executing a named plan.

Behavior tests should:

- arrange only the required preconditions
- perform the action a user or caller performs
- assert the result that user or caller observes
- cover boundaries, visible errors, transitions, retry, recovery, authorization, and persistence
- fail under a plausible behavior regression while surviving an implementation-only refactor

## Executable E2E contract

Generation and execution are separate. Generation writes a plan from verified change scope, repository configuration, product entry points, and environment facts; it does not run the plan. Execution consumes a named existing valid plan and never silently regenerates missing fields or substitutes commands that run automated test suites.

A valid plan contains at least one concrete product case through a real user-facing entry point. Empty case lists, setup-only plans, placeholders, invented targets, and collections of test-runner commands are invalid.

### Safety before setup

Before setup or mutation, execution must:

1. classify the environment as `local`, `test`, `staging`, `production`, or `unknown`
2. classify every command, API call, database operation, and filesystem action as read-only or mutating, with its target, bounded scope, reversibility, and cleanup owner
3. reject `unknown` as unsafe and reject production by default
4. obtain explicit user authorization for the disclosed environment, exact action, and bounded scope before any destructive or non-local mutation
5. use isolated test accounts and data
6. define reversible, bounded cleanup that touches only resources created by or assigned to this run

Missing or unverifiable environment, mutation, authorization, isolation, reversibility, or cleanup information blocks execution before setup. Cleanup runs after success, failure, or blockage when safe, preserves diagnostic evidence, and records what it removed or retained.

### Cases and evidence

Every required setup gate and case defines concrete actions, observable expected results, timeouts where needed, evidence to retain on success and failure, and cleanup for its bounded mutations. Product assertions inspect rendered state, navigation, response status and fields, process exit and output, persisted records, or filesystem effects—not internal calls.

The execution record lists every setup gate and every planned case ID with:

- `PASS`, `FAIL`, `BLOCKED`, or `NOT RUN`
- a specific reason
- the observed result when the action ran
- retrievable evidence or an explicit missing-evidence statement
- cleanup performed or not required

A passing result cites direct evidence of the observable outcome. Successful command exit alone is not evidence that product behavior passed. If setup blocks execution, all cases are listed as `NOT RUN` with the blocker. On the first required case failure, retain its evidence, mark later cases `NOT RUN`, and perform only safe run-owned cleanup.

### Overall result

Overall status uses strict precedence:

1. `FAIL` if a required gate or case ran and the observed result violated its expectation.
2. Otherwise `BLOCKED` if a specific safety, environment, authorization, prerequisite, service, or health condition prevented a required action.
3. Otherwise `INCOMPLETE` if required execution, statuses, cleanup accounting, or evidence are missing.
4. Otherwise `PASS` only if every required gate and case ran and passed with retrievable evidence, cleanup is accounted for, and at least one real product case passed.

A zero-case or `0/0` execution, setup-only execution, unexecuted required case, or missing required evidence never passes.

The complete plan schema and stop rules are in the [E2E plan reference](../../skills/core/behavioral-testing/references/e2e-test-plan.md).

## It's working if

- Tests name and prove user-observable contracts rather than internal call order.
- Mocks stay at external boundaries and setup does not obscure the assertion.
- A plausible behavior regression makes the relevant test fail.
- Generated E2E plans contain a real product case and verified execution details.
- Execution never reports `PASS` for an unsafe, empty, blocked, partially run, or evidence-deficient plan.

## Where it fits

Use this skill as the behavior standard for day-to-day test authoring and E2E verification. It complements [karpathy-guidelines](./karpathy-guidelines.md), which emphasizes surgical implementation and verifiable outcomes, and the [engineering skill catalog](../engineering/), whose skills shape the code this one verifies.
