# Do Skills

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

I've also prefixed most of the skills with `do-` this way it is easier to identify which skills are mine... The reasoning for this is, I get all little trigger happy and select the wrong slash command/skill. Many harnesses have their own built-in commands/skills, like "/simplify", so if I have `do-simplify` I know for a fact I'm running my version.

<!-- skills-start -->

### Core

Essential, stack-agnostic safeguards and adversarial-thinking tools reached for by default across setup, implementation, testing, review, and shipping.

- [`do-adversarial-review`](./skills/core/do-adversarial-review/)
- [`do-agent-context-layer`](./skills/core/do-agent-context-layer/)
- [`do-agent-first-repo`](./skills/core/do-agent-first-repo/)
- [`do-behavioral-testing`](./skills/core/do-behavioral-testing/)
- [`do-first-principles`](./skills/core/do-first-principles/)
- [`do-git-safe-pr-workflow`](./skills/core/do-git-safe-pr-workflow/)
- [`do-red-team`](./skills/core/do-red-team/)
- [`do-simplify`](./skills/core/do-simplify/)

### Engineering

Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft.

- [`do-bootstrap-design-system`](./skills/engineering/do-bootstrap-design-system/)
- [`do-cleanup-swift`](./skills/engineering/do-cleanup-swift/)
- [`do-cleanup-web`](./skills/engineering/do-cleanup-web/)
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
- [`do-write-typescript`](./skills/engineering/do-write-typescript/)

### Authoring

Producing and refining artifacts - technical prose, documentation, skills, and visual media.

- [`do-agents-md`](./skills/authoring/do-agents-md/)
- [`do-architecture-md`](./skills/authoring/do-architecture-md/)
- [`do-art`](./skills/authoring/do-art/)
- [`do-code-comments`](./skills/authoring/do-code-comments/)
- [`do-distill-to-skill`](./skills/authoring/do-distill-to-skill/)
- [`do-roughdraft`](./skills/authoring/do-roughdraft/)
- [`do-tech-writing`](./skills/authoring/do-tech-writing/)
- [`do-update-readme`](./skills/authoring/do-update-readme/)
- [`do-ux-flow-plan`](./skills/authoring/do-ux-flow-plan/)

### Slop Guard

Catching AI slop — restating output in plain human language and stripping jargon-heavy writing.

- [`do-bro`](./skills/slop-guard/do-bro/)

### Workflow

Source-control, pull-request, and project-tracking tooling for day-to-day delivery.

- [`do-commit`](./skills/workflow/do-commit/)
- [`do-commit-push`](./skills/workflow/do-commit-push/)
- [`do-gh-pm`](./skills/workflow/do-gh-pm/)
- [`do-gh-stack`](./skills/workflow/do-gh-stack/)
- [`do-git-pr-review-triage`](./skills/workflow/do-git-pr-review-triage/)
- [`do-git-worktree`](./skills/workflow/do-git-worktree/)

### Operations

Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation.

- [`do-bitter-pill`](./skills/operations/do-bitter-pill/)
- [`do-browser`](./skills/operations/do-browser/)
- [`do-context-search`](./skills/operations/do-context-search/)
- [`do-delegation`](./skills/operations/do-delegation/)
- [`do-interceptor`](./skills/operations/do-interceptor/)

### Private

Scope, not topic: this repository's own tooling. Not portable.

- [`do-recipe-diagrams`](./skills/private/do-recipe-diagrams/)

<!-- skills-end -->
### Archived

No longer using.

- [`do-karpathy-guidelines`](./skills/core/do-karpathy-guidelines/)


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
- `slop-guard/` - catching AI slop: restating output in plain language and stripping jargon-heavy writing
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
