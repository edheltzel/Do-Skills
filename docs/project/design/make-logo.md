# Make a logo

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-make-logo
```

```bash
npx skills update do-make-logo
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/design/do-make-logo)

## What it does

`do-make-logo` makes a logo, mark, or wordmark for your product. It measures logos you like and a wider set from Are.na, turns them into numbers, builds original marks to those numbers from parts it is free to use, and delivers a logo book of six directions plus a package for the one you pick.

Every variant is checked against every reference before you see it. Traced directions are allowed but always marked: each names its source in its recipe (`traced_from`), and its trademark sheet says it was traced. Nothing the skill delivers is a legal clearance.

## When to reach for it

Type `/do-make-logo`, or the agent reaches for it automatically when a task fits ("make me a logo", "a logo like these but ours").

Reach for this when you want a new mark for a product and can show logos you like. It refuses "recreate X's logo" or any famous brand named as the target. For a font instead of a mark, use [do-make-font](./make-font.md).

## Prerequisites

Python 3.10+ with `numpy`, `scipy`, `scikit-image`, `pillow`, `skia-pathops`, `fonttools`, `uharfbuzz`, and `resvg-py`, run as `python3 -I`, plus `potrace` for tracing. Node 18+ for the Are.na pull, and Playwright with a Chromium for the logo book. Downloaded references stay in their own folder and are never committed.

## Six directions

- **Ask once.** Name, what it does and for whom, one idea the mark could carry, 3 to 6 logos you like, where it will live, colour limits, and mark, wordmark, or both.
- **Gather and measure.** Your references, up to 100 from Are.na, and a set from the product's own world. `measure_logo.py` turns each into numbers; `calibrate.py` sets the distance limit.
- **Directions.** Six different answers to the idea, mixing traced marks changed to carry the idea, idea marks built from grid shapes, and typographic marks in an OFL display face. At least half carry the idea as a picture, not a letter.
- **Check.** `check_logo.py` tests stroke and counters at 16 px, palette contrast, and the nearest reference. A built direction that sits too close is rebuilt.
- **Logo book and package.** `logo_book.py` and `render_book.mjs` produce `logobook.pdf`. After you pick, `package_logo.py` writes SVGs, PNGs from 16 to 1024 px, a favicon, licences, and a trademark search sheet.

## It's working if

- The book shows six directions that each read as their idea at 64 px, and no two make the same move.
- Every traced direction is labelled as traced, in its recipe and its trademark sheet.
- No output file, sheet, or message names a reference's brand.

## Where it fits

A standalone brand step. It pairs with [do-make-font](./make-font.md) for the wordmark's type, and hands the chosen mark to [do-make-motion](./make-motion.md) for a reveal video.
