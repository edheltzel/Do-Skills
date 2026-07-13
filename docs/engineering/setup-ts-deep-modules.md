# Setup TS Deep Modules

Quickstart:

```bash
npx skills add edheltzel/skills --skill=setup-ts-deep-modules
```

```bash
npx skills update setup-ts-deep-modules
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/setup-ts-deep-modules)

## What it does

`setup-ts-deep-modules` wires [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
into a TypeScript repo so every package is a **deep module**: its public surface is its
**entry points** — the files at the package root — and everything in a subfolder is private.
The defining idea is that public-vs-private is decided by *depth*, not by a designated barrel:
any file in any subfolder is internal, so a package can expose several small entry points
(`index.ts`, `client.ts`, `server.ts`) and you never edit the config to add a folder.

## When to reach for it

Type `/setup-ts-deep-modules` — it's user-invoked.

Reach for it to enforce package boundaries and stop deep cross-package imports in a TS
monorepo. For the vocabulary behind "deep module," use
[codebase-design](../core/codebase-design.md); for Husky/Prettier commit hooks, use
[setup-pre-commit](../engineering/setup-pre-commit.md).

## Prerequisites

A TypeScript repo with packages under `src/packages/` or `packages/`. The skill installs
`dependency-cruiser` as a devDependency and writes a `.dependency-cruiser.cjs` at the root
(merging into any existing config rather than overwriting it).

## Four rules, and proof they bite

The config enforces four `error`-level rules: outside code may import only a package's entry
points; a package's own files import each other freely; tests exercise packages through their
entry points (never internals, not even their own); and no dependency cycles. The completion
criterion is not "config written" but **proof it bites** — the skill scaffolds an example
package, runs the boundary check to a pass, adds a deep import to make it *fail* with
`tests-through-entrypoints`, then reverts to a pass. A config that doesn't fail on a violation
is worthless, so it observes the failure before finishing. It also documents the convention in
a packages-folder `README.md` and points `CLAUDE.md`/`AGENTS.md` at it.

## Where it fits

The enforcement counterpart to [codebase-design](../core/codebase-design.md): codebase-design
is the vocabulary and principles, setup-ts-deep-modules makes a TS repo mechanically obey the
entry-point/interface split. Sits beside [setup-pre-commit](../engineering/setup-pre-commit.md)
as a run-once engineering setup. Imported and adapted from Matt Pocock's skills
(github.com/mattpocock/skills, MIT).
