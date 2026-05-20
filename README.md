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

### Primitives (`primitives.tsx`)
- `Button` · `IconButton` · `Card` · `CardHeader` · `Divider` · `Avatar` · `Spinner` · `Chip`

### Inputs (`inputs.tsx`)
- `Field` · `TextInput` · `CurrencyInput` · `SearchBar` · `FilterChip` · `DateRange` · `TimeRange` · `TabToggle` · `RangeSlider`

### Data display (`data.tsx`)
- `TrendBadge` · `PLBadge` · `StatusPill` · `KPI` · `KPIMini` · `Progress` · `RiskIndicator` · `DataTable`

### Lists (`lists.tsx`)
- `ListItem` · `AccountCard` · `SyncCard` · `SpendRow` · `NewsItem` · `WatchlistRow` · `HoldingRow` · `HoldingTableHeader`

### Charts (`charts.tsx`)
- `Sparkline` · `DonutChart` · `AreaChart` · `CandlestickChart` · `BarChart` · `WaterfallChart` · `ComparisonChart` · `StackedBar` · `Treemap` · `SectorHeatmap` · `CalendarHeatmap` · `Gauge`

### Feature cards (`feature.tsx`)
- `GoalCard` · `InsightCard` · `BudgetMeter` · `StockHero` · `OrderCard` · `OrderRow` · `DividendCard` · `TickerMarquee`

### Chat (`chat.tsx`)
- `UserBubble` · `AIResponse` · `AIActions` · `Composer`

### Feedback (`feedback.tsx`)
- `EmptyState` · `Skeleton` · `Toast` · `Stepper`

### Overlays (`overlays.tsx`)
- `Modal` · `BottomSheet`

### Navigation (`navigation.tsx`)
- `AppBar` · `SideNav` · `TabBar`

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
