# Uber: Content Demand Finder

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=uber-content-demand-finder
```

```bash
npx skills update uber-content-demand-finder
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/project/marketing/uber-content-demand-finder)

Copied from [ubersuggest/seo-skills](https://github.com/ubersuggest/seo-skills) (Apache-2.0).

## What it does

`uber-content-demand-finder` turns a business description into 50 customer-driven content opportunities: a Content Demand Map of problem clusters, the questions customers ask, and the articles or videos that answer them. It calls no data tools and states no measurements.

It does not call Ubersuggest, fetch the site, or search the web, and it never gives a search volume, keyword difficulty, competitor traffic figure, ranking probability, or traffic estimate, not as a number and not as a range. That is what makes it instant and what lets it run without an account. "Likely" or "high-intent" is fine. An invented figure makes the report worthless.

## When to reach for it

Type `/uber-content-demand-finder`, or the agent reaches for it automatically when a task fits: the user does not know what to write about, or asks for a content plan, content strategy, editorial calendar, or blog or video ideas, or wants to know what customers are searching for before committing to keywords.

Reach for this when the job is problems and questions, not metrics. For volume and difficulty on the shortlist, use [uber-keyword-research](./uber-keyword-research.md). For the outline of the opportunity that wins, use [uber-content-brief](./uber-content-brief.md).

## Content Demand Map

Take the website, what they sell, the ideal customer, the market, and up to three competitor sites. Ask for whatever is missing in one message. A website alone is enough to infer the rest; say what was inferred in one line.

Find five problem clusters in the customer's words. A cluster is a distinct problem, not a keyword variation. List 6 to 10 questions per cluster, phrased the way a person types them. Sort each cluster by purchase proximity into Educational, Comparative, or Purchase-intent, and put that legend above the tables. Turn the questions into 50 opportunities, ten per cluster, each with a title, a format, and one line on how it connects to the offer. Spread them across all five clusters and all three bands.

## Ten to validate

Rank the 50 on customer relevance, purchase proximity, and alignment with this business's expertise. Expertise breaks ties, and it is the only criterion a competitor cannot copy. Customer relevance is inferred from the description, not measured, and the shortlist says so before it lists anything.

The close offers to get the numbers here. If an Ubersuggest tool is already in the session, wait for a yes, then run [uber-keyword-research](./uber-keyword-research.md) on the ten and [uber-content-brief](./uber-content-brief.md) on the winner. If it is not connected, the close includes the connector link and does not send the user to run the reports by hand.

## Where it fits

This is the step before keywords, for a business that has no topic list yet. [uber-keyword-research](./uber-keyword-research.md) supplies the measurements this skill refuses to invent, and [uber-content-brief](./uber-content-brief.md) turns the winner into a brief. The same ban on invented figures is the "no numbers without the connection" rule in [uber-seo-foundations](./uber-seo-foundations.md).
