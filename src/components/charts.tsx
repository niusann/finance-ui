import { ReactNode, useEffect, useState, useId } from "react";
import { colors, dataPalette } from "../tokens";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ═══════════════════════════════════════════════════════
   Sparkline
   ═══════════════════════════════════════════════════════ */
export interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  direction?: "up" | "down" | "flat" | "auto";
  className?: string;
}
export function Sparkline({
  values, width = 120, height = 32, direction = "auto", className,
}: SparklineProps) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values
    .map((v, i) => `${i * stepX},${height - ((v - min) / range) * height}`)
    .join(" ");
  const dir =
    direction === "auto"
      ? values[values.length - 1] > values[0]
        ? "up"
        : values[values.length - 1] < values[0]
        ? "down"
        : "flat"
      : direction;
  return (
    <svg
      className={cn("ui-sparkline", className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width, height }}
    >
      <polyline className={cn("ui-sparkline-line", `ui-sparkline-line--${dir}`)} points={points} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   DonutChart + Legend
   ═══════════════════════════════════════════════════════ */
export interface DonutSegment {
  label: ReactNode;
  value: number;
  color?: string;
  amount?: ReactNode;  // formatted amount displayed in legend
}
export interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  stroke?: number;
  showLegend?: boolean;
  className?: string;
}
export function DonutChart({
  segments, size = 200, stroke = 24, showLegend = true, className,
}: DonutChartProps) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size / 2) - stroke / 2 - 1;
  const cx = size / 2;
  const cy = size / 2;
  const gapDeg = 1.5;

  const [drawn, setDrawn] = useState(0);
  useEffect(() => {
    const timers = segments.map((_, i) =>
      setTimeout(() => setDrawn(d => Math.max(d, i + 1)), 300 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [segments]);

  const polar = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  let startDeg = 0;
  const paths = segments.map((seg, i) => {
    const sweep = (seg.value / total) * 360;
    const endDeg = startDeg + sweep;
    const s = polar(startDeg + gapDeg);
    const e = polar(endDeg - gapDeg);
    const largeArc = sweep > 180 ? 1 : 0;
    const d = `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
    startDeg = endDeg;
    const color = seg.color ?? dataPalette[i % dataPalette.length];
    return (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{ opacity: i < drawn ? 1 : 0, transition: "opacity 400ms ease-out" }}
      />
    );
  });

  const donutSvg = (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth={stroke} />
      {paths}
    </svg>
  );

  if (!showLegend) return donutSvg;

  return (
    <div className={cn("ui-donut-block", className)}>
      {donutSvg}
      <ul className="ui-donut-legend">
        {segments.map((seg, i) => {
          const pct = (seg.value / total) * 100;
          const color = seg.color ?? dataPalette[i % dataPalette.length];
          return (
            <li key={i} className="ui-legend-item">
              <div className="ui-legend-row">
                <span>{seg.label}</span>
                <span>{seg.amount ?? seg.value.toLocaleString()}</span>
              </div>
              <div className="ui-legend-bar">
                <span style={{ width: `${i < drawn ? pct : 0}%`, background: color }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AreaChart
   ═══════════════════════════════════════════════════════ */
export interface AreaPoint { label: string; value: number; }
export interface AreaChartProps {
  data: AreaPoint[];
  height?: number;
  width?: number;
  yAxisFormat?: (v: number) => string;
  className?: string;
}
export function AreaChart({
  data, height = 240, width = 800, yAxisFormat = v => `$${Math.round(v / 1000)}K`, className,
}: AreaChartProps) {
  const gid = useId();
  const padL = 0, padR = 60, padT = 10, padB = 30;
  const values = data.map(d => d.value);
  const minV = Math.min(...values) * 0.97;
  const maxV = Math.max(...values) * 1.01;
  const xStep = (width - padL - padR) / (data.length - 1);
  const tX = (i: number) => padL + i * xStep;
  const tY = (v: number) => padT + (1 - (v - minV) / (maxV - minV)) * (height - padT - padB);

  const pts = data.map((d, i) => `${tX(i)},${tY(d.value)}`).join(" ");
  const areaPath = `M ${tX(0)},${tY(data[0].value)} L ${pts} L ${tX(data.length - 1)},${height - padB} L ${tX(0)},${height - padB} Z`;
  const linePath = `M ${pts.split(" ").join(" L ")}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height, overflow: "visible" }}
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.data[500]} stopOpacity="0.20" />
          <stop offset="100%" stopColor={colors.data[500]} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = padT + t * (height - padT - padB);
        return <line key={t} x1={0} x2={width - padR} y1={y} y2={y} stroke="#F3F4F6" />;
      })}
      <path d={areaPath} fill={`url(#${gid})`} />
      <path
        d={linePath}
        fill="none"
        stroke={colors.data[500]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Y labels */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const v = minV + (1 - t) * (maxV - minV);
        const y = padT + t * (height - padT - padB);
        return (
          <text key={t} x={width - padR + 8} y={y + 4} fontSize="11" fill={colors.text.muted}>
            {yAxisFormat(v)}
          </text>
        );
      })}
      {/* X labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={tX(i)}
          y={height - 4}
          fontSize="11"
          fill={colors.text.muted}
          textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   CandlestickChart (with volume)
   ═══════════════════════════════════════════════════════ */
export interface Candle { open: number; high: number; low: number; close: number; vol: number; label?: string; }
export interface CandlestickChartProps {
  data: Candle[];
  height?: number;
  width?: number;
  className?: string;
}
export function CandlestickChart({
  data, height = 360, width = 800, className,
}: CandlestickChartProps) {
  const padL = 0, padR = 60, padT = 20, padB = 30;
  const volTop = height - padB - 80;
  const volH = 70;
  const priceBottom = volTop - 20;

  const allLow = Math.min(...data.map(c => c.low)) * 0.99;
  const allHigh = Math.max(...data.map(c => c.high)) * 1.01;
  const maxVol = Math.max(...data.map(c => c.vol));
  const cellW = (width - padR) / data.length;
  const cw = cellW * 0.65;

  const xPos = (i: number) => (i + 0.5) * cellW;
  const yPrice = (v: number) =>
    padT + (1 - (v - allLow) / (allHigh - allLow)) * (priceBottom - padT);
  const yVol = (v: number) => volTop + (1 - v / maxVol) * volH;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height }}
      className={className}
    >
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = padT + t * (priceBottom - padT);
        return <line key={t} x1={0} x2={width - padR} y1={y} y2={y} stroke="#F3F4F6" />;
      })}
      {/* Candles */}
      {data.map((c, i) => {
        const x = xPos(i);
        const up = c.close >= c.open;
        const color = up ? colors.data[500] : colors.text.secondary;
        const bodyTop = yPrice(Math.max(c.open, c.close));
        const bodyBot = yPrice(Math.min(c.open, c.close));
        const bodyH = Math.max(1, bodyBot - bodyTop);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={yPrice(c.high)} y2={yPrice(c.low)} stroke={color} strokeWidth={1} />
            <rect x={x - cw / 2} y={bodyTop} width={cw} height={bodyH} fill={color} />
            <rect
              x={x - cw / 2}
              y={yVol(c.vol)}
              width={cw}
              height={volTop + volH - yVol(c.vol)}
              fill={color}
              fillOpacity={up ? 0.55 : 0.45}
            />
          </g>
        );
      })}
      {/* Y labels */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const v = allLow + (1 - t) * (allHigh - allLow);
        const y = padT + t * (priceBottom - padT);
        return (
          <text key={t} x={width - padR + 8} y={y + 4} fontSize="11" fill={colors.text.muted}>
            ${v.toFixed(0)}
          </text>
        );
      })}
      {/* X labels (sparse) */}
      {data.map((c, i) => {
        if (i % Math.max(1, Math.round(data.length / 5)) !== 0) return null;
        return (
          <text
            key={i}
            x={xPos(i)}
            y={height - 4}
            fontSize="11"
            fill={colors.text.muted}
            textAnchor="middle"
          >
            {c.label ?? i + 1}
          </text>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   BarChart (vertical, signed)
   ═══════════════════════════════════════════════════════ */
export interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  width?: number;
  className?: string;
}
export function BarChart({ data, height = 200, width = 800, className }: BarChartProps) {
  const padL = 20, padR = 20, padT = 10, padB = 40;
  const cellW = (width - padL - padR) / data.length;
  const bw = cellW * 0.6;
  const maxAbs = Math.max(...data.map(d => Math.abs(d.value))) || 1;
  const zeroY = padT + (height - padT - padB) / 2;
  const scale = (height - padT - padB) / 2 / maxAbs;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height }}
      className={className}
    >
      <line x1={0} x2={width} y1={zeroY} y2={zeroY} stroke={colors.border.subtle} />
      {data.map((d, i) => {
        const x = padL + i * cellW + cellW / 2 - bw / 2;
        const h = Math.abs(d.value) * scale;
        const up = d.value >= 0;
        const y = up ? zeroY - h : zeroY;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={h}
              fill={up ? colors.data[500] : colors.text.secondary}
              fillOpacity={up ? 1 : 0.65}
            />
            <text
              x={x + bw / 2}
              y={height - 10}
              fontSize="11"
              fill={colors.text.muted}
              textAnchor="middle"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   WaterfallChart
   ═══════════════════════════════════════════════════════ */
export interface WaterfallStep {
  label: string;
  value: number;  // positive = addition, negative = subtraction
  type?: "start" | "add" | "sub" | "end";
}
export interface WaterfallChartProps {
  steps: WaterfallStep[];
  height?: number;
  width?: number;
  className?: string;
}
export function WaterfallChart({ steps, height = 240, width = 800, className }: WaterfallChartProps) {
  const padL = 20, padR = 20, padT = 30, padB = 40;
  const cellW = (width - padL - padR) / steps.length;
  const bw = cellW * 0.55;

  // Compute running totals
  let running = 0;
  const computed = steps.map((s, i) => {
    if (s.type === "start") { running = s.value; return { ...s, top: 0, bottom: s.value }; }
    if (s.type === "end") { return { ...s, top: 0, bottom: running }; }
    const top = running;
    running += s.value;
    return { ...s, top, bottom: running };
  });

  const maxVal = Math.max(...computed.map(c => Math.max(c.top, c.bottom)));
  const minVal = Math.min(...computed.map(c => Math.min(c.top, c.bottom)));
  const range = maxVal - minVal || 1;
  const scaleY = (v: number) =>
    padT + (1 - (v - minVal) / range) * (height - padT - padB);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height }}
      className={className}
    >
      {[0.25, 0.5, 0.75].map(t => {
        const y = padT + t * (height - padT - padB);
        return <line key={t} x1={0} x2={width} y1={y} y2={y} stroke="#F3F4F6" />;
      })}
      {computed.map((s, i) => {
        const x = padL + i * cellW + cellW / 2 - bw / 2;
        const isStartEnd = s.type === "start" || s.type === "end";
        const ya = scaleY(Math.max(s.top, s.bottom));
        const yb = scaleY(Math.min(s.top, s.bottom));
        const h = yb - ya;
        const fill = isStartEnd
          ? colors.text.primary
          : s.value >= 0
          ? colors.data[500]
          : colors.text.secondary;
        const sign = s.value > 0 ? "+" : s.value < 0 ? "-" : "";
        const valueLabel =
          s.type === "start" || s.type === "end"
            ? `$${Math.round(s.bottom / 1000)}K`
            : `${sign}$${Math.round(Math.abs(s.value) / 1000)}K`;

        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={padL + (i - 1) * cellW + cellW / 2 + bw / 2}
                x2={padL + i * cellW + cellW / 2 - bw / 2}
                y1={scaleY(s.top)}
                y2={scaleY(s.top)}
                stroke={colors.border.subtle}
                strokeDasharray="3 3"
              />
            )}
            <rect x={x} y={ya} width={bw} height={Math.max(1, h)} fill={fill} />
            <text x={x + bw / 2} y={ya - 6} fontSize="11" fill={colors.text.primary} textAnchor="middle" fontWeight="600">
              {valueLabel}
            </text>
            <text x={x + bw / 2} y={height - 12} fontSize="11" fill={colors.text.muted} textAnchor="middle">
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   ComparisonChart (multi-line, normalized)
   ═══════════════════════════════════════════════════════ */
export interface ComparisonSeries {
  label: string;
  values: number[];
  color?: string;
}
export interface ComparisonChartProps {
  series: ComparisonSeries[];
  height?: number;
  width?: number;
  className?: string;
}
const SERIES_COLORS = [
  colors.data[900], colors.data[500], colors.accent[500], colors.text.secondary,
];
export function ComparisonChart({ series, height = 240, width = 800, className }: ComparisonChartProps) {
  const allVals = series.flatMap(s => s.values);
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;
  const n = series[0]?.values.length ?? 0;
  const stepX = width / (n - 1);
  const tY = (v: number) => (1 - (v - min) / range) * (height - 40) + 20;

  return (
    <div className={className}>
      <div className="ui-compare-legend" style={{ display: "flex", gap: "var(--space-4)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
        {series.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: colors.text.primary }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length] }} />
            {s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
        {[0.25, 0.5, 0.75].map(t => {
          const y = 20 + t * (height - 40);
          return <line key={t} x1={0} x2={width} y1={y} y2={y} stroke="#F3F4F6" />;
        })}
        {series.map((s, idx) => {
          const points = s.values.map((v, i) => `${i * stepX},${tY(v)}`).join(" ");
          return (
            <polyline
              key={idx}
              points={points}
              fill="none"
              stroke={s.color ?? SERIES_COLORS[idx % SERIES_COLORS.length]}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   StackedBar (horizontal)
   ═══════════════════════════════════════════════════════ */
export interface StackedBarSegment { value: number; color: string; }
export interface StackedBarProps {
  segments: StackedBarSegment[];
  className?: string;
}
export function StackedBar({ segments, className }: StackedBarProps) {
  return (
    <div className={cn("ui-stack-bar", className)}>
      {segments.map((s, i) => (
        <span key={i} style={{ flex: s.value, background: s.color }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Treemap (CSS-grid based; pass placement explicitly)
   ═══════════════════════════════════════════════════════ */
export interface TreemapCell {
  label: ReactNode;
  meta?: ReactNode;       // e.g. "26.3%"
  color: string;
  light?: boolean;        // dark text on light backgrounds
  area: string;           // CSS grid-area "row-start / col-start / row-end / col-end"
}
export interface TreemapProps {
  cells: TreemapCell[];
  columns?: number;
  rows?: number;
  className?: string;
}
export function Treemap({ cells, columns = 8, rows = 5, className }: TreemapProps) {
  return (
    <div
      className={cn("ui-treemap", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={cn("ui-treemap-cell", c.light && "ui-treemap-cell--light")}
          style={{ background: c.color, gridArea: c.area }}
        >
          <span className="ui-treemap-ticker">{c.label}</span>
          {c.meta && <span className="ui-treemap-meta">{c.meta}</span>}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SectorHeatmap
   ═══════════════════════════════════════════════════════ */
export interface SectorCell {
  label: string;
  change: number;   // signed % e.g. 2.4, -1.1
}
export interface SectorHeatmapProps {
  cells: SectorCell[];
  className?: string;
}
function sectorClass(change: number): string {
  if (change > 2)   return "ui-sector-cell--up3";
  if (change > 1)   return "ui-sector-cell--up2";
  if (change > 0.1) return "ui-sector-cell--up1";
  if (change >= -0.1) return "ui-sector-cell--flat";
  if (change > -1)  return "ui-sector-cell--down1";
  if (change > -2)  return "ui-sector-cell--down2";
  return "ui-sector-cell--down3";
}
export function SectorHeatmap({ cells, className }: SectorHeatmapProps) {
  return (
    <div className={cn("ui-sector-heat", className)}>
      {cells.map((c, i) => (
        <div key={i} className={cn("ui-sector-cell", sectorClass(c.change))}>
          <span>{c.label}</span>
          <span>{c.change > 0 ? "+" : ""}{c.change.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CalendarHeatmap (rows×cols, intensity 0-5)
   ═══════════════════════════════════════════════════════ */
export interface CalendarHeatmapProps {
  intensities: number[];     // 0–5 each
  columns: number;
  className?: string;
}
export function CalendarHeatmap({ intensities, columns, className }: CalendarHeatmapProps) {
  return (
    <div
      className={cn("ui-heat", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {intensities.map((lvl, i) => (
        <div key={i} className={cn("ui-heat-cell", lvl > 0 && `ui-heat-cell--l${lvl}`)} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Gauge (half-circle)
   ═══════════════════════════════════════════════════════ */
export interface GaugeProps {
  value: number;   // 0–100
  label?: ReactNode;
  size?: number;
  color?: string;
  className?: string;
}
export function Gauge({ value, label, size = 160, color = colors.data[700], className }: GaugeProps) {
  const arc = 132;  // approximate arc length of M8,50 A42,42 0 0 1 92,50
  const offset = arc * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <div className={cn("ui-gauge", className)} style={{ width: size }}>
      <svg viewBox="0 0 100 56">
        <path
          d="M 8 50 A 42 42 0 0 1 92 50"
          fill="none"
          stroke={colors.border.subtle}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path
          d="M 8 50 A 42 42 0 0 1 92 50"
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="ui-gauge-label">
        <span className="ui-gauge-value">{Math.round(value)}</span>
        {label && <span className="ui-gauge-name">{label}</span>}
      </div>
    </div>
  );
}
