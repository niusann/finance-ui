import { useState } from "react";
import {
  GoalCard, InsightCard, BudgetMeter, StockHero, OrderCard, OrderRow, DividendCard, TickerMarquee,
  Button, Field, TextInput, TabToggle, CandlestickChart, TimeRange,
  colors,
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

const candles = genCandles(30);

const tickerItems = [
  { symbol: "AAPL", price: "$184.30", delta:  1.40 },
  { symbol: "MSFT", price: "$407.10", delta:  0.62 },
  { symbol: "NVDA", price: "$890.15", delta:  3.42 },
  { symbol: "TSLA", price: "$238.40", delta: -2.10 },
  { symbol: "GOOG", price: "$172.85", delta:  0.85 },
  { symbol: "AMZN", price: "$185.20", delta: -0.32 },
  { symbol: "META", price: "$498.30", delta:  1.18 },
  { symbol: "SPY",  price: "$542.10", delta:  0.42 },
];

export default function FeatureCards() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [timeRange, setTimeRange] = useState("1M");
  const [orderType, setOrderType] = useState("Market");

  return (
    <div>
      <h1 className="docs-page-title">Feature Cards</h1>
      <p className="docs-page-subtitle">
        High-level composed cards for goals, insights, budgets, stocks, and orders.
      </p>

      <Section title="GoalCard" desc="Savings goal with progress bar and milestone footnote.">
        <div className="docs-grid-2">
          <GoalCard
            title="Home down payment"
            meta="Target Dec 2025"
            current={11400}
            target={20000}
            color={colors.data[700]}
            footnote={<><strong>57%</strong> · On track to finish <strong>3 months early</strong></>}
          />
          <GoalCard
            title="Emergency fund"
            meta="6 months of expenses"
            current={8100}
            target={24000}
            color={colors.data[500]}
            footnote={<><strong>34%</strong> · Reach goal by <strong>March 2027</strong></>}
          />
        </div>
        <div className="docs-grid-2" style={{ marginTop: 16 }}>
          <GoalCard
            title="Vacation fund"
            meta="Japan trip · Oct 2026"
            current={3200}
            target={5000}
            color={colors.accent[500]}
            footnote={<><strong>64%</strong> · $1,800 more to go</>}
          />
          <GoalCard
            title="New laptop"
            meta="MacBook Pro M4"
            current={2400}
            target={2400}
            color={colors.data[900]}
            footnote={<><strong>100%</strong> · Goal complete!</>}
          />
        </div>
      </Section>

      <Section title="InsightCard" desc="AI-generated suggestion or heads-up with action buttons.">
        <div className="docs-grid-2">
          <InsightCard
            eyebrow="Suggestion"
            body={<>You're paying for <strong>4 fitness memberships</strong>. Canceling unused ones could save <strong>$340/month</strong>.</>}
            actions={
              <>
                <Button size="sm" variant="secondary">Review</Button>
                <Button size="sm" variant="tertiary">Dismiss</Button>
              </>
            }
          />
          <InsightCard
            eyebrow="Heads up"
            body={<>Dining is up <strong>34%</strong> — mostly weekend dinners. Set a softer cap?</>}
            actions={
              <>
                <Button size="sm" variant="secondary">Set cap</Button>
                <Button size="sm" variant="tertiary">Ignore</Button>
              </>
            }
          />
        </div>
      </Section>

      <Section title="BudgetMeter" desc="Budget category with spent vs. limit bar and status note.">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <BudgetMeter label="Groceries"    spent={280} budget={400} note="On track — about $120 left this month." />
          <BudgetMeter label="Dining"       spent={693} budget={600} note="$93 over — consider trimming Sunday dinners." />
          <BudgetMeter label="Transportation" spent={210} budget={350} note="Tracking well below budget." />
          <BudgetMeter label="Subscriptions"  spent={540} budget={500} note="Slightly over — review recurring charges." />
        </div>
      </Section>

      <Section title="TickerMarquee" desc="Scrolling ticker tape with live prices and deltas.">
        <TickerMarquee items={tickerItems} />
      </Section>

      <Section title="StockHero + CandlestickChart" desc="Hero header for a stock detail page.">
        <div>
          <StockHero
            name="Apple Inc."
            ticker="AAPL"
            exchange="NASDAQ · USD"
            price="$184.30"
            changeAmount={2.55}
            changePercent={1.40}
            meta="After hours: $184.62 (+0.17%)"
            actions={
              <>
                <Button variant="secondary">+ Watchlist</Button>
                <Button>Trade</Button>
              </>
            }
          />
          <div style={{ marginBottom: 16 }}>
            <TimeRange options={["1D","1W","1M","3M","6M","1Y","5Y"]} value={timeRange} onChange={setTimeRange} />
          </div>
          <CandlestickChart data={candles} />
        </div>
      </Section>

      <Section title="OrderCard + OrderRow" desc="Trade ticket with buy/sell toggle and order summary rows.">
        <div style={{ maxWidth: 480 }}>
          <OrderCard side={side} onSideChange={setSide}>
            <Field label="Symbol">
              <TextInput defaultValue="AAPL" />
            </Field>
            <Field label="Quantity">
              <TextInput inputMode="decimal" defaultValue="10" />
            </Field>
            <Field label="Order type">
              <TabToggle options={["Market", "Limit", "Stop"]} value={orderType} onChange={setOrderType} />
            </Field>
            <OrderRow label="Last price"   value="$184.30" />
            <OrderRow label="Buying power" value={<span style={{ color: colors.text.muted }}>$12,450.32</span>} />
            <OrderRow label={<strong>Est. cost</strong>} value={<strong>$1,843.00</strong>} isTotal />
            <Button variant={side === "buy" ? "data" : "destructive"} size="lg" block>
              Review {side} order
            </Button>
          </OrderCard>
        </div>
      </Section>

      <Section title="DividendCard" desc="Dividend info card with yield, dates, and frequency.">
        <div style={{ maxWidth: 400 }}>
          <DividendCard
            yield_={2.84}
            exDate="May 10, 2026"
            payDate="May 24, 2026"
            perShare="$0.24"
            frequency="Quarterly"
          />
        </div>
      </Section>
    </div>
  );
}
