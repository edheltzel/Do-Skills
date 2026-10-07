```
██████╗  ██████╗    ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔══██╗██╔═══██╗   ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
██║  ██║██║   ██║   ███████╗█████╔╝ ██║██║     ██║     ███████╗
██║  ██║██║   ██║   ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
██████╔╝╚██████╔╝██╗███████║██║  ██╗██║███████╗███████╗███████║
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
```

# Do Skills

This is a collection of skills I've created and collected. [Skills.sh](https://skills.sh) is a good way to discover and install skills, but it lacks many features. This repo is my temporary solution for installing skills on a per-project and global basis for day-to-day work and personal projects. Many are from people I've copied, borrowed, improved, and modified to fit my use cases.

> [!WARNING]
> This is a **WIP** and changes often. Just like any code/software you find, don't blindly download and run it. Review it, learn what it does to make an educated decision if you should use it.

**Suggestions**

I would suggest you take a peak at [Matt Pocock Skills](https://github.com/mattpocock/skills) and [Lauren Tan's PStack](https://github.com/cursor/plugins/tree/main/pstack)

## Installation

To keep this easy, I use [Skills.sh](https://skills.sh) for installation and updates.

Skills are split by install scope. **Global** skills help in any repo; install them once per machine. **Project** skills only pay off when a project uses that stack; install them into the project.

```bash
# every global skill, once per machine
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g

# one stack, from inside a project (TypeScript projects add the shared typescript group)
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/typescript
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend
```

To install a specific skill, use its exact listed name. Every name carries the `do-` prefix:

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

If you want to install for a specific agents, use the option flags ie: `-a
claude-code ` or `-a claude-code -a pi`

## Available Skills

Skills are grouped by scope, then by group. The root table is an index; each scope and group README lists its skills.

Every name carries a `do-` prefix so it does not collide with a harness command (`/simplify` vs `/do-simplify`).

<!-- skills-start -->

### [Global](./skills/global/)

Useful in any repo, or none. Install once per machine with `-g`.

| Group | Skills | Coverage |
|-------|--------|----------|
| [Core](./skills/global/core/) | 11 | Stack-agnostic foundations - review lenses, reasoning, testing, simplification, agent-legible repos, comments, design patterns, skill authoring, and AI-writing cleanup. |
| [Workflow](./skills/global/workflow/) | 9 | Change delivery - commits, docs, GitHub projects and stacks, PR workflow and review triage, worktrees, and technical writing. |
| [Operations](./skills/global/operations/) | 3 | Operating AI agents - delegation, prompt audits, and project status check-ins. |
| [Content](./skills/global/content/) | 2 | Audience-facing media - illustrations, diagrams, and images. |
| [Personal](./skills/global/personal/) | 2 | Personal extras - teaching and recipe diagrams. |

### [Project](./skills/project/)

Pay off only when a project uses that stack or product. Install into the project.

| Group | Skills | Coverage |
|-------|--------|----------|
| [TypeScript](./skills/project/typescript/) | 4 | Language-wide TypeScript - standards, refactoring, and type-driven design. Install alongside frontend, backend, or tooling. |
| [Frontend](./skills/project/frontend/) | 7 | Web frontend - Astro, CSS, React effects, design systems, UX flows, cleanup, and review. |
| [Backend](./skills/project/backend/) | 1 | Backend engineering - Effect (TypeScript) services and code, and review for Effect, Go, Python, and Rust. |
| [Tooling](./skills/project/tooling/) | 2 | CLIs and lightweight tools - TypeScript CLI scaffolding and zero-dependency patterns. |
| [Swift](./skills/project/swift/) | 3 | Swift and Apple platforms - macOS desktop apps, iOS review, and cleanup. |
| [Product](./skills/project/product/) | 1 | Product marketing - positioning, SEO and GEO discovery, launches, conversion, and retention. |

<!-- skills-end -->
## Creating a Skill

Each skill lives in its own folder under a scope and a group. Every
skill folder and its frontmatter `name:` carry the `do-` prefix:

```
skills/<scope>/<group>/do-skill-name/SKILL.md
```

The skills CLI only finds skills up to three folders below `skills/`, so do not nest deeper.

Pick the scope first:

- `global/` - useful in any repo, or none: methodology, writing, git and GitHub, agent operations, setup you run before a project has skills, personal tools
- `project/` - assumes a specific language, framework, platform, or product the project must use

Then the group. Global groups: `core`, `workflow`, `operations`, `content`, `personal`. Project groups are the stack or product: `typescript` (language-wide, installed alongside the TS groups), `frontend`, `backend`, `tooling`, `swift`, `product`. Group descriptions live in [`skills.sh.json`](./skills.sh.json).

The `SKILL.md` file contains YAML frontmatter and markdown instructions:

```markdown
---
name: do-skill-name
description: A clear description of what this skill does and when to use it
---

# Skill Name

[Instructions for the agent go here]
```

After adding, moving, renaming, or changing a skill's behaviour or description, regenerate the catalog and re-sync its docs page (`docs/`, see [`.agents/writing-docs.md`](.agents/writing-docs.md)):

```bash
bash scripts/update-readme.sh
```

---

## License

WTFPL

---

## Attributions

`do-teach-me` and the writing principles in `do-skill-craft` (from `writing-great-skills`) are adapted from [Matt Pocock's Skills](https://github.com/mattpocock/skills)
`do-astro` is adapted from [Astrolicious](https://github.com/astrolicious/agent-skills)
`do-illo` is copied from [tmchow/illo-skill](https://github.com/tmchow/illo-skill)
`do-marketing` is adapted from [proxysoul/SoulStack](https://github.com/proxysoul/SoulStack) marketing (MIT)
