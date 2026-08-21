---
name: do-update-readme
description: Use when adding, removing, or renaming a skill in this repository to keep the Available Skills section in README.md current.
---

# Update README

Skills live under `skills/<bucket>/<skill>/SKILL.md`. After any change to a
skill's `name`, `description`, directory, or bucket, regenerate the Available
Skills section by running the script from the repo root:

```bash
bash skills/authoring/do-update-readme/update-readme.sh
```

It rewrites the region between `<!-- skills-start -->` and `<!-- skills-end -->`
in `README.md` — a per-bucket subsection (Core, Engineering, Authoring,
Slop Guard, Workflow, Operations, Private), each with a heading, blurb, and a bulleted list
of that bucket's skills sorted by name and linked to their folder.

## When to run

- After adding a new skill directory
- After editing the `name` or `description` field in any `SKILL.md`
- After renaming, moving between buckets, or deleting a skill directory

## Script

The generator is [`update-readme.sh`](./update-readme.sh) next to this file — it
is the single source of truth. It reads each `SKILL.md`'s frontmatter, groups by
the bucket folder under `skills/`, and derives the repo-relative link from each
skill's path. Resolve the repo root with `git rev-parse --show-toplevel` so the
script works from anywhere in the tree.
