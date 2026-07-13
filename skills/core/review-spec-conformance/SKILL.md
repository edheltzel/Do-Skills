---
name: review-spec-conformance
description: >-
  Review a diff for faithful implementation of its originating issue or spec — completeness,
  omissions, scope creep, and contradictions — reported as its own axis, never merged with
  coding-standards findings. USE WHEN asked "does this match the issue/PRD/spec", to check a
  branch or PR against what was asked for, or as the spec lens alongside a standards review.
  NOT FOR correctness bugs and regressions (use adversarial-review), repo-standards and
  structural quality (use review-structure), or report-discipline conventions (use
  review-verification-protocol).
---

# Review: Spec Conformance

Review the diff between `HEAD` and a fixed point along one axis only: **does the code faithfully implement the originating issue / PRD / spec?** Not "is the code good" — that's a different axis, owned by review-structure and adversarial-review. This skill asks whether the change did what it was asked to do, no more and no less.

## The no-rerank rule

Spec conformance is deliberately a **separate axis** from coding standards and correctness. A change can pass one and fail the other:

- Code that follows every standard but implements the wrong thing → **standards pass, spec fail.**
- Code that does exactly what the issue asked but breaks conventions → **spec pass, standards fail.**

So: report spec findings under their own heading, and **never merge or rerank them** against standards or correctness findings from a sibling skill. Reranking lets one axis mask the other — the separation is the whole point. When this skill runs beside a standards review, each reports independently and the results sit side by side.

## Process

### 1. Pin the fixed point

Whatever the user named is the fixed point — a commit SHA, branch, tag, `main`, `HEAD~5`. If they didn't give one, ask.

Capture the diff once with three-dot syntax so the comparison is against the merge-base:

```bash
git diff <fixed-point>...HEAD
git log <fixed-point>..HEAD --oneline
```

Confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty before going further — a bad ref or empty diff should fail here, plainly.

### 2. Find the spec source

Look for the originating spec, in this order:

1. **Issue references in the commit messages** (`#123`, `Closes #45`, etc.) — fetch each with `gh issue view <number>` (add `--comments` when the acceptance criteria live in the thread). For a PR, `gh pr view <number>` surfaces the linked issue and description.
2. **A path the user passed** as an argument.
3. **A PRD/spec file** under `docs/`, `specs/`, or a scratch directory matching the branch name or feature.
4. If nothing is found, **ask** the user where the spec is. If they say there isn't one, stop and report "no spec available" — there's nothing to conform to.

### 3. Review against the spec

Read the spec and the diff, then report — per requirement, quoting the spec line for each finding:

- **(a) Missing or partial** — requirements the spec asked for that the diff doesn't deliver, or delivers incompletely.
- **(b) Scope creep** — behaviour in the diff the spec didn't ask for. Unrequested work is a finding even when it's harmless; it's still unreviewed-against-spec surface.
- **(c) Implemented but wrong** — requirements that look addressed but where the implementation contradicts what the spec described.

Quote the spec line for every finding so the reader can check it. Keep judgement calls labelled as such — an ambiguous requirement is a question to raise, not a hard omission to assert.

### 4. Report

Present findings under a single `## Spec` heading, grouped by the three categories above. End with a one-line summary: total findings and the worst omission or contradiction. Do not fold in or reorder anything from a standards or correctness pass. For the report-shape conventions (echo-the-artifact discipline, severity vs confidence), follow review-verification-protocol.

## Running as one lens of a parallel review

This skill is context-isolated on purpose: it carries only the spec, not the coding standards, so its judgement isn't coloured by them. When you want a two-axis review (spec + standards, or spec + correctness), run each axis as a **separate sub-agent** in parallel — one prompted with the spec and this skill's brief, the others with review-structure or adversarial-review — then present their reports side by side under distinct headings. The sub-agents don't share context, which is what keeps the axes from bleeding into each other.

Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT) — extracted from the Spec axis of his two-axis code-review skill.
