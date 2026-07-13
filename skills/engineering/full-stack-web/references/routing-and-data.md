# Routing and data authority

A route may coordinate navigation, reads, mutations, revalidation, and recovery. It may claim server authority only when the deployed architecture provides a server at that boundary.

## Identify mode and runtime

| Case | Project evidence | Valid data boundary |
|---|---|---|
| Declarative Mode | `<BrowserRouter>`, `<Routes>`, and component routes | React Router supplies navigation. Follow the application's existing API/client pattern for data. |
| Data Mode | `createBrowserRouter`, `RouterProvider`, and route objects | `loader` and `action` code is browser code. It calls an established server/API for protected or persistent work. |
| Framework Mode with runtime server | Route modules/build tooling plus an actual deployed adapter, server entry, start command, or equivalent runtime proof | Server `loader` and `action` exports can own request-time work or delegate it to established server modules. |
| Framework Mode with `ssr: false` | Route modules with runtime SSR disabled; `prerender` determines generated paths | No React Router server exists at runtime. `clientLoader` and `clientAction` call the established API; permitted `loader` calls happen during the build. |

Do not infer a runtime server from Framework Mode alone. Confirm `react-router.config.*`, `ssr`, `prerender`, package scripts, deployment adapter, server entry, and host behavior. Preserve the detected architecture unless the requested feature cannot satisfy its contract within that architecture.

## Authority rules

### Declarative Mode

Declarative routes render components and manage navigation. Keep reads and mutations in the repository's existing client/API layer; do not introduce Data or Framework APIs solely because they exist.

### Data Mode

Data Mode loaders/actions are included in browser-delivered code. They may parse route inputs, initiate requests, redirect navigation, return display data, and coordinate revalidation. They must not contain secrets or become the final authority for identity, authorization, domain validation, or durable writes. The server/API enforces those invariants and returns deliberate errors/statuses.

A completed action normally causes loader revalidation. Use `<Form>` or `useSubmit` when the submission belongs to navigation/history; use a fetcher when the work should not navigate.

### Framework Mode with a runtime server

A server `loader` may authenticate, authorize, validate parameters, read protected services, and shape route data. A server `action` may parse the request, enforce authorization and domain rules, persist the mutation, and return or redirect with an intentional status. Existing service layers remain the domain authority when the project already has them.

Server loaders run for document requests and are reached through React Router during client navigation. Server-only code is excluded from the browser bundle. Route actions trigger revalidation of active loader data unless the project has a justified `shouldRevalidate` policy.

### Framework Mode with `ssr: false`

`ssr: false` disables the runtime React Router server but still performs build-time rendering:

- With no `prerender` configuration, the root route is rendered to the SPA HTML. Only the root route may export a build-time `loader`.
- With `prerender`, loaders are allowed on routes matched by generated paths and run while those paths are built.
- `action` and `headers` exports are invalid because no runtime server can execute them.
- Runtime reads and mutations belong in `clientLoader` and `clientAction`, which call an established API when authoritative data is involved.
- Routes rendered during the build must be SSR-safe; `window` and other browser-only globals cannot be required during initial render.
- Static hosting must serve the generated document or SPA fallback for valid application URLs.

A build-time loader does not provide fresh runtime authority. If a pre-rendered parent also serves non-pre-rendered children, ensure those children can obtain current parent data, usually through a `clientLoader`, or pre-render every required child path.

## Route-module boundaries

| Export or primitive | Boundary |
|---|---|
| `loader` | Server read with a runtime server; otherwise only an eligible build-time read under `ssr: false`. |
| `action` | Server mutation in Framework Mode with a runtime server; prohibited when `ssr: false`. In Data Mode, it is browser code coordinating with the API. |
| `clientLoader` | Browser read, either replacing a loader or combining browser data with `serverLoader()`. |
| `clientAction` | Browser mutation/coordinator; may call `serverAction()` only when that server action actually exists. |
| `HydrateFallback` | Temporary UI while initial client data completes, or root fallback content emitted for SPA build output. It is not an error boundary or runtime data authority. |
| `ErrorBoundary` | Recovery surface for the nearest useful route segment. It must distinguish expected route responses from unexpected failures. |
| `<Form>` / `useSubmit` | Mutation/load coupled to navigation semantics. |
| `useFetcher` / `fetcher.Form` | Route data work without navigation, such as row actions and inline updates. |

If `clientLoader.hydrate = true`, it runs during hydration. When server and client data are combined, use `serverLoader()` and provide `HydrateFallback` when the component cannot render until the client result arrives. Without a fallback, initial server and hydrated client results must remain compatible to avoid hydration errors.

## One coherent feature flow

For each changed route, make the following explicit:

1. The URL and route own the resource identity and shareable navigation state.
2. The runtime-valid loader obtains display data from the authoritative layer.
3. The component renders pending, empty, success, and recoverable error states.
4. The runtime-valid action validates and commits mutations at the authoritative layer.
5. The result redirects, updates fetcher state, or revalidates matched data intentionally.
6. A boundary catches failures at a recovery point useful to the user.

Avoid manual revalidation and broad `shouldRevalidate` suppression until an observed requirement shows the default behavior is wrong.

## Review questions

- Does deployment evidence support every server-only export?
- Can any browser-bundled handler expose a secret or bypass server/API enforcement?
- Do build-time and runtime reads have clearly different freshness expectations?
- Does the chosen form/fetcher behavior match the intended URL and history change?
- After a mutation, what mechanism makes the rendered data current?
- Is each fallback or error boundary placed where recovery is possible?

## First-party references

- [Picking a mode](https://reactrouter.com/start/modes)
- [Single Page App](https://reactrouter.com/how-to/spa)
- [Pre-Rendering](https://reactrouter.com/how-to/pre-rendering)
- [Client Data](https://reactrouter.com/7.16.0/how-to/client-data)
- [Route Module](https://reactrouter.com/7.16.0/start/framework/route-module)
- [Framework Data Loading](https://reactrouter.com/start/framework/data-loading)
- [Data Mode Actions](https://reactrouter.com/start/data/actions)
