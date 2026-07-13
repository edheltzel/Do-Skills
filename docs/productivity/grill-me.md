# Grill Me

Quickstart:

```bash
npx skills add edheltzel/skills --skill=grill-me
```

```bash
npx skills update grill-me
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/productivity/grill-me)

## What it does

`grill-me` is a one-line alias: type it and it runs a [grilling](./grilling.md) session unchanged. It exists so you have a hand-invoked trigger word for the interview when you don't want to rely on the agent firing `grilling` on its own.

## When to reach for it

You invoke this by typing `/grill-me` — the agent won't reach for it. Reach for it when you want to *deliberately* start a grilling session by name. The behaviour is identical to [grilling](./grilling.md); the only difference is that this one is the word in your hands.

## Where it fits

A thin hand-invoked front door to [grilling](./grilling.md) — no behaviour of its own. Imported and adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).
