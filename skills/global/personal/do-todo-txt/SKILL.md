---
name: do-todo-txt
description: Manage a personal todo.txt list through the tuxedo CLI - add, list, complete, prioritize, archive, dependencies, and ready tasks. Use for todo.txt, tuxedo, my todo list, or personal tasks.
---

# todo.txt via tuxedo

Use **tuxedo only**. Do not use `todo.sh`: its line numbering differs from tuxedo's, so mixing them hits the wrong tasks.

The list is `$TODO_FILE`, else `$TODO_DIR/todo.txt`, else `~/todo.txt`; done history is the sibling `done.txt`. If `TODO_FILE` or `TODO_DIR` is already set, run `tuxedo` as is. If neither is set, tuxedo falls back to `./todo.txt` or a temp **sample** file, so prefix every command with `TODO_DIR=~` (works in fish and bash). Commands below omit that prefix.

Agents: use the CLI with `--json`, never the TUI. A running TUI reloads external changes within ~250 ms.

## Format (one line = one task)

```
(A) 2026-10-09 Call dentist @phone +health due:2026-10-20 rec:+1m t:-3d
x 2026-10-12 2026-10-09 Call dentist @phone +health due:2026-10-20
```

- `(A)`-`(Z)` priority: uppercase, parens, space, MUST be first. `(b)`, `(A)->x`, mid-line `(A)` are not priorities.
- Optional creation date `YYYY-MM-DD` after priority (or first).
- Done: starts with lowercase `x `, completion date, then creation date. `X ...`, `(A) x ...` are not done. tuxedo drops the priority on completion (a `pri:A` tag is kept).
- `+project`, `@context`: after the prefix, preceded by a space, any non-whitespace. `a@b.com`, `2+2` are not tags.
- `key:value`: no spaces. tuxedo understands `due:YYYY-MM-DD`, `t:` threshold (TUI hides until date, toggle `F`; CLI `ls` still shows it), `rec:`, `note:<path>`. Other keys are kept as written.
- `rec:[+]N{d,b,w,m,y}`: completing inserts a new copy directly below with `due:` advanced. `+` = from previous due; none = from completion date; `b` = business days.

## Dependencies, holds, ready (agent conventions)

tuxedo keeps these tags through `pri`, `app`, `do`, and `archive`, but does not act on them. The agent does.

- `id:<slug>` names a task others can depend on.
- `dep:<slug>` (repeat the tag for several): blocked until every task with that `id:` is done (`x` in todo.txt, or in done.txt).
- `@waiting` plus the reason in the text: on hold for a person or decision. Use `t:` instead when the hold is only a date.
- `pr:<url>` or `report:<path>`: append before `do` to record what delivered the task.
- **Ready** = open, no `@waiting`, no future `t:`, and every `dep:` done. Rank ready tasks by priority, then soonest `due:`.

## Task numbers (read before mutating)

- tuxedo `n` = position among **non-blank** lines, not raw file line. Any tuxedo write deletes blank lines.
- Numbers shift after `del`, `do` on a `rec:` task (inserts a line), `archive`, and any external edit.
- Always: `tuxedo ls --json`, find the task by `raw`, mutate by its `n`, re-list before the next mutation.
- Several numbers in one `do`/`depri`/`del` are resolved against the pre-command list (safe). `pri` takes exactly one `N X`; `del N TERM` removes TERM from task N, so `del 1 2` on a task with `2` in it is ambiguous - delete one at a time.

## CLI

`tuxedo [-f] [--json] CMD ...` (flags may precede CMD).

| Command | Args | Notes |
| --- | --- | --- |
| `add`, `a` | `TEXT` | always prepends creation date; natural-language parse (below) |
| `append`/`app`, `prepend`/`prep`, `replace` | `N TEXT` | |
| `pri`, `p` | `N A-Z` | one pair only |
| `depri`, `dp` | `N...` | |
| `do`, `done`, `complete` | `N...` | never archives; spawns `rec:` next instance |
| `del`, `rm` | `N... ` or `N TERM` | prompts unless `-f` (always pass `-f`) |
| `archive` | | moves `x` lines to `done.txt` |
| `ls`/`list`, `lsa`/`listall`, `lsp`/`listpri [X]`, `lsprj`, `lsc` | `[TERM...]` | TERM = `+proj`, `@ctx`, or text; `-TERM` is an error (exit 2) |

