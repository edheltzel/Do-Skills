# LFG

Quickstart:

```bash
npx skills add edheltzel/skills --skill=lfg
```

```bash
npx skills update lfg
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/lfg)

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

## What it does

`lfg` is the **opt-in autopilot**: run once, it takes a feature description all the
way to an open PR with CI driven to green — plan, implement, simplify, review and
apply fixes, commit, push, open the PR, watch CI — hands-off, with no check-ins.
The defining constraint is that **nothing auto-invokes it; you run it deliberately,
and invoking it authorizes this session's pushes and PR creation.** If you want to
review each step, you don't use lfg — you use the individual skills.

## When to reach for it

Type `/lfg <feature>`. Use it only when you explicitly want autonomous shipping all
the way to an open PR. It is not something the agent reaches for on its own, and
its description keeps it from firing on ordinary build requests.

For in-the-loop work where you review each stage, use [plan](../core/plan.md) to
plan, [execute-plan](../core/execute-plan.md) to run a plan,
[debug](../core/debug.md) to fix a bug, or
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md) to commit and open a PR for
changes you already have.

## The chain and its gates

Plan → implement → simplify → review → apply fixes → commit → push → PR → CI-green,
in order, with a hard gate after planning (no implementation until a written,
implementation-ready plan exists) and after implementation (a structured return
with verification evidence when behavior changed). Review is report-only by design;
lfg applies the eligible findings itself. Every push runs through the verified-push
boundary — the exact-ref OID must equal local `HEAD`.

It **degrades to local-only** when the checkout has no remote: it makes every
commit but skips all pushes, PR creation, and CI watching, treating a missing
remote as a terminal state, not an error. It ends by emitting
`<promise>DONE</promise>`, and — because pipeline-mode CI watching stops at "CI
decided," not "merged" — points you to the interactive `/babysit-pr` watch to carry
the PR through review to merge. That continuous watch is opt-in, never automatic.

## It's working if

- No implementation begins before a written plan exists, and it stops if the plan
  is only requirements-level.
- A no-remote checkout produces local commits and no failed push attempts.
- It finishes with `DONE` and offers, rather than forces, the follow-on
  watch-to-merge.

## Where it fits

The top-level autopilot that composes the whole core toolkit —
[plan](../core/plan.md), [execute-plan](../core/execute-plan.md),
[simplify](../core/simplify.md), `code-review`, [debug](../core/debug.md),
[browser-verify](../core/browser-verify.md),
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md), and
[babysit-pr](../core/babysit-pr.md) for bounded CI. Reach for the pieces
individually when you want control; reach for lfg when you want it shipped. Merging
is always yours.
