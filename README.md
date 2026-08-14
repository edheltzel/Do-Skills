# Skills

>[!NOTE]
> This is a **WIP** and changes often. Just like any code/software you find, don't blindly download and run it. Review it, learn what it does to make an educated decision if you should use it.

This is a collection of skills that I've created or found valuable for my workflow. Many are from talented people that I have unashamedly copied, borrowed, improved, and modified most to fit my use cases. 

## Installation

To keep is easy, I'm use [Skills.sh](https://skills.sh) for installation and updates.

```bash
npx skills add edheltzel/skills
```

To install a specific skill (every skill name carries the `do-` prefix):

```bash
npx skills add edheltzel/skills@do-<skill-name>
```

If you want to install for a specific agents, use the option flags ie: `-a
claude-code ` or `-a claude-code -a pi`

## Available Skills

These are broken into buckets, similar to how [Matt Pocock's Skills](https://github.com/mattpocock/skills) are structured. 

I've also prefixed most of the skills with `do-` this way it is easier to identify which skills are mine... The reasoning for this is, I get all little trigger happy and select the wrong slash command/skill. Many harnesses have their own built-in commands/skills, like "/simplify", so if I have `do-simplify` I now for a fact I'm running my version.

### Core

Essential, stack-agnostic safeguards and adversarial-thinking tools reached for by default across setup, implementation, testing, review, and shipping.

| Skill | Description |
| --- | --- |
| [`do-adversarial-review`](./skills/core/do-adversarial-review/) | Adversarially hunt for correctness bugs and regressions in a change set. |
| [`do-agent-context-layer`](./skills/core/do-agent-context-layer/) | Structure a code repository's documentation and context layer so an AI agent grasps the project fast, using the Interpretable Context Methodology (ICM) by Jake Van Clief. |
| [`do-agent-first-repo`](./skills/core/do-agent-first-repo/) | Structure a repository and its documentation so AI coding agents can work effectively. |
| [`do-behavioral-testing`](./skills/core/do-behavioral-testing/) | Behavioral testing methodology — test what users experience, not how code is structured. |
| [`do-first-principles`](./skills/core/do-first-principles/) | Physics-based reasoning framework (Musk methodology) that deconstructs a problem to irreducible fundamental truths, classifies every element as hard constraint, soft constraint, or assumption, then reconstructs the optimal solution from fundamentals alone. |
| [`do-git-safe-pr-workflow`](./skills/core/do-git-safe-pr-workflow/) | Safe GitHub pull request workflow for low-experience Git users. |
| [`do-karpathy-guidelines`](./skills/core/do-karpathy-guidelines/) | Behavioral guidelines to reduce common LLM coding mistakes. |
| [`do-red-team`](./skills/core/do-red-team/) | Adversarial analysis deploying parallel expert agents to stress-test ideas, strategies, and plans — decomposes into atomic claims, attacks them, then steelmans and counter-argues, producing severity-ranked findings with remediation. |
| [`do-simplify`](./skills/core/do-simplify/) | Simplify and refine recently modified code for clarity and consistency. |

### Engineering

Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft.

| Skill | Description |
| --- | --- |
| [`do-bootstrap-design-system`](./skills/engineering/do-bootstrap-design-system/) | Generate a portable DESIGN.md source-of-truth plus a live HTML style-guide page for the current project — discover brand tokens, write the 9-section spec, build and verify a visual reference page. |
| [`do-cleanup-swift`](./skills/engineering/do-cleanup-swift/) | End-of-session cleanup pass for Swift code. |
| [`do-cleanup-web`](./skills/engineering/do-cleanup-web/) | End-of-session cleanup pass for TypeScript, React, and web code. |
| [`do-create-cli`](./skills/engineering/do-create-cli/) | Generates production-ready TypeScript CLIs via a 3-tier template system (manual arg parsing, Commander.js, oclif), each shipping full implementation, docs, package.json, strict config, JSON output, and exit-code compliance. |
| [`do-design-patterns-gof`](./skills/engineering/do-design-patterns-gof/) | The 23 Gang of Four object-oriented design patterns (Gamma, Helm, Johnson, Vlissides, 1994) distilled as a practical field guide, not a catalog. |
| [`do-design-system`](./skills/engineering/do-design-system/) | Build design system components and UI that are accessible, themeable, and visually polished. |
| [`do-lean-ts-patterns`](./skills/engineering/do-lean-ts-patterns/) | Patterns for building lightweight, zero-dependency TypeScript tools and libraries. |
| [`do-macos-swift-desktop`](./skills/engineering/do-macos-swift-desktop/) | Build native macOS desktop applications in Swift using AppKit and SwiftUI. |
| [`do-modern-css`](./skills/engineering/do-modern-css/) | Teaches agents to write modern CSS using native features instead of legacy hacks, workarounds, and JavaScript. |
| [`do-no-use-effect`](./skills/engineering/do-no-use-effect/) | Prevent unnecessary React `useEffect` usage by steering code toward derived state, event handlers, memoization, `key`-based resets, `useSyncExternalStore`, and framework or query-library data APIs. |
| [`do-parse-dont-validate`](./skills/engineering/do-parse-dont-validate/) | Type-driven design principle: transform unstructured data into structured types at system boundaries, making illegal states unrepresentable. |
| [`do-typescript`](./skills/engineering/do-typescript/) | Write clean, pragmatically functional TypeScript — simple, composable, soundly typed |
| [`do-typescript-refactoring`](./skills/engineering/do-typescript-refactoring/) | Systematically refactor TypeScript codebases for readability, type safety, and AI-friendliness. |

### Authoring

Producing and refining artifacts - technical prose, documentation, skills, and visual media.

| Skill | Description |
| --- | --- |
| [`do-agents-md`](./skills/authoring/do-agents-md/) | Write effective AGENTS.md files that give coding agents the context they need to work in a repository. |
| [`do-architecture-md`](./skills/authoring/do-architecture-md/) | Generate an ARCHITECTURE.md file for a codebase following matklad's principles. |
| [`do-art`](./skills/authoring/do-art/) | Static visual content across 20+ formats - diagrams, mermaid, infographics, D3 dashboards, comics, icons, wallpaper - via Flux, Nano Banana Pro, and GPT-Image-2. |
| [`do-code-comments`](./skills/authoring/do-code-comments/) | Write high-signal code comments for humans and coding agents. |
| [`do-distill-to-skill`](./skills/authoring/do-distill-to-skill/) | Distill knowledge from any source — blog posts, articles, documentation, GitHub repos, video transcripts, books, papers — into a well-structured agent skill. |
| [`do-roughdraft`](./skills/authoring/do-roughdraft/) | Install and drive the published `roughdraft` CLI — a local-first markdown editor/viewer for reviewing markdown with an AI agent (comments + CriticMarkup suggestions). |
| [`do-tech-writing`](./skills/authoring/do-tech-writing/) | Write clean, terse technical docs — commits, issues, PRDs, specs, and technical communication |
| [`do-update-readme`](./skills/authoring/do-update-readme/) | Use when adding, removing, or renaming a skill in this repository to keep the Available Skills section in README.md current. |

### Workflow

Source-control, pull-request, and project-tracking tooling for day-to-day delivery.

| Skill | Description |
| --- | --- |
| [`do-gh-stack`](./skills/workflow/do-gh-stack/) | Manages stacked PRs and splits multi-part work into reviewable branches with gh-stack. |
| [`do-git-pr-review-triage`](./skills/workflow/do-git-pr-review-triage/) | Pull PR review comments and triage them — separate substantive feedback from bikeshedding, stale comments, misreads, AI slop, and other noise. |
| [`do-git-worktree`](./skills/workflow/do-git-worktree/) | Create, remove, and list git worktrees in a standardized location |
| [`do-pm`](./skills/workflow/do-pm/) | GitHub Projects management via gh CLI — creating projects, managing items/fields, plus opinionated PM recipes — board bootstrap, Epic→Feature→Task issue hierarchy with sub-issue linking, label policy, running a plan against the board, picking next work, and status reporting. |

### Operations

Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation.

| Skill | Description |
| --- | --- |
| [`do-bitter-pill`](./skills/operations/do-bitter-pill/) | Audits AI instruction sets for over-prompting. |
| [`do-browser`](./skills/operations/do-browser/) | Browser automation through the installed chrome-devtools-axi CLI. |
| [`do-context-search`](./skills/operations/do-context-search/) | Find prior project work through the current Recall MCP tools. |
| [`do-delegation`](./skills/operations/do-delegation/) | Routes independent work through current Agent dispatch, background execution, role briefs, worktree isolation, and coordinator-managed synthesis. |
| [`do-evals`](./skills/operations/do-evals/) | AI agent evaluation framework with three grader types (code-based, model-based, human) and pass@k/pass^k scoring over agent transcripts, tool-call sequences, and multi-turn conversations; covers capability and regression evals. |
| [`do-interceptor`](./skills/operations/do-interceptor/) | Real Chrome/Brave/Helium + macOS Computer Use from inside the browser - zero CDP fingerprint, real sessions; mandatory for visual deploy verification. |

<!-- skills-end -->
### Archived

No longer using.

| Skill | Description |
| --- | --- |
| [`do-karpathy-guidelines`](./skills/core/do-karpathy-guidelines/) | Behavioral guidelines to reduce common LLM coding mistakes. |


## Creating a Skill

Each skill lives in its own folder, grouped into a bucket under `skills/`. Every
skill folder and its frontmatter `name:` carry the `do-` prefix:

```
skills/<bucket>/do-skill-name/
└── SKILL.md
```

Buckets group skills by purpose and scope:

- `core/` - essential, stack-agnostic safeguards and adversarial-thinking tools reached for by default
- `engineering/` - code design and implementation craft, from general principles to stack-specific
- `authoring/` - producing and refining artifacts: technical prose, documentation, skills, and visual media
- `workflow/` - source-control, pull-request, and project-tracking tooling for day-to-day delivery
- `operations/` - operating AI agents and driving machines: delegation, evaluation, prompt audits, recall, and automation
- `private/` - this repository's own tooling, not portable

The `SKILL.md` file contains YAML frontmatter and markdown instructions:

```markdown
---
name: do-skill-name
description: A clear description of what this skill does and when to use it
---

# Skill Name

[Instructions for the agent go here]
```

After adding, moving, or renaming a skill, regenerate the Available Skills section:

```bash
bash skills/authoring/do-update-readme/update-readme.sh
```

---

## License

WTFPL

---

## Attributions
