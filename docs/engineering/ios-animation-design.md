# iOS Animation Design

Quickstart:

```bash
npx skills add edheltzel/skills --skill=ios-animation-design
```

```bash
npx skills update ios-animation-design
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/ios-animation-design)

## What it does

`ios-animation-design` plans iOS motion before any code is written. It gathers
the context that decides an animation — what triggers it, its purpose, where it
lives, how often it runs, the deployment floor, and the input methods — then
proposes two to three meaningfully different approaches and compiles the chosen
one into an implementation-ready spec. The spec is the contract handed to
implementation: trigger, interruption behavior, a Reduce Motion fallback,
haptics, and a recommended Apple API are all decided up front.

Its governing principle is Apple's own: don't add motion for the sake of motion.
Every animation must guide attention, communicate a state change, reinforce a
spatial relationship, or provide feedback — and if the system already animates
the interaction, custom motion should fill the gap rather than duplicate it.

## When to reach for it

Type `/ios-animation-design`, or reach for it whenever you are deciding how an
iOS interaction should move before committing to code — screen transitions,
navigation animations, interactive gestures, onboarding flows, loading states,
or choosing between competing animation approaches.

It is deliberately upstream of the code. When the spec is ready, hand it to
[ios-animation-implementation](./ios-animation-implementation.md) to write the
Swift.

## Sequenced gates and the spec

The design process advances through three gates, each with an explicit pass
condition checked against the working artifact: context captured (including
whether system-provided motion already covers the case), options that differ in
at least two dimensions rather than minor timing tweaks, and a spec that is
concretely implementation-ready.

The compiled spec covers motion properties, timing and stagger, gesture binding
where the animation is interactive, and an accessibility block that names the
Reduce Motion behavior, VoiceOver announcement, haptic pairing, and Dynamic Type
impact. Bundled references supply timing and easing guidelines and a pattern
library spanning navigation, micro-interactions, content transitions,
gesture-driven motion, and ambient loading.

## Where it fits

The planning half of the iOS animation pair. It sits under
[ios-development](./ios-development.md) and feeds
[ios-animation-implementation](./ios-animation-implementation.md), which turns
the spec into Swift. Route end-of-session Swift polish to
[cleanup-swift](./cleanup-swift.md).
