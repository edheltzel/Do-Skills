# Rust Code Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-rust
```

```bash
npx skills update do-review-rust
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/rust/do-review-rust)

## What it does

`review-rust` reviews changed `.rs` files as one orchestrator: it records scope,
reads edition and MSRV, runs clippy and `cargo check` first, then loads review
siblings as references. The defining constraint is edition-aware verification —
it will not re-flag what clippy or the compiler already reported, and on
edition 2024 it treats required `unsafe {}` inside `unsafe fn` as correct, not
noise.

## When to reach for it

You invoke this by typing `/do-review-rust` — the agent won't reach for it on
its own (`disable-model-invocation: true`).

Reach for it on a pre-PR or pre-push pass over Rust changes. For a
stack-agnostic correctness lens, use
[adversarial-review](../../core/adversarial-review.md).

## Detect, then load

Always loads `rust-code-review`. Then loads a sibling only when the diff shows
it: Tokio, Axum, sqlx, Serde, tests, macros, FFI, plus extra rust-code-review
reference files for concurrency, public API, and lock-free code.

`--parallel` fans one subagent per area when the harness supports it. Sequential
output is the same. Empty scope stops with no Issues.

## It's working if

- No Rust files in scope produces that fact and no Issues.
- Compiler or clippy errors are noted as author-must-fix, not duplicated as
  review findings.
- Edition 2024 `unsafe {}` in `unsafe fn` is not flagged as unnecessary.

## Where it fits

A user-invoked stack review. The other orchestrators are
[review-ios](../swift/review-ios.md),
[review-frontend](../frontend/review-frontend.md),
[review-python](../python/review-python.md),
[review-go](../go/review-go.md), and
[review-elixir](../elixir/review-elixir.md).
The pack index is [framework-reviews](../framework-reviews.md).
