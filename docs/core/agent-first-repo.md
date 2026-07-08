# Agent-First Repository Design

Quickstart:

```bash
npx skills add edheltzel/skills --skill=agent-first-repo
```

```bash
npx skills update agent-first-repo
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/agent-first-repo)

## What it does

`agent-first-repo` lays out how to structure a repository and its documentation so
AI coding agents can do effective, autonomous work — a layered knowledge hierarchy,
progressive disclosure, and rules encoded as CI rather than prose. It optimises for
the agent's ability to reason about the codebase, not for human aesthetics. The
defining constraint is blunt: if the agent can't see it in the repo, it doesn't
exist — knowledge in Slack, Google Docs, or someone's head is invisible, so the
repository has to be the single source of truth.

## When to reach for it

Type `/agent-first-repo`, or the agent reaches for it automatically when you're
setting up a new project for agent-driven work or refactoring an existing repo to
be more agent-friendly.

Reach for it when you want the whole-repo view — the documentation architecture and
the enforcement strategy that hold it together. For the two files at the top of that
hierarchy, drop to the focused skills: [agents-md](./agents-md.md) for the entry-point
file, [architecture-md](./architecture-md.md) for the codemap. For typing the
boundaries this skill insists on, see [parse-dont-validate](../engineering/parse-dont-validate.md).

## The three pillars

- **Agent legibility.** Prefer boring, composable technology with broad training-data
  coverage; inline a small dependency rather than call into a black box the agent
  can't read; keep boundaries typed and structured. Everything that matters is a
  versioned markdown file, not a chat thread.
- **Progressive disclosure.** Agents start with minimal context and drill deeper on
  demand. `AGENTS.md` is the ~100-line entry point, `ARCHITECTURE.md` the next layer,
  the `docs/` tree the depth beyond — never one giant file dumped into the prompt.
- **Mechanical enforcement.** Encode architectural rules as linters and tests. Prose
  gets ignored; a CI failure doesn't. Specify *what* must hold, not *how* — and let
  the type system be the enforcer where it can.

## Entropy management

Agent-generated code drifts: agents replicate existing patterns, including bad ones,
so a suboptimal pattern used 15 times becomes 16 and hardens into "the convention."
Left alone, the codebase accumulates inconsistency faster than a human-only one would.
The skill treats cleanup as a continuous, automated cadence with explicit quality
scoring — pay the debt down in small increments instead of manual cleanup Fridays.

## Where it fits

A run-once setup skill with a periodic-maintenance tail — you stand the structure up
early, then lean on the entropy discipline to keep it honest. It's the umbrella over
[agents-md](./agents-md.md) and [architecture-md](./architecture-md.md), which each
own one layer of the hierarchy it describes.
