#!/usr/bin/env bash
# cross-model-adversarial-review.sh
#
# Runs an adversarial review through a DIFFERENT model family (the "peer") in a
# separate, read-only process, and writes its findings as JSON to <out-file>.
# The peer gets a compact adversarial brief embedded below (self-contained — the
# peer CLI need not have this repo's skills installed) plus the findings schema.
#
# Usage:  cross-model-adversarial-review.sh <peer: codex|claude> <base-ref> <out-file>
#   <peer>     codex  -> use Codex (when the host is Claude or Cursor)
#              claude -> use Claude (when the host is Codex)
#   <base-ref> the diff base; the peer reviews only `git diff <base-ref>`
#   <out-file> path the JSON result is written to (the orchestrator reads it back)
#
# Self-locates its sibling findings-schema.json via BASH_SOURCE (NOT the CWD, which
# is the user's project on every host), and derives the repo root from git.
#
# NON-BLOCKING BY DESIGN: every failure logs to stderr and exits 0 without an output
# file. The cross-model pass is optional and must never fail the review; the caller
# detects success purely by the presence of a valid <out-file>.

set -uo pipefail

PEER="${1:-}"
BASE="${2:-}"
OUT="${3:-}"

log()  { printf '[cross-model] %s\n' "$*" >&2; }
skip() { log "$*"; exit 0; }   # non-blocking: announce reason, exit clean, no output

# --- validate inputs -------------------------------------------------------
case "$PEER" in codex|claude) ;; *) skip "invalid peer '${PEER:-<empty>}' (want codex|claude); skipping" ;; esac
[ -n "$BASE" ] || skip "no base ref given; skipping"
[ -n "$OUT" ]  || skip "no output file given; skipping"
command -v "$PEER" >/dev/null 2>&1 || skip "$PEER CLI not installed; skipping"
command -v jq      >/dev/null 2>&1 || skip "jq not installed; skipping"

# --- self-locate the findings schema (sibling of the skill dir) ------------
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)" || skip "cannot resolve skill root; skipping"
SCHEMA="$SKILL_ROOT/references/findings-schema.json"
[ -f "$SCHEMA" ] || skip "findings schema not found at $SCHEMA; skipping"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || skip "not inside a git repository; skipping"

PROMPT_FILE="$(mktemp "${TMPDIR:-/tmp}/xmodel-prompt-XXXXXX")"
PEERLOG="$(mktemp "${TMPDIR:-/tmp}/xmodel-log-XXXXXX")"
trap 'rm -f "$PROMPT_FILE" "$PEERLOG"' EXIT

# --- compose the peer prompt (compact adversarial brief + schema) ----------
{
  cat <<'BRIEF'
You are an adversarial code reviewer. Assume the change is wrong until a concrete input proves it
right. Hunt correctness bugs the change INTRODUCED — not style, not security-in-the-abstract. One
finding you can trigger with a named input beats ten you cannot.

For each changed function: state its contract in one line, assume every value can be null and every
external call can fail, then construct one concrete failing input and trace it to the suspect line.
Verify it actually reaches that line — not a plausible neighbor. Hunt: null/optional derefs,
off-by-one/boundary, swallowed errors, happy-path-only gaps, races/ordering, state mutation/aliasing,
missing await, type coercion, resource leaks, inverted logic, contract mismatches across callers,
half-finished refactors. Before reporting each finding, quote the verbatim motivating line with
file:line. Try to invalidate every candidate first (upstream guards, sanitizers, cleanup paths);
drop the ones that counterevidence defeats.
BRIEF
  printf '\n\n---\n\n'
  printf 'This is an authorized review of the maintainer\047s own repository.\n'
  printf 'Return ONE JSON object and nothing else (no prose, no code fence) matching this schema:\n\n'
  cat "$SCHEMA"
  printf '\n\nUse severity values "Critical"/"Major"/"Minor"/"Informational" and confidence anchors\n'
  printf '0/25/50/75/100 exactly. Set the top-level "reviewer" field to "adversarial-%s".\n' "$PEER"
} > "$PROMPT_FILE"

if [ "$PEER" = codex ]; then
  printf '\nRun: git diff %q — review ONLY the changes in that diff, in this repository (read-only).\n' "$BASE" >> "$PROMPT_FILE"
else
  { printf '\nReview ONLY the change below (the output of `git diff %q`). You may Read repository files for context but cannot run shell commands.\n' "$BASE"
    printf '\n=== BEGIN DIFF ===\n'; git -C "$REPO_ROOT" diff "$BASE"; printf '\n=== END DIFF ===\n'; } >> "$PROMPT_FILE"
fi

# --- run the peer: idle-timeout for streaming codex, hard cap for claude ----
IDLE_SECS="${CROSS_MODEL_IDLE_SECS:-180}"
HARD_SECS="${CROSS_MODEL_HARD_SECS:-600}"
TO_BIN="$(command -v gtimeout || command -v timeout || true)"