Natural-language add: `tuxedo add "Pay rent monthly on the first, project home"` -> `2026-10-09 Pay rent +home due:2026-11-01 rec:+1m`. Text already containing `due:`/`rec:`/`t:` is kept literal. Vocab: today/tomorrow/weekdays/`april 15`/`in 3 days`; daily/weekly/`every other friday`/`every business day`; `show 3 days before due` -> `t:-3d`; `project X`/`context Y`; `high|medium|low priority` -> A/B/C.

### `--json` shapes (they differ per command)

Task object: `{n, raw, done, priority, created, completed, projects, contexts, due, rec, t}`. `projects` and `contexts` drop the `+`/`@`. Custom tags such as `id:` and `dep:` appear only in `raw`.

| Command | Output |
| --- | --- |
| `ls`, `lsp` | `[task, ...]` |
| `lsa` | `{ok, action:"listall", todo:[...], done:[...]}` |
| `lsprj`, `lsc` | `{ok, action, tags:[...]}` |
| `add`, `app`, `prep`, `replace`, `pri`, `del N TERM` | `{ok, action, task}` |
| `depri N...` | one `{ok, action, task}` JSON line per N |
| `do N...`, `del -f N...` | `{ok, action:"done"/"del", tasks:[...]}` |
| `archive` | `{ok, action, count}` |
| errors | no JSON; stderr message, exit 1 (bad N) or 2 (usage) |

`del` without `-f` under `--json` still prints the prompt text: always pass `-f`.

File resolution: `$TODO_FILE` > `$TODO_DIR/todo.txt` > `./todo.txt` > sample. Done file: `$DONE_FILE` or sibling `done.txt`. Writes are atomic (tmp + rename).

## TUI (for explaining to the user)

`tuxedo [FILE]`, `--sample`. `j/k`, `gg/G`, `Ctrl-d/u`; `n` add (NL), `e`/`i` edit (modal, Enter saves), `x` toggle done, `dd` delete, `p` cycle priority, `r` reschedule, `J/K` move, `c` context, `+` project, `yy`/`yb` copy line/body (OSC 52), `u` undo (50). `/` search (`due:+1w` range), `fp`/`fc` project/context filter, `fs` save search, `ff` saved searches, `S` sort pri/due/file, `v` + `space` multi-select, `H` show done, `F` show future `t:`, `a` archive view, `A` archive done, `o`/`O` open/create `note:`. `[` `]` sidebars, `T` theme, `D` density, `L` line numbers. `:`/`Ctrl-P` palette, `?` help, `,` settings, `s` phone capture QR, `q` quit. Chords time out at 600 ms. Typing `rec:` opens the REPEAT builder; `due:`/`t:` open a calendar.

Capture: lines appended to `~/inbox.txt` (`echo "Buy milk tomorrow" >> ~/inbox.txt`) are NL-parsed and merged into todo.txt by a running TUI on its next poll. The `s` server is plain HTTP with a URL token: trusted LAN only.

Config `~/.config/tuxedo/config.toml` (hot-reloads): theme, density, sort, `filter.<name> = query`, `hide_keys = uid, sync`, `notes_dir`, `recurrence_builder = false`, `share_token`/`share_port` (secret). `keybinds.toml` with `[normal]`/`[recurrence]` tables of `action = "key"`. Themes: `themes/*.toml`. `TUXEDO_NO_UPDATE_CHECK=1` disables update check.

## Related skills

- Status across projects or this project: `do-regroup`, if installed.
- Work tracked on a GitHub Projects board: `do-gh-pm`, if installed.
