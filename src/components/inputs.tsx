import { InputHTMLAttributes, ReactNode, useState, useRef, useLayoutEffect, useEffect } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── Field wrapper ───────────────────────────────────── */
export interface FieldProps {
  label: ReactNode;
  help?: ReactNode;
  error?: boolean;
  children: ReactNode;
  className?: string;
}
export function Field({ label, help, error, children, className }: FieldProps) {
  return (
    <label className={cn("ui-field", error && "ui-field--error", className)}>
      <span className="ui-field-label">{label}</span>
      {children}
      {help && <span className="ui-field-help">{help}</span>}
    </label>
  );
}

/* ─── TextInput ───────────────────────────────────────── */
export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
export function TextInput({ className, ...rest }: TextInputProps) {
  return <input className={cn("ui-input", className)} {...rest} />;
}

/* ─── CurrencyInput ───────────────────────────────────── */
export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: string;
  suffix?: string;
}
export function CurrencyInput({ prefix = "$", suffix, className, ...rest }: CurrencyInputProps) {
  return (
    <div className={cn("ui-currency", className)}>
      <span className="ui-currency-prefix">{prefix}</span>
      <input inputMode="decimal" {...rest} />
      {suffix && <span className="ui-currency-suffix">{suffix}</span>}
    </div>
  );
}

/* ─── SearchBar ───────────────────────────────────────── */
export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}
export function SearchBar({ shortcut = "⌘K", className, ...rest }: SearchBarProps) {
  return (
    <label className={cn("ui-search", className)}>
      <span className="ui-search-icon" aria-hidden>🔍</span>
      <input {...rest} />
      {shortcut && <kbd className="ui-search-shortcut">{shortcut}</kbd>}
    </label>
  );
}

/* ─── FilterChip ──────────────────────────────────────── */
export { Chip as FilterChip } from "./primitives";

/* ─── DateRange ────────────────────────────────────────── */
export interface DateRangeValue {
  start: Date | null;
  end: Date | null;
}
export interface DateRangeProps {
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  placeholder?: string;
  className?: string;
}

function drFmt(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function drSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function drDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }

