# Make motion

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-make-motion
```

```bash
npx skills update do-make-motion
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/design/do-make-motion)

## What it does

`do-make-motion` turns a product, feature, or launch idea into a 15 to 25 second motion graphics video, for X by default, that a stranger understands with the sound off and that looks made by hand.

It builds that video in Remotion, in the product's own brand, with music made in code, then checks it by measurement and delivers an MP4. The loop runs by itself unless you pass `step` to approve each stage. It does not edit footage.

## Example

```
/do-make-motion launch video for PocketLedger, a receipt scanner that sorts expenses into tax categories
```

## When to reach for it

Type `/do-make-motion`, or the agent reaches for it automatically when a task fits.

Reach for this when you want a launch video, feature demo, teaser, or explainer ("make a launch video for this", "roast my video idea"). `/do-make-motion <idea>` is the whole loop. `/do-make-motion step <idea>` stops for a yes after the script, the stills, and the review cut. `/do-make-motion roast <idea>` is only the roasted pitch and three hooks. `/do-make-motion theme <source>` only resolves and checks a theme. For a logo instead, use [do-make-logo](./make-logo.md). For a typeface, use [do-make-font](./make-font.md).

## Prerequisites

Before anything else, say once that Remotion is free for individuals and companies of up to 3 people, and that a larger company needs a Remotion company licence (remotion.dev/license). Never decide that for them.

Needs Node 22.6 or later, about 400 MB for Remotion and headless Chrome on first render, and ffmpeg (contact sheet, jump and energy checks, X export). A one-shot 20 s video is about two hours of agent time, mostly renders and review. Copy `template/` to the chosen folder (default `video/`), run `npm install`, and `npm run stills example` before writing anything. The video then lives in its own folder under `src/`, and the example is deleted. Commands are in `references/pipeline.md`.

## Roast, then measure

**Roast** is the defining idea. The pitch roast runs on the idea as given and is shown even in a one-shot: one-sentence story, three hooks, the pick and why, the signature move, and what was cut. Every scene has to tie to that sentence.

Ask once what the product does, who watches, what can be shown, a theme source, and anything that must be on screen. Defaults otherwise, stated out loud: 5:4 at 1350x1080, 60 fps, about 20 s, `punchy`. Look comes from the product's site or tokens. design.how's look is only when there is no brand at all. Theme work is done when every text role passes contrast on every ground, fonts are loaded, and any commercial or unknown font licence is warned.

Script in beats (`SCRIPT.md` and `timing.ts` agree, within 2 s of the target). Stills are real frames that hold up as posters. Motion in `src/kit/` is a pure function of the frame. `npm run jumps` and `npm run energy` must exit 0 before anyone sees the cut. Two review passes follow: measured findings are fixed, taste is weighed against the one-sentence story, and the master is never the first render of a fix. Music is last, mastered to -14 LUFS, and reported as measured numbers only. Open on the product, busy from frame 0, never a title card. A check that did not run this session is "not run".

## It's working if

- The hand-off names file paths, length, the one-sentence story, what the roasts changed, measured audio numbers, and anything not verified.
- Jumps and energy exit 0, and the second review pass finds nothing above "minor".
- `npm run audio:check` exits 0, and again with `-- --mp4` on the master.
- Each still is a poster: real content, subject filling the frame, UI text 22 px or more, nothing decorative.
- Captions are one line per beat, no punctuation and no exclamation marks, with one accent for what matters.

## Where it fits

A standalone you reach for whenever the job is a short product motion video, not an edit of footage. It sits beside [do-make-logo](./make-logo.md) and [do-make-font](./make-font.md): a reveal video can take the mark from do-make-logo and the type from do-make-font.
