# Content

Audience-facing media - pictures, diagrams, video, motion, blog, and social.

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
| [`do-art`](./do-art/) | Static visual content across 20+ formats - diagrams, mermaid, infographics, D3 dashboards, comics, icons, wallpaper - via Flux, Nano Banana Pro, and GPT-Image-2. |
| [`do-illo`](./do-illo/) | Creates original editorial illustrations where a recurring mascot character performs the idea — one caught scene by default, a hand-built explainer diagram (labeled stages, a fan-out, timeline, loop, or stack) when the structure itself is the point, or a transparent character cutout (pose-only compositing asset, no scene or text) — in one of seventeen bundled looks (sixteen print, plus a photoreal toy-brick set). |

## See Also

- [Skill catalog](../../README.md) — every bucket in this repo
- [Docs](../../docs/content/) — human-facing pages for these skills
- [tmchow/illo-skill](https://github.com/tmchow/illo-skill) is the source for `do-illo`
