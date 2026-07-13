---
name: wayfinder
description: "Plan work too big for one agent session as a shared map of investigation tickets on GitHub, resolved one per session until the way to the destination is clear. USE WHEN this is too big for one session, fog of war, chart a map, break down a huge effort, where do we even start, plan a large migration or research effort. NOT FOR breaking a ready spec into build tickets (use plan) or a single-session investigation (use research or grilling)."
---

# Wayfinder

A loose idea has arrived — too big for one agent session, and wrapped in fog: the way from here to the **destination** isn't visible yet. Wayfinding is about finding that way, not charging at the destination. This skill charts the way as a **shared map** of GitHub issues, then works its tickets one at a time until the route is clear.

*Imported/adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).*

The destination varies per effort, and naming it is the first act of charting — it shapes every ticket. It might be a spec to hand off and iterate on, a decision to lock before planning starts, or a change made in place like a data-structure migration. The map is domain-agnostic.

## Plan, don't do

Wayfinder is **planning** by default: each ticket resolves a decision, and the map is done when the way is clear — nothing left to decide before someone goes and does the thing. The pull to just do the work is usually the signal you've reached the edge of the map and it's time to hand off. An effort can override this in its **Notes** — carrying execution into the map itself — but absent that, produce decisions, not deliverables.

## Refer by name

Every map and ticket is a GitHub issue, so it has a **name** — its title. In everything the human reads — narration, the map's Decisions-so-far — refer to it by that name, never by a bare id or number. A wall of `#42, #43, #44` is illegible; names read at a glance. The id and URL don't vanish — a name wraps its link — but they ride *inside* the name, never stand in for it.

## The Map

The map is a single GitHub issue labelled `wayfinder:map` — the canonical artifact. Its tickets are **sub-issues** of the map (see `pm-tools` for creating and linking sub-issues via `gh`).

The map is an **index**, not a store. It lists the decisions made and points at the tickets that hold their detail; a decision lives in exactly one place — its ticket — so the map never restates it, only gists it and links.

### The map body

The whole map at low resolution, loaded once per session. Open tickets are **not** listed — they are open sub-issues, found by query.

```markdown
## Destination

<what reaching the end of this map looks like — the spec, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<domain; skills every session should consult; standing preferences for this effort>

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then open the link for the detail the ticket holds -->

- [<closed ticket title>](link) — <one-line gist of the answer>

## Not yet specified

<!-- in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Out of scope

<!-- work ruled beyond the destination; closed, never graduates -->
```

### Tickets

