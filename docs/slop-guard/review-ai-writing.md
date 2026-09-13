# Review AI Writing

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-review-ai-writing
```

```bash
npx skills update do-review-ai-writing
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/slop-guard/do-review-ai-writing)

## What it does

`do-review-ai-writing` scans developer text (docs, docstrings, comments, commit
messages, PR descriptions) for AI-generated writing patterns and writes a JSON
report. It does not rewrite the files.

Evidence comes before a flag. Every finding must cite file:line and pass the
bundled verification protocol. The report path is `ai-writing-review.json`.

## When to reach for it

You invoke this by typing `/do-review-ai-writing`. The agent won't reach for it
on its own.

Reach for it when text sounds like ChatGPT or you want a writing-quality pass
before merge. To apply the fixes, use [humanize](./humanize.md). To restate one
reply in plain language, use [bro](./bro.md).

## Pattern catalog, then JSON

The skill partitions files into prose, code docs, and git, then checks six
pattern categories (content, vocabulary, formatting, communication, filler,
code docs). Safe vs needs-review is classified up front so
[humanize](./humanize.md) can auto-apply only the mechanical ones.

## It's working if

- `ai-writing-review.json` parses and `git_head` matches `HEAD`, or the
  run exited with no files to scan.
- Each finding has file:line, a category, and a fix-safety label.
- False positives listed in the skill (intentional formality, licenses, generated
  code) are not flagged.

## Where it fits

A user-invoked detection pass in Slop Guard. It feeds
[humanize](./humanize.md). [tech-writing](../workflow/tech-writing.md) sets voice
while writing. This skill audits what already landed.
