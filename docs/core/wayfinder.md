# Wayfinder

Quickstart:

```bash
npx skills add edheltzel/skills --skill=wayfinder
```

```bash
npx skills update wayfinder
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/core/wayfinder)

Imported/adapted from [Matt Pocock's skills](https://github.com/mattpocock/skills) (MIT).

## What it does

`wayfinder` plans an effort that is **too big to hold in one agent session** and
still wrapped in fog — the route from here to the destination isn't visible yet.
It charts that route as a shared **map**: a single GitHub issue labelled
`wayfinder:map`, with investigation tickets as sub-issues, resolved one per
session until nothing is left to decide. It plans rather than builds — each
ticket resolves a *decision*, and the pull to just do the work is the signal
you've reached the edge of the map and should hand off.

## When to reach for it

You invoke this by typing `/wayfinder` — the agent won't reach for it on its own.

Reach for it when a loose, large idea has arrived and "where do we even start?"
is the honest answer — a big migration, a research-heavy effort, a design space
with more open questions than a single session can close. Once the way is clear
and the work just needs splitting into build tickets, hand off to
[plan](../core/plan.md); for a single-session investigation, use
[research](../productivity/research.md) or
[grilling](../productivity/grilling.md) directly.

## Fog of war

The defining idea is **fog of war**: the map is deliberately incomplete, because
you can't chart what you can't yet see. Beyond the live tickets sits the dim view
of decisions you can tell are coming but can't yet phrase sharply — written down
in the map's *Not yet specified* section, never pre-sliced into tickets.
Resolving a ticket clears the fog ahead of it, graduating whatever's now sharp
into fresh tickets, one at a time. Tickets are typed — `research`, `prototype`,
`grilling`, `task` — and blocking uses GitHub's native issue dependencies so the
frontier renders visually. The rule that keeps concurrent sessions honest: claim
a ticket by assigning it first, and **never resolve more than one per session**.

## Where it fits

The stage *before* [plan](../core/plan.md): wayfinder finds the way when it isn't
yet visible, then plan slices the now-clear work into tickets. Its ticket types
delegate to the skills that resolve them — [research](../productivity/research.md),
[prototype](../core/prototype.md), [grilling](../productivity/grilling.md), and
[domain-modeling](../core/domain-modeling.md) — and it leans on
[pm-tools](../productivity/pm-tools.md) for the GitHub sub-issue and dependency
mechanics.
