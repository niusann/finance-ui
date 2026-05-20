---
name: finance-ui
description: Complete component & layout guide for building minimal, data-forward finance product pages — observed patterns (cards, donut/area charts, lists, chat-style explanations, sticky composer) plus inferred components needed for a full product (navigation, KPIs, goals, forms, modals, empty states). Framework-agnostic tokens with copy-paste HTML/CSS for each component. Use for dashboards, transaction views, portfolio pages, budget trackers, money flows, financial chat surfaces, or any UI that should feel airy, monochromatic, and data-centric.
license: MIT
---

# Minimal Finance Product — Component & Layout Guide

A complete, framework-agnostic design system for building finance product pages. Split into:

- **Part A — Foundations**: design principles, tokens (color, typography, spacing, motion).
- **Part B — Observed Components**: 22 patterns directly extracted from the source reference.
- **Part C — Inferred Components**: 24 additional patterns needed to ship a real product (navigation, KPI cards, forms, modals, empty states, etc.).
- **Part D — Stock & Investment Components**: 19 specialized patterns for trading/portfolio surfaces (candlestick, sparkline, watchlist, treemap, gauge, comparison chart, waterfall, etc.).
- **Part E — Page Recipes**: assembled layouts (overview dashboard, transactions, portfolio detail, goal detail, chat surface, onboarding, **stock detail, watchlist/trading, portfolio analytics**).
- **Part F — Customization & Checklist**.
- **Part G — Tailwind quick map.**

Use any combination of components — they share the same tokens so they always compose cleanly.

---

## PART A — Foundations

### A.1 Design Principles

1. **Radical whitespace.** Margins, padding, and section gaps should feel generous, never tight. White space is the design.
2. **Data is the hero.** Charts, amounts, and labels are large; UI chrome (borders, shadows, icons) is invisible-by-default.
3. **One data color carries everything.** Pick one brand-data color (green by default). All positive/primary data uses its shades.
4. **Typography over decoration.** Big bold headings create hierarchy. Almost no icons in chrome; icons only inside data (merchant logos, action bars).
5. **Cards float in white.** A subtle shadow and 16px radius. No borders.
6. **Conversational rhythm.** Body text and data cards alternate freely in vertical flow — like reading a thoughtful explanation, not a dashboard.

### A.2 Color Tokens

```css
:root {
  /* Surfaces */
  --bg-page:        #FFFFFF;
  --bg-card:        #FFFFFF;
  --bg-soft:        #F3F4F6;   /* inputs, message bubbles, soft chips */
  --bg-subtle:      #FAFAFA;   /* alt page bg if you need contrast */

  /* Primary Data Color — replace with brand */
  --data-900:       #1B5E20;
  --data-700:       #2E7D32;
  --data-500:       #4CAF50;
  --data-400:       #66BB6A;
  --data-300:       #81C784;
  --data-200:       #A5D6A7;
  --data-100:       #C8E6C9;

  /* Accent (non-primary data: cash, bonds, low-risk) */
  --accent-500:     #2196F3;
  --accent-300:     #64B5F6;
  --accent-200:     #90CAF9;
  --accent-100:     #BBDEFB;

  /* Text */
  --text-primary:   #0A0A0A;
  --text-secondary: #6B7280;
  --text-muted:     #9CA3AF;
  --text-positive:  #2E7D32;
  --text-negative:  #6B7280;   /* still gray — see A.1 #3 */

  /* Borders & Dividers */
  --border-subtle:  #E5E7EB;
  --border-soft:    #F3F4F6;

  /* Interactive */
  --btn-dark:       #0A0A0A;
  --btn-dark-hover: #1A1A1A;
  --btn-light:      #F3F4F6;
  --btn-light-hover:#E5E7EB;

  /* Shadows */
  --shadow-card:    0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04);
  --shadow-pop:     0 6px 24px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04);
  --shadow-overlay: 0 20px 50px rgba(0,0,0,0.18);
}
```

**Negative-value rule:** never use red. Use `--text-secondary` (`#6B7280`) or a `↓` glyph in gray. Red breaks the calm palette and overweights losses.

### A.3 Typography

Font stack:
```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

| Token | Size | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|
| `text-hero` | `clamp(2.5rem, 5vw, 4.5rem)` | 800 | 1.05 | -0.02em | Full-screen reveals |
| `text-display` | `2rem` | 800 | 1.1 | -0.01em | Page headers |
| `text-h1` | `1.5rem` | 700 | 1.2 | -0.005em | Card section titles |
| `text-h2` | `1.25rem` | 700 | 1.3 | 0 | Card title |
| `text-h3` | `1.0625rem` | 700 | 1.4 | 0 | Inline section header inside body |
| `text-amount-xl` | `2rem` | 700 | 1.1 | -0.01em | Hero KPI |
| `text-amount-lg` | `1.75rem` | 700 | 1.15 | 0 | Card amount |
| `text-amount` | `1rem` | 500 | 1.4 | 0 | List amount |
| `text-body` | `1.0625rem` | 400 | 1.7 | 0 | Paragraphs, AI explanations |
| `text-bold` | `1.0625rem` | 700 | 1.7 | 0 | Inline emphasis |
| `text-label` | `1rem` | 500 | 1.4 | 0 | List item primary |
| `text-meta` | `0.875rem` | 400 | 1.4 | 0 | Dates, secondary info |
| `text-caption` | `0.8125rem` | 400 | 1.3 | 0 | Chart axes, legends |
| `text-status` | `0.9375rem` | 400 | 1.4 | 0 | Loading/tool text (use `--text-muted`) |
| `text-eyebrow` | `0.75rem` | 700 | 1 | 0.06em uppercase | Card label above title |

**Rule:** never mix more than two weights in a single component (typically 400 + 700).

### A.4 Spacing, Radius, Shadow, Motion

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --radius-sm:    4px;   /* table dividers etc. */
  --radius-md:    8px;   /* buttons, small chips, bars */
  --radius-lg:    12px;  /* mid containers */
  --radius-card:  16px;  /* cards */
  --radius-xl:    20px;  /* modals, sheets */
  --radius-pill:  9999px;

  --motion-fast:    150ms;
  --motion-normal:  300ms;
  --motion-slow:    500ms;
  --motion-chart:   800ms;
  --ease-out:       cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
}
```

Container widths:
- Chat / single-column reading: **680px**
- Dashboard grid: **1100px**
- Wide content (e.g. data tables): **1280px**

### A.5 Iconography

Use **stroke icons at 1.5px stroke width** (Lucide, Heroicons "outline"). Filled icons only inside chips and small action buttons. Brand merchant icons are bright filled circles with a single letter or logo at 40px.

---

## PART B — Observed Components (from the source video)

Each component below is exactly as it appears in the reference. Copy-paste HTML & CSS use tokens from Part A.

### B.1 Hero Section (full-screen reveal)

Massive bold statement on pure white. Often paired with a single graphic floating above it (e.g., outline donut, dashboard fragment).

```html
<section class="hero">
  <p class="hero-text">manage your personal finances</p>
</section>
```

```css
.hero {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 0 var(--space-6);
  background: var(--bg-page);
}
.hero-text {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--text-primary);
  text-align: center;
  max-width: 900px;
}
```

### B.2 Card (Container)

```html
<article class="card">
  <header class="card-header">
    <div>
      <h3 class="card-title">Portfolio distribution</h3>
      <p class="card-meta">5 holdings across 3 accounts</p>
    </div>
    <div class="card-amount">$102,938.83</div>
  </header>
  <!-- card body -->
</article>
```

```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}
.card-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.card-meta  { font-size: 0.875rem; color: var(--text-secondary); margin: var(--space-1) 0 0; }
.card-amount{ font-size: 1.75rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
```

Variants:
- `.card.compact`  → `padding: var(--space-4);`
- `.card.flush`    → no internal padding (for media headers, charts that bleed)
- `.card.bordered` → `box-shadow: none; border: 1px solid var(--border-subtle);`

### B.3 Card With Top Divider (titled card)

When the title sits in a separate band above content:

```html
<article class="card">
  <h3 class="card-title" style="margin-bottom: var(--space-4);">Upcoming payments</h3>
  <div class="divider"></div>
  <ul class="list">...</ul>
</article>
```

```css
.divider { height: 1px; background: var(--border-subtle); margin: 0 0 var(--space-3); }
```

### B.4 List Item (Merchant / Bill / Transaction row)

Icon + name + meta + amount, with a hairline divider between rows.

```html
<div class="list-item">
  <div class="list-icon" style="background:#2196F3;">D</div>
  <div class="list-info">
    <span class="list-name">Dahl Bank</span>
    <span class="list-meta">in 2 days</span>
  </div>
  <span class="list-amount">$1,354.33</span>
</div>
```

