# State and data

Keep navigation, interface state, cached server data, persisted device data, and backend authority distinct. Reuse the repository's established clients and stores instead of adding another state convention.

## Authority map

| Value | Preferred owner | Constraint |
|---|---|---|
| Current route, entity identifier, filter, or shareable presentation | Established navigator | Parameters are serializable input, not trusted domain data. |
| Server records and mutation results | Backend/API, represented by the existing data client/cache | Authorization, validation, conflict handling, and durable persistence remain server-side. |
| Draft input and transient interaction | Nearest screen or component | Do not globalize state merely to share it with one child. |
| Cross-screen client state with no server or route owner | Existing app store/context | Define lifetime, reset behavior, and persistence explicitly. |
| Device persistence or offline queue | Existing storage/data layer | Define schema, migration, ownership, reconciliation, and failure behavior. |
| Authentication material | Established secure credential/session boundary | Never place secrets in route parameters, logs, app config, or ordinary bundled constants. |

A route parameter may identify what to request. It cannot prove that the entity exists, that the current user may access it, or that a mutation is valid. Parse parameters at the route edge, issue the authoritative read, and render pending, missing, forbidden, error, retry, and success outcomes deliberately.

## Reads and mutations

Preserve the app's existing API client, cache, cancellation, retry, and error model. A complete data change has:

- one canonical cache key/identity for each server resource;
- cancellation or stale-result protection when navigation, search, or account context changes;
- explicit handling for transport failure and non-success application responses;
- mutation authorization and validation on the backend/API rather than only in the app;
- visible pending and failure states that do not manufacture success;
- cache invalidation, replacement, or reconciliation that makes the next read current.

Do not copy fetched data into local state simply to make it editable or convenient. For edits, keep an explicit draft derived from a known server version and define what happens when the source changes, the save fails, or a concurrent update wins.

## Offline and persistence

Offline support is a product contract, not the absence of a network error. Establish:

- which reads are allowed to be stale and how staleness is shown;
- which mutations may queue, their stable identifiers and ordering, and whether they are idempotent;
- how sign-out/account changes clear or partition persisted data;
- how conflicts, retries, permanent rejection, and partial synchronization surface to the user;
- how persisted schemas migrate and recover from incompatible or corrupt data.

The backend remains authoritative after reconnection unless the product explicitly defines another conflict policy. Never silently discard a failed queued mutation or display it as durable before acknowledgment.

## App and environment configuration

Values shipped in JavaScript, native resources, Expo app config, or update manifests are obtainable by app users. Public endpoint identifiers and feature configuration may be bundled; credentials and server-only secrets may not. Dynamic Expo app config can read build-time environment variables, but values emitted into public config or the client bundle are still public.

Resolved-config inspection is fail-closed. Treat the source as secret-bearing and use a pre-output filter or allowlist that emits only key paths and exposure classes; never run, display, paste, or preserve unfiltered output. Verification evidence contains no values or reversible/derived representations. If filtering cannot be guaranteed, report INCOMPLETE. Follow the full protocol in [Configuration and native ownership](configuration-and-native.md).

Finding a secret exposure does not authorize changing or revealing it. Record only the affected key path and exposure class; removal and rotation are separate remediation actions requiring explicit authorization for their exact scope.

Use the established environment/config boundary and validate required public configuration early. Missing configuration is a real failure; do not fall back to a production endpoint, another environment, or an empty credential.

## Verification

Test pure transforms and reducers without native infrastructure. Test data coordination through the repository's real client/cache boundary. For changed user journeys, prove valid, invalid, unauthorized, empty, stale, offline, retry, cancellation, and success cases that apply.

Component tests can establish rendered state transitions around a mocked external boundary. They cannot prove device networking, native persistence, secure credential storage, app lifecycle recovery, deep-link delivery, or platform-specific behavior. Exercise those contracts in the appropriate binary on both iOS and Android when shared behavior is affected.

## Official sources

- [React Native networking](https://reactnative.dev/docs/network)
- [React Native security](https://reactnative.dev/docs/security)
- [Expo Router URL parameters](https://docs.expo.dev/router/reference/url-parameters/)
- [Expo app configuration](https://docs.expo.dev/workflow/configuration/)
- [Expo environment variables](https://docs.expo.dev/guides/environment-variables/)
