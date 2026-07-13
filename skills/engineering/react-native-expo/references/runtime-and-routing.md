# Runtime and routing

Classify the executable, native-project owner, and navigator independently. A repository can use Expo modules with checked-in native projects, or use CNG while running either Expo Go or a development build.

## Runtime evidence

| Question | Evidence to inspect | Decision |
|---|---|---|
| Is this React Native or Expo? | Affected manifest dependencies, app entry/imports, Expo app config, native React Native wiring | Continue only after the positive evidence gate passes. |
| What is executing? | Launch script, installed client/binary, `expo-dev-client`, build profile, simulator/device artifact | Record Expo Go, a development build, or another local/release binary. |
| Who owns native projects? | Tracked/ignored `ios` and `android`, app config, plugins, native customizations, build scripts | Record CNG/Prebuild-owned, checked-in/maintained, or unresolved. |
| Who owns navigation? | `expo-router` entry/plugin and app route directory, or the established React Navigation container/tree | Preserve the detected navigator. |

Expo Go is a fixed native app with a fixed library set. It is useful as a playground, but it is not production-grade proof and cannot exercise native code or configuration that is absent from its binary. A development build is the app's custom debug binary and must be rebuilt whenever its native contents change.

## Navigator ownership

Do not infer Expo Router from Expo itself. Use Expo Router only when the project already has its entry/plugin and file-based route tree, or when the user explicitly requests a migration. If React Navigation owns the tree, retain its container, screen registration, linking configuration, route names, and parameter conventions.

A migration between navigators is an architectural change, not incidental feature work. It must preserve deep links, initial routes, nested histories, modal presentation, back behavior, state restoration, analytics, and platform-specific navigation. The Expo migration guide also identifies cases, such as custom path/state transforms, that may not fit Expo Router.

## Expo Router contracts

When Expo Router is established:

- route files live in the project's configured app directory, and non-route modules stay outside it;
- `_layout` files own navigator/layout composition and shared providers at their level;
- `index` represents the containing path's default route;
- route groups organize or disambiguate routes without adding a URL segment;
- dynamic segments and search parameters are serializable navigation input;
- links and imperative navigation use repository-established typed routes when enabled;
- direct launch and external deep links receive the same loading, authorization, missing-data, and error handling as in-app navigation.

Before changing route structure, enumerate affected incoming URLs, relative links, nested layouts, tab/stack history, and redirects. Moving a file can change a public deep-link contract even when the screen component is unchanged.

## Parameter boundary

Route and search parameters identify navigation state. They may select an entity, filter, tab, or presentation mode, but they are not authoritative records, permissions, prices, roles, or mutation payloads. Parse and validate their shape, then read authoritative data from the established backend/API or local authoritative store. Do not pass complete mutable domain objects through navigation to avoid a real read.

Prefer local route parameters for a screen's own work. Global parameter subscriptions can update background screens and cause unnecessary rendering. Keep URL-worthy state serializable and shareable; keep transient component interaction outside the route.

## Platform boundaries

Use `Platform` or `Platform.select` for small differences. Use `.ios.*` and `.android.*` modules when behavior or composition meaningfully diverges; use `.native.*` only for behavior shared by iOS and Android but separate from web. A shared interface does not imply identical platform implementation or remove the need for proof on both platforms.

## Verification

Applicable routing proof includes:

- cold launch to the intended initial route;
- direct deep link into each changed path with valid, invalid, stale, and unauthorized identifiers as applicable;
- forward, back, tab, modal, and restored-state behavior affected by the change;
- route-driven API loading, pending, empty, error, retry, and refreshed success states;
- the same changed shared journey on iOS and Android.

Record the exact binary and device/simulator used. A component test of a screen or mocked router cannot prove native linking, history, presentation, or platform back behavior.

## Official sources

- [Expo Router core concepts](https://docs.expo.dev/router/basics/core-concepts/)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)
- [Expo Router layouts](https://docs.expo.dev/router/basics/navigation-layouts/)
- [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/)
- [Expo Router URL parameters](https://docs.expo.dev/router/reference/url-parameters/)
- [Migrate from React Navigation](https://docs.expo.dev/router/migrate/from-react-navigation/)
- [React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code)
