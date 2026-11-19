# Token mapping

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-token-mapping
```

```bash
npx skills update do-token-mapping
```

This skill needs `do-build-design-system` installed beside it (its `scripts/oklch.mjs` helper). Install both:

```bash
npx skills add edheltzel/Do-Skills --skill=do-token-mapping --skill=do-build-design-system
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend/do-token-mapping)

## What it does

`do-token-mapping` reports how hardcoded style values (hex, px, shadows) on a page, file, or diff map onto a project's existing design tokens. The list is one someone else owns; the skill finds that list and the values itself.

It never edits. A match on value before purpose is wrong, and a gap never gets a new name. Replacing the values belongs to [build-design-system](./build-design-system.md).

## When to reach for it

Type `/do-token-mapping`, or the agent reaches for it automatically when a task fits.

Reach for it for "are we using our tokens here", "which hardcoded colors map to which tokens", a token audit, or planning a token migration. "Check the tokens on the settings page" is enough of an ask. For replacing those values, use [build-design-system](./build-design-system.md).

## Prerequisites

A readable token list the team owns: token files, theme entries, custom properties on `:root`, or a component library's variable pairs. A framework's default theme is not that list, and neither is a public system (Geist's names never stand in). If a read fails or no list exists, the skill stops and does not fill the list from memory.

## Purpose, then value

Each row is classified once per mode. Purpose first, then value.

- **Exact:** the token's stated job covers the row and the values match.
- **Semantic:** the job covers it and the value is inside tolerance. State the difference in numbers.
- **Ambiguous:** two or more tokens fit and nothing picks one. Name every candidate.
- **Gap:** no token's job covers it, or the only fitting token is out of tolerance. A gap never gets a new name.

A semantic token wins over the primitive it aliases. Map to a primitive only when no semantic token covers the job, and say so. A token whose value matches but whose job differs goes in Do not use. A palette class such as `text-gray-500` names a value and no job; it gets a row, counted apart from raw values. Anything inferred rather than read is marked inferred.

Both sides are normalised with code, never by eye (lengths to px, colours to OKLCH compared by delta E OK). Classes, normalising, and tolerances are in `references/mapping-rules.md`.

## The report

Record the list (name, location, how it was read) and each value (file, line, property, job). Follow every alias to its final value in each mode and write down every disagreement between two sources. The reply is Summary, Mapping, Do not use, Ambiguous, Gaps, For a person to decide, and Source. The last line is `Coverage:` with what was scanned and what was not. On its own, the chat reply gives the numbers and one prompt to paste for the next step.

When gaps are over 30% of rows and number 12 or more, the list is usually the wrong one. Still deliver the table, and lead with `Status: not actionable (gap threshold)`.

Stop and report only when no list exists, one name has two values in the same mode, or two sources disagree and no project rule says which wins (report both). Return what stopped it, the groundwork so far, and the shortest unblock, such as "Paste `tokens.json` or give its path."

## It's working if

- Every row has a job, a class, and a reason. Every ambiguous row names two or more candidates.
- Counts carry a unit: occurrences, lines, or mapping rows.
- Nothing in the repo changed (`git status` is the same before and after).
- The last line reads `Coverage:`.

## Where it fits

A read-only check you run when a page, file, or diff should be measured against tokens the project already has. It does not change those values. Hand replacement to [build-design-system](./build-design-system.md).