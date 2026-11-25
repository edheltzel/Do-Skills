# Uber: SEO Foundations

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-seo-foundations
```

```bash
npx skills update uber-seo-foundations
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-seo-foundations)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-seo-foundations` is the shared SEO rulebook and the map from a user's goal to the right Ubersuggest tool or sibling skill. It works as a consultant: pull the numbers, say what they mean, and name the next step.

Every SEO figure comes from a Ubersuggest tool call. A made-up volume, difficulty, CPC, domain authority, backlink count, or rank is worse than none. If the call fails or returns nothing, say so plainly.

## When to reach for it

Type `/uber-seo-foundations`, or the agent reaches for it automatically when a task fits.

Reach for it on any SEO question (keywords, search volume, rankings, organic traffic, competitors, backlinks, domain authority, site health, Core Web Vitals, content strategy, or brand visibility in AI answers), and before any other uber skill, so auth, locations, quotas, and credit costs load first. For one named job, use the skill in the goal map instead of improvising a tool sequence.

## Prerequisites

The Ubersuggest MCP server must be connected, with the user signed in to their Ubersuggest account over OAuth. Call `auth_status` before account data. If the user is logged out or the tools are missing, stop and ask for that connection. Do not substitute a web search, another SEO provider, or what you already know about the domain.

`pagespeed_audit` and [uber-content-demand-finder](./uber-content-demand-finder.md) still run with no account. They cover speed and planning, not volumes or rankings.

## No numbers without the connection

Name tools bare (`keyword_overview`, `site_audit`) and match whichever `ubersuggest` server is connected. Resolve every `locId` with `location_suggest`; never guess a place id. Ask before spending: `generate_article` costs 100 monthly credits, and a new report subject uses one daily report (a same-day repeat is free). Async tools may return pending: wait, poll again, and stop around 10 tries.

Ask once, early, whether the user wants SEO terms or plain language, then keep that register. A beginner gets the term and its meaning the first time, plus which row to act on. An expert gets metrics and the recommendation.

## Goal to tool map

A vague "what do I do" goes to [uber-seo-action-plan](./uber-seo-action-plan.md). First-time setup or rank tracking goes to [uber-project-setup](./uber-project-setup.md). Keywords go to [uber-keyword-research](./uber-keyword-research.md), competitor gaps to [uber-competitor-analysis](./uber-competitor-analysis.md), and technical or speed problems to [uber-site-audit](./uber-site-audit.md). No topic yet goes to [uber-content-demand-finder](./uber-content-demand-finder.md); a brief for one keyword goes to [uber-content-brief](./uber-content-brief.md). Brand mentions in ChatGPT and other AI answers go to [uber-ai-visibility](./uber-ai-visibility.md).

## Where it fits

This is the base the other Marketing `uber-` skills load before they run. Each of those does one job; this skill holds the rules they share and routes the user to the right one. It is the entry for a general SEO question, not a stand-in for the skill that does the job.