```css
.list-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border-subtle);
}
.list-item:last-child { border-bottom: none; }
.list-icon {
  width: 40px; height: 40px; border-radius: var(--radius-pill);
  display: grid; place-items: center;
  font-weight: 700; color: #FFFFFF; font-size: 0.9375rem;
  flex-shrink: 0; overflow: hidden;
}
.list-info { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); min-width: 0; }
.list-name  { font-size: 1rem; font-weight: 500; color: var(--text-primary); }
.list-meta  { font-size: 0.8125rem; color: var(--text-secondary); }
.list-amount{ font-size: 1rem; font-weight: 500; color: var(--text-primary); white-space: nowrap; }
```

**Icon palette tip:** brand colors are allowed for merchant icons (blue, brown, lotus pink, etc.) — this is the one place real-world colors live, because they're carrying brand identity, not data semantics.

### B.5 Donut Chart + Right-side Legend with Mini Bars

The signature chart pattern. Donut on left; legend on right with a tiny horizontal bar under each label indicating relative size.

```html
<div class="donut-block">
  <svg class="donut" viewBox="0 0 200 200"><!-- segments --></svg>
  <ul class="donut-legend">
    <li class="legend-item">
      <div class="legend-row"><span>Stocks</span><span>$48,512.84</span></div>
      <div class="legend-bar"><span style="width:46%; background:var(--data-900);"></span></div>
    </li>
    <!-- repeat -->
  </ul>
</div>
```

```css
.donut-block { display: grid; grid-template-columns: 200px 1fr; gap: var(--space-6); align-items: center; }
.donut       { width: 200px; height: 200px; }
.donut-legend{ list-style: none; padding: 0; margin: 0; }
.legend-item { padding: var(--space-3) 0; border-bottom: 1px solid var(--border-soft); }
.legend-item:last-child { border-bottom: none; }
.legend-row  {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.9375rem; font-weight: 500; color: var(--text-primary);
  margin-bottom: var(--space-2);
}
.legend-bar  {
  height: 3px; border-radius: 2px; background: var(--border-subtle); overflow: hidden;
}
.legend-bar span {
  display: block; height: 100%; border-radius: 2px;
  transition: width var(--motion-chart) var(--ease-out);
}
```

**Donut SVG rules** (segments drawn manually or with Recharts/Chart.js):
- Outer radius 90, ring stroke ~24
- 1.5° gap between segments (so each looks like a separate "leaf")
- Color order, largest → smallest: `--data-900`, `--data-700`, `--data-400`, `--data-200`, `--accent-200`
- Hollow center is the page background color
- No labels on the donut itself

### B.6 Area / Line Chart (time series)

```jsx
// Recharts
<AreaChart data={data}>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stopColor="#4CAF50" stopOpacity={0.20} />
      <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
    </linearGradient>
  </defs>
  <CartesianGrid vertical={false} stroke="#F3F4F6" />
  <XAxis dataKey="x" axisLine={false} tickLine={false}
         tick={{ fill: "#9CA3AF", fontSize: 12 }} />
  <YAxis orientation="right" axisLine={false} tickLine={false}
         tick={{ fill: "#9CA3AF", fontSize: 12 }} />
  <Area type="monotone" dataKey="y"
        stroke="#4CAF50" strokeWidth={2}
        fill="url(#g)" dot={false}
        activeDot={{ r: 4, fill: "#4CAF50", strokeWidth: 0 }} />
</AreaChart>
```

**Spec:** 2px stroke, gradient fill from `rgba(76,175,80,0.20)` to transparent, **horizontal grid only**, **Y-axis on the right**, no axis lines.

### B.7 Time Range Selector (pill switcher)

```html
<nav class="time-range">
  <button>1D</button><button>1W</button><button>1M</button>
  <button>3M</button><button>6M</button>
  <button class="active" aria-current="true">YTD</button>
  <button>1Y</button><button>2Y</button><button>5Y</button>
</nav>
```

```css
.time-range { display: flex; gap: var(--space-1); }
.time-range button {
  padding: 6px 12px; border: 0; background: transparent;
  border-radius: var(--radius-pill);
  font: 500 0.875rem/1 "Inter", sans-serif; color: var(--text-secondary);
  cursor: pointer; transition: background var(--motion-fast), color var(--motion-fast);
}
.time-range button:hover { background: var(--bg-soft); color: var(--text-primary); }
.time-range .active { background: #1A1A1A; color: #FFFFFF; }
```

### B.8 Tab Toggle (Monthly / Annual, two-state)

Smaller and lower-emphasis than navigation tabs; used inside a card to switch its data.

```html
<div class="tab-toggle">
  <button class="active">Monthly</button>
  <button>Annual</button>
</div>
```

```css
.tab-toggle { display: inline-flex; gap: var(--space-2); }
.tab-toggle button {
  padding: 6px 14px; border: 0; background: transparent;
  font: 500 0.9375rem/1 "Inter", sans-serif; color: var(--text-muted);
  border-radius: var(--radius-pill); cursor: pointer;
}
.tab-toggle .active { background: var(--bg-soft); color: var(--text-primary); }
```

### B.9 Stacked Horizontal Bar (spending breakdown)

Single bar showing category proportions. Followed by rows that label each segment.

```html
<div class="stack-bar">
  <span style="flex:42; background:var(--data-900);"></span>
  <span style="flex:18; background:var(--data-700);"></span>
  <span style="flex:14; background:var(--data-500);"></span>
  <span style="flex:10; background:var(--data-200);"></span>
  <span style="flex: 8; background:var(--accent-300);"></span>
  <span style="flex: 8; background:var(--accent-500);"></span>
</div>
```

```css
.stack-bar { display: flex; height: 32px; border-radius: var(--radius-md); overflow: hidden; gap: 2px; }
.stack-bar > span { display: block; transition: flex var(--motion-chart) var(--ease-out); }
```

### B.10 Spending Row (breakdown line item)

Used to list categories with icon + label + amount under a stacked bar.

```html
<div class="spend-row">
  <span class="spend-icon" aria-hidden="true">⌂</span>
  <span class="spend-label">Rent and utilities</span>
  <span class="spend-amount">$2,032.75</span>
</div>
```

```css
.spend-row {
  display: grid; grid-template-columns: 28px 1fr auto;
  align-items: center; gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-subtle);
}
.spend-icon { color: var(--text-secondary); font-size: 1rem; line-height: 1; }
.spend-label{ font-size: 1rem; color: var(--text-primary); }
.spend-amount{font-size: 1rem; font-weight: 500; color: var(--text-primary); }
```

### B.11 Account Sync Card

A card listing connected accounts with sync status.

```html
<div class="card">
  <p class="sync-tool"><span class="sync-tool-icon"></span> Connecting with Plaid</p>
  <div class="sync-row">
    <img class="sync-logo" alt="" src="..." />
    <div class="sync-info">
      <span class="sync-name">American Express</span>
      <span class="sync-meta">1 account</span>
    </div>
    <span class="sync-status"><span class="spinner"></span> Syncing</span>
  </div>
</div>
```

```css
.sync-tool { display:flex; align-items:center; gap: var(--space-2); color: var(--text-secondary); font-size: 0.9375rem; margin-bottom: var(--space-4); }
.sync-tool-icon { width:16px; height:16px; background:#0A0A0A; border-radius:4px; }
.sync-row { display:flex; align-items:center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom:1px solid var(--border-subtle); }
.sync-row:last-child { border-bottom: 0; }
.sync-logo { width: 32px; height: 32px; object-fit: contain; }
.sync-info { flex:1; display:flex; flex-direction:column; gap:2px; }
.sync-name { font-weight: 500; color: var(--text-primary); }
.sync-meta { font-size: 0.8125rem; color: var(--text-secondary); }
.sync-status { display:flex; align-items:center; gap: var(--space-2); color: var(--text-secondary); font-size: 0.9375rem; }
.spinner { width:14px; height:14px; border:2px solid var(--border-subtle); border-top-color: var(--text-secondary); border-radius:50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

### B.12 Tool / Status Indicator (inline)

A small icon + light gray label used inline to show the system is doing something ("Querying financial data", "Received financial data", "Connecting with Plaid").

```html
<p class="status-pill">
  <span class="status-dot"></span> Querying financial data
</p>
```

```css
.status-pill { display:flex; align-items:center; gap: var(--space-2); color: var(--text-muted); font-size: 0.9375rem; }
.status-dot  { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); }
```

### B.13 Chat User Bubble

Right-aligned pill, soft gray bg, near-black text.

```html
<div class="user-msg">Am I paying for subscriptions I don't need?</div>
```

```css
.user-msg {
  align-self: flex-end; max-width: 78%;
  background: var(--bg-soft);
  color: var(--text-primary);
  font-size: 1.0625rem; line-height: 1.5;
  padding: 14px 20px;
  border-radius: 20px 20px 4px 20px;
}
```

### B.14 AI Response Block (plain text + emphasis + bullets)

Left-aligned plain text. Bold for entities/numbers. Optional bullet list inside.

```html
<div class="ai-msg">
  <p>I can see you're paying for <strong>4 fitness memberships.</strong> Since your new job has you back in the office, you might consider only taking classes at your local gym.</p>

  <h4 class="ai-subhead">A few things stand out:</h4>
  <ul class="ai-list">
    <li><strong>More overlap than it seems.</strong> Many funds hold the same underlying companies, reducing true diversification.</li>
    <li><strong>Heavy U.S. exposure.</strong> Your portfolio is largely tied to one market and economic cycle.</li>
  </ul>
