# Frontend

Engineering skills for frontend.

## Installation

For any coding agent that supports [Agent Skills](https://agentskills.io):

```bash
npx skills add edheltzel/Do-Skills
```

Install one skill by exact name (`icm-grill` is unprefixed; the rest use `do-`):

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

## Skills

| Skill | Description |
|-------|-------------|
| [`do-astro`](./do-astro/) | Skill for building with the Astro web framework. |
| [`do-cleanup-web`](./do-cleanup-web/) | End-of-session cleanup pass for TypeScript, React, and web code. |
| [`do-design-system`](./do-design-system/) | Build accessible, themeable UI components, and when asked, capture the project's brand into DESIGN.md plus a live style-guide page. |
| [`do-modern-css`](./do-modern-css/) | Teaches agents to write modern CSS using native features instead of legacy hacks, workarounds, and JavaScript. |
| [`do-no-use-effect`](./do-no-use-effect/) | Prevent unnecessary React `useEffect` usage by steering code toward derived state, event handlers, memoization, `key`-based resets, `useSyncExternalStore`, and framework or query-library data APIs. |
| [`do-perf`](./do-perf/) | The full measure → fix → report loop for Electron and web apps (measure the real production build, find the cause, fix it, re-measure the same way, and write an HTML report) via Playwright and Chromium CDP: a repeatable A/B harness, Blink style-invalidation traces, and a React commit probe that name causes at file:line, with every report figure taken from harness JSON — use when asked to profile, speed up, slim down, find memory leaks, benchmark before and after, or produce a performance report, and do not pick a lighter render-cost note such as lite-render-perf in its place. |
| [`do-review-frontend`](./do-review-frontend/) | Comprehensive React/TypeScript frontend code review with per-area review skills, run in parallel where the agent supports subagents and sequentially otherwise. |
| [`do-ux-flow-plan`](./do-ux-flow-plan/) | Create UX-first plans as flow trees, then attach concrete function names, files, and implementation anchors after the high-level flow is clear. |

## See Also

- [Skill catalog](../../../README.md) — every bucket in this repo
- [Docs](../../../docs/engineering/frontend/) — human-facing pages for these skills
