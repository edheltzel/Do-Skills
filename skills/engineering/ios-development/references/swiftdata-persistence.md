# SwiftData Persistence

Use this reference for iOS/iPadOS SwiftData models, queries, context ownership, isolated mutation, schema evolution, or CloudKit-backed storage.

## Model and container ownership

The production `ModelContainer` defines the schema and storage configuration used by its contexts. Identify where it is created, which targets use it, and whether the store is local or synchronized before changing models.

- Declare `@Model` types `final`; the macro's generated conformances assume no subclassing, and a non-final model can fail to compile or behave incorrectly.
- Define attribute and relationship semantics deliberately: optionality, inverses, ownership, delete rules, uniqueness, original persisted names, and external storage all affect existing data.
- Establish relationships after model insertion when creation depends on a context. Avoid implicit related objects whose context and lifecycle are unclear.
- Align delete rules with relationship optionality and product ownership. Test deletion rather than trusting declaration-time validation.
- Save explicitly when an operation's completion promises durability; autosave is not an operation-level guarantee.

## Queries

`@Query` maintains view-facing results in step with its model context and is main-actor isolated. Give queries deterministic sorting where order matters, and constrain the fetch to what the screen needs. For paging, aggregation, large imports, or broad mutations, use an explicit fetch boundary rather than making the view own the workload.

Predicates and sort descriptors must be supported by the deployed SDK and persistent store. Capture external scalar values in a form the predicate can translate. Prefer identifiers over object-reference comparisons across a boundary. Inspect `fetchError` when correctness depends on knowing whether an empty result is genuine.

## Isolation

A persistent model is associated with a `ModelContext`; do not use model instances as values passed between actors or contexts.

- Give background storage work an isolated context through `@ModelActor` or the repository's equivalent owner.
- Transfer a `PersistentIdentifier` or immutable `Sendable` data, then fetch the model in the destination context.
- Create the model actor in the intended isolation domain. An actor declaration alone does not prove where expensive work begins.
- Keep broad fetches, transforms, and imports away from UI-owned execution; return only values the UI boundary needs.
- Batch work where practical and make cancellation and partial completion explicit for long operations.

## Schema evolution

Once a store can exist on a user's device, a model change has an upgrade contract.

- Keep the versioned schemas required by every supported starting version.
- Order schemas and migration stages so each supported transition has a path.
- Supply the migration plan to the actual production container; a declared but unused plan provides no upgrade behavior.
- Preserve a renamed property's stored identity with the framework's original-name support when data must survive the rename.
- Resolve existing duplicates before adding a uniqueness rule.
- In custom migration work, use types from the schema available to the corresponding migration phase.
- For CloudKit synchronization, first inspect iCloud capability, container selection, schema compatibility, and the constraints of the deployment version.

## Evidence to collect

Build every target that compiles the models. Verify fresh installation separately from upgrade behavior. For each supported starting schema, open a durable representative store with the production container configuration and demonstrate that records, relationships, identifiers, and required values survive. Include difficult fixtures such as duplicates, missing optional relations, and realistic data volume when the change affects them. An in-memory or newly created store cannot prove upgrade safety.

## Authority

- [SwiftData](https://developer.apple.com/documentation/swiftdata)
- [SwiftData concurrency support](https://developer.apple.com/documentation/swiftdata/concurrencysupport)
- [SwiftData Query](https://developer.apple.com/documentation/swiftdata/query)
