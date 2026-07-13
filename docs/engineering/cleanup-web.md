# Web Cleanup Pass

Quickstart:

```bash
npx skills add edheltzel/skills --skill=cleanup-web
```

```bash
npx skills update cleanup-web
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/cleanup-web)

## What it does

`cleanup-web` runs an end-of-session cleanup pass over the web TypeScript, React
web, browser-facing code, and Expo/Expo Router output targeting React DOM/browser/web
that you changed this session — a holistic review across simplification,
correctness, type safety, React patterns, CSS modernization, and comment hygiene.
The defining constraint is that it proposes, it does not apply: every change comes back with a before/after and the principle behind it,
and nothing lands until you approve.
"No changes needed" is a valid, expected outcome — it won't invent work to look
busy.

## When to reach for it

You invoke this by typing `/cleanup-web` — treat it as the thing you run when
you're wrapping up. The agent may also reach for it when you signal you want to
finalize or tidy web work, even without the word "cleanup". Don't use it for
one-off edits, bug fixes, or active feature work.

This is a web-session coordinator, including for Expo or Expo Router output whose affected runtime is React DOM/browser/web; it is not a native-mobile cleanup skill. React Native or Expo iOS/Android/native-mobile implementation and review routes to [React Native and Expo](./react-native-expo.md). That mobile skill can reuse generic [TypeScript](./typescript.md), [no-use-effect](./no-use-effect.md), and [adversarial-review](../core/adversarial-review.md) guidance without making `cleanup-web` the coordinator for a native-mobile session.

Reach for it to polish a session's output before you commit. For the
posture-level "keep changes surgical and honest" rules that apply while you're
still writing, use [karpathy-guidelines](../core/karpathy-guidelines.md); this
skill is the review at the end.

## Prerequisites and immutable scope

A git working tree with this session's changes still visible. The coordinator
captures one immutable scope packet: repository/worktree identity and `HEAD`, an
explicit file manifest, both staged and unstaged hunks for each tracked file,
and complete content (or a synthetic `/dev/null` diff) for every untracked file.
If any listed file lacks reviewable content, the pass blocks instead of silently
dropping it. If the session scope itself is uncertain, it stops and asks rather
than reviewing the whole repo.

## Lenses in parallel

The pass dispatches one sub-agent per review lens, each loading its own skill
before reviewing and reporting only through that lens:

The coordinator resolves the affected runtime and framework from the nearest relevant manifest, scoped imports, router configuration, and web entry/build before selecting framework-specific lenses. Expo/Expo Router names alone, JSX/TSX syntax, file extensions or globs, generic frontend state, browser/server behavior, Vitest, Tailwind, Zustand, and ambiguity are not React web evidence. Solid, Preact, Qwik, Vue, Svelte, Angular, and framework-neutral work keep all applicable generic web lenses but do not select the full-stack lens.
Only React Native or Expo work whose affected runtime is iOS, Android, or native mobile bypasses `cleanup-web` for the mobile skill; Expo/Expo Router React DOM/browser/web cleanup stays here. JSX/TSX alone remains non-evidence for either route.

- **Full-stack web** ([full-stack-web](./full-stack-web.md)) — selected only
  after React DOM/browser/web runtime evidence and positive React evidence: an
  explicit React/React Router or Expo/Expo Router web request, a `react`,
  `react-dom`, or `react-router` dependency, Expo/Expo Router tied to an affected
  web entry or build, a React-specific import, or router configuration used by
  the web output; checks route ownership, framework mode, server/client
  boundaries, and end-to-end data-flow continuity.
- **Simplification** ([simplify](../core/simplify.md)) — dead code, needless
  abstractions, and helpers whose names do not improve the call site.
- **TypeScript** ([typescript](./typescript.md)) — sound types, `unknown` over
  `any`, discriminated unions over `as`.
- **Type-driven design** ([parse-dont-validate](./parse-dont-validate.md)) — push
  checks into types; make invalid states unrepresentable.
- **React effects** ([no-use-effect](./no-use-effect.md)) — derived state over
  effects, event handlers over sync effects, `key`-resets.
- **React performance** — component boundaries, `use client`/`use server`, data
  fetching, memoization.
- **CSS** ([modern-css](./modern-css.md)) — native CSS over JS, logical
  properties, container queries, no legacy hacks.
- **Comment hygiene** ([code-comments](../core/code-comments.md)) — strip "what"
  comments and AI narration; keep "why".
- **Correctness** ([adversarial-review](../core/adversarial-review.md)) —
  dropped guards, edge cases, async timing, stale callers, and other regressions
  introduced by the session.

Findings are aggregated into one batch grouped by file, with inter-lens conflicts
(one lens wants an abstraction, another wants to delete it) flagged for you to
decide. The output also shows every lens: non-selected lenses are
`NOT_APPLICABLE` with evidence, while selected lenses report `COMPLETED`,
`FAILED`, or `BLOCKED`.

Immediately before aggregation, the coordinator fingerprints the current
worktree manifest and complete staged, unstaged, and untracked payload again.
Drift makes the run `STALE`/`BLOCKED`; it must restart rather than mixing old
findings with new code. "No changes needed" is available only when the snapshot
is fresh and every selected reviewer completed.

## Where it fits

A periodic-maintenance skill — the closing bracket on a web coding session, where
the individual review skills it invokes are the per-topic standalones. It
coordinates web sessions only; no `cleanup-mobile` skill exists yet. It reaches
across [full-stack-web](./full-stack-web.md),
[simplify](../core/simplify.md),
[adversarial-review](../core/adversarial-review.md),
[typescript](./typescript.md), [parse-dont-validate](./parse-dont-validate.md),
[no-use-effect](./no-use-effect.md), [modern-css](./modern-css.md), and
[code-comments](../core/code-comments.md) so you don't have to run each by hand.
