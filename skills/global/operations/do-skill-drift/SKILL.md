---
name: do-skill-drift
description: "Resolve skill drift that gap sync or gap status reports: tell a stale but untouched copy from a real local edit, restore the stale ones, and route real edits back to their source repo. USE WHEN gap sync exits 1 on drift, gap status shows drift=N, a skill copy 'differs from the managed' one, or installed skills look out of date. NOT FOR moving pins or updating components (never pin), or authoring skills (use do-skill-craft)."
effort: low
---

# Skill drift

`gap sync` calls a copy drifted when it differs from the pinned store. That covers two different cases, and only one needs a person:

- **Stale**: the copy matches an older store commit. Nobody edited it; the source moved on. Restore it without asking.
- **Edited**: the copy matches no store commit. Someone changed it by hand. Ask before replacing it.

Never run `gap pin`, never edit `~/.gap/store/`, and never delete with `rm`. Use `trash`.

## 1. Find the drift

```bash
gap status
```

Note each `<skill> drift=N` line and the component (`<id> ref=... commit=<pin> store=ok`) it sits under. If the store is not `ok`, run the repair command `gap status` prints, then check again. Drift is only checked against a store that matches its pin.

## 2. Classify each drifted skill

Gather the candidate baselines for skill `<name>` of component `<id>`:

- The pinned store: `~/.gap/store/<id>/<pin commit>`.
- GAP's last copy of this skill: `jq -r '.components["<id>"] | .skillCopies["<name>"] // .installed' ~/.gap/state.json`, then `~/.gap/store/<id>/<that commit>`.
- A skills.sh install: `jq '.skills["<name>"].source' ~/.agents/.skill-lock.json` (or `$XDG_STATE_HOME/skills/.skill-lock.json`). A source under `~/.gap/store/<id>/<commit>` is a baseline.
- Any other `~/.gap/store/<id>/*` commit still on disk.

A store counts as a baseline only when it still holds its commit: `git -C <store> rev-parse HEAD` prints its folder name and `git -C <store> status --porcelain --untracked-files=all` prints nothing. Skip any store that fails; a copy that matches only an unverified store is **edited**.

Locate the skill folder in each store with `grep -rl '^name: <name>$' <store>/skills --include=SKILL.md`, ignoring `references/` copies. Then diff each installed copy against every baseline with `diff -rq`. Installed copies live in `~/.agents/skills/<name>` and `~/.claude/skills/<name>`, plus `<repo root>/.agents/skills/<name>` and `<repo root>/.claude/skills/<name>` for each repo root that lists the skill in `jq '.components["<id>"].projectSkills' ~/.gap/state.json`.

- No differences against some baseline: **stale**.
- Differences against every baseline: **edited**. Show `diff -ru <pinned store skill> <installed copy>`.

## 3. Repair

`gap restore <id>` replaces every drifted skill of the component, edited ones included. Run it only when every drifted skill of that component is stale, or the user chose restore for each edited one.

- **Stale**: `gap sync --only <id> --yes` upgrades a copy that equals an earlier verified store of its component without asking, and leaves edited copies alone. Use `gap restore <id>` only under the rule above.
- **Edited**: show the user the diff and offer three moves:
  1. The edit is wanted upstream: port it to the source repo on a branch and open a PR. After it merges, `gap update <id>` moves the lock; merge that and run `gap sync`.
  2. The edit is obsolete: once no other skill of the component is edited, `gap restore <id>`. Otherwise back the copy up to a scratch folder, `trash` both installed copies, and run `gap sync --only <id> --yes` to reinstall that skill alone.
  3. Keep it for now: leave it. Sync keeps reporting it.

Harness copies outside GAP's two folders (`~/.jcode/skills/<name>`, `~/.empryo/skills/<name>`) shadow the managed one. Copy the old folder to a scratch backup, `trash` it, then copy `~/.agents/skills/<name>` in its place. If it holds edits, treat it as edited first.

## 4. Verify

```bash
gap status
gap sync --only <id> --yes
```

Done when `gap status` shows no `drift=` above 0 for the component, apart from edited copies the user chose to keep, and the sync shows no "differs from the managed" line for it. Report each skill as stale or edited and what was done.

Newer commits waiting on the ref are not drift: `gap check <id>` lists them and `gap update <id>` moves the lock. Never run `gap pin`.
