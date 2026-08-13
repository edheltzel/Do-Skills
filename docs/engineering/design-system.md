# Design Systems

Quickstart:

```bash
npx skills add edheltzel/skills --skill=do-design-system
```

```bash
npx skills update do-design-system
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/do-design-system)

## What it does

`design-system` steers UI components toward being accessible, themeable,
composable, and visually consistent — covering component API design, two-layer
design tokens, WCAG-grade accessibility, theming, and interaction patterns for
dialogs, forms, toasts, and loading states. The defining constraint is that
accessibility and the token scale are baselines, not features: an interactive
component that isn't keyboard-operable, or a value that isn't drawn from the
scale, is wrong by definition — there is no "add a11y later" path.

## When to reach for it

Type `/design-system`, or the agent reaches for it automatically when building
buttons, dialogs, forms, cards, or any reusable component (it triggers on `.tsx`,
`.jsx`, `.css`, and `.scss`).

Reach for it when you're building or reviewing the components themselves — how
their props are shaped, how they theme, how they behave under keyboard and screen
reader. For the raw CSS techniques those components use, drop to
[modern-css](./modern-css.md); to generate a project-wide `DESIGN.md` spec before
any components exist, use [bootstrap-design-system](./bootstrap-design-system.md).

## The patterns it enforces

- **Headless + styled layers.** Behaviour from accessible primitives (Radix, Ark,
  Headless UI); appearance in your own styling layer on top.
- **Compound components over prop soup.** `<Dialog.Root><Dialog.Trigger>…` with
  named parts, not a monolith configured by a dozen booleans. Variants are
  discriminated unions, never boolean flags.
- **Two token layers.** Primitive tokens hold raw values; semantic tokens assign
  meaning and are what components consume. OKLCH over HSL for perceptual
  uniformity and P3 gamut. No third "component token" layer unless white-labeling.
- **Accessibility baseline.** `:focus-visible` rings, focus trap and restore on
  overlays, semantic HTML before ARIA, WCAG AA contrast, `prefers-reduced-motion`.

## It's working if

- Components expose composable named parts and union-typed variants, not booleans.
- Every color, space, and radius comes from the token scale — no arbitrary values.
- Interactive elements are `<button>`/`<a>`, operable by keyboard, with visible
  focus and correct focus handling on open/close.

## Where it fits

A reach-for-it-anytime standalone for component work that sits above
[modern-css](./modern-css.md) (the CSS it's built from) and pairs with
[typescript](./typescript.md) for prop types like discriminated unions.
[bootstrap-design-system](./bootstrap-design-system.md) is the upstream step that
writes the spec; this skill implements against it.
