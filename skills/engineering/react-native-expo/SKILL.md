---
name: react-native-expo
description: >-
  Build and review React Native or Expo apps for iOS, Android, or native mobile.
  USE WHEN the request or repository evidence confirms the affected runtime
  through React Native wiring or Expo evidence tied to an iOS/Android
  executable or configuration. Expo/Expo Router React DOM/browser/web work
  belongs to full-stack-web; JSX/TSX is non-evidence. Preserve the toolchain,
  navigation, native-project ownership, API authority, and test harness. Every
  iOS-targeted Swift/SwiftUI/UIKit change also uses ios-development. NOT FOR
  native Kotlin/Compose, Flutter, store administration, or unauthorized remote
  EAS operations.
---

# React Native and Expo

Use this skill for React Native and Expo app work whose affected runtime is iOS, Android, or native mobile and whose correctness spans both platforms. Establish the app, runtime, navigation owner, and native-project owner from repository evidence before changing code.

## Positive evidence gate

Apply this skill only when the affected runtime is iOS, Android, or native mobile and at least one in-scope signal exists:

- the request explicitly names React Native, Expo, Expo Router, or an Expo service for an iOS/Android or native-mobile app;
- the affected app manifest depends on `react-native`, `expo`, `expo-router`, `expo-dev-client`, or `expo-updates`, and repository evidence ties that app to an affected native-mobile executable;
- an affected file imports a React Native or Expo API used by the iOS/Android app; or
- Expo app configuration or React Native native-project wiring is demonstrably used by the affected iOS/Android app.

Expo or Expo Router names, dependencies, and configuration do not select this skill unless the affected runtime is native mobile. React alone, JSX/TSX, a Metro config, generic mobile language, a test library, or an `ios`/`android` directory without React Native wiring is only a discovery hint. If the affected runtime is React DOM, a browser, or web, use [full-stack-web](../full-stack-web/SKILL.md) and use [cleanup-web](../cleanup-web/SKILL.md) for an end-of-session cleanup. If no positive native-mobile signal survives inspection, do not use this skill.

## Runtime and ownership classification

Determine the affected runtime before mobile routing. React DOM/browser/web output—including Expo and Expo Router web output—belongs to `full-stack-web`, not this skill. Continue here only for iOS/Android or native-mobile behavior, then record all applicable axes below; they are not interchangeable.

| Axis | Classification | Deciding evidence | Ownership rule |
|---|---|---|---|
| Toolchain | Expo-enabled | `expo` and Expo config or modules belong to the app | Preserve Expo CLI/config conventions already in use. |
| Toolchain | Bare React Native | React Native app wiring exists without an Expo-managed toolchain | Preserve the native build, dependency, and configuration entry points; do not introduce Expo. |
| Executable | Expo Go | The task explicitly targets Expo Go and uses only its fixed bundled native capabilities | Treat it as a learning playground, not production-grade proof. |
| Executable | Development build | A custom debug binary includes the app's native libraries, commonly through `expo-dev-client` | Rebuild after native-library or native-configuration changes. |
| Native projects | CNG/Prebuild-owned | `ios`/`android` are absent or ignored and app config/plugins are the maintained source | Change config/plugins; treat generated native files as regeneration output only after the complete preservation preflight in [Configuration and native](references/configuration-and-native.md) accounts for extant user work. |
| Native projects | Checked-in and maintained | `ios`/`android` are tracked and contain maintained customizations | Treat native files as source; never run Prebuild casually. |
| Native projects | Unclear | Evidence conflicts or generation ownership is undocumented | Stop native/config edits and report the ownership question as unresolved. |

A production or release binary is separate from the development executable. Native code, native dependencies, permissions, icons, plugins, or other native configuration require a newly built binary before they can be verified.

## Routed references

| Work to resolve | Read | Required outcome |
|---|---|---|
| Runtime ownership, Expo Router, React Navigation, deep links, route structure | [Runtime and routing](references/runtime-and-routing.md) | The existing navigation system and native ownership model remain authoritative. |
| Route parameters, API authority, state placement, caching, offline behavior | [State and data](references/state-and-data.md) | Each value has one owner; backend APIs retain authorization, validation, and persistence authority. |
| App config, secrets, CNG, Prebuild, config plugins, native modules, binary compatibility | [Configuration and native](references/configuration-and-native.md) | Configuration changes land in the repository's actual source of truth and receive binary proof when required. |
| Components, platform differences, accessibility, lists, animation, performance | [Interface and accessibility](references/interface-and-accessibility.md) | Shared behavior is operable and observed on both iOS and Android. |
| Focused tests, simulators/devices, builds, EAS safety, delivery evidence | [Testing and delivery](references/testing-and-delivery.md) | Every applicable contract has an executed check and mechanical status. |

Load only the references required by the affected contracts.

## Scope seams

