# Frontmatter schema and category taxonomy

The canonical contract for `docs/solutions/` frontmatter. The `problem_type` determines the **track**, the track determines which fields are required, and the category directory is mapped from `problem_type`.

## Tracks

| Track | problem_type values | Description |
|-------|--------------------|-------------|
| **Bug** | `build_error`, `test_failure`, `runtime_error`, `performance_issue`, `database_issue`, `security_issue`, `ui_bug`, `integration_issue`, `logic_error` | Defects and failures that were diagnosed and fixed |
| **Knowledge** | `architecture_pattern`, `design_pattern`, `tooling_decision`, `convention`, `workflow_issue`, `developer_experience`, `documentation_gap`, `best_practice` | Practices, patterns, conventions, decisions, and workflow improvements. Prefer the narrowest applicable value; `best_practice` is the fallback. |

## Required fields (both tracks)

- **title** — clear, descriptive title (matches the H1)
- **date** — creation date, `YYYY-MM-DD`
- **category** — the `docs/solutions/` subdirectory (see mapping below)
- **module** — module or area of the codebase affected (free string, project vocabulary)
- **problem_type** — one enum value from the Tracks table
- **component** — the kind of thing involved (free string: e.g. `model`, `controller`, `background-job`, `database`, `frontend`, `auth`, `build-tooling`, `testing-framework`, `documentation`)
- **severity** — `critical` | `high` | `medium` | `low`

## Bug track — additionally required

- **symptoms** — array of 1–5 observable symptoms (error strings, broken behavior)
- **root_cause** — one of: `missing_association`, `missing_include`, `missing_index`, `wrong_api`, `scope_issue`, `thread_violation`, `async_timing`, `memory_leak`, `config_error`, `logic_error`, `test_isolation`, `missing_validation`, `missing_permission`, `missing_workflow_step`, `inadequate_documentation`, `missing_tooling`, `incomplete_setup`
- **resolution_type** — one of: `code_fix`, `migration`, `config_change`, `test_fix`, `dependency_update`, `environment_setup`, `workflow_improvement`, `documentation_update`, `tooling_addition`, `seed_data_update`

## Knowledge track — all optional

- **applies_when** — array (max 5) of conditions where the guidance applies
- **symptoms**, **root_cause**, **resolution_type** — as above, only when a specific one exists

## Optional (both tracks)

- **related_components** — array of other areas involved
- **tags** — array (max 8) of search keywords, lowercase and hyphen-separated

## Category mapping

`problem_type`, hyphenated, is the directory: `build_error` → `docs/solutions/build-errors/`, `performance_issue` → `docs/solutions/performance-issues/`, `architecture_pattern` → `docs/solutions/architecture-patterns/`, `tooling_decision` → `docs/solutions/tooling-decisions/`, `best_practice` → `docs/solutions/best-practices/`, and so on for every enum value (plural where English pluralizes: `ui_bug` → `ui-bugs/`, `convention` → `conventions/`).

## Backward compatibility

Docs created before the track system may carry bug-track fields on knowledge-track `problem_type`s. They are valid legacy docs — do not strip the extra fields during a refresh unless the doc is being rewritten anyway. New docs follow the track rules above.

## YAML safety rules

Strict YAML 1.2 parsers reject array items that start with a reserved indicator as unquoted scalars. For any array-of-strings field (`symptoms`, `applies_when`, `tags`, `related_components`), wrap the item in double quotes when it starts with any of `` ` `` `[` `*` `&` `!` `|` `>` `%` `@` `?`, or contains the substring `": "`.

```yaml
# breaks strict YAML
symptoms:
  - `sudo dscacheutil -flushcache` does not restore in-container mDNS

# parses cleanly
symptoms:
  - "`sudo dscacheutil -flushcache` does not restore in-container mDNS"
```

Also check scalar values: an unquoted ` #` silently truncates the value as a comment, and an unquoted `: ` can be read as a nested mapping — quote the whole value when either appears. The opening and closing frontmatter delimiters must each be a line containing exactly `---`.
