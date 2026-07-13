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
touched — a holistic review across simplification, correctness, type-driven
design, conditional iOS/iPadOS and macOS conventions, and comment hygiene,
aimed at leaving the session's work in a pristine state. It proposes, it does
not apply: every change comes with a before/after, the principle behind it, and
any trade-off, and nothing lands until you approve. "No changes" is available
only after every selected lens completes against a fresh scope snapshot.

## When to reach for it

Type `/cleanup-swift`, or the agent reaches for it automatically when you signal
you're wrapping up Swift work — "clean up", "polish", "tidy", "finalize". It is
explicitly *not* for one-off edits, bug fixes, or active feature work.

Reach for it at the end of a Swift session, not during it. For the same
end-of-session pass on TypeScript, React, and web code, use
[cleanup-web](./cleanup-web.md) — this is its Swift analogue, same shape,
different review lenses.

## Immutable scope and parallel lenses

The coordinator captures one immutable scope packet: repository/worktree
identity and `HEAD`, an explicit file manifest, both staged and unstaged hunks
for each tracked file, and complete content (or a synthetic `/dev/null` diff)
for every untracked file. A listed file without reviewable content blocks the
pass. If the session scope cannot be identified confidently, it stops and asks.
Each selected lens receives the same packet and reviews only through that lens.

- **Simplification** ([simplify](../core/simplify.md)) — dead code, needless
  abstractions, and helpers whose names do not improve the call site.
- **Type-driven design** ([parse-dont-validate](./parse-dont-validate.md)) — push
  checks into types; make invalid states unrepresentable.
- **Design patterns** ([design-patterns-gof](../core/design-patterns-gof.md)) —
  patterns only where they earn their weight.
- **macOS platform** ([macos-swift-desktop](./macos-swift-desktop.md)) —
  selected for macOS target ownership or AppKit/macOS-specific evidence.
- **iPhone and iPad** ([ios-development](./ios-development.md)) — selected for
  iOS/iPadOS target ownership or platform evidence, including Foundation-only
  files that belong to an iOS target.
- **Comment hygiene** ([code-comments](../core/code-comments.md)) — strip "what"
  comments and AI narration; keep "why" only.
- **Correctness** ([adversarial-review](../core/adversarial-review.md)) —
  dropped guards, edge cases, concurrency hazards, swallowed errors, stale
  callers, and other regressions introduced by the session.

Platform classification may inspect the nearest unchanged `Package.swift`,
Xcode project/workspace target membership, and target build settings. Shared
code, unknown ownership, or ambiguous metadata selects both iOS/iPadOS and macOS
lenses; only established platform-neutral Swift selects neither.

Findings aggregate into a single batch grouped by file, with conflicts between
lenses flagged for you to decide. The output accounts for every lens as either
`NOT_APPLICABLE` with evidence or `SELECTED` with `COMPLETED`, `FAILED`, or
`BLOCKED`.

Immediately before aggregation, the coordinator fingerprints the current
worktree manifest and complete staged, unstaged, and untracked payload again.
Drift makes the run `STALE`/`BLOCKED`; it must restart rather than mixing old
findings with new code. A missing, failed, or blocked reviewer prevents a clean
verdict.

## Where it fits

A periodic-maintenance skill you run once, at the end of a session — the Swift
sibling of [cleanup-web](./cleanup-web.md). It doesn't author code; it composes
several authoring and review skills — including
[simplify](../core/simplify.md),
[adversarial-review](../core/adversarial-review.md),
[macos-swift-desktop](./macos-swift-desktop.md), and
[ios-development](./ios-development.md) — into review lenses and turns them on
the immutable scope packet.
