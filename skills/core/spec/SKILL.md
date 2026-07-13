---
name: spec
description: "Synthesize the current conversation into an implementation spec and publish it to GitHub as a ready-for-agent issue. Use when behavior, interfaces, data, or errors need decisions captured before coding."
user-invocable: true
argument-hint: "<feature, problem, or brief>"
---

# Spec

Synthesize the current conversation and codebase understanding into a spec, then publish it. Do NOT interview the user — work from what has already been discussed. For an open-ended stress-test of the idea *before* writing the spec, use `grilling`. A one-question-at-a-time interview to resolve open decisions is available on request, but it is not the default.

1. Read the request, relevant code, and linked material. Use the project's domain vocabulary (see `domain-modeling`) throughout, and respect any ADRs in the area you're touching.
2. Sketch the seams at which the feature will be tested. Prefer existing seams; propose any new one at the highest point possible. The fewer seams, the better — one is ideal. Record them in the Test plan section — synthesise from the discussion, don't pause to interview.
3. Write the spec with the template below. Keep it short and omit sections that do not apply.
4. Publish it with `gh issue create`, applying the `ready-for-agent` label. No pause for review and no separate triage — the spec is agent-ready by construction. If GitHub is unavailable, return the complete spec in chat and say why it was not published.

```markdown
# <Title>

## Summary
What we are building, why, and the chosen approach.

## Requirements
- Observable, testable behavior.

## User stories
An exhaustive numbered list, each as "As an <actor>, I want <feature>, so that <benefit>". Cover every aspect of the feature.

## Design
Important components, data flow, and implementation decisions. Do not include specific file paths or code snippets — they go stale fast. Exception: if a `prototype` produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it in the relevant decision and note it came from a prototype; trim to the decision-rich parts.

## Interfaces and data
APIs, commands, events, schemas, or compatibility requirements.

## Error behavior
What happens on invalid input, failure, or partial completion.

## Test plan
How the requirements will be proved: what makes a good test here (assert observable behavior, not implementation details), which modules or seams will be tested, and prior art — similar tests already in the codebase to follow.

## Out of scope
- Related work this spec does not include.
```
