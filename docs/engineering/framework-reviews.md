# Framework reviews

Index for the six stack review orchestrators. Each has its own page:

- [review-ios](./swift/review-ios.md)
- [review-frontend](./frontend/review-frontend.md)
- [review-python](./python/review-python.md)
- [review-go](./go/review-go.md)
- [review-rust](./rust/review-rust.md)
- [review-elixir](./elixir/review-elixir.md)

Each pack keeps stack-specific review siblings and verification protocol as
references, not extra registered skills. Load the orchestrator; it loads
FastAPI, BubbleTea, Remix, and so on only when it detects them.

Adapted from Beagle framework plugins under Apache-2.0.
`disable-model-invocation: true` is preserved from the source.
