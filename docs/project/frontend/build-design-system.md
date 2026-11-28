# Build a design system

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-build-design-system
```

```bash
npx skills update do-build-design-system
```

This skill runs the whole design system set, so install all six together:

```bash
npx skills add edheltzel/Do-Skills --skill=do-build-design-system --skill=do-component-docs --skill=do-design-system-boss --skill=do-migrate-design-system --skill=do-token-mapping --skill=do-ui-review
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-build-design-system)

## What it does

`do-build-design-system` builds a design system from the UI an app already ships, or one phase of it, such as extracting tokens, adding states to Button, replacing hardcoded colors with tokens, or starting a system. The app's own look is the source. It invents no colour, font, shadow, gradient or motion value the app does not already have, unless the person chose a design source and confirmed a sample.

## Example

```
/do-build-design-system add hover and disabled states to Button using only colors the app already ships
```

## When to reach for it

Type `/do-build-design-system`, or the agent reaches for it automatically when a task fits.

Reach for this when the system should be built from shipped UI, as a whole or as one phase. For moving screens onto an existing system's components, use [migrate-design-system](./migrate-design-system.md). A vague whole-app ask goes to [design-system-boss](./design-system-boss.md).

## Prerequisites

Scripts run from the repo root with node; read `--help` first. The app must be running (port 3000 here) so capture can hit it. `scripts/capture.mjs` and `scripts/pixdiff.mjs` need Playwright and a Chromium, which `scripts/find-chromium.mjs` finds or explains how to install. Notes, captures and scratch go under `.design-system/`, added to `.git/info/exclude` so they are never committed. The run cuts its own branch and never commits on the branch it started on.

## Baseline, decision, gate

Eight steps, each with a written done check. Ask nothing beyond framing: take the default, record it as `default (unanswered)`, and go on. Adding a name, a role or `aria-current` is a decision. Removing or restructuring semantics is a gate. A missing primitive is a gap row, never a workaround inside a surface.

- **Frame and baseline.** Write the complaint in the person's words, the first visible change, and the pilot flow. Record the start branch in `.design-system/start-branch`, which `land.mjs` refuses. Capture every surface in every state at 390 and 1280 before any edit. Capture refuses to start without `--writes` (or `--no-backend`).
- **Tokens are swaps, not new values.** Cluster raw smells (`#fff`, `rgb(`, `text-gray-500`, `p-[13px]`, `style={{ padding: 12 }}`) by role and run [token-mapping](./token-mapping.md) until every value is a role, a merge or a listed exception. Colour merges inside delta E OK 2 and spacing merges inside 2 px are decisions. Past tolerance, open one gate per cluster. Border width, weight and easing have no tolerance.
- **Components, then the pilot.** Build the most-used family end to end first. The text primitive and the small-text primitive ship in wave 1 beside Button, each documented with [component-docs](./component-docs.md) and shown before fan-out, because a core bug found after screens consume the system costs a sweep. Move only the pilot, read the codemod hunk by hunk, pixdiff the after captures, and run [ui-review](./ui-review.md).
- **Checks seen failing.** Copy `scripts/check-system.mjs` and `scripts/oklch.mjs` into the repo, plant one violation, see exit 1 naming the rule, then delete the plant. A ban ships with its check in the same change. The allowlist and ratchet only shrink.

## It's working if

- Token mapping reports zero gaps outside the exception list, and `pixdiff.mjs` at tolerance 0 reports 0% on every surface a swap touched.
- The check exits 0 on a clean clone, `--self-test` ends "all as expected", and every rule added this session was seen failing on its plant.
- Every capture difference traces to a decision or a gate. The five readiness audits (slot and prop parity, behaviour contracts, tone parity, pinned strings, hardest screens) are written to `.design-system/readiness.md` with a verdict. A family that is not ready stays on legacy.
- The handoff reports counts from the commands that produced them, offers the migration with its size, and does not start it.

## Where it fits

The build step of the design system set. [design-system-boss](./design-system-boss.md) routes vague whole-app asks here, [token-mapping](./token-mapping.md) and [component-docs](./component-docs.md) feed steps 3 and 4, [ui-review](./ui-review.md) checks the pilot, and [migrate-design-system](./migrate-design-system.md) takes over once the readiness audits hold. It stops at the handoff and offers the migration without starting it.
