# URLSession Networking

Use this reference for iOS/iPadOS request construction, transfer lifecycle, HTTP interpretation, cancellation, retries, caching, downloads, streaming, or background sessions.

## Client boundary

Keep URL construction, encoding, response interpretation, decoding, and transport-to-domain error conversion in the repository's networking boundary. Reuse the established session and endpoint conventions so connection, cookie, cache, credential, and delegate behavior remain coherent. Add an injectable transport seam only when it matches the current test design.

## Requests and responses

- Construct queries with `URLComponents` and `URLQueryItem`; do not concatenate unescaped user or service values.
- Reject or sanitize carriage-return and line-feed characters in user-supplied header names and values; unescaped CRLF permits header injection.
- Match method, body encoding, and media type to the endpoint contract. Prefer file-backed upload APIs for large bodies.
- Validate that the response has the expected protocol type and accepted status range before decoding success data. A completed URLSession task may carry an HTTP error response without throwing.
- Bound retained error payloads and redact sensitive headers, query values, and response data from diagnostics.
- Use the app's credential-storage boundary for user credentials. A secret embedded in the app remains extractable regardless of where the binary stores it at runtime.
- Choose default, ephemeral, or background configuration from persistence and lifecycle requirements. Configure request and resource time limits from product semantics; `timeoutIntervalForResource` defaults to seven days, so a stalled transfer can hang far longer than the per-request timeout unless the resource limit is set deliberately.

## Cancellation, retry, and connectivity

Async URLSession operations cooperate with task cancellation. Let cancellation propagate and ensure superseded user intent cancels or invalidates older results.

Retry only when both the failure and operation are safe to repeat. Limit attempts, delay with backoff and jitter, and honor server retry guidance. Do not automatically retry cancellation, authentication or validation failure, or a non-idempotent write without an endpoint-level idempotency agreement.

When waiting for connectivity matches the experience, configure the session to wait. A separate reachability check races the request and cannot establish whether the transfer will succeed. Validate a streaming response before consuming bytes and end iteration promptly on cancellation.

## Files and background transfers

A downloaded temporary file must be moved into app-owned storage before its temporary lifetime ends. Remove partial or moved artifacts on failure according to the feature's ownership rules.

For a background configuration:

- use a stable identifier unique to the owning app or extension;
- use supported file-backed uploads;
- maintain the session delegate across relaunch;
- restore the system completion handler through the app lifecycle and call it after background events finish;
- do not assume per-task closure lifetime survives suspension or termination;
- inspect target capabilities and lifecycle registration before claiming background behavior works.

A session retains its delegate until invalidation. Invalidate custom sessions when their work is truly complete, not while callbacks are still expected. Use `finishTasksAndInvalidate()` to let in-flight tasks finish, and reserve `invalidateAndCancel()` for tearing them down immediately; both break the delegate retain cycle that otherwise leaks the session.

## Caching and privacy

Respect HTTP caching behavior unless the product specifies another policy. Size caches from actual response and offline requirements; `URLCache` silently declines to store a response that is large relative to its configured capacity, so an undersized cache can appear to do nothing. Use an ephemeral configuration when cookies, credentials, or responses must not persist to disk. Verify cache behavior with the real headers and request policy involved.

## Evidence to collect

Exercise accepted and rejected status codes, malformed or unexpected responses, cancellation, stale-result replacement, retry exhaustion, connectivity recovery where applicable, and file cleanup. Background work also requires a relaunch or suspension scenario on the affected target with the actual identifier and lifecycle wiring.

## Authority

- [URLSession](https://developer.apple.com/documentation/foundation/urlsession)
