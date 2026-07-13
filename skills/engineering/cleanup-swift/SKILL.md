---
name: cleanup-swift
description: End-of-session cleanup pass for Swift code. Use this skill whenever the user asks to "clean up", "polish", "tidy", "refactor", or "review" Swift work at the end of a coding session, or when they invoke this skill by name. Performs a holistic review of files modified during the session — simplification, type-driven design, applicable Apple platform conventions, and comment hygiene. Make sure to use this skill anytime the user signals they want to wrap up or finalize Swift work, even if they don't explicitly say "cleanup". Do NOT use for one-off edits, bug fixes, or active feature work.
---

Evaluate the work done in this session and refactor it to a pristine state.

## Disposition

- **Propose, don't apply.** Surface proposed changes with clear reasoning and evidence — show before/after, name the principle that motivates the change, and wait for approval before any edits land.
- **No changes is a valid outcome after all gates pass.** Do not invent work to justify the pass.

## Scope

The coordinator captures one immutable scope packet for the session. The packet contains:

- the repository/worktree identity and current `HEAD`;
- one explicit file manifest;
- both staged and unstaged hunks for every tracked file in the manifest, including an explicit empty side when only one exists; and
- the complete content of every untracked file, either verbatim or as a synthetic diff from `/dev/null`.

The packet and its payload receive one fingerprint. Every reviewer receives that exact packet and does not rediscover files or rerun a broader diff. A manifest entry without reviewable content is **BLOCKED**; cleanup does not proceed on a partial packet. If the coordinator cannot identify the session's modified files with confidence, stop and ask.

## Review skills

The coordinator classifies platform ownership from the captured files and may inspect only the nearest unchanged `Package.swift`, Xcode project/workspace target membership, and target build settings needed to resolve ownership. Imports alone are not authoritative: a Foundation-only file owned by an iOS/iPadOS target still selects `ios-development`.

- run `ios-development` for files owned by iOS/iPadOS targets or with UIKit and iOS-specific SwiftUI/framework evidence;
- run `macos-swift-desktop` for files owned by macOS targets or with AppKit/macOS-specific evidence;
- run both for shared/cross-platform code, conflicting evidence, unknown ownership, or otherwise ambiguous target metadata;
- run neither only when evidence establishes that all changed Swift is platform-neutral.

Maintain a lens ledger for every row below. Each row is either `NOT_APPLICABLE` with scope or target-membership evidence, or `SELECTED` with a terminal reviewer state of `COMPLETED`, `FAILED`, or `BLOCKED`.

| Lens | Skill | Dispatch | Focus |
|------|-------|----------|-------|
| Simplification | `simplify` | Always | Dead code, needless abstractions, unused params, and helpers whose names do not add meaning. Do not inline single-use helpers that clarify call sites or hide non-trivial conditions. |
| Type-driven design | `parse-dont-validate` | Always | Push checks into types; make invalid states unrepresentable |
| Design patterns | `design-patterns-gof` | Always | Patterns only where they earn their weight |
| macOS platform | `macos-swift-desktop` | Conditional platform dispatch above | Naming, ARC, AppKit/SwiftUI boundaries, threading, main-actor isolation |
| iPhone and iPad | `ios-development` | Conditional platform dispatch above | Native iOS/iPadOS architecture, Swift concurrency and error handling, SwiftUI state, accessibility and performance, SwiftData migrations, URLSession, Swift Testing, and detected Apple framework integrations |
| Comment hygiene | `code-comments` | Always | Strip "what" comments and AI narration; keep "why" comments only |
| Correctness | `adversarial-review` | Always | Behavior changes, dropped guards or edge cases, concurrency hazards, swallowed errors, stale callers — bugs the session introduced |

## Approach

Dispatch the unconditional lenses and selected platform lenses in parallel. Each sub-agent:

1. **Loads its skill** via the Skill tool before review work.
2. **Reviews only the immutable scope packet supplied by the coordinator**; it does not run `git diff`, inspect uncaptured changed content, or expand scope.
3. **Reviews only through its own lens** without duplicating another lens's concerns.
4. **Returns structured findings** with file and location, proposed before/after change, motivating principle, and trade-off. A lens may return empty findings.

Sub-agent prompt template (adapt the lens name and skill name per row):

> Review the coordinator-supplied immutable Swift scope packet through the **{lens}** lens only.
>
> First, load the `{skill}` skill using the Skill tool and read it fully. Review only the packet's manifest and captured staged, unstaged, and untracked payload. Do not rerun `git diff`, rediscover files, or expand beyond the supplied scope.
>
> For each finding, return: file path + line range, proposed change (before/after), the principle motivating it, and any trade-off. If nothing needs changing for your lens, say so plainly.
>
> Do not apply changes. Propose only.

After all selected sub-agents reach a terminal state, recapture the repository/worktree identity, current manifest, and complete staged, unstaged, and untracked payload immediately before aggregation. Compare its fingerprint with the packet fingerprint. Any drift is `STALE` and **BLOCKED**: discard the review, require a fresh full run, and never combine earlier findings with newer code.

## Output

Present the aggregated review as a single batch:
- Captured scope fingerprint and freshness result
- Files reviewed, exactly matching the packet manifest
- Lens ledger: every lens shown as `NOT_APPLICABLE` with evidence, or `SELECTED` with `COMPLETED`, `FAILED`, or `BLOCKED`
- Proposed changes, grouped by file, each tagged with its lens and including before/after and reasoning
- Conflicts between lenses (e.g., one lens wants to add abstraction, another wants to simplify) — flag these for the user to decide
- Anything a sub-agent considered but rejected, with reasoning

A clean/no-changes verdict is allowed only when the freshness check passes and every selected lens is `COMPLETED`. A missing, failed, or blocked reviewer produces **BLOCKED**, never a clean result. If completed lenses found nothing worth changing, say so plainly.

Wait for the user to approve before applying any edits.