</div>
```

```css
.ai-msg { font-size: 1.0625rem; color: var(--text-primary); line-height: 1.7; }
.ai-msg p { margin: 0 0 var(--space-4); }
.ai-msg strong { font-weight: 700; }
.ai-subhead { font-size: 1.0625rem; font-weight: 700; margin: var(--space-5) 0 var(--space-3); }
.ai-list { padding-left: var(--space-5); margin: 0 0 var(--space-4); }
.ai-list li { margin-bottom: var(--space-3); }
.ai-list li::marker { color: var(--text-primary); }
```

### B.15 AI Action Bar (6 small icon buttons)

Sits below an AI response: copy / read-aloud / thumbs-up / thumbs-down / regenerate / share.

```html
<div class="ai-actions" role="toolbar" aria-label="Response actions">
  <button title="Copy">⧉</button>
  <button title="Read aloud">⏵</button>
  <button title="Good response">👍</button>
  <button title="Bad response">👎</button>
  <button title="Regenerate">↻</button>
  <button title="Share">↗</button>
</div>
```

```css
.ai-actions { display:flex; gap: var(--space-1); margin-top: var(--space-3); }
.ai-actions button {
  width: 32px; height: 32px; border: 0; background: transparent;
  border-radius: var(--radius-md);
  color: var(--text-secondary); font-size: 0.9rem; cursor: pointer;
  display:grid; place-items:center;
}
.ai-actions button:hover { background: var(--bg-soft); color: var(--text-primary); }
```

### B.16 Composer / Chat Input (sticky)

```html
<form class="composer">
  <button type="button" class="composer-add" aria-label="Add">+</button>
  <div class="composer-pill">
    <input placeholder="Ask anything about your finances…" />
    <button type="submit" class="composer-send" aria-label="Send">↑</button>
  </div>
</form>
```

```css
.composer {
  position: sticky; bottom: 0;
  display:flex; gap: var(--space-2); align-items:center;
  padding: var(--space-4) var(--space-6) var(--space-6);
  background: linear-gradient(to top, #fff 70%, transparent);
  max-width: 680px; margin: 0 auto;
}
.composer-add {
  width: 44px; height: 44px; border-radius: var(--radius-pill);
  background: var(--bg-soft); border: 0; cursor: pointer;
  color: var(--text-secondary); font-size: 1.25rem;
  display:grid; place-items:center; flex-shrink: 0;
}
.composer-pill {
  flex:1; display:flex; align-items:center;
  background: var(--bg-soft); border-radius: var(--radius-pill);
  padding: 10px 10px 10px 18px; gap: var(--space-2);
}
.composer-pill input {
  flex:1; border:0; background:transparent;
  font: 400 1rem/1.4 "Inter", sans-serif; color: var(--text-primary);
  outline: 0;
}
.composer-pill input::placeholder { color: var(--text-muted); }
.composer-send {
  width: 36px; height: 36px; border-radius: var(--radius-pill);
  background: var(--btn-dark); color: #fff; border: 0; cursor: pointer;
  display:grid; place-items:center; flex-shrink: 0;
}
.composer-send:hover { background: var(--btn-dark-hover); }
```

### B.17 Data Table (compact key/value)

```html
<table class="dtable">
  <thead><tr><th>Bucket</th><th>Target</th></tr></thead>
  <tbody>
    <tr><td>Emergency fund</td><td>$45K</td></tr>
    <tr><td>Down payment</td><td>$80K–$140K</td></tr>
    <tr><td>Closing/repairs</td><td>~$20K</td></tr>
  </tbody>
</table>
```

```css
.dtable { width: 100%; border-collapse: collapse; font-size: 1rem; color: var(--text-primary); }
.dtable th { text-align: left; font-weight: 700; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
.dtable td { padding: var(--space-4) 0; border-bottom: 1px solid var(--border-subtle); }
.dtable th:last-child, .dtable td:last-child { text-align: right; }
.dtable tr:last-child td { border-bottom: 0; }
.dtable tfoot td { font-weight: 700; }
```

### B.18 Inline Section Header (within long-form body)

Used in AI explanations to break content into clear scannable blocks.

```html
<h3 class="inline-head">Where you stand today</h3>
<p>You've got about <strong>$143K cash</strong>...</p>
```

```css
.inline-head {
  font-size: 1.0625rem; font-weight: 700; color: var(--text-primary);
  margin: var(--space-6) 0 var(--space-3);
}
```

### B.19 Bullet List with Bold Lead

```css
.bullet-list { padding-left: var(--space-5); margin: 0 0 var(--space-4); }
.bullet-list li { margin: 0 0 var(--space-3); line-height: 1.6; }
.bullet-list li > strong { font-weight: 700; }
```

### B.20 Disclaimer Footer

```html
<p class="disclaimer">This is not financial advice. For guidance tailored to your situation, consult a licensed advisor.</p>
```

```css
.disclaimer { text-align:center; color: var(--text-muted); font-size: 0.8125rem; padding: var(--space-12) var(--space-6); }
```

### B.21 Brand Mark End Card

Center-aligned product mark with a single line of fine print beneath.

```html
<section class="endmark">
  <img src="/brand.svg" alt="" width="80" height="80" />
  <p class="disclaimer">Made with care.</p>
</section>
```

```css
.endmark { min-height: 60vh; display:grid; place-items:center; gap: var(--space-6); }
```

### B.22 Two-Column Dashboard Grid

```css
.dashboard {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  max-width: 1100px; margin: 0 auto; padding: var(--space-6);
}
.dashboard .full { grid-column: 1 / -1; }
@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
}
```

---

## PART C — Inferred Components (needed to ship a full product)

The reference video shows the "story" surfaces. A real product also needs navigation, forms, modals, empty states, and operational components. These extend Part B using the same tokens.

### C.1 Top App Bar (header)

```html
<header class="appbar">
  <a class="appbar-brand" href="/">Money</a>
  <nav class="appbar-nav">
    <a href="/" class="active">Overview</a>
    <a href="/transactions">Transactions</a>
    <a href="/investments">Investments</a>
    <a href="/goals">Goals</a>
  </nav>
  <div class="appbar-end">
    <button class="icon-btn" aria-label="Search">🔍</button>
    <button class="avatar">YL</button>
  </div>
</header>
```

```css
.appbar {
  position: sticky; top: 0; z-index: 50;
  display:flex; align-items:center; gap: var(--space-8);
  padding: var(--space-4) var(--space-6);
  background: rgba(255,255,255,0.85);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}
.appbar-brand { font-weight: 800; font-size: 1.125rem; color: var(--text-primary); text-decoration: none; }
.appbar-nav { display:flex; gap: var(--space-6); flex: 1; }
.appbar-nav a {
  font-size: 0.9375rem; font-weight: 500; color: var(--text-secondary);
  text-decoration: none; padding: var(--space-2) 0; position: relative;
}
.appbar-nav a:hover { color: var(--text-primary); }
.appbar-nav a.active { color: var(--text-primary); }
.appbar-nav a.active::after {
  content:""; position:absolute; left:0; right:0; bottom: -1px; height: 2px;
  background: var(--text-primary);
}
.appbar-end { display:flex; gap: var(--space-2); align-items:center; }
.icon-btn {
  width: 36px; height: 36px; border-radius: var(--radius-pill);
  border: 0; background: transparent; cursor: pointer;
  display: grid; place-items: center; color: var(--text-secondary);
}
.icon-btn:hover { background: var(--bg-soft); color: var(--text-primary); }
.avatar {
  width: 36px; height: 36px; border-radius: var(--radius-pill);
  background: var(--data-700); color: #fff; border: 0; cursor: pointer;
  font-weight: 700; font-size: 0.8125rem;
}
```

### C.2 Side Navigation (alt to top bar — for app shell with many sections)

```css
.sidenav { width: 240px; padding: var(--space-6) var(--space-3); height: 100vh; position: sticky; top: 0; }
.sidenav a {
  display:flex; align-items:center; gap: var(--space-3);
  padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);
  color: var(--text-secondary); text-decoration: none; font-size: 0.9375rem;
}
.sidenav a:hover { background: var(--bg-soft); color: var(--text-primary); }
.sidenav a.active { background: var(--bg-soft); color: var(--text-primary); font-weight: 600; }
```

### C.3 Mobile Bottom Tab Bar

```html
<nav class="tabbar">
  <a class="active"><span>⌂</span><span>Home</span></a>
  <a><span>↔</span><span>Activity</span></a>
  <a><span>◐</span><span>Insights</span></a>
  <a><span>◔</span><span>Goals</span></a>
