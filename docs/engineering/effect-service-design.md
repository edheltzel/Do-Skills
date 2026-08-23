# Effect Service Design

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-effect-service-design
```

```bash
npx skills update do-effect-service-design
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/engineering/do-effect-service-design)

## What it does

This skill designs a new Effect service module or audits an existing codebase
for better service, Layer, and composition boundaries. It decides whether a
capability belongs behind an Effect service or should remain a value or pure
module, then defines how production and test implementations fit the same
contract.

Its defining idea is the **authority seam**: a service is a cohesive capability
whose requirements propagate through Effect context, not a wrapper introduced
only to make tests injectable.

## When to reach for it

Type `/do-effect-service-design`, or the agent reaches for it automatically when
an Effect service, Layer, or composition boundary needs to be designed or
audited.

Reach for it when a capability owns meaningful effects, runtime variation, or
reused policy and the service-versus-value decision is unclear. For the broader
TypeScript and Effect change process, use
[coding-standards](../engineering/coding-standards.md) instead.

## Choosing the seam

A real service has authority over a concern such as persistence, credentials,
external I/O, resources, configuration, time, randomness, lifecycle, or
cohesive effect sequencing. Pure calculations, parsed inputs, one-call options,
and forwarding wrappers stay out of the service context.

The skill traces a caller-visible operation and applies a deletion test before
adding a seam. It checks first whether an existing Effect capability or adapter
already owns the need, so a new application service only appears when it removes
real complexity from its callers.

## Layers with honest ownership

The service interface, construction, dependency-preserving Layer, ready
production Layer, expected errors, and test strategy each have a clear owner.
Domain code stays pure; application services own policy; adapters retain raw
technology types; composition roots choose concrete Layers.

Test Layers must faithfully match their names and advertised observable
contracts. A reusable in-memory layer is appropriate only when it really
preserves that contract; otherwise, a small local test fake or real local
substitute is more honest.

## Where it fits

Effect Service Design is the focused companion to
[coding-standards](../engineering/coding-standards.md) when the central design
question is where effectful authority belongs. It is not a general refactoring
pass: use [typescript-refactoring](../engineering/typescript-refactoring.md)
when the goal is reshaping existing TypeScript code rather than deciding Effect
service boundaries.
