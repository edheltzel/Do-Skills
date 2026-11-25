# Uber: Site Audit

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-site-audit
```

```bash
npx skills update uber-site-audit
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-site-audit)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-site-audit` crawls a domain for technical SEO problems and reports prioritised fixes with Core Web Vitals. Findings are ranked by what blocks indexing first, then broken pages and links, then issues that hit many URLs, then Core Web Vitals, then hygiene.

It does not dump every issue, invent issue ids, or replace the crawl by fetching pages itself. One missing H1 is noise. Hundreds of missing H1s are a template bug.

## When to reach for it

Type `/uber-site-audit`, or the agent reaches for it automatically when a task fits a site audit, a technical SEO check, a health score, broken links, missing titles or H1s, duplicate content, Core Web Vitals, or a slow site.

Reach for it when the question is what is broken on the site. For what to do about SEO with no specific technical question, use [uber-seo-action-plan](./uber-seo-action-plan.md). For competitors, keyword gaps, or a domain overview, use [uber-competitor-analysis](./uber-competitor-analysis.md).

## Prerequisites

The Ubersuggest MCP server must be connected. The crawl also needs a logged-in Ubersuggest account. If the user is not logged in, the skill does not start the crawl. It can still run a PageSpeed check for Core Web Vitals, which does not need that login.

## Crawl, then the fix list

Pass the root domain, or one page path reused on every later call. Start the crawl, then poll status with the same domain, path, and page cap. The report is ready only when the crawl is done and the status is `no_errors`. Any other status means the crawl failed. Drill the top few issue ids returned in the category breakdown, not labels you make up, and add Core Web Vitals for mobile when speed matters.

The write-up is the health score and totals, a short table of issue, severity, pages affected, why it matters, and the fix, then Core Web Vitals per device and a fix order. Quick wins and one template change that clears hundreds of URLs come first. Indexing blocks (noindex, robots.txt, broken canonicals, 5xx) outrank titles, speed, and alt text.

## Where it fits

`uber-site-audit` is the technical health check you run when the question is errors, speed, or a health score. [uber-project-setup](./uber-project-setup.md) is how a site gets into Ubersuggest the first time. [uber-seo-action-plan](./uber-seo-action-plan.md) picks a plain-language next step when the owner does not know where to start.
