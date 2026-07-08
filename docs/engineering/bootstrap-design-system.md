# Bootstrap Design System

Quickstart:

```bash
npx skills add edheltzel/skills --skill=bootstrap-design-system
```

```bash
npx skills update bootstrap-design-system
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/bootstrap-design-system)

## What it does

`bootstrap-design-system` generates two artifacts for a project in one PR: a
portable `DESIGN.md` at the root — the framework-agnostic source of truth for the
brand — and a live style-guide page that renders every section of it at real size
using the project's own primitives. The defining constraint is discovery over
invention: it reads the brand tokens, primitives, and written rules that already
exist and writes them down, and if a token it needs isn't there (no shadow scale,
no spacing system) it stops and asks rather than making one up.

## When to reach for it

You invoke this by typing `/bootstrap-design-system` — the agent won't reach for
it on its own. Pass overrides as `key:value` arguments (e.g.
`route:/style-guide mood:"calm editorial" name:"Acme" framework:Astro`); anything
you don't pass is auto-detected from the project.

Reach for it once per project, to stand up the design documentation an
already-built codebase lacks. It's a run-once setup, not a per-component tool —
for building the components afterward, use [design-system](./design-system.md).

## Prerequisites

A project with brand tokens already defined somewhere (a CSS custom-property file,
`tailwind.config`, `theme.ts`) and component primitives to render the page with.
It writes `DESIGN.md` to the git root and adds a route, so it needs a working tree
it can branch from and a build/dev command to verify against.

## The phased loop

The skill runs strict phases, in order:

- **Phase 0 — Resolve inputs.** Discover project name, framework, styling system,
  and style-guide route; restate them before starting.
- **Phase 1 — Investigate.** Read existing tokens, site config, primitives, and
  any brand rules baked into `CLAUDE.md`/docs. Write nothing yet.
- **Phase 2 — Write `DESIGN.md`.** The VoltAgent Stitch 9-section schema: theme,
  palette + contrast math, typography, components, layout, depth, do's/don'ts,
  responsive behaviour, and an agent-prompt guide. Hex values and numeric sizes
  only — never class names or framework component names, so the file stays
  portable across agents and stacks.
- **Phase 3 — Build the style-guide page.** A visual mirror of the spec, built
  from the project's own primitives so it breaks visibly if a primitive drifts.
- **Phase 4 — Verify.** Build, curl the route for HTTP 200, grep for all nine
  section anchors and content markers.

## Where it fits

A run-once setup skill that produces the spec [design-system](./design-system.md)
then implements against, and whose rules assume the native techniques in
[modern-css](./modern-css.md). Everything it writes is meant to be handed to any
coding agent on any stack — the `DESIGN.md` is deliberately framework-agnostic.
