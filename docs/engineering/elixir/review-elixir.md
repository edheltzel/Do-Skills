# Elixir Code Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-elixir
```

```bash
npx skills update do-review-elixir
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/elixir/do-review-elixir)

## What it does

`review-elixir` reviews changed Elixir files as one orchestrator: it records
scope, runs the project formatter and linters first, detects Phoenix and
LiveView in the diff, then loads those review siblings as references. The
defining constraint is that siblings stay references — Phoenix, LiveView,
ExUnit, performance, and security are not extra registered skills. Empty scope
stops with no issues.

## When to reach for it

You invoke this by typing `/do-review-elixir` — the agent won't reach for it on
its own (`disable-model-invocation: true`).

Reach for it on a pre-PR pass over `.ex` / `.exs` / `.heex` changes. For a
stack-agnostic correctness lens, use
[adversarial-review](../../core/adversarial-review.md).

## Detect, then load

Always loads `elixir-code-review`. Then loads a sibling only when the diff (or
an explicit focus) shows it: Phoenix, LiveView, ExUnit, performance, security.

`--parallel` fans one subagent per area when the harness supports it. Sequential
output is the same. Do not re-flag what the formatter or Credo already owns.

## It's working if

- No Elixir files in scope produces that fact and no Issues.
- Formatter-clean style is not repeated as a finding.
- Findings cite opened source, not diff-only context.

## Where it fits

A user-invoked stack review. The other orchestrators are
[review-ios](../swift/review-ios.md),
[review-frontend](../frontend/review-frontend.md),
[review-python](../python/review-python.md),
[review-go](../go/review-go.md), and
[review-rust](../rust/review-rust.md).
The pack index is [framework-reviews](../framework-reviews.md).
