# Docs

Human-facing pages for the skills in this repository, one per skill, grouped by
the same buckets used under [`skills/`](../skills/). Engineering pages nest
under the same tech folders as the skills. Each page explains what a skill
does, when to reach for it, and where it sits among the others — it is not a
copy of the skill's `SKILL.md`.

Only **promoted** buckets have docs pages:

- [`core/`](./core/) - foundational tools for every project and workbench
- [`engineering/`](./engineering/) - general and stack-specific code craft (`elixir/`, `frontend/`, `go/`, `python/`, `rust/`, `swift/`, `typescript/`, `general/`)
- [`content/`](./content/) - audience-facing media: pictures, diagrams, video, motion, blog, social
- [`harness/`](./harness/) - modifying the coding-agent harness
- [`slop-guard/`](./slop-guard/) - corrective tools that strip jargon and AI slop from output
- [`workflow/`](./workflow/) - see the canonical grouping metadata in [`skills.sh.json`](../skills.sh.json)

`operations/`, `personal/`, and `private/` are not promoted and have no docs pages.

To add or update a page, follow [`.agents/writing-docs.md`](../.agents/writing-docs.md).
