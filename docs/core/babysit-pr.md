# Babysit PR

Quickstart:

```bash
npx skills add edheltzel/skills --skill=babysit-pr
```

```bash
npx skills update babysit-pr
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/babysit-pr)

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

## What it does

`babysit-pr` watches one open GitHub PR and keeps it moving toward merge, reacting
to two independent streams — incoming review comments and CI status — as each
change arrives, for the whole life of the PR. It delegates comment fixes to
[resolve-pr-feedback](../core/resolve-pr-feedback.md) and CI failures to
[debug](../core/debug.md); it owns only the watch loop. The defining constraint is
that **the watch runs until the PR is terminal, a budget cap is hit, or you stop
it — not until the first thing it cannot do itself.** An item needing a human is
parked as a standing residual that blocks *declaring* merge-ready but never ends
the watch; the loop keeps driving every other stream around it.

## When to reach for it

Type `/babysit-pr <pr>`, or the agent reaches for it when you ask to babysit,
watch, or keep an eye on a PR over time. It takes a PR number, a URL, or nothing
(the current branch's PR). GitHub only, including GitHub Enterprise.

**Invoking the watch authorizes this session's pushes on that PR** — the mutation
envelope below. For a one-shot resolve of the current comments use
[resolve-pr-feedback](../core/resolve-pr-feedback.md); for one CI failure use
[debug](../core/debug.md). Babysit is for the ongoing watch, not a single action.

## The mutation envelope and "looks ready"

On the PR head the loop fixes checks, commits, pushes (verified — the exact-ref
OID must match local `HEAD`), replies to and resolves threads, and refreshes a
stale PR description — autonomously, as its normal operation for this session. It
**never** merges, rebases, force-pushes, or approves a gated CI run; those stay
with you.

"Looks ready" is signal-gated, not a timer: CI green plus a quiet window is not
enough while a review is still in flight (an 👀 reaction, a "reviewing…" comment,
or a reviewer that reviewed an earlier head). It reports "looks ready — your call
to merge," never "safe to merge."

## The ordering invariant

Each tick: terminal check first; capture the head SHA; **feedback before CI**
(a comment fix pushes a new commit that re-triggers CI anyway, so handling
comments while CI still runs collapses the two timelines); cancel CI work against
a now-dead SHA if the comment pass pushed; then remediate CI on the current head;
then branch currency (behind base → `gh pr update-branch`, a base-into-head merge,
never a rebase). A background change-detector polls with no agent tokens and wakes
the loop only when something actionable changes or a stop condition fires.

## It's working if

- Review comments are handled before CI failures within a tick, and CI work
  against a superseded SHA is skipped, not wasted.
- A `needs-human` item parks and is surfaced, while the watch keeps handling new
  review rounds and CI around it.
- It declares "looks ready — your call" only after the settle window with no
  in-progress review signal, never "safe to merge," and never merges for you.

## Where it fits

The continuous-watch counterpart to the one-shot review and debug skills. The
opt-in autopilot [lfg](../core/lfg.md) drives it in bounded pipeline mode to take
CI to green, and points you back to the interactive `/babysit-pr` watch to carry
the PR through review to merge. It pushes under the verified-push discipline of
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md).
