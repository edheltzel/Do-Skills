# Cleanup Swift

Quickstart:

```bash
npx skills add edheltzel/skills --skill=cleanup-swift
```

```bash
npx skills update cleanup-swift
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/cleanup-swift)

## What it does

`cleanup-swift` runs an end-of-session cleanup pass over the Swift code you
touched — a holistic review across simplification, type-driven design, macOS
conventions, and comment hygiene, aimed at leaving the session's work in a
pristine state. It proposes, it does not apply: every change comes with a
before/after, the principle behind it, and any trade-off, and nothing lands
until you approve. "No changes" is a valid outcome — if the code is already
clean, it says so and stops rather than inventing work.

## When to reach for it

Type `/cleanup-swift`, or the agent reaches for it automatically when you signal
you're wrapping up Swift work — "clean up", "polish", "tidy", "finalize". It is
explicitly *not* for one-off edits, bug fixes, or active feature work.

Reach for it at the end of a Swift session, not during it. For the same
end-of-session pass on TypeScript, React, and web code, use
[cleanup-web](./cleanup-web.md) — this is its Swift analogue, same shape,
different review lenses.

## The parallel-lens review

Scope is strictly the files modified this session (found via `git status` /
`git diff`); if it can't identify them with confidence, it stops and asks.
It then dispatches one sub-agent per review lens, all in parallel, each loading
its own skill first and reviewing only through that lens:

- **Simplification** (`simplify`) — dead code, needless abstractions, single-use
  helpers, unused params.
- **Type-driven design** ([parse-dont-validate](./parse-dont-validate.md)) — push
  checks into types; make invalid states unrepresentable.
- **Design patterns** ([design-patterns-gof](../core/design-patterns-gof.md)) —
  patterns only where they earn their weight.
- **Platform conventions** ([macos-swift-desktop](./macos-swift-desktop.md)) —
  naming, ARC, AppKit/SwiftUI boundaries, threading, main-actor isolation.
- **Comment hygiene** ([code-comments](../core/code-comments.md)) — strip "what"
  comments and AI narration; keep "why" only.

Findings aggregate into a single batch grouped by file, with conflicts between
lenses flagged for you to decide.

## Where it fits

A periodic-maintenance skill you run once, at the end of a session — the Swift
sibling of [cleanup-web](./cleanup-web.md). It doesn't author code; it composes
several authoring skills (including [macos-swift-desktop](./macos-swift-desktop.md))
into review lenses and turns them on the diff you just produced.
