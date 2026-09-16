# Harness

Modifying the coding-agent harness - distilling knowledge into reusable skills.

## Installation

For any coding agent that supports [Agent Skills](https://agentskills.io):

```bash
npx skills add edheltzel/Do-Skills
```

Install one skill by exact name (`icm-grill` is unprefixed; the rest use `do-`):

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

## Skills

| Skill | Description |
|-------|-------------|
| [`do-distill-to-skill`](./do-distill-to-skill/) | Distill knowledge from any source — blog posts, articles, documentation, GitHub repos, video transcripts, books, papers — into a well-structured agent skill. |
| [`do-review-skill`](./do-review-skill/) | Reviews PRs that add or modify Agent Skills, checking structural validity, design quality, and marketplace consistency. |
| [`do-writing-great-skills`](./do-writing-great-skills/) | Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable. |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/harness/) — human-facing pages for these skills
