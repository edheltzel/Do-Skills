# Python Code Review

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-python
```

```bash
npx skills update do-review-python
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/python/do-review-python)

## What it does

`review-python` reviews changed Python files as one orchestrator: it records
scope, runs the project linters first, then loads Python and FastAPI review
plus any detected siblings as references. The defining constraint is that
linter-owned style is not a review finding — if ruff (or the project's
configured linter) already passed a rule, this skill will not flag it again.

## When to reach for it

You invoke this by typing `/do-review-python` — the agent won't reach for it on
its own (`disable-model-invocation: true`).

Reach for it on a pre-PR pass over `.py` changes. For a stack-agnostic
correctness lens, use [adversarial-review](../../core/adversarial-review.md).

## Detect, then load

Always loads `python-code-review` and `fastapi-code-review`. Then loads a sibling
only when the diff shows it: pytest, Pydantic-AI, SQLAlchemy, Postgres.

`--parallel` fans one subagent per area when the harness supports it. Sequential
output is the same. Empty scope states that and skips the rest.

## It's working if

- No Python files in scope produces that fact and no Issues.
- Line-length and other linter rules already passing are not re-flagged.
- Findings cite opened source, not diff-only context.

## Where it fits

A user-invoked stack review. The other orchestrators are
[review-ios](../swift/review-ios.md),
[review-frontend](../frontend/review-frontend.md),
[review-go](../go/review-go.md),
[review-rust](../rust/review-rust.md), and
[review-elixir](../elixir/review-elixir.md).
The pack index is [framework-reviews](../framework-reviews.md).
