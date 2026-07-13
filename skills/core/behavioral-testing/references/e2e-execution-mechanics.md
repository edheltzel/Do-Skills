# E2E Execution Mechanics

Concrete mechanics for generating and running E2E plans: how to discover a
project's entry points, drive a browser, bring services up and tear them down,
validate a plan file, and produce a debug report on failure.

These are mechanics only. The authority for *what* a plan must contain, *when*
it may mutate, and *how* results are graded is the contract in
[e2e-test-plan.md](e2e-test-plan.md): its preflight safety classification
(`local` / `test` / `staging` / `production` / `unknown`), the plan schema with
`actions:` / `assertions:` / `evidence:` / `cleanup:`, and the
`FAIL > BLOCKED > INCOMPLETE > PASS` result precedence. Nothing here overrides
that. Every command below runs a real product entry point as a user would;
re-running an existing automated test suite is never an E2E action.

## Plan Validation

Before any setup or mutation, confirm the plan file parses and carries the
schema's four top-level keys. A single `grep` passes on any one match, so use a
parser that asserts all four are present:

```bash
python3 -c "import sys, yaml; d = yaml.safe_load(open('docs/testing/test-plan.yaml')) or {}; missing = [k for k in ('version', 'metadata', 'setup', 'tests') if k not in d]; sys.exit('Missing keys: ' + ', '.join(missing) if missing else 0)"
```

A file that fails to parse, is missing a key, or has an empty `tests:` list
cannot run — that is a blocked preflight under the contract, not a soft warning.

## Stack Discovery

Detect the stack from its config files, then locate the user-facing entry points
each plan case must target. Run these from the repo root; they map changed files
to the CLI subcommands, HTTP routes, or UI routes a user actually reaches.

**Detect the stack:**
```bash
ls Cargo.toml 2>/dev/null                                   # Rust (cargo)
ls package.json pnpm-lock.yaml package-lock.json 2>/dev/null # Node.js
ls pyproject.toml uv.lock poetry.lock requirements.txt 2>/dev/null # Python
ls go.mod 2>/dev/null                                        # Go
ls docker-compose.yml Dockerfile 2>/dev/null                 # Docker
```

**Node.js entry points (Express/Fastify + React routes):**
```bash
grep -rn "app\.\(get\|post\|put\|delete\)" --include="*.ts" --include="*.js" | head -20
grep -rn "router\.\(get\|post\|put\|delete\)" --include="*.ts" --include="*.js" | head -20
grep -rn "createBrowserRouter\|<Route\|path=" --include="*.tsx" --include="*.jsx" | head -20
```

**Rust entry points (clap CLI + axum/actix/rocket):**
```bash
grep -rn "Subcommand\|#\[command\]" --include="*.rs" | head -20
grep -rn "\[\[bin\]\]\|fn main" --include="*.rs" --include="*.toml" | head -20
grep -rn "Router::new\|\.route(\|#\[get\]\|#\[post\]\|HttpServer" --include="*.rs" | head -20
```

**Python entry points (FastAPI/Flask + click/typer/argparse):**
```bash
grep -rn "@app\.\(get\|post\|put\|delete\|patch\)" --include="*.py" | head -20
grep -rn "@router\.\(get\|post\|put\|delete\|patch\)" --include="*.py" | head -20
grep -rn "@click.command\|@app.command\|add_parser" --include="*.py" | head -20
```

**Go entry points (net/http, gin, chi + cobra):**
```bash
grep -rn "http.HandleFunc\|r.GET\|r.POST\|router.Get\|router.Post" --include="*.go" | head -20
grep -rn "cobra.Command\|AddCommand" --include="*.go" | head -20
```

For port discovery, check `.env*`, `docker-compose.yml`, and `vite.config.*`.
When grep is inconclusive, read the project's CLAUDE.md, README, or architecture
docs to trace the module graph from changed files to entry points.

## Service Lifecycle

For `setup.services` that must be running before product cases, start each as a
background process with a recoverable pidfile and log, then poll its health gate
until it answers. Keep all run artifacts under `docs/testing/` so nothing leaks
outside the run's owned scope:

```bash
mkdir -p docs/testing
# For each service (index N) with its start command:
nohup <service.command> > docs/testing/service-N.log 2>&1 &
echo $! > docs/testing/service-N.pid
```

Poll each service's health gate before starting cases. Treat a timeout as a
blocked preflight — do not run product cases against a service that never came up:

```bash
timeout=<health_gate.timeout or 30>
url=<health_gate.url>
elapsed=0

while [ $elapsed -lt $timeout ]; do
  if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -qE "^(200|301|302)"; then
    echo "Health check passed: $url"
    break
  fi
  sleep 2
  elapsed=$((elapsed + 2))
done

if [ $elapsed -ge $timeout ]; then
  echo "Health check timeout: $url"
  exit 1
fi
```

Tear services down as bounded cleanup — after success, failure, or blockage —
releasing only the PIDs this run started:

```bash
for pidfile in docs/testing/service-*.pid; do
  if [ -f "$pidfile" ]; then
    kill "$(cat "$pidfile")" 2>/dev/null
    rm "$pidfile"
  fi
done
```

## agent-browser Step Vocabulary

Browser cases express their `actions:` as `agent-browser` CLI commands — never
abstract action syntax. Snapshot interactive elements before interacting to get
valid refs (`@e1`, `@e2`, …), and re-snapshot after any navigation or DOM change.

```bash
agent-browser open <url>                 # Navigate
agent-browser snapshot -i                # List interactive elements (do before interacting)
agent-browser fill @<ref> "<value>"      # Enter input
agent-browser click @<ref>               # Activate a control
agent-browser wait --url "<pattern>"     # Wait for navigation
agent-browser wait --text "<text>"       # Wait for content
agent-browser wait --load networkidle    # Wait for network to settle
agent-browser screenshot docs/testing/evidence/<case-id>.png   # Capture evidence
```

Save screenshots under `docs/testing/evidence/<case-id>.png` and record the path
in the case's `evidence:`. A screenshot or DOM snapshot is the retrievable
evidence the contract requires for a browser assertion — the assertion inspects
rendered state, not that a command exited 0.

## Debug Report on First Failure

The contract stops product cases at the first required-case `FAIL`, retains that
case's evidence, and marks later cases `NOT RUN`. On that first failure, emit a
copy-paste-ready debug report so a fresh session can investigate. Draw
**Expected** from the case's `assertions:` and **Actual** from the observed
result plus the case's `evidence:`:

```markdown
## Test Failure: E2E-XX — <case name>

### What Failed
**Expected:** <the case's assertions>
**Actual:** <observed result: response code, error, or screenshot description>

### Relevant Changes in This Range
<For each file in the case's context or related to the failure:>
- `<file>` (lines X-Y) — <brief description of the change>

### Evidence
- <screenshot path from the case's evidence, e.g. docs/testing/evidence/E2E-XX.png>
- <API status code and response body, or captured log>

### Suggested Investigation
1. <First thing to check, based on the error type>
2. <Second thing, tied to the changed files>
3. <Third thing, about environment or setup>

### Debug Session Prompt
---
I'm debugging an E2E failure on change range `<range>`.

**Case:** <case name>
**Expected (assertions):** <assertions>
**Observed:** <brief description of what went wrong>

Relevant files:
<changed files related to this case>

Help me investigate why <specific failure reason>.
---
```

Persist the report alongside the retained evidence (e.g.
`docs/testing/evidence/E2E-XX-failure.md`) so the primary result and its
diagnostic trail survive cleanup.
