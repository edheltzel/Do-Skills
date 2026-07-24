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

`spec` writes a short implementation spec at `docs/<feature-slug>/spec.md` —
requirements, design, interfaces and data, error behavior, and a test plan —
then pauses for human review. The spec resolves every decision that would change
behavior, interfaces, data, or tests *before* any code exists, and the skill
refuses to continue into planning or implementation on its own.

## When to reach for it

Type `/spec`, or the agent reaches for it automatically when a task fits.

Reach for it when a feature's observable behavior, function signatures, data
shapes, or failure handling still need decisions someone should review. If the
architecture itself is still open, start one stage earlier with
[design-doc](../core/design-doc.md). If everything is already decided and the
work just needs splitting into tickets, go straight to [plan](../core/plan.md).

## One question at a time, with a recommendation

The skill interviews rather than assumes: each unresolved decision becomes one
question, asked with a recommended answer attached, so review is a series of
small confirmations instead of a wall of open issues. Requirements are written
as observable, testable behavior, and sections that do not apply are omitted —
the spec stays short enough to actually be read.

## Where it fits

The middle stage of the Decide flow: [design-doc](../core/design-doc.md) →
`spec` → [plan](../core/plan.md). Its output is the source of truth that
[implement](../core/implement.md), [tdd](../core/tdd.md), and
[task-to-pr](../core/task-to-pr.md) trace their acceptance checks back to.
