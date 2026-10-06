# README Update

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-readme-update
```

```bash
npx skills update do-readme-update
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-readme-update)

## What it does

`do-readme-update` regenerates the Do-Skills catalogs from each skill's
`SKILL.md` frontmatter. It only works in this repository. The defining
constraint is that the generator is the only writer of those lists: do not
hand-edit a scope or group README, or the tables between `<!-- skills-start -->`
and `<!-- skills-end -->`.

## When to reach for it

Type `/do-readme-update`, or the agent reaches for it automatically after a
skill is added, removed, renamed, or moved between groups or scopes.

Reach for it when the README catalog is stale. It does not write skill prose.
Use [skill-craft](../core/skill-craft.md) for that.

## The generator

Run from the repository root:

```bash
bash skills/global/workflow/do-readme-update/update-readme.sh
```

It rewrites each `skills/<scope>/<group>/README.md` (install command, skills
table, see also), each `skills/<scope>/README.md`, and the Global and Project
tables in the root README.
Human docs pages under `docs/` are separate; this script does not write them.

## It's working if

- Root README has a Global and a Project table, each row linking to `skills/<scope>/<group>/`.
- Each group README has a skills table matching the `SKILL.md` files on disk.

## Where it fits

Periodic catalog maintenance for this repository. It sits in Workflow with the
other shipping tools. Shared prose posture:
[tech-writing](./tech-writing.md).
