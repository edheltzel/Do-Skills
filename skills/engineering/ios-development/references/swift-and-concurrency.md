# Swift Architecture and Concurrency

Use this reference when iOS/iPadOS-owned code changes feature boundaries, task lifetime, actor isolation, cross-isolation values, cancellation, or error flow.

## Repository fit

Begin with the target's Swift language mode, deployment version, and existing dependency construction. Preserve established module and feature seams unless the requested behavior requires a change. UI code renders state and forwards intent; transport and persistence policy belong behind their existing boundaries. Avoid introducing a protocol, actor, coordinator, or service locator merely to make a small change look architectural.

## Isolation contract

- Keep UIKit interaction and UI-owned mutable state on `@MainActor`; type-level isolation is appropriate when the whole type has that responsibility.
- Use actors for mutable state that requires serialized access, not as decoration for stateless functions.
- Prefer child tasks whose lifetime is bounded by their caller. Use `async let` for a known, fixed group and task groups for a dynamic group.
- Retain an unstructured `Task` only when its cancellation or replacement is part of the owning feature's lifecycle.
- Treat every `await` as a point where actor state can change. Capture an operation identity or revalidate assumptions before committing a result.
- `Task.detached` intentionally drops inherited actor and task-local context. It is not a generic request to leave the main thread.
- Long computation and iteration must cooperate with cancellation. Propagate `CancellationError`; cancellation is not a user-facing service failure.
- End long-lived tasks and asynchronous sequences with the owner that created them. Check captures inside loops so a task does not retain its owner indefinitely.
- Hold delegate and other back-reference properties `weak` so the delegating object does not retain its owner into a cycle.
- `Combine`'s `assign(to:on: self)` retains `self` for the subscription's lifetime; assign to a published property through its projected value (`assign(to: &$property)`) or capture `self` weakly to avoid the cycle.

## Values crossing isolation

`Sendable` describes values safe to share across concurrency domains. Prefer immutable value types. Transfer identifiers or copied data instead of framework objects tied to a UI, persistence context, request, or delegate lifecycle.

Treat `@unchecked Sendable` as a manually maintained invariant: all mutable storage, including later additions, needs demonstrable synchronization. If that proof is absent, change the boundary rather than disabling the compiler's warning.

## Errors and callback bridges

- Preserve errors until a layer can recover, record diagnostics, or present an actionable message.
- Use `try?` only when every failure truly has the same intentional meaning as no value.
- Do not use `try!`, force unwraps, empty catches, or detached throwing work for external data and fallible operations.
- Error translation should retain the underlying cause for diagnostics while exposing domain language at presentation boundaries.
- A checked continuation bridge resumes exactly once on every path. Cancellation and callback registration need an explicit agreement; a continuation does not invent cancellation support.
- Completion handlers likewise complete once, including validation and cancellation paths.

## Evidence to collect

Exercise the concurrency behaviors that changed: cancellation during work, a newer request replacing an older one, repeated invocation, state mutation across suspension, child failure propagation, and a real error reaching the intended boundary. A happy-path return alone does not establish these contracts.

## Review questions

- Who owns each mutable value, and which actor may mutate it?
- Can a task outlive the feature, view identity, or object that created it?
- Can state become stale while suspended?
- Is a context-bound or non-`Sendable` object crossing isolation?
- Can any error path be reported as success?

## Authority

- [Swift concurrency](https://developer.apple.com/documentation/swift/concurrency)
