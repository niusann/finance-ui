import { useState } from "react";
import {
  GoalCard, InsightCard, BudgetMeter, StockHero, OrderCard, OrderRow, DividendCard, TickerMarquee,
  Button, Field, TextInput, TabToggle, CandlestickChart, TimeRange,
  colors,
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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "title", type: "ReactNode", required: true, description: "Goal title (e.g. 'Home down payment')." },
        { name: "current", type: "number", required: true, description: "Current saved amount." },
        { name: "target", type: "number", required: true, description: "Target amount to reach." },
        { name: "meta", type: "ReactNode", description: "Subtitle shown below the title (e.g. target date)." },
        { name: "color", type: "string", description: "CSS color for the progress bar fill." },
        { name: "footnote", type: "ReactNode", description: "Small text below the progress bar (e.g. completion estimate)." },
        { name: "formatValue", type: "(v: number) => string", description: 'Custom value formatter. Defaults to `$XX.XK`.' },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<GoalCard
  title="Home down payment"
  meta="Target Dec 2025"
  current={11400}
  target={20000}
  color="var(--data-700)"
  footnote={<>57% · On track</>}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "eyebrow", type: "ReactNode", required: true, description: "Small label above the body (e.g. 'Suggestion', 'Heads up')." },
        { name: "body", type: "ReactNode", required: true, description: "Main insight content." },
        { name: "actions", type: "ReactNode", description: "Action buttons rendered at the bottom of the card." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<InsightCard
  eyebrow="Suggestion"
  body="You could save $340/month by canceling unused memberships."
  actions={
    <>
      <Button size="sm" variant="secondary">Review</Button>
      <Button size="sm" variant="tertiary">Dismiss</Button>
    </>
  }
/>`} />

      <Section title="BudgetMeter" desc="Budget category with spent vs. limit bar and status note.">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <BudgetMeter label="Groceries"    spent={280} budget={400} note="On track — about $120 left this month." />
          <BudgetMeter label="Dining"       spent={693} budget={600} note="$93 over — consider trimming Sunday dinners." />
          <BudgetMeter label="Transportation" spent={210} budget={350} note="Tracking well below budget." />
          <BudgetMeter label="Subscriptions"  spent={540} budget={500} note="Slightly over — review recurring charges." />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "label", type: "ReactNode", required: true, description: "Budget category name." },
        { name: "spent", type: "number", required: true, description: "Amount spent so far." },
        { name: "budget", type: "number", required: true, description: "Budget limit for the period." },
        { name: "note", type: "ReactNode", description: "Status note shown below the progress bar." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<BudgetMeter
  label="Dining"
  spent={693}
  budget={600}
  note="$93 over budget this month."
/>`} />

      <Section title="TickerMarquee" desc="Scrolling ticker tape with live prices and deltas.">
        <TickerMarquee items={tickerItems} />
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "items", type: "TickerItem[]", required: true, description: "Array of ticker items. Each has symbol (string), price (string), and delta (signed % number)." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<TickerMarquee
  items={[
    { symbol: "AAPL", price: "$184.30", delta:  1.40 },
    { symbol: "MSFT", price: "$407.10", delta:  0.62 },
    { symbol: "TSLA", price: "$238.40", delta: -2.10 },
  ]}
/>`} />

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
      <div className="docs-subsection-label">Props — StockHero</div>
      <ApiTable props={[
        { name: "name", type: "ReactNode", required: true, description: "Company or security name." },
        { name: "ticker", type: "ReactNode", required: true, description: "Ticker symbol displayed prominently." },
        { name: "price", type: "ReactNode", required: true, description: "Formatted last price." },
        { name: "changeAmount", type: "number", required: true, description: "Signed price change amount." },
        { name: "changePercent", type: "number", required: true, description: "Signed percentage change." },
        { name: "exchange", type: "ReactNode", description: "Exchange name shown next to the ticker." },
        { name: "meta", type: "ReactNode", description: "Additional info (e.g. after-hours price)." },
        { name: "actions", type: "ReactNode", description: "Action buttons rendered in the top-right corner." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<StockHero
  name="Apple Inc."
  ticker="AAPL"
  exchange="NASDAQ · USD"
  price="$184.30"
  changeAmount={2.55}
  changePercent={1.40}
  actions={<Button>Trade</Button>}
/>`} />

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
      <div className="docs-subsection-label">Props — OrderCard</div>
      <ApiTable props={[
        { name: "side", type: '"buy" | "sell"', required: true, description: "Currently active side of the trade." },
        { name: "onSideChange", type: "(s: 'buy' | 'sell') => void", required: true, description: "Callback when the user switches side." },
        { name: "children", type: "ReactNode", required: true, description: "Form fields and OrderRow elements inside the card." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Props — OrderRow</div>
      <ApiTable props={[
        { name: "label", type: "ReactNode", required: true, description: "Left-side label for the row." },
        { name: "value", type: "ReactNode", required: true, description: "Right-side value for the row." },
        { name: "isTotal", type: "boolean", description: "When true, applies bold total styling." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<OrderCard side={side} onSideChange={setSide}>
  <Field label="Symbol"><TextInput defaultValue="AAPL" /></Field>
  <OrderRow label="Last price" value="$184.30" />
  <OrderRow label="Est. cost"  value="$1,843.00" isTotal />
  <Button variant="data" block>Review buy order</Button>
</OrderCard>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "yield_", type: "number", required: true, description: "Annual dividend yield percentage (e.g. 2.84 for 2.84%)." },
        { name: "exDate", type: "ReactNode", description: "Ex-dividend date." },
        { name: "payDate", type: "ReactNode", description: "Payment date." },
        { name: "perShare", type: "ReactNode", description: "Dividend amount per share." },
        { name: "frequency", type: "ReactNode", description: "Payment frequency (e.g. 'Quarterly', 'Monthly')." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<DividendCard
  yield_={2.84}
  exDate="May 10, 2026"
  payDate="May 24, 2026"
  perShare="$0.24"
  frequency="Quarterly"
/>`} />
    </div>
  );
}
