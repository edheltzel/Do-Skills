---
name: agent-native-review
description: >-
  Review a change for agent-native parity — every capability a human gets through the UI, an
  agent gets through a tool, with the same context and the same workspace. USE WHEN reviewing a
  feature that adds UI actions to an app with an AI agent, auditing whether agents are first-class
  citizens, or asked "can the agent do what the user can". NOT FOR correctness bugs
  (use adversarial-review), structural quality (use review-structure), or spec conformance
  (use review-spec-conformance) — this is the single lens of human/agent capability parity.
---

# Agent-Native Review

One lens: are agents first-class citizens? Every action a user can take through the UI should have an equivalent agent tool, agents should see the same data users see, and both should operate in one shared workspace. The finding you hunt is the *orphan feature* — a capability a human has that the agent does not, or that the agent has but lacks the context to use.

This is read-only. Propose fixes; do not apply them. Before reporting any finding, apply `review-verification-protocol` — its gate-0 echo (quote the UI action and the tool registry you searched, freshly this turn) and severity calibration govern how findings are reported here too.

## Core principles

1. **Action parity** — every UI action has an equivalent agent tool.
2. **Context parity** — agents see the same data users see.
3. **Shared workspace** — agents and users operate in the same data space, not a separate agent sandbox.
4. **Primitives over workflows** — tools are composable primitives whose inputs are data, not decisions (exceptions below).
5. **Dynamic context injection** — the system prompt carries runtime app state, not just static instructions.

## Process

### 0. Triage

Answer three questions before diving in:

1. **Does this codebase have agent integration at all?** Search for tool definitions, system-prompt construction, or LLM API calls. If none exists, that is itself the top finding — every user-facing action is an orphan. Report the gap and where agent integration should be introduced.
2. **What stack?** Find where UI actions and agent tools are defined (table below).
3. **Incremental or full audit?** Reviewing a diff — focus on new/changed code and whether it maintains existing parity. Full audit — scan systematically.

| Stack | UI actions | Agent tools |
|---|---|---|
| Vercel AI SDK (Next.js) | `onClick`, `onSubmit`, form actions in React components | `tool()` in route handlers, `tools` param in `streamText`/`generateText` |
| LangChain / LangGraph | Frontend varies | `@tool` decorators, `StructuredTool` subclasses, `tools` arrays |
| OpenAI Assistants | Frontend varies | `tools` array in assistant config, function definitions |
| Claude Code plugins | N/A (CLI) | `agents/*.md`, `skills/*/SKILL.md`, tool lists in frontmatter |
| Rails + MCP | `button_to`, `form_with`, Turbo/Stimulus actions | `tool()` in MCP server definitions, `.mcp.json` |
| Generic | Grep `onClick`, `onSubmit`, `onTap`, `Button`, `onPressed`, form actions | Grep `tool(`, `function_call`, `tools:`, tool registration patterns |

### 1. Map the landscape

Identify all UI actions (buttons, forms, navigation, gestures); all agent tools and where they are defined; how the system prompt is constructed (static string or dynamically injected with runtime state); and where the agent gets context about available resources. For incremental reviews, focus on changed files and search outward only when a change touches shared infrastructure (tool registry, system-prompt construction, shared data layer).

### 2. Check action parity

Cross-reference UI actions against agent tools as a capability map:

| UI Action | Location | Agent Tool | In Prompt? | Priority | Status |
|-----------|----------|------------|------------|----------|--------|

Prioritize by impact:

- **Must have parity** — core domain CRUD, primary user workflows, actions that modify user data.
- **Should have parity** — secondary features, read-only views with filtering/sorting.
- **Low priority** — settings/preferences UI, onboarding wizards, admin panels, cosmetic actions.

Only flag missing parity as Critical or Major for must-have and should-have actions. Low-priority gaps are Informational at most.

### 3. Check context parity

Verify the system prompt includes available resources (files, data, entities the user can see), recent activity, a capabilities mapping (what tool does what), and domain vocabulary. Red flags: a static system prompt with no runtime context, an agent unaware of what resources exist, an agent that does not understand app-specific terms.

### 4. Check tool design

For each tool, verify it is a primitive (read, write, store) whose inputs are data, not decisions, and that it returns rich output the agent can verify success from.

Anti-pattern — workflow tool (logic and decisions inside the tool):

