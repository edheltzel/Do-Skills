# Wizard

Quickstart:

```bash
npx skills add edheltzel/skills --skill=wizard
```

```bash
npx skills update wizard
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/wizard)

## What it does

`wizard` generates an interactive **bash script** that walks a human, step by step, through a
manual procedure that's tedious to do by hand and tedious to re-explain to an AI each time —
third-party setup, a one-off migration, an A→B state transition. It opens each URL, says
exactly what to click and copy, captures the values, writes them to `.env` and GitHub Actions
secrets, confirms at every stage, and shows how much is left. The defining split: the delightful
UX is already solved by a bundled `template.sh` library, so your job is only to **scope the
procedure and author its stages** — the library above the `STAGES` marker is identical in every
wizard and is never hand-edited.

## When to reach for it

Type `/wizard` — it's user-invoked.

Reach for it when a human needs a guided runner for a manual, value-capturing procedure. For
Husky/Prettier commit hooks, use [setup-pre-commit](../engineering/setup-pre-commit.md); for
non-interactive code generation, this isn't the tool.

## Prerequisites

A bash environment. The generated script uses `gh` for writing GitHub secrets/variables (it
degrades gracefully and records what to do by hand if `gh` is missing or unauthenticated), and
opens URLs cross-platform including WSL.

## The three-step author loop

**Scope** the procedure by reading the repo first (`.env*`, `docker-compose*`, framework
config, and every `secrets.*`/`vars.*` reference in `.github/workflows/*`), then confirm the
ordered stage list with the user. **Map** each stage to concrete click-by-click instructions —
and where the current UI or exact command isn't known, ask rather than invent steps. **Author**
by copying `template.sh` and writing one `stage` per step using the library helpers (`stage`,
`open_url`, `ask`/`ask_secret`, `write_env`, `set_secret`, `confirm`). Verification is static —
`bash -n`, `shellcheck`, and a trace that every captured value lands where scoping said — never
an end-to-end run, since the script opens browsers and blocks on human input. A wizard is
ephemeral by default; commit it only when it's a repeatable setup path.

## Where it fits

A standalone generator in the engineering bucket. Unlike
[setup-pre-commit](../engineering/setup-pre-commit.md) and
[setup-ts-deep-modules](../engineering/setup-ts-deep-modules.md), which configure the repo
directly, wizard produces a *human-facing script* for procedures no automation can fully own.
Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