- Route Expo or Expo Router work whose affected runtime is React DOM, a browser, or web to [full-stack-web](../full-stack-web/SKILL.md), and route its end-of-session cleanup to [cleanup-web](../cleanup-web/SKILL.md), even when a monorepo shares JavaScript or TypeScript with native mobile.
- Every Swift, SwiftUI, or UIKit implementation or review owned by an iOS target must use [ios-development](../ios-development/SKILL.md), including small React Native native-module changes.
- Use this skill additionally for an iOS native module only when the bridge/public API or behavior shared across iOS and Android is affected; the iOS implementation and verification remain owned by `ios-development`.
- Native Android Kotlin/Compose and Flutter ownership are outside this skill; do not treat shared product behavior as permission to edit those stacks.
- There is no `cleanup-mobile` route. Do not substitute a web or Swift cleanup skill for a native-mobile React Native cleanup pass.

## Remote-operation safety gate

Local inspection, edits, focused tests, and explicitly local builds may proceed when they preserve the repository's toolchain. Before any remote EAS build, update, submit, deployment, publishing, or credentials action, obtain explicit authorization for the exact action and target in the current conversation. Authorization names the project/account, action, platform where relevant, and profile, channel, branch, or environment where relevant.

A general request to implement, test, prepare, release, or deploy is not exact authorization. Without it, prepare configuration and report the blocked remote action; do not upload source, create a remote build, publish an update, submit a binary, alter credentials, or administer a store. App Store Connect and Google Play Console administration remain out of scope even after an EAS action is authorized.

## Completion and verification

Use one row per applicable contract, splitting iOS and Android whenever behavior, binary, device, or scenario differs.

| Contract | Required proof |
|---|---|
| Routing and state | Focused navigation/deep-link and data-boundary scenario in the established navigator |
| JavaScript behavior | Repository-native unit, component, or integration test that observes the changed contract |
| Native/configuration behavior | Newly built appropriate binary plus a focused runtime scenario |
| iOS behavior | Named simulator/device, app binary, and observed outcome |
| Android behavior | Named emulator/device, app binary, and observed outcome |
| Accessibility | VoiceOver and TalkBack plus applicable large-text, focus, announcement, contrast/non-color, and Reduce Motion checks |
| Performance | A representative release-mode scenario and measured observation when performance is affected |
| Remote delivery | Exact authorization and the observed remote result, only when requested |

Report `Contract | Exact command or scenario | Status | Evidence` with these predicates:

- **PASS**: the named check ran, exercised the contract at the required layer, and passed;
- **FAIL**: the check ran and demonstrated an unmet contract;
- **BLOCKED**: a named prerequisite demonstrably outside the repository prevented the check from running;
- **INCOMPLETE**: the check was omitted, selected nothing, used the wrong binary/layer, hit a repository-owned setup problem, or lacks evidence. Missing or broken repository schemes, harnesses, fixtures, dependencies, target membership, entitlements/capabilities configuration, scripts, or setup are incomplete unless evidence proves an external owner.

Overall status is **PASS** only when every required applicable row is PASS; **FAIL** when any required row is FAIL; **BLOCKED** only when at least one row is externally blocked and every other required row is PASS; otherwise it is **INCOMPLETE**. `NOT APPLICABLE` requires a scope reason and cannot replace unavailable proof. Component tests cannot prove native behavior. A shared iOS/Android change cannot pass with evidence from only one platform.

## Gotchas

- Expo Go has a fixed set of native libraries and is not a production-grade development environment.
- Expo and Expo Router can target React DOM/browser/web; the package name never overrides the affected runtime when selecting this skill.
- Adding or changing native libraries or native configuration requires a development build or other new binary; refreshing JavaScript is insufficient.
- Expo app config is embedded for runtime use except documented filtered fields. Keep secrets out of it and out of client bundles.
- In CNG, app config and config plugins own native customization. Casual edits to generated `ios` or `android` files are lost on regeneration.
- `npx expo prebuild` mutates native directories and can also change package scripts and dependencies; `--clean` deletes and recreates native projects. Do not run it merely to inspect configuration.
- Checked-in native projects reverse the ownership rule: maintained native files are source, and Prebuild can overwrite intentional customizations.
- Expo Router is not a default migration target. Preserve an established React Navigation tree unless migration is explicitly requested.
- Route and search parameters select navigation state; they are not trusted or authoritative application data.
- EAS Update cannot deliver native code, native dependencies, permissions, or other changes that require a binary.

## Official sources

- [React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code)
- [React Native accessibility](https://reactnative.dev/docs/accessibility)
- [React Native testing overview](https://reactnative.dev/docs/testing-overview)
- [React Native performance](https://reactnative.dev/docs/performance)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo app configuration](https://docs.expo.dev/workflow/configuration/)
- [Expo Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- [Expo Router core concepts](https://docs.expo.dev/router/basics/core-concepts/)
- [Expo Router URL parameters](https://docs.expo.dev/router/reference/url-parameters/)
- [Migrating from React Navigation](https://docs.expo.dev/router/migrate/from-react-navigation/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
