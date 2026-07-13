# shadcn/ui Component Patterns

Implementation patterns for building components in the shadcn/ui model: own the
component source, compose Radix primitives for behavior, and style with Tailwind
plus CVA. This reference covers component anatomy, CVA variants, the modern CSS
selectors those components rely on, and decision tables for choosing an approach.

Every example depends on the `cn()` class-merge helper:

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Component Anatomy

### Prop Typing with `React.ComponentProps<>`

Type props off the element or primitive being rendered rather than hand-listing
attributes. This keeps the component's surface in sync with the underlying element.

```tsx
// HTML elements
function Component({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("base-classes", className)} {...props} />
}

// Radix primitives
function Component({ className, ...props }: React.ComponentProps<typeof RadixPrimitive.Root>) {
  return <RadixPrimitive.Root className={cn("base-classes", className)} {...props} />
}

// With CVA variants (see below)
function Component({
  variant, size, className, ...props
}: React.ComponentProps<"button"> & VariantProps<typeof variants>) {
  return <button className={cn(variants({ variant, size }), className)} {...props} />
}
```

### `asChild` with Radix `Slot`

`asChild` enables polymorphic rendering: the component forwards its props and
styling onto whatever child it's given instead of rendering its own element.

```tsx
import { Slot } from "@radix-ui/react-slot"

function Button({
  asChild = false,
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

```tsx
<Button>Click me</Button>                                // Renders <button>
<Button asChild><a href="/home">Home</a></Button>        // Renders <a> with button styling
<Button asChild><Link href="/dash">Dash</Link></Button>  // Works with a router's Link
```

### `data-slot` Targeting

Every component carries a `data-slot` attribute so styles can target parts by
role — from parent components, from CSS, or from Tailwind arbitrary selectors —
without reaching for a class name that a consumer might override.

```tsx
function Card({ ...props }) { return <div data-slot="card" {...props} /> }
function CardHeader({ ...props }) { return <div data-slot="card-header" {...props} /> }
```

```css
[data-slot="button"] { /* styles */ }
[data-slot="card"] [data-slot="button"] { /* nested targeting */ }
```

```tsx
<div className="[&_[data-slot=button]]:shadow-lg">
  <Button>Automatically styled</Button>
</div>
```

## CVA Variants

Use `class-variance-authority` to model a component's visual variants as typed
dimensions rather than ad-hoc conditional class strings.

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("base-classes-applied-to-all-variants", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-white",
      outline: "border bg-background",
      ghost: "hover:bg-accent",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3",
      lg: "h-10 px-6",
      icon: "size-9",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

### Compound Variants

A compound variant applies extra classes only when a specific combination of
variant values is active — the case a single-dimension lookup can't express.

```tsx
const buttonVariants = cva("base-classes", {
  variants: { /* variant, size as above */ },
  compoundVariants: [
    { variant: "outline", size: "lg", class: "border-2" },
  ],
  defaultVariants: { variant: "default", size: "default" },
})
```

### Type Extraction

Derive the prop types from the variant config so the component and its styles
never drift:

```tsx
type ButtonVariants = VariantProps<typeof buttonVariants>
// Result: { variant?: "default" | "outline" | ..., size?: "sm" | "lg" | ... }
```

## Modern CSS Selectors in Tailwind

shadcn components lean on native CSS relational and state selectors, expressed
through Tailwind variants, so layout and styling react to structure and state
without JavaScript.

### `has()`

```tsx
<button className="px-4 has-[>svg]:px-3" />              // Tighten padding when it contains an icon
```

### `group` / `peer`

Style descendants (`group`) or siblings (`peer`) based on an ancestor's or
sibling's data attributes:

```tsx
<div className="group" data-state="collapsed">
  <div className="group-data-[state=collapsed]:hidden">Hidden when collapsed</div>
</div>

<button className="peer/menu" data-active="true">Menu</button>
<div className="peer-data-[active=true]/menu:text-accent">Styled when sibling active</div>
```

### Container Queries

```tsx
<div className="@container/card">
  <div className="@md:flex-row">Responds to container width, not viewport</div>
</div>
```

### `data-slot` + `has-data-[]` Conditional Layout

Combine `data-slot` targeting with `has()` so a container restructures itself
when an optional child is present — no boolean prop, no JavaScript branch. The
header below switches to a two-column grid only when it actually contains a
`card-action` slot:

```tsx
<div
  data-slot="card-header"
  className={cn(
    "grid gap-2",
    "has-data-[slot=card-action]:grid-cols-[1fr_auto]"
  )}
/>
```

## Decision Tables

### When to Use CVA

| Scenario | Use CVA | Alternative |
|----------|---------|-------------|
| Multiple visual variants (primary, outline, ghost) | Yes | Plain className |
| Size variations (sm, md, lg) | Yes | Plain className |
| Compound conditions (outline + large = thick border) | Yes | Conditional cn() |
| One-off custom styling | No | className prop |
| Dynamic colors from props | No | Inline styles or CSS variables |

### When to Use Compound Variants

| Scenario | Use Compound Variant | Alternative |
|----------|----------------------|-------------|
| Styling depends on two variant values together | Yes | Duplicated classes per variant |
| A combination needs to override its parts | Yes | Manual cn() branching |
| Each dimension styles independently | No | Plain `variants` entries |

### When to Use asChild

| Scenario | Use asChild | Alternative |
|----------|-------------|-------------|
| Component should work as link or button | Yes | Duplicate component |
| Need button styles on a custom element | Yes | Export variant styles |
| Integration with routing libraries | Yes | Wrapper components |
| Always renders the same element | No | Standard component |

### When to Use Context

| Scenario | Use Context | Alternative |
|----------|-------------|-------------|
| Deep prop drilling (>3 levels) | Yes | Props |
| State shared by many siblings | Yes | Lift state up |
| Plugin/extension architecture | Yes | Props |
| Simple parent-child communication | No | Props |