export function DateRange({ value, onChange, placeholder = "Pick date range", className }: DateRangeProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = value?.start ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [hover, setHover] = useState<Date | null>(null);
  const [phase, setPhase] = useState<"start" | "end">("start");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setPhase("start");
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const start = value?.start ?? null;
  const end = value?.end ?? null;

  const label =
    start && end
      ? `${drFmt(start)} – ${drFmt(end)}`
      : start
      ? `${drFmt(start)} – …`
      : placeholder;

  function handleDay(day: Date) {
    if (phase === "start") {
      onChange?.({ start: day, end: null });
      setPhase("end");
    } else {
      if (start && day < start) {
        onChange?.({ start: day, end: start });
      } else {
        onChange?.({ start, end: day });
      }
      setPhase("start");
      setOpen(false);
    }
  }

  function renderCalendar() {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const firstDow = new Date(y, m, 1).getDay();
    const totalDays = drDaysInMonth(y, m);
    const cells: (Date | null)[] = Array(firstDow).fill(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(y, m, d));
    while (cells.length % 7 !== 0) cells.push(null);

    const today = new Date();
    const effectiveEnd = end ?? (phase === "end" && hover ? hover : null);

    return (
      <div className="ui-cal">
        <div className="ui-cal-head">
          <button className="ui-cal-nav" onClick={() => setViewMonth(new Date(y, m - 1))}>‹</button>
          <span className="ui-cal-title">
            {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button className="ui-cal-nav" onClick={() => setViewMonth(new Date(y, m + 1))}>›</button>
        </div>
        <div className="ui-cal-grid">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(dw => (
            <span key={dw} className="ui-cal-dow">{dw}</span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={`e${i}`} className="ui-cal-empty" />;
            const isStart = !!(start && drSameDay(day, start));
            const isEnd = !!(end && drSameDay(day, end));
            const inRange = !!(start && effectiveEnd && day > start && day < effectiveEnd);
            const isToday = drSameDay(day, today);
            return (
              <button
                key={i}
                className={cn(
                  "ui-cal-day",
                  isStart && "ui-cal-day--start",
                  isEnd && "ui-cal-day--end",
                  (isStart || isEnd) && "ui-cal-day--selected",
                  inRange && "ui-cal-day--in-range",
                  isToday && !isStart && !isEnd && "ui-cal-day--today",
                )}
                onClick={() => handleDay(day)}
                onMouseEnter={() => setHover(day)}
                onMouseLeave={() => setHover(null)}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
        <div className="ui-cal-footer">
          {phase === "start" ? "Select start date" : "Select end date"}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={cn("ui-daterange-wrap", className)}>
      <button
        className="ui-daterange"
        onClick={() => {
          setOpen(o => !o);
          if (!open) setPhase("start");
        }}
      >
        <span>{label}</span>
        <span className="ui-daterange-caret">▾</span>
      </button>
      {open && <div className="ui-cal-popover">{renderCalendar()}</div>}
    </div>
  );
}

/* ─── TimeRange ───────────────────────────────────────── */
export interface TimeRangeProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}
export function TimeRange({ options, value, onChange, className }: TimeRangeProps) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ top: number; left: number; width: number; height: number; animate: boolean } | null>(null);

  useLayoutEffect(() => {
    const idx = options.indexOf(value);
    const btn = btnRefs.current[idx];
    if (!btn) return;
    setPill(prev => ({
      top: btn.offsetTop,
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      height: btn.offsetHeight,
      animate: prev !== null,
    }));
  }, [value, options]);

  return (
    <nav className={cn("ui-time-range", className)} role="tablist">
      {pill && (
        <span
          className="ui-time-range-indicator"
          style={{
            top: pill.top,
            left: pill.left,
            width: pill.width,
            height: pill.height,
            transition: pill.animate
              ? "top var(--motion-fast) var(--ease-out), left var(--motion-fast) var(--ease-out), width var(--motion-fast) var(--ease-out)"
              : "none",
          }}
        />
      )}
      {options.map((opt, i) => (
        <button
          key={opt}
          ref={el => { btnRefs.current[i] = el; }}
          className={value === opt ? "active" : undefined}
          aria-current={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </nav>
  );
}

/* ─── TabToggle ───────────────────────────────────────── */
export interface TabToggleProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}
export function TabToggle({ options, value, onChange, className }: TabToggleProps) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ top: number; left: number; width: number; height: number; animate: boolean } | null>(null);

  useLayoutEffect(() => {
    const idx = options.indexOf(value);
    const btn = btnRefs.current[idx];
    if (!btn) return;
    setPill(prev => ({
      top: btn.offsetTop,
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      height: btn.offsetHeight,
      animate: prev !== null,
    }));
  }, [value, options]);

  return (
    <div className={cn("ui-tabtoggle", className)} role="tablist">
      {pill && (
        <span
          className="ui-tabtoggle-indicator"
          style={{
            top: pill.top,
            left: pill.left,
            width: pill.width,
            height: pill.height,
            transition: pill.animate
              ? "top var(--motion-fast) var(--ease-out), left var(--motion-fast) var(--ease-out), width var(--motion-fast) var(--ease-out)"
              : "none",
          }}
        />
      )}
      {options.map((opt, i) => (
        <button
          key={opt}
          ref={el => { btnRefs.current[i] = el; }}
          className={value === opt ? "active" : undefined}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── RangeSlider (dual-handle, interactive) ──────────── */
export interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
  showLabels?: boolean;
  formatLabel?: (v: number) => string;
}
export function RangeSlider({ min, max, value, onChange, className, showLabels = true, formatLabel }: RangeSliderProps) {
  const [lo, hi] = value;
  const pctLo = ((lo - min) / (max - min)) * 100;
  const pctHi = ((hi - min) / (max - min)) * 100;
  const trackRef = useRef<HTMLDivElement>(null);

  function clientXToValue(clientX: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + pct * (max - min));
  }

  function startDrag(which: "lo" | "hi", e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    function onMove(ev: MouseEvent | TouchEvent) {
      const cx = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
      const v = clientXToValue(cx);
      if (which === "lo") onChange?.([Math.min(v, hi), hi]);
      else onChange?.([lo, Math.max(v, lo)]);
    }
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
  }

  const fmt = formatLabel ?? ((v: number) => `$${v}`);

  return (
    <div className={cn("ui-rangeslider", className)}>
      <div className="ui-rangeslider-track" ref={trackRef}>
        <div className="ui-rangeslider-fill" style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }} />
        <div
          className="ui-rangeslider-handle"
          style={{ left: `${pctLo}%` }}
          onMouseDown={e => startDrag("lo", e)}
          onTouchStart={e => startDrag("lo", e)}
          role="slider"
          aria-valuenow={lo}
          aria-valuemin={min}
          aria-valuemax={hi}
          tabIndex={0}
        />
        <div
          className="ui-rangeslider-handle"
          style={{ left: `${pctHi}%` }}
          onMouseDown={e => startDrag("hi", e)}
          onTouchStart={e => startDrag("hi", e)}
          role="slider"
          aria-valuenow={hi}
          aria-valuemin={lo}
          aria-valuemax={max}
          tabIndex={0}
        />
      </div>
      {showLabels && (
        <div className="ui-rangeslider-labels">
          <span>{fmt(lo)}</span>
          <span>{fmt(hi)}</span>
        </div>
      )}
    </div>
  );
}
