import { useMemo } from "react";
import {
  Sparkline, DonutChart, AreaChart, CandlestickChart, BarChart, WaterfallChart,
  ComparisonChart, StackedBar, Treemap, SectorHeatmap, CalendarHeatmap, Gauge,
  Card, CardHeader,
  colors,
  type WaterfallStep,
} from "../../../src/lib";
import { ApiTable } from "../ApiTable";
import { CodeBlock } from "../CodeBlock";

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "values", type: "number[]", required: true, description: "Array of data points to plot. Requires at least 2 values." },
        { name: "width", type: "number", default: "120", description: "SVG width in pixels." },
        { name: "height", type: "number", default: "32", description: "SVG height in pixels." },
        { name: "direction", type: '"up" | "down" | "flat" | "auto"', default: '"auto"', description: "Color direction. auto detects from first vs last value." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Sparkline values={[10, 12, 11, 14, 16, 18, 20]} width={120} height={32} />`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "segments", type: "DonutSegment[]", required: true, description: "Array of segments. Each has: label (ReactNode), value (number), optional color (string), optional amount (ReactNode for legend)." },
        { name: "size", type: "number", default: "200", description: "SVG diameter in pixels." },
        { name: "stroke", type: "number", default: "24", description: "Ring stroke width in pixels." },
        { name: "showLegend", type: "boolean", default: "true", description: "Whether to render the legend alongside the chart." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<DonutChart
  segments={[
    { label: "Stocks", value: 48512, amount: "$48,512" },
    { label: "ETFs",   value: 19134, amount: "$19,134" },
    { label: "Bonds",  value: 18354, amount: "$18,354" },
  ]}
  size={200}
  showLegend
/>`} />

      <Section title="AreaChart" desc="SVG area chart with gradient fill and axis labels.">
        <Card>
          <CardHeader title="Net worth" meta="All accounts" amount="$84,210" />
          <AreaChart data={areaData} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "data", type: "AreaPoint[]", required: true, description: "Array of { label: string; value: number } data points." },
        { name: "height", type: "number", default: "240", description: "SVG height in pixels." },
        { name: "width", type: "number", default: "800", description: "SVG viewBox width (scales to container)." },
        { name: "yAxisFormat", type: "(v: number) => string", default: 'v => `$${Math.round(v/1000)}K`', description: "Formatter for Y-axis labels." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<AreaChart
  data={[
    { label: "Jan", value: 74396 },
    { label: "Feb", value: 75820 },
    { label: "Mar", value: 73100 },
  ]}
  height={240}
/>`} />

      <Section title="CandlestickChart" desc="OHLCV candlestick chart with volume bars.">
        <Card>
          <CardHeader title="AAPL" meta="30-day price history" />
          <CandlestickChart data={candles} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "data", type: "Candle[]", required: true, description: "Array of candles. Each has: open, high, low, close (number), vol (number), optional label (string)." },
        { name: "height", type: "number", default: "360", description: "SVG height in pixels." },
        { name: "width", type: "number", default: "800", description: "SVG viewBox width (scales to container)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<CandlestickChart data={candles} height={360} />`} />

      <Section title="BarChart" desc="Bar chart supporting positive and negative values.">
        <Card>
          <CardHeader title="Monthly returns" meta="2025 · %" />
          <BarChart data={monthlyReturns} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "data", type: "{ label: string; value: number }[]", required: true, description: "Array of bar data points. Negative values render below the zero line." },
        { name: "height", type: "number", default: "200", description: "SVG height in pixels." },
        { name: "width", type: "number", default: "800", description: "SVG viewBox width (scales to container)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<BarChart
  data={[
    { label: "Jan", value:  3.2 },
    { label: "Feb", value: -1.8 },
    { label: "Mar", value:  2.4 },
  ]}
/>`} />

      <Section title="WaterfallChart" desc="Waterfall (bridge) chart for cash-flow breakdowns.">
        <Card>
          <CardHeader title="YTD cash-flow" meta="Where the money went" />
          <WaterfallChart steps={waterfall} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "steps", type: "WaterfallStep[]", required: true, description: "Array of steps. Each has label, value, and optional type ('start' | 'add' | 'sub' | 'end')." },
        { name: "height", type: "number", default: "240", description: "SVG height in pixels." },
        { name: "width", type: "number", default: "800", description: "SVG viewBox width (scales to container)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<WaterfallChart
  steps={[
    { label: "Start",  value: 100000, type: "start" },
    { label: "Income", value:  30000, type: "add" },
    { label: "Tax",    value:  -8000, type: "sub" },
    { label: "End",    value:      0, type: "end" },
  ]}
/>`} />

      <Section title="ComparisonChart" desc="Normalized multi-line comparison chart.">
        <Card>
          <CardHeader title="vs. benchmarks" meta="Normalized to 100 · YTD" />
          <ComparisonChart series={comparisonSeries} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "series", type: "ComparisonSeries[]", required: true, description: "Array of series. Each has label (string), values (number[]), and optional color (string)." },
        { name: "height", type: "number", default: "240", description: "SVG height in pixels." },
        { name: "width", type: "number", default: "800", description: "SVG viewBox width (scales to container)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<ComparisonChart
  series={[
    { label: "AAPL", values: [100, 105, 110, 118, 128] },
    { label: "SPY",  values: [100, 101, 103, 106, 110] },
  ]}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "segments", type: "StackedBarSegment[]", required: true, description: "Array of segments. Each has value (number, used as flex proportion) and color (CSS string)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<StackedBar
  segments={[
    { value: 42, color: "#1a1a2e" },
    { value: 18, color: "#4a90d9" },
    { value: 14, color: "#74b9ff" },
  ]}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "cells", type: "TreemapCell[]", required: true, description: "Array of cells. Each has label (ReactNode), color (string), area (CSS grid-area), optional meta (ReactNode) and light (boolean for dark text)." },
        { name: "columns", type: "number", default: "8", description: "Number of grid columns." },
        { name: "rows", type: "number", default: "5", description: "Number of grid rows." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Treemap
  columns={8}
  rows={5}
  cells={[
    { label: "AAPL", meta: "14.2%", color: "#1a1a2e", area: "1 / 1 / 3 / 4" },
    { label: "MSFT", meta: "11.5%", color: "#2d3a8c", area: "1 / 4 / 3 / 7" },
  ]}
/>`} />

      <Section title="SectorHeatmap" desc="Color-coded grid of market sector changes.">
        <Card>
          <CardHeader title="Sector heatmap" meta="Today" />
          <SectorHeatmap cells={sectors} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "cells", type: "SectorCell[]", required: true, description: "Array of sectors. Each has label (string) and change (signed % number)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<SectorHeatmap
  cells={[
    { label: "TECH",   change:  2.4 },
    { label: "ENERGY", change: -1.1 },
    { label: "FIN",    change:  0.4 },
  ]}
/>`} />

      <Section title="CalendarHeatmap" desc="Intensity grid for daily spending or activity.">
        <Card>
          <CardHeader title="Spending intensity" meta="Last 10 weeks" />
          <CalendarHeatmap intensities={heatmapIntensities} columns={14} />
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "intensities", type: "number[]", required: true, description: "Array of intensity values 0–5 for each cell." },
        { name: "columns", type: "number", required: true, description: "Number of columns in the grid (e.g. 7 for days-of-week, 14 for 2-week view)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<CalendarHeatmap
  intensities={dailySpend.map(v => Math.min(5, Math.floor(v / 200)))}
  columns={7}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "value", type: "number", required: true, description: "Gauge fill value from 0 to 100." },
        { name: "label", type: "ReactNode", description: "Text label shown below the numeric value." },
        { name: "size", type: "number", default: "160", description: "Width of the gauge in pixels." },
        { name: "color", type: "string", default: '"var(--data-700)"', description: "CSS color for the filled arc." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Gauge value={68} label="Moderate" size={160} />`} />
    </div>
  );
}
