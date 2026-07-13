# Cross-Model Adversarial Pass (optional)

Runs the adversarial review through a **different model family than the host**, in a separate read-only process, so its findings are independent of the in-process lenses. It folds into Stage 5 as lens `adversarial-<peer>` — agreement between it and the in-process `adversarial-review` is the strongest signal in the set (different model families, separate processes).

This pass is **optional and harness-gated**. It needs a peer CLI on the host and the ability to shell out. When any of that is missing, skip silently — the review is complete without it.

## Gates — run only when all hold

1. `adversarial-review` was selected in Stage 3 (don't run a costly external CLI on a trivial diff).
2. Scope is `local-aligned` or standalone — the working tree IS the reviewed head. Skip in `pr-remote`/`branch-remote` (the peer would review the local tree, not the PR/branch head).
3. The harness can run a background shell command with a peer CLI installed.

## Step 1 — Identify host and peer

```bash
if [ -n "${CURSOR_AGENT:-}${CURSOR_CONVERSATION_ID:-}" ]; then XHOST=cursor; XPEER=codex;
elif [ "${CLAUDECODE:-}" = "1" ]; then XHOST=claude; XPEER=codex;
elif [ -n "${CODEX_SANDBOX:-}${CODEX_SESSION_ID:-}${CODEX_THREAD_ID:-}${CODEX_CI:-}" ]; then XHOST=codex; XPEER=claude;
else XHOST=unknown; XPEER=""; fi
echo "host: $XHOST  peer: ${XPEER:-none}"
```

Claude and Cursor prefer **codex** as the peer; Codex prefers **claude**. `unknown` → skip silently. The script re-validates the peer, so a wrong/missing peer fails safe.

## Step 2 — Announce

Interactive host (`claude`/`cursor`), default (propose-only) mode: surface a prominent standalone line naming the peer, framed as an independent second model reviewing in parallel — placed with the Stage 3 team announce. If the peer is unavailable, one quiet line that the pass was skipped and why. Under a Codex host, announce nothing.

## Step 3 — Run the script (in parallel with the lens dispatch)

The script is a shell-out, not a sub-agent, so it does not consume the concurrency budget. Launch it as a background process in the Stage 4 dispatch wave, then collect before Stage 5's cross-lens promotion. Anchor it via the skill dir (the Bash CWD is the user's project, not the skill dir):

```bash
SKILL_DIR="<absolute path of the directory containing this skill's SKILL.md>"
OUT="$(mktemp "${TMPDIR:-/tmp}/xmodel-out-XXXXXX.json")"
bash "$SKILL_DIR/scripts/cross-model-adversarial-review.sh" "<peer>" "<base-ref>" "$OUT"
```

- `<peer>` = `XPEER` from Step 1. `<base-ref>` = the Stage 1 `BASE`. `$OUT` = a mktemp file the script writes and you read back.
- Set the Bash tool `timeout` to `660000` (11 min) — the script self-bounds (codex idle-timeout default 180s, hard backstop `CROSS_MODEL_HARD_SECS` default 600s) and exits cleanly. If the harness cannot background a shell command, run it inline before awaiting the lenses (correctness unaffected, only wall-clock) — or skip the pass.

## Step 4 — Fold into Stage 5

- Read `$OUT`. If present and valid, treat it as one lens return with `reviewer: adversarial-<peer>` — its findings enter Stage 5 dedup/promotion like any lens return.
- **No file** (skipped: no peer, CLI missing/unauthed, timeout, unparseable) → the pass simply didn't run. Note "cross-model pass: not run" in Coverage on an interactive host; never fail the review.
- A finding sharing a dedup fingerprint with the in-process `adversarial-review` promotes by one anchor step — the cross-model agreement signal.

## What the script does (for maintainers)

`scripts/cross-model-adversarial-review.sh <peer> <base-ref> <out-file>` self-locates `findings-schema.json` (sibling), composes the peer prompt from a compact embedded adversarial brief + the schema (so the peer needs no installed skills), and runs the peer read-only: **codex** via `codex exec -s read-only -o <out>` at high reasoning effort under an idle-timeout watchdog that reaps the whole process group; **claude** via `claude -p --permission-mode dontAsk` with `Edit`/`Write`/`NotebookEdit`/`Bash`/`Task`/`mcp__*` denied (read-only even with MCP servers configured) under a hard `timeout` cap. It forces `reviewer = adversarial-<peer>` and drops any output that isn't a valid schema-shaped return. Non-blocking everywhere: any gap → log + exit 0, no output file.