```typescript
tool("process_feedback", async ({ message }) => {
  const category = categorize(message);
  const priority = calculatePriority(message);
  if (priority > 3) await notify();
});
```

Correct — primitive tool:

```typescript
tool("store_item", async ({ key, value }) => {
  await db.set(key, value);
  return { text: `Stored ${key}` };
});
```

**Exception:** workflow tools are acceptable when they wrap a safety-critical atomic sequence (a payment that must record + charge + receipt as one unit) or external-system orchestration the agent should not drive step-by-step (a deploy tool). Flag for review; do not treat as a defect when the encapsulation is justified.

### 5. Check shared workspace

Verify agents and users operate in the same data space, agent file operations use the same paths as the UI, the UI observes changes the agent makes (file watching or a shared reactive store), and there is no isolated "agent sandbox." Red flags: agent writes to `agent_output/` instead of the user's documents, a sync layer bridging agent and user spaces, users who cannot inspect or edit agent-created artifacts.

### 6. The noun test

Run a second pass organized by domain object rather than action. For every noun in the app (feed, library, profile, report, task), the agent should know what it is (context injection), have a tool to interact with it (action parity), and see it documented in the system prompt (discoverability). Severity follows the step-2 tiers: a must-have noun failing all three is Critical; a should-have noun is Major; a low-priority noun is Informational at most.

## What you don't flag

- **Intentionally human-only flows** — CAPTCHA, 2FA confirmation, OAuth consent, terms acceptance.
- **Auth/security ceremony** — password entry, biometric prompts, session re-auth (agents authenticate differently).
- **Purely cosmetic UI** — animations, transitions, theme toggles, layout preferences.
- **Platform-imposed gates** — App Store prompts, OS permission dialogs, push-notification opt-in.

If an action looks human-only but you are unsure, flag it Informational with a note that it may be intentional.

## Anti-patterns reference

| Anti-Pattern | Signal | Fix |
|---|---|---|
| **Orphan Feature** | UI action with no agent tool equivalent | Add a corresponding tool and document it in the system prompt |
| **Context Starvation** | Agent does not know what resources exist or what app terms mean | Inject available resources and domain vocabulary into the prompt |
| **Sandbox Isolation** | Agent reads/writes a separate data space from the user | Use a shared-workspace architecture |
| **Silent Action** | Agent mutates state but the UI does not update | Shared reactive store, or file-system watching |
| **Capability Hiding** | Users cannot discover what the agent can do | Surface capabilities in agent responses or onboarding |
| **Workflow Tool** | Tool encodes business logic instead of being a primitive | Extract primitives; move orchestration to the system prompt (unless justified) |
| **Decision Input** | Tool accepts a decision enum instead of raw data | Accept data; let the agent decide |

## Severity and reporting

Report findings per `review-verification-protocol`'s calibration:

- **Critical** — a must-have capability the agent cannot reach, or a tool that literally embeds business-logic branching.
- **Major** — a should-have gap, or a system prompt with no runtime context on a data-driven app.
- **Minor** — a low-priority parity gap with a workaround.
- **Informational** — observations, possibly-intentional human-only flows, net-new capabilities the app never had. A gap that would require **adding a capability the product never offered** (not restoring parity for an existing one) is Informational — it is new work, not a review blocker, and is excluded from the actionable count.

Confidence follows the protocol's anchors: anchor 100 when the gap is mechanically verifiable (a new UI button with no matching tool registration); anchor 75 when directly visible from the code (a UI action with no corresponding tool); anchor 50 when it depends on context not fully in the diff (whether a prompt is assembled dynamically elsewhere); suppress below that — a gap needing runtime observation or unconfirmable user intent is not a finding.

## Output

```markdown
## Agent-Native Review

### Summary
[What kind of app, what agent integration exists, overall parity assessment]

### Capability Map
| UI Action | Location | Agent Tool | In Prompt? | Priority | Status |
|-----------|----------|------------|------------|----------|--------|

### Findings
#### Critical
1. [FILE:LINE] ISSUE — Description. Fix: how.
#### Major
1. [FILE:LINE] ISSUE — Description. Fix: how.
#### Informational
1. Observation and suggestion.

### What's Working Well
- Positive agent-native patterns in use.

### Verdict
- X/Y high-priority capabilities are agent-accessible.
- PASS | NEEDS WORK
```

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT) — the agent-native-reviewer persona, made a standalone lens.
