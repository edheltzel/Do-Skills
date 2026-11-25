# Uber: Project Setup

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-project-setup
```

```bash
npx skills update uber-project-setup
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-project-setup)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-project-setup` sets a website up in Ubersuggest for the first time: the project, a business summary, competitors, the topics and prompts tracked in AI answers, and the keywords to rank-track. A project is what later rankings, competitors, and AI visibility hang on. Without one, every other skill can only look at public data.

Nothing is saved until the user reviews that set. `onboard_project` stops at `stage: "review"` with no project yet, and the agent must not send `confirm: true` on its own.

## When to reach for it

Type `/uber-project-setup`, or the agent reaches for it automatically when there is no project yet, someone just signed up, or they want to track a site, add a domain, set up rank tracking, or start monitoring a brand in ChatGPT and other AI assistants.

Reach for this only for a domain that has no project. If one already exists, stop and change it in place. For what to fix next on a site that is already set up, use [uber-seo-action-plan](./uber-seo-action-plan.md).

## Prerequisites

The Ubersuggest MCP server must be connected and the user logged in. Setup writes to the account, and there is no version of this flow that works without it. Read `user_limits` before promising a project, keywords, competitors, locations, or prompts. Resolve the market with `location_suggest`. Never guess a `loc_id`. Default is English / United States (2840) only if the user does not care.

## The review stage

`onboard_project` returns early with `done: false` and a stage. Call it again and pass back every field it returned (`business_summary`, `competitors`, `topics`, `keywords`) so it does not redo the work. Say what it is doing while it runs. If it cannot read the site, do not invent a summary. Ask what the business does, who it sells to, and what it offers, then pass `business_summary`.

At review, show plain language, not raw JSON: the business summary (prompts and articles are grounded on it), each competitor (suggestions are guesses), each topic with its prompts, and how many keywords are selected against the plan. The prompts are the measurement: visibility is how often the brand shows up in the answers to exactly these questions. Read out `notes` so anything trimmed to the plan is not a surprise. Edits go back with `confirm: true` and the corrected lists. What you pass wins. Saving the brand spends one monthly AI-visibility operation, and prompts change only by replacing the whole list, so fixing them now is free and fixing them later is not.

## After it is done

Rank tracking and the first AI visibility report take about a day to populate. Empty numbers immediately are not a failure. A site audit works right away. Offer one next step, not a menu: usually [uber-site-audit](./uber-site-audit.md), or [uber-seo-action-plan](./uber-seo-action-plan.md) if they do not know what to do with any of it.

## Where it fits

This is the run-once setup the other Ubersuggest skills read from. The prompts saved here are what [uber-ai-visibility](./uber-ai-visibility.md) later reports. It does not replace keyword research, competitor gaps, or a content brief. Those start after a project exists.
