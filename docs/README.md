# Docs

Human-facing pages for the skills in this repository, one per skill. The tree
mirrors [`skills/`](../skills/): `docs/<scope>/<group>/<slug>.md`. Each page
explains what a skill does, when to reach for it, and where it sits among the
others. It is not a copy of the skill's `SKILL.md`.

Only **promoted** groups have docs pages:

- [`global/core/`](./global/core/) - stack-agnostic foundations
- [`global/workflow/`](./global/workflow/) - commits, docs, GitHub, PRs, technical writing
- [`global/content/`](./global/content/) - illustrations, diagrams, images
- [`project/typescript/`](./project/typescript/) - TypeScript and Effect
- [`project/frontend/`](./project/frontend/) - web frontend
- [`project/swift/`](./project/swift/) - Swift and Apple platforms
- [`project/backend/`](./project/backend/) - Go, Python, Rust review
- [`project/product/`](./project/product/) - product marketing

`global/operations/` and `global/personal/` are not promoted and have no docs pages.
Group descriptions live in [`skills.sh.json`](../skills.sh.json).

To add or update a page, follow [`.agents/writing-docs.md`](../.agents/writing-docs.md).
