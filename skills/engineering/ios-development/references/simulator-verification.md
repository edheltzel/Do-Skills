# Simulator Verification (XcodeBuildMCP)

A concrete way to *produce* the Observable-behavior, Failure-boundary, Accessibility, and Platform-configuration evidence the [SKILL.md](../SKILL.md) matrix requires: build, install, and drive the app on a simulator via the XcodeBuildMCP server, capturing screenshots and logs per screen.

**MCP-gated.** This loop needs the XcodeBuildMCP server connected. When it is **absent**, do not treat verification as blocked — fall back to the skill's existing evidence matrix (literal `xcodebuild`/`xcrun simctl` build and test commands with named scheme, configuration, SDK, and destination). The MCP loop is a faster path to the same matrix rows, not a new requirement; the literal-command matrix is canonical.

## Availability check

Confirm the server by calling its `list_simulators` tool (Claude Code: `mcp__xcodebuildmcp__list_simulators`; other platforms use the equivalent call). If it is not found or errors, tell the user how to add it, then verify via the literal-command matrix instead:

```
XcodeBuildMCP not connected. Install via:  brew tap getsentry/xcodebuildmcp && brew install xcodebuildmcp
(or:  npx -y xcodebuildmcp@latest mcp), add "XcodeBuildMCP" as an MCP server, and restart the agent.
```

## The loop

1. **Discover** — `discover_projs`, then `list_schemes` with the project path. Use the requested scheme, or the default when unspecified.
2. **Boot** — `list_simulators`, then `boot_simulator` with the chosen device UUID (iPhone 15 Pro is a good default). Wait until ready.
3. **Build** — `build_ios_sim_app` with the project path and scheme. On failure, capture the build errors and report them (matrix Compilation row = `FAIL`).
4. **Install & launch** — `install_app_on_simulator` (built app path + UUID), `launch_app_on_simulator` (bundle ID + UUID), then `capture_sim_logs` (UUID + bundle ID) to begin log capture.
5. **Per-screen verification** — for each key screen: `take_screenshot` (UUID + descriptive filename) and review it for correct rendering, expected content, and no visible errors; `get_sim_logs` (UUID) and scan for crashes, exceptions, error-level messages, and failed network requests. Each screen produces one or more matrix rows (Observable behavior / Failure boundary / Accessibility) with the screenshot and log excerpt as Evidence.
6. **Cleanup** — `stop_log_capture` (UUID), optionally `shutdown_simulator` (UUID).

## SwiftUI Text inline-link tap gotcha

Simulated taps (via XcodeBuildMCP or any simulator automation) do **not** trigger gesture recognizers on SwiftUI `Text` views with inline `AttributedString` links — the tap reports success but does nothing, because inline links are not exposed as separate accessibility elements. When a tap on a Text link has no visible effect, do not record a false `PASS`: mark the row for manual verification, prompt the user to tap it in the simulator, or (when the target URL is known) open it directly with `xcrun simctl openurl <device> <URL>` as a fallback.

## Human-verification flows fold into matrix rows

Some flows cannot be driven from the simulator alone. Do not silently skip them — record each as its own matrix row whose Executed check is a numbered device scenario and whose Result is `BLOCKED` (a named prerequisite outside the repository prevents automated verification) until a human confirms it, at which point it becomes `PASS` with the human confirmation as Evidence:

| Flow | Row's device scenario (ask the user to perform, then confirm) |
| --- | --- |
| Sign in with Apple | Complete Sign in with Apple on the simulator |
| Push notifications | Send a test push and confirm it appears |
| In-app purchases | Complete a sandbox purchase |
| Camera / Photos | Grant permissions and verify the camera works |
| Location | Allow location access and verify the map updates |
| SwiftUI Text inline link | Tap the named link manually (automated taps cannot trigger it) |

Ask via the platform's blocking question tool (`AskUserQuestion` in Claude Code — `ToolSearch` `select:AskUserQuestion` first if its schema isn't loaded; `request_user_input` in Codex; `ask_user` in Pi), falling back to numbered options only when no blocking tool exists. Never skip the question silently.

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the ce-test-xcode simulator loop.
