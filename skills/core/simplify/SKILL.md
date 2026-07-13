---
name: simplify
description: Simplify and refine recently modified code for clarity and consistency. Use after writing or modifying code, during cleanup passes, or when asked to simplify/refactor without changing behavior.
---

# Simplify

Simplify code by making intent easier to see without changing behavior.

## Rules

- Preserve behavior. Do not change outputs, side effects, timing assumptions, public APIs, or error behavior unless asked.
- Prefer clear flow over clever expressions.
- Prefer names that explain intent over comments that explain mechanics.
- Remove code that no longer earns its place: dead branches, unused parameters, duplicate logic, speculative options, and redundant wrappers.
- Keep related logic together. Split code only when the new boundary has a clear name and purpose.
- Match the surrounding style. Do not reformat or modernize unrelated code.
- **Never simplify away a safety check.** Input validation at trust boundaries, error handling that prevents data loss, security checks (authorization, escaping, sanitization), and accessibility affordances are not removable boilerplate — preserve them even when they look redundant or inline-able. Code that drops one of these is not simpler, it is unfinished; skip any simplification that would thin or remove one.

## What to simplify

Look for changes that make the next reader do less work:

- flatten unnecessary nesting
- delete obsolete checks or branches
- replace vague names with specific names
- collapse duplicate code
- remove speculative abstraction
- move low-level detail out of high-level flow when it hides intent

## What not to simplify

Do not make code shorter if it becomes harder to read, debug, test, or change.

Avoid changes that:

- combine unrelated concerns
- expose low-level mechanics at an important call site
- replace clear control flow with dense expressions
- remove names that encode domain meaning
- introduce new patterns not already present
- create broad abstractions for one local problem

## Single-use helpers

Single-use is evidence, not a verdict.

Inline a helper when its body is clearer than its name and the call site becomes easier to read.

Keep a helper when it:

- names a domain concept or business rule
- makes a predicate, comparator, transformation, or callback read naturally
- hides multiple checks, branches, or boolean operators behind one intent-revealing name
- separates high-level flow from low-level mechanics

Reject an inline suggestion when the result exposes more boolean logic, nesting, or implementation detail at the call site.

## Good simplification test

A simplification is good when:

- the next reader can understand the code faster
- the changed code has fewer concepts, not only fewer lines
- behavior and boundaries stay the same
- the diff is smaller than the problem it solves

Reject a simplification when the main benefit is aesthetic, theoretical, or based only on line count.

## Stop conditions

Stop when:

- remaining changes are taste preferences
- a refactor needs broader context than the modified code provides
- the code is already clear enough
- the simplification would require new tests, migration work, or API changes

## Review process

1. Identify the modified code.
2. Find concrete simplifications, not theoretical improvements.
3. Check each candidate against the call site: is the code easier to understand after the change?
4. Preserve behavior exactly.
5. If no change improves clarity, say so.

## Behavior-preservation gate (when applying)

This skill's premise is that simplification preserves exact behavior. When a coordinator *applies* these proposals rather than only listing them — the `/simplify` command, or a review workflow acting on the findings — it must verify preservation before committing, because behavior review alone does not catch every regression:

- **Typecheck and lint** the project (or the affected package) — these are fast and catch the common simplification regressions: broken imports, unused exports, dropped type narrowings, dead code other modules still reference.
- **Run the tests scoped to the changed paths** (broaden when a heavily-imported helper or shared code was touched). Match scope to blast radius; a 3-line change does not warrant the full suite.

Never relax an assertion, weaken a type, or skip a test to make a check pass — that defeats the guarantee. On any failure, fix the break or revert the specific change that caused it; never leave the tree red. If no typecheck, lint, or test suite is configured, say so in the summary rather than silently skipping verification.

## Output

When proposing changes, explain:

- what gets simpler
- why behavior stays the same
- what trade-off, if any, the change makes

If a possible simplification is not worth doing, mention it only when the rejection teaches something useful.
