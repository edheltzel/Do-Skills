# Engineering

Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft.

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
| [`do-astro`](./frontend/do-astro/) | Skill for building with the Astro web framework. |
| [`do-cleanup-swift`](./swift/do-cleanup-swift/) | End-of-session cleanup pass for Swift code. |
| [`do-cleanup-web`](./frontend/do-cleanup-web/) | End-of-session cleanup pass for TypeScript, React, and web code. |
| [`do-code-comments`](./general/do-code-comments/) | Write high-signal code comments for humans and coding agents. |
| [`do-coding-standards`](./typescript/do-coding-standards/) | Correct-by-construction TypeScript and Effect standards. |
| [`do-create-cli`](./typescript/do-create-cli/) | Generates production-ready TypeScript CLIs via a 3-tier template system (manual arg parsing, Commander.js, oclif), each shipping full implementation, docs, package.json, strict config, JSON output, and exit-code compliance. |
| [`do-design-patterns-gof`](./general/do-design-patterns-gof/) | The 23 Gang of Four object-oriented design patterns (Gamma, Helm, Johnson, Vlissides, 1994) distilled as a practical field guide, not a catalog. |
| [`do-design-system`](./frontend/do-design-system/) | Build accessible, themeable UI components, and when asked, capture the project's brand into DESIGN.md plus a live style-guide page. |
| [`do-effect-service-design`](./typescript/do-effect-service-design/) | Design Effect services. |
| [`do-lean-ts-patterns`](./typescript/do-lean-ts-patterns/) | Patterns for building lightweight, zero-dependency TypeScript tools and libraries. |
| [`do-macos-swift-desktop`](./swift/do-macos-swift-desktop/) | Build native macOS desktop applications in Swift using AppKit and SwiftUI. |
| [`do-modern-css`](./frontend/do-modern-css/) | Teaches agents to write modern CSS using native features instead of legacy hacks, workarounds, and JavaScript. |
| [`do-no-use-effect`](./frontend/do-no-use-effect/) | Prevent unnecessary React `useEffect` usage by steering code toward derived state, event handlers, memoization, `key`-based resets, `useSyncExternalStore`, and framework or query-library data APIs. |
| [`do-parse-dont-validate`](./typescript/do-parse-dont-validate/) | Type-driven design principle: transform unstructured data into structured types at system boundaries, making illegal states unrepresentable. |
| [`do-review-elixir`](./elixir/do-review-elixir/) | Comprehensive Elixir/Phoenix code review with optional parallel agents |
| [`do-review-frontend`](./frontend/do-review-frontend/) | Comprehensive React/TypeScript frontend code review with per-area review skills, run in parallel where the agent supports subagents and sequentially otherwise. |
| [`do-review-go`](./go/do-review-go/) | Comprehensive Go backend code review with optional parallel review areas. |
| [`do-review-ios`](./swift/do-review-ios/) | Comprehensive iOS/SwiftUI code review with optional parallel agents |
| [`do-review-python`](./python/do-review-python/) | Comprehensive Python/FastAPI backend code review with optional parallel agents |
| [`do-review-rust`](./rust/do-review-rust/) | Comprehensive Rust code review that fans out across detected technology areas, running them in parallel when the agent supports subagents and sequentially otherwise. |
| [`do-typescript-refactoring`](./typescript/do-typescript-refactoring/) | Systematically refactor TypeScript codebases for readability, type safety, and AI-friendliness. |
| [`do-ux-flow-plan`](./frontend/do-ux-flow-plan/) | Create UX-first plans as flow trees, then attach concrete function names, files, and implementation anchors after the high-level flow is clear. |
| [`do-write-typescript`](./typescript/do-write-typescript/) | Write clean, pragmatically functional TypeScript — simple, composable, soundly typed |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/engineering/) — human-facing pages for these skills
