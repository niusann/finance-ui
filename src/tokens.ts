/**
 * Design tokens — JS constants mirroring the CSS variables in styles.css.
 * Import these when you need a color in JS/SVG (e.g., for chart strokes).
 */

export const colors = {
  bg: { page: "#FFFFFF", card: "#FFFFFF", soft: "#F3F4F6", subtle: "#FAFAFA" },
  data: {
    900: "#1B5E20",
    700: "#2E7D32",
    500: "#4CAF50",
    400: "#66BB6A",
    300: "#81C784",
    200: "#A5D6A7",
    100: "#C8E6C9",
  },
  accent: { 500: "#2196F3", 300: "#64B5F6", 200: "#90CAF9", 100: "#BBDEFB" },
  text: {
    primary: "#0A0A0A",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    positive: "#2E7D32",
  },
  border: { subtle: "#E5E7EB", soft: "#F3F4F6" },
  btn: { dark: "#0A0A0A", darkHover: "#1A1A1A", light: "#F3F4F6" },
} as const;

export const radius = {
  sm: 4, md: 8, lg: 12, card: 16, xl: 20, pill: 9999,
} as const;

export const space = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80,
} as const;

export const motion = {
  fast: 150, normal: 300, slow: 500, chart: 800,
  ease: { out: "cubic-bezier(0.16, 1, 0.3, 1)", standard: "cubic-bezier(0.4, 0, 0.2, 1)" },
} as const;

/** Data palette as ordered array — for charts that need shades by index. */
export const dataPalette = [
  colors.data[900],
  colors.data[700],
  colors.data[500],
  colors.data[400],
  colors.data[200],
] as const;

export const accentPalette = [
  colors.accent[500],
  colors.accent[300],
  colors.accent[200],
] as const;

/** Sign-aware color picker. Down values use gray, never red. */
export function signColor(delta: number): string {
  if (delta > 0) return colors.data[500];
  if (delta < 0) return colors.text.secondary;
  return colors.text.muted;
}

/** Format currency in USD by default. */
export function formatCurrency(value: number, opts?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    ...opts,
  }).format(value);
}

/** Format percent. */
export function formatPercent(value: number, fractionDigits = 1): string {
  const sign = value > 0 ? "↗" : value < 0 ? "↘" : "—";
  return `${sign} ${Math.abs(value).toFixed(fractionDigits)}%`;
}
