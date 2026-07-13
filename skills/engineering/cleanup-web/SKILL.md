---
name: cleanup-web
description: End-of-session propose-only cleanup for web TypeScript, React web, browser-facing code, and Expo/Expo Router React DOM/browser/web output. USE WHEN the user asks to clean up, polish, tidy, refactor, review, wrap up, or finalize web/frontend work, or invokes this skill by name. Reviews modified web files for simplification, type safety, React patterns, CSS modernization, and comment hygiene. NOT FOR React Native or Expo iOS/Android/native-mobile sessions, one-off edits, bug fixes, or active feature work; only native-mobile React Native or Expo implementation and review routes to react-native-expo.
---

Evaluate the work done in this session and refactor it to a pristine state.

## Disposition

- **Propose, don't apply.** Surface proposed changes with clear reasoning and evidence — show before/after, name the principle that motivates the change, and wait for approval before any edits land.
- **No changes is a valid outcome after all gates pass.** Do not invent work to justify the pass.
- **One pass, complete.** Report every issue the lenses surface in this run. Do not hold findings back for a later round.
- **Budget by fix complexity.** A proposal that would introduce net-new code, modules, or dependencies not already in the session's scope is surfaced as informational context, never a cleanup this session presses to apply.
- **Re-reviews verify, they don't rediscover.** A second pass confirms the prior fixes landed and holds; it does not open new discovery.

## Scope

The coordinator captures one immutable scope packet for the session. The packet contains:

- the repository/worktree identity and current `HEAD`;
- one explicit file manifest;
- both staged and unstaged hunks for every tracked file in the manifest, including an explicit empty side when only one exists; and
- the complete content of every untracked file, either verbatim or as a synthetic diff from `/dev/null`.

The packet and its payload receive one fingerprint. Every reviewer receives that exact packet and does not rediscover files or rerun a broader diff. A manifest entry without reviewable content is **BLOCKED**; cleanup does not proceed on a partial packet. If the coordinator cannot identify the session's modified files with confidence, stop and ask.

This is a web-session coordinator, including for Expo or Expo Router output whose affected runtime is React DOM/browser/web; it is not a native-mobile cleanup skill. For a React Native or Expo iOS/Android/native-mobile app session, do not run `cleanup-web`; route implementation or review to [react-native-expo](../react-native-expo/SKILL.md). The mobile skill may reuse generic `typescript`, `no-use-effect`, and `adversarial-review` guidance, but `cleanup-web` does not claim or coordinate the native-mobile session.

## Review skills

Each applicable skill below represents a distinct review lens. Select lenses from the captured packet, then dispatch one sub-agent per selected lens.

Maintain a lens ledger for every row below. Each row is either `NOT_APPLICABLE` with scope evidence, or `SELECTED` with a terminal reviewer state of `COMPLETED`, `FAILED`, or `BLOCKED`.

Before selecting framework-specific lenses, inspect the nearest relevant manifest, scoped imports, router configuration, and affected runtime. Select `full-stack-web` only after React DOM/browser/web evidence plus positive React evidence: an explicit React/React Router request, an explicit Expo/Expo Router web request, a `react`, `react-dom`, or `react-router` dependency, Expo/Expo Router tied to an affected web entry or build, a React-specific import, or router configuration used by the web output. Expo/Expo Router names alone, JSX/TSX syntax, file extensions or globs, generic frontend state, browser/server behavior, Vitest, Tailwind, Zustand, and ambiguity do not establish React web. Solid, Preact, Qwik, Vue, Svelte, Angular, and framework-neutral work must not select the full-stack lens; keep every other generic web lens that the packet evidence makes applicable.
Only React Native or Expo work whose affected runtime is iOS, Android, or native mobile routes to `react-native-expo`; Expo/Expo Router React DOM/browser/web cleanup remains with this coordinator. JSX/TSX alone remains non-evidence for either framework route.

| Lens | Skill | Apply when | Focus |
|------|-------|------------|-------|
| Full-stack web | `full-stack-web` | The affected runtime is React DOM/browser/web and positive React evidence is present: an explicit React/React Router request, an explicit Expo/Expo Router web request, a `react`, `react-dom`, or `react-router` dependency, Expo/Expo Router tied to an affected web entry or build, a React-specific import, or router configuration used by the web output | Cross-layer router mode and route ownership, server/client boundaries, loader/action/Form/fetcher/revalidation semantics, and end-to-end contract continuity. Defer local types, effects, CSS, performance, test design, and generic correctness to the other lenses. |
| Simplification | `simplify` | The diff changes executable web code or abstractions | Dead code, needless abstractions, unused params, over-engineered utilities, and helpers whose names do not add meaning. Do not inline single-use helpers that clarify call sites or hide non-trivial conditions. |
| TypeScript | `typescript` | TypeScript types or implementation changed | Type soundness, pragmatic generics, discriminated unions over type assertions, `unknown` over `any` |
| Type-driven design | `parse-dont-validate` | The diff changes parsing, domain types, validation, or state modeling | Push checks into types; make invalid states unrepresentable; branded types where warranted |
| React effects | `no-use-effect` | React effects, derived state, subscriptions, or synchronization changed | Derived state over effects, event handlers over sync effects, `key`-resets over effect-driven resets, `useSyncExternalStore` over manual subscriptions |
| React performance | `vercel-react-best-practices` | React rendering, data fetching, client/server components, or bundle behavior changed | Component boundaries, `use client` / `use server` placement, data fetching patterns, bundle impact, memoization |
| CSS | `modern-css` | CSS, styling utilities, or responsive layout changed | Native CSS over JS workarounds, logical properties, container queries, modern selectors, no legacy hacks |
| Comment hygiene | `code-comments` | Comments or documentation inside code changed, or generated narration appears in the diff | Strip "what" comments and AI narration; keep "why" comments only |
| Correctness | `adversarial-review` | Executable behavior or contracts changed | Behavior changes, dropped guards or edge cases, async/effect timing, server/client boundary, stale callers — bugs the session introduced |

## Approach

Dispatch all selected lenses in parallel. Each sub-agent:

1. **Loads its skill** via the Skill tool before review work.
2. **Reviews only the immutable scope packet supplied by the coordinator**; it does not run `git diff`, inspect uncaptured changed content, or expand scope.
3. **Reviews only through its own lens** without duplicating another lens's concerns.
4. **Returns structured findings** with file and location, proposed before/after change, motivating principle, and trade-off. An applicable lens may return empty findings.

Sub-agent prompt template (adapt the lens name and skill name per row):

> Review the coordinator-supplied immutable scope packet through the **{lens}** lens only.
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
