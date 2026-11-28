# Migrate to a design system

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-migrate-design-system
```

```bash
npx skills update do-migrate-design-system
```

This skill needs `do-build-design-system` installed beside it (its glossary, readiness audits, capture, and pixel-diff scripts). Install both:

```bash
npx skills add edheltzel/Do-Skills --skill=do-migrate-design-system --skill=do-build-design-system
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-migrate-design-system)

## What it does

`do-migrate-design-system` moves an app onto a design system that already exists: a rollout, moving every screen onto the new components, or an adoption audit. The system is settled and behaviour stays unchanged, except for announced data-bug fixes. A missing token or component is a gap for the system's owner, never a workaround here.

Audit mode is the default. It writes only under `.design-system/`, which `.git/info/exclude` keeps out of every commit, cuts no branch, commits nothing, and ends with the inventory, the plan, and the offer of the full run with its size. Full mode starts only when the ask names the migration or the person accepted the offer (`Go, <budget>`). "Clean it up" and "fix it" are not clearance.

## Example

```
/do-migrate-design-system move the settings pages onto the existing component library
```

## When to reach for it

Type `/do-migrate-design-system`, or the agent reaches for it automatically when a task fits.

Reach for it when an app has to move onto a design system that already exists. For making the system, or for swapping raw values for tokens, use [build-design-system](./build-design-system.md).

## Prerequisites

Words are in `do-build-design-system/references/glossary.md`. Bans, widths, and voice come from the accepted `.design-system/taste.md`. The Never list in `do-build-design-system` holds for the coordinator and every worker. Run that skill's readiness audits first. No fan-out while a text or control primitive is missing, a gap is open, or the system's own check is red.

## Audit first, then parity

Scripts are in this skill's `scripts/`. From the repo root: `node <this skill>/scripts/<name>.mjs`. `legacy.mjs` is the exception: it is copied into the repo's `scripts/` so CI runs its ratchet. Captures and pixel diffs use `do-build-design-system/scripts/capture.mjs` and `do-build-design-system/scripts/pixdiff.mjs`. Capture installs `do-build-design-system/scripts/capture-guard.mjs` before the first navigation.

- **Roles.** Add `.design-system/` to `.git/info/exclude`. In full mode, use the named branch or cut one and write the start branch to `.design-system/start-branch` (`land.mjs` refuses that branch). Write `.design-system/roles.md` and append-only `.design-system/decisions.tsv`. The writer never grades itself. The verifier is a different agent.
- **Inventory.** `legacy.mjs --init-config --config .design-system/legacy.json`, point `legacyImports` and `systemImports` at the real modules, then `--inventory`. Exit 2 means a placeholder is left or no file was scanned. Audit mode stops and writes the plan. Full mode copies the script and config into `scripts/` and `--record`s `scripts/legacy-baseline.json` in its own commit.
- **Baselines, then fan-out.** Capture every surface, state, width, and theme before the first edit, with fixture data, a frozen clock, and a no-change control. No baseline, no parity claim. Never edit a harness, a baseline, or a threshold, or restructure a component to make a diff pass. One agent lands layout and providers. Hand-migrate the pilot with a verifier, write the codemod from that, diff it against the hand work, and run it twice. The second run changes nothing. Fan out only after that: one surface per worker, a MAY EDIT list, verified by another agent.
- **Land, delete, close.** `land.mjs` commits one verified surface at a time, then the system's check. Delete a module only when it has zero callers, in one change with its adapter and allowlist rows, and let the ratchet ban its path. Recapture at the final commit. Only verdicts at that commit count. Then run the correction pass in `references/correct.md`.

## It's working if

- `legacy.mjs --zero` exits 0 at the final commit (no legacy import, and no file mixing the system with legacy, whatever the baseline holds).
- Every raw or palette row `--inventory` still prints is a listed exception.
- Every surface has a `verified` verdict at that commit and the system's check exits 0.
- The correction pass in `references/correct.md` has run, and the report lists what was found and not fixed.

## Where it fits

The step after [build-design-system](./build-design-system.md): it starts only once that skill's readiness audits hold. [design-system-boss](./design-system-boss.md) runs it through its migrate playbook, and [ui-review](./ui-review.md) critiques the screens it moves.