</nav>
```

```css
.tabbar {
  position: fixed; bottom: 0; left: 0; right: 0;
  display:flex; justify-content: space-around;
  padding: var(--space-2) var(--space-2) calc(var(--space-2) + env(safe-area-inset-bottom));
  background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-subtle);
}
.tabbar a {
  flex:1; display:flex; flex-direction:column; align-items:center; gap:2px;
  padding: var(--space-2);
  font-size: 0.6875rem; color: var(--text-muted); text-decoration: none;
}
.tabbar a.active { color: var(--text-primary); }
```

### C.4 KPI Card (big stat + label + trend)

```html
<div class="kpi">
  <span class="kpi-label">Net worth</span>
  <span class="kpi-value">$128,450</span>
  <span class="kpi-trend up">↗ +2.3% <span class="kpi-trend-meta">vs last month</span></span>
</div>
```

```css
.kpi { display:flex; flex-direction:column; gap: var(--space-1); padding: var(--space-5); border-radius: var(--radius-card); background: var(--bg-card); box-shadow: var(--shadow-card); }
.kpi-label { font-size: 0.875rem; color: var(--text-secondary); }
.kpi-value { font-size: 2rem; font-weight: 700; color: var(--text-primary); line-height: 1.1; }
.kpi-trend { font-size: 0.875rem; font-weight: 500; }
.kpi-trend.up   { color: var(--text-positive); }
.kpi-trend.down { color: var(--text-secondary); }
.kpi-trend-meta { color: var(--text-secondary); font-weight: 400; margin-left: var(--space-1); }
```

KPI strip layout:
```css
.kpi-strip { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-4); }
```

### C.5 Trend Badge (inline)

For showing change anywhere — beside an amount, in a table cell, in a list row.

```html
<span class="trend up">↗ 2.73%</span>
<span class="trend down">↘ 0.8%</span>
<span class="trend flat">— 0.0%</span>
```

```css
.trend { display:inline-flex; align-items:center; gap:4px; font-weight: 600; font-size: 0.9375rem; }
.trend.up   { color: var(--text-positive); }
.trend.down { color: var(--text-secondary); }
.trend.flat { color: var(--text-muted); }
```

### C.6 Buttons

Primary, secondary, tertiary, destructive — all sharing one geometry.

```css
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap: var(--space-2);
  height: 44px; padding: 0 var(--space-5);
  border-radius: var(--radius-pill); border: 0; cursor: pointer;
  font: 600 0.9375rem/1 "Inter", sans-serif;
  transition: background var(--motion-fast), color var(--motion-fast), transform var(--motion-fast);
}
.btn:active { transform: translateY(1px); }

.btn-primary    { background: var(--btn-dark); color: #fff; }
.btn-primary:hover { background: var(--btn-dark-hover); }

.btn-secondary  { background: var(--bg-soft); color: var(--text-primary); }
.btn-secondary:hover { background: var(--btn-light-hover); }

.btn-tertiary   { background: transparent; color: var(--text-primary); padding: 0 var(--space-3); }
.btn-tertiary:hover { background: var(--bg-soft); }

.btn-data       { background: var(--data-700); color: #fff; }
.btn-data:hover { background: var(--data-900); }

.btn-destructive{ background: transparent; color: var(--text-primary); border: 1px solid var(--border-subtle); }
.btn-destructive:hover { background: var(--bg-soft); }

.btn-sm { height: 32px; padding: 0 var(--space-3); font-size: 0.875rem; }
.btn-lg { height: 52px; padding: 0 var(--space-6); font-size: 1rem; }
.btn-block { width: 100%; }
```

### C.7 Text Input

```html
<label class="field">
  <span class="field-label">Email</span>
  <input class="field-input" type="email" placeholder="you@example.com" />
  <span class="field-help">We'll never share this.</span>
</label>
```

```css
.field { display: flex; flex-direction: column; gap: var(--space-2); }
.field-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.field-input {
  height: 48px; padding: 0 var(--space-4);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  background: var(--bg-card); color: var(--text-primary);
  font: 400 1rem/1 "Inter", sans-serif; outline: 0;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
}
.field-input:focus { border-color: var(--text-primary); box-shadow: 0 0 0 3px var(--bg-soft); }
.field-input::placeholder { color: var(--text-muted); }
.field-help { font-size: 0.8125rem; color: var(--text-secondary); }
.field.error .field-input { border-color: var(--text-secondary); }
.field.error .field-help { color: var(--text-secondary); }
```

### C.8 Currency / Number Input

```html
<label class="field">
  <span class="field-label">Monthly target</span>
  <div class="currency-input">
    <span class="currency-prefix">$</span>
    <input inputmode="decimal" placeholder="0.00" />
    <span class="currency-suffix">USD</span>
  </div>
</label>
```

```css
.currency-input {
  display:flex; align-items:center; gap: var(--space-2);
  height: 48px; padding: 0 var(--space-4);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  background: var(--bg-card);
}
.currency-input:focus-within { border-color: var(--text-primary); box-shadow: 0 0 0 3px var(--bg-soft); }
.currency-prefix { font-size: 1.125rem; font-weight: 600; color: var(--text-secondary); }
.currency-input input { flex:1; border:0; outline:0; background:transparent; font: 600 1.125rem/1 "Inter", sans-serif; color: var(--text-primary); }
.currency-suffix { font-size: 0.8125rem; color: var(--text-muted); }
```

### C.9 Search Bar

```html
<label class="search">
  <span class="search-icon">🔍</span>
  <input placeholder="Search transactions, merchants, categories" />
  <kbd class="search-shortcut">⌘K</kbd>
</label>
```

```css
.search {
  display:flex; align-items:center; gap: var(--space-3);
  height: 44px; padding: 0 var(--space-4);
  background: var(--bg-soft); border-radius: var(--radius-pill);
}
.search-icon { color: var(--text-muted); }
.search input { flex:1; border:0; background:transparent; outline:0; font: 400 0.9375rem/1 "Inter", sans-serif; color: var(--text-primary); }
.search input::placeholder { color: var(--text-muted); }
.search-shortcut {
  font: 600 0.75rem/1 "Inter", sans-serif; color: var(--text-muted);
  background: var(--bg-card); padding: 4px 8px; border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}
```

### C.10 Filter Chip / Tag

Removable filter chip (with `×`) and read-only category tag (no remove).

```html
<span class="chip">Dining <button aria-label="Remove">×</button></span>
<span class="chip chip-static">Recurring</span>
```

```css
.chip {
  display:inline-flex; align-items:center; gap: var(--space-2);
  height: 28px; padding: 0 var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--bg-soft); color: var(--text-primary);
  font: 500 0.8125rem/1 "Inter", sans-serif;
}
.chip button { border:0; background:transparent; color: var(--text-muted); cursor:pointer; padding: 0; line-height: 1; font-size: 1rem; }
.chip button:hover { color: var(--text-primary); }
.chip-static button { display: none; }
```

### C.11 Date Range Picker (trigger button)

```html
<button class="daterange">
  <span>Jan 1, 2025 – May 20, 2026</span> <span class="daterange-caret">▾</span>
</button>
```

```css
.daterange {
  display:inline-flex; align-items:center; gap: var(--space-2);
  height: 36px; padding: 0 var(--space-4);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-pill);
  background: var(--bg-card); cursor: pointer;
  font: 500 0.875rem/1 "Inter", sans-serif; color: var(--text-primary);
}
.daterange:hover { background: var(--bg-soft); }
.daterange-caret { color: var(--text-muted); font-size: 0.625rem; }
```

### C.12 Empty State

```html
<div class="empty">
  <div class="empty-icon">✦</div>
  <h3 class="empty-title">No transactions yet</h3>
  <p class="empty-body">Connect an account to start seeing your money flow in real time.</p>
  <button class="btn btn-primary">Connect account</button>
