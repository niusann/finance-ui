import { HTMLAttributes, ReactNode } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── TrendBadge ─────────────────────────────────────── */
export interface TrendBadgeProps {
  delta: number;          // signed value: + up, − down, 0 flat
  format?: "percent" | "currency" | "raw";
  showArrow?: boolean;
  className?: string;
  children?: ReactNode;   // override label entirely
}
export function TrendBadge({ delta, format = "percent", showArrow = true, className, children }: TrendBadgeProps) {
  const dir = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
  const arrow = dir === "up" ? "↗" : dir === "down" ? "↘" : "—";
  const label =
    children ??
    (format === "percent"
      ? `${Math.abs(delta).toFixed(1)}%`
      : format === "currency"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Math.abs(delta))
      : Math.abs(delta).toString());
  return (
    <span className={cn("ui-trend", `ui-trend--${dir}`, className)}>
      {showArrow && <span aria-hidden>{arrow}</span>} {label}
    </span>
  );
}

/* ─── PLBadge (large pill) ───────────────────────────── */
export interface PLBadgeProps {
  amount: number;   // signed currency value
  percent?: number; // signed percentage
  className?: string;
}
export function PLBadge({ amount, percent, className }: PLBadgeProps) {
  const dir = amount >= 0 ? "up" : "down";
  const fmtAmount = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  const sign = amount >= 0 ? "+" : "−";
  return (
    <div className={cn("ui-pl-badge", `ui-pl-badge--${dir}`, className)}>
      <span className="ui-pl-badge--amount">{sign}{fmtAmount}</span>
      {percent !== undefined && (
        <span className="ui-pl-badge--pct">
          {percent >= 0 ? "↗" : "↘"} {Math.abs(percent).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

/* ─── StatusPill (loading status) ────────────────────── */
export interface StatusPillProps {
  children: ReactNode;
  className?: string;
}
export function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span className={cn("ui-status", className)}>
      <span className="ui-status-dot" /> {children}
    </span>
  );
}

/* ─── KPI ────────────────────────────────────────────── */
export interface KPIProps {
  label: ReactNode;
  value: ReactNode;
  delta?: number;        // for trend
  deltaMeta?: ReactNode; // e.g. "vs last month"
  className?: string;
}
export function KPI({ label, value, delta, deltaMeta, className }: KPIProps) {
  const dir = delta === undefined ? null : delta > 0 ? "up" : "down";
  return (
    <div className={cn("ui-kpi", className)}>
      <span className="ui-kpi-label">{label}</span>
      <span className="ui-kpi-value">{value}</span>
      {dir && (
        <span className={cn("ui-kpi-trend", `ui-kpi-trend--${dir}`)}>
          {dir === "up" ? "↗" : "↘"} {Math.abs(delta!).toFixed(1)}%
          {deltaMeta && <span className="ui-kpi-trend-meta">{deltaMeta}</span>}
        </span>
      )}
    </div>
  );
}

/* ─── KPIMini (with embedded sparkline) ──────────────── */
export interface KPIMiniProps {
  symbol: ReactNode;
  value: ReactNode;
  delta: number;        // signed %
  sparkline: ReactNode; // <Sparkline ... />
  className?: string;
}
export function KPIMini({ symbol, value, delta, sparkline, className }: KPIMiniProps) {
  return (
    <div className={cn("ui-kpi-mini", className)}>
      <div className="ui-kpi-mini-head">
        <span className="ui-kpi-mini-symbol">{symbol}</span>
        <TrendBadge delta={delta} />
      </div>
      <span className="ui-kpi-mini-value">{value}</span>
      {sparkline}
    </div>
  );
}

/* ─── Progress ──────────────────────────────────────── */
export interface ProgressProps {
  value: number;        // 0–100
  color?: string;       // CSS color, defaults to data-700
  className?: string;
}
export function Progress({ value, color = "var(--data-700)", className }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("ui-progress", className)}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${v}%`, background: color }} />
    </div>
  );
}

/* ─── RiskIndicator (5-dot) ──────────────────────────── */
export interface RiskIndicatorProps {
  level: 1 | 2 | 3 | 4 | 5;
  label?: ReactNode;
  className?: string;
}
const RISK_LABELS = ["Conservative", "Cautious", "Moderate", "Growth", "Aggressive"];
export function RiskIndicator({ level, label, className }: RiskIndicatorProps) {
  return (
    <div className={cn("ui-risk", className)} aria-label={`Risk level: ${level} of 5`}>
      <span className="ui-risk-dots">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={cn("ui-risk-dot", i <= level && "ui-risk-dot--on")} />
        ))}
      </span>
      <span className="ui-risk-label">{label ?? `${level} of 5 — ${RISK_LABELS[level - 1]}`}</span>
    </div>
  );
}

/* ─── DataTable ──────────────────────────────────────── */
export interface DataTableColumn<T> {
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right";
}
export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  footer?: ReactNode[];   // matching number of columns
  className?: string;
}
export function DataTable<T>({ columns, rows, footer, className }: DataTableProps<T>) {
  return (
    <table className={cn("ui-table", className)}>
      <thead>
        <tr>{columns.map((c, i) => <th key={i}>{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>{columns.map((c, ci) => <td key={ci}>{c.cell(r)}</td>)}</tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>{footer.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
        </tfoot>
      )}
    </table>
  );
}
