# Framework reviews

Six registered orchestrators, nested by technology:

- [`do-review-ios`](../../skills/engineering/swift/do-review-ios/)
- [`do-review-frontend`](../../skills/engineering/frontend/do-review-frontend/)
- [`do-review-python`](../../skills/engineering/python/do-review-python/)
- [`do-review-go`](../../skills/engineering/go/do-review-go/)
- [`do-review-rust`](../../skills/engineering/rust/do-review-rust/)
- [`do-review-elixir`](../../skills/engineering/elixir/do-review-elixir/)

Each pack keeps stack-specific review siblings and verification protocol as
references, not extra registered skills. Load the orchestrator; it loads
FastAPI, BubbleTea, Remix, and so on only when it detects them.

Adapted from Beagle framework plugins under Apache-2.0.
`disable-model-invocation: true` is preserved from the source.
