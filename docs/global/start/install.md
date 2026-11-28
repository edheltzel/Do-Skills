# Install

## What you are installing

A **skill** is an instructions file, called `SKILL.md`, that your coding agent reads. It tells the agent how to do one job well, such as planning a change or writing a commit.

An **agent harness** is the app that runs the agent. Claude Code, Codex, Pi, Cursor, and Empryo are harnesses. You must already have one installed. Skills do nothing on their own. See the [glossary](./glossary.md) for other terms.

## Prerequisites

- An agent harness, installed and signed in.
- Node.js 22 or newer. The installer runs through `npx`, which ships with Node.js.

Check your version:

```bash
node -v
```

## Start small

Install one skill:

```bash
npx skills add edheltzel/Do-Skills --skill=do-it
```

Then open your agent in a project and type:

```
/do-it
```

`do-it` runs the whole idea-to-PR loop. Read [LFG](../loop/it.md) to see what it does and when it stops.

## Global or project

Skills come in two scopes.

- **Global** skills help in any repo. Install them once per machine with `-g`.
- **Project** skills fit one stack, such as frontend or TypeScript. Install them from inside the project that needs them.

Each scope is split into groups, which are folders of related skills. The global groups are core, loop, workflow, operations, content, and personal. The project groups are typescript, frontend, design, backend, tooling, swift, marketing, and personal.

Every global skill, once per machine:

```bash
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g
```

One stack, from inside a project. For a frontend project, add the shared TypeScript group too:

```bash
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/typescript
npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/frontend
```

To install one skill by name, use its exact listed name:

```bash
npx skills add edheltzel/Do-Skills --skill=do-commit
```

## Choose your agent

Use `-a` to pick which agents get the skill. Repeat it for more than one:

```bash
npx skills add edheltzel/Do-Skills --skill=do-it -a claude-code
npx skills add edheltzel/Do-Skills --skill=do-it -a claude-code -a pi
```

Without `-a`, the installer uses your last selection, or the agents it detects.

## Check it worked

List what is installed:

```bash
npx skills list
```

Then type `/do-it` in your agent. If the agent knows the command, the skill is installed.

## Update

```bash
npx skills update do-it
```

Replace `do-it` with any installed skill name.

## Remove

Run `npx skills --help` and look for the `remove` command. At the time of writing it shows `remove [skills]`, but check your version before you rely on it.

## Read before you install

A skill is a set of instructions your agent follows, and some can run commands. Open the skill's `SKILL.md` on GitHub first and read what it asks the agent to do. Install only what you understand.

Next: [Glossary](./glossary.md), or the [repo README](../../../README.md).
