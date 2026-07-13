# Tailwind CSS v4

Quickstart:

```bash
npx skills add edheltzel/skills --skill=tailwind-v4
```

```bash
npx skills update tailwind-v4
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/tailwind-v4)

## What it does

`tailwind-v4` encodes the CSS-first model that Tailwind v4 moved to: theme values
live in `@theme` blocks inside CSS instead of a `tailwind.config.js`, the build
runs through the `@tailwindcss/vite` plugin instead of PostCSS, and colors default
to OKLCH. It covers the `@theme` directive modes (`default`, `inline`,
`reference`), the double-dash variable naming conventions, two-tier
token systems, custom fonts, animation keyframes, and three dark-mode strategies
(media query, class, attribute).

The defining constraint is that its advice only applies once the project is
actually on the v4 path. Before it recommends `@theme` choices or OKLCH tokens,
its setup-verification gates confirm the build wiring loads `@tailwindcss/vite`,
`package.json` is on major 4, and the theme source is CSS rather than a lingering
v3 `extend` block. If a v3 PostCSS toolchain is still in place, migrating the
wiring takes precedence over any token tweak.

## When to reach for it

Type `/tailwind-v4`, or the agent reaches for it when setting up Tailwind v4,
defining `@theme` variables, migrating a v3 config to CSS-first, choosing OKLCH
tokens, wiring the Vite plugin, or configuring dark mode. It triggers on `@theme`,
`@tailwindcss/vite`, `oklch`, `--color-`, and "tailwind v4".

## What's inside

- **Setup & installation** ([references/setup.md](https://github.com/edheltzel/skills/tree/main/skills/engineering/tailwind-v4/references/setup.md))
  — Vite plugin config, package setup, TypeScript config, and why v4 drops
  `tailwind.config.js` / `postcss.config.js`.
- **Theming & design tokens** ([references/theming.md](https://github.com/edheltzel/skills/tree/main/skills/engineering/tailwind-v4/references/theming.md))
  — `@theme` mode combinations, the OKLCH color system and palette, two-tier
  token mapping, variable fonts, and animation keyframes.
- **Dark-mode strategies** ([references/dark-mode.md](https://github.com/edheltzel/skills/tree/main/skills/engineering/tailwind-v4/references/dark-mode.md))
  — media-query, class-based, and attribute-based approaches with their
  trade-offs, plus FOUC prevention and reduced-motion/contrast handling.

## Where it fits

The Tailwind-specific layer of frontend styling. It sits alongside
[modern-css](./modern-css.md), which covers the native CSS techniques —
`has()`, container queries, logical properties, cascade layers — that Tailwind
v4 exposes through utilities; reach for `modern-css` when the technique is the
point and for `tailwind-v4` when the question is how to express it in v4's
CSS-first config. It also feeds [design-system](./design-system.md): this skill
defines the `@theme` tokens and OKLCH scale, and `design-system` decides the
token architecture, component APIs, and accessibility those tokens serve.
