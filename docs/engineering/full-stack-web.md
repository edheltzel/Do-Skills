# Full-Stack Web

`full-stack-web` is Atlas's integration skill for React DOM/browser/web features—including Expo and Expo Router web output—whose correctness spans routing, data authority, interface state, accessibility, and verification. It preserves the repository's router mode and deployed architecture instead of assuming every React Router project has the same server boundary.

## When Atlas selects it

Atlas first confirms that the affected runtime is React DOM, a browser, or web. It then requires positive React evidence: an explicit React/React Router request, an explicit Expo/Expo Router web request, a relevant `react`, `react-dom`, or `react-router` dependency, Expo/Expo Router tied to an affected web entry or build, a React-specific import in the affected files, or router configuration used by the web feature.

Expo and Expo Router identify a toolchain or router, not the runtime by themselves. File extensions and globs only help discover candidates: JSX/TSX, Tailwind, Vitest, Zustand, generic state work, and browser/server behavior are not enough on their own. Atlas does not route Solid, Preact, Qwik, Vue, Svelte, Angular, framework-neutral frontend work, React Native or Expo iOS/Android/native-mobile work, deployment-only tasks, React Flow, or Remix v2-specific maintenance here.
Only React Native or Expo work whose affected runtime is iOS, Android, or native mobile routes to [React Native and Expo](react-native-expo.md). Expo/Expo Router React DOM/browser/web output stays with this skill, and JSX/TSX alone remains non-evidence for both routes.

## What the skill decides

The skill first distinguishes four cases:

| Case | Data authority |
|---|---|
| Declarative Mode | Components own routing; the application's established client and server/API own data work. |
| Data Mode | Browser-bundled loaders/actions coordinate with the established server/API, which retains security and persistence authority. |
| Framework Mode with a deployed runtime server | Server loaders/actions may own request-time reads and mutations or delegate to existing server modules. |
| Framework Mode with `ssr: false` | Build-time loaders are limited by SPA/pre-render configuration; runtime work uses `clientLoader`/`clientAction` and an established API. |

Framework Mode alone does not demonstrate that a server exists in production. Atlas checks router configuration, `ssr`/`prerender`, scripts, adapters, server entry points, and hosting behavior. With `ssr: false`, `action` and `headers` exports are invalid, build-time rendering still occurs, and browser-only APIs cannot be required during the initial build render.

The same pass assigns one owner to each piece of state: URL state for shareable navigation, route data for authoritative reads, action/fetcher state for mutations, local state for component-only interaction, and an existing client store only for shared client state that has no narrower owner. Loader data is not copied into local state merely for convenience.

Accessible operation is part of the feature contract. Controls need semantic names and keyboard behavior; focus, pending, validation, empty, error, success, and optimistic states must remain understandable without a pointer or color alone.

## Routing map

| Need | Atlas document |
|---|---|
| Router/runtime classification, loaders, actions, forms, fetchers, revalidation, pre-rendering, and route boundaries | [Routing and data authority](../../skills/engineering/full-stack-web/references/routing-and-data.md) |
| State ownership, React composition, shadcn/Radix behavior, Tailwind compatibility, and accessibility | [UI and state ownership](../../skills/engineering/full-stack-web/references/ui-and-state.md) |
| Vitest, integration/E2E proof, review evidence, and completion status | [Testing and review](../../skills/engineering/full-stack-web/references/testing-and-review.md) |
| The executable skill router | [Full-stack web skill](../../skills/engineering/full-stack-web/SKILL.md) |
| React Native and Expo iOS/Android/native-mobile implementation or review | [React Native and Expo](react-native-expo.md) |
| End-of-session, propose-only web review | [Cleanup web](cleanup-web.md) |
| General behavior-first test design | [Behavioral testing](../core/behavioral-testing.md) |
| Component architecture and tokens | [Design system](design-system.md) |
| CSS and responsive layout | [Modern CSS](modern-css.md) |
| Effect and external-system ownership | [No useEffect](no-use-effect.md) |
| Type modeling | [TypeScript](typescript.md) |

## Verification result

The final report gives every required applicable check its own row: the exact command or scenario, row result, and observed evidence. The overall result is mechanical:

- **PASS** means every required applicable check ran and passed.
- **BLOCKED** means an external prerequisite prevented a required check, all other required checks passed, and no failure or internal omission exists.
- **INCOMPLETE** covers failures, unexecuted required checks, internal setup problems, missing evidence, or an incomplete check list.

Review findings remain separate from the verification result. Code inspection never counts as an executed test.

## First-party React Router documentation

- [Picking a mode](https://reactrouter.com/start/modes)
- [Single Page App](https://reactrouter.com/how-to/spa)
- [Pre-Rendering](https://reactrouter.com/how-to/pre-rendering)
- [Client Data](https://reactrouter.com/7.16.0/how-to/client-data)
- [Route Module](https://reactrouter.com/7.16.0/start/framework/route-module)
- [Framework Data Loading](https://reactrouter.com/start/framework/data-loading)
- [Data Mode Actions](https://reactrouter.com/start/data/actions)
