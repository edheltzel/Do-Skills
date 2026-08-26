# Do Skills

>[!NOTE]
> This is a **WIP** and changes often. Just like any code/software you find, don't blindly download and run it. Review it, learn what it does to make an educated decision if you should use it.

This is a collection of skills that I've created or found valuable for my workflow. Many are from talented people that I have unashamedly copied, borrowed, improved, and modified most to fit my use cases. 

## Installation

To keep this easy, I use [Skills.sh](https://skills.sh) for installation and updates.

```bash
npx skills add edheltzel/Do-Skills
```

To install a specific skill, use its exact listed name. Most carry the `do-`
prefix; `icm-grill` is intentionally unprefixed:

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

If you want to install for a specific agents, use the option flags ie: `-a
claude-code ` or `-a claude-code -a pi`

## Available Skills

These are broken into buckets, similar to how [Matt Pocock's Skills](https://github.com/mattpocock/skills) are structured. 

I've also prefixed most of the skills with `do-` this way it is easier to identify which skills are mine... The reasoning for this is, I get all little trigger happy and select the wrong slash command/skill. Many harnesses have their own built-in commands/skills, like "/simplify", so if I have `do-simplify` I know for a fact I'm running my version.

<!-- skills-start -->

### Core

Foundational tools for every project and workbench - repo structure, agent maps, and review lenses.

- [`do-adversarial-review`](./skills/core/do-adversarial-review/)
- [`do-agent-context-layer`](./skills/core/do-agent-context-layer/)
- [`do-agent-first-repo`](./skills/core/do-agent-first-repo/)
- [`do-agents-md`](./skills/core/do-agents-md/)
- [`do-architecture-md`](./skills/core/do-architecture-md/)
- [`do-behavioral-testing`](./skills/core/do-behavioral-testing/)
- [`do-first-principles`](./skills/core/do-first-principles/)
- [`do-red-team`](./skills/core/do-red-team/)
- [`do-simplify`](./skills/core/do-simplify/)

### Engineering

Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft.

- [`do-bootstrap-design-system`](./skills/engineering/do-bootstrap-design-system/)
- [`do-cleanup-swift`](./skills/engineering/do-cleanup-swift/)
- [`do-cleanup-web`](./skills/engineering/do-cleanup-web/)
- [`do-code-comments`](./skills/engineering/do-code-comments/)
- [`do-coding-standards`](./skills/engineering/do-coding-standards/)
- [`do-create-cli`](./skills/engineering/do-create-cli/)
- [`do-design-patterns-gof`](./skills/engineering/do-design-patterns-gof/)
- [`do-design-system`](./skills/engineering/do-design-system/)
- [`do-effect-service-design`](./skills/engineering/do-effect-service-design/)
- [`do-lean-ts-patterns`](./skills/engineering/do-lean-ts-patterns/)
- [`do-macos-swift-desktop`](./skills/engineering/do-macos-swift-desktop/)
- [`do-modern-css`](./skills/engineering/do-modern-css/)
- [`do-no-use-effect`](./skills/engineering/do-no-use-effect/)
- [`do-parse-dont-validate`](./skills/engineering/do-parse-dont-validate/)
- [`do-typescript-refactoring`](./skills/engineering/do-typescript-refactoring/)
- [`do-ux-flow-plan`](./skills/engineering/do-ux-flow-plan/)
- [`do-write-typescript`](./skills/engineering/do-write-typescript/)

### Content

Audience-facing media - pictures, diagrams, video, motion, blog, and social.

- [`do-art`](./skills/content/do-art/)

### Harness

Modifying the coding-agent harness - distilling knowledge into reusable skills.

- [`do-distill-to-skill`](./skills/harness/do-distill-to-skill/)

### Slop Guard

Catching AI slop - restating output in plain human language and stripping jargon-heavy writing.

- [`do-bro`](./skills/slop-guard/do-bro/)

### Workflow

Shipping process - commits, issues, PRs, specs, and draft review.

- [`do-commit`](./skills/workflow/do-commit/)
- [`do-commit-push`](./skills/workflow/do-commit-push/)
- [`do-gh-pm`](./skills/workflow/do-gh-pm/)
- [`do-gh-stack`](./skills/workflow/do-gh-stack/)
- [`do-git-pr-review-triage`](./skills/workflow/do-git-pr-review-triage/)
- [`do-git-safe-pr-workflow`](./skills/workflow/do-git-safe-pr-workflow/)
- [`do-git-worktree`](./skills/workflow/do-git-worktree/)
- [`do-roughdraft`](./skills/workflow/do-roughdraft/)
- [`do-tech-writing`](./skills/workflow/do-tech-writing/)
- [`icm-grill`](./skills/workflow/icm-grill/)

### Operations

Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation.

- [`do-bitter-pill`](./skills/operations/do-bitter-pill/)
- [`do-browser`](./skills/operations/do-browser/)
- [`do-context-search`](./skills/operations/do-context-search/)
- [`do-delegation`](./skills/operations/do-delegation/)
- [`do-interceptor`](./skills/operations/do-interceptor/)

### Personal

Your non-portable extras.

- [`do-recipe-diagrams`](./skills/personal/do-recipe-diagrams/)

### Private

This repository's own tooling. Not portable.

- [`do-update-readme`](./skills/private/do-update-readme/)

<!-- skills-end -->
### Archived

No longer using.

- [`do-karpathy-guidelines`](./docs/core/karpathy-guidelines.md)


## Creating a Skill

Each skill lives in its own folder, grouped into a bucket under `skills/`. Every
skill folder and its frontmatter `name:` carry the `do-` prefix, except
`icm-grill`, which is named that way on purpose:

```
skills/<bucket>/do-skill-name/
└── SKILL.md
```

Buckets group skills by purpose and scope:

- `core/` - foundational tools for every project and workbench: repo structure, agent maps, review lenses
- `engineering/` - code design and implementation craft, from general principles to stack-specific
- `content/` - audience-facing media: pictures, diagrams, video, motion, blog, social
- `harness/` - modifying the coding-agent harness: distilling knowledge into reusable skills
- `slop-guard/` - catching AI slop: restating output in plain language and stripping jargon-heavy writing
- `workflow/` - shipping process: commits, issues, PRs, specs, draft review
- `operations/` - operating AI agents and driving machines: delegation, evaluation, prompt audits, recall, and automation
- `personal/` - your non-portable extras
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
bash skills/private/do-update-readme/update-readme.sh
```

---

## License

WTFPL

---

## Attributions
