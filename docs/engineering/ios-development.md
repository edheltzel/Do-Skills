# iOS Development

Install or refresh the skill:

```bash
npx skills add edheltzel/skills --skill=ios-development
npx skills update ios-development
```

## Purpose

`ios-development` is the native iPhone and iPad entry point for every Swift, SwiftUI, or UIKit implementation and review owned by an iOS/iPadOS target. It covers architecture and concurrency, SwiftUI with focused UIKit interoperation, accessibility, SwiftData, URLSession, Swift Testing, and optional Apple platform integrations. The skill loads only the references needed for the affected behavior.

## Platform gate

Use the skill only after the request or repository establishes ownership by an iOS or iPadOS target. Useful evidence includes the Xcode target and supported platforms, an iPhone/iPad scheme or destination, an `iphoneos` or `iphonesimulator` SDK, UIKit, or iOS app/extension configuration.

SwiftUI, Observation, SwiftData, URLSession, Swift Testing, actors, and `Sendable` are shared technologies and do not establish iOS ownership by themselves. Inspect the project, target settings, membership, scheme, and destination when the platform is ambiguous. Route a macOS target to [macos-swift-desktop](./macos-swift-desktop.md), even when it uses those shared APIs.
Every Swift, SwiftUI, or UIKit implementation or review inside a React Native or Expo native module must use this iOS skill when the affected code belongs to an iOS target, including a small change. Use [React Native and Expo](./react-native-expo.md) additionally only when the bridge/public API or behavior shared across iOS and Android is affected.

## Reference map

| Work in scope | Guidance |
| --- | --- |
| Architecture, actors, tasks, `Sendable`, cancellation, error flow | [Swift architecture and concurrency](../../skills/engineering/ios-development/references/swift-and-concurrency.md) |
| SwiftUI/UIKit composition, state, navigation, accessibility, rendering | [SwiftUI interface and accessibility](../../skills/engineering/ios-development/references/swiftui-interface.md) |
| SwiftData models, contexts, queries, isolation, schema evolution | [SwiftData persistence](../../skills/engineering/ios-development/references/swiftdata-persistence.md) |
| URLSession requests, status handling, retry, cache, files, background transfer | [URLSession networking](../../skills/engineering/ios-development/references/urlsession-networking.md) |
| Swift Testing expectations, arguments, parallelism, and async behavior | [Swift Testing](../../skills/engineering/ios-development/references/swift-testing.md) |
| WidgetKit, App Intents, HealthKit, CloudKit, and platform-specific animation | [Platform integrations and animation](../../skills/engineering/ios-development/references/platform-integrations-and-animation.md) |
| Driving the app on a simulator for runtime evidence (screenshots, logs, per-screen checks) | [Simulator verification](../../skills/engineering/ios-development/references/simulator-verification.md) |

See the complete router and delivery rules in the [skill contract](../../skills/engineering/ios-development/SKILL.md). After implementation and focused checks are complete, use [cleanup-swift](./cleanup-swift.md) for a holistic end-of-session Swift polish.

## Verification

A completed implementation includes recorded evidence for every required applicable contract:

- every affected app and extension target builds with a named scheme, configuration, SDK, and destination;
- changed observable behavior runs through a focused test or reproducible numbered device/simulator scenario;
- applicable error, cancellation, stale-result, persistence, networking, and migration boundaries are exercised;
- affected UI is checked with the relevant accessibility settings and technologies;
- app extensions, capabilities, entitlements, containers, target membership, and lifecycle wiring are inspected and exercised when involved.

To produce the runtime rows on a simulator, the [simulator-verification reference](../../skills/engineering/ios-development/references/simulator-verification.md) gives an XcodeBuildMCP-driven boot -> build -> install -> launch -> per-screen screenshot/log loop and folds device-only flows (Sign in with Apple, push, in-app purchases, camera, location, SwiftUI Text inline links) into matrix rows; it is MCP-gated, falling back to the literal build/test commands when XcodeBuildMCP is absent. Use the five literal row states `PASS`, `FAIL`, `BLOCKED`, `INCOMPLETE`, and `NOT APPLICABLE` in the [verification matrix](../../skills/engineering/ios-development/SKILL.md#evidence-first-verification). `PASS` means the named check ran at the required layer and held; `FAIL` means it ran and exposed an unmet contract. `BLOCKED` is limited to a named prerequisite demonstrably outside the repository. `INCOMPLETE` covers omitted or unsupported evidence and missing or broken repository-owned schemes, harnesses, fixtures, dependencies, target membership, entitlements/capabilities configuration, scripts, or setup unless evidence identifies a proven external owner. `NOT APPLICABLE` requires a scope reason and never substitutes for unavailable proof. Overall status is `PASS` only when every required applicable row passes; otherwise `FAIL` when any row fails; otherwise `BLOCKED` only when at least one row is externally blocked and every other required row passes; otherwise `INCOMPLETE`.

Review conclusions remain separate. Current line-anchored findings, including a no-findings result, do not replace builds, tests, runtime scenarios, or configuration evidence.

## Exclusions

The skill does not handle macOS app development, AppKit, notarization, desktop distribution, TestFlight or App Store Connect administration, signing and certificate operations, release automation, review appeals, phased releases, Android, Flutter, or JavaScript/TypeScript application work in React Native, Expo, and other cross-platform stacks. Every Swift/SwiftUI/UIKit change inside a React Native or Expo iOS module uses this iOS lens when target ownership is established; `react-native-expo` is additional only for the bridge/public API or shared iOS/Android behavior. Code inspection does not establish distribution readiness.
