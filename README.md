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

Skills are grouped into buckets. The root table is an index; each bucket README lists the skills, the same way [Beagle](https://github.com/existential-birds/beagle) keeps plugin READMEs and a short marketplace page.

Most names carry a `do-` prefix so they do not collide with a harness command (`/simplify` vs `/do-simplify`). `icm-grill` is the exception.

<!-- skills-start -->

| Bucket | Coverage |
|--------|----------|
| [Core](./skills/core/) | Foundational tools for every project and workbench - repo structure, agent maps, and review lenses. |
| [Engineering](./skills/engineering/) | Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft. |
| [Content](./skills/content/) | Audience-facing media - pictures, diagrams, video, motion, blog, and social. |
| [Harness](./skills/harness/) | Modifying the coding-agent harness - distilling knowledge into reusable skills. |
| [Slop Guard](./skills/slop-guard/) | Catching AI slop - restating output in plain human language and stripping jargon-heavy writing. |
| [Workflow](./skills/workflow/) | Workspace design and change delivery - interviews, commits, issues, PRs, specs, and draft review. |
| [Operations](./skills/operations/) | Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation. |
| [Personal](./skills/personal/) | Your non-portable extras. |

<!-- skills-end -->
### Archived

No longer using.

- [`do-karpathy-guidelines`](./docs/core/karpathy-guidelines.md)


## Creating a Skill

Each skill lives in its own folder, grouped into a bucket under `skills/`. Every
skill folder and its frontmatter `name:` carry the `do-` prefix, except
`icm-grill`, which is named that way on purpose:

```
skills/<bucket>/do-skill-name/SKILL.md
skills/<bucket>/<tech>/do-skill-name/SKILL.md
```

Buckets group skills by purpose and scope:

- `core/` - foundational tools for every project and workbench: repo structure, agent maps, review lenses
- `engineering/` - code design and implementation craft, from general principles to stack-specific
- `content/` - audience-facing media: pictures, diagrams, video, motion, blog, social
- `harness/` - modifying the coding-agent harness: distilling knowledge into reusable skills
- `slop-guard/` - catching AI slop: restating output in plain language and stripping jargon-heavy writing
- `workflow/` - see its generated description under [Available Skills](#available-skills)
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

After adding, moving, renaming, or changing a skill's behaviour or description, regenerate the Available Skills section and re-sync its docs page (`docs/`, see [`.agents/writing-docs.md`](./.agents/writing-docs.md)):

```bash
bash skills/workflow/do-update-readme/update-readme.sh
```

---

## License

WTFPL

---

## Attributions

[`do-writing-great-skills`](./skills/harness/do-writing-great-skills/) (Matt `writing-great-skills` at [`697d4ce`](https://github.com/mattpocock/skills/commit/697d4ce9742da558fd1ba6697c8e9775e2e302dd)) and
[`do-teach`](./skills/personal/do-teach/) are adapted from [Matt Pocock's Skills](https://github.com/mattpocock/skills).
His `wait-what` skill also contributes to [`do-bro`](./skills/slop-guard/do-bro/).
The imported skills and contribution retain their MIT license; each affected skill folder includes the upstream notice.

[`do-tutorial-docs`](./skills/workflow/do-tutorial-docs/), [`do-improve-doc`](./skills/workflow/do-improve-doc/), [`do-review-ai-writing`](./skills/slop-guard/do-review-ai-writing/), [`do-humanize`](./skills/slop-guard/do-humanize/), [`do-review-skill`](./skills/harness/do-review-skill/), and the six `do-review-{ios,frontend,python,go,rust,elixir}` packs are adapted from [Beagle](https://github.com/existential-birds/beagle) by Existential Birds, LLC under the [Apache License 2.0](https://github.com/existential-birds/beagle/blob/master/LICENSE).

[`do-astro`](./skills/engineering/frontend/do-astro/) is adapted from [astrolicious/agent-skills](https://github.com/astrolicious/agent-skills) under MIT.
