# Spec

Quickstart:

```bash
npx skills add edheltzel/skills --skill=spec
```

```bash
npx skills update spec
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/spec)

## What it does

`spec` synthesizes the current conversation into a short implementation spec —
summary, requirements, an exhaustive list of user stories, design, interfaces
and data, error behavior, and a test plan — and publishes it to GitHub as a
`ready-for-agent` issue with `gh issue create`. It does not interview: it works
from what has already been discussed and auto-publishes, so the spec is
agent-ready by construction with no pause for review or separate triage.

## When to reach for it

Type `/spec`, or the agent reaches for it automatically when a task fits.

Reach for it when a feature's observable behavior, function signatures, data
shapes, or failure handling have been discussed enough to capture. If the
architecture itself is still open, start one stage earlier with
[design-doc](../core/design-doc.md). To stress-test the idea *before* writing the
spec, use [grilling](../productivity/grilling.md). If everything is already
decided and the work just needs splitting into tickets, go straight to
[plan](../core/plan.md).

## Synthesize, don't interview

The default is synthesis: the skill reads the conversation and codebase, sketches
the test seams and records them in the test plan, then writes and publishes. A
one-question-at-a-time interview to resolve open decisions is available on
request, but it is no longer the default — and there is no pause-for-human-review
gate. Requirements
are observable and testable, user stories cover every aspect of the feature, and
sections that do not apply are omitted so the spec stays short enough to read.

Two moves sharpen the synthesis (adapted from Every's Compound Engineering
plugin, MIT). In Design, when the approach is not obvious, the skill generates
at least one non-obvious angle — inversion, constraint removal, or a
cross-domain analogy — holds every approach to an anti-genericness test (if it
would appear in a generic listicle for the problem category, sharpen it against
the actual code or drop it), and where it earns its cost records one
higher-upside challenger beside the baseline, marked as the challenger. In the
Test plan, scenarios are enumerated by category — happy path, edge cases, error
behavior, integration — each naming its input, action, and expected outcome,
right-sized to the feature.

## Where it fits

The middle stage of the Decide flow: [design-doc](../core/design-doc.md) →
`spec` → [plan](../core/plan.md). Its output is a GitHub issue that
[implement](../core/implement.md), [tdd](../core/tdd.md), and
[task-to-pr](../core/task-to-pr.md) trace their acceptance checks back to, and
that [plan](../core/plan.md) can break into tickets.
