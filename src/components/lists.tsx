import { ReactNode } from "react";
import { Spinner } from "./primitives";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── ListItem ───────────────────────────────────────── */
export interface ListItemProps {
  icon: ReactNode;           // initials, emoji, or <img />
  iconBg?: string;
  iconColor?: string;        // text color override
  name: ReactNode;
  meta?: ReactNode;
  amount?: ReactNode;
  onClick?: () => void;
  className?: string;
}
export function ListItem({
  icon, iconBg, iconColor, name, meta, amount, onClick, className,
}: ListItemProps) {
  return (
    <div
      className={cn("ui-list-item", className)}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <div
        className="ui-list-icon"
        style={{ background: iconBg ?? "var(--data-700)", color: iconColor }}
      >
        {icon}
      </div>
      <div className="ui-list-info">
        <span className="ui-list-name">{name}</span>
        {meta && <span className="ui-list-meta">{meta}</span>}
      </div>
      {amount && <span className="ui-list-amount">{amount}</span>}
    </div>
  );
}

/* ─── AccountCard ────────────────────────────────────── */
export interface AccountCardProps {
  logo: ReactNode;       // initials or <img />
  logoBg?: string;
  name: ReactNode;
  meta?: ReactNode;
  balance: ReactNode;
  className?: string;
}
export function AccountCard({
  logo, logoBg = "var(--data-700)", name, meta, balance, className,
}: AccountCardProps) {
  return (
    <article className={cn("ui-account", className)}>
      <div className="ui-account-head">
        <div className="ui-account-logo" style={{ background: logoBg }}>{logo}</div>
        <div>
          <h3 className="ui-account-name">{name}</h3>
          {meta && <p className="ui-account-meta">{meta}</p>}
        </div>
      </div>
      <div className="ui-account-balance">{balance}</div>
    </article>
  );
}

/* ─── SyncCard ───────────────────────────────────────── */
export interface SyncRowProps {
  logo: ReactNode;
  logoBg?: string;
  name: ReactNode;
  meta?: ReactNode;
  status: "syncing" | "done" | "error" | ReactNode;
}
export interface SyncCardProps {
  tool?: ReactNode;      // e.g. "Connecting with Plaid"
  rows: SyncRowProps[];
  className?: string;
}
export function SyncCard({ tool, rows, className }: SyncCardProps) {
  return (
    <article className={cn("ui-card", className)}>
      {tool && (
        <p className="ui-sync-tool">
          <span className="ui-sync-tool-icon">●</span> {tool}
        </p>
      )}
      {rows.map((r, i) => (
        <div className="ui-sync-row" key={i}>
          <div className="ui-sync-logo" style={{ background: r.logoBg ?? "var(--data-700)" }}>{r.logo}</div>
          <div className="ui-sync-info">
            <span className="ui-sync-name">{r.name}</span>
            {r.meta && <span className="ui-sync-meta">{r.meta}</span>}
          </div>
          <span className="ui-sync-status">
            {r.status === "syncing" && (<><Spinner /> Syncing</>)}
            {r.status === "done" && "Synced"}
            {r.status === "error" && "Error"}
            {typeof r.status !== "string" && r.status}
          </span>
        </div>
      ))}
    </article>
  );
}

/* ─── SpendRow (under stacked bar) ───────────────────── */
export interface SpendRowProps {
  color: string;        // CSS color
  label: ReactNode;
  amount: ReactNode;
  className?: string;
}
export function SpendRow({ color, label, amount, className }: SpendRowProps) {
  return (
    <div className={cn("ui-spend-row", className)}>
      <span className="ui-spend-dot" style={{ background: color }} />
      <span className="ui-spend-label">{label}</span>
      <span className="ui-spend-amount">{amount}</span>
    </div>
  );
}

/* ─── NewsItem ───────────────────────────────────────── */
export interface NewsItemProps {
  source: string;        // shown in the logo box
  sourceColor?: string;
  headline: ReactNode;
  meta: ReactNode;
  thumb?: boolean | string;  // true = default gradient, string = CSS background
  className?: string;
}
export function NewsItem({ source, sourceColor = "var(--data-700)", headline, meta, thumb, className }: NewsItemProps) {
  return (
    <article className={cn("ui-news-row", className)}>
      <div className="ui-news-source">
        <div className="ui-news-logo" style={{ background: sourceColor }}>{source}</div>
        <div>
          <p className="ui-news-headline">{headline}</p>
          <p className="ui-news-meta">{meta}</p>
        </div>
      </div>
      {thumb && (
        <div
          className="ui-news-thumb"
          style={typeof thumb === "string" ? { background: thumb } : undefined}
        />
      )}
    </article>
  );
}

/* ─── WatchlistRow ───────────────────────────────────── */
export interface WatchlistRowProps {
  symbol: string;
  name: ReactNode;
  exchange?: ReactNode;
  sparkline: ReactNode;
  price: ReactNode;
  delta: number;          // signed %
  onClick?: () => void;
  className?: string;
}
export function WatchlistRow({
  symbol, name, exchange, sparkline, price, delta, onClick, className,
}: WatchlistRowProps) {
  const dir = delta >= 0 ? "up" : "down";
  return (
    <div
      className={cn("ui-watch-row", className)}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <span className="ui-ticker">{symbol}</span>
      <div className="ui-watch-info">
        <span className="ui-watch-name">{name}</span>
        {exchange && <span className="ui-watch-meta">{exchange}</span>}
      </div>
      {sparkline}
      <div className="ui-watch-price">
        <span className="ui-watch-last">{price}</span>
        <span className={cn("ui-trend", `ui-trend--${dir}`)}>
          {dir === "up" ? "↗" : "↘"} {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

/* ─── HoldingRow ─────────────────────────────────────── */
export interface HoldingRowProps {
  symbol: string;
  name: ReactNode;
  shares: ReactNode;
  avgCost: ReactNode;
  value: ReactNode;
  pl: number;             // signed currency
  plPercent: number;      // signed percent
  className?: string;
}
export function HoldingRow({
  symbol, name, shares, avgCost, value, pl, plPercent, className,
}: HoldingRowProps) {
  const dir = pl >= 0 ? "up" : "down";
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 2,
  });
  const sign = pl >= 0 ? "+" : "−";
  return (
    <div className={cn("ui-hold-row", className)}>
      <div className="ui-hold-symbol">
        <span className="ui-ticker">{symbol}</span>
        <span className="ui-hold-name">{name}</span>
      </div>
      <span className="ui-hold-cell">{shares}</span>
      <span className="ui-hold-cell">{avgCost}</span>
      <span className="ui-hold-cell ui-hold-cell--value">{value}</span>
      <div className="ui-hold-cell ui-hold-pl">
        <span className="ui-watch-last">{sign}{fmt.format(Math.abs(pl))}</span>
        <span className={cn("ui-trend", `ui-trend--${dir}`)}>
          {dir === "up" ? "↗" : "↘"} {Math.abs(plPercent).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export function HoldingTableHeader() {
  return (
    <div className="ui-hold-head">
      <span>Position</span>
      <span>Shares</span>
      <span>Avg cost</span>
      <span>Value</span>
      <span>P / L</span>
    </div>
  );
}
