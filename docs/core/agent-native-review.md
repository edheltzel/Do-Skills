# Agent-Native Review

Quickstart:

```bash
npx skills add edheltzel/skills --skill=agent-native-review
```

```bash
npx skills update agent-native-review
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/agent-native-review)

Imported and adapted from Every's Compound Engineering plugin (github.com/EveryInc/compound-engineering, MIT).

## What it does

Reviews a change through a single lens: are agents first-class citizens of the app? It cross-references every action a human can take through the UI against the tools the agent has, checks that the agent sees the same data and works in the same place the user does, and flags the gaps. The defining finding is the *orphan feature* — a capability the human has that the agent cannot reach, or one the agent has but lacks the context to use.

The lens is capability parity, nothing else. It does not hunt correctness bugs, judge structure, or check the change against a spec — it asks one question, so its judgement is not diluted by the others.

## When to reach for it

- **Invocation mode.** Type `/agent-native-review`, or the agent reaches for it automatically when a diff adds UI actions to an app that has an AI agent.
- **Trigger boundary.** Reach for this when a feature adds user-facing capability to an agent-integrated app and you want to know the agent kept pace. For correctness bugs use [adversarial-review](../core/adversarial-review.md); for structural quality use [review-structure](../core/review-structure.md); for faithfulness to the spec use [review-spec-conformance](../core/review-spec-conformance.md).

## The parity map

The skill's working artifact is a capability map: every UI action in one column, its matching agent tool in the next, whether the tool is documented in the system prompt, and a priority tier. Must-have and should-have gaps are blocking; low-priority and net-new gaps are Informational — a capability the product never offered is new work, not a review failure. A second pass runs the *noun test*: for every domain object (feed, report, task), the agent should know what it is, have a tool for it, and see it in the prompt.

## Where it fits

One of the review lenses in `core/`, alongside [adversarial-review](../core/adversarial-review.md), [review-structure](../core/review-structure.md), and [review-spec-conformance](../core/review-spec-conformance.md). Reach for it directly when a change is agent-facing, or let [code-review](../core/code-review.md) select it as one persona in a broader review. Its report discipline follows [review-verification-protocol](../core/review-verification-protocol.md).
