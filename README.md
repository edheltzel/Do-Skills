# Skills

This is my personal collection of [Agent Skills](https://skills.sh/) for my [DA](https://danielmiessler.com/blog/we-are-all-building-single-digital-assistant), Atlas.

>[!NOTE]
> This is a **WIP** and changes often. It is a collection of skills that I have found valuable for improving my workflow. Many, if not most, are from talented developers, engineers, creators, and researchers. I have unashamedly copied and improved or modified most of the skills to fit my use case.

## What are Skills and Why's this repo exist?

Skills are reusable capabilities for AI agents. They provide procedural knowledge that helps agents accomplish specific tasks more effectively. Each skill is a folder containing a `SKILL.md` file with instructions, examples, and guidelines.

This repo solely exist for my own use and isn't intended to be shared. It's just
what I have found useful, so if you find value, great. If not, that's cool, I don't care :)

## Installation

Install any skill from using the [skills CLI](https://skills.sh/), **I highly
recommend install only what you want and to read each skill before you blindly install.**

```bash
npx skills add edheltzel/skills
```

To install a specific skill:

```bash
npx skills add edheltzel/skills@<skill-name>
```

## Available Skills

<!-- skills-start -->

### Core

Always-on standards, process, and operational skills. Stack-agnostic — they apply to any project.

| Skill | Description |
| --- | --- |
| [`adversarial-review`](./skills/core/adversarial-review/) | Adversarially hunt for correctness bugs and regressions in a change set. |
| [`agent-first-repo`](./skills/core/agent-first-repo/) | Structure a repository and its documentation so AI coding agents can work effectively. |
| [`agents-md`](./skills/core/agents-md/) | Write effective AGENTS.md files that give coding agents the context they need to work in a repository. |
| [`architecture-md`](./skills/core/architecture-md/) | Generate an ARCHITECTURE.md file for a codebase following matklad's principles. |
| [`behavioral-testing`](./skills/core/behavioral-testing/) | Behavior-first testing for user-observable contracts, test quality review, and safe executable E2E plans. |
| [`browser-verify`](./skills/core/browser-verify/) | Independently verify browser-rendered work in a real browser. |
| [`code-comments`](./skills/core/code-comments/) | Write high-signal code comments for humans and coding agents. |
| [`debug`](./skills/core/debug/) | Find and fix the root cause when something breaks: a failing test, a broken build, a bug report, or behavior that doesn't match expectations. |
| [`design-doc`](./skills/core/design-doc/) | Write a short design document for unclear or important architecture decisions before implementation. |
| [`design-patterns-gof`](./skills/core/design-patterns-gof/) | The 23 Gang of Four object-oriented design patterns (Gamma, Helm, Johnson, Vlissides, 1994) distilled as a practical field guide, not a catalog. |
| [`git:pr-review-triage`](./skills/core/git-pr-review-triage/) | Pull PR review comments and triage them — separate substantive feedback from bikeshedding, stale comments, misreads, AI slop, and other noise. |
| [`git:safe-pr-workflow`](./skills/core/git-safe-pr-workflow/) | Safe GitHub pull request workflow for low-experience Git users. |
| [`git:worktree`](./skills/core/git-worktree/) | Create, remove, and list git worktrees in a standardized location |
| [`implement`](./skills/core/implement/) | Finish one code task: understand it, make the smallest change, test it, review it, and report or open the requested PR. |
| [`karpathy-guidelines`](./skills/core/karpathy-guidelines/) | Behavioral guidelines to reduce common LLM coding mistakes. |
| [`plan`](./skills/core/plan/) | Break a spec or brief into agent-ready tickets (GitHub Issues, Linear, Jira) that each deliver a working outcome. |
| [`pr-to-ready`](./skills/core/pr-to-ready/) | Make an open pull request ready to merge by checking live feedback, fixing required items, running checks, and reporting the result. |
| [`review-structure`](./skills/core/review-structure/) | Repo-wide structural-maintainability review — code-judo restructurings, 1k-line file guard, anti-spaghetti branching, canonical-layer enforcement, anti-magic abstractions, explicit type/boundary contracts. |
| [`review-verification-protocol`](./skills/core/review-verification-protocol/) | False-positive discipline for code review — anti-confabulation echo gate, per-issue-type verification checklists, severity calibration, and valid-pattern tables that keep reviews honest. |
| [`roughdraft`](./skills/core/roughdraft/) | Install and drive the published `roughdraft` CLI — a local-first markdown editor/viewer for reviewing markdown with an AI agent (comments + CriticMarkup suggestions). |
| [`simplify`](./skills/core/simplify/) | Simplify and refine recently modified code for clarity and consistency. |
| [`spec`](./skills/core/spec/) | Write a short implementation spec at docs/<feature-slug>/spec.md and pause for review. |
| [`task-to-pr`](./skills/core/task-to-pr/) | Turn one ticket from GitHub, Linear, Jira, or pasted context into a tested and reviewed GitHub pull request in a dedicated branch and worktree. |
| [`tdd`](./skills/core/tdd/) | Test-first variant of implement: understand the desired behavior, write a failing test, make it pass, then simplify. |

### Engineering

Stack-specific code craft — reached for once the language, framework, or platform is known.

| Skill | Description |
| --- | --- |
| [`bootstrap-design-system`](./skills/engineering/bootstrap-design-system/) | Generate a portable DESIGN.md source-of-truth plus a live HTML style-guide page for the current project — discover brand tokens, write the 9-section spec, build and verify a visual reference page. |
| [`cleanup-swift`](./skills/engineering/cleanup-swift/) | End-of-session cleanup pass for Swift code. |
| [`cleanup-web`](./skills/engineering/cleanup-web/) | End-of-session propose-only cleanup for web TypeScript, React web, browser-facing code, and Expo/Expo Router React DOM/browser/web output. |
| [`design-system`](./skills/engineering/design-system/) | Build design system components and UI that are accessible, themeable, and visually polished. |
| [`full-stack-web`](./skills/engineering/full-stack-web/) | Build and review React DOM/browser/web features across React Router or Expo Router web routing, data, UI, accessibility, and verification. |
| [`ios-animation-design`](./skills/engineering/ios-animation-design/) | Design and spec iOS animations before code is written — structured motion specs covering transitions, micro-interactions, gesture-driven motion, and loading states, each with interruption, Reduce Motion, and haptics decided up front. |
| [`ios-animation-implementation`](./skills/engineering/ios-animation-implementation/) | Write iOS animation code with Apple's first-party frameworks — SwiftUI animations, Core Animation, and UIKit — preferring native APIs over third-party libraries. |
| [`ios-development`](./skills/engineering/ios-development/) | Build and review native iPhone and iPad software with Swift, SwiftUI, UIKit interop, Swift concurrency, SwiftData, URLSession, and Swift Testing. |
| [`lean-ts-patterns`](./skills/engineering/lean-ts-patterns/) | Patterns for building lightweight, zero-dependency TypeScript tools and libraries. |
| [`macos-swift-desktop`](./skills/engineering/macos-swift-desktop/) | Build native macOS desktop applications in Swift using AppKit and SwiftUI. |
| [`modern-css`](./skills/engineering/modern-css/) | Teaches agents to write modern CSS using native features instead of legacy hacks, workarounds, and JavaScript. |
| [`no-use-effect`](./skills/engineering/no-use-effect/) | Prevent unnecessary React `useEffect` usage by steering code toward derived state, event handlers, memoization, `key`-based resets, `useSyncExternalStore`, and framework or query-library data APIs. |
| [`parse-dont-validate`](./skills/engineering/parse-dont-validate/) | Type-driven design principle: transform unstructured data into structured types at system boundaries, making illegal states unrepresentable. |
| [`react-native-expo`](./skills/engineering/react-native-expo/) | Build and review React Native or Expo apps for iOS, Android, or native mobile. |
| [`tailwind-v4`](./skills/engineering/tailwind-v4/) | Tailwind CSS v4 with CSS-first configuration, @theme design tokens, OKLCH color, and dark-mode strategies. |
| [`typescript`](./skills/engineering/typescript/) | Write clean, pragmatically functional TypeScript — simple, composable, soundly typed |
| [`typescript-refactoring`](./skills/engineering/typescript-refactoring/) | Systematically refactor TypeScript codebases for readability, type safety, and AI-friendliness. |

### Productivity

Non-code workflow tools.

| Skill | Description |
| --- | --- |
| [`distill-to-skill`](./skills/productivity/distill-to-skill/) | Distill knowledge from any source — blog posts, articles, documentation, GitHub repos, video transcripts, books, papers — into a well-structured agent skill. |
| [`pm-tools`](./skills/productivity/pm-tools/) | GitHub Projects management via gh CLI — creating projects, managing items/fields, plus opinionated PM recipes — board bootstrap, Epic→Feature→Task issue hierarchy with sub-issue linking, label policy, running a plan against the board, picking next work, and status reporting. |
| [`skill-builder`](./skills/productivity/skill-builder/) | The mechanics of creating agent skills — structure, frontmatter, validation gates, reference layout, and trigger testing. |
| [`tech-writing`](./skills/productivity/tech-writing/) | Draft clear tutorials, how-to guides, reference docs, explanations, commit messages, issues, PRDs, specs, PR descriptions, and comments. |
| [`writing-great-skills`](./skills/productivity/writing-great-skills/) | Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable. |

### Personal

Tied to this repository's own tooling. Not portable.

| Skill | Description |
| --- | --- |
| [`update-readme`](./skills/personal/update-readme/) | Use when adding, removing, or renaming a skill in this repository to keep the Available Skills section in README.md current. |

<!-- skills-end -->

## Creating a Skill

Each skill lives in its own folder, grouped into a bucket under `skills/`:

```
skills/<bucket>/skill-name/
└── SKILL.md
```

Buckets group skills by purpose and scope:

- `core/` — always-on, stack-agnostic standards, process, and operational skills
- `engineering/` — stack-specific code craft
- `productivity/` — non-code workflow tools
- `personal/` — this repository's own tooling

The `SKILL.md` file contains YAML frontmatter and markdown instructions:

```markdown
---
name: skill-name
description: A clear description of what this skill does and when to use it
---

# Skill Name

[Instructions for the agent go here]
```

After adding, moving, or renaming a skill, regenerate the Available Skills section:

```bash
bash skills/personal/update-readme/update-readme.sh
```

## License

WTFPL

