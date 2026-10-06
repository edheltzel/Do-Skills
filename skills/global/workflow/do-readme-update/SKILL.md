---
name: do-readme-update
description: Use when adding, removing, renaming, or moving a skill in the Do-Skills repository to keep the scope and group READMEs and the root catalog current.
---

# README Update

This skill works only in the Do-Skills repository. Skills live under `skills/<scope>/<group>/<skill>/SKILL.md`, with scope `global` or `project`. After any change to a skill's `name`, `description`, directory, scope, or group, regenerate the catalogs from the repo root:

```bash
bash skills/global/workflow/do-readme-update/update-readme.sh
```

It rewrites:
- each `skills/<scope>/<group>/README.md` (install command, skills table, see also)
- each `skills/<scope>/README.md` (scope install command, group table)
- the Global and Project tables between `<!-- skills-start -->` and `<!-- skills-end -->` in the root `README.md`

Do not hand-edit those generated files or regions. Skill descriptions come from `SKILL.md` frontmatter; group blurbs from the `"<Scope>: <Group>"` entries in [`skills.sh.json`](../../../../skills.sh.json). A new group needs a `skills.sh.json` entry and a line in the script's `GROUP_ORDER_*` and `group_title`.

## When to run

- After adding a new skill directory
- After editing the `name` or `description` field in any `SKILL.md`
- After renaming, moving between groups or scopes, or deleting a skill directory

## Script

The generator is [`update-readme.sh`](./update-readme.sh) next to this file. It resolves the repo root with `git rev-parse --show-toplevel`, so it runs from anywhere in the tree.
