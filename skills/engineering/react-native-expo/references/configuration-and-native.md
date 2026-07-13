# Configuration and native ownership

Native changes must land in the repository's actual source of truth and be verified in a binary that contains them. Expo-enabled does not automatically mean CNG-owned, and checked-in native projects do not automatically mean bare React Native.

## Ownership decision

| Evidence | Classification | Safe change surface |
|---|---|---|
| `ios`/`android` are absent or intentionally ignored; app config and plugins define native customization | CNG/Prebuild-owned | App config, config plugins, package dependencies, and maintained generation inputs |
| `ios`/`android` are tracked and carry intentional customizations or native targets | Checked-in/maintained | Native projects plus established config/dependency tools; Prebuild only as an explicitly adopted migration |
| React Native wiring exists without an Expo toolchain | Bare React Native | Existing native projects, autolinking, build settings, and repository scripts |
| Signals conflict or generated files are tracked accidentally | Unresolved | Inspection only until ownership is established |

Do not choose a workflow from labels such as "managed" or "bare" alone. Use tracked files, ignore rules, scripts, plugins, native customizations, and build behavior.

## Resolved-config inspection is fail-closed

Expo app config participates in native generation, Expo Go loading, and update manifests. Most resolved values are available at runtime through `Constants.expoConfig`; documented fields are filtered, but the safe rule is that app config and client bundles are public.

- Never put credentials, private keys, signing material, server secrets, or privileged tokens in app config or `extra`.
- Do not import raw app config into app code; use the processed runtime config API for intentionally public values.
- Build-time environment selection does not make emitted values secret.

Treat every resolved config as potentially secret-bearing until a safe inspection proves otherwise. Before executing any resolver or config-inspection tool, establish a filter or allowlist that consumes the raw data internally and emits only the key path and one exposure class: `PUBLIC_RUNTIME`, `NATIVE_BUILD_INPUT`, `FILTERED`, `SECRET_EXPOSURE`, or `UNKNOWN`. The filter must operate before stdout, stderr, logs, artifacts, prompts, chat, or clipboard output; never run, display, paste, or retain an unfiltered resolved config.

Verification evidence contains key paths and exposure classes only. It contains no values or reversible/derived representations of values. If pre-output filtering cannot be guaranteed, stop and report the inspection as INCOMPLETE. If inspection identifies a secret exposure, record only its key path and `SECRET_EXPOSURE`; removal and rotation are separate remediation actions requiring explicit authorization for their exact scope. Never expose the value while requesting that authorization.

## CNG and Prebuild

In CNG, app config and config plugins are maintained definitions; generated native projects are output. Native customization belongs in a documented config field, a library-supplied plugin, or a focused local plugin. A manual edit under generated `ios` or `android` is incomplete because regeneration can erase it.

`npx expo prebuild` is a mutating command. It creates native directories and can modify package scripts and dependencies; clean mode deletes and recreates native directories. Do not run Prebuild for discovery, validation, or convenience, and do not run it against maintained checked-in native projects without an explicit migration decision.

Before any Prebuild invocation, including non-clean generation, the preflight must establish all of the following:

- **Native ownership:** classify the project as CNG/Prebuild-owned, checked-in/maintained, bare React Native, or unresolved from repository evidence. The word `generated` is not permission to discard content or evidence that no user work exists.
- **Complete recoverable baseline:** inventory and snapshot the full existing `ios` and `android` trees, recording absence where applicable and including tracked, untracked, and ignored files rather than relying on Git status. Keep the recoverable snapshot outside the mutation surface; verify its inventory, content coverage, and readability before continuing. Include every package manifest, lockfile, or script file that the selected generation command can mutate.
- **Maintained ownership of every intended change:** identify manual native customizations and migrate every change intended to survive into its maintained owner before generation—app config or config plugins for CNG, or maintained native source/automation for checked-in projects. Preserve unrelated native user work.
- **Certain preservation:** account for every existing native path and intended mutation. If contents, ownership, snapshot completeness, recoverability, migration, or preservation is uncertain, do not run Prebuild; report INCOMPLETE.

Clean generation has an additional gate: obtain explicit current-conversation authorization for `--clean` and the exact native directories it will delete. Authorization does not waive the inventory, recovery, migration, or preservation gates and does not permit deletion of newly discovered user work.

After generation, compare the complete resulting native and package-level state with the preflight baseline, including paths that were ignored or untracked. Explain every addition, modification, and deletion; restore unexpected loss from the snapshot before proceeding. Then verify that the maintained config/plugin/native inputs—not incidental generated edits—express the intended change and that a newly built binary demonstrates it at runtime.

## Checked-in native projects

When native projects are maintained source:

- preserve Xcode/Gradle project structure, build variants, schemes, signing boundaries, and existing dependency integration;
- make platform changes in the native project or established project automation;
- inspect both platform implementations for a shared library or configuration change;
- do not introduce app config/plugins as a second owner unless the request explicitly adopts CNG.

Every Swift, SwiftUI, or UIKit implementation or review owned by an iOS target uses [ios-development](../../ios-development/SKILL.md), regardless of size. Native Kotlin/Compose implementation is outside this skill. Use this reference for the React Native bridge/public API and shared app contract, not as replacement platform guidance.

## Libraries, configuration, and binaries

JavaScript can call only native modules compiled into the installed app. Adding a native library, changing a config plugin, permission, entitlement, manifest, app delegate/application hook, icon, splash asset, scheme, or other native property requires a newly built binary before testing. Expo Go cannot absorb those changes because its native contents are fixed.

A development build is the normal custom debug executable for an Expo app. A release/distribution binary is still required for contracts that differ in release mode, signing, production entitlements, update configuration, or store packaging. Reusing an old development build after native inputs change is invalid evidence.

EAS Update can deliver compatible non-native JavaScript and assets to an existing runtime. It cannot deliver native code, native dependencies, permissions, or a runtime-incompatible change. Changing native code requires a new runtime version and binary under the project's existing update policy.

## Configuration proof

For each changed platform, record:

1. the maintained input changed (native source or config/plugin);
2. the generated or checked-in native result contains the intended setting;
3. the installed binary was built after that change;
4. the runtime scenario demonstrates the behavior on iOS and Android where applicable.

Inspection without a new binary is INCOMPLETE for a native/configuration contract. A missing simulator, device, signing prerequisite, or externally managed capability is BLOCKED only when it is genuinely outside the repository and every other required check passes.

A resolved-config proof row contains only key paths and exposure classes from the pre-output filter. A Prebuild proof row must identify the ownership classification, complete recoverable baseline, preservation/migration result, explicit clean authorization when applicable, and post-generation comparison. Missing or unverified preflight evidence is INCOMPLETE, never BLOCKED, even when generation or a build succeeds.

## Official sources

- [Expo app configuration](https://docs.expo.dev/workflow/configuration/)
- [Expo Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- [Expo config plugins](https://docs.expo.dev/config-plugins/introduction/)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Install Expo modules in an existing React Native project](https://docs.expo.dev/bare/installing-expo-modules/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
