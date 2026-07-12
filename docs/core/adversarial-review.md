# Adversarial Review

Quickstart:

```bash
npx skills add edheltzel/skills --skill=adversarial-review
```

```bash
npx skills update adversarial-review
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/adversarial-review)

## What it does

`adversarial-review` hunts for correctness bugs and regressions introduced by a
change set. The defining constraint is triggerability: every reported finding
must name the concrete input or sequence that reaches the changed line and
causes the failure. One reproducible bug beats ten plausible suspicions.

## When to reach for it

Type `/adversarial-review`, or the agent reaches for it when reviewing a diff
before finalizing, pressure-testing recent changes, or answering “what could
break?”

Reach for it when the risk is incorrect behavior: missing guards, boundary
errors, stale callers, async ordering, swallowed failures, resource leaks, or a
half-finished refactor. For readability and unnecessary complexity, use
[simplify](./simplify.md). For feedback already left on a pull request, use
[git-pr-review-triage](./git-pr-review-triage.md).

## The concrete-trigger gate

The review starts from changed lines, traces affected callers, and states each
changed function's contract before judging its implementation. For every
candidate bug it constructs a failing input, follows that path through the
surrounding guards and sanitizers, and then tries to disprove its own finding.
Anything that cannot survive that self-attack is dropped.

The hunt emphasizes failure modes that fresh code commonly misses: empty,
zero, negative, huge, or absent inputs; external dependency failure; forgotten
`await`; check-then-act races; mutation visible to callers; changed return
shapes; and one branch updated without its twin.

## It's working if

- Every finding points to a changed line and names a reproducible trigger.
- Callers are checked when signatures, units, nullability, or return shapes move.
- Speculative findings disappear during self-verification.
- A clean result is reported plainly instead of padded with weak concerns.

## Where it fits

A read-only correctness lens for the end of a change. It complements
[simplify](./simplify.md), [code-comments](./code-comments.md), and
[parse-dont-validate](../engineering/parse-dont-validate.md), each of which owns
a different concern. It also runs as the correctness lens inside
[cleanup-web](../engineering/cleanup-web.md) and
[cleanup-swift](../engineering/cleanup-swift.md).