Each ticket is a **sub-issue** of the map; its issue number is its identity. Its body is the question, sized to one agent session:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries a `wayfinder:<type>` label — one of `research`, `prototype`, `grilling`, `task` (see [Ticket Types](#ticket-types)).

A session **claims** a ticket by assigning it to the dev driving the map, **first**, before any work, so concurrent sessions skip it. That assignee _is_ the claim: an open, unassigned ticket is unclaimed.

Blocking uses GitHub's native issue dependencies, so the frontier renders *visually* in the tracker and the human sees what's takeable without opening the map (see `pm-tools`; where a body convention is needed, `blocked by #N`). A ticket is **unblocked** when every ticket blocking it is closed; the **frontier** is the open, unblocked, unclaimed sub-issues — the edge of the known.

The answer isn't part of the body — it's recorded on resolution (see [Work through the map](#work-through-the-map)). Assets created while resolving a ticket are linked from the issue, not pasted in.

## Ticket Types

Every ticket is either **HITL** — human in the loop, worked *with* a human who speaks for themselves — or **AFK**, driven by the agent alone. A HITL ticket only resolves through that live exchange; the agent never stands in for the human's side of it.

- **Research** (AFK): reading documentation, third-party APIs, or local resources. Creates a markdown summary as a linked asset — use `research`. Reach for it when knowledge outside the current working directory is required.
- **Prototype** (HITL): raise the fidelity of the discussion with a cheap, rough, concrete artifact to react to — an outline, a stub, or UI/logic code via `prototype`. Links the prototype as an asset. Use when "how should it look" or "how should it behave" is the key question.
- **Grilling** (HITL): conversation via `grilling` and `domain-modeling`, one question at a time. The default case.
- **Task** (HITL or AFK): manual work that must happen before a *decision* can be made — signing up for a service so its API can be judged, provisioning access, moving data so its shape can be seen. The one type that *does* rather than decides, and it earns its place by unblocking a decision. The agent drives it alone where it can; otherwise it hands the human a precise checklist. Resolved when the work is done; the answer records what was done and any resulting facts later tickets depend on.

## Fog of war

The map is _deliberately_ incomplete: don't chart what you can't yet see. Beyond the live tickets lies the **fog of war** — the dim view of decisions and investigations you can tell are coming but can't yet pin down, because they hang on questions still open. Resolving a ticket clears the fog ahead of it, graduating whatever's now specifiable into fresh tickets — one at a time, until the way to the destination is clear and no tickets remain.

The map's **Not yet specified** section is where that dim view is written down. Everything here is in scope, just not sharp enough to ticket.

**Fog or ticket?** The test is whether you can state the question precisely now — _not_ whether you can answer it now.

- **Ticket when** the question is already sharp — even if it's blocked and you can't act on it yet.
- **Not yet specified when** you can't yet phrase it that sharply. Don't pre-slice the fog into ticket-sized pieces.

## Out of scope

The destination fixes the scope, so work beyond it is **out of scope** — it isn't fog, and it doesn't belong in **Not yet specified**. It gets its own **Out of scope** section: work you've consciously ruled out of _this_ effort. Out-of-scope work never graduates; it returns only if the destination is redrawn, as a fresh effort. When a ticket turns out to sit past the destination, **close it** and leave one line in the **Out of scope** section — the gist plus why it's out of scope, linking the closed ticket. It stays out of **Decisions so far**, which records the route actually walked.

## Invocation

Two modes. Either way, **never resolve more than one ticket per session.**

### Chart the map

User invokes with a loose idea.

1. **Name the destination.** Run a `grilling` and `domain-modeling` session to pin down what this map is finding its way to — the spec, decision, or change. The destination fixes the scope, so it's settled first.
2. **Map the frontier.** Grill again, **breadth-first** this time: fan out across the whole space rather than deep on any one thread, surfacing the open decisions and the first steps takeable now. **If this surfaces no fog** — the way is already clear, the whole journey small enough for one session — you don't need a map. Stop and ask the user how they'd like to proceed.
3. **Create the map** (label `wayfinder:map`): Destination and Notes filled in, Decisions-so-far empty, the fog sketched into **Not yet specified**.
4. **Create the tickets you can specify now** as sub-issues of the map — then wire blocking edges in a **second pass** (issues need numbers before they can reference each other). Everything you can't yet specify stays in the fog.
5. Stop — charting the map is one session's work; do not also resolve tickets.

### Work through the map

User invokes with a map (URL or number). A ticket is **optional** — without one, you pick the next decision, not the user.

1. Load the **map** — the low-res view, not every ticket body.
2. Choose the ticket. If the user named one, use it. Otherwise take the first frontier ticket in order. **Claim it**: assign it to yourself before any work.
3. Resolve it — **zoom as needed**: fetch the full body of any related or closed ticket on demand; invoke the skills the `## Notes` block names. If in doubt, use `grilling` and `domain-modeling`.
4. Record the resolution: post the answer as a **resolution comment**, **close** the issue, and **append a context pointer** to the map's Decisions-so-far.
5. Add newly-surfaced tickets (create-then-wire); graduate any fog the answer has made specifiable, clearing each graduated patch from **Not yet specified**. If the answer reveals a ticket sits beyond the destination, **rule it out of scope**. If the decision invalidates other parts of the map, update or delete those tickets.

The user may run unblocked tickets in parallel, so expect other sessions to be editing the tracker concurrently.
