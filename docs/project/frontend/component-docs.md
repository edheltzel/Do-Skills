# Component docs

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-component-docs
```

```bash
npx skills update do-component-docs
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-component-docs)

## What it does

`do-component-docs` writes a draft documentation entry for one component, from its code, stories, and real call sites. Gaps are marked, not filled: it never writes a variant, prop, token name, example, or use that has no listed source. It does not judge the design, it does not edit the code, stories, or spec, and it publishes nothing.

## When to reach for it

Type `/do-component-docs`, or the agent reaches for it automatically when a task fits.

Reach for it to document one component ("document the button", "write docs for Select", "what states does Toast have") or to write usage rules for a new or changed component. For changing the component, use [build-design-system](./build-design-system.md). Foundations and pages that span components are out of scope; no skill here writes those.

## Gaps stay marked

The heading order and a worked example live in `references/doc-format.md`. The run pastes those nine headings empty, finds the component, and records its code, props type, styles, and stories as Sources lines. It finds two real uses, by call-site search or from the ask. It traces which source gave each example, variant, prop, state, and token, copying token names and example code character for character. Every disagreement between sources is a line under Conflicts, with the quoted rule that settles it, or "no rule, not chosen".

Usage rules come last. Each rule is `rule/<component>-<slug>`, a condition, an action, a reason, its evidence (two call sites, a measurement with its path, a named principle, or the person's words), and a `Don't:` line with real code that breaks it. A rule you cannot break with a snippet is cut. Guessed at gets one line per judgement call.

On its own, the run saves to `docs/system/<name>.md` with a draft comment on line 1 and writes each missing example file. The reply opens with the path, what the entry covers and its status, then up to three questions with defaults and one prompt the person can paste. Gates (a question with its default) appear only where a rule adds one. Counts in the reply come from `grep -o` on the saved file, below the draft comment.

A behaviour that looks like a bug is written as it is, then a `Defect:` line to the owner with what goes wrong for the user and the smallest fix. A part also used on its own gets a `### Parts` subsection under Description. A compound component (`Tabs` with `Tab`) is one entry. Never invent a state or a precedence order to make a section look complete.

## Stops

Searching and still missing one of these stops the run:

- **The code.** Nothing else sources the variants, props, or behaviour.
- **The variant list** (props type or stories). A guessed list documents a different component. A props type with no variant prop is an empty list: Variants reads "None" and the run goes on.
- **Any use, real or planned.** Invented uses read like real ones and readers copy them first.

One real use, planned uses, and a deprecated predecessor are marked as such, not stopped on. A planned use says planned. A stopped run returns the stop, the facts sourced so far by section, and the smallest reply that unblocks it ("one screen name, what put the component there, and which variant showed").

## It's working if

- The nine headings are present in order. A section with nothing sourced reads `Not applicable: <reason>`.
- Every variant, prop, token, and example has a Sources line. Every conflict is shown.
- Every Usage rule has evidence and a `Don't:` line.
- The file is `docs/system/<name>.md`, draft comment on line 1.

## Where it fits

A standalone you reach for when one component needs a docs entry. It only reads sources and writes the draft; it does not change the component. That work is [build-design-system](./build-design-system.md).