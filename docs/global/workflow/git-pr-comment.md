# PR Comment

Quickstart:

```bash
npx skills add edheltzel/Do-Skills --skill=do-git-pr-comment
```

```bash
npx skills update do-git-pr-comment
```

[Source](https://github.com/edheltzel/Do-Skills/tree/master/skills/global/workflow/do-git-pr-comment)

## What it does

`do-git-pr-comment` drafts and posts GitHub PR comments, inline review comments, and replies. Each agent-written comment opens with a note that names the model and the person it speaks for.

It posts only when you asked to post in this run or picked Post comments. Another skill cannot give that permission for you.

## When to reach for it

Type `/do-git-pr-comment`, or the agent reaches for it when you ask to comment or reply on a PR. The other PR skills hand their drafts to it.

Not for PR descriptions or commit messages ([tech-writing](./tech-writing.md), [commit](./commit.md)), or for text you want posted word for word without the note.

## The post

- **Anchor.** An inline comment needs a line in the current head diff. Without one, it becomes a review-level comment; anchors are never invented.
- **Scan.** The whole comment is checked for secrets and private details before it posts.
- **Artifact.** Drafts and the PR URL go to `docs/plans/YYYY-MM-DD-pr-<number>-comments.md`, with each confirmed post URL.
- **Pending review.** If a review is `PENDING`, it stops and leaves it alone.
- **Resolve last.** A thread resolves only after its reply posted and its URL is confirmed.

## It's working if

- Every comment carries the model-and-person note.
- Each reported post has a confirmed URL in the artifact.
- No thread resolved before its reply posted.

## Where it fits

The one way out to GitHub for the PR skills. [git-pr-review](./git-pr-review.md), [git-pr-review-triage](./git-pr-review-triage.md), [git-pr-babysit](./git-pr-babysit.md), [git-pr-modernize](./git-pr-modernize.md), and [git-pr-takeover](./git-pr-takeover.md) all post through it.