</div>
```

```css
.empty { text-align:center; padding: var(--space-16) var(--space-6); display:flex; flex-direction:column; gap: var(--space-3); align-items:center; }
.empty-icon { width: 56px; height: 56px; display:grid; place-items:center; background: var(--bg-soft); border-radius: var(--radius-pill); font-size: 1.5rem; color: var(--text-secondary); margin-bottom: var(--space-2); }
.empty-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.empty-body { font-size: 0.9375rem; color: var(--text-secondary); max-width: 360px; margin: 0 0 var(--space-3); }
```

### C.13 Skeleton Loader

```css
.skel { background: linear-gradient(90deg, var(--bg-soft) 25%, #ECEEF1 50%, var(--bg-soft) 75%); background-size: 200% 100%; border-radius: var(--radius-sm); animation: shimmer 1.4s infinite; }
.skel-line  { height: 14px; }
.skel-line.lg { height: 24px; }
.skel-circ  { width: 40px; height: 40px; border-radius: var(--radius-pill); }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
```

### C.14 Linear Progress Bar

```html
<div class="progress" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100">
  <span style="width: 57%; background: var(--data-700);"></span>
</div>
```

```css
.progress { height: 8px; background: var(--border-subtle); border-radius: var(--radius-pill); overflow: hidden; }
.progress > span { display:block; height:100%; border-radius: var(--radius-pill); transition: width var(--motion-chart) var(--ease-out); }
```

### C.15 Goal Card

A purpose-built insight card showing a goal with current/target and a progress bar.

```html
<article class="goal">
  <header class="card-header">
    <div>
      <h3 class="card-title">Home down payment</h3>
      <p class="card-meta">Target Dec 2025</p>
    </div>
    <div class="card-amount">$11.4K / $20K</div>
  </header>
  <div class="progress"><span style="width:57%; background:var(--data-700);"></span></div>
  <p class="goal-foot"><strong>57%</strong> · On track to finish <strong>3 months early</strong></p>
</article>
```

```css
.goal { display:flex; flex-direction:column; gap: var(--space-3); padding: var(--space-5); background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.goal-foot { font-size: 0.9375rem; color: var(--text-secondary); margin: 0; }
.goal-foot strong { color: var(--text-primary); font-weight: 700; }
```

### C.16 Insight / Nudge Card

A surfaced AI suggestion with subtle accent and an action.

```html
<aside class="insight">
  <span class="insight-eyebrow">Suggestion</span>
  <p class="insight-body">You're paying for <strong>4 fitness memberships</strong>. Canceling unused ones could save <strong>$340/month</strong>.</p>
  <div class="insight-actions">
    <button class="btn btn-secondary btn-sm">Review</button>
    <button class="btn btn-tertiary btn-sm">Dismiss</button>
  </div>
</aside>
```

```css
.insight { background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); padding: var(--space-5); display:flex; flex-direction:column; gap: var(--space-3); border-left: 3px solid var(--data-700); }
.insight-eyebrow { font: 700 0.6875rem/1 "Inter", sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: var(--data-700); }
.insight-body { font-size: 1rem; color: var(--text-primary); line-height: 1.55; margin: 0; }
.insight-actions { display:flex; gap: var(--space-2); }
```

### C.17 Account Card (bank account summary)

```html
<article class="account">
  <div class="account-head">
    <img class="account-logo" alt="" src="..." />
    <div>
      <h3 class="account-name">Chase Checking</h3>
      <p class="account-meta">•• 4521 · Updated 2 min ago</p>
    </div>
  </div>
  <div class="account-balance">$12,450.32</div>
</article>
```

```css
.account { background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); padding: var(--space-5); display:flex; flex-direction:column; gap: var(--space-3); }
.account-head { display:flex; align-items:center; gap: var(--space-3); }
.account-logo { width: 32px; height: 32px; object-fit: contain; }
.account-name { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.account-meta { font-size: 0.8125rem; color: var(--text-secondary); margin: 0; }
.account-balance { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); }
```

### C.18 Toast / Notification

```html
<div class="toast" role="status">
  <span class="toast-icon">✓</span>
  <p class="toast-msg">Account connected.</p>
  <button class="toast-close" aria-label="Close">×</button>
</div>
```

```css
.toast {
  display:flex; align-items:center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4); padding-right: var(--space-2);
  background: var(--text-primary); color: #fff;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-pop);
}
.toast-icon { width: 20px; height: 20px; border-radius: 50%; background: var(--data-500); display:grid; place-items:center; font-size: 0.75rem; }
.toast-msg { font-size: 0.9375rem; margin: 0; }
.toast-close { background:transparent; border:0; color: rgba(255,255,255,0.7); cursor:pointer; font-size: 1.125rem; padding: 0 var(--space-2); }
```

### C.19 Modal Dialog

```html
<div class="modal-scrim">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <header class="modal-head">
      <h3 id="m-title">Cancel subscription</h3>
      <button class="icon-btn" aria-label="Close">×</button>
    </header>
    <div class="modal-body">
      <p>You'll lose access at the end of the billing cycle (Jun 30).</p>
    </div>
    <footer class="modal-foot">
      <button class="btn btn-tertiary">Keep it</button>
      <button class="btn btn-primary">Cancel anyway</button>
    </footer>
  </div>
</div>
```

```css
.modal-scrim { position: fixed; inset: 0; background: rgba(10,10,10,0.32); display:grid; place-items:center; padding: var(--space-6); z-index: 100; }
.modal {
  width: min(480px, 100%); background: var(--bg-card); border-radius: var(--radius-xl);
  box-shadow: var(--shadow-overlay); display:flex; flex-direction:column;
}
.modal-head { display:flex; justify-content:space-between; align-items:center; padding: var(--space-5) var(--space-6); }
.modal-head h3 { font-size: 1.125rem; font-weight: 700; margin: 0; }
.modal-body { padding: 0 var(--space-6) var(--space-5); color: var(--text-secondary); }
.modal-foot { display:flex; justify-content:flex-end; gap: var(--space-2); padding: var(--space-4) var(--space-6); }
```

### C.20 Bottom Sheet (mobile)

```css
.sheet-scrim { position: fixed; inset: 0; background: rgba(10,10,10,0.32); z-index: 100; }
.sheet {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: var(--bg-card); border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  padding: var(--space-6) var(--space-6) calc(var(--space-6) + env(safe-area-inset-bottom));
  box-shadow: var(--shadow-overlay);
  transform: translateY(0); animation: sheet-in var(--motion-normal) var(--ease-out);
}
.sheet::before { content:""; display:block; width: 40px; height: 4px; background: var(--border-subtle); border-radius: 2px; margin: 0 auto var(--space-5); }
@keyframes sheet-in { from { transform: translateY(100%); } to { transform: translateY(0); } }
```

### C.21 Confirmation Dialog (inline action prompt)

Same shape as modal but smaller and centered, with strong primary action and tertiary cancel.

### C.22 Stepper / Wizard Progress

```html
<ol class="steps">
  <li class="done">Connect accounts</li>
  <li class="current">Pick goals</li>
  <li>Set budget</li>
  <li>Review</li>
