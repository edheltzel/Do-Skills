# Go Code Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-go
```

```bash
npx skills update do-review-go
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/go/do-review-go)

## What it does

`review-go` reviews changed Go files as one orchestrator: it records scope,
detects BubbleTea, Wish SSH, and Prometheus in the diff, then loads those
review siblings as references. The defining constraint is detection-gated
loading — if the grep for a stack returns nothing, that sibling is not loaded
and no findings are invented for it.

## When to reach for it

You invoke this by typing `/do-review-go` — the agent won't reach for it on its
own (`disable-model-invocation: true`).

Reach for it on a pre-PR pass over `.go` changes. For a stack-agnostic
correctness lens, use [adversarial-review](../../core/adversarial-review.md).

## Detect, then load

Always loads `go-code-review`. Then loads a sibling only when the diff shows it:
Go testing (`_test.go`), BubbleTea, Wish SSH, Prometheus.

`--parallel` fans one subagent per area when the harness supports it. Sequential
output is the same. Empty scope states that and skips the rest.

## It's working if

- No Go files in scope produces that fact and no Issues.
- BubbleTea, Wish, or Prometheus review runs only when detection found a path.
- Critical/Major findings come from the enclosing function on disk, not
  diff-only reading.

## Where it fits

A user-invoked stack review. The other orchestrators are
[review-ios](../swift/review-ios.md),
[review-frontend](../frontend/review-frontend.md),
[review-python](../python/review-python.md),
[review-rust](../rust/review-rust.md), and
[review-elixir](../elixir/review-elixir.md).
The pack index is [framework-reviews](../framework-reviews.md).
