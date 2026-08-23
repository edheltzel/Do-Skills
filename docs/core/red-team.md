# Red Team

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-red-team
```

```bash
npx skills update do-red-team
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/core/do-red-team)

## What it does

`red-team` adversarially stress-tests ideas, strategies, and plans before they meet reality. It decomposes an argument into atomic claims, attacks those claims from parallel expert perspectives, then synthesizes severity-ranked findings, a steelman, and the strongest surviving counter-argument with remediation paths.

Its defining constraint is that it targets arguments rather than network vulnerabilities. The aim is to strengthen a plan constructively, not to destroy it or manufacture noise.

## When to reach for it

Type `/do-red-team`, or the agent reaches for it automatically when a plan, strategy, or argument needs a deliberate adversarial challenge.

Reach for it when you need to poke holes in an existing proposal, surface its strongest objection, or stress-test its assumptions. For rebuilding a problem from fundamental truths rather than attacking an argument, use [first-principles](../core/first-principles.md). For a collaborative review aimed at choosing the best path, use [adversarial-review](../core/adversarial-review.md).

## Two adversarial workflows

**ParallelAnalysis** stress-tests existing content. Its deliverable is an eight-point steelman and an eight-point counter-argument that attacks real weaknesses rather than strawmen, ranked by severity.

**AdversarialValidation** creates new content through competing proposals and synthesizes the best resulting solution. In either workflow, many agents generate volume; the synthesis must discard noise and preserve the findings that matter.

## The constructive challenge

The skill deliberately puts an argument under pressure from engineers, architects, pentesters, and other perspectives. Its conclusion should pair weaknesses with remediation paths, so the work leaves a stronger decision rather than a merely defeated proposal.

## Where it fits

A high-effort adversarial-analysis skill for plans and arguments. It can draw on [first-principles](../core/first-principles.md) to challenge assumed constraints; [adversarial-review](../core/adversarial-review.md) is the neighboring choice when the goal is collaborative debate rather than a deliberate attack.
