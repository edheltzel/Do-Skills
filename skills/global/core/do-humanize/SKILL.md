---
name: do-humanize
description: "Detect and rewrite AI-generated developer text. Use when reviewing any text artifact for authenticity and clarity, humanizing inflated language, filler, tautological docs, and robotic tone in docs, docstrings, commit messages, PR descriptions, and code comments, or when the user mentions ai writing, ai-generated or robotic writing, text that sounds like AI or ChatGPT, or writing quality."
disable-model-invocation: true
user-invocable: true
---

# Humanize

Two modes in one skill. Default is **review**: scan developer text and write `ai-writing-review.json`. **fix** consumes that file and applies classified edits. Builds on [docs-style](references/docs-style.md).

## Usage

- Review (default): `/do-humanize [--all] [--category <name>] [path]`
- Fix: `/do-humanize fix [--dry-run] [--all] [--category <name>]`

**Flags:**

- `--all` - Scan or fix the whole codebase (review default: changed files from main)
- `--category <name>` - `content|vocabulary|formatting|communication|filler|code_docs`
- `--dry-run` - Fix mode only. Preview without changing files
- Path - Review mode target directory (default: current working directory)

If fix mode has no review file and `--all` is set, run review mode in this skill first. Do not look for a separate review skill.

## Which file to load

| Mode | Load |
|------|------|
| review (default, no `fix` argument) | [references/review.md](references/review.md), then the pattern files it names |
| fix (`fix` is the first argument) | [references/fix.md](references/fix.md), then the strategy files it names |

Read [review-verification-protocol](references/review-verification-protocol.md) before reporting findings.

## Pattern references

Load only the categories in scope:

- [content-patterns](references/content-patterns.md)
- [vocabulary-patterns](references/vocabulary-patterns.md)
- [formatting-patterns](references/formatting-patterns.md)
- [communication-patterns](references/communication-patterns.md)
- [filler-patterns](references/filler-patterns.md)
- [code-docs-patterns](references/code-docs-patterns.md)
- [vocabulary-swaps](references/vocabulary-swaps.md)
- [fix-strategies](references/fix-strategies.md)
- [developer-voice](references/developer-voice.md)
- [diataxis-compass](references/diataxis-compass.md)

## Rules

- Default invocation is review. `fix` is the first argument.
- Review writes `ai-writing-review.json` and does not rewrite files.
- Fix does not edit until that JSON exists and passes the gates in [fix.md](references/fix.md).
