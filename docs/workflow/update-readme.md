# Update README

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-update-readme
```

```bash
npx skills update do-update-readme
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/do-update-readme)

## What it does

`do-update-readme` regenerates the Available Skills catalog from each skill's
`SKILL.md` frontmatter. The defining constraint is that the generator is the
only writer of those lists: do not hand-edit the list between
`<!-- skills-start -->` and `<!-- skills-end -->`.

## When to reach for it

Type `/do-update-readme`, or the agent reaches for it automatically after a
skill is added, removed, renamed, or moved between buckets.

Reach for it when the README catalog is stale. It does not write skill prose.
Use [writing-great-skills](../harness/writing-great-skills.md) for that.

## The generator

Run from the repository root:

```bash
bash skills/workflow/do-update-readme/update-readme.sh
```

It rewrites the Available Skills section in the root README and the README in
each nonempty bucket folder. Human docs pages under `docs/` are separate; this
script does not write them. Empty buckets get no heading.

## It's working if

- Root README Available Skills matches the `SKILL.md` files on disk.
- Each nonempty bucket folder has a README that lists the same skills.

## Where it fits

Periodic catalog maintenance for this repository. It sits in Workflow with the
other shipping tools. Shared prose posture:
[tech-writing](./tech-writing.md).
