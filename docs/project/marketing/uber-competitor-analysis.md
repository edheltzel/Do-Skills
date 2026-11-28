# Uber: Competitor Analysis

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-competitor-analysis
```

```bash
npx skills update uber-competitor-analysis
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-competitor-analysis)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-competitor-analysis` analyses a domain and its organic competitors, then reports the keyword and content gaps. It never presents a raw diff of two keyword lists. Gaps are ranked, near misses lead, and the verdict says whether the target is losing on content, on authority, or on technical or intent match.

## Example

```
/uber-competitor-analysis compare notion.so to coda.io and show near-miss keywords we should target
```

## When to reach for it

Type `/uber-competitor-analysis`, or the agent reaches for it automatically when a task fits: who the competitors are, why one outranks the target, which keywords or pages drive a competitor's traffic, how two domains compare, or a domain overview and traffic estimate.

Reach for this when the job is organic competitive position. For a topic keyword list with no rival domain, use [uber-keyword-research](./uber-keyword-research.md). For an outline of one keyword, use [uber-content-brief](./uber-content-brief.md). For a domain with no specific question, use [uber-seo-action-plan](./uber-seo-action-plan.md).

## Prerequisites

The Ubersuggest MCP server must be connected, with the user logged in. No numbers without that connection, as [uber-seo-foundations](./uber-seo-foundations.md) states. If tools are disconnected or auth says logged out, the skill asks for the connection and stops. It will not substitute a web search, a page fetch, prior knowledge, or another SEO provider.

## Near misses first

The target's domain overview (organic traffic, keyword count, domain authority, backlink summary) is the yardstick. If you name no rivals, the skill discovers them, then baselines the top 3. Wider than that spends daily reports for little extra insight. Discovery is async and can stay pending; the skill then continues with competitors you named.

The keyword sets split three ways. **Keyword gaps** are terms a competitor ranks in the top 10 for and the target does not rank for at all, ordered by volume and relevance. **Near misses** are terms where the target sits at positions 4 to 20 and a competitor is in the top 3. Those are the cheapest wins, so they lead the recommendations. **Strengths to defend** are where the target already wins.

Top pages show which competitor URLs carry the traffic. The content gap is formats and topics with no equivalent on the target. The authority gap is the referring-domain comparison: a count an order of magnitude higher means some keywords are not realistic yet, and the next move may be links rather than another page.

The report is a comparison table (traffic, keywords, DA, referring domains), the ranked gap list, near misses up front, content gaps, and a two or three sentence verdict with the next actions.

## Where it fits

This is the domain-against-domain organic pass in the Marketing uber- set, not a topic-wide keyword pass and not first-time project setup. A content gap it finds is input for [uber-content-brief](./uber-content-brief.md). [uber-ai-visibility](./uber-ai-visibility.md) answers who gets recommended in AI answers. If the verdict is technical rather than content or authority, the crawl is [uber-site-audit](./uber-site-audit.md).
