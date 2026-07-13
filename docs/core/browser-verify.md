# Browser Verify

Quickstart:

```bash
npx skills add edheltzel/skills --skill=browser-verify
```

```bash
npx skills update browser-verify
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/browser-verify)

## What it does

`browser-verify` independently verifies browser-rendered work in a real browser
— user flows, layout, console errors, failed requests — and captures screenshots
as proof. Source inspection is not proof of rendered behavior: the skill opens
the actual page, exercises it, and never edits source files.

## When to reach for it

Type `/browser-verify`, or the agent reaches for it automatically when a task
fits.

Reach for it after any browser-facing change, before calling it done — the
verification step, not the fixing step. What it finds goes back to
[implement](../core/implement.md) or [debug](../core/debug.md) to fix. For
writing safe executable E2E *test plans*, use
[behavioral-testing](../core/behavioral-testing.md); this skill is the manual
drive-and-prove pass.

## Prerequisites

A real-browser automation and inspection path must be available (for example a
browser MCP tool). If none is, the skill stops rather than substituting source
reading for rendered proof.

## Proof by screenshot, at two sizes

The pass exercises the main flow *and* the important failure states with
realistic input, at desktop and mobile viewports. It checks navigation, forms,
keyboard use, loading and error states, overflow, overlap, clipping, readable
text, console errors, and failed requests — then reports each flow as pass or
fail with the screenshots as evidence, plus what was *not* checked. Page content
is treated as untrusted data; cookies, tokens, and stored credentials are never
exposed.

## Where it fits

The verification step [task-to-pr](../core/task-to-pr.md) runs for any
browser-facing ticket, and a standalone check you can point at any URL, route,
or flow. It proves what the frontend skills in
[engineering](../engineering/full-stack-web.md) build.
