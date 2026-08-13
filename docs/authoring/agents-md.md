# Writing Effective AGENTS.md Files

Quickstart:

```bash
npx skills add edheltzel/skills --skill=do-agents-md
```

```bash
npx skills update do-agents-md
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/authoring/do-agents-md)

## What it does

`agents-md` guides writing the `AGENTS.md` file at a repo root — the README for
coding agents that tells them how to build, test, lint, navigate, and contribute.
It follows the open [agents.md](https://agents.md) format. The defining constraint
is that the file is a map, not a manual: keep it to ~100–150 lines and treat it as a
table of contents that points to deeper docs, because a giant instruction file
crowds out the actual task, rots into stale rules, and trains the agent to
pattern-match locally instead of navigating on purpose.

## When to reach for it

Type `/agents-md`, or the agent reaches for it automatically when you're creating or
improving an `AGENTS.md` or onboarding an agent to a codebase.

Reach for it when the deliverable is that one file. For the whole-repo documentation
architecture it sits inside, use [agent-first-repo](../core/agent-first-repo.md); for the
architecture codemap it should point to rather than contain, use
[architecture-md](./architecture-md.md).

## What earns a place in the file

- **Commands, not prose.** Concrete install / dev / test / lint / format / typecheck
  invocations, plus any non-obvious setup — an agent should build and test from this
  file alone without reading CI config.
- **Structure and boundaries.** One line per directory, then the dependency rules
  agents violate most (what can't import what, what's deliberately absent).
- **Non-obvious standards only.** Project-specific conventions the agent couldn't
  infer from the code — not "use const over let," not anything the linter already
  catches.
- **Guardrails.** Explicit never / ask-first lines: don't commit secrets, don't run
  destructive git without asking, don't hand-edit generated files.

Monorepos nest: a root file for global rules, a per-package file for what's *different*
about that package — the closest file to the edited code wins.

## It's working if

- An agent can build, test, lint, and format using only the commands listed.
- Architecture boundaries are explicit and coding standards list only the
  non-obvious, project-specific ones.
- The file stays under ~150 lines and points to deeper docs instead of absorbing
  them.

## Where it fits

A run-once setup skill you revisit when conventions change. It owns the entry-point
layer of [agent-first-repo](../core/agent-first-repo.md)'s knowledge hierarchy, and hands
off architecture depth to [architecture-md](./architecture-md.md).
