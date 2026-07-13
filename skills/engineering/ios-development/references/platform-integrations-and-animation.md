# Platform Integrations and Animation

Load only the relevant section when the iOS/iPadOS-owned code actually uses that integration. Availability, target membership, entitlements, containers, extension configuration, and lifecycle registration are part of behavior; inspect them before reporting a defect or claiming completion.

## WidgetKit

- Confirm the widget extension target, supported families, deployment version, and shared capabilities.
- Keep placeholders immediate and deterministic. Snapshots represent the requested context; timelines contain useful entries and a realistic reload policy.
- Treat system scheduling as a budgeted request, not a precise timer. Rendering must not depend on a network request completing in the widget.
- For app/widget shared data, verify matching App Group capability and identifier on both targets.
- Downsample large images before display and keep view work suitable for an extension's constrained runtime.
- Verify deep links and interactive controls from the widget surface. Widget and Live Activity updates need accessible descriptions as well as visual change.

## App Intents

- Model app actions and entities with stable identifiers and useful parameter/result semantics.
- Ensure required parameters have a resolvable value path, and handle entities that were removed or are no longer accessible.
- Restrict main-actor work to UI-owned resources; intent execution may occur outside the foreground app lifecycle.
- Pass durable identifiers or immutable values across persistence boundaries, not context-bound models.
- Verify discoverability, localization, supported system experiences, and extension membership on the actual deployment range.
- Do not expose an implementation-only intent as a user action unless that is intended.

## HealthKit

- Check that health data is available, configure the capability and usage descriptions, and request only types the feature needs.
- A successful authorization request means the request flow completed; it does not establish read access to every requested type.
- Protect health information in storage, transfer, logging, and UI. Handle data changed or removed outside the app.
- Bound sample queries and use suitable statistics queries for supported aggregates.
- Complete observer-query callbacks on every path, persist anchors by stream, stop retained queries, and register background delivery through the supported lifecycle.
- Verify units against each HealthKit quantity type and return UI mutation to the main actor.

## CloudKit

- Verify container identifiers, database scope, account-state behavior, iCloud capability, environment, and deployed schema.
- Treat CloudKit as transfer and synchronization around the app's data model, not as a full offline store by itself.
- Handle retry information, partial operation failures, and server-record conflicts explicitly. Avoid blind overwrite when the server changed.
- Use assets for large file content and batch operations where they match the workload.
- Give subscriptions stable identifiers. Notification delivery is a cue to fetch changes, so handlers must be repeatable.
- Verify custom-zone, sharing, permission, and acceptance behavior end to end when sharing is present.
- For SwiftData synchronization, also follow [`swiftdata-persistence.md`](swiftdata-persistence.md) and validate that the schema and migration plan are compatible with the configured store.

## Animation

- Animate a specific state change and keep model state consistent with the visible result when a gesture is interrupted or reversed.
- Use stable identity for transitions and geometry matching. Do not replace view identity merely to force animation.
- When a parent's geometry animates alongside a child, wrap the parent in `geometryGroup()` (iOS 17+) so child layout resolves against the grouped geometry instead of jumping.
- Specify custom springs with `duration` and `bounce` (iOS 17+) rather than mass, stiffness, and damping; reserve the physical parameters for UIKit or Core Animation bridging.
- When Reduce Motion is enabled, avoid large or depth-simulating movement and preserve the information, action, and final state through a quieter transition or immediate update.
- Do not make motion the only announcement of important change; expose corresponding text, value, or accessibility semantics.
- Profile costly masks, blurs, shadows, and high-frequency effects in the context where they update. Set an explicit `shadowPath` when animating a shadow so the system does not recompute the path from the layer's alpha every frame.
- Prefer system transitions when they already express the interaction.
- Widget and Live Activity animations follow their own platform limits and may be suppressed by the system. Keep them short, value-scoped, and correct when no animation occurs; on reduced-luminance displays, avoid relying on motion.

## Evidence gate

For each integration, record the affected target and deployment version, target membership, capability or entitlement artifact, container or identifier where relevant, lifecycle registration, and a focused runtime scenario. Cite review findings as `[FILE:LINE]`. If required configuration is unavailable for inspection, ask a bounded question or mark verification `BLOCKED/INCOMPLETE`; do not infer a defect or a pass from implementation code alone.

## Authority

- [WidgetKit](https://developer.apple.com/documentation/widgetkit)
- [App Intents](https://developer.apple.com/documentation/appintents)
- [HealthKit](https://developer.apple.com/documentation/healthkit)
- [CloudKit](https://developer.apple.com/documentation/cloudkit)
- [Animating widget and Live Activity data updates](https://developer.apple.com/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities)
- [Reduce Motion environment value](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion)
