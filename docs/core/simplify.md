# Simplify

Quickstart:

```bash
npx skills add edheltzel/skills --skill=simplify
```

```bash
npx skills update simplify
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/simplify)

## What it does

`simplify` refines recently modified code so its intent is easier to see without
changing what it does. The defining constraint is that a good simplification
removes concepts, not merely lines: behavior, public APIs, side effects, timing,
and error handling stay intact.

## When to reach for it

Type `/simplify`, or the agent reaches for it after code has been written or
modified and a behavior-preserving cleanup would help.

Reach for it when nesting, vague names, duplicate logic, dead branches, or
speculative abstractions make a change harder to understand. For a wider
TypeScript refactor that may reshape APIs or types, use
[typescript-refactoring](../engineering/typescript-refactoring.md). For an
end-of-session multi-lens review, use
[cleanup-web](../engineering/cleanup-web.md) or
[cleanup-swift](../engineering/cleanup-swift.md).

## Fewer concepts, not fewer lines

The skill rejects brevity as a goal by itself. It favors clear control flow,
intent-revealing names, and boundaries that hide meaningful low-level detail.
It stops when the remaining changes are taste preferences, require broader
context, or would need new tests, migrations, or API changes. One line it never
crosses: a safety check — input validation at a trust boundary, error handling
that prevents data loss, a security check, an accessibility affordance — is not
removable boilerplate, so a "simplification" that thins one is skipped as
unfinished, not merged. When a coordinator *applies* these proposals rather than
only listing them, it verifies behavior held with a typecheck, lint, and scoped
tests before committing, and reverts any change that fails.

Single-use helpers get the same test. A helper is a candidate for inlining when
its body communicates more than its name. It stays when the name captures a
domain rule, makes a predicate read naturally, or keeps branching and boolean
mechanics out of the high-level call site.

## It's working if

- The next reader has fewer concepts to hold in mind.
- The diff stays local to the recently modified code.
- Behavior and boundaries remain unchanged.
- The result is clearer at the call site, not just shorter in the helper file.

## Where it fits

A reach-for-it-anytime cleanup lens and a building block for the cleanup skills.
It complements [code-comments](./code-comments.md): simplify until the code
explains the mechanics, then comment only the surviving rationale. Use
[adversarial-review](./adversarial-review.md) afterward when correctness, rather
than clarity, is the remaining question.
