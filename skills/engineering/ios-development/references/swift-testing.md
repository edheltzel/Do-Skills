# Swift Testing

Use this reference when an iOS/iPadOS target uses `import Testing`, `@Suite`, `@Test`, `#expect`, `#require`, parameterized cases, traits, or asynchronous confirmations.

## Assertions and diagnostics

- Put the meaningful expression directly inside `#expect` so a failure can describe its values.
- Use `#require` when later test work cannot proceed without a value or condition; use independent expectations when multiple failures remain informative.
- Assert the specific error type, case, and associated values that define the contract. A test accepting any error does not defend the boundary.
- Unwrap optional prerequisites with `try #require(...)` rather than asserting non-nil and force-unwrapping.
- Keep a test internally consistent with Swift Testing APIs. Retain XCTest where the target still needs UI automation, performance measurement, or an existing callback facility that is not being migrated.

## Parameterized behavior

Use arguments to express one behavior over a meaningful input space. Two argument collections create combinations unless explicitly paired. Prefer an explicit table of input/expected tuples when pairing is part of the domain. If `zip` is appropriate, ensure silent truncation cannot hide cases. Expected results must be independent fixtures rather than a duplicate of the production algorithm.

Give parameter values stable, diagnosable descriptions when failures would otherwise be opaque.

## Parallel execution and isolation

Tests can run in parallel, and suite types receive a fresh instance for each test. Design fixtures accordingly:

- avoid mutable global or static state;
- allocate unique temporary files, databases, accounts, ports, and identifiers per test;
- make setup and cleanup deterministic even when a test throws;
- constrain execution only around a genuinely exclusive resource;
- do not expect serialized scheduling to share one suite instance or coordinate unrelated suites unless they are placed under the same constrained parent.

A disabled test records why it is disabled and, when the project tracks defects, the corresponding issue. A permanent unexplained skip is missing coverage.

## Asynchronous behavior

Await production async APIs directly. Avoid sleep-based timing, polling delays, semaphores, and dispatch-group waiting; they obscure causality and can deadlock main-actor work.

A confirmation counts events that occur while its closure is active. If a completion-handler API fires later, bridge it with a checked continuation only when exactly-once completion is guaranteed, or use the project's XCTest expectation approach when bounded callback waiting is the correct contract. Make any spawned task's completion observable so assertions cannot race startup. Verify cancellation as a state transition rather than relying on scheduler timing.

## Coverage contract

Tests defend observable outputs, state transitions, cancellation and stale-result rules, decoded errors, representative payloads, durable migration paths, accessibility semantics that are part of the interface contract, and plausible empty, partial, retry, and failure behavior. Avoid assertions about private helper calls, spelling in implementation files, or framework plumbing.

Use the target's existing framework and fixtures for a focused change. Do not migrate unrelated tests to make the new test stylistically uniform.

## Evidence to collect

Record the exact test command, scheme or package, destination, and selected test identifier. A discovered test with no executed result is not evidence. When parallelism or isolation is relevant, run the test in a way that can expose shared-state failure instead of relying on a single serial execution.

## Authority

- [Swift Testing](https://developer.apple.com/documentation/testing)
- [Swift.org testing packages](https://www.swift.org/packages/testing.html)
