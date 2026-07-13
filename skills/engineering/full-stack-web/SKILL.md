---
name: full-stack-web
description: >-
  Build and review React DOM/browser/web features across React Router or Expo
  Router web routing, data, UI, accessibility, and verification. USE WHEN the
  request or repository evidence confirms React web through React/React Router
  or Expo evidence tied to browser/web output. JSX/TSX, globs, generic frontend
  state, browser/server behavior, Vitest, Tailwind, Zustand, and ambiguity are
  non-evidence. NOT FOR Solid, Preact, Qwik, Vue, Svelte, Angular,
  framework-neutral frontend work, deployment, React Flow, Remix v2-only work,
  or React Native/Expo iOS/Android/native-mobile work; only that native-mobile
  work routes to react-native-expo.
globs: ["*.tsx", "*.jsx", "react-router.config.*"]
---

# Full-Stack Web

Use this skill when a React DOM/browser/web feature—including Expo or Expo Router web output—crosses route, data, interface, and verification boundaries. Keep the repository's established router mode, server/API design, component system, and test harness unless the request requires a change.

## React evidence gate

Apply this skill only after confirming that the affected runtime is React DOM, a browser, or web and finding at least one positive signal:

- the request explicitly calls for React, React Router, or Expo/Expo Router browser or web work;
- the relevant package manifest depends on `react`, `react-dom`, or `react-router`, or combines Expo/Expo Router with an affected web entry or build;
- an in-scope file imports a React or React Router API, or an Expo Router route used by the browser/web output; or
- the project contains React Router configuration or Expo Router web configuration used by the feature.

Expo or Expo Router identifies a toolchain or router, not the runtime by itself; require React DOM/browser/web evidence before selecting this route. A `.jsx`/`.tsx` suffix, a matching glob, JSX-like syntax, Tailwind, Vitest, Zustand, loaders/actions as generic concepts, or ordinary browser/server work does not establish React. Exclude Solid, Preact, Qwik, Vue, Svelte, Angular, framework-neutral UI/CSS/test/state tasks, React Native and Expo iOS/Android/native-mobile work, deployment-only work, React Flow, and Remix v2-specific maintenance.
Only React Native or Expo work whose affected runtime is iOS, Android, or native mobile belongs to [react-native-expo](../react-native-expo/SKILL.md); JSX/TSX alone remains non-evidence for either route.

## Workflow routing

| Work to resolve | Read | Deliverable |
|---|---|---|
| Router mode, deployed runtime, route data, forms, fetchers, revalidation, and boundaries | [Routing and data](references/routing-and-data.md) | A route flow whose handlers match the runtime that actually exists |
| Component composition, accessible interaction, styling compatibility, and state ownership | [UI and state](references/ui-and-state.md) | One authoritative owner per value and complete interaction states |
| Test selection, browser proof, verification status, or diff review | [Testing and review](references/testing-and-review.md) | Evidence for each applicable contract and a strict overall status |

Load only the references needed for the request.

## Gotchas

- Framework Mode describes build and route-module capabilities; it does not prove a React Router server is deployed. Inspect configuration, scripts, adapter, server entry, and hosting shape.
- `ssr: false` removes the React Router runtime server, not build-time rendering. Route rendering must remain safe outside the browser during the build.
- In Data Mode, route loaders and actions execute from the browser bundle. They coordinate requests; the real server/API remains authoritative for credentials, authorization, validation, and persistence.
- A `HydrateFallback` is temporary hydration UI. It neither creates server authority nor substitutes for error, empty, pending, or success states after hydration.
- Never copy authoritative loader data into component state or a client store merely to make it easier to access.

## Router/runtime decision

Classify the project from code and deployment evidence before choosing a handler:

| Case | Evidence | Runtime rule |
|---|---|---|
| Declarative Mode | `<BrowserRouter>`, `<Routes>`, `<Route>` | Routing is component-driven; use the application's existing data client and server/API contracts. |
| Data Mode | `createBrowserRouter`, `RouterProvider`, route objects | Loaders/actions run in the browser bundle and call the established server/API for authoritative work. |
| Framework Mode with a runtime server | Route modules and the React Router build plus a deployed server/adapter (`ssr: true` by default or equivalent evidence) | Server `loader`/`action` exports may perform or delegate request-time reads and mutations. |
| Framework Mode without a runtime server | Route modules with `ssr: false`, optionally with `prerender` | Runtime reads/writes use `clientLoader`/`clientAction` and an established API; eligible `loader` calls are build-time only. |

For the complete export and pre-render rules, use [Routing and data](references/routing-and-data.md).

## Scope seams

This skill integrates, rather than duplicates, narrower engineering guidance:

- [design-system](../design-system/SKILL.md) for component architecture and design tokens;
- [modern-css](../modern-css/SKILL.md) for CSS and responsive layout;
- [no-use-effect](../no-use-effect/SKILL.md) for synchronization with external systems;
- [typescript](../typescript/SKILL.md) for type design and TypeScript mechanics;
- [react-native-expo](../react-native-expo/SKILL.md) for React Native and Expo iOS/Android/native-mobile implementation and review; Expo/Expo Router React DOM/browser/web output remains here;
- [behavioral-testing](../../core/behavioral-testing/SKILL.md) for general behavior-first test design; and
- [cleanup-web](../cleanup-web/SKILL.md) for a propose-only end-of-session review.

## Completion contract

A complete result identifies the router mode and deployed runtime, assigns read and mutation authority to valid handlers, preserves security on the server/API boundary, gives each UI value one owner, covers accessible pending/error/empty/success behavior, and verifies the changed contracts at the narrowest adequate levels.

The report contains one row per required applicable check with its exact command or scenario, observed result, and evidence. Overall status is:

- **PASS** only when every required applicable check ran and passed;
- **BLOCKED** only when an external prerequisite prevented an otherwise runnable required check; or
- **INCOMPLETE** for any failure, omitted required check, internal setup problem, or unresolved evidence gap.

Review findings are reported separately from verification status.

## First-party React Router references

- [Picking a mode](https://reactrouter.com/start/modes)
- [Single Page App](https://reactrouter.com/how-to/spa)
- [Pre-Rendering](https://reactrouter.com/how-to/pre-rendering)
- [Client Data](https://reactrouter.com/7.16.0/how-to/client-data)
- [Route Module](https://reactrouter.com/7.16.0/start/framework/route-module)
- [Framework Data Loading](https://reactrouter.com/start/framework/data-loading)
- [Data Mode Actions](https://reactrouter.com/start/data/actions)
