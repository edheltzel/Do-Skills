---
name: do-backend
description: Backend code review for Go, Python, and Rust. Use when reviewing Go, BubbleTea, Wish SSH, Prometheus, Python, FastAPI, Rust, tokio, serde, sqlx, or .rs changes, or for pre-push / pre-PR review and backend review.
disable-model-invocation: true
---

# Backend Code Review

Detect the language of the changed files, then load only that language's orchestrator. Mixed repos: run each detected language. Do not load the others.

## Detect

Files under review are the branch diff, or the paths the user named. If the user named paths, they replace the diff: pass them to the orchestrator as its file list and skip its diff-based scope check. A language is present when any file under review matches:

| Language | Signal | Orchestrator |
| --- | --- | --- |
| Go | `.go` or `go.mod` | [Go review](references/go/review.md) |
| Python | `.py` or `pyproject.toml` | [Python review](references/python/review.md) |
| Rust | `.rs` or `Cargo.toml` | [Rust review](references/rust/review.md) |

```bash
git diff --name-only $(git merge-base HEAD main)..HEAD
```

Load only the orchestrators whose signals match, and follow each one. If none match, say so and stop.
