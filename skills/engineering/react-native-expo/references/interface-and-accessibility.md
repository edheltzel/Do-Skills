# Interface, accessibility, and performance

Preserve the app's established component system and platform conventions. Shared React code is valuable only when it keeps each platform's behavior legible, accessible, and measurable.

## Interface contract

Every affected screen accounts for applicable loading, empty, error, retry, disabled, validation, success, offline, and stale states. Keep state changes visible without depending on color, animation, or transient toast feedback alone. Preserve safe areas, system bars, keyboard avoidance, focus, text input behavior, back navigation, and gesture conflicts on both platforms.

Prefer React Native primitives and existing components that already encode semantics and interaction. Use `Pressable` or the repository's accessible control abstraction rather than attaching press behavior to a visually convenient container without a role, name, state, and focus behavior.

## Platform differences

Use `Platform`/`Platform.select` for small differences and `.ios.*`/`.android.*` files for meaningful divergence. A `.native.*` module may share mobile behavior while keeping it out of web. Avoid a growing mesh of inline platform branches that obscures either implementation.

The shared contract may have platform-specific realization. Validate keyboard, modal, navigation, safe-area, font, shadow/elevation, permission, and system-control behavior independently. An iOS screenshot is not Android evidence, and an Android component test is not iOS evidence.

## Accessibility contract

For every affected interaction, verify:

- an appropriate accessible name, role, state, and value;
- a hint only when the result is not clear from name and role;
- a usable focus order and focus transition after navigation, modal changes, errors, and destructive actions;
- dynamic status and error announcements using the platform-appropriate live-region or accessibility announcement behavior;
- labels and errors associated with inputs, without placeholder-only identification;
- operability and comprehension with VoiceOver and TalkBack;
- layout and meaning under the app's supported text scaling and large-text settings;
- meaning that does not depend on color alone and remains legible in supported appearance/contrast modes;
- a Reduce Motion path that preserves state and spatial meaning without unnecessary motion;
- activation regions and spacing that remain usable without overlapping neighboring actions.

React Native accessibility APIs differ across iOS and Android. A prop present in the component tree does not prove how either screen reader announces or focuses it. Observe the actual native accessibility tree and interaction.

## Lists and rendering

Use the repository's virtualized list for unbounded collections. Stable keys represent item identity; pagination and refresh preserve current items and user position; empty/loading/footer states are separate; row rendering does not start hidden network work without lifecycle and cancellation ownership.

Avoid optimizing by reflex. First identify whether the bottleneck is JavaScript work, UI-thread work, layout/image cost, list windowing, navigation transition, or network/data latency. Measure the representative interaction in a release-mode binary because development mode adds substantial overhead. Record device, OS, build mode, dataset, interaction, and metric so the result is reproducible.

For changed performance-sensitive behavior, inspect both JS and UI responsiveness. Confirm that memoization or caching lowers measured work without introducing stale props, retained data, or incorrect identity. Animation changes require interruption/cancellation behavior and a Reduce Motion alternative, not only a smooth happy path.

## Proof levels

| Contract | Minimum evidence |
|---|---|
| Pure layout/state choice | Focused component behavior test plus visual/runtime inspection where platform rendering matters |
| Accessible name/role/state | Component assertion and VoiceOver/TalkBack observation |
| Focus, keyboard, modal, gesture, safe area, native control | Runtime scenario on each affected platform |
| List smoothness, animation, startup, transition | Representative release-mode measurement on each affected platform |
| Platform-specific module | Focused test/build and runtime behavior on the platform that resolves it; both platforms when shared callers changed |

A component test runs in JavaScript and cannot establish native rendering, accessibility services, gestures, keyboard behavior, platform module resolution in a built app, or frame performance. Record those gaps as INCOMPLETE unless the required runtime proof runs.

## Official sources

- [React Native accessibility](https://reactnative.dev/docs/accessibility)
- [React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code)
- [React Native performance](https://reactnative.dev/docs/performance)
- [React Native optimizing FlatList configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [React Native testing overview](https://reactnative.dev/docs/testing-overview)
