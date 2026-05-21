import { useMemo, useState } from "react";
import {
  // Primitives
  Button, IconButton, Card, CardHeader, Divider, Avatar, Spinner, Chip,
  // Inputs
  Field, TextInput, CurrencyInput, SearchBar, DateRange, TimeRange, TabToggle, RangeSlider,
  // Data
  TrendBadge, PLBadge, StatusPill, KPI, KPIMini, Progress, RiskIndicator, DataTable,
  // Lists
  ListItem, AccountCard, SyncCard, SpendRow, NewsItem, WatchlistRow, HoldingRow, HoldingTableHeader,
  // Charts
  Sparkline, DonutChart, AreaChart, CandlestickChart, BarChart, WaterfallChart,
  ComparisonChart, StackedBar, Treemap, SectorHeatmap, CalendarHeatmap, Gauge,
  // Feature
  GoalCard, InsightCard, BudgetMeter, StockHero, OrderCard, OrderRow, DividendCard, TickerMarquee,
  // Chat
  UserBubble, AIResponse, AIActions, Composer,
  // Feedback
  EmptyState, Skeleton, Toast, Stepper,
  // Overlays
  Modal, BottomSheet,
  // Navigation
  AppBar, SideNav, TabBar,
  // Tokens
  colors, dataPalette,
} from "./lib";

// ─── Demo data ─────────────────────────────────────────────────
const areaData = [
  { label: "Jan", value: 74396 }, { label: "Feb", value: 75820 },
  { label: "Mar", value: 73100 }, { label: "Apr", value: 77480 },
  { label: "May", value: 80210 }, { label: "Jun", value: 84210 },
];

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

const monthlyReturns = [
  { label: "Jan", value:  3.2 }, { label: "Feb", value: -1.8 },
  { label: "Mar", value:  2.4 }, { label: "Apr", value:  4.0 },
  { label: "May", value: -1.1 }, { label: "Jun", value:  2.8 },
  { label: "Jul", value:  3.7 }, { label: "Aug", value: -2.1 },
  { label: "Sep", value:  2.0 }, { label: "Oct", value:  3.1 },
  { label: "Nov", value: -0.9 }, { label: "Dec", value:  4.2 },
];

