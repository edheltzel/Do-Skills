# iOS Animation Implementation

Quickstart:

```bash
npx skills add edheltzel/skills --skill=ios-animation-implementation
```

```bash
npx skills update ios-animation-implementation
```

[Source](https://github.com/edheltzel/skills/tree/main/skills/engineering/ios-animation-implementation)

## What it does

`ios-animation-implementation` writes iOS animation code against Apple's
first-party frameworks — SwiftUI animations, Core Animation, and UIKit — and
turns an animation spec into working Swift. It prefers native APIs over
third-party libraries, which add dependency risk and lag behind new OS releases,
and it steers each task to the right layer: SwiftUI first, UIKit when you need
interactive control, and Core Animation only for layer-level precision.

Before writing anything custom, it checks whether the system already handles the
motion — standard navigation transitions, `.symbolEffect`,
`.contentTransition(.numericText)`, or the default spring on `withAnimation`.
Custom motion is reserved for spatial relationships, coordinated choreography,
signature moments, and gesture-driven interaction the system can't provide for
free.

## When to reach for it

Type `/ios-animation-implementation`, or reach for it when you are implementing
iOS animations, building transitions, creating gesture-driven interactions, or
converting a spec into Swift — `KeyframeAnimator`, `PhaseAnimator`, custom
`Transition`, zoom navigation transitions, `matchedGeometryEffect`, symbol
effects, mesh gradients, or SwiftUI-UIKit bridging across iOS 18 through 26.

When the motion hasn't been designed yet, start with
[ios-animation-design](./ios-animation-design.md) and let it produce the spec
first.

## API selection and completion gates

A selection table maps each need to its API and the reason for it, and four
reference files carry the concrete patterns: declarative SwiftUI animations,
view transitions, gesture-driven interaction, and Core Animation/UIKit. The
skill loads only the reference the task requires.

Work is not complete until it passes four gates: the API fits the task rather
than reaching for a different layer "just because"; non-trivial custom timing
branches on `accessibilityReduceMotion`; the animation stays interruptible with
no blanket hit-testing lockout; and heavy or continuous motion is either
profiled with Instruments' Animation Hitches template or simplified first.

## Where it fits

The code half of the iOS animation pair. It consumes specs from
[ios-animation-design](./ios-animation-design.md) and sits under
[ios-development](./ios-development.md). After the animation code lands, route
end-of-session Swift polish to [cleanup-swift](./cleanup-swift.md).
