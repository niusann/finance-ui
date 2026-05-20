import { ReactNode } from "react";
import { CardHeader } from "./primitives";
import { Progress, TrendBadge } from "./data";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── GoalCard ───────────────────────────────────────── */
export interface GoalCardProps {
  title: ReactNode;
  meta?: ReactNode;
  current: number;
  target: number;
  color?: string;
  footnote?: ReactNode;
  formatValue?: (v: number) => string;
  className?: string;
}
export function GoalCard({
  title, meta, current, target, color, footnote, formatValue, className,
}: GoalCardProps) {
  const pct = Math.round((current / target) * 100);
  const fmt = formatValue ?? ((v: number) => `$${(v / 1000).toFixed(1)}K`);
  return (
    <article className={cn("ui-goal", className)}>
      <CardHeader
        title={title}
        meta={meta}
        amount={
          <>
            {fmt(current)}
            <span style={{ color: "var(--text-muted)", fontWeight: 500, fontSize: "1rem" }}> / {fmt(target)}</span>
          </>
        }
      />
      <Progress value={pct} color={color} />
      {footnote && <p className="ui-goal-foot">{footnote}</p>}
    </article>
  );
}

/* ─── InsightCard ────────────────────────────────────── */
export interface InsightCardProps {
  eyebrow: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
  className?: string;
}
export function InsightCard({ eyebrow, body, actions, className }: InsightCardProps) {
  return (
    <aside className={cn("ui-insight", className)}>
      <span className="ui-insight-eyebrow">{eyebrow}</span>
      <p className="ui-insight-body">{body}</p>
      {actions && <div className="ui-insight-actions">{actions}</div>}
    </aside>
  );
}

/* ─── BudgetMeter ────────────────────────────────────── */
export interface BudgetMeterProps {
  label: ReactNode;
  spent: number;
  budget: number;
  note?: ReactNode;
  className?: string;
}
export function BudgetMeter({ label, spent, budget, note, className }: BudgetMeterProps) {
  const pct = Math.min(100, (spent / budget) * 100);
  const over = spent > budget;
  const color = over
    ? "var(--text-secondary)"
    : pct > 80
    ? "var(--data-700)"
    : "var(--data-500)";
  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
  return (
    <div className={cn("ui-meter", className)}>
      <div className="ui-meter-head">
        <span>{label}</span>
        <span><strong>{fmt(spent)}</strong> / {fmt(budget)}</span>
      </div>
      <Progress value={pct} color={color} />
      {note && <p className="ui-meter-note">{note}</p>}
    </div>
  );
}

/* ─── StockHero ──────────────────────────────────────── */
export interface StockHeroProps {
  name: ReactNode;
  ticker: ReactNode;
  exchange?: ReactNode;
  price: ReactNode;
  changeAmount: number;
  changePercent: number;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
export function StockHero({
  name, ticker, exchange, price, changeAmount, changePercent, meta, actions, className,
}: StockHeroProps) {
  const dir = changeAmount >= 0 ? "up" : "down";
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const sign = changeAmount >= 0 ? "+" : "−";
  return (
    <header className={cn("ui-stock-hero", className)}>
      <div className="ui-stock-top">
        <div>
          <p className="ui-stock-name">{name}</p>
          <h2 className="ui-stock-ticker">
            {ticker}
            {exchange && <span className="ui-stock-exchange">{exchange}</span>}
          </h2>
        </div>
        {actions && <div className="ui-stock-actions">{actions}</div>}
      </div>
      <div className="ui-stock-price-row">
        <span className="ui-stock-last">{price}</span>
        <span className={cn("ui-stock-change", `ui-stock-change--${dir}`)}>
          {sign}{fmt.format(Math.abs(changeAmount))} {dir === "up" ? "↗" : "↘"} {Math.abs(changePercent).toFixed(2)}%
        </span>
        {meta && <span className="ui-stock-meta">{meta}</span>}
      </div>
    </header>
  );
}

/* ─── OrderCard (Buy / Sell) ─────────────────────────── */
export interface OrderCardProps {
  side: "buy" | "sell";
  onSideChange: (s: "buy" | "sell") => void;
  children: ReactNode;
  className?: string;
}
export function OrderCard({ side, onSideChange, children, className }: OrderCardProps) {
  return (
    <aside className={cn("ui-order", className)}>
      <div className="ui-order-toggle">
        <button className={side === "buy" ? "active" : undefined} onClick={() => onSideChange("buy")}>Buy</button>
        <button className={side === "sell" ? "active" : undefined} onClick={() => onSideChange("sell")}>Sell</button>
      </div>
      {children}
    </aside>
  );
}

export interface OrderRowProps {
  label: ReactNode;
  value: ReactNode;
  isTotal?: boolean;
  className?: string;
}
export function OrderRow({ label, value, isTotal, className }: OrderRowProps) {
  return (
    <div className={cn("ui-order-row", isTotal && "ui-order-row--total", className)}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ─── DividendCard ───────────────────────────────────── */
export interface DividendCardProps {
  yield_: number;              // annual % (e.g. 2.84)
  exDate?: ReactNode;
  payDate?: ReactNode;
  perShare?: ReactNode;
  frequency?: ReactNode;
  className?: string;
}
export function DividendCard({
  yield_, exDate, payDate, perShare, frequency, className,
}: DividendCardProps) {
  return (
    <article className={cn("ui-div-card", className)}>
      <p className="ui-div-eyebrow">Dividend</p>
      <div className="ui-div-yield">
        <span className="ui-div-yield-value">{yield_.toFixed(2)}%</span>
        <span className="ui-div-yield-meta">Annual yield</span>
      </div>
      <dl className="ui-div-meta-list">
        {exDate && (<div><dt>Ex-date</dt><dd>{exDate}</dd></div>)}
        {payDate && (<div><dt>Pay date</dt><dd>{payDate}</dd></div>)}
        {perShare && (<div><dt>Per share</dt><dd>{perShare}</dd></div>)}
        {frequency && (<div><dt>Frequency</dt><dd>{frequency}</dd></div>)}
      </dl>
    </article>
  );
}

/* ─── TickerMarquee ──────────────────────────────────── */
export interface TickerItem {
  symbol: string;
  price: string;
  delta: number; // signed %
}
export interface TickerMarqueeProps {
  items: TickerItem[];
  className?: string;
}
export function TickerMarquee({ items, className }: TickerMarqueeProps) {
  // duplicate items to make the marquee loop seamlessly
  const looped = [...items, ...items];
  return (
    <div className={cn("ui-marquee", className)}>
      <div className="ui-marquee-track">
        {looped.map((item, i) => (
          <span key={i} className="ui-marquee-item">
            <strong>{item.symbol}</strong> {item.price}{" "}
            <em className={item.delta >= 0 ? "up" : "down"}>
              {item.delta >= 0 ? "↗" : "↘"} {Math.abs(item.delta).toFixed(2)}%
            </em>
          </span>
        ))}
      </div>
    </div>
  );
}
