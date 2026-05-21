import { useMemo } from "react";
import {
  Sparkline, DonutChart, AreaChart, CandlestickChart, BarChart, WaterfallChart,
  ComparisonChart, StackedBar, Treemap, SectorHeatmap, CalendarHeatmap, Gauge,
  Card, CardHeader,
  colors,
  type WaterfallStep,
} from "../../../src/lib";

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="docs-section">
      <div className="docs-section-title">{title}</div>
      {desc && <p className="docs-section-desc">{desc}</p>}
      <div className="docs-demo-box">{children}</div>
    </div>
  );
}

function genCandles(n: number, start = 178) {
  const out = [];
  let last = start;
  for (let i = 0; i < n; i++) {
    const drift = (Math.random() - 0.45) * 4;
    const open = last;
    const close = Math.max(150, open + drift);
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    const vol = Math.round(50 + Math.random() * 80);
    out.push({ open, high, low, close, vol, label: `Day ${i + 1}` });
    last = close;
  }
  return out;
}

export default function Charts() {
  const sparklineUp   = useMemo(() => [10, 12, 11, 14, 16, 15, 18, 20, 19, 22, 24], []);
  const sparklineDown = useMemo(() => [24, 22, 20, 21, 18, 17, 15, 14, 12, 11, 10], []);
  const sparklineFlat = useMemo(() => [15, 14, 16, 15, 17, 15, 16, 15, 16, 14, 15], []);
  const candles = useMemo(() => genCandles(30), []);

  const areaData = [
    { label: "Jan", value: 74396 }, { label: "Feb", value: 75820 },
    { label: "Mar", value: 73100 }, { label: "Apr", value: 77480 },
    { label: "May", value: 80210 }, { label: "Jun", value: 84210 },
  ];

  const monthlyReturns = [
    { label: "Jan", value:  3.2 }, { label: "Feb", value: -1.8 },
    { label: "Mar", value:  2.4 }, { label: "Apr", value:  4.0 },
    { label: "May", value: -1.1 }, { label: "Jun", value:  2.8 },
    { label: "Jul", value:  3.7 }, { label: "Aug", value: -2.1 },
    { label: "Sep", value:  2.0 }, { label: "Oct", value:  3.1 },
    { label: "Nov", value: -0.9 }, { label: "Dec", value:  4.2 },
  ];

  const waterfall: WaterfallStep[] = [
    { label: "Start",   value: 100000, type: "start" },
    { label: "Income",  value: 30000,  type: "add" },
    { label: "Living",  value: -18000, type: "sub" },
    { label: "Returns", value: 14000,  type: "add" },
    { label: "Tax",     value: -8000,  type: "sub" },
    { label: "End",     value: 0,      type: "end" },
  ];

  const comparisonSeries = [
    { label: "AAPL", values: [100, 105, 102, 110, 118, 122, 128, 135] },
    { label: "QQQ",  values: [100, 102, 104, 106, 108, 112, 115, 118] },
    { label: "SPY",  values: [100, 101, 103, 104, 106, 108, 110, 112] },
    { label: "XLF",  values: [100, 100, 99, 101, 102, 103, 102, 104] },
  ];

  const sectors = [
    { label: "TECH",      change: 2.4  }, { label: "COMM",     change: 1.6  },
    { label: "HEALTH",    change: 1.2  }, { label: "CONS DISC", change: 0.6 },
    { label: "FIN",       change: 0.4  }, { label: "INDUS",    change: 0.0  },
    { label: "MATERIALS", change: -0.1 }, { label: "UTIL",     change: -0.3 },
    { label: "RE",        change: -0.6 }, { label: "ENERGY",   change: -1.1 },
  ];

  const heatmapIntensities = useMemo(
    () => Array.from({ length: 70 }, () => Math.floor(Math.random() * 6)),
    []
  );

  return (
    <div>
      <h1 className="docs-page-title">Charts</h1>
      <p className="docs-page-subtitle">
        Data visualization: sparklines, donut, area, candlestick, bar, waterfall, comparison, and more.
      </p>

      <Section title="Sparkline" desc="Inline mini line chart for watchlist / KPI rows.">
        <div className="docs-row" style={{ alignItems: "flex-end", gap: 32 }}>
          <div>
            <div className="docs-label">Up trend</div>
            <Sparkline values={sparklineUp} width={120} height={40} />
          </div>
          <div>
            <div className="docs-label">Down trend</div>
            <Sparkline values={sparklineDown} width={120} height={40} />
          </div>
          <div>
            <div className="docs-label">Flat</div>
            <Sparkline values={sparklineFlat} width={120} height={40} />
          </div>
        </div>
      </Section>

      <Section title="DonutChart" desc="Animated donut chart with legend.">
        <Card>
          <CardHeader title="Portfolio distribution" meta="5 asset classes" amount="$102,938" />
          <DonutChart
            segments={[
              { label: "Stocks", value: 48512.84, amount: "$48,512.84" },
              { label: "ETFs",   value: 19134.14, amount: "$19,134.14" },
              { label: "Bonds",  value: 18354.60, amount: "$18,354.60" },
              { label: "Crypto", value: 10736.38, amount: "$10,736.38" },
              { label: "Cash",   value:  6200.87, amount: "$6,200.87", color: colors.accent[200] },
            ]}
          />
        </Card>
      </Section>

      <Section title="AreaChart" desc="SVG area chart with gradient fill and axis labels.">
        <Card>
          <CardHeader title="Net worth" meta="All accounts" amount="$84,210" />
          <AreaChart data={areaData} />
        </Card>
      </Section>

      <Section title="CandlestickChart" desc="OHLCV candlestick chart with volume bars.">
        <Card>
          <CardHeader title="AAPL" meta="30-day price history" />
          <CandlestickChart data={candles} />
        </Card>
      </Section>

      <Section title="BarChart" desc="Bar chart supporting positive and negative values.">
        <Card>
          <CardHeader title="Monthly returns" meta="2025 · %" />
          <BarChart data={monthlyReturns} />
        </Card>
      </Section>

      <Section title="WaterfallChart" desc="Waterfall (bridge) chart for cash-flow breakdowns.">
        <Card>
          <CardHeader title="YTD cash-flow" meta="Where the money went" />
          <WaterfallChart steps={waterfall} />
        </Card>
      </Section>

      <Section title="ComparisonChart" desc="Normalized multi-line comparison chart.">
        <Card>
          <CardHeader title="vs. benchmarks" meta="Normalized to 100 · YTD" />
          <ComparisonChart series={comparisonSeries} />
        </Card>
      </Section>

      <Section title="StackedBar" desc="Horizontal proportional stacked bar.">
        <Card>
          <CardHeader title="Spending by category" amount="$3,847" />
          <StackedBar
            segments={[
              { value: 42, color: colors.data[900] },
              { value: 18, color: colors.data[700] },
              { value: 14, color: colors.data[500] },
              { value: 10, color: colors.data[200] },
              { value:  8, color: colors.accent[300] },
              { value:  8, color: colors.accent[500] },
            ]}
          />
        </Card>
      </Section>

      <Section title="Treemap" desc="CSS grid-based treemap for allocation visualization.">
        <Card>
          <CardHeader title="Allocation treemap" meta="Cells sized by value" />
          <Treemap
            cells={[
              { label: "NVDA", meta: "26.3%", color: colors.data[900],    area: "1 / 1 / 4 / 4" },
              { label: "SPY",  meta: "17.8%", color: colors.data[700],    area: "1 / 4 / 3 / 6" },
              { label: "AAPL", meta: "14.2%", color: colors.data[500],    area: "1 / 6 / 3 / 8" },
              { label: "BND",  meta:  "3.4%", color: colors.accent[500],  area: "1 / 8 / 3 / 9" },
              { label: "MSFT", meta: "11.5%", color: colors.data[400],    area: "4 / 1 / 6 / 3" },
              { label: "GOOG", meta:  "9.8%", color: colors.data[400],    area: "4 / 3 / 6 / 5" },
              { label: "QQQ",  meta:  "8.4%", color: colors.data[200],    area: "3 / 4 / 6 / 7", light: true },
              { label: "TSLA", meta:  "6.2%", color: colors.data[100],    area: "3 / 7 / 5 / 9", light: true },
              { label: "CASH", meta:  "2.4%", color: colors.accent[200],  area: "5 / 7 / 6 / 9", light: true },
            ]}
          />
        </Card>
      </Section>

      <Section title="SectorHeatmap" desc="Color-coded grid of market sector changes.">
        <Card>
          <CardHeader title="Sector heatmap" meta="Today" />
          <SectorHeatmap cells={sectors} />
        </Card>
      </Section>

      <Section title="CalendarHeatmap" desc="Intensity grid for daily spending or activity.">
        <Card>
          <CardHeader title="Spending intensity" meta="Last 10 weeks" />
          <CalendarHeatmap intensities={heatmapIntensities} columns={14} />
        </Card>
      </Section>

      <Section title="Gauge" desc="Semi-circular gauge for risk or score display.">
        <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div className="docs-label">Conservative (32)</div>
            <Gauge value={32} label="Low risk" />
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="docs-label">Moderate (68)</div>
            <Gauge value={68} label="Moderate" />
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="docs-label">Aggressive (90)</div>
            <Gauge value={90} label="High risk" />
          </div>
        </div>
      </Section>
    </div>
  );
}
