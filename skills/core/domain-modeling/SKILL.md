---
name: domain-modeling
description: >-
  Actively build and sharpen a project's domain model — a ubiquitous-language glossary in
  CONTEXT.md and architectural decision records in docs/adr/. USE WHEN pinning down domain
  terminology or a ubiquitous language, challenging or sharpening a fuzzy term, recording an
  architectural decision, or when another skill needs to maintain the domain model. NOT FOR
  merely reading CONTEXT.md for vocabulary (that's a one-line habit any skill can do) or
  documenting the codebase's structure (use architecture-md).
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the *active* discipline — challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise. (Merely *reading* `CONTEXT.md` for vocabulary is not this skill — that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

These files (`CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/adr/`) are in-repo, owned by this skill. Create them lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

Four behaviors run continuously while you design. They are the skill.

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up — capture them as they happen. Use the format in [references/CONTEXT-FORMAT.md](references/CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [references/ADR-FORMAT.md](references/ADR-FORMAT.md).

## The discipline in action

A short dialogue showing the behaviors above resolving fuzzy language into a sharp boundary — this is the texture to aim for:

> **Dev:** "When a Customer places an Order, do we create the Invoice immediately?"
> **You:** "Your glossary doesn't have Invoice yet, and you've used 'bill' elsewhere. Are they the same thing?"
> **Dev:** "Same thing — call it Invoice. And no, an Invoice is only generated once a Fulfillment is confirmed."
> **You:** "So if a Shipment is cancelled before dispatch, no Invoice exists for it? A single Order producing multiple Invoices when items ship separately?"
> **Dev:** "Exactly — Invoice lifecycle is tied to Fulfillment, not Order."

Two terms sharpened (`Invoice` chosen over `bill`), one relationship pinned (Invoice ↔ Fulfillment, not Order), captured in `CONTEXT.md` the moment it settled.

Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
