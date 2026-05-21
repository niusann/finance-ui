import { colors, radius, space, motion } from "../../../src/lib";
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

function Swatch({ color, name, value }: { color: string; name: string; value: string }) {
  return (
    <div className="docs-swatch">
      <div className="docs-swatch-color" style={{ background: color }} />
      <div className="docs-swatch-info">
        <div className="docs-swatch-name">{name}</div>
        <div className="docs-swatch-value">{value}</div>
      </div>
    </div>
  );
}

function TokenTable({ rows }: { rows: { token: string; css: string; value: string; note?: string }[] }) {
  return (
    <table className="docs-token-table">
      <thead>
        <tr>
          <th>JS token</th>
          <th>CSS variable</th>
          <th>Value</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.token}>
            <td><code>{r.token}</code></td>
            <td><code>{r.css}</code></td>
            <td>{r.value}</td>
            <td style={{ color: "#6b7280", fontSize: 13 }}>{r.note ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DesignTokens() {
  return (
    <div>
      <h1 className="docs-page-title">Design Tokens</h1>
      <p className="docs-page-subtitle">
        All components share one set of tokens defined in <code>styles.css</code> and mirrored as JS
        constants in <code>tokens.ts</code>. Override CSS variables to rebrand; import JS constants
        when you need a value in code (chart strokes, SVG fills, etc.).
      </p>

      {/* ── Data palette ── */}
      <Section title="Data palette" desc="Primary brand ramp — green by default. Replace all seven steps to rebrand.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.data[900]} name="--data-900" value="#1B5E20" />
          <Swatch color={colors.data[700]} name="--data-700" value="#2E7D32" />
          <Swatch color={colors.data[500]} name="--data-500" value="#4CAF50" />
          <Swatch color={colors.data[400]} name="--data-400" value="#66BB6A" />
          <Swatch color={colors.data[300]} name="--data-300" value="#81C784" />
          <Swatch color={colors.data[200]} name="--data-200" value="#A5D6A7" />
          <Swatch color={colors.data[100]} name="--data-100" value="#C8E6C9" />
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          JS: <code>import {"{"} dataPalette {"}"} from '@blob/finance-ui'</code>
          {" "}— ordered array <code>[900, 700, 500, 400, 200]</code> for use in charts.
        </p>
        <CodeBlock code={`:root {
  --data-900: #0A4B78;   /* darkest brand */
  --data-700: #1565C0;
  --data-500: #1E88E5;
  --data-400: #42A5F5;
  --data-300: #64B5F6;
  --data-200: #90CAF9;
  --data-100: #BBDEFB;   /* lightest brand */
}`} />
      </Section>

      {/* ── Accent palette ── */}
      <Section title="Accent palette" desc="Blue accent for focus rings, links, and informational highlights.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.accent[500]} name="--accent-500" value="#2196F3" />
          <Swatch color={colors.accent[300]} name="--accent-300" value="#64B5F6" />
          <Swatch color={colors.accent[200]} name="--accent-200" value="#90CAF9" />
          <Swatch color={colors.accent[100] as string} name="--accent-100" value="#BBDEFB" />
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          JS: <code>import {"{"} accentPalette {"}"} from '@blob/finance-ui'</code>
        </p>
      </Section>

      {/* ── Surfaces ── */}
      <Section title="Surfaces" desc="Background fills for pages and cards. Never put a Card on a colored background.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.bg.page}   name="--bg-page"   value="#FFFFFF" />
          <Swatch color={colors.bg.card}   name="--bg-card"   value="#FFFFFF" />
          <Swatch color={colors.bg.soft}   name="--bg-soft"   value="#F3F4F6" />
          <Swatch color={colors.bg.subtle} name="--bg-subtle" value="#FAFAFA" />
        </div>
      </Section>

      {/* ── Text ── */}
      <Section title="Text" desc="Typographic color ramp. Negative values always use text-secondary — never red.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.text.primary}   name="--text-primary"   value="#0A0A0A" />
          <Swatch color={colors.text.secondary} name="--text-secondary" value="#6B7280" />
          <Swatch color={colors.text.muted}     name="--text-muted"     value="#9CA3AF" />
          <Swatch color={colors.text.positive}  name="--text-positive"  value="#2E7D32" />
        </div>
        <div style={{
          marginTop: 12, padding: "10px 14px",
          background: "#fafafa", border: "1px solid #e5e7eb",
          borderRadius: 8, fontSize: 13, color: "#374151",
        }}>
          <strong>No red, ever.</strong> Down values use <code>--text-secondary</code> (gray).
          Use <code>signColor(delta)</code> to get the correct color automatically.
        </div>
      </Section>

      {/* ── Borders ── */}
      <Section title="Borders" desc="Two border tokens for most separation needs.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.border.subtle} name="--border-subtle" value="#E5E7EB" />
          <Swatch color={colors.border.soft}   name="--border-soft"   value="#F3F4F6" />
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Button surfaces" desc="Dark (primary) and light (secondary) button fill tokens.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.btn.dark}      name="--btn-dark"       value="#0A0A0A" />
          <Swatch color={colors.btn.darkHover} name="--btn-dark-hover" value="#1A1A1A" />
          <Swatch color={colors.btn.light}     name="--btn-light"      value="#F3F4F6" />
        </div>
      </Section>

      {/* ── Shadows ── */}
      <Section title="Shadows" desc="Three elevation levels. Cards always float — never place a card on a colored background.">
        {([
          { name: "--shadow-card",    label: "Card",    value: "0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)", usage: "Default card elevation" },
          { name: "--shadow-pop",     label: "Pop",     value: "0 6px 24px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)", usage: "Dropdowns, tooltips, popovers" },
          { name: "--shadow-overlay", label: "Overlay", value: "0 20px 50px rgba(0,0,0,0.18)", usage: "Modals, bottom sheets" },
        ] as const).map(s => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 64, height: 40, borderRadius: 8,
              background: "#fff", boxShadow: s.value, flexShrink: 0,
            }} />
            <div>
              <code style={{ fontSize: 13 }}>{s.name}</code>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.usage}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* ── Spacing ── */}
      <Section title="Spacing" desc="All values are multiples of 4px.">
        <table className="docs-token-table">
          <thead>
            <tr><th>Token</th><th>CSS variable</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {(Object.entries(space) as [string, number][]).map(([key, val]) => (
              <tr key={key}>
                <td><code>space[{key}]</code></td>
                <td><code>--space-{key}</code></td>
                <td>{val}px</td>
                <td>
                  <div style={{ height: 8, width: val, background: colors.data[500], borderRadius: 2, maxWidth: 200 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* ── Radius ── */}
      <Section title="Border radius" desc="From sharp corners to full pill.">
        <table className="docs-token-table">
          <thead>
            <tr><th>Token</th><th>CSS variable</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {(Object.entries(radius) as [string, number][]).map(([key, val]) => (
              <tr key={key}>
                <td><code>radius.{key}</code></td>
                <td><code>--radius-{key}</code></td>
                <td>{val}px</td>
                <td>
                  <div style={{
                    width: 48, height: 24,
                    background: colors.data[200],
                    borderRadius: Math.min(val, 12),
                    border: `1px solid ${colors.data[500]}`,
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* ── Motion ── */}
      <Section title="Motion" desc="Duration and easing values for all transitions and animations.">
        <table className="docs-token-table">
          <thead>
            <tr><th>Token</th><th>CSS variable</th><th>Value</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td><code>motion.fast</code></td><td><code>--motion-fast</code></td><td>150ms</td><td style={{ fontSize: 13, color: "#6b7280" }}>Hover, focus micro-interactions</td></tr>
            <tr><td><code>motion.normal</code></td><td><code>--motion-normal</code></td><td>300ms</td><td style={{ fontSize: 13, color: "#6b7280" }}>Panel transitions, toggles</td></tr>
            <tr><td><code>motion.slow</code></td><td><code>--motion-slow</code></td><td>500ms</td><td style={{ fontSize: 13, color: "#6b7280" }}>Page-level transitions</td></tr>
            <tr><td><code>motion.chart</code></td><td><code>--motion-chart</code></td><td>800ms</td><td style={{ fontSize: 13, color: "#6b7280" }}>Chart draw-on animations</td></tr>
            <tr><td><code>motion.ease.out</code></td><td><code>--ease-out</code></td><td colSpan={2}><code>{motion.ease.out}</code></td></tr>
          </tbody>
        </table>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography" desc="One font stack set globally on body — no token variable needed.">
        <CodeBlock code={`font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`} />
        <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          Always right-align amounts and numeric values.
        </p>
      </Section>

      {/* ── JS utilities ── */}
      <Section title="JS utilities" desc="Helper functions exported alongside token constants.">
        <table className="docs-token-table">
          <thead>
            <tr><th>Export</th><th>Signature</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>signColor</code></td>
              <td><code>(delta: number) → string</code></td>
              <td style={{ fontSize: 13, color: "#6b7280" }}>Returns the correct color for a signed number — positive → <code>data-500</code>, negative → <code>text-secondary</code>, zero → <code>text-muted</code></td>
            </tr>
            <tr>
              <td><code>formatCurrency</code></td>
              <td><code>(value, opts?) → string</code></td>
              <td style={{ fontSize: 13, color: "#6b7280" }}>Formats a number as USD; configurable via <code>Intl.NumberFormatOptions</code></td>
            </tr>
            <tr>
              <td><code>formatPercent</code></td>
              <td><code>(value, digits?) → string</code></td>
              <td style={{ fontSize: 13, color: "#6b7280" }}>Formats a number as a percent string with directional arrow (↗ / ↘ / —)</td>
            </tr>
            <tr>
              <td><code>dataPalette</code></td>
              <td><code>string[]</code></td>
              <td style={{ fontSize: 13, color: "#6b7280" }}>Data ramp as an ordered array (900 → 200) — for charts needing shades by index</td>
            </tr>
            <tr>
              <td><code>accentPalette</code></td>
              <td><code>string[]</code></td>
              <td style={{ fontSize: 13, color: "#6b7280" }}>Accent ramp as an ordered array (500 → 200)</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock code={`import { signColor, formatCurrency, formatPercent, dataPalette } from "@blob/finance-ui";

signColor(+12.4)   // "#4CAF50"  (data-500)
signColor(-3.1)    // "#6B7280"  (text-secondary, never red)
signColor(0)       // "#9CA3AF"  (text-muted)

formatCurrency(1234.5)               // "$1,234.50"
formatCurrency(1234.5, { currency: "EUR" }) // "€1,234.50"
formatPercent(2.4)  // "↗ 2.4%"
formatPercent(-1.2) // "↘ 1.2%"`} />
      </Section>

      {/* ── Full CSS reference ── */}
      <Section title="Full CSS reference" desc="All tokens in one block — copy and override what you need.">
        <CodeBlock code={`:root {
  /* Surfaces */
  --bg-page:        #FFFFFF;
  --bg-card:        #FFFFFF;
  --bg-soft:        #F3F4F6;
  --bg-subtle:      #FAFAFA;

  /* Data palette (replace to rebrand) */
  --data-900:       #1B5E20;
  --data-700:       #2E7D32;
  --data-500:       #4CAF50;
  --data-400:       #66BB6A;
  --data-300:       #81C784;
  --data-200:       #A5D6A7;
  --data-100:       #C8E6C9;

  /* Accent */
  --accent-500:     #2196F3;
  --accent-300:     #64B5F6;
  --accent-200:     #90CAF9;
  --accent-100:     #BBDEFB;

  /* Text */
  --text-primary:   #0A0A0A;
  --text-secondary: #6B7280;
  --text-muted:     #9CA3AF;
  --text-positive:  #2E7D32;

  /* Borders */
  --border-subtle:  #E5E7EB;
  --border-soft:    #F3F4F6;

  /* Buttons */
  --btn-dark:       #0A0A0A;
  --btn-dark-hover: #1A1A1A;
  --btn-light:      #F3F4F6;
  --btn-light-hover:#E5E7EB;

  /* Shadows */
  --shadow-card:    0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04);
  --shadow-pop:     0 6px 24px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04);
  --shadow-overlay: 0 20px 50px rgba(0,0,0,0.18);

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 20px; --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px;

  /* Radius */
  --radius-sm: 4px;    --radius-md: 8px;   --radius-lg: 12px;
  --radius-card: 16px; --radius-xl: 20px;  --radius-pill: 9999px;

  /* Motion */
  --motion-fast: 150ms;  --motion-normal: 300ms;
  --motion-slow: 500ms;  --motion-chart: 800ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}`} />
      </Section>
    </div>
  );
}
