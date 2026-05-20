import { InputHTMLAttributes, ReactNode, useState } from "react";

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

/* ─── DateRange (trigger button only) ─────────────────── */
export interface DateRangeProps {
  label: string;
  onClick?: () => void;
}
export function DateRange({ label, onClick }: DateRangeProps) {
  return (
    <button className="ui-daterange" onClick={onClick}>
      <span>{label}</span>
      <span className="ui-daterange-caret">▾</span>
    </button>
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
  return (
    <nav className={cn("ui-time-range", className)} role="tablist">
      {options.map(opt => (
        <button
          key={opt}
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
  return (
    <div className={cn("ui-tabtoggle", className)} role="tablist">
      {options.map(opt => (
        <button
          key={opt}
          className={value === opt ? "active" : undefined}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── RangeSlider (dual-handle, display only — purely visual) ─ */
export interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  className?: string;
  showLabels?: boolean;
}
export function RangeSlider({ min, max, value, className, showLabels = true }: RangeSliderProps) {
  const [lo, hi] = value;
  const pctLo = ((lo - min) / (max - min)) * 100;
  const pctHi = ((hi - min) / (max - min)) * 100;
  return (
    <div className={cn("ui-rangeslider", className)}>
      <div className="ui-rangeslider-track">
        <div
          className="ui-rangeslider-fill"
          style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
        />
        <div className="ui-rangeslider-handle" style={{ left: `${pctLo}%` }} />
        <div className="ui-rangeslider-handle" style={{ left: `${pctHi}%` }} />
      </div>
      {showLabels && (
        <div className="ui-rangeslider-labels">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      )}
    </div>
  );
}
