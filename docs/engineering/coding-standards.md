# TypeScript and Effect Coding Standards

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-coding-standards
```

```bash
npx skills update do-coding-standards
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/do-coding-standards)

## What it does

This skill provides a correct-by-construction method for changing TypeScript and
Effect code: establish local rules, trace caller-visible behavior, design public
types and services, implement the complete change, then verify through public
interfaces.

Its defining constraint is that expected failures are explicit values and
external data is parsed into meaningful application or domain types before it
reaches inner code.

## When to reach for it

Type `/do-coding-standards`, or the agent reaches for it automatically when a
TypeScript or Effect change needs the project's engineering standards.

Reach for it when a change crosses types, errors, effects, services, schemas,
or tests and needs a coherent end-to-end design. For a narrower boundary-first
approach to untrusted data, use
[parse-dont-validate](../engineering/parse-dont-validate.md); for general
TypeScript authoring style, use [write-typescript](../engineering/write-typescript.md).

## The changed-behavior loop

The work starts at the observable operation rather than at a convenient file.
It maps inputs, decisions, effects, failures, state transitions, external
representations, and test surfaces to their owners. Public inputs, outputs,
expected errors, and service interfaces are then made explicit before the
implementation is filled in.

The skill keeps unrelated legacy behavior contained at the nearest existing
edge. New abstractions must pass a deletion test: removing one should spread
meaningful complexity into callers, not merely remove a name.

## Where it fits

This is the broad engineering baseline for TypeScript and Effect changes. It
sets the standards that a focused service-design effort can apply to an Effect
capability with [effect-service-design](../engineering/effect-service-design.md),
while [typescript-refactoring](../engineering/typescript-refactoring.md) focuses
on reshaping existing TypeScript code.
