# Testing, builds, and delivery

Verification must exercise each contract at the layer where a plausible defect is observable. Preserve the repository's test runner, simulator/device workflow, native build entry points, and delivery configuration.

## Proof ladder

| Contract | Narrowest adequate proof |
|---|---|
| Parser, mapper, reducer, selector, validation helper | Focused unit test |
| Screen rendering and JavaScript interaction | Focused component test through user-visible text and accessibility queries |
| API/cache coordination, persistence adapter, navigation-state integration | Focused integration test at the real app boundary, minimizing mocks |
| Deep linking, native navigation, permissions, native modules, secure storage, lifecycle, keyboard, gestures, accessibility services | Appropriate app binary on the affected simulator/emulator or device |
| Shared mobile behavior | The changed scenario on both iOS and Android |
| Performance or release-only behavior | Representative release-mode binary and measurement |
| Native/configuration change | A binary built after the changed native input, then runtime proof |

React Native component tests execute JavaScript in Node.js. They cannot prove the iOS or Android code behind a component, native module integration, binary configuration, or device behavior. Treat them as one layer, not a substitute for native proof.

Tests defend observable behavior rather than implementation text, hook calls, snapshots, or internal props. A focused command that selects zero tests is INCOMPLETE even if it exits successfully.

## Platform verification

Name the exact app/binary, build mode, OS, simulator/emulator/device, and scenario. Split rows when platform outcomes or prerequisites differ. Shared code requires iOS and Android proof because platform implementations, accessibility services, lifecycle, layout, permissions, navigation, and native dependencies differ.

For an interface change, include VoiceOver and TalkBack plus applicable text scaling, focus, dynamic announcement, non-color meaning, and Reduce Motion checks. For a native/config change, first prove that the installed binary postdates the change. Expo Go is not valid proof for custom native code or configuration.

When performance is affected, measure a representative release-mode journey with a realistic dataset. Development-mode responsiveness is diagnostic information, not release performance evidence.

## Local build boundary

Use the repository's existing local build and test commands. Do not replace Expo with bare-native commands or vice versa, do not run Prebuild merely to make a build pass, and do not create a second harness. If the native-project owner is unresolved, configuration generation and native edits are INCOMPLETE until ownership is established.

A local build may still require signing, native SDKs, simulator images, devices, or credentials. Missing external infrastructure can be BLOCKED; an incorrect script, broken dependency install, stale generated project, or skipped setup inside the repository is INCOMPLETE or FAIL according to whether a check actually ran.

## Prebuild and sensitive-evidence gates

Resolved-config inspection can pass only when filtering or allowlisting occurred before any tool output and the evidence contains key paths and exposure classes only. Never place config values or reversible/derived representations in commands, stdout, stderr, logs, artifacts, prompts, chat, or the evidence table. If safe pre-output filtering cannot be established, the row is INCOMPLETE.

Any Prebuild-based proof requires a repository-evidenced native ownership classification; a verified complete, recoverable snapshot and inventory of existing `ios` and `android` contents including ignored and untracked files; migration of every intended manual change to maintained config/plugin/native source; explicit current authorization for the exact deletion when `--clean` is used; and a post-generation comparison against the full baseline. The comparison must account for native and package-level additions, changes, and deletions before maintained inputs and runtime behavior are verified.

Missing, uncertain, or unverified Prebuild preflight is repository-owned INCOMPLETE, not BLOCKED, even if generation or a later build exits successfully. `Generated` never substitutes for preservation evidence or authorizes deletion of user work.

Apply these safety outcomes without substituting a later successful command:

| Condition | Required outcome |
|---|---|
| A resolved config might contain a secret and no pre-output filter/allowlist is proven | Do not inspect or emit it; record only the affected key path and `UNKNOWN`/`SECRET_EXPOSURE` as supportable; status INCOMPLETE. |
| Any Prebuild preflight element is missing—including ownership, full ignored/untracked coverage, recoverability, migration, preservation, or exact `--clean` deletion authorization | Do not run Prebuild; status INCOMPLETE. This is not the external-prerequisite BLOCKED predicate used for remote EAS or unavailable infrastructure. |
| Post-generation comparison finds unexplained modification or loss, including an ignored or untracked path | Do not continue to a build. Restoration from the snapshot is mandatory even when generation was authorized: restore the unexpected loss, reconcile the maintained source, repeat the comparison, and then verify both maintained inputs and runtime. Prior authorization never accepts the loss or waives either verification. |

## Remote EAS safety

The following operations require exact, current user authorization before execution:

- remote EAS Build or any workflow that uploads source and creates a hosted build;
- EAS Update, republish, rollout, channel/branch mutation, or any other publication;
- EAS Submit, auto-submit, or upload to a store service;
- credential inspection, generation, mutation, synchronization, or deletion;
- EAS deployment or any other remote publishing action.

Authorization must identify the action and target: project/account, platform where relevant, and profile, branch, channel, rollout, environment, or destination where relevant. Do not broaden authorization from preview to production, Android to iOS, one profile/channel to another, build to submit, or configuration to execution.

Without exact authorization, stop before the first remote side effect. Local edits and a command preview may continue; report the remote row as BLOCKED only when user authorization is the sole external prerequisite and every other required row passes. Otherwise the overall result is INCOMPLETE.

EAS Update is limited to compatible non-native JavaScript and assets. A native dependency, permission, plugin, native code, or runtime-incompatible change requires a new binary. Publishing an otherwise eligible update still requires authorization.

Store administration—including listing metadata, pricing, legal/compliance forms, review responses, phased release controls, and console management—remains out of scope. Do not perform it or imply that a successful EAS build/submit proves store readiness.

## Mechanical result

Report every required applicable check:

| Contract | Exact command or scenario | Status | Evidence |
|---|---|---|---|
| `<observable contract>` | `<focused target and platform>` | `PASS`, `FAIL`, `BLOCKED`, or `INCOMPLETE` | `<observed output, assertion, artifact, or exact prerequisite>` |

Status predicates:

- **PASS** — the named check ran at the required layer and the contract held.
- **FAIL** — the check ran and the contract did not hold.
- **BLOCKED** — a named external prerequisite outside the repository prevented execution.
- **INCOMPLETE** — omitted or zero-selected check, wrong layer/binary/platform, internal setup issue, missing evidence, or unresolved applicability.

Compute the overall status without judgment calls:

| Overall | Predicate |
|---|---|
| **PASS** | Every required applicable row is PASS. |
| **FAIL** | At least one required row is FAIL. |
| **BLOCKED** | At least one row is externally BLOCKED, every other required row is PASS, and none is FAIL or INCOMPLETE. |
| **INCOMPLETE** | Any other state, including missing rows or evidence. |

Review findings are separate from this result. Inspection can identify risk but never changes an unexecuted check to PASS.

## Official sources

- [React Native testing overview](https://reactnative.dev/docs/testing-overview)
- [React Native running on device](https://reactnative.dev/docs/running-on-device)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Local app development](https://docs.expo.dev/guides/local-app-development/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [Expo app signing credentials](https://docs.expo.dev/app-signing/app-credentials/)
