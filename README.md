# finance-ui

A minimal, data-forward React component library for finance products.
Generated from the **chatgpt-finance-ui** design system.

## Install

```bash
npm install @blob/finance-ui
```

```tsx
import "@blob/finance-ui/styles.css";  // once at app root
import { Button, Card, DonutChart } from "@blob/finance-ui";
```

## Run the demo

```bash
cd finance-ui
npm install
npm run dev
```

Then open http://localhost:5173

## Components

### Primitives

Core building blocks used across every surface — buttons, containers, and status indicators.

| Component | Description |
|-----------|-------------|
| `Button` | Clickable button with `primary`, `secondary`, `tertiary`, `data`, and `destructive` variants; three sizes |
| `IconButton` | Icon-only button — requires `aria-label` for accessibility |
| `Card` | Surface container with `default`, `compact`, and `flush` variants |
| `CardHeader` | Card header row with title, meta, amount, and right-aligned slot |
| `Divider` | Horizontal rule for visual separation |
| `Avatar` | Circular button showing user initials with optional background color |
| `Spinner` | Animated loading indicator |
| `Chip` | Removable tag with optional close button |

### Inputs

Form controls and interactive selectors designed for financial data entry.

| Component | Description |
|-----------|-------------|
| `Field` | Form field wrapper providing label, help text, and error state |
| `TextInput` | Standard single-line text input |
| `CurrencyInput` | Numeric input with prefix/suffix currency symbols and decimal mode |
| `SearchBar` | Search input with icon, optional keyboard shortcut hint, and label |
| `DateRange` | Button trigger for a date range picker |
| `TimeRange` | Tab strip with animated pill for time period selection (1D / 1W / 1M …) |
| `TabToggle` | Toggle selector with smooth sliding background indicator |
| `RangeSlider` | Display-only dual-handle range slider with optional value labels |

### Data display

Read-only components for surfacing metrics, status, and tabular data.

| Component | Description |
|-----------|-------------|
| `TrendBadge` | Compact badge showing signed delta (↑ / ↓ / flat) with formatted value |
| `PLBadge` | Large pill showing profit/loss amount and percentage change |
| `StatusPill` | Inline status indicator with animated dot and text label |
| `KPI` | Key performance indicator — label, value, and optional trend percentage |
| `KPIMini` | Compact KPI variant with an embedded sparkline |
| `Progress` | Horizontal progress bar with customizable fill color |
| `RiskIndicator` | 5-dot risk level indicator (1–5 scale) with matching label |
| `DataTable` | Generic typed table with columns, rows, and optional footer |

### Lists

Row and card components for accounts, holdings, news, and watchlists.

| Component | Description |
|-----------|-------------|
| `ListItem` | Generic row with icon, name, metadata, and optional amount |
| `AccountCard` | Account summary card with logo, name, metadata, and balance |
| `SyncCard` | Card showing sync status of multiple data sources with spinner support |
| `SpendRow` | Spending category row with color dot, label, and amount |
| `NewsItem` | Article preview with source logo, headline, metadata, and optional thumbnail |
| `WatchlistRow` | Stock row with symbol, name, sparkline, price, and trend |
| `HoldingRow` | Investment holding row with symbol, shares, cost, value, and P/L |
| `HoldingTableHeader` | Fixed column-label header row for a holdings table |

### Charts

Twelve chart types covering everything from quick trend lines to OHLC candles.

| Component | Description |
|-----------|-------------|
| `Sparkline` | Compact line showing trend direction (up / down / flat / auto) |
| `DonutChart` | Animated donut/pie chart with optional legend and hover effects |
| `AreaChart` | Gradient area chart with crosshair tooltip and Y-axis formatting |
| `CandlestickChart` | OHLC candle chart with volume bars and tooltips |
| `BarChart` | Vertical bar chart with signed values and hover state |
| `WaterfallChart` | Waterfall breakdown showing running totals across steps |
| `ComparisonChart` | Multi-line chart comparing series on a shared Y-axis |
| `StackedBar` | Horizontal stacked bar showing proportional segments |
| `Treemap` | CSS grid-based treemap visualization with custom area placement |
| `SectorHeatmap` | Grid heatmap for sector changes with intensity coloring |
| `CalendarHeatmap` | Calendar-style grid heatmap with 0–5 intensity levels |
| `Gauge` | Half-circle gauge showing percentage progress |

### Feature cards

Opinionated composite cards for high-level financial workflows.

| Component | Description |
|-----------|-------------|
| `GoalCard` | Progress card tracking a savings or investment goal |
| `InsightCard` | Aside card with eyebrow, insight body, and action buttons |
| `BudgetMeter` | Budget tracker showing spent vs. budget with color-coded progress |
| `StockHero` | Large ticker header with price, change, and buy/sell actions |
| `OrderCard` | Buy/sell toggle sidebar with order detail rows |
| `OrderRow` | Single line item inside an order card (price, quantity, total, etc.) |
| `DividendCard` | Card displaying yield, ex-date, pay-date, and frequency |
| `TickerMarquee` | Auto-scrolling ticker strip with symbols, prices, and trend arrows |

### Chat

Chat UI primitives for embedding a conversational AI interface.

| Component | Description |
|-----------|-------------|
| `UserBubble` | Message bubble for outgoing user messages |
| `AIResponse` | Message bubble for incoming AI responses |
| `AIActions` | Toolbar for AI messages (copy, speak, like, regenerate, share) |
| `Composer` | Chat input form with attachment button, text field, and send button |

### Feedback

Loading, empty, and notification states.

| Component | Description |
|-----------|-------------|
| `EmptyState` | Full-page empty state with icon, title, body, and action button |
| `Skeleton` | Loading placeholder — `line`, `line-lg`, or `circle` variant |
| `Toast` | Notification toast with `success` / `warning` type and close button |
| `Stepper` | Step indicator showing progress through a numbered sequence |

### Overlays

Modal dialogs and sheets that float above page content.

| Component | Description |
|-----------|-------------|
| `Modal` | Centered dialog with scrim, header, body, footer, and close button |
| `BottomSheet` | Mobile-style sheet that slides up from the bottom |

### Navigation

Top bar, sidebar, and tab bar layouts for app-level navigation.

| Component | Description |
|-----------|-------------|
| `AppBar` | Top navigation bar with brand slot, horizontal menu, and end slot |
| `SideNav` | Vertical sidebar with icon and label per nav item |
| `TabBar` | Mobile bottom tab bar with icons and labels |

## Design tokens

All visual decisions are CSS custom properties. To rebrand, override `--data-*`:

```css
:root {
  --data-900: #0A4B78;   /* your darkest brand color */
  --data-700: #1565C0;
  --data-500: #1E88E5;
  --data-400: #42A5F5;
  --data-200: #90CAF9;
  --data-100: #BBDEFB;
}
```

Or import the JS constants:

```ts
import { colors, dataPalette, formatCurrency, signColor } from "@blob/finance-ui";
```

## Conventions

- **No red, ever.** Negative values use `--text-secondary` (gray).
- **Cards float** in white with `--shadow-card`. Never put a card on a colored bg.
- **Right-align all amounts.**
- **One CSS import** sets everything up — no provider, no theme prop.
- **Components are tree-shakeable** — import only what you use.

## License

MIT
