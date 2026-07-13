# Executable E2E Test Plans

This is the generation, safety, execution, and reporting contract for end-to-end plans used by `behavioral-testing`. E2E work exercises a real product entry point as a user or external caller would; invoking an existing automated test suite is not an E2E case.

## Modes Are Separate

### Generate

Generation produces a plan artifact and does not execute it. Derive the plan from verified change scope, repository configuration, runtime entry points, and available environment facts. Existing unit, integration, snapshot, and E2E suites may inform coverage, but commands that run those suites are not product actions.

A generated plan is executable only when it:

- identifies the change range and user-visible outcome
- names verified application, browser, CLI, API, device, or simulator entry points
- contains at least one concrete product case; an empty or setup-only plan is invalid
- uses verified commands, routes, targets, selectors, credentials-by-name, services, and health checks
- defines observable assertions and retrievable evidence for every required gate and case
- declares environment, mutation scope, isolation, authorization requirements, timeouts, and bounded cleanup

### Execute

Execution consumes a named existing plan. Validate it before any setup or mutation. Do not regenerate omitted fields, invent product cases, guess targets, substitute automated test commands, or reinterpret placeholders. A missing plan, invalid plan, or plan with zero executable product cases cannot run and must be reported as blocked preflight.

## Preflight Safety Gate

Complete the safety record before setup:

1. Classify the target as `local`, `test`, `staging`, `production`, or `unknown`. `unknown` is unsafe. Production is rejected by default; proceeding requires the user's explicit authorization for this disclosed run.
2. Inventory every command, API call, database operation, and filesystem action. Classify each as read-only or mutating and record its target, bounded scope, reversibility, and cleanup owner.
3. For every destructive or non-local mutation, obtain explicit user authorization that names the environment, exact action, and bounded scope. General permission or an assumed deployment convention is insufficient.
4. Prove the run uses isolated test accounts and data that cannot collide with ordinary user or shared production state.
5. Define bounded cleanup before mutation. Cleanup may remove only resources created by or explicitly assigned to this run and must preserve diagnostic evidence.

Missing or unverifiable environment, mutation, authorization, isolation, reversibility, or cleanup information makes preflight `BLOCKED`. Perform no setup or product action after that determination.

## Plan Schema

Use an established repository format when it carries every field in this contract. Otherwise use:

```yaml
version: 1
metadata:
  change_range: <base...head or equivalent>
  user_visible_outcome: <behavior under test>
  generated_at: <ISO-8601 timestamp>
setup:
  environment:
    classification: <local|test|staging|production|unknown>
    runtime: <entry point, target, and working directory>
  safety:
    operations:
      - action: <exact command or operation>
        mutation: <read-only|mutating>
        target: <host/service/database/filesystem>
        scope: <bounded resources>
        reversible: <true|false with explanation>
        authorization: <authorization reference or not-required>
        cleanup_owner: <run-owned resources>
    isolation: <test accounts and data>
    cleanup: <bounded actions and retained evidence>
  prerequisites: []
  build_or_launch: []
  services: []
  health_gates: []
tests:
  - id: E2E-01
    required: true
    name: <observable product behavior>
    context: <verified entry point and affected change>
    preconditions: []
    actions: []
    assertions: []
    evidence: []
    cleanup: []
```

Every required setup item and case specifies a concrete action or check, expected observable result, timeout where waiting is possible, evidence to retain on both success and failure, and bounded side effects plus cleanup when it mutates state.

Actions use the real product: launch the verified target, enter input, activate a control, call a documented endpoint, or invoke a product CLI. Assertions inspect rendered state, navigation, response status and fields, exit status and output, persisted records, or bounded filesystem effects. Vague instructions, invented selectors, guessed schemes or targets, placeholder credentials, internal-call assertions, and unbounded mutation are invalid.

## Execution Rules

Run required setup and health gates before product cases. If a required prerequisite, build, launch, service, or health gate fails, stop before the first case. Run product cases sequentially. On the first required case failure:

- retain the observed output and diagnostic evidence
- mark the failing case `FAIL`
- mark every later case `NOT RUN` with the failure as its reason
- run only safe cleanup for resources this execution created or owns

Cleanup applies after success, failure, or blockage when it is safe. Record each cleanup action and result. A cleanup problem does not erase or replace the evidence that established the primary result.

## Per-Item Record

Every setup gate and every planned case ID must appear in the execution record with:

- `status: PASS|FAIL|BLOCKED|NOT RUN`
- a specific reason
- the observed result when an action ran
- retrievable evidence such as captured output, response body, log, screenshot, state query, or artifact path
- cleanup performed or not required

`PASS` requires direct evidence of the expected observable result. `FAIL` means the action ran and the observed result contradicted the expectation. `BLOCKED` means a named safety or prerequisite condition prevented the action. `NOT RUN` is reserved for cases skipped after an earlier stop condition; it includes the controlling reason. Evidence that cannot be retrieved is reported as missing, never inferred.

## Overall Result

Determine `overall` using this precedence:

1. `FAIL` when any required gate or case ran and its observed result violated the expected outcome.
2. Otherwise `BLOCKED` when a specific safety, environment, authorization, prerequisite, service, or health condition prevented any required action.
3. Otherwise `INCOMPLETE` when required execution, per-item status, cleanup accounting, or evidence is absent, including an interrupted run without an established blocker.
4. Otherwise `PASS` only when every required gate and case ran and passed with retrievable evidence, cleanup is accounted for, and at least one real product case passed.

A zero-case or `0/0` execution, setup-only execution, unexecuted required case, placeholder result, or missing required evidence is never `PASS`. The final record includes the environment classification, change range, authorization references where required, all per-item results, retained evidence, and cleanup results.
