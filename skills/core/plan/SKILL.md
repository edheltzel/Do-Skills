---
name: plan
description: "Break a spec or brief into agent-ready tickets (GitHub Issues, Linear, Jira) that each deliver a working outcome. Output in chat or push to the ticketing system if asked."
user-invocable: true
argument-hint: "<spec, brief, issue, or repo path>"
---

# Plan

1. Read the input, linked material, and relevant code. Stop and list missing decisions if the work is not ready to build. Use the project's domain vocabulary (see `domain-modeling`) in titles and descriptions, and respect ADRs in the area. Look for prefactoring that makes the change easy — "make the change easy, then make the easy change" — and sequence it first.
2. Split the work into the smallest useful outcomes an agent can implement, test, and review independently. Each is a **vertical slice** — a narrow but complete path through every layer (schema, API, UI, tests), demoable or verifiable on its own, sized to fit one fresh context window. Give each its **blocking edges**: the tickets that must complete before it can start. Keep dependent work in order. One ticket is fine.
3. Write each ticket with the template below. Include enough context for a new agent with no access to this conversation.
4. Return drafts in chat. Publish only when asked.
5. Before publishing, quiz the user: present the breakdown as a numbered list — title, blocked-by, what it delivers — and confirm the granularity feels right and every blocking edge is correct, so each ticket depends only on tickets that genuinely gate it. Iterate until approved, then publish to the requested or existing tracker (GitHub Issues via `gh` — see `pm-tools` — Linear, or Jira) in dependency order, blockers first, expressing blocking with the platform's native dependency or sub-issue relationship. If access is unavailable, return the complete drafts and say why they were not published.
6. Group tickets into milestones only when that makes the delivery order clearer.

Prefer working slices over separate database, API, UI, or testing tickets. Do not split work just to create more tickets.

**Wide refactors are the exception to vertical slicing.** A wide refactor is one mechanical change — rename a column, retype a shared symbol — whose blast radius fans across the codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Sequence it as **expand–contract** instead. First expand: add the new form beside the old so nothing breaks. Then migrate call sites in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand and green because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket — green is promised only there.

```markdown
# <One working outcome>

## Goal
What must be true when this ticket is done, and why.

## Context
The decisions, links, and constraints the agent needs.

## Acceptance criteria
- Observable results.

## Verify
- Commands or manual checks that prove completion.

## Must preserve
- Existing behavior or interfaces that cannot change.

## Out of scope
- Related work this ticket must not absorb.

## Dependencies
- Work that must land first, and why.
```

Work the frontier one ticket at a time with `implement`, clearing context between tickets.
