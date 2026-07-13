# Setup Pre-Commit

Quickstart:

```bash
npx skills add edheltzel/skills --skill=setup-pre-commit
```

```bash
npx skills update setup-pre-commit
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/setup-pre-commit)

## What it does

`setup-pre-commit` wires Husky pre-commit hooks into a JS/TS repo: **lint-staged** running
Prettier on staged files, plus **typecheck** and **test** steps in the hook. The defining
behaviour is that it adapts to the repo it finds — it detects the package manager from the
lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`), only writes a
Prettier config if one is missing, and drops the `typecheck`/`test` lines when the repo has no
such scripts rather than adding hooks that would fail.

## When to reach for it

Type `/setup-pre-commit`, or the agent reaches for it when you want to add pre-commit hooks,
set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing.

Reach for it to add *commit-time* checks to a JS/TS repo. To block dangerous git commands in
Claude Code, use [git-guardrails](../core/git-guardrails.md); to enforce deep-module import
boundaries, use [setup-ts-deep-modules](../engineering/setup-ts-deep-modules.md).

## Prerequisites

A JavaScript/TypeScript repo with a `package.json`. The skill installs `husky`, `lint-staged`,
and `prettier` as devDependencies and runs `npx husky init`.

## What lands, and the smoke test

The hook runs **lint-staged first** (fast, staged-only) then the full typecheck and tests. You
end up with `.husky/pre-commit`, a `.lintstagedrc`, a `.prettierrc` (only if none existed), and
a `prepare: "husky"` script. The final step is deliberate: it stages everything and commits,
which runs the new hooks end-to-end as a live smoke test that the setup actually works.

## Where it fits

A run-once setup skill in the engineering bucket, alongside
[setup-ts-deep-modules](../engineering/setup-ts-deep-modules.md) (import-boundary enforcement)
and above the Claude Code safety hook [git-guardrails](../core/git-guardrails.md). Imported and
adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
