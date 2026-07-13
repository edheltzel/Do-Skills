# Resolve PR Feedback

Quickstart:

```bash
npx skills add edheltzel/skills --skill=resolve-pr-feedback
```

```bash
npx skills update resolve-pr-feedback
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/resolve-pr-feedback)

Imported/adapted from Every's Compound Engineering plugin
(github.com/EveryInc/compound-engineering, MIT).

## What it does

`resolve-pr-feedback` is the **apply** half of PR review: it reads every
unresolved thread on a PR, decides which findings are real, fixes those, then
replies and resolves the threads. The defining constraint is that it judges
**centrally** — one fetch holds every thread at once, so the validity call is
made where it can dedup reads, catch a systematically-wrong reviewer across
threads, and weigh the author's design intent, before any fix is dispatched.
Subagents only implement fixes already approved; they never decide whether a fix
was worth doing.

## When to reach for it

Type `/resolve-pr-feedback`, or the agent reaches for it automatically when you
ask to address review comments, resolve threads, or fix code-review feedback. It
takes a PR number, a comment URL (targeted mode — that one thread only), or
nothing (the current branch's PR).

Reach for it when the feedback is decided and you want it worked and closed out.
To sort feedback into address / push-back / defer with draft responses but not
apply anything, use [git-pr-review-triage](../core/git-pr-review-triage.md) — this
skill reuses that classification vocabulary when it judges each thread. To carry a
whole fresh PR to a ready state, use [pr-to-ready](../core/pr-to-ready.md).

## The legitimacy gate and its verdicts

Each item gets one verdict: `fixed`, `fixed-differently`, `declined` (the fix
would make the code worse — cite the harm), `not-addressing` (the finding doesn't
hold — cite evidence), `replied` (a question, or a change that buys nothing real),
or `needs-human` (risk you can't bound, or a call that's genuinely the user's).
The default is to fix — most feedback, nitpicks included, is correct — and the
diverts fire only on a concrete signal, never on manufactured doubt.

`needs-human` never blocks: the thread is left open with a natural reply carrying
its `decision_context`, and the item comes back as a structured residual. That is
what lets it run unattended inside a loop.

## It's working if

- Every unresolved thread ends the run either resolved or deliberately parked as
  `needs-human` — nothing is silently dropped.
- Fixes are committed and pushed with a verified push (the exact-ref OID matches
  local `HEAD`), then each thread is replied to with quoted context and resolved.
- A confidently-wrong reviewer is caught at the central gate, not blindly fixed.

## Where it fits

A standalone you run on a PR, and the review-handling engine
[babysit-pr](../core/babysit-pr.md) delegates to on every tick. It pushes through
the verified-push discipline of
[git-safe-pr-workflow](../core/git-safe-pr-workflow.md), and hands genuine CI
questions to [debug](../core/debug.md) only by way of its callers. Merging always
stays a human decision.
