---
name: triage
description: "Move GitHub issues through a triage state machine — categorise, verify the claim, grill into shape, and write agent-ready briefs. USE WHEN triage issues, needs-triage, triage the backlog, is this ready for an agent, categorise this issue, what needs my attention on the tracker. NOT FOR reviewing the code inside a pull request (use git:pr-review-triage)."
---

# Triage

Move issues on GitHub through a small state machine of triage roles. Labels are applied with `gh issue edit`, using the repo's existing label taxonomy (see `pm-tools`).

PR review comments are `git:pr-review-triage`'s job, not this skill's. An external pull request can be triaged as "an issue with attached code" only where a repo explicitly treats PRs as a request surface — off by default. Resolve a bare `#42` to an issue.

*Imported/adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).*

## Reference docs

- [AGENT-BRIEF.md](AGENT-BRIEF.md) — how to write durable agent briefs
- [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md) — how the `.out-of-scope/` knowledge base works

## Roles

Two **category** roles:

- `bug` — something is broken
- `enhancement` — new feature or improvement

Five **state** roles:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on the reporter for more information
- `ready-for-agent` — fully specified, ready for an AFK agent
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Every triaged issue carries exactly one category role and one state role. If state roles conflict, flag it and ask the maintainer before doing anything else. These are canonical role names; the actual label strings in the repo may differ — map them to the repo's taxonomy (see `pm-tools`).

State transitions: an unlabeled issue normally goes to `needs-triage` first; from there it moves to `needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix`. `needs-info` returns to `needs-triage` once the reporter replies. The maintainer can override at any time — flag transitions that look unusual and ask before proceeding.

## Invocation

The maintainer invokes `triage` and describes what they want in natural language — "show me anything that needs my attention", "let's look at #42", "move #42 to ready-for-agent", "what's ready for agents to pick up?". Interpret the request and act.

## Show what needs attention

Query GitHub and present three buckets, oldest first:

1. **Unlabeled** — never triaged.
2. **`needs-triage`** — evaluation in progress.
3. **`needs-info` with reporter activity since the last triage notes** — needs re-evaluation.

Show counts and a one-line summary per item. Let the maintainer pick.

## Triage a specific issue

1. **Gather context.** Read the full issue — body, comments, labels, author, dates. Parse any prior triage notes so you don't re-ask resolved questions. Explore the codebase using the project's domain vocabulary (see `domain-modeling`), respecting ADRs in the area. Run two checks: (a) **redundancy** — search for an existing implementation of the requested behavior by domain concept, not just the request's wording, and report where you looked; if found, it's an already-implemented `wontfix` (step 5). (b) **prior rejection** — read `.out-of-scope/*.md` and surface any that resembles this request.
2. **Recommend.** Tell the maintainer your category and state recommendation with reasoning, plus a brief codebase summary — including whether it's already implemented. Wait for direction.
3. **Verify the claim.** Before any grilling, check the claim holds up. For a bug, reproduce it from the reporter's steps. Report what happened: confirmed (with code path), failed, or insufficient detail (a strong `needs-info` signal). A confirmed verification makes a much stronger agent brief.
4. **Grill (if needed).** If the request needs fleshing out, run `grilling` and `domain-modeling` together — grill it into shape one question at a time, sharpening domain terms as decisions land.
5. **Apply the outcome:**
   - `ready-for-agent` — post an agent brief comment (see [AGENT-BRIEF.md](AGENT-BRIEF.md)).
   - `ready-for-human` — same structure as an agent brief, but note why it can't be delegated (judgment calls, external access, design decisions, manual testing).
   - `needs-info` — post triage notes (template below).
   - `wontfix` — close, with the comment depending on *why*:
     - **Already implemented** — point to where it lives; do **not** write to `.out-of-scope/` (that KB is for *rejected* requests, not built ones).
     - **Rejected (bug)** — polite explanation, then close.
     - **Rejected (enhancement)** — write to `.out-of-scope/`, link to it from a comment, then close (see [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md)).
   - `needs-triage` — apply the role. Optional comment if there's partial progress.

## Quick state override

If the maintainer says "move #42 to ready-for-agent", trust them and apply the role directly. Confirm what you're about to do (role changes, comment, close), then act. Skip grilling. If moving to `ready-for-agent` without a grilling session, ask whether they want an agent brief.

## Needs-info template

```markdown
## Triage Notes

**What we've established so far:**

- point 1
- point 2

**What we still need from you (@reporter):**

- question 1
- question 2
```

Capture everything resolved during grilling under "established so far" so the work isn't lost. Questions must be specific and actionable, not "please provide more info".

## Resuming a previous session

If prior triage notes exist on the issue, read them, check whether the reporter has answered any outstanding questions, and present an updated picture before continuing. Don't re-ask resolved questions.
