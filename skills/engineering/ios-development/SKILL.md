---
name: ios-development
description: "Build and review native iPhone and iPad software with Swift, SwiftUI, UIKit interop, Swift concurrency, SwiftData, URLSession, and Swift Testing. USE WHEN any Swift/SwiftUI/UIKit implementation or review is owned by an iOS or iPadOS target, including small React Native native-module changes. Route macOS work to macos-swift-desktop and final Swift cleanup to cleanup-swift. Use react-native-expo additionally only for a native module's bridge/public API or shared iOS/Android behavior. NOT FOR release operations, Android, Flutter, or JavaScript/TypeScript cross-platform app layers."
---

# iOS Development

Use this skill only after establishing that the affected code belongs to an iOS or iPadOS target. It is a compact router: load the references required by the task, preserve the repository's established design, and verify observable behavior on the affected targets.

## Target ownership gate

Evidence of iOS/iPadOS ownership includes an Xcode target with the matching supported platforms, an iPhone/iPad scheme or destination, an `iphoneos` or `iphonesimulator` SDK, UIKit usage, or configuration tied to an iOS app or extension. Shared Swift APIs do not decide the platform: SwiftUI, Observation, SwiftData, Foundation networking, Swift Testing, actors, and `Sendable` also appear elsewhere.

If ownership is unclear, inspect the project or package, scheme, target settings, file membership, and destination before routing. Use `macos-swift-desktop` for a macOS target, including one built with shared Swift frameworks.

## Scope boundaries

- In scope: every Swift, SwiftUI, or UIKit implementation or review owned by an iPhone/iPad app or iOS/iPadOS extension target, regardless of change size or whether the target is hosted by React Native or Expo.
- After implementation and focused checks succeed, route an end-of-session holistic Swift polish to `cleanup-swift`.
- Out of scope: AppKit, Mac-specific app lifecycles, notarization, and desktop distribution; TestFlight and App Store Connect administration; signing and certificate operations; release automation and phased release management; Android, Flutter, and JavaScript/TypeScript application work in React Native, Expo, or other cross-platform stacks.
- A React Native or Expo iOS native-module change must use this skill for its Swift/SwiftUI/UIKit implementation, review, and iOS verification, including a small change. Use [react-native-expo](../react-native-expo/SKILL.md) additionally only when the bridge/public API or behavior shared across iOS and Android is affected.
- A code review is not evidence that an app is ready for distribution.

## Routing

| Affected surface | Load |
| --- | --- |
| Module boundaries, ownership, actors, tasks, `Sendable`, cancellation, errors | [`references/swift-and-concurrency.md`](references/swift-and-concurrency.md) |
| SwiftUI or UIKit composition, state, navigation, accessibility, rendering | [`references/swiftui-interface.md`](references/swiftui-interface.md) |
| SwiftData models, contexts, queries, isolation, schema changes | [`references/swiftdata-persistence.md`](references/swiftdata-persistence.md) |
| URLSession requests, status handling, retries, caching, downloads, background transfer | [`references/urlsession-networking.md`](references/urlsession-networking.md) |
| Swift Testing assertions, arguments, concurrency, async behavior, coverage | [`references/swift-testing.md`](references/swift-testing.md) |
| WidgetKit, App Intents, HealthKit, CloudKit, or platform-specific animation | [`references/platform-integrations-and-animation.md`](references/platform-integrations-and-animation.md) |
| Driving the app on a simulator for runtime evidence (screenshots, logs, per-screen checks, human-verification flows) | [`references/simulator-verification.md`](references/simulator-verification.md) |

Load more than one reference when the changed behavior crosses those boundaries; do not load unrelated framework guidance.

## Delivery contract

A completed change:

- follows the existing feature, dependency, construction, and test seams unless the request explicitly changes them;
- matches the Swift language mode, deployment target, and API availability of every affected target;
- gives mutable state an explicit owner and isolation domain, preserves cancellation, and prevents stale asynchronous results from winning;
- handles recoverable failures at a layer able to retry, record, or present them instead of manufacturing success;
- keeps affected interfaces meaningful and operable with VoiceOver, large Dynamic Type, non-color cues, suitable activation regions, keyboard/focus behavior when applicable, and Reduce Motion;
- inspects capabilities, entitlements, target membership, lifecycle registration, and container identifiers before asserting that an integration is configured correctly;
- uses the repository's existing build and test entry points and reports only evidence actually observed.

## Evidence-first verification

Implementation completion and review findings are independent results. Record one matrix row for every applicable contract, splitting rows whenever targets, destinations, commands, fixtures, or scenarios differ.