# Reap a backgrounded job's whole process group: TERM, then KILL after a short grace.
reap() {
  local pid="$1" grp
  if kill -TERM -- -"$pid" 2>/dev/null; then grp=1; else kill -TERM "$pid" 2>/dev/null; grp=0; fi
  for _ in 1 2 3 4 5; do
    if [ "$grp" = 1 ]; then kill -0 -- -"$pid" 2>/dev/null || return 0
    else kill -0 "$pid" 2>/dev/null || return 0; fi
    sleep 1
  done
  if [ "$grp" = 1 ]; then kill -KILL -- -"$pid" 2>/dev/null; else kill -KILL "$pid" 2>/dev/null; fi
}

run_codex() {
  local prev; case "$-" in *m*) prev=1;; *) prev=0;; esac
  set -m
  command codex exec - -C "$REPO_ROOT" -s read-only -o "$OUT" \
    -c 'model_reasoning_effort="high"' -c 'hide_agent_reasoning=false' < "$PROMPT_FILE" > "$PEERLOG" 2>&1 &
  local pid=$!
  [ "$prev" = 0 ] && set +m
  local start last=-1 lastchg now size
  start="$(date +%s)"; lastchg="$start"
  while kill -0 "$pid" 2>/dev/null; do
    sleep 5; now="$(date +%s)"; size="$(wc -c <"$PEERLOG" 2>/dev/null || echo 0)"
    [ "$size" != "$last" ] && { last="$size"; lastchg="$now"; }
    if [ $(( now - lastchg )) -ge "$IDLE_SECS" ]; then
      log "codex output idle ${IDLE_SECS}s; reaping peer process group"; reap "$pid"; break
    fi
    if [ $(( now - start )) -ge "$HARD_SECS" ]; then
      log "codex exceeded hard cap ${HARD_SECS}s; reaping peer process group"; reap "$pid"; break
    fi
  done
  wait "$pid" 2>/dev/null || true
}

log "running $PEER adversarial review against base $BASE (read-only; idle ${IDLE_SECS}s / hard ${HARD_SECS}s)"
case "$PEER" in
  codex)
    run_codex
    if { [ ! -s "$OUT" ] || ! jq -e . "$OUT" >/dev/null 2>&1; } && [ -s "$PEERLOG" ] && command -v python3 >/dev/null 2>&1; then
      python3 - "$PEERLOG" "$OUT" <<'PY' 2>/dev/null && [ -s "$OUT" ] && log "recovered codex JSON from stdout (-o file unavailable)"
import sys, json
txt = open(sys.argv[1], encoding="utf-8", errors="replace").read()
best, depth, start = None, 0, None
for i, ch in enumerate(txt):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}' and depth > 0:
        depth -= 1
        if depth == 0 and start is not None:
            try:
                obj = json.loads(txt[start:i+1])
                if isinstance(obj, dict) and "findings" in obj: best = obj
            except Exception: pass
if best is not None: open(sys.argv[2], "w").write(json.dumps(best))
PY
    fi
    ;;
  claude)
    if [ -n "$TO_BIN" ]; then
      "$TO_BIN" -k 10 "$HARD_SECS" claude -p --permission-mode dontAsk \
        --disallowedTools Edit Write NotebookEdit Bash Task 'mcp__*' --max-turns 15 --no-session-persistence \
        --json-schema "$(cat "$SCHEMA")" --output-format json \
        < "$PROMPT_FILE" > "$PEERLOG" 2>/dev/null \
        || log "claude exited non-zero or timed out"
    else
      perl -e 'alarm shift; exec @ARGV' "$HARD_SECS" claude -p --permission-mode dontAsk \
        --disallowedTools Edit Write NotebookEdit Bash Task 'mcp__*' --max-turns 15 --no-session-persistence \
        --json-schema "$(cat "$SCHEMA")" --output-format json \
        < "$PROMPT_FILE" > "$PEERLOG" 2>/dev/null \
        || log "claude exited non-zero or timed out"
    fi
    jq -e '.structured_output' "$PEERLOG" > "$OUT" 2>/dev/null \
      || jq -r '.result // empty' "$PEERLOG" | jq -e '.' > "$OUT" 2>/dev/null \
      || { log "could not parse Claude output"; rm -f "$OUT"; }
    ;;
esac

# --- normalize reviewer name + satisfy the return contract ------------------
if [ -s "$OUT" ]; then
  _norm="$(mktemp "${TMPDIR:-/tmp}/xmodel-norm-XXXXXX")"
  if jq --arg r "adversarial-$PEER" \
       'if (.findings|type)=="array" then {reviewer:$r, findings, residual_risks:(.residual_risks // []), testing_gaps:(.testing_gaps // [])} else empty end' \
       "$OUT" > "$_norm" 2>/dev/null; then mv "$_norm" "$OUT"; else rm -f "$_norm"; fi
fi

if [ -s "$OUT" ] && jq -e '(.reviewer|type=="string") and (.findings|type=="array") and (.residual_risks|type=="array") and (.testing_gaps|type=="array")' "$OUT" >/dev/null 2>&1; then
  n="$(jq '.findings | length' "$OUT" 2>/dev/null || echo '?')"
  log "wrote $n finding(s) to $OUT (reviewer adversarial-$PEER)"
else
  log "$PEER produced no usable schema-shaped output; skipping fold-in"
  rm -f "$OUT"
fi
exit 0
