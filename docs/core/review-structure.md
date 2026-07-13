# Review Structure

Quickstart:

```bash
npx skills add edheltzel/skills --skill=review-structure
```

```bash
npx skills update review-structure
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/review-structure)

## What it does

`review-structure` runs an unusually strict, repo-wide structural-maintainability
review. It pushes past local cleanup toward "code judo" moves — restructurings that
preserve behavior while making the implementation dramatically simpler — and enforces
concrete guards: the 1k-line file budget, anti-spaghetti branching rules,
canonical-layer placement, and explicit type/boundary contracts.

## When to reach for it

Ask for a structural review, an architecture health check on a branch, or "is this
getting messy?" before merging a large change. It reviews the changes on the current
branch against their merge base, but reads the whole repo to judge whether canonical
helpers already exist.

## Ambition as a review standard

The defining stance: do not rubber-stamp working code that leaves the codebase messier.
The skill looks for reframings where whole branches, helpers, modes, or layers disappear
entirely, and treats "temporary" branching, near-duplicate helpers, and wrapper
abstractions as presumptive blockers rather than nits.

## Verified claims only

Structural claims must carry artifacts: a "no canonical helper exists" finding cites the
search pattern and result; a file-size finding cites a line count. Every file in scope is
read in full before findings are drafted.

## Fowler smell baseline

On top of the repo's own documented standards, the skill carries a fixed twelve-smell baseline
from Fowler's _Refactoring_ (ch.3) — Mysterious Name, Duplicated Code, Feature Envy, Data
Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative
Generality, Message Chains, Middle Man, Refused Bequest — each a *what it is → how to fix*
decomposition trigger. Two rules bind it: a documented repo standard always overrides, and every
smell is a labelled judgement call you skip when tooling already enforces it.

One reconciliation worth knowing: the 1k-line guard measures **file** size, while depth (from
[codebase-design](../core/codebase-design.md)) measures **interface** size. A deep module can
hold a large implementation behind a small interface, so a file crossing the budget calls for
extracting internal seams, not widening the interface.

## It's working if

- Findings are few, structural, and high-conviction — not a list of cosmetic notes.
- Each finding has Issue/Why/Fix with file:line.
- The verdict ignores Minor and Informational items.
- At least some findings propose deleting complexity, not rearranging it.

## Where it fits

Sits above [simplify](./simplify.md) (local, behavior-preserving polish) and beside
[adversarial-review](./adversarial-review.md) (correctness bugs): simplify cleans a
change, adversarial-review pressure-tests it, review-structure asks whether the codebase
is better off with it. Pair with
[review-verification-protocol](./review-verification-protocol.md) when reporting.
Imported and adapted from the beagle skills marketplace (existential-birds/beagle).
