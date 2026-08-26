# Walk test and kit validate

Run this only after the human confirmed and the stamp exists.

## Confirmed-run reset (pipeline stamps)

A confirmed new run reuses the canonical `stages/*/output/` paths. Before
stage work begins, clear prior run artifacts from every stage `output/` while
preserving `.gitkeep` directory placeholders. Ignore `.gitkeep` when deriving
status. Do not archive artifacts or create per-run namespaces. A stage is
incomplete until its current artifact is written after this reset; leftover
output from an earlier run never proves completion.

## Walk test (every form)

Walk it cold, as an agent with no memory:

- Open the root. Can you answer *where am I* and *where do I go for the
  current task* from `AGENTS.md` plus at most two more reads?
- For a pipeline stage only: does its contract name exact input paths, the
  job, the output, and the human check? Do not apply this check to map cards.
- For a pipeline, after the confirmed-run reset, can you state status purely by
  scanning what exists in `output/`?
- Is any routing file carrying content payload? Move the payload; leave a
  pointer.
- Is any fact stored in two places? Pick one home; link from the other.
- Token check: entry file + one contract + its inputs should land in
  roughly 2k-8k tokens.

Map / home extra:

- When a map exists, does one minimal catalog pointer in `AGENTS.md` route to
  `map/CONTEXT.md`, and can one card then answer *what is X* and *what else
  moves if I change X*? `map/CONTEXT.md` is not an alternative Layer 0.

If a step fails, remediate automatically only in files this skill added during
the current emission under the approved plan. Do not auto-edit a file that
existed before emission, including one already merged or replaced. If a fix
would change any such file, retain the active notes, present a revised
path-by-path collision plan with the exact change, and wait for explicit
approval before editing it.

## Kit validate (trees with stages only)

For every emitted tree that contains `stages/`:

```text
icm validate --strict
```

The kit errors if:

- Layer 0 (`AGENTS.md` or `CLAUDE.md`) is missing
- Root `CONTEXT.md` is missing
- Stage `CONTEXT.md` lacks headings `Inputs`, `Process`, `Outputs`,
  `Review Gate`, `Verify`
- Root dirs `_config`, `_templates`, `shared`, `stages` are missing
- A stage folder fails `^\d{2}_[a-z0-9][a-z0-9_-]*$`

Maps and home overlays will not pass this. That is correct. Do not add a
fake `stages/` so the CLI goes green.

For the product-app stamp only, human acceptance is a row in
`shared/acceptance-log.md`, not hidden state. Other pipeline stamps do not add
an acceptance log.

## Layer 0

- Keep the existing `AGENTS.md`.
- Before replacing an existing `CLAUDE.md`, move every unique rule into
  `AGENTS.md` or the stamp's canonical catalog.
- If a tool requires `CLAUDE.md`, write a one-line pointer at the canonical
  catalog only after that migration. Never a twin.
