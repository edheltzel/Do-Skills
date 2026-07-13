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
| [`agent-native-review`](./skills/core/agent-native-review/) | Review a change for agent-native parity — every capability a human gets through the UI, an agent gets through a tool, with the same context and the same workspace. |
| [`agents-md`](./skills/core/agents-md/) | Write effective AGENTS.md files that give coding agents the context they need to work in a repository. |
| [`architecture-md`](./skills/core/architecture-md/) | Generate an ARCHITECTURE.md file for a codebase following matklad's principles. |
| [`babysit-pr`](./skills/core/babysit-pr/) | Continuously watch an open GitHub PR toward merge-ready, reacting to new review comments and CI failures as they arrive for the whole life of the PR. |
| [`behavioral-testing`](./skills/core/behavioral-testing/) | Behavior-first testing for user-observable contracts, test quality review, and safe executable E2E plans. |
| [`browser-verify`](./skills/core/browser-verify/) | Independently verify browser-rendered work in a real browser. |
| [`code-comments`](./skills/core/code-comments/) | Write high-signal code comments for humans and coding agents. |
| [`code-review`](./skills/core/code-review/) | Multi-lens code review orchestrator — selects the review lenses a diff warrants, runs them as bounded-parallel sub-agents, then dedups, confidence-ranks, and independently validates their findings into one report. |
| [`codebase-design`](./skills/core/codebase-design/) | Shared vocabulary for designing deep modules — a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. |
| [`debug`](./skills/core/debug/) | Find and fix the root cause when something breaks: a failing test, a broken build, a bug report, or behavior that doesn't match expectations. |
| [`design-doc`](./skills/core/design-doc/) | Write a short design document for unclear or important architecture decisions before implementation. |
| [`design-patterns-gof`](./skills/core/design-patterns-gof/) | The 23 Gang of Four object-oriented design patterns (Gamma, Helm, Johnson, Vlissides, 1994) distilled as a practical field guide, not a catalog. |
| [`doc-review`](./skills/core/doc-review/) | Persona review of a planning document — a spec, a design doc, or a plan — through role-specific lenses (coherence, feasibility, product, design, security, scope, adversarial), then synthesized into one routed report. |
| [`dogfood`](./skills/core/dogfood/) | Diff-scoped browser QA of the active branch: map the branch-vs-trunk flows, derive a test matrix, drive a real browser to find defects, pair every fix with a regression test, judge the experience as product personas, and write a durable dogfood report. |
| [`domain-modeling`](./skills/core/domain-modeling/) | Actively build and sharpen a project's domain model — a ubiquitous-language glossary in CONTEXT.md and architectural decision records in docs/adr/. |
| [`execute-plan`](./skills/core/execute-plan/) | Execute a multi-unit plan end-to-end — read the plan, orchestrate parallel or serial subagents under a strict safety check, verify each unit with real evidence, and ship. |
| [`git:guardrails`](./skills/core/git-guardrails/) | Install a Claude Code PreToolUse hook that blocks dangerous git commands (push, reset --hard, clean -fd, branch -D, checkout ./restore .) before they run. |
| [`git:pr-review-triage`](./skills/core/git-pr-review-triage/) | Pull PR review comments and triage them — separate substantive feedback from bikeshedding, stale comments, misreads, AI slop, and other noise. |
| [`git:safe-pr-workflow`](./skills/core/git-safe-pr-workflow/) | Safe GitHub pull request workflow for low-experience Git users. |
| [`git:worktree`](./skills/core/git-worktree/) | Create, remove, and list git worktrees in a standardized location — detects existing isolation first, prefers the harness's native worktree tool, and attaches to a new branch or an existing branch/PR/commit |
| [`implement`](./skills/core/implement/) | Finish one code task: understand it, make the smallest change, test it, review it, and report or open the requested PR. |
| [`improve-codebase-architecture`](./skills/core/improve-codebase-architecture/) | Scan a codebase for deepening opportunities — refactors that turn shallow modules into deep ones — and grill through whichever one the user picks. |
| [`karpathy-guidelines`](./skills/core/karpathy-guidelines/) | Behavioral guidelines to reduce common LLM coding mistakes. |
| [`lfg`](./skills/core/lfg/) | Opt-in autopilot: run the full shipping pipeline end-to-end with no check-ins — plan, implement, simplify, review and fix, commit, push a branch, open a PR, and drive CI to green. |
| [`plan`](./skills/core/plan/) | Break a spec or brief into agent-ready tickets (GitHub Issues, Linear, Jira) that each deliver a working outcome. |
| [`pov`](./skills/core/pov/) | Give a decisive, project-grounded verdict on an external input — adopt, switch, migrate, compare, or is-this-our-problem — judged against this project, not in the abstract. |
| [`pr-to-ready`](./skills/core/pr-to-ready/) | Make an open pull request ready to merge by checking live feedback, fixing required items, running checks, and reporting the result. |
| [`prototype`](./skills/core/prototype/) | Build a throwaway prototype to answer a design question — a logic/state model driven by hand, or several UI variations to pick from. |
| [`resolve-pr-feedback`](./skills/core/resolve-pr-feedback/) | Apply and resolve PR review feedback — judge every unresolved thread from one central fetch, fix the valid ones, then reply and resolve. |
| [`review-spec-conformance`](./skills/core/review-spec-conformance/) | Review a diff for faithful implementation of its originating issue or spec — completeness, omissions, scope creep, and contradictions — reported as its own axis, never merged with coding-standards findings. |
| [`review-structure`](./skills/core/review-structure/) | Repo-wide structural-maintainability review — code-judo restructurings, 1k-line file guard, anti-spaghetti branching, canonical-layer enforcement, anti-magic abstractions, explicit type/boundary contracts. |
| [`review-verification-protocol`](./skills/core/review-verification-protocol/) | False-positive discipline for code review — anti-confabulation echo gate, per-issue-type verification checklists, severity calibration, and valid-pattern tables that keep reviews honest. |
| [`roughdraft`](./skills/core/roughdraft/) | Install and drive the published `roughdraft` CLI — a local-first markdown editor/viewer for reviewing markdown with an AI agent (comments + CriticMarkup suggestions). |
| [`simplify`](./skills/core/simplify/) | Simplify and refine recently modified code for clarity and consistency. |
| [`spec`](./skills/core/spec/) | Synthesize the current conversation into an implementation spec and publish it to GitHub as a ready-for-agent issue. |
| [`strategy`](./skills/core/strategy/) | Create or update STRATEGY.md — a short, durable product anchor (target problem, approach, persona, metrics, tracks) built through a pushback interview. |
| [`task-to-pr`](./skills/core/task-to-pr/) | Turn one ticket from GitHub, Linear, Jira, or pasted context into a tested and reviewed GitHub pull request in a dedicated branch and worktree. |
| [`tdd`](./skills/core/tdd/) | Test-first variant of implement: confirm the seams, write a failing test, then make it pass. |
| [`triage`](./skills/core/triage/) | Move GitHub issues through a triage state machine — categorise, verify the claim, grill into shape, and write agent-ready briefs. |
| [`wayfinder`](./skills/core/wayfinder/) | Plan work too big for one agent session as a shared map of investigation tickets on GitHub, resolved one per session until the way to the destination is clear. |

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
| [`setup-pre-commit`](./skills/engineering/setup-pre-commit/) | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in a JS/TS repo, detecting the package manager. |
| [`setup-ts-deep-modules`](./skills/engineering/setup-ts-deep-modules/) | Wire dependency-cruiser into a TypeScript repo so each package is a deep module — implementation hidden in subfolders, reachable only through its entry-point files — and prove the rules bite. |
| [`tailwind-v4`](./skills/engineering/tailwind-v4/) | Tailwind CSS v4 with CSS-first configuration, @theme design tokens, OKLCH color, and dark-mode strategies. |
| [`typescript`](./skills/engineering/typescript/) | Write clean, pragmatically functional TypeScript — simple, composable, soundly typed |
| [`typescript-refactoring`](./skills/engineering/typescript-refactoring/) | Systematically refactor TypeScript codebases for readability, type safety, and AI-friendliness. |
| [`wizard`](./skills/engineering/wizard/) | Generate an interactive bash wizard that walks a human through a manual procedure — third-party setup, a one-off migration, an A→B state transition — opening URLs, capturing values, confirming each step, and writing .env files and GitHub Actions secrets. |

