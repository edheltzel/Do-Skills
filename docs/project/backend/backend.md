# Backend Code Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-backend
```

```bash
npx skills update do-backend
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/backend/do-backend)

## What it does

Backend code review for Go, Python, and Rust. It detects which of those languages the changed files use, then loads only that language's orchestrator. A mixed repo runs each detected language, not a blended checklist.

It will not load a language the diff did not touch, and it will not load a stack sibling (BubbleTea, FastAPI, tokio, and the rest) that language's orchestrator did not detect.

## When to reach for it

You invoke this by typing `/do-backend`. The agent will not reach for it on its own (`disable-model-invocation: true`).

Reach for it on a pre-push or pre-PR pass over backend changes: Go (including BubbleTea, Wish SSH, and Prometheus), Python and FastAPI, or Rust (tokio, serde, sqlx, `.rs`). For a stack-agnostic correctness lens, use [adversarial-review](../../global/core/adversarial-review.md).

## Detect, then load

Go (`.go` or `go.mod`) loads the Go orchestrator. Python (`.py` or `pyproject.toml`) loads the Python orchestrator. Rust (`.rs` or `Cargo.toml`) loads the Rust orchestrator. Each orchestrator then detects its own stack and loads only the matching references.

`--parallel` still fans one subagent per area inside the loaded orchestrator when the harness supports it. Sequential output is the same. Empty scope states that and skips the rest.

## It's working if

- A Go-only diff never loads the Python or Rust orchestrator.
- BubbleTea, Wish, Prometheus, FastAPI, tokio, serde, or sqlx review runs only when that language's detection found it.
- Critical or Major findings come from the enclosing function on disk, not diff-only reading.

## Where it fits

A user-invoked stack review. The other orchestrators are
[review-ios](../swift/review-ios.md) and
[review-frontend](../frontend/review-frontend.md).
