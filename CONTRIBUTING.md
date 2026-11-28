# Contributing

Back to the [README](./README.md).

## Creating a Skill

Each skill lives in its own folder under a scope and a group. New original
skills use the `do-` prefix for both the folder and frontmatter `name:`.
For vendored skills, keep the exact names listed in the catalog.

```
skills/<scope>/<group>/do-skill-name/SKILL.md
```

The skills CLI only finds skills up to three folders below `skills/`, so do not nest deeper.

Pick the scope first:

- `global/` - useful in any repo, or none: methodology, writing, git and GitHub, agent operations, setup you run before a project has skills, personal tools
- `project/` - assumes a specific language, framework, platform, or product the project must use

Then choose the group from the [catalog in the README](./README.md#available-skills). `personal` exists in both scopes: personal tools you want everywhere go in `global/personal`, ones you only use in certain projects go in `project/personal`. Group descriptions live in [`skills.sh.json`](./skills.sh.json).

The `SKILL.md` file contains YAML frontmatter and markdown instructions:

```markdown
---
name: do-skill-name
description: A clear description of what this skill does and when to use it
---

# Skill Name

[Instructions for the agent go here]
```

When adding, removing, or renaming a skill, update the `skills` list in
[`gap-utility.toml`](./gap-utility.toml) to match the skill frontmatter names.

After adding, moving, renaming, or changing a skill's behaviour or description, regenerate the catalog and re-sync its docs page (`docs/`, see [`.agents/writing-docs.md`](./.agents/writing-docs.md)):

```bash
bash scripts/update-readme.sh
```