### Productivity

Non-code workflow tools.

| Skill | Description |
| --- | --- |
| [`compound`](./skills/productivity/compound/) | Capture a just-solved problem or hard-won practice as a searchable doc in docs/solutions/, so the next occurrence takes minutes instead of research. |
| [`compound-refresh`](./skills/productivity/compound-refresh/) | Audit docs/solutions/ learnings against the current codebase and keep the library trustworthy — per-doc Keep / Update / Consolidate / Replace / Delete verdicts plus document-set analysis across the whole library. |
| [`distill-to-skill`](./skills/productivity/distill-to-skill/) | Distill knowledge from any source — blog posts, articles, documentation, GitHub repos, video transcripts, books, papers — into a well-structured agent skill. |
| [`explain`](./skills/productivity/explain/) | A personal explainer with four modes — concept | diff | idea | work-recap — that turns one thing into a dense, visual explainer written for you personally, then makes it stick with a check-in (predict-then-reveal for diffs, corrected exercises otherwise). |
| [`grill-me`](./skills/productivity/grill-me/) | A relentless interview to sharpen a plan or design. |
| [`grill-with-docs`](./skills/productivity/grill-with-docs/) | A relentless interview to sharpen a plan or design that also writes the docs — ADRs and a glossary — as it goes. |
| [`grilling`](./skills/productivity/grilling/) | Grill the user relentlessly about a plan or design until you reach shared understanding — one question at a time, each with a recommended answer. |
| [`handoff`](./skills/productivity/handoff/) | Compact the current conversation into a handoff a fresh agent can pick up — written as a repo-versioned doc, or optionally seeded straight into a background agent. |
| [`ideate`](./skills/productivity/ideate/) | Generate many grounded candidate directions, critique them all with reasons, and present only the survivors — a ranked ideation doc, not a plan. |
| [`loop-me`](./skills/productivity/loop-me/) | Grill me about the specs for the workflows I want to build, within a stateful workspace — the loop/workflow/trigger/checkpoint/push-right/brief vocabulary. |
| [`pm-tools`](./skills/productivity/pm-tools/) | GitHub Projects management via gh CLI — creating projects, managing items/fields, plus opinionated PM recipes — board bootstrap, Epic→Feature→Task issue hierarchy with sub-issue linking, label policy, running a plan against the board, picking next work, and status reporting. |
| [`research`](./skills/productivity/research/) | Investigate a question against primary sources in a background agent and capture the findings as a cited Markdown note under docs/. |
| [`skill-builder`](./skills/productivity/skill-builder/) | The mechanics of creating agent skills — structure, frontmatter, validation gates, reference layout, and trigger testing. |
| [`teach`](./skills/productivity/teach/) | Teach the user a new skill or concept over multiple sessions, within a stateful teaching workspace — grounding every lesson in a mission, building reference docs, and tracking learning records to stay in the zone of proximal development. |
| [`tech-writing`](./skills/productivity/tech-writing/) | Draft clear tutorials, how-to guides, reference docs, explanations, commit messages, issues, PRDs, specs, PR descriptions, and comments. |
| [`writing-drafting`](./skills/productivity/writing-drafting/) | Writing, exploit — shape a fixed pile of raw material into an article, grounding each concept before a later move leans on it. |
| [`writing-fragments`](./skills/productivity/writing-fragments/) | Writing, explore — mine raw fragments into one file, no structure yet. |
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

