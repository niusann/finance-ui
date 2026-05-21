# Design Tokens

All visual decisions in finance-ui are expressed as CSS custom properties defined in `styles.css`, with JS mirrors in `tokens.ts`. Override CSS variables to rebrand; import JS constants when you need a value in code (chart strokes, SVG fills, etc.).

```css
import "@blob/finance-ui/styles.css";   /* CSS tokens — once at app root */
```

```ts
import { colors, dataPalette, signColor, formatCurrency } from "@blob/finance-ui";
```

---

## Color

### Surfaces

Background fills for pages and cards.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#FFFFFF` | Page/app background |
| `--bg-card` | `#FFFFFF` | Card surface |
| `--bg-soft` | `#F3F4F6` | Muted fills, secondary buttons |
| `--bg-subtle` | `#FAFAFA` | Hover states, zebra rows |

### Data palette

The primary brand ramp — used for positive values, charts, and the `data` button variant. **Replace all seven steps to rebrand.**

| Token | Value | Swatch | Usage |
|-------|-------|--------|-------|
| `--data-900` | `#1B5E20` | ██ | Darkest — high-contrast text on light bg |
| `--data-700` | `#2E7D32` | ██ | Primary interactive color (`data` button) |
| `--data-500` | `#4CAF50` | ██ | Default positive value color |
| `--data-400` | `#66BB6A` | ██ | Hover / active states |
| `--data-300` | `#81C784` | ██ | Sparkline strokes |
| `--data-200` | `#A5D6A7` | ██ | Subtle fills, gradient stops |
| `--data-100` | `#C8E6C9` | ██ | Lightest — backgrounds, badge fills |

```css
/* Rebrand example */
:root {
  --data-900: #0A4B78;
  --data-700: #1565C0;
  --data-500: #1E88E5;
  --data-400: #42A5F5;
  --data-300: #64B5F6;
  --data-200: #90CAF9;
  --data-100: #BBDEFB;
}
```

### Accent

Used for focus rings, links, and informational highlights.

| Token | Value | Usage |
|-------|-------|-------|
| `--accent-500` | `#2196F3` | Focus outlines, active indicators |
| `--accent-300` | `#64B5F6` | Hover tints |
| `--accent-200` | `#90CAF9` | Subtle accent fills |
| `--accent-100` | `#BBDEFB` | Lightest accent backgrounds |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#0A0A0A` | Body copy, headings, amounts |
| `--text-secondary` | `#6B7280` | Labels, meta, **negative values** |
| `--text-muted` | `#9CA3AF` | Placeholders, disabled states, flat/zero values |
| `--text-positive` | `#2E7D32` | Positive amounts and percentages |

> **Rule — no red, ever.** Negative values use `--text-secondary` (gray), not red. This is a core design constraint.

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border-subtle` | `#E5E7EB` | Dividers, card outlines |
| `--border-soft` | `#F3F4F6` | Near-invisible separators on white |

### Buttons

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-dark` | `#0A0A0A` | Primary button background |
| `--btn-dark-hover` | `#1A1A1A` | Primary button hover |
| `--btn-light` | `#F3F4F6` | Secondary button background |
| `--btn-light-hover` | `#E5E7EB` | Secondary button hover |

---

## Shadows

Cards always float — never place a card on a colored background.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)` | Default card elevation |
| `--shadow-pop` | `0 6px 24px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)` | Dropdowns, tooltips, popovers |
| `--shadow-overlay` | `0 20px 50px rgba(0,0,0,0.18)` | Modals, bottom sheets |

---

## Spacing

A 4px base grid. Use the step that maps to the visual density you need.

| Token | Value |
|-------|-------|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |

---

## Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Small elements (chips, tags) |
| `--radius-md` | `8px` | Inputs, buttons (non-pill) |
| `--radius-lg` | `12px` | Larger interactive elements |
| `--radius-card` | `16px` | Cards |
| `--radius-xl` | `20px` | Feature cards, hero sections |
| `--radius-pill` | `9999px` | Pill buttons, badges |

---

## Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-fast` | `150ms` | Micro-interactions (hover, focus) |
| `--motion-normal` | `300ms` | Panel transitions, toggles |
| `--motion-slow` | `500ms` | Page-level transitions |
| `--motion-chart` | `800ms` | Chart draw-on animations |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default easing for all transitions |

---

## Typography

No token variables — the font stack is set once on `body`.

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

> Amounts and numbers should always be right-aligned.

---

## JS utilities (`tokens.ts`)

| Export | Type | Description |
|--------|------|-------------|
| `colors` | `object` | All color tokens as nested constants |
| `dataPalette` | `string[]` | Data ramp as an ordered array (900 → 200) — for charts needing shades by index |
| `accentPalette` | `string[]` | Accent ramp as an ordered array |
| `radius` | `object` | Border radius values in `px` (as numbers) |
| `space` | `object` | Spacing scale in `px` (as numbers) |
| `motion` | `object` | Duration values in `ms` and easing strings |
| `signColor(delta)` | `function` | Returns the correct color for a signed number — positive → `data-500`, negative → `text-secondary`, zero → `text-muted` |
| `formatCurrency(value, opts?)` | `function` | Formats a number as USD (configurable via `Intl.NumberFormatOptions`) |
| `formatPercent(value, digits?)` | `function` | Formats a number as a percent string with directional arrow (↗ / ↘ / —) |
