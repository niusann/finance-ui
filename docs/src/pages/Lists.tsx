import { useMemo } from "react";
import {
  ListItem, AccountCard, SyncCard, SpendRow, NewsItem, WatchlistRow, HoldingRow, HoldingTableHeader,
  Card, CardHeader, Divider, Sparkline, Button,
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

export default function Lists() {
  const sparklineUp   = useMemo(() => [10, 12, 11, 14, 16, 15, 18, 20, 19, 22, 24], []);
  const sparklineDown = useMemo(() => [24, 22, 20, 21, 18, 17, 15, 14, 12, 11, 10], []);
  const sparklineFlat = useMemo(() => [15, 14, 16, 15, 17, 15, 16, 15, 16, 14, 15], []);

  return (
    <div>
      <h1 className="docs-page-title">Lists</h1>
      <p className="docs-page-subtitle">
        Row-level components for transactions, accounts, holdings, news, and spending.
      </p>

      <Section title="ListItem" desc="Generic icon + name + meta + amount row — used inside Card.">
        <Card>
          <CardHeader title="Portfolio" meta="5 holdings" amount="$102,938.83" />
          <Divider />
          <ListItem icon="A" iconBg={colors.data[900]} name="Apple Inc."  meta="42 shares · NASDAQ"  amount="$7,740" />
          <ListItem icon="M" iconBg={colors.data[700]} name="Microsoft"   meta="18 shares · NASDAQ"  amount="$7,327" />
          <ListItem icon="N" iconBg={colors.data[500]} name="NVIDIA"      meta="22 shares · NASDAQ"  amount="$19,583" />
          <ListItem icon="S" iconBg={colors.accent[500]} name="SPDR S&P 500" meta="80 shares · NYSE" amount="$43,368" />
        </Card>
      </Section>

      <Section title="AccountCard" desc="Account row with logo, name, last-synced meta, and balance.">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <AccountCard logo="CH" logoBg="#003B70" name="Chase Checking"     meta="•• 4521 · 2 min ago"  balance="$12,450.32" />
          <AccountCard logo="AE" logoBg="#005DAA" name="American Express"   meta="•• 1008 · 5 min ago"  balance="−$1,847.50" />
          <AccountCard logo="FD" logoBg={colors.data[700]} name="Fidelity Brokerage" meta="•• 2266 · 1 hr ago" balance="$96,830.41" />
          <AccountCard logo="VG" logoBg="#CC0000" name="Vanguard IRA"       meta="•• 9812 · 3 hr ago"   balance="$42,100.00" />
        </div>
      </Section>

      <Section title="SyncCard" desc="Card displayed while accounts are connecting via Plaid or similar.">
        <div style={{ maxWidth: 540 }}>
          <SyncCard
            tool="Connecting with Plaid"
            rows={[
              { logo: "AE", logoBg: "#005DAA", name: "American Express", meta: "1 account",  status: "syncing" },
              { logo: "BA", logoBg: "#E31837", name: "Bank of America",  meta: "2 accounts", status: "syncing" },
              { logo: "CH", logoBg: "#003B70", name: "Chase",            meta: "2 accounts", status: "done" },
            ]}
          />
        </div>
      </Section>

      <Section title="SpendRow" desc="Spending category row with color swatch and amount.">
        <div>
          <SpendRow color={colors.data[900]} label="Housing"         amount="$1,615" />
          <SpendRow color={colors.data[700]} label="Dining"          amount="$693" />
          <SpendRow color={colors.data[500]} label="Transportation"  amount="$539" />
          <SpendRow color={colors.data[200]} label="Subscriptions"   amount="$385" />
          <SpendRow color={colors.accent[300]} label="Groceries"     amount="$308" />
          <SpendRow color={colors.accent[500]} label="Other"         amount="$307" />
        </div>
      </Section>

      <Section title="NewsItem" desc="News article row with source badge, headline, and optional thumbnail.">
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
          <NewsItem
            source="CN" sourceColor="#e65c00"
            headline="Fed holds rates steady, signals two cuts possible in second half"
            meta="CNBC · 12h ago"
            thumb
          />
        </Card>
      </Section>

      <Section title="WatchlistRow" desc="Symbol row with sparkline, price, and delta.">
        <Card>
          <CardHeader title="Watchlist" meta="5 symbols · live" right={<Button size="sm" variant="tertiary">+ Add</Button>} />
          <WatchlistRow symbol="AAPL" name="Apple Inc."       exchange="NASDAQ" sparkline={<Sparkline values={sparklineUp}   />} price="$184.30" delta={1.4} />
          <WatchlistRow symbol="MSFT" name="Microsoft Corp"   exchange="NASDAQ" sparkline={<Sparkline values={sparklineUp}   />} price="$407.10" delta={0.6} />
          <WatchlistRow symbol="TSLA" name="Tesla Inc."       exchange="NASDAQ" sparkline={<Sparkline values={sparklineDown} />} price="$238.40" delta={-2.1} />
          <WatchlistRow symbol="NVDA" name="NVIDIA Corp"      exchange="NASDAQ" sparkline={<Sparkline values={sparklineUp}   />} price="$890.15" delta={3.4} />
          <WatchlistRow symbol="SPY"  name="SPDR S&P 500 ETF" exchange="NYSE"  sparkline={<Sparkline values={sparklineFlat} />} price="$542.10" delta={0.4} />
        </Card>
      </Section>

      <Section title="HoldingRow + HoldingTableHeader" desc="Holdings table rows with avg cost, value, and P/L.">
        <Card>
          <CardHeader title="Holdings" meta="5 positions" />
          <HoldingTableHeader />
          <HoldingRow symbol="AAPL" name="Apple Inc."    shares="42" avgCost="$172.10" value="$7,740.60"  pl={512.40}   plPercent={7.1} />
          <HoldingRow symbol="MSFT" name="Microsoft"     shares="18" avgCost="$348.20" value="$7,327.80"  pl={1060.20}  plPercent={16.9} />
          <HoldingRow symbol="NVDA" name="NVIDIA"        shares="22" avgCost="$425.10" value="$19,583.30" pl={10231.10} plPercent={109.4} />
          <HoldingRow symbol="TSLA" name="Tesla Inc."    shares="14" avgCost="$262.00" value="$3,337.60"  pl={-330.40}  plPercent={-9.0} />
          <HoldingRow symbol="SPY"  name="SPDR S&P 500"  shares="80" avgCost="$521.30" value="$43,368.00" pl={1664.00}  plPercent={4.0} />
        </Card>
      </Section>
    </div>
  );
}
