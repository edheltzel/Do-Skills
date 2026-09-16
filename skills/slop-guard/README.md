# Slop Guard

Catching AI slop - restating output in plain human language and stripping jargon-heavy writing.

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
| [`do-bro`](./do-bro/) | Restate the last message in plain human language, with no jargon. |
| [`do-humanize`](./do-humanize/) | Rewrite AI-generated developer text to sound human — fix inflated language, filler, tautological docs, and robotic tone. |
| [`do-review-ai-writing`](./do-review-ai-writing/) | Detect AI-generated writing patterns in developer text — docs, docstrings, commit messages, PR descriptions, and code comments. |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/slop-guard/) — human-facing pages for these skills
