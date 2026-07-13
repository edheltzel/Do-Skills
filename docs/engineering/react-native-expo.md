# React Native and Expo

`react-native-expo` is Atlas's cross-platform mobile engineering skill for React Native and Expo apps whose affected runtime is iOS, Android, or native mobile. It preserves the repository's toolchain, navigator, native-project ownership, backend authority, and verification harness rather than turning every mobile app into the same Expo shape.

## When Atlas selects it

Atlas requires both a native-mobile runtime and positive in-scope evidence: an explicit React Native or Expo request for iOS/Android/native mobile, a relevant app dependency such as `react-native`, `expo`, `expo-router`, `expo-dev-client`, or `expo-updates` tied to an affected native executable, matching native-mobile imports, or React Native/Expo configuration demonstrably used by the iOS/Android app.

Expo and Expo Router can target React DOM/browser/web; those names, dependencies, and configuration do not by themselves select the mobile skill. Expo web routes to [full-stack-web](full-stack-web.md) and its end-of-session cleanup routes to [cleanup-web](cleanup-web.md). React alone, JSX/TSX, Metro, generic mobile terminology, a testing library, or an `ios`/`android` directory without React Native wiring does not pass either framework gate. Every Swift, SwiftUI, or UIKit implementation or review owned by an iOS target—including a small React Native native-module change—must use [iOS development](ios-development.md); use `react-native-expo` additionally only for the bridge/public API or behavior shared across iOS and Android. Native Kotlin/Compose, Flutter, store administration, and a nonexistent mobile cleanup pass remain outside this skill.

## What Atlas classifies

The skill records three independent decisions:

| Axis | Cases | Consequence |
|---|---|---|
| Toolchain | Expo-enabled or bare React Native | Existing package, CLI, configuration, and native-build conventions stay in place. |
| Executable | Expo Go, a development build, or another local/release binary | Proof is valid only for native code and configuration compiled into that binary. |
| Native ownership | CNG/Prebuild-owned, checked-in/maintained, or unresolved | CNG changes config/plugins; maintained projects change native source; unresolved ownership stops native edits. |

Expo Go is a fixed playground app and is not production-grade. Custom native libraries or configuration require a development build or other new binary. In CNG, app config/plugins are maintained source and generated native directories are regeneration targets only after a complete recoverable inventory accounts for tracked, untracked, and ignored user work. In a checked-in native project, native directories are source and casual Prebuild can destroy customizations. `npx expo prebuild` is mutating, including package-level side effects; clean mode also requires exact authorization before deleting and regenerating native projects.

Expo Router is selected only when repository evidence establishes it or the user explicitly requests migration. An existing React Navigation tree is preserved. Route and search parameters identify navigation state but never become authoritative application records, authorization, or mutation validation; the established backend/API remains authoritative.

## Routing map

| Need | Atlas document |
|---|---|
| Runtime, native owner, Expo Router, React Navigation, deep links, route parameters | [Runtime and routing](../../skills/engineering/react-native-expo/references/runtime-and-routing.md) |
| State placement, API authority, caching, offline behavior, public configuration values | [State and data](../../skills/engineering/react-native-expo/references/state-and-data.md) |
| App config, CNG, Prebuild, config plugins, native modules, binary compatibility | [Configuration and native](../../skills/engineering/react-native-expo/references/configuration-and-native.md) |
| Components, platform splits, accessibility, lists, animation, performance | [Interface and accessibility](../../skills/engineering/react-native-expo/references/interface-and-accessibility.md) |
| Test layers, both-platform proof, local builds, EAS safety, delivery status | [Testing and delivery](../../skills/engineering/react-native-expo/references/testing-and-delivery.md) |
| Executable router | [React Native and Expo skill](../../skills/engineering/react-native-expo/SKILL.md) |
| Expo or Expo Router output for React DOM/browser/web | [Full-stack web](full-stack-web.md) |
| End-of-session cleanup for Expo web output | [Web cleanup](cleanup-web.md) |
| Swift/SwiftUI/UIKit implementation or review owned by an iOS target | [iOS development](ios-development.md) |

## Safety boundary

Local inspection, edits, focused tests, and repository-established local builds are permitted. A remote EAS build, update, submit, deployment, publishing, or credentials action requires explicit authorization for the exact project/account, action, platform, and applicable profile/channel/branch/environment. A general request to implement, prepare, release, or deploy is not enough.

Without authorization, Atlas prepares local changes and stops before upload or remote mutation. Store-console administration stays out of scope even if an EAS action is authorized. App config and client bundles are public surfaces, so credentials and server secrets never belong there.

## Verification result

Every required contract gets a row with its exact command or scenario, status, and observed evidence. Shared behavior needs separate iOS and Android proof; component tests cannot prove native behavior.

- **PASS**: every required applicable row ran at the required layer and passed.
- **FAIL**: at least one required check ran and demonstrated an unmet contract.
- **BLOCKED**: a named prerequisite demonstrably outside the repository blocked at least one row, all other required rows passed, and no row failed or remained internally incomplete.
- **INCOMPLETE**: any check was omitted, selected nothing, used the wrong binary/layer/platform, lacks evidence, or hit a missing or broken repository-owned scheme, harness, fixture, dependency, target membership, entitlement/capability configuration, script, or other setup. A missing prerequisite is blocked only when evidence proves an external owner.

Native/configuration changes need proof from a binary built after the change. Accessibility checks include VoiceOver and TalkBack plus applicable large-text, focus, announcement, non-color, and Reduce Motion behavior. Performance claims use representative release-mode evidence.

## First-party documentation

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
