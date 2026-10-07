# Effect

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-effect
```

```bash
npx skills update do-effect
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/backend/do-effect)

## What it does

This skill is the Effect guide for writing and reviewing Effect 4 code: services, schema, config, retry, cache, streams, HTTP, SQL, errors, and tests.

Its defining constraint is that remembered Effect APIs are not evidence. Check the project's pinned `effect` version, and the installed source, before using a name.

An Effect service is a capability defined with `Context.Service`, requested with `yield*`, and provided by a `Layer`. Service design is one part of the skill, not the whole of it. The skill decides whether a capability belongs behind that seam or should stay a value, then covers the rest of the Effect change.

## When to reach for it

Type `/do-effect`, or the agent reaches for it when Effect code, an Effect service, or a Layer boundary is being written or reviewed.

Reach for it for Effect, Effect-TS, Effect v4, `Effect.gen`, `Layer`, `Context.Service`, `Schema`, `Config`, Schedule or retry, `Cache`, `Stream`, Fiber or fork, `Cause` or defects, `HttpClient`, `HttpApi`, `SqlClient`, Effect testing or `TestClock`, and for designing or auditing Effect services. For a v3-to-v4 migration, use the official `effect-v3-to-v4` skill if it is installed. For TypeScript standards that are not Effect-specific, use [coding standards](../typescript/ts-standards.md).

## Prerequisites

The project depends on `effect`. Every `@effect/*` package must be the same version as that pin.

## The authority seam

A real service has authority over a concern such as persistence, credentials, external I/O, resources, configuration, time, randomness, lifecycle, or cohesive effect sequencing. Pure calculations, parsed inputs, one-call options, and forwarding wrappers stay out of the service context.

The skill traces a caller-visible operation and applies a deletion test before adding a seam. It checks first whether an existing Effect capability already owns the need.

## Where it fits

Effect is the Effect companion to [coding standards](../typescript/ts-standards.md). It is not a general refactoring pass: use [typescript-refactoring](../typescript/typescript-refactoring.md) when the goal is reshaping existing TypeScript code rather than an Effect API or service boundary.
