import { useMemo } from "react";
import {
  TrendBadge, PLBadge, StatusPill, KPI, KPIMini, Progress, RiskIndicator, DataTable,
  Sparkline, Card, CardHeader,
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

export default function DataDisplay() {
  const sparklineUp = useMemo(() => [10, 12, 11, 14, 16, 15, 18, 20, 19, 22, 24], []);
  const sparklineDown = useMemo(() => [24, 22, 20, 21, 18, 17, 15, 14, 12, 11, 10], []);

  return (
    <div>
      <h1 className="docs-page-title">Data Display</h1>
      <p className="docs-page-subtitle">
        Badges, pills, KPIs, progress bars, and risk indicators for financial data.
      </p>

      <Section title="TrendBadge" desc="Shows a directional percentage change. Down uses gray — never red.">
        <div className="docs-row">
          <TrendBadge delta={2.73} />
          <TrendBadge delta={-0.80} />
          <TrendBadge delta={0} />
          <TrendBadge delta={487.23} format="currency" />
          <TrendBadge delta={-1247.50} format="currency" />
        </div>
      </Section>

      <Section title="PLBadge" desc="Profit/loss badge with amount and percent.">
        <div className="docs-row">
          <PLBadge amount={12840.21} percent={18.4} />
          <PLBadge amount={-1247.50} percent={-3.2} />
          <PLBadge amount={512.40} percent={7.1} />
        </div>
      </Section>

      <Section title="StatusPill" desc="Animated pill for live-updating status labels.">
        <div className="docs-row">
          <StatusPill>Querying financial data</StatusPill>
          <StatusPill>Reviewing subscriptions</StatusPill>
          <StatusPill>Analyzing portfolio</StatusPill>
        </div>
      </Section>

      <Section title="KPI" desc="Large key-performance-indicator tile with trend delta.">
        <div className="docs-grid-4">
          <KPI label="Net worth"   value="$128,450" delta={2.3}  deltaMeta="vs last month" />
          <KPI label="Cash"        value="$14,820"  delta={0.4}  deltaMeta="this week" />
          <KPI label="Investments" value="$96,830"  delta={-1.1} deltaMeta="5-day" />
          <KPI label="Spending"    value="$3,847"   delta={9.7}  deltaMeta="vs Apr" />
        </div>
      </Section>

      <Section title="KPIMini" desc="Compact symbol + sparkline card for watchlist-style grids.">
        <div className="docs-grid-4">
          <KPIMini symbol="AAPL" value="$184.30" delta={1.4}  sparkline={<Sparkline values={sparklineUp}   width={200} height={40} />} />
          <KPIMini symbol="MSFT" value="$407.10" delta={0.6}  sparkline={<Sparkline values={sparklineUp}   width={200} height={40} />} />
          <KPIMini symbol="TSLA" value="$238.40" delta={-2.1} sparkline={<Sparkline values={sparklineDown} width={200} height={40} />} />
          <KPIMini symbol="NVDA" value="$890.15" delta={3.4}  sparkline={<Sparkline values={sparklineUp}   width={200} height={40} />} />
        </div>
      </Section>

      <Section title="Progress" desc="Progress bar — pass a 0–100 value.">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div className="docs-label">Emergency fund — 34%</div>
            <Progress value={34} />
          </div>
          <div>
            <div className="docs-label">Down payment — 57%</div>
            <Progress value={57} color="var(--data-500)" />
          </div>
          <div>
            <div className="docs-label">Vacation savings — 82%</div>
            <Progress value={82} color="var(--accent-500)" />
          </div>
        </div>
      </Section>

      <Section title="RiskIndicator" desc="5-step risk level indicator from Conservative to Aggressive.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div className="docs-label">Level 1 — Conservative</div>
            <RiskIndicator level={1} />
          </div>
          <div>
            <div className="docs-label">Level 3 — Moderate</div>
            <RiskIndicator level={3} />
          </div>
          <div>
            <div className="docs-label">Level 5 — Aggressive</div>
            <RiskIndicator level={5} />
          </div>
        </div>
      </Section>

      <Section title="DataTable" desc="Simple data table with header, rows, and optional footer.">
        <Card>
          <CardHeader title="Savings plan buckets" meta="2026 targets" />
          <DataTable
            columns={[
              { header: "Bucket",  cell: (r: { label: string; target: string; notes: string }) => r.label },
              { header: "Target",  cell: (r: { label: string; target: string; notes: string }) => r.target },
              { header: "Notes",   cell: (r: { label: string; target: string; notes: string }) => r.notes },
            ]}
            rows={[
              { label: "Emergency fund",  target: "$45K",       notes: "6 months expenses" },
              { label: "Down payment",    target: "$80K–$140K", notes: "First home 2027" },
              { label: "Closing costs",   target: "~$20K",      notes: "3% of purchase price" },
              { label: "Retirement top-up", target: "$7K",      notes: "IRA max out" },
            ]}
            footer={["Total needed", "~$155K–$165K", ""]}
          />
        </Card>
      </Section>
    </div>
  );
}