const waterfall: Parameters<typeof WaterfallChart>[0]["steps"] = [
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

const tickerItems = [
  { symbol: "AAPL", price: "$184.30", delta: 1.40 },
  { symbol: "MSFT", price: "$407.10", delta: 0.62 },
  { symbol: "NVDA", price: "$890.15", delta: 3.42 },
  { symbol: "TSLA", price: "$238.40", delta: -2.10 },
  { symbol: "GOOG", price: "$172.85", delta: 0.85 },
  { symbol: "AMZN", price: "$185.20", delta: -0.32 },
  { symbol: "META", price: "$498.30", delta: 1.18 },
  { symbol: "SPY",  price: "$542.10", delta: 0.42 },
];

const sectors = [
  { label: "TECH", change: 2.4 },   { label: "COMM",  change: 1.6 },
  { label: "HEALTH", change: 1.2 }, { label: "CONS DISC", change: 0.6 },
  { label: "FIN", change: 0.4 },    { label: "INDUS", change: 0.0 },
  { label: "MATERIALS", change: -0.1 }, { label: "UTIL", change: -0.3 },
  { label: "RE", change: -0.6 },    { label: "ENERGY", change: -1.1 },
];

const heatmapIntensities = Array.from({ length: 70 }, () => Math.floor(Math.random() * 6));

// ─── Section component ────────────────────────────────────────
function Section({
  eyebrow, title, subtitle, children, id,
}: {
  eyebrow: string; title: string; subtitle?: string; children: React.ReactNode; id?: string;
}) {
  return (
    <section id={id} style={{ padding: "80px 0", borderTop: "1px solid var(--border-soft)" }}>
      <header style={{ marginBottom: 40 }}>
        <p style={{ font: "700 0.75rem/1 Inter", letterSpacing: "0.08em", textTransform: "uppercase", color: colors.data[700] }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.01em", margin: "12px 0 0" }}>{title}</h2>
        {subtitle && (
          <p style={{ fontSize: "1.0625rem", color: colors.text.secondary, marginTop: 12, maxWidth: 640 }}>{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  );
}

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ font: "700 0.6875rem/1 Inter", letterSpacing: "0.08em", textTransform: "uppercase", color: colors.text.muted, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Grid({ cols = 2, children, gap = 16 }: { cols?: number; children: React.ReactNode; gap?: number }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      alignItems: "start",
    }}>
      {children}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App({ onDocsClick }: { onDocsClick?: () => void } = {}) {
  const [range, setRange] = useState("YTD");
  const [tab, setTab] = useState("Monthly");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [composerValue, setComposerValue] = useState("");
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(2026, 0, 1),
    end: new Date(2026, 4, 20),
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([140, 400]);

  const sparklineUp = useMemo(() => [10, 12, 11, 14, 16, 15, 18, 20, 19, 22, 24], []);
  const sparklineDown = useMemo(() => [24, 22, 20, 21, 18, 17, 15, 14, 12, 11, 10], []);
  const sparklineFlat = useMemo(() => [15, 14, 16, 15, 17, 15, 16, 15, 16, 14, 15], []);

  return (
    <div>
      {/* ─── App Bar ─── */}
      <AppBar
        brand="◐ finance-ui"
        items={[
          { label: "Overview", href: "#top", active: true },
          { label: "Charts", href: "#charts" },
          { label: "Lists", href: "#lists" },
          { label: "Invest", href: "#invest" },
          { label: "Chat", href: "#chat" },
          ...(onDocsClick ? [{ label: "Docs", onClick: onDocsClick }] : []),
        ]}
        end={
          <>
            <IconButton aria-label="Search">🔍</IconButton>
            <IconButton aria-label="Notifications">🔔</IconButton>
            <Avatar src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23cbd5e1'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%2394a3b8'/%3E%3Cellipse cx='20' cy='36' rx='12' ry='8' fill='%2394a3b8'/%3E%3C/svg%3E" initials="User" />
          </>
        }
      />

      {/* ─── Hero ─── */}
      <section id="top" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
        <div>
          <p style={{ font: "700 0.75rem/1 Inter", letterSpacing: "0.08em", textTransform: "uppercase", color: colors.data[700], marginBottom: 12 }}>
            React component library
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0, maxWidth: 900 }}>
            finance-ui
          </h1>
          <p style={{ fontSize: "1.0625rem", color: colors.text.secondary, marginTop: 20, maxWidth: 600, marginInline: "auto" }}>
            Reusable, typed React components for minimal, data-forward finance products.
            One CSS import, dozens of composable building blocks.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <Button>Get started</Button>
            <Button variant="secondary">View source</Button>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ═══ FOUNDATIONS ═══ */}
        <Section
          eyebrow="A · Tokens"
          title="Color palette"
          subtitle="All components share one set of tokens. Override --data-* and everything rebrands."
        >
          <Grid cols={6} gap={12}>
            {dataPalette.map((c, i) => (
              <div key={i} style={{ background: colors.bg.card, borderRadius: 8, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
                <div style={{ height: 56, background: c }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>data-{900 - i * 200 < 100 ? 100 : 900 - i * 200}</div>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: colors.text.muted }}>{c}</div>
                </div>
              </div>
            ))}
          </Grid>
        </Section>

        {/* ═══ NAVIGATION ═══ */}
        <Section eyebrow="B · Navigation" title="App bar, side nav, mobile tabs">
          <DemoLabel>Top app bar (shown at top of page — live)</DemoLabel>
          <Grid cols={2} gap={24}>
            <div>
              <DemoLabel>Side navigation</DemoLabel>
              <div style={{ border: "1px solid var(--border-subtle)", borderRadius: 16 }}>
                <SideNav
                  items={[
                    { label: "Overview", icon: "◐", active: true },
                    { label: "Transactions", icon: "↔" },
                    { label: "Investments", icon: "◓" },
                    { label: "Goals", icon: "◔" },
                    { label: "Settings", icon: "⚙" },
                  ]}
                />
              </div>
            </div>
            <div>
              <DemoLabel>Mobile bottom tab bar</DemoLabel>
              <div style={{ maxWidth: 360, border: "1px solid var(--border-subtle)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ height: 120, background: colors.bg.soft, display: "grid", placeItems: "center", color: colors.text.muted, fontSize: 14 }}>
                  App screen
                </div>
                <TabBar items={[
                  { icon: "⌂", label: "Home", active: true },
                  { icon: "↔", label: "Activity" },
                  { icon: "◐", label: "Insights" },
                  { icon: "◔", label: "Goals" },
                ]} />
              </div>
            </div>
          </Grid>
        </Section>

        {/* ═══ KPIs ═══ */}
        <Section eyebrow="C · Stats" title="KPI cards & trend badges">
          <DemoLabel>KPI strip</DemoLabel>
          <Grid cols={4}>
            <KPI label="Net worth"    value="$128,450" delta={ 2.3} deltaMeta="vs last month" />
            <KPI label="Cash"         value="$14,820"  delta={ 0.4} deltaMeta="this week" />
            <KPI label="Investments"  value="$96,830"  delta={-1.1} deltaMeta="5-day" />
            <KPI label="Spending"     value="$3,847"   delta={ 9.7} deltaMeta="vs Apr" />
          </Grid>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Trend badges</DemoLabel>
            <div style={{ display: "flex", gap: 24 }}>
              <TrendBadge delta={ 2.73} />
              <TrendBadge delta={-0.80} />
              <TrendBadge delta={ 0} />
              <TrendBadge delta={ 487.23} format="currency" />
            </div>
          </div>
        </Section>

        {/* ═══ FORMS ═══ */}
        <Section eyebrow="D · Forms" title="Buttons, inputs, filters">
          <DemoLabel>Button variants</DemoLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Button>Primary</Button>
            <Button variant="data">Save changes</Button>
            <Button variant="secondary">Skip</Button>
            <Button variant="tertiary">Learn more</Button>
            <Button variant="destructive">Cancel</Button>
          </div>

          <DemoLabel>Button sizes</DemoLabel>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
            <Button size="sm">Small</Button>
            <Button>Regular</Button>
            <Button size="lg">Large</Button>
          </div>

          <DemoLabel>Inputs</DemoLabel>
          <Grid cols={2}>
            <Field label="Email" help="We'll never share this.">
              <TextInput type="email" placeholder="you@example.com" />
            </Field>
            <Field label="Routing number" help="Must be 9 digits." error>
              <TextInput type="text" defaultValue="123" />
            </Field>
            <Field label="Monthly target">
              <CurrencyInput defaultValue="2,500" suffix="USD" />
            </Field>
            <Field label="Search">
              <SearchBar placeholder="Search transactions…" />
            </Field>
          </Grid>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Filter chips & date range</DemoLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <Chip onRemove={() => {}}>Dining</Chip>
              <Chip onRemove={() => {}}>Travel</Chip>
              <Chip onRemove={() => {}}>Last 30 days</Chip>
              <Chip>Recurring</Chip>
            </div>
            <DateRange value={dateRange} onChange={setDateRange} />
          </div>
        </Section>

        {/* ═══ CARDS & LISTS ═══ */}
        <Section id="lists" eyebrow="E · Containers & lists" title="Cards, accounts, lists">
          <Grid cols={2}>
            <Card>
              <CardHeader title="Portfolio distribution" meta="5 holdings across 3 accounts" amount="$102,938.83" />
              <Divider />
              <ListItem icon="A" iconBg={colors.data[900]} name="Apple Inc." meta="42 shares · NASDAQ" amount="$7,740" />
              <ListItem icon="M" iconBg={colors.data[700]} name="Microsoft" meta="18 shares · NASDAQ" amount="$7,327" />
              <ListItem icon="N" iconBg={colors.data[500]} name="NVIDIA"    meta="22 shares · NASDAQ" amount="$19,583" />
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <AccountCard logo="CH" logoBg="#003B70" name="Chase Checking" meta="•• 4521 · 2 min ago" balance="$12,450.32" />
              <AccountCard logo="AE" logoBg="#005DAA" name="American Express" meta="•• 1008 · 5 min ago" balance="−$1,847.50" />
              <AccountCard logo="FD" logoBg={colors.data[700]} name="Fidelity Brokerage" meta="•• 2266 · 1 hr ago" balance="$96,830.41" />
            </div>
          </Grid>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Sync card (with tool indicator)</DemoLabel>
            <div style={{ maxWidth: 540 }}>
              <SyncCard
                tool="Connecting with Plaid"
                rows={[
                  { logo: "AE", logoBg: "#005DAA", name: "American Express", meta: "1 account", status: "syncing" },
                  { logo: "BA", logoBg: "#E31837", name: "Bank of America", meta: "2 accounts", status: "syncing" },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ═══ CHARTS ═══ */}
        <Section id="charts" eyebrow="F · Data viz" title="Charts">
          <Grid cols={2}>
            <Card>
              <CardHeader title="Portfolio distribution" meta="5 holdings" amount="$102,938" />
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

            <Card>
              <CardHeader
                title="Net worth"
                meta="All accounts"
                amount="$84,210"
                right={<TrendBadge delta={13.2} />}
              />
              <div style={{ marginBottom: 16 }}>
                <TimeRange
                  options={["1M", "3M", "YTD", "1Y", "5Y"]}
                  value={range}
                  onChange={setRange}
                />
              </div>
              <AreaChart data={areaData} />
            </Card>
          </Grid>

          <div style={{ marginTop: 24 }}>
            <Card>
              <CardHeader title="Spending by category" amount="$3,847"
                          right={<div style={{ marginTop: 8 }}><TabToggle options={["Monthly", "Annual"]} value={tab} onChange={setTab} /></div>} />
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
              <div style={{ marginTop: 20 }}>
                <SpendRow color={colors.data[900]} label="Housing"         amount="$1,615" />
                <SpendRow color={colors.data[700]} label="Dining"          amount="$693" />
                <SpendRow color={colors.data[500]} label="Transportation" amount="$539" />
                <SpendRow color={colors.data[200]} label="Subscriptions"   amount="$385" />
                <SpendRow color={colors.accent[300]} label="Groceries"      amount="$308" />
                <SpendRow color={colors.accent[500]} label="Other"          amount="$307" />
              </div>
            </Card>
          </div>

          <div style={{ marginTop: 24 }}>
            <DemoLabel>Spending intensity (calendar heatmap)</DemoLabel>
            <Card>
              <CalendarHeatmap intensities={heatmapIntensities} columns={14} />
            </Card>
          </div>
        </Section>

        {/* ═══ GOALS / INSIGHTS / BUDGET ═══ */}
        <Section eyebrow="G · Goals & insights" title="Progress, suggestions, budgets">
          <Grid cols={2}>
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
          </Grid>

          <div style={{ marginTop: 24 }}>
            <Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <BudgetMeter label="Groceries"    spent={280} budget={400} note="On track — about $120 left this month." />
                <BudgetMeter label="Dining"       spent={693} budget={600} note="$93 over — consider trimming Sunday dinners." />
                <BudgetMeter label="Transportation" spent={210} budget={350} note="Tracking well below budget." />
              </div>
            </Card>
          </div>

          <div style={{ marginTop: 24 }}>
            <Grid cols={2}>
              <InsightCard
                eyebrow="Suggestion"
                body={<>You're paying for <strong>4 fitness memberships</strong>. Canceling unused ones could save <strong>$340/month</strong>.</>}
                actions={<><Button size="sm" variant="secondary">Review</Button><Button size="sm" variant="tertiary">Dismiss</Button></>}
              />
              <InsightCard
                eyebrow="Heads up"
                body={<>Dining is up <strong>34%</strong> — mostly weekend dinners. Set a softer cap?</>}
                actions={<><Button size="sm" variant="secondary">Set cap</Button><Button size="sm" variant="tertiary">Ignore</Button></>}
              />
            </Grid>
          </div>
        </Section>

        {/* ═══ LONG FORM ═══ */}
        <Section eyebrow="H · Long-form" title="Tables, status, structured content">
          <Card>
            <DataTable
              columns={[
                { header: "Bucket", cell: (r: any) => r.label },
                { header: "Target", cell: (r: any) => r.target },
              ]}
              rows={[
                { label: "Emergency fund",  target: "$45K" },
                { label: "Down payment",    target: "$80K–$140K" },
                { label: "Closing/repairs", target: "~$20K" },
              ]}
              footer={["Total needed", "~$155K–$165K"]}
            />
            <div style={{ marginTop: 24 }}>
              <StatusPill>Querying financial data</StatusPill>
            </div>
          </Card>
        </Section>

        {/* ═══ CHAT ═══ */}
        <Section id="chat" eyebrow="I · Chat" title="Conversation surface">
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
            <UserBubble>Am I paying for subscriptions I don't need?</UserBubble>

            <AIResponse>
              <StatusPill>Reviewing subscriptions</StatusPill>
              <p style={{ marginTop: 16 }}>I can see you're paying for <strong>4 fitness memberships</strong> across three providers — about <strong>$537/month</strong> total.</p>
            </AIResponse>

            <Card variant="compact">
              <CardHeader title="Subscriptions" amount="$630" right={<div style={{ marginTop: 8 }}><TabToggle options={["Monthly", "Annual"]} value="Monthly" onChange={() => {}} /></div>} />
              <Divider />
              <ListItem icon="PP" iconBg="#0A0A0A"    name="Pilates Pirates" meta="Monthly · June 4"  amount="$200.00" />
              <ListItem icon="L"  iconBg={colors.data[500]} name="Luke's Local Gym" meta="Monthly · June 10" amount="$33.00" />
              <ListItem icon="🌸" iconBg="#F8BBD0" iconColor={colors.text.primary} name="Go-Go Yoga" meta="Monthly · June 10" amount="$129.00" />
              <ListItem icon="B"  iconBg="#7E57C2"   name="Bend & Snap Studios" meta="Monthly · June 10" amount="$175.00" />
            </Card>

            <AIResponse>
              <p>Canceling your yoga and pilates memberships would save <strong>$329/month</strong> — about <strong>$3,948/year</strong>.</p>
            </AIResponse>

            <AIActions
              onCopy={() => {}}
              onLike={() => {}}
              onDislike={() => {}}
              onRegenerate={() => {}}
              onShare={() => {}}
            />

            <Composer
              placeholder="Ask anything about your finances…"
              value={composerValue}
              onValueChange={setComposerValue}
              onSubmit={() => { console.log("submit:", composerValue); setComposerValue(""); }}
            />
          </div>
        </Section>

        {/* ═══ FEEDBACK ═══ */}
        <Section eyebrow="J · Feedback" title="Empty, loading, success">
          <Grid cols={2}>
            <EmptyState
              title="No transactions yet"
              body="Connect an account to start seeing your money flow in real time."
              action={<Button>Connect account</Button>}
            />
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Skeleton variant="circle" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <Skeleton variant="line-lg" width="60%" />
                  <Skeleton variant="line" width="40%" />
                </div>
              </div>
              <Skeleton variant="line-lg" width="80%" />
              <div style={{ marginTop: 8 }}><Skeleton variant="line" width="100%" /></div>
              <div style={{ marginTop: 8 }}><Skeleton variant="line" width="70%" /></div>
            </Card>
          </Grid>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Toasts</DemoLabel>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Toast onClose={() => {}}>Account connected.</Toast>
              <Toast type="warning" onClose={() => {}}>Sync paused — reconnect required.</Toast>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Stepper</DemoLabel>
            <Stepper steps={["Connect accounts", "Pick goals", "Set budget", "Review"]} current={2} />
          </div>
        </Section>

        {/* ═══ OVERLAYS ═══ */}
        <Section eyebrow="K · Overlays" title="Modals & sheets">
          <div style={{ display: "flex", gap: 12 }}>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open bottom sheet</Button>
          </div>
        </Section>

        {/* ═══ INVESTMENTS ═══ */}
        <Section id="invest" eyebrow="L · Investments" title="Stocks, watchlist, candlesticks"
                 subtitle="Down values use gray, never red — keeps the palette calm.">

          <DemoLabel>Stock ticker marquee</DemoLabel>
          <TickerMarquee items={tickerItems} />

          <div style={{ marginTop: 32 }}>
            <Card>
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
                <TimeRange options={["1D","1W","1M","3M","6M","1Y","5Y"]} value="1M" onChange={() => {}} />
              </div>
              <CandlestickChart data={candles} />
            </Card>
          </div>

          <div style={{ marginTop: 32 }}>
            <DemoLabel>Mini KPI cards with sparklines</DemoLabel>
            <Grid cols={4}>
              <KPIMini symbol="AAPL" value="$184.30" delta={ 1.4} sparkline={<Sparkline values={sparklineUp} width={200} height={40} />} />
              <KPIMini symbol="MSFT" value="$407.10" delta={ 0.6} sparkline={<Sparkline values={sparklineUp} width={200} height={40} />} />
              <KPIMini symbol="TSLA" value="$238.40" delta={-2.1} sparkline={<Sparkline values={sparklineDown} width={200} height={40} />} />
              <KPIMini symbol="NVDA" value="$890.15" delta={ 3.4} sparkline={<Sparkline values={sparklineUp} width={200} height={40} />} />
            </Grid>
          </div>

          <div style={{ marginTop: 32 }}>
            <Grid cols={2}>
              <Card>
                <CardHeader title="Watchlist" meta="5 symbols · live"
                            right={<Button size="sm" variant="tertiary">+ Add</Button>} />
                <WatchlistRow symbol="AAPL" name="Apple Inc." exchange="NASDAQ"
                  sparkline={<Sparkline values={sparklineUp} />} price="$184.30" delta={1.4} />
                <WatchlistRow symbol="MSFT" name="Microsoft Corp" exchange="NASDAQ"
                  sparkline={<Sparkline values={sparklineUp} />} price="$407.10" delta={0.6} />
                <WatchlistRow symbol="TSLA" name="Tesla Inc." exchange="NASDAQ"
                  sparkline={<Sparkline values={sparklineDown} />} price="$238.40" delta={-2.1} />
                <WatchlistRow symbol="NVDA" name="NVIDIA Corp" exchange="NASDAQ"
                  sparkline={<Sparkline values={sparklineUp} />} price="$890.15" delta={3.4} />
                <WatchlistRow symbol="SPY"  name="SPDR S&P 500 ETF" exchange="NYSE"
                  sparkline={<Sparkline values={sparklineFlat} />} price="$542.10" delta={0.4} />
              </Card>

              <Card>
                <CardHeader title="Holdings" meta="5 positions"
                            right={<PLBadge amount={12840.21} percent={18.4} />} />
                <HoldingTableHeader />
                <HoldingRow symbol="AAPL" name="Apple Inc." shares="42" avgCost="$172.10" value="$7,740.60"  pl={ 512.40}    plPercent={ 7.1} />
                <HoldingRow symbol="MSFT" name="Microsoft"  shares="18" avgCost="$348.20" value="$7,327.80"  pl={1060.20}   plPercent={16.9} />
                <HoldingRow symbol="NVDA" name="NVIDIA"     shares="22" avgCost="$425.10" value="$19,583.30" pl={10231.10}  plPercent={109.4} />
                <HoldingRow symbol="TSLA" name="Tesla Inc." shares="14" avgCost="$262.00" value="$3,337.60"  pl={-330.40}   plPercent={-9.0} />
                <HoldingRow symbol="SPY"  name="SPDR S&P 500" shares="80" avgCost="$521.30" value="$43,368.00" pl={1664.00} plPercent={ 4.0} />
              </Card>
            </Grid>
          </div>

          <div style={{ marginTop: 32 }}>
            <Grid cols={2}>
              <Card>
                <CardHeader title="vs. benchmarks" meta="Normalized to 100 · YTD" />
                <ComparisonChart series={comparisonSeries} />
              </Card>

              <OrderCard side={side} onSideChange={setSide}>
                <Field label="Symbol">
                  <TextInput defaultValue="AAPL" />
                </Field>
                <Field label="Quantity">
                  <TextInput inputMode="decimal" defaultValue="10" />
                </Field>
                <Field label="Order type">
                  <TabToggle options={["Market", "Limit", "Stop"]} value="Market" onChange={() => {}} />
                </Field>
                <OrderRow label="Last price"    value="$184.30" />
                <OrderRow label="Buying power"  value={<span style={{ color: colors.text.muted }}>$12,450.32</span>} />
                <OrderRow label={<strong>Est. cost</strong>} value={<strong>$1,843.00</strong>} isTotal />
                <Button variant={side === "buy" ? "data" : "destructive"} size="lg" block>
                  Review {side} order
                </Button>
              </OrderCard>
            </Grid>
          </div>

          <div style={{ marginTop: 32 }}>
            <Grid cols={2}>
              <Card>
                <CardHeader title="Monthly returns" meta="2025 · %" />
                <BarChart data={monthlyReturns} />
              </Card>
              <Card>
                <CardHeader title="YTD cash-flow" meta="Where the money went" />
                <WaterfallChart steps={waterfall} />
              </Card>
            </Grid>
          </div>

          <div style={{ marginTop: 32 }}>
            <Card>
              <CardHeader title="Allocation treemap" meta="Cells sized by value" />
              <Treemap
                cells={[
                  { label: "NVDA",  meta: "26.3%", color: colors.data[900], area: "1 / 1 / 4 / 4" },
                  { label: "SPY",   meta: "17.8%", color: colors.data[700], area: "1 / 4 / 3 / 6" },
                  { label: "AAPL",  meta: "14.2%", color: colors.data[500], area: "1 / 6 / 3 / 8" },
                  { label: "BND",   meta:  "3.4%", color: colors.accent[500], area: "1 / 8 / 3 / 9" },
                  { label: "MSFT",  meta: "11.5%", color: colors.data[400], area: "4 / 1 / 6 / 3" },
                  { label: "GOOG",  meta:  "9.8%", color: colors.data[400], area: "4 / 3 / 6 / 5" },
                  { label: "QQQ",   meta:  "8.4%", color: colors.data[200], area: "3 / 4 / 6 / 7", light: true },
                  { label: "TSLA",  meta:  "6.2%", color: colors.data[100], area: "3 / 7 / 5 / 9", light: true },
                  { label: "CASH",  meta:  "2.4%", color: colors.accent[200], area: "5 / 7 / 6 / 9", light: true },
                ]}
              />
            </Card>
          </div>

          <div style={{ marginTop: 32 }}>
            <Grid cols={2}>
              <Card>
                <CardHeader title="Sector heatmap" meta="Today" />
                <SectorHeatmap cells={sectors} />
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Card>
                  <CardHeader title="Risk score" meta="Portfolio assessment" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
                    <Gauge value={68} label="Moderate" />
                    <RiskIndicator level={3} />
                  </div>
                </Card>
                <DividendCard
                  yield_={2.84}
                  exDate="May 10, 2026"
                  payDate="May 24, 2026"
                  perShare="$0.24"
                  frequency="Quarterly"
                />
              </div>
            </Grid>
          </div>

          <div style={{ marginTop: 32 }}>
            <Grid cols={2}>
              <Card>
                <CardHeader title="Related news" meta="Last 24 hours" />
                <NewsItem
                  source="WSJ" sourceColor="#0A0A0A"
                  headline="Apple beats Q2 earnings on services strength, raises guidance"
                  meta="Wall Street Journal · 2h ago"
                  thumb
                />
                <NewsItem
                  source="BB" sourceColor={colors.accent[500]}
                  headline="Tech stocks rally as Fed signals possible rate cut by year-end"
                  meta="Bloomberg · 5h ago"
                  thumb={`linear-gradient(135deg, ${colors.accent[200]}, ${colors.accent[500]})`}
                />
                <NewsItem
                  source="FT" sourceColor={colors.data[900]}
                  headline="NVIDIA's AI dominance shows no signs of slowing — quarterly preview"
                  meta="Financial Times · 8h ago"
                />
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Card>
                  <CardHeader title="Filter by price" meta="Drag handles to set range" />
                  <RangeSlider min={50} max={500} value={priceRange} onChange={setPriceRange} />
                  <p style={{ fontSize: 14, color: colors.text.secondary, marginTop: 12 }}>
                    Showing stocks priced <strong style={{ color: colors.text.primary }}>${priceRange[0]} – ${priceRange[1]}</strong>
                  </p>
                </Card>
                <Card>
                  <CardHeader title="P/L badges" meta="Both states" />
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <PLBadge amount={ 12840.21} percent={ 18.4} />
                    <PLBadge amount={ -1247.50} percent={ -3.2} />
                  </div>
                </Card>
              </div>
            </Grid>
          </div>

        </Section>

      </main>

      {/* ─── Overlays ─── */}
      <Modal
        open={modalOpen}
        title="Cancel subscription"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="tertiary" onClick={() => setModalOpen(false)}>Keep it</Button>
            <Button onClick={() => setModalOpen(false)}>Cancel anyway</Button>
          </>
        }
      >
        You'll lose access at the end of the current billing cycle (Jun 30). Future renewals won't be charged.
      </Modal>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: 16 }}>Add to budget</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Category">
            <TextInput defaultValue="Dining" />
          </Field>
          <Field label="Limit">
            <CurrencyInput defaultValue="600" suffix="/mo" />
          </Field>
          <Button block onClick={() => setSheetOpen(false)}>Save</Button>
        </div>
      </BottomSheet>

      {/* ─── Footer disclaimer ─── */}
      <p style={{ textAlign: "center", color: colors.text.muted, fontSize: "0.8125rem", padding: "48px 24px" }}>
        finance-ui · React component library · No financial advice.
      </p>
    </div>
  );
}
