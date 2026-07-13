# Testing and review

Verification must prove the contract at the layer where a plausible defect would be visible. Inspection can guide test selection; it cannot turn an unexecuted check into a pass.

## Choose the proving level

| Contract | Narrowest adequate proof |
|---|---|
| Parser, schema, reducer, selector, or formatter | Focused Vitest unit test |
| Server loader/action authorization, validation, status, redirect, or persistence | Route/server integration test using the repository's real runtime helpers |
| Data Mode or client route handler coordinating with an API | Route integration test showing the API boundary is called correctly and its response drives route state |
| Accessible name, field error, pending state, focus behavior within a component | Vitest plus the installed DOM/user-event test library |
| Navigation, loader/action revalidation, browser/server round trip, history, focus after transition, or persistence after reload | Existing browser/E2E harness |

Use [behavioral-testing](../../../core/behavioral-testing/SKILL.md) for general test design. Assert observable behavior and stable boundaries rather than hook calls, incidental markup, or implementation text.

## Vitest safeguards

- Await promise assertions, including `.resolves` and `.rejects`; an unreturned promise can let the test finish before the assertion runs.
- Await user interactions and asynchronous DOM queries.
- Restore fake timers, spies, globals, and module state so a focused test remains safe in the suite.
- Make rejected paths fail if the expected rejection never occurs.
- Prefer role/name and user-visible feedback over brittle selectors and broad snapshots.
- Mock at the real external boundary. Do not mock the unit whose behavior the test claims to prove.
- Keep route tests representative of the actual router mode and handler runtime.

A test that merely renders without throwing does not prove navigation, mutation, accessibility, or persistence.

## Browser and E2E proof

Use the repository's existing browser harness. Do not add a new harness during an unrelated feature. A critical route journey should exercise the real boundary where practical:

1. Enter through a real URL, including direct load when deep linking matters.
2. Observe the intended pending or hydration state.
3. Complete the interaction through accessible controls.
4. Verify the mutation result and error behavior.
5. Confirm route data becomes current through redirect, fetcher state, or revalidation.
6. Navigate away/back or reload when history or persistence is part of the contract.
7. Check focus and accessible feedback after transition or failure.

If setup selects no tests or no scenarios, record the check as unexecuted rather than successful. A zero exit code is insufficient when the intended test target did not run.

## Verification matrix

Report every required applicable check separately:

| Applicable contract | Exact command or scenario | Row result | Evidence |
|---|---|---|---|
| `<behavior or boundary>` | `<focused test target or manual steps>` | `PASS`, `FAIL`, `BLOCKED`, `NOT RUN`, or `NOT APPLICABLE` | `<observed assertion/output/artifact or concise reason>` |

Rules for rows:

- **PASS**: the named check ran, exercised the stated contract, and passed.
- **FAIL**: it ran and produced a defect or unmet assertion.
- **BLOCKED**: an external prerequisite outside the repository or operator's control prevented execution; name that prerequisite.
- **NOT RUN**: the check was omitted, selected nothing, or stopped because of an internal/setup issue.
- **NOT APPLICABLE**: the contract does not apply; state why.

Then compute one overall status:

| Overall status | Predicate |
|---|---|
| **PASS** | Every required applicable row is `PASS`. |
| **BLOCKED** | At least one required row is externally `BLOCKED`, every other required applicable row is `PASS`, and there are no failures or internal omissions. |
| **INCOMPLETE** | Any required row is `FAIL` or `NOT RUN`; a blocker is internal; evidence is missing; or required applicable checks were not enumerated. |

`NOT APPLICABLE` rows do not prevent PASS when their reasons are valid. Never downgrade a failure or omitted check to BLOCKED. Keep implementation/review findings separate from this computed status.

## Full-stack review

Apply this review only after the [React evidence gate](../SKILL.md#react-evidence-gate) passes. Limit the surface to the requested diff or feature and directly related router configuration, route hierarchy, deployed runtime evidence, server/API helpers, UI primitives, stores, and tests.

| Surface | Evidence to inspect | Defects to challenge |
|---|---|---|
| Router mode and runtime | Manifest, router config, `ssr`/`prerender`, scripts, adapter/server entry, hosting behavior | Server assumptions unsupported by deployment; invalid exports; broken nesting or parameters |
| Reads | `loader`/`clientLoader`, API client, generated route types, hydration behavior | Browser secrets; missing auth; stale build-time data presented as live; incompatible hydration results |
| Mutations | `action`/`clientAction`, forms/fetchers, server/API endpoint, revalidation | Client-only enforcement; duplicate submission; silent errors; stale UI after success |
| UI and state | URL params, route data, forms, local state, client store, primitives | Multiple owners; inaccessible controls; incomplete pending/error/empty/success states |
| Tests | Focused Vitest/integration targets and existing browser scenarios | False-positive async tests; excessive mocks; no route transition or persistence proof |

A finding must identify the affected contract, cite concrete project evidence, describe user or system impact, and propose the smallest repair consistent with the detected architecture. If the evidence is insufficient, request or run the missing check rather than asserting a defect.

## Related Atlas guidance

- [Routing and data authority](routing-and-data.md)
- [UI and state ownership](ui-and-state.md)
- [behavioral-testing](../../../core/behavioral-testing/SKILL.md)
