---
name: do-update-readme
description: Use when adding, removing, or renaming a skill in this repository to keep nested bucket READMEs and the root catalog current.
---

# Update README

Skills live under `skills/<bucket>/<skill>/SKILL.md` or `skills/<bucket>/<tech>/<skill>/SKILL.md`. After any change to a
skill's `name`, `description`, directory, or bucket, regenerate the catalogs by running the script from the repo root:

```bash
bash skills/workflow/do-update-readme/update-readme.sh
```

It rewrites:
- each nonempty bucket `README.md` (Beagle-docs layout: install, skills table, see also)
- each `skills/engineering/<tech>/README.md`
- the short bucket table between `<!-- skills-start -->` and `<!-- skills-end -->` in the root `README.md`

Do not hand-edit those generated regions. Descriptions come from `SKILL.md` frontmatter; bucket blurbs from [`skills.sh.json`](../../../skills.sh.json).

## When to run

- After adding a new skill directory
- After editing the `name` or `description` field in any `SKILL.md`
- After renaming, moving between buckets, or deleting a skill directory

## Script

The generator is [`update-readme.sh`](./update-readme.sh) next to this file. It
reads each `SKILL.md`'s frontmatter, writes a Beagle-docs-style README in every
nonempty bucket and every `skills/engineering/<tech>/` folder, and replaces the
root README bucket table. Bucket descriptions have one owner in
[`skills.sh.json`](../../../skills.sh.json). Resolve the repo root with
`git rev-parse --show-toplevel` so the script works from anywhere in the tree.
