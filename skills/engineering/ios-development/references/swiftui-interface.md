# SwiftUI Interface and Accessibility

Use this reference for iOS/iPadOS SwiftUI composition, Observation, UIKit representation, navigation, accessibility, and interface performance.

## State and lifetime

Choose storage from ownership and API availability:

| Relationship | Owning view | Receiving view |
| --- | --- | --- |
| Local value | `@State` | value, or `@Binding` when mutation is delegated |
| `ObservableObject` reference | `@StateObject` | `@ObservedObject` |
| Observation model on supported systems | `@State` | plain property; `@Bindable` only where bindings are required |
| Shared dependency | the environment mechanism already used by the app | read at the feature boundary |

Do not copy parent-owned input into `@State` unless the feature deliberately creates an independent local draft. Keep UI state and UI-facing model mutation on `@MainActor`. For asynchronous loads, tie replacement to the relevant identity, propagate cancellation, and prevent an earlier result from replacing newer state. Prefer `.task` (iOS 15+), optionally keyed by identity with `.task(id:)`, over `onAppear` plus a manual `Task`; it cancels automatically when the view disappears or the id changes, which a manually launched task does not.

## Composition, identity, and navigation

- Split views at responsibility, identity, or lifetime boundaries rather than at an arbitrary line count.
- Modifier order changes layout, rendering, hit testing, and gestures; review it as behavior.
- Give collections stable domain identity. Offsets are unsuitable when elements can move, appear, or disappear.
- Prefer concrete views and builders over routine type erasure. Do not use `.id()` as a refresh switch because it resets view-local identity.
- Keep expensive decoding, formatting, image preparation, filtering, and sorting out of frequently evaluated view bodies.
- Use lazy containers where the amount of scroll content justifies them, then measure real update and rendering costs.
- Represent navigation state explicitly when restoration, deep links, or multi-column iPad layouts require it. Exercise compact and regular widths, rotation, multitasking, and hardware keyboard paths that the feature supports.

## UIKit interoperation

Use a representable when UIKit provides a capability the SwiftUI surface does not. The coordinator owns delegate and callback plumbing. Update methods must be repeatable without duplicating observers or recreating costly objects. Make teardown, callback ownership, and retain-cycle prevention part of the wrapper's contract. Expose accessibility information from the represented control when SwiftUI cannot infer it.

## Accessibility contract

Prefer native controls because SwiftUI supplies baseline semantics for them. For changed UI, verify the actual experience rather than assuming modifiers are sufficient:

- Every interactive element exposes an accurate name, role, value, and action; custom controls provide the relevant accessibility actions.
- Decorative content is hidden from assistive technologies, while grouping preserves a useful reading order.
- Semantic text styles and flexible layouts remain usable at large accessibility text sizes without truncating essential content or actions.
- Meaning is never conveyed by color alone.
- The activation region is suitable for touch even when the visible glyph is small.
- VoiceOver, Voice Control, Switch Control, and Full Keyboard Access can reach the interactions relevant to the feature.
- Hints describe a non-obvious result instead of repeating the label or a standard gesture.
- When `accessibilityReduceMotion` is true, avoid large or depth-simulating movement and preserve both information and task completion.

## Performance findings

Anchor performance concerns to a mechanism that can be observed: unstable identity, broad observation invalidation, eager content creation, repeated expensive work, main-actor image processing, or costly visual effects in rapidly updating content. Do not infer a regression from syntax alone; profile when the mechanism or impact is uncertain.

## Evidence to collect

Use a named iPhone or iPad destination. Record affected navigation and state transitions, accessibility settings used, assistive technology behavior, Dynamic Type size, orientation or multitasking width, and the observed outcome. Keep runtime evidence separate from a code-review conclusion.

## Authority

- [SwiftUI accessibility fundamentals](https://developer.apple.com/documentation/swiftui/accessibility-fundamentals)
- [SwiftUI accessibility modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility)
- [Reduce Motion environment value](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion)
