# Roughdraft

Quickstart:

```bash
npx skills add edheltzel/skills --skill=do-roughdraft
```

```bash
npx skills update do-roughdraft
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/authoring/do-roughdraft)

## What it does

`roughdraft` installs and drives the published `roughdraft` CLI — a local-first
markdown editor that opens a single `.md` file in a browser app so a human can
leave inline comments and suggested edits, written back to the file as
CriticMarkup. The defining constraint is that the markdown file on disk is the only
source of truth: no cloud, no account, no telemetry, everything stays plain
markdown. It's built for the agent-to-human handoff — the agent writes a draft,
opens it, and waits for feedback.

## When to reach for it

Type `/roughdraft`, or the agent reaches for it automatically on "open in
roughdraft", "review this markdown", "hand off for review", or the CLI verbs
(`open`, `start`, `status`, `stop`). Not for generic markdown linting, and not for
building the tool from source — this drives the published CLI only.

## Prerequisites

The global CLI: `npm i -g roughdraft` (or `bun add -g roughdraft`, or run it
ad-hoc with `npx roughdraft ...`). The Install workflow sets it up and verifies
with `roughdraft status`. The server runs locally, default `http://localhost:7373`,
with state in `~/.roughdraft/server.json`.

## The blocking gotcha

The single fact that trips up agents: **`roughdraft open <file>` blocks by
default**, waiting for the human to click "Done Reviewing" with no timeout. The
flags are independent, so know what each does:

- `--no-watch` is the actual "don't block" flag — open and return immediately.
- `--print-url` prints the URL and skips the browser, but still waits unless you
  also pass `--no-watch`. For "just the URL, don't block," use both together.
- `--json` only makes output machine-readable; it does not affect blocking.

So a review handoff that should wait for feedback uses plain `open` (add `--json`
to parse the result); a fire-and-forget open uses `--no-watch`. `open` auto-starts
or reuses the server, so never script `start` then `open`. To decouple opening
from waiting, `open --no-watch` then `roughdraft watch <file>` later.

## It's working if

- `roughdraft status` reports a running server and a localhost URL.
- A handoff `open` sits and waits, then returns the human's feedback (path,
  version, comment counts, overall comment) once they finish reviewing.
- The reviewed `.md` file carries the human's comments and edits as CriticMarkup.

## Where it fits

A standalone tool skill you reach for whenever a draft needs human eyes — the
review handoff at the end of any writing task. It sits alongside the skills in
[`writing/`](../authoring/), such as
[tech-writing](../authoring/tech-writing.md), which produce the drafts
roughdraft hands off.
