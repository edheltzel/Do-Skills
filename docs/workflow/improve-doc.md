# Improve Doc

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-improve-doc
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/workflow/do-improve-doc)

## What it does

`do-improve-doc` classifies an existing markdown file by Diataxis type, then
refines sections with the user. Core voice lives in the bundled `docs-style`
reference. How-to, reference, and explanation pattern books are bundled
references. Tutorials use the registered `do-tutorial-docs` skill.

## When to reach for it

Type `/do-improve-doc` with a document path.

Adapted from Beagle `improve-doc` under Apache-2.0. `disable-model-invocation:
true` is preserved from the source.