</ol>
```

```css
.steps { display:flex; gap: var(--space-2); list-style: none; padding: 0; margin: 0; }
.steps li {
  flex: 1; padding: var(--space-3); border-radius: var(--radius-md);
  background: var(--bg-soft); color: var(--text-muted);
  font-size: 0.8125rem; font-weight: 600; text-align: center;
}
.steps li.current { background: var(--text-primary); color: #fff; }
.steps li.done { background: var(--data-100); color: var(--data-900); }
```

### C.23 Calendar Heatmap (spending intensity)

```css
.heat { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.heat-cell { aspect-ratio: 1; border-radius: var(--radius-sm); background: var(--bg-soft); }
.heat-cell.l1 { background: var(--data-100); }
.heat-cell.l2 { background: var(--data-200); }
.heat-cell.l3 { background: var(--data-400); }
.heat-cell.l4 { background: var(--data-700); }
.heat-cell.l5 { background: var(--data-900); }
```

### C.24 Budget Meter (over/under indicator)

```html
<div class="meter">
  <div class="meter-head">
    <span>Dining</span><span><strong>$867</strong> / $600</span>
  </div>
  <div class="progress">
    <span style="width: 100%; background: var(--text-secondary);"></span>
  </div>
  <p class="meter-note">$267 over — consider trimming Sunday dinners.</p>
</div>
```

```css
.meter { display:flex; flex-direction: column; gap: var(--space-2); }
.meter-head { display:flex; justify-content:space-between; font-size: 0.9375rem; color: var(--text-primary); }
.meter-note { font-size: 0.8125rem; color: var(--text-secondary); margin: 0; }
```

---

## PART D — Stock & Investment Components

Specialized components for trading, investing, and portfolio-management surfaces. All follow the same tokens; in particular, **down/loss values use gray (`--text-secondary`), never red**. This keeps the palette calm and consistent and prevents loss-aversion overweighting.

### D.1 Sparkline (inline micro-chart)

A tiny chart used inside lists, KPIs, and table cells. No axes, no labels, no fill — just a single stroke.

```html
<svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none">
  <polyline class="sparkline-line up"
    points="0,24 12,20 24,22 36,16 48,18 60,14 72,12 84,15 96,8 108,10 120,4" />
</svg>
```

```css
.sparkline { width: 120px; height: 32px; overflow: visible; }
.sparkline-line { fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.sparkline-line.up   { stroke: var(--data-500); }
.sparkline-line.down { stroke: var(--text-secondary); }
.sparkline-line.flat { stroke: var(--text-muted); }
```

For an **area sparkline**, add `<path>` underneath the polyline with a soft fill at 8–12% opacity:
```css
.sparkline-area.up { fill: var(--data-500); fill-opacity: 0.10; }
```

### D.2 Mini-KPI with Sparkline

A KPI card variant — value on top, sparkline at the bottom.

```html
<div class="kpi-mini">
  <div class="kpi-mini-head">
    <span class="kpi-label">AAPL</span>
    <span class="trend up">↗ 1.4%</span>
  </div>
  <span class="kpi-value">$184.30</span>
  <svg class="sparkline" viewBox="0 0 200 40" preserveAspectRatio="none">
    <polyline class="sparkline-line up" points="0,32 ... 200,8" />
  </svg>
</div>
```

```css
.kpi-mini { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.kpi-mini-head { display: flex; justify-content: space-between; align-items: center; }
.kpi-mini .sparkline { width: 100%; height: 40px; margin-top: var(--space-2); }
```

### D.3 Candlestick Chart (with volume)

OHLC bars. **Up candles use `--data-500`. Down candles use `--text-secondary` (gray).** Optional volume histogram below using the same colors.

```html
<div class="candle-wrap">
  <svg class="candle-svg" viewBox="0 0 800 280" preserveAspectRatio="none">
    <g class="candle-grid" id="candle-grid"></g>
    <g id="candle-bodies"></g>
    <g id="candle-wicks"></g>
    <g id="candle-volume"></g>
    <g id="candle-xlabels"></g>
    <g id="candle-ylabels"></g>
  </svg>
</div>
```

```css
.candle-wrap { position: relative; height: 320px; }
.candle-svg { width: 100%; height: 100%; }
.candle-up .body { fill: var(--data-500); }
.candle-up .wick { stroke: var(--data-500); }
.candle-down .body { fill: var(--text-secondary); }
.candle-down .wick { stroke: var(--text-secondary); }
.candle-wick { stroke-width: 1; }
.candle-grid line { stroke: #F3F4F6; stroke-width: 1; }
.candle-volume rect.up   { fill: var(--data-500); fill-opacity: 0.6; }
.candle-volume rect.down { fill: var(--text-secondary); fill-opacity: 0.6; }
```

**Per-candle math** (given OHLC `o, h, l, c`, x-position `x`, candle width `w`):
- Body rect: `y = top of (o,c)`, `height = abs(o − c)`, `width = w`
- Wick line: from `(x + w/2, h)` to `(x + w/2, l)`
- "Up" when `c ≥ o`, else "down"

Library: `lightweight-charts` by TradingView is recommended for production (matches this aesthetic when colors are overridden).

### D.4 Multi-line Comparison Chart

Compare 2–5 tickers/assets. Each line uses a different shade of the data palette + accent.

```css
.compare-chart .series-1 { stroke: var(--data-900); }
.compare-chart .series-2 { stroke: var(--data-500); }
.compare-chart .series-3 { stroke: var(--data-200); }
.compare-chart .series-4 { stroke: var(--accent-500); }
.compare-chart .series-5 { stroke: var(--text-secondary); }
.compare-chart polyline { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }

.compare-legend { display: flex; gap: var(--space-4); margin-bottom: var(--space-4); }
.compare-legend-item { display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--text-primary); }
.compare-legend-dot { width: 10px; height: 10px; border-radius: 50%; }
```

Normalize all series to start at 100 (or 0%) for fair visual comparison.

### D.5 Vertical Bar Chart (monthly returns)

Up months green, down months gray. No red.

```html
<svg class="bars-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
  <g id="bars-zero"></g>
  <g id="bars-bars"></g>
  <g id="bars-xlabels"></g>
</svg>
```

```css
.bars-svg rect.up   { fill: var(--data-500); }
.bars-svg rect.down { fill: var(--text-secondary); fill-opacity: 0.65; }
.bars-svg .zero-line { stroke: var(--border-subtle); stroke-width: 1; }
```

### D.6 Waterfall Chart (cash-flow breakdown)

Shows how a starting balance becomes an ending balance through a series of additions and subtractions.

```html
<svg class="waterfall" viewBox="0 0 800 220" preserveAspectRatio="none">
  <!-- positive bars: var(--data-500). negative bars: var(--text-secondary).
       Each bar's bottom = running total; height = abs(delta).
       Optional dashed connector line between bars. -->
</svg>
```

```css
.waterfall rect.start, .waterfall rect.end { fill: var(--text-primary); }
.waterfall rect.add { fill: var(--data-500); }
.waterfall rect.sub { fill: var(--text-secondary); }
.waterfall .connector { stroke: var(--border-subtle); stroke-dasharray: 3 3; stroke-width: 1; }
.waterfall text { font: 500 11px "Inter"; fill: var(--text-muted); }
```

### D.7 Treemap (allocation)

Rectangles sized by value; intensity colors by relative weight (or by P/L). Use **darker green = bigger holding** when sizing by value; **darker green = larger gain, lighter green / gray = smaller change** when colored by P/L.

```html
<div class="treemap">
  <div class="tm-cell" style="grid-area: 1/1/4/4; background:var(--data-900);">
    <span class="tm-ticker">AAPL</span><span class="tm-meta">28%</span>
  </div>
  <div class="tm-cell" style="grid-area: 1/4/3/6; background:var(--data-700);">
    <span class="tm-ticker">MSFT</span><span class="tm-meta">18%</span>
  </div>
  <!-- ... -->
</div>
```

```css
.treemap { display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(5, 1fr); gap: 4px; aspect-ratio: 16/9; }
.tm-cell { display: flex; flex-direction: column; justify-content: flex-end; padding: var(--space-3); border-radius: var(--radius-sm); color: #fff; min-width: 0; min-height: 0; }
.tm-ticker { font: 700 0.9375rem/1.1 "Inter"; }
.tm-meta { font: 500 0.75rem/1 "Inter"; opacity: 0.85; }
.tm-cell.light { color: var(--text-primary); }
```

For **non-greedy layouts**, use a treemap library (e.g., D3's `treemap()` or Recharts `<Treemap>`); only the cell styling above is needed.

### D.8 Market / Sector Heatmap

Grid of tiles colored by % change. Up days use data palette ramp; down days use gray ramp.

```html
<div class="sector-heat">
  <div class="sh-cell up3"><span>TECH</span><span>+2.4%</span></div>
  <div class="sh-cell up1"><span>FIN</span><span>+0.6%</span></div>
  <div class="sh-cell down1"><span>UTIL</span><span>−0.3%</span></div>
  <div class="sh-cell down2"><span>ENERGY</span><span>−1.1%</span></div>
  <!-- ... -->
</div>
```

```css
.sector-heat { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 4px; }
.sh-cell {
  aspect-ratio: 2/1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2px;
  border-radius: var(--radius-sm); color: #fff;
  font: 600 0.875rem/1 "Inter"; letter-spacing: 0.04em;
}
.sh-cell.up3   { background: var(--data-900); }
.sh-cell.up2   { background: var(--data-700); }
.sh-cell.up1   { background: var(--data-400); }
.sh-cell.flat  { background: var(--bg-soft); color: var(--text-secondary); }
.sh-cell.down1 { background: #B0BAC5; color: #fff; }
.sh-cell.down2 { background: #8B95A1; color: #fff; }
.sh-cell.down3 { background: #6B7280; color: #fff; }
```

### D.9 Gauge / Radial Progress

Half-circle gauge for risk score, allocation %, score-card metrics.

```html
<div class="gauge" data-value="68" data-label="Risk score">
  <svg viewBox="0 0 100 56">
    <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="#E5E7EB" stroke-width="8" stroke-linecap="round"/>
    <path class="gauge-fill" d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="var(--data-700)" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="132" stroke-dashoffset="42" />
  </svg>
  <div class="gauge-label">
    <span class="gauge-value">68</span>
    <span class="gauge-name">Moderate</span>
  </div>
</div>
```

```css
.gauge { position: relative; width: 160px; }
.gauge svg { width: 100%; display: block; }
.gauge-fill { transition: stroke-dashoffset var(--motion-chart) var(--ease-out); }
.gauge-label { position: absolute; bottom: 4px; left: 0; right: 0; text-align: center; }
.gauge-value { display: block; font: 800 1.5rem/1 "Inter"; color: var(--text-primary); }
.gauge-name  { font: 500 0.75rem/1 "Inter"; color: var(--text-secondary); }
```

`stroke-dasharray="132"` = total arc length (≈ π × 42).
`stroke-dashoffset = 132 × (1 − value/100)`.

### D.10 Watchlist Row

Dense row with monospace ticker, name, price, change, and inline sparkline.

```html
<div class="watch-row">
  <span class="watch-ticker">AAPL</span>
  <div class="watch-info">
    <span class="watch-name">Apple Inc.</span>
    <span class="watch-meta">NASDAQ</span>
  </div>
  <svg class="sparkline"><!-- ... --></svg>
  <div class="watch-price">
    <span class="watch-last">$184.30</span>
    <span class="trend up">↗ 1.4%</span>
  </div>
</div>
```

```css
.watch-row {
  display: grid; grid-template-columns: 64px 1fr 120px 100px;
  align-items: center; gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-subtle);
}
.watch-row:last-child { border-bottom: 0; }
.watch-row:hover { background: var(--bg-soft); }
.watch-ticker { font: 700 0.9375rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--text-primary); }
.watch-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.watch-name { font-size: 0.9375rem; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.watch-meta { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; }
.watch-price { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.watch-last { font: 600 0.9375rem/1 "Inter"; color: var(--text-primary); }
```

### D.11 Holding / Position Row

For holdings tables — adds shares, cost basis, market value, unrealized P/L.

```html
<div class="hold-row">
  <div class="hold-symbol">
    <span class="watch-ticker">AAPL</span>
    <span class="hold-name">Apple Inc.</span>
  </div>
  <span class="hold-cell">42 sh</span>
  <span class="hold-cell">$172.10</span>
  <span class="hold-cell hold-value">$7,740.60</span>
  <div class="hold-cell hold-pl">
    <span class="watch-last">+$512.00</span>
    <span class="trend up">↗ 7.1%</span>
  </div>
</div>
```

```css
.hold-row {
  display: grid; grid-template-columns: 1.4fr 0.7fr 0.9fr 1fr 1.1fr;
  align-items: center; gap: var(--space-3);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.9375rem;
}
.hold-row:last-child { border-bottom: 0; }
.hold-symbol { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.hold-name { font-size: 0.8125rem; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; }
.hold-cell { text-align: right; color: var(--text-primary); }
.hold-value { font-weight: 600; }
.hold-pl { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
```

### D.12 Stock Detail Header (hero)

The "Stock Detail Page" hero — ticker, name, exchange, last price, day change, range buttons, and action buttons.

```html
<header class="stock-hero">
  <div class="stock-hero-top">
    <div>
      <p class="stock-name">Apple Inc.</p>
      <h2 class="stock-ticker">AAPL <span class="stock-exchange">NASDAQ · USD</span></h2>
    </div>
    <div class="stock-actions">
      <button class="btn btn-secondary">Add to watchlist</button>
      <button class="btn btn-primary">Trade</button>
    </div>
  </div>
  <div class="stock-hero-price">
    <span class="stock-last">$184.30</span>
    <span class="stock-change up">+$2.55 ↗ 1.40%</span>
    <span class="stock-meta">After hours: $184.62 (+0.17%)</span>
  </div>
</header>
```

```css
.stock-hero { display: flex; flex-direction: column; gap: var(--space-5); padding: var(--space-6) 0; }
.stock-hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-4); flex-wrap: wrap; }
.stock-name { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
.stock-ticker { font: 800 2rem/1.1 "Inter"; letter-spacing: -0.01em; color: var(--text-primary); margin: 4px 0 0; display: flex; align-items: baseline; gap: var(--space-3); }
.stock-exchange { font: 500 0.75rem/1 "Inter"; color: var(--text-muted); letter-spacing: 0.06em; }
.stock-actions { display: flex; gap: var(--space-3); }
.stock-hero-price { display: flex; align-items: baseline; gap: var(--space-5); flex-wrap: wrap; }
.stock-last { font: 800 2.5rem/1 "Inter"; letter-spacing: -0.01em; color: var(--text-primary); }
.stock-change { font: 600 1rem/1 "Inter"; }
.stock-change.up   { color: var(--text-positive); }
.stock-change.down { color: var(--text-secondary); }
.stock-meta { font-size: 0.875rem; color: var(--text-muted); }
```

### D.13 Order Card (Buy / Sell)

```html
<aside class="order-card">
  <div class="order-toggle">
    <button class="active">Buy</button>
    <button>Sell</button>
  </div>
  <label class="field">
    <span class="field-label">Quantity</span>
    <input class="field-input" inputmode="decimal" value="10" />
  </label>
  <label class="field">
    <span class="field-label">Order type</span>
    <div class="tab-toggle">
      <button class="active">Market</button>
      <button>Limit</button>
      <button>Stop</button>
    </div>
  </label>
  <div class="order-row"><span>Est. cost</span><strong>$1,843.00</strong></div>
  <div class="order-row"><span>Buying power</span><span class="text-muted">$12,450.32</span></div>
  <button class="btn btn-data btn-block btn-lg">Review buy order</button>
</aside>
```

```css
.order-card { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-5); background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.order-toggle { display: grid; grid-template-columns: 1fr 1fr; padding: 4px; background: var(--bg-soft); border-radius: var(--radius-pill); }
.order-toggle button { border: 0; background: transparent; padding: 8px; border-radius: var(--radius-pill); font: 600 0.9375rem/1 "Inter"; color: var(--text-secondary); cursor: pointer; }
.order-toggle .active { background: var(--bg-card); color: var(--text-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.order-row { display: flex; justify-content: space-between; font-size: 0.9375rem; color: var(--text-primary); }
.order-row strong { font-weight: 700; }
.text-muted { color: var(--text-muted); }
```

For **sell** state, swap `btn-data` for `btn-destructive` and change the active toggle to "Sell".

### D.14 News Feed Item

```html
<article class="news-row">
  <div class="news-source">
    <div class="news-source-logo" style="background:var(--data-700);">WSJ</div>
    <div>
      <p class="news-headline">Apple beats Q2 earnings on services strength</p>
      <p class="news-meta">Wall Street Journal · 2h ago</p>
    </div>
  </div>
  <img class="news-thumb" alt="" src="..." />
</article>
```

```css
.news-row { display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4) 0; border-bottom: 1px solid var(--border-subtle); }
.news-row:last-child { border-bottom: 0; }
.news-source { flex: 1; display: flex; gap: var(--space-3); min-width: 0; }
.news-source-logo { flex-shrink: 0; width: 32px; height: 32px; border-radius: var(--radius-sm); display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 0.6875rem; letter-spacing: 0.04em; }
.news-headline { font-size: 1rem; font-weight: 500; color: var(--text-primary); margin: 0 0 4px; line-height: 1.4; }
.news-meta { font-size: 0.8125rem; color: var(--text-secondary); margin: 0; }
.news-thumb { width: 72px; height: 72px; border-radius: var(--radius-md); object-fit: cover; flex-shrink: 0; }
```

### D.15 Dividend Card

```html
<article class="div-card">
  <p class="div-eyebrow">Dividend</p>
  <div class="div-yield">
    <span class="div-yield-value">2.84%</span>
    <span class="div-yield-meta">Annual yield</span>
  </div>
  <dl class="div-meta-list">
    <div><dt>Ex-date</dt><dd>May 10, 2026</dd></div>
    <div><dt>Pay date</dt><dd>May 24, 2026</dd></div>
    <div><dt>Per share</dt><dd>$0.24</dd></div>
    <div><dt>Frequency</dt><dd>Quarterly</dd></div>
  </dl>
</article>
```

```css
.div-card { padding: var(--space-5); background: var(--bg-card); border-radius: var(--radius-card); box-shadow: var(--shadow-card); display: flex; flex-direction: column; gap: var(--space-4); }
.div-eyebrow { font: 700 0.6875rem/1 "Inter"; letter-spacing: 0.08em; text-transform: uppercase; color: var(--data-700); margin: 0; }
.div-yield { display: flex; align-items: baseline; gap: var(--space-3); }
.div-yield-value { font: 800 2.5rem/1 "Inter"; color: var(--text-primary); }
.div-yield-meta { font-size: 0.875rem; color: var(--text-secondary); }
.div-meta-list { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4) var(--space-6); }
.div-meta-list dt { font-size: 0.8125rem; color: var(--text-muted); }
.div-meta-list dd { font-size: 0.9375rem; font-weight: 500; color: var(--text-primary); margin: 2px 0 0; }
```

### D.16 Risk Indicator (5-dot scale)

```html
<div class="risk" data-level="3" aria-label="Risk level: 3 of 5">
  <span class="risk-dots">
    <span class="dot on"></span><span class="dot on"></span><span class="dot on"></span>
    <span class="dot"></span><span class="dot"></span>
  </span>
  <span class="risk-label">Moderate</span>
</div>
```

```css
.risk { display: inline-flex; align-items: center; gap: var(--space-3); }
.risk-dots { display: inline-flex; gap: 4px; }
.risk .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-subtle); }
.risk .dot.on { background: var(--data-700); }
.risk-label { font-size: 0.8125rem; color: var(--text-secondary); font-weight: 600; }
```

Map levels: 1 → `Conservative`, 2 → `Cautious`, 3 → `Moderate`, 4 → `Growth`, 5 → `Aggressive`.

### D.17 Stock Ticker Marquee

A horizontal auto-scrolling band of tickers (great for landing pages, dashboards).

```html
<div class="marquee">
  <div class="marquee-track">
    <span class="m-item"><strong>AAPL</strong> $184.30 <em class="up">↗ 1.4%</em></span>
    <span class="m-item"><strong>MSFT</strong> $407.10 <em class="up">↗ 0.6%</em></span>
    <span class="m-item"><strong>TSLA</strong> $238.40 <em class="down">↘ 2.1%</em></span>
    <!-- repeat content for seamless loop -->
  </div>
</div>
```

```css
.marquee { overflow: hidden; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); background: var(--bg-card); }
.marquee-track { display: flex; gap: var(--space-8); padding: var(--space-3) 0; animation: marquee 60s linear infinite; width: max-content; }
.m-item { display: inline-flex; align-items: center; gap: var(--space-2); font-size: 0.9375rem; color: var(--text-primary); white-space: nowrap; }
.m-item strong { font: 700 0.9375rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; }
.m-item em { font-style: normal; font-weight: 600; }
.m-item .up { color: var(--text-positive); }
.m-item .down { color: var(--text-secondary); }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

### D.18 Range Slider (dual-handle, for price/value filters)

```html
<div class="rangeslider">
  <div class="rangeslider-track">
    <div class="rangeslider-fill" style="left: 20%; right: 25%;"></div>
    <div class="rangeslider-handle" style="left: 20%;"></div>
    <div class="rangeslider-handle" style="left: 75%;"></div>
  </div>
  <div class="rangeslider-labels">
    <span>$50</span><span>$500</span>
  </div>
</div>
```

```css
.rangeslider { width: 100%; max-width: 360px; padding: var(--space-3) 0; }
.rangeslider-track { position: relative; height: 4px; background: var(--border-subtle); border-radius: var(--radius-pill); }
.rangeslider-fill { position: absolute; top: 0; bottom: 0; background: var(--data-700); border-radius: var(--radius-pill); }
.rangeslider-handle { position: absolute; top: 50%; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2px solid var(--data-700); transform: translate(-50%, -50%); cursor: grab; box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
.rangeslider-labels { display: flex; justify-content: space-between; margin-top: var(--space-2); font-size: 0.8125rem; color: var(--text-muted); }
```

### D.19 P/L Badge (large)

Heavier, more prominent than the inline trend badge — for portfolio summary stats.

```html
<div class="pl-badge up">
  <span class="pl-amount">+$12,840.21</span>
  <span class="pl-pct">↗ 18.4%</span>
</div>
```

```css
.pl-badge { display: inline-flex; align-items: baseline; gap: var(--space-3); padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill); }
.pl-badge.up   { background: var(--data-100); color: var(--data-900); }
.pl-badge.down { background: var(--bg-soft); color: var(--text-secondary); }
.pl-amount { font: 700 1rem/1 "Inter"; }
.pl-pct { font: 600 0.875rem/1 "Inter"; opacity: 0.85; }
```

---

## PART E — Page Recipes

### E.1 Overview Dashboard

```
[Top App Bar]
[KPI strip — Net worth · Cash · Investments · Spending (4 cards)]
[Two-column grid]
  ├── Net worth area chart (full-width card with Time Range Selector)
  ├── Portfolio Donut + Legend
  ├── Upcoming Bills (List Items)
  └── Spending Breakdown (Stacked Bar + Spending Rows)
[Insight cards row, scrollable]
[Disclaimer]
```

### E.2 Transactions Page

```
[Top App Bar]
[Filters row — Search · Date range · Category chips · "Add filter" button]
[Date-grouped list]
  ├── Section header "Today"
  ├── List items
  ├── Section header "Yesterday"
  └── List items
[Empty state if filtered to nothing]
```

### E.3 Portfolio Detail

```
[Top App Bar]
[Hero KPI: Total value + trend badge + range selector]
[Area chart, full bleed inside card]
[Two-column grid]
  ├── Donut allocation + legend
  └── Holdings list (List Items, sorted by value)
[Insight: "Heavy U.S. exposure" — Insight Card]
```

### E.4 Goal Detail

```
[Top App Bar]
[Goal Card hero, large]
[Two-column]
  ├── Contributions area chart
  └── Plan table (Data Table)
[AI explanation block (Inline section header + body)]
[CTA buttons (primary + tertiary)]
```

### E.5 Chat / Ask Surface

```
[Header bar — minimal: brand + close]
[Scrollable conversation: User bubble → AI msg → optional inline Cards → Action bar]
[Sticky Composer]
[Disclaimer footer]
```

### E.6 Onboarding (Connect accounts)

```
[Stepper progress: 1/4]
[Hero text: "Connect your accounts"]
[Account list with Sync rows + spinners]
[Status pill "Connecting with Plaid"]
[Footer: Skip · Continue (primary, disabled until ready)]
```

### E.7 Stock Detail Page

```
[Top App Bar]
[Stock Detail Header — name · ticker · last · day change · actions]
[Time Range Selector (1D · 1W · 1M · 3M · 6M · 1Y · 5Y · MAX)]
[Candlestick Chart (with volume below)]
[Two-column grid]
  ├── Left column
  │     ├── About / company description card
  │     ├── Key stats table (P/E, Market cap, 52W range, etc.)
  │     └── News feed (News Items)
  └── Right column
        ├── Order Card (Buy / Sell)
        ├── Dividend Card
        ├── Risk Indicator + Gauge
        └── Comparison Chart (vs sector / vs SPY)
```

### E.8 Watchlist & Trading Surface

```
[Top App Bar]
[Ticker Marquee (live prices)]
[Filters row — Search · Sort · Range Slider · Sector chips]
[Two-column grid]
  ├── Watchlist (Watchlist Rows with sparklines)
  └── Holdings Table (Holding Rows with P/L)
[KPI strip — Day P/L · Total P/L · Buying power · Cash]
[Sector Heatmap card]
[Treemap card — Allocation visualization]
```

### E.9 Portfolio Analytics

```
[Top App Bar]
[KPI strip with P/L Badges — Total value · Today · YTD · All-time]
[Comparison Chart vs SPY / vs sector — full-width]
[Two-column]
  ├── Vertical Bar Chart — Monthly returns
  └── Waterfall Chart — YTD cash flow attribution
[Treemap — Holdings sized by value, colored by P/L]
[Risk Score (Gauge) + Diversification stats]
```

---

## PART F — Customization & Checklist

### F.1 Three-step brand customization

1. **Pick a single data color** and generate a 7-step ramp (use a tool like https://uicolors.app or Tailwind's color palette). Map to `--data-100` through `--data-900`.
2. **Optional accent** for non-primary data (cash, bonds): a cool color in the same temperature family.
3. **Optional font**: swap `Inter` for your brand sans. Keep weights to 400 + 700 (or 500 + 800 for stronger contrast).

Do **not** override:
- White surfaces (`--bg-page`, `--bg-card`).
- Card radius (`16px`).
- Shadow depth.
- Negative-value rule (no red).

### F.2 Pre-ship checklist

- [ ] All amounts are right-aligned.
- [ ] No drop shadows heavier than `0 6px 24px rgba(0,0,0,0.08)`.
- [ ] Hero/section text uses weight 800; body uses weight 400; emphasis uses weight 700.
- [ ] Cards have padding `24px` and gap `16px`; sections have vertical padding `80px`.
- [ ] Charts: horizontal grid only, axis labels on the right, gray axis text.
- [ ] All negative deltas use gray, never red.
- [ ] Empty states have icon + title + body + CTA.
- [ ] Composer has a + button on the left, dark send on the right.
- [ ] Mobile (<768px): two-column grids collapse to one; modals become bottom sheets.

### F.3 Do / Don't

**Do:**
- Use generous padding even when it feels like too much.
- Let cards float — never paint a card on a colored background.
- Use real merchant brand colors in list icons (this is the one place brand color lives).
- Center long-form reading at 680px.
- Animate charts on first view (`fadeUp` + segment-stagger + bar widths).

**Don't:**
- Don't apply gradients to backgrounds (only to chart fills).
- Don't put labels on pie/donut segments — always use a side legend.
- Don't use more than two type weights per component.
- Don't outline buttons except for destructive secondary cases.
- Don't draw vertical grid lines on charts.

---

## PART G — Tailwind Quick Map (optional)

If you use Tailwind, these classes match the tokens above:

```
bg-white                  → --bg-page / --bg-card
bg-gray-100               → --bg-soft
text-gray-900             → --text-primary
text-gray-500             → --text-secondary
text-gray-400             → --text-muted
text-green-700/800/900    → --data-700/--data-900
bg-green-100..900         → --data-100..--data-900
shadow-sm                 → --shadow-card
rounded-2xl               → --radius-card
rounded-full              → --radius-pill
p-6 / gap-4 / py-20       → --space-6 / --space-4 / --space-20
```

---

## Final Note

Components compose. You only need 4 things to assemble most product pages:
1. A **card** (B.2).
2. A **header inside the card** (title + amount).
3. A **list, chart, table, or text block** as the body.
4. **Whitespace** between cards.

Everything else in this guide is a specialization of that idea.

