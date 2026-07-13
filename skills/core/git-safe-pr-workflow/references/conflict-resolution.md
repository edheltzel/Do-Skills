# Conflict Resolution

Use this guide when a feature branch needs `origin/main` or when a merge conflict is already in progress.

## Default Sync Workflow

Use this local workflow for novice-friendly branch sync:

```bash
git fetch origin
git switch <feature-branch>
git merge origin/main
```

Prefer this over rebasing a pushed PR branch. It preserves the branch's existing commits and is easier to recover from if conflict resolution goes badly.

## Conflict Resolution Mental Model

Do not think in terms of "accept ours" or "accept theirs" until you know what each side means.

- `ours` is usually the current feature branch state.
- `theirs` is usually the incoming `origin/main` side of the merge.
- neither side is automatically correct.

Resolve to the desired final code, even if that means taking parts of both sides and editing further.

## Safe Conflict Workflow

1. Identify the conflicting files.
2. Read the full surrounding code before editing.
3. Understand what changed on `main` and what changed on the feature branch.
4. **Recover each side's intent before resolving hunks.** Don't reconcile the two versions on shape alone — recover *why* each side is the way it is. Read the commit messages that touched the conflicting lines (`git log -p <fixed-point>..HEAD -- <file>` and the same on the `main` side), and any linked PR or issue, so you know what each change was trying to achieve. A hunk that looks like a stray edit is often a deliberate fix; resolving without its intent is how fixes get silently dropped.
5. Remove conflict markers only after deciding the intended final behavior.
6. Re-check imports, function calls, types, and tests in the affected area.
7. Run focused verification before concluding the merge is done.

## Common Failure Modes

- Re-introducing deleted code while "keeping both".
- Restoring an old API call or old branch logic because it looks familiar.
- Keeping the feature branch version of a file and silently dropping a critical fix from `main`.
- Keeping the `main` version and silently removing intended feature work.
- Resolving the file but not rerunning tests or targeted checks.

## Verification After Conflict Resolution

Always inspect the diff for the conflicted files after resolution.

Then run the repo's checks in this order — **typecheck → tests → format** — so the cheapest, most localizing signal fires first: a type error pins the exact broken call a resolution introduced, tests then confirm behavior, and formatting runs last so it never reshuffles lines you still have to debug. Run at least one of:

- build/typecheck if the repo has it (first)
- targeted tests near the conflict, or the full suite if the change is broad
- format/lint last, once the code is correct
- focused manual review of the affected behavior

Summarize the resolution to the user in plain language:

- what `main` changed
- what the feature branch changed
- how the final result combines them

## When To Stop And Recover Instead

Stop and recover instead of pushing forward when:

- you no longer understand which side is correct
- the merge pulled in many unrelated files unexpectedly
- the branch history already looks wrong from an earlier failed rebase or merge
- the user says old bugs were reintroduced and the diff confirms it

In those cases, use `references/recovery.md`.
