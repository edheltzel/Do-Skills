# Karpathy Guidelines

Quickstart:

```bash
npx skills add edheltzel/skills --skill=karpathy-guidelines
```

```bash
npx skills update karpathy-guidelines
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/karpathy-guidelines)

## What it does

`karpathy-guidelines` is a set of four behavioural rules that steer an agent away
from the coding mistakes LLMs make by default — overbuilding, refactoring code it
wasn't asked to touch, guessing instead of asking, and calling work "done"
without a way to check. It doesn't teach a language or a framework; it changes
*how* the agent works in any of them. The defining move is that it biases toward
caution over speed — it would rather the agent stop and ask than produce 200
confident lines that solve a problem nobody posed.

## When to reach for it

Type `/karpathy-guidelines`, or the agent reaches for it automatically when a
task involves writing, reviewing, or refactoring code.

Reach for it when you want an agent's output to stay small, surgical, and honest
about its assumptions — especially on an unfamiliar or brownfield codebase where
the temptation to "improve" adjacent code does real damage. For the language-level
"how should this TypeScript actually read" question, use
[typescript](../engineering/typescript.md) instead; this skill governs behaviour,
not syntax.

## The four guidelines

- **Think before coding.** State assumptions out loud; if there are several
  readings, surface them rather than silently picking one. If a simpler approach
  exists, say so.
- **Simplicity first.** The minimum code that solves the problem — no speculative
  features, no abstractions for single-use code, no error handling for impossible
  states. If 200 lines could be 50, rewrite it.
- **Surgical changes.** Touch only what the request needs. Don't reformat or
  refactor untouched code; match the existing style. Remove only the orphans your
  own change created — flag pre-existing dead code, don't delete it.
- **Goal-driven execution.** Turn the task into a verifiable goal ("fix the bug"
  → "write a test that reproduces it, then make it pass") and loop until it's
  met. Strong success criteria let the agent finish on its own; weak ones ("make
  it work") force constant back-and-forth.

## It's working if

- The agent names its assumptions and asks when a request is ambiguous, instead
  of guessing.
- A diff traces line-for-line to what you asked for — no drive-by reformatting or
  unrelated "cleanup".
- The agent states how it will verify the change and actually checks, rather than
  declaring success.

## Where it fits

A reach-for-it-anytime standalone that sets the working posture for any coding
task, in any language. It pairs naturally with the code-craft skills in
[`engineering/`](../engineering/) — those say what good code looks like; this
says how to change a codebase without collateral damage.
