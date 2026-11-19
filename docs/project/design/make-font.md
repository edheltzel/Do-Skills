# Make a font

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=make-font
```

```bash
npx skills update make-font
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/design/make-font)

## What it does

`make-font` makes your own font from fonts you like. It measures the references, picks the closest open-licence (OFL or Apache) font, fits that base to the numbers, checks it, and delivers an OFL family with web files and a font book.

Every outline in the result comes from the open base. References contribute measurements only (proportions, stem and stroke thickness, class-mean widths and spacing), never outlines, kerning pairs, or per-glyph widths. The family ships under the OFL with a new name.

## When to reach for it

Type `/make-font`, or the agent reaches for it automatically when a task fits ("make me a font like these", "/make-font", "build a typeface from these screenshots").

Reach for this when someone wants a font from references they name (files or screenshots). It will not clone, trace, convert, or "rebuild exactly" a commercial font, and it will not rename one. It offers the proportional match instead. A screenshot is fine to measure, and a file is fine to measure if the person has it. Neither is copied into the output or committed.

## Prerequisites

Scripts in `scripts/` need Python 3.9+ with `fonttools`, `brotli`, `uharfbuzz`, `numpy`, and `pillow` (`skia-pathops` to remove overlaps, `fontbakery` for its checks if wanted), and Node 18+ with Playwright for the PDF. Run Python as `python3 -I`. Every script reads `--help`. Downloaded fonts stay in their own folder and are only read, never run.

## Proportional match

Say this at the start, then hold it: "I match proportions, widths and spacing on an open font. I don't trace or copy the outlines of the fonts you send." `fit_font.py` and `space_font.py` read only the base font and `targets.json`. Targets are font-wide numbers and class means.

- **Ask once.** References (two to four), use (text, display, or UI), scripts, weights, and a new family name. If they can type in the font, ask for the four `SAMPLE_LINES` in `scripts/fontlib.py`, large, cap height 80 px or more. Defaults: text, Latin, Regular and Medium, a name you propose.
- **Measure.** `measure_font.py` for files, `measure_image.py` for screenshots. Run `measure_image.py --selftest` at the screenshot size before trusting a shot. Report every low-confidence number.
- **Targets.** `make_targets.py`. Where references disagree, ask which way to lean instead of averaging a serif with a sans.
- **Foundation.** `find_foundation.py` ranks open families from the Google Fonts catalogue, variable fonts ahead. Show the top three to five with deltas and axes, note any Reserved Font Name, and wait for a yes. Do not build before that.
- **Fit.** `fit_font.py` solves stems, contrast, and width classes until every class mean is within 0.3 percent, never stretching more than 3 percent. At the stretch limit, name that letter class and offer a base with a width axis.
- **Space.** `space_font.py` sets class sidebearings, an optional global track, scaled kerning, and the collision guard. More than 150 guard pairs means too tight: loosen and rerun.
- **Package and check.** `package.py`, then `check_font.py`. Look at every overlay at text size and display size. A failed gate goes back to the step that owns it. fontbakery not installed is "not run", not "passed".
- **Font book.** `font_book.py`, then `node scripts/render_book.mjs book/`. PNG pages and one PDF. It fails on a fallback glyph or an overflow. Open three pages before hand-off.

Hand off in this order: family, weights, glyph count, and scripts; the base and its licence; the gates with their numbers; what still differs and why (the base's own drawing); where the files are. Link the PDF. Say the provenance plainly: built on an open font, fitted to measurements. Do not commit or publish font files unless asked, and never a reference font. Do not keep the base name, a Reserved Font Name, or its trademark, and do not put a reference font's name in the output files, the font book, or the package README.

## Where it fits

A standalone brand step. Its font can set the wordmark for [make-logo](./make-logo.md) and the type in a [make-motion](./make-motion.md) video. It borrows Playwright from [build-design-system](../frontend/build-design-system.md) when that skill is installed beside it.