To produce the Observable-behavior, Failure-boundary, Accessibility, and Platform-configuration rows on a simulator, [`references/simulator-verification.md`](references/simulator-verification.md) gives an XcodeBuildMCP-driven boot -> build -> install -> launch -> per-screen screenshot/log loop, and folds device-only flows (Sign in with Apple, push, IAP, camera, location, SwiftUI Text inline links) into `BLOCKED`/`PASS` matrix rows. It is MCP-gated: when XcodeBuildMCP is absent, fall back to the literal build/test commands in the matrix below — those remain canonical.

| Contract | Required applicability | Executed check | Result | Evidence |
| --- | --- | --- | --- | --- |
| Compilation | Every affected app and extension target | Literal build command with scheme, configuration, SDK, and destination | `PASS`, `FAIL`, `BLOCKED`, `INCOMPLETE`, or `NOT APPLICABLE` | Exit status and result bundle or relevant diagnostic |
| Observable behavior | Every implementation change | Focused test identifier and command, or reproducible numbered device/simulator scenario | Same five-state set | Expected and observed result |
| Failure and boundary behavior | Changes involving errors, cancellation, stale results, networking, persistence, or migration | Focused test or scenario for each boundary | Same five-state set | Observation showing the boundary ran |
| Accessibility | Every affected interface | Named device/simulator checks for each applicable accessibility contract | Same five-state set | Feature, configuration, and observed outcome |
| Platform configuration | Changes involving app extensions, capabilities, entitlements, containers, or background work | Configuration inspection plus focused runtime scenario on each affected target | Same five-state set | Artifact inspected and runtime outcome |

Use the five row states literally. `PASS` means the named check ran at the required layer and the contract held. `FAIL` means it ran and demonstrated an unmet contract. `BLOCKED` means a named prerequisite demonstrably outside the repository prevented the check from running. `INCOMPLETE` means a required check was omitted, lacks evidence, or could not run because repository-owned infrastructure or setup is missing or broken. Missing or broken schemes, harnesses, fixtures, dependencies, target membership, entitlements/capabilities configuration, scripts, and repository setup are `INCOMPLETE` unless evidence identifies a proven external owner. `NOT APPLICABLE` requires a scope reason; it cannot stand in for unavailable infrastructure.

Overall status follows this precedence: `PASS` only when every required applicable row is `PASS`; otherwise `FAIL` when any required row is `FAIL`; otherwise `BLOCKED` only when at least one row is externally blocked and every other required row is `PASS`; otherwise `INCOMPLETE`. Rows justified as `NOT APPLICABLE` do not affect the overall status. An unavailable device or destination is blocked only when evidence shows the prerequisite and its owner are outside the repository; a broken scheme, target configuration, or repository setup is incomplete.

A review may report current, line-anchored findings or no findings. Neither result replaces the matrix. Before version-gated advice, establish the Swift language mode and iOS deployment target. For each finding, read the complete enclosing declaration, cite `[FILE:LINE]`, describe a concrete failure mode, and distinguish verified defects from unanswered target-membership or configuration questions.

## Gotchas

- A shared Swift import never proves iOS target ownership.
- Actor isolation permits reentrancy at every suspension point; recheck state that must still be current after `await`.
- URLSession can complete normally for an HTTP error status; transport completion is not application success.
- SwiftData model instances belong to a model context and should not be used as actor-transfer values.
- Swift Testing runs tests concurrently unless constrained; serialized scheduling does not turn suite instances into shared fixtures.
- An unavailable simulator, device, or other prerequisite is `BLOCKED` only when it is named and demonstrably outside the repository. Missing or broken repository schemes, harnesses, fixtures, dependencies, target membership, entitlements/capabilities configuration, scripts, and setup are `INCOMPLETE`, not external blockers.
- Animation correctness includes a path that respects Reduce Motion without hiding state changes.

## Examples

**Implement an API-backed iPad screen**

Load the concurrency, interface, networking, and testing references. Establish the app target and deployment range first; then verify the screen on an iPad destination, including replacement/cancellation behavior and relevant accessibility settings.

**Review a SwiftData schema update**

Load the persistence reference and the concurrency reference if isolation changed. Inspect the container and migration wiring, then require an upgrade test from representative existing stores before calling the change complete.

**Inspect a widget interaction**

Load the integrations reference and the interface reference. Verify extension membership, capabilities, timeline or intent execution, deep linking, and accessible behavior on the widget target rather than inferring them from app code.
