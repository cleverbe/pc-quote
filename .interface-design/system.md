# Design System — PC Quote

## Direction & Feel

Industrial workshop / tech bench. Precise, cool, component-focused. Like a spec sheet meets a workbench — clean separation, technical data, subtle color accents per component category.

**Emotion:** Cool, precise, capable. A tool you trust for selecting parts and quoting builds.

## Palette

- **Background:** `hsl(220 15% 98%)` — cool off-white
- **Card:** `hsl(220 15% 99%)` — barely elevated, same hue
- **Foreground:** `hsl(220 30% 8%)` — near-black with cool tint
- **Primary (steel blue):** `hsl(215 65% 45%)`
- **Accent (cyan/RGB):** `hsl(195 75% 42%)`
- **Muted text:** `hsl(220 10% 50%)`
- **Muted bg:** `hsl(220 10% 92%)`
- **Secondary bg:** `hsl(220 12% 93%)`
- **Border:** `hsla(220 20% 78% / 0.45)` — subtle semi-transparent
- **Destructive:** `hsl(0 72% 50%)`

All surfaces share the same hue (~220°), only lightness shifts. No warm tones.

## Depth Strategy

**Borders-only.** No shadows. Cards, tables, and sections separate via `border-border` + `rounded-lg`. Elevation is communicated through background tints (card vs background) and border presence, never shadows.

## Spacing

Base unit: `4px` (Tailwind's default). Key gaps:

- Micro: `gap-1` (4px) — icon clusters
- Component: `gap-2` (8px), `gap-3` (12px) — button groups, card internals
- Section: `space-y-4` (16px), `space-y-6` (24px) — between groups
- Container padding: `p-4` (16px), `p-5` (20px), `p-6` (24px)

## Border Radius

- Inputs/buttons: `rounded-md` (`--radius-md: 0.375rem`)
- Cards/sections: `rounded-lg` (`--radius-lg: 0.5rem`)
- Modals: `rounded-lg` (`--radius-xl: 0.75rem`)
- Small elements (badges, icons): `rounded-md`

## Typography

- **Font:** System UI stack (`system-ui, sans-serif`)
- **Headings:** `font-semibold` + `tracking-tight` for presence
- **Labels:** `text-sm font-medium` or `text-xs font-medium`
- **Data (prices):** `tabular-nums` for alignment — applied via `tabular-nums` class
- **Body:** `text-sm` default, `text-xs` for secondary info

## Component Patterns

### Table Cards

Tables live inside `bg-card border-border rounded-lg border` containers. Header row has `border-b` with `px-5 py-3` padding. Table has no additional outer border — the container provides it.

### Confirm-on-Delete

Delete buttons use a two-click pattern: first click shows a `destructive` variant button, second click confirms. `onBlur` resets. State tracked per-row with `confirmId`.

### Build Page Category Sections

Each category section has a colored left border (`border-l-4`). Colors cycle from a 10-color palette (sky, emerald, violet, amber, rose, cyan, lime, pink, indigo, teal). Each section also gets a matching tinted background (`*-50/50`).

### Form Controls

Compact by default: `h-8` inputs, `text-xs`. Buttons use `size="sm"` for toolbar actions. Icon-only actions use `size="icon"` with `size-3.5` icons.

### Compact Search

Search inputs use `h-8 pl-8 text-xs` with a `size-3.5` search icon.

### Pagination

Compact button group with `size-7` buttons, `ghost` variant, `text-xs`. Only shows 3 page numbers at a time (current ±1).
