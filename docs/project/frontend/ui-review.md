# UI Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-ui-review
```

```bash
npx skills update do-ui-review
```

This skill works alone. With `do-build-design-system` installed beside it, it captures screens through that skill's guarded `capture.mjs`:

```bash
npx skills add edheltzel/Do-Skills --skill=do-ui-review --skill=do-build-design-system
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-ui-review)

## What it does

`do-ui-review` critiques a screen, flow, prototype, or running build, accessibility included, and ranks what is broken. The render is the evidence. A description, DOM text, or source code only supports it. Severity, the 13 criteria, and the edge cases are in `references/criteria.md`. An installed design system's own rules come first and count as agreed criteria.

A finding needs a criterion, a findable location (the element by role and name, with its capture), the width, and the evidence. A finding that rests on taste is dropped to Left out. Any `blocking` finding makes the ship verdict `no`.

## When to reach for it

Type `/do-ui-review`, or the agent reaches for it automatically when a task fits: "check this page before I ship", "is this flow ready", "is it accessible", keyboard or screen-reader checks, "it feels off on my phone", or "it feels janky".

Reach for this when you need a ranked review of a real render. For token compliance instead, use [token-mapping](./token-mapping.md).

## Prerequisites

Trap probes run on a local build only. Lint is the project's own lint on the scoped files; run the project's accessibility scanner too when it has one. With `do-build-design-system` installed, `do-build-design-system/scripts/capture.mjs` captures behind a guard that blocks every write. It needs `--writes <file>` or `--no-backend`, and writes only to its `--out` folder (keep that under `.ui-review/`). Otherwise use the host's browser tool and save the accessibility tree yourself.

## The render is the evidence

Scope is what the caller names, else the branch's changed screens, else the five top routes. Capture each screen at each width (the app's narrowest and widest, 390 and 1280 by default), one fresh navigation per width, in the states that matter. Fix each screen's purpose in one line, and mark it assumed when the caller did not give it.

Probe the traps on that local build: keyboard path, focus after close, loading and error states, a throttled tab, reduced motion, and a touch width. Each probe gets a measured result or a reason it did not run. Measure press feedback with the Event Timing API (a `PerformanceObserver` on `event` entries, each `duration` under 100 ms). Do not click anything that writes to shared data.

Wrong: "The spacing feels tight." Right: "Label sits 24 px from its own field and 8 px from the next one (criterion 4, settings-390.png)." A finding or pass on responsiveness to input (criterion 13) from a screenshot is invalid. Judge a focus ring from the capture after real Tab presses, because a container that draws it through `:has(:focus-visible)` leaves the focused element reporting no outline.

## The ship line

The first line answers the ask in plain words. The ship line follows, as in `Ready to ship: no. Enter in Email cancels the invite (blocking 1, should-fix 2, 3 questions for a person).` Any `blocking` finding makes the verdict `no`, an inferred one `no, pending <the check>`, `should-fix` alone `yes, with fixes`, only notes `yes`.

Sort findings into `blocking`, `should-fix`, `note`, or `dismissed`. With a panel, each reviewer gets the same prompt and no persona, read only. A finding raised by two reviewers on their own is the strongest signal. Dismiss nitpicks, hypotheticals nobody traced to a real call site, and "I would have done it differently". Within a bucket, put surfaces that write data first, then order by places hit.

Run on its own, save the report to `.ui-review/<date>-<flow>.md` with captures beside it. When a coordinator asks for captures only, return the capture paths, widths, and `Coverage:` line, and no findings.

## It's working if

- Every finding has a criterion, a location, evidence, and only the widths where it shows.
- Every probe has a result or a reason it did not run.
- The first line, the ship line, and the summary agree.
- The last line reads `Coverage:` with the routes, widths, themes, and probes measured, then what was not.

## Where it fits

A reach-for-it-anytime check for one screen or flow before it ships. For token compliance, use [token-mapping](./token-mapping.md). [design-system-boss](./design-system-boss.md) runs it in its review and component playbooks, and [build-design-system](./build-design-system.md) runs it on the pilot.
