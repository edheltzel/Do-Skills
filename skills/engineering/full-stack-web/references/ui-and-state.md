# UI and state ownership

A React feature is easier to reason about when each value has one authority. Choose the narrowest owner that preserves navigation, persistence, sharing, and accessibility requirements.

## Ownership table

| Value or behavior | Authority |
|---|---|
| Shareable filter, sort, page, tab, or selected resource | URL path or search parameters |
| Authoritative read result | Runtime-valid route read: server `loader` when a runtime server exists, or a browser `loader`/`clientLoader` that calls the established API |
| Mutation result, submission state, and route revalidation | Runtime-valid route mutation: server `action` when a runtime server exists, or browser `action`/`clientAction` coordinating with the established API |
| Unsubmitted field value | Native form control or local form state |
| Disclosure, hover, focus, transient draft, or component-only interaction | Local component state |
| Client-only value shared across distant subtrees and not owned by the URL, route data, or a form | Existing client store, such as Zustand |
| Browser or operating-system subscription | A dedicated integration hook; consult [no-use-effect](../../no-use-effect/SKILL.md) for synchronization ownership |

Do not mirror loader data into local state or a client store for convenient access. If users can edit an authoritative value, model the editable draft separately and reconcile it after the mutation result. Compute derived values during render unless they have an independent lifecycle.

## React composition

Follow the component vocabulary already present in the repository. Prefer native semantics before introducing abstractions. When shadcn/ui or Radix primitives are installed:

- preserve the primitive's keyboard behavior, focus management, roles, and state attributes;
- use composition mechanisms such as `asChild` only with an element that can accept the required props and ref;
- keep controlled and uncontrolled ownership consistent with surrounding components;
- reuse established variants and tokens rather than creating a second styling dialect; and
- do not replace a semantic element with a visually similar `div`.

Component extraction is warranted when a boundary has a stable responsibility or repeated contract, not merely because a render block is long.

## Accessible interaction states

Every interactive path must work without a pointer and communicate the same state to assistive technology.

- Controls have semantic roles and accessible names.
- Labels, instructions, and errors are programmatically associated with their fields.
- Keyboard order follows the visual and task order; focus remains visible.
- Dialogs, menus, popovers, and disclosures open, close, and restore focus according to the installed primitive's contract.
- Disabled and busy behavior is distinguishable. A pending mutation prevents only unsafe duplicate work and retains useful status.
- Validation and server errors are announced or placed where focus and reading order expose them.
- Route transitions and error recovery move focus deliberately when the existing application does not already do so.
- Loading, empty, error, success, and optimistic states do not rely on color alone.

Use `aria-*` only to fill a semantic gap; it does not repair incorrect HTML or missing keyboard behavior.

## Tailwind and CSS compatibility

Inspect the installed Tailwind major version and build integration before using version-specific directives, configuration, or utility syntax. Reuse the project's tokens, class composition helper, responsive strategy, and dark-mode convention. Do not mix Tailwind v3 configuration patterns into v4 projects or assume v4 behavior in a v3 codebase.

Keep route/data ownership independent of styling. A loading skeleton, hidden panel, or optimistic treatment must reflect real route or component state rather than maintain a second copy of it.

## Client stores

Use an existing store only for genuinely shared client state that cannot be represented by URL state, route data, form/fetcher state, or a common component ancestor. Select only the needed slice, keep actions near the state they mutate, and avoid whole-store subscriptions that cause unrelated renders.

Persistence does not make a store authoritative for server data. Version or migrate persisted client state when the repository already treats its shape as durable, and define how it is reset after logout or identity change.

## Review questions

- Does every value have exactly one authoritative owner?
- Could a URL-owned value survive refresh, deep-linking, and back/forward navigation?
- Does a mutation use a handler valid for the deployed runtime and enforce protected rules at the server/API?
- Is a draft visibly distinct from the last confirmed server value?
- Can every control be named, reached, operated, and understood with a keyboard and assistive technology?
- Do pending, empty, error, success, and optimistic states follow one state machine rather than competing booleans?
- Does the styling use syntax and tokens supported by the installed toolchain?

## Related Atlas guidance

- [Routing and data authority](routing-and-data.md)
- [Testing and review](testing-and-review.md)
- [design-system](../../design-system/SKILL.md)
- [modern-css](../../modern-css/SKILL.md)
- [no-use-effect](../../no-use-effect/SKILL.md)
