import { colors, radius, space, motion } from "../../../src/lib";

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

export default function DesignTokens() {
  return (
    <div>
      <h1 className="docs-page-title">Design Tokens</h1>
      <p className="docs-page-subtitle">
        All components share one set of tokens. Override <code>--data-*</code> CSS variables to rebrand everything at once.
      </p>

      <Section title="Data palette" desc="Primary data-forward color ramp — green by default, swap for your brand color.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.data[900]} name="data-900" value="#1B5E20" />
          <Swatch color={colors.data[700]} name="data-700" value="#2E7D32" />
          <Swatch color={colors.data[500]} name="data-500" value="#4CAF50" />
          <Swatch color={colors.data[400]} name="data-400" value="#66BB6A" />
          <Swatch color={colors.data[300]} name="data-300" value="#81C784" />
          <Swatch color={colors.data[200]} name="data-200" value="#A5D6A7" />
          <Swatch color={colors.data[100]} name="data-100" value="#C8E6C9" />
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          JS: <code>import {"{"} dataPalette {"}"} from '@blob/finance-ui'</code>
          &nbsp;— ordered array <code>[900, 700, 500, 400, 200]</code> for use in charts.
        </p>
      </Section>

      <Section title="Accent palette" desc="Blue accent for highlights, links, and secondary data.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.accent[500]} name="accent-500" value="#2196F3" />
          <Swatch color={colors.accent[300]} name="accent-300" value="#64B5F6" />
          <Swatch color={colors.accent[200]} name="accent-200" value="#90CAF9" />
          <Swatch color={colors.accent[100] as string} name="accent-100" value="#BBDEFB" />
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          JS: <code>import {"{"} accentPalette {"}"} from '@blob/finance-ui'</code>
        </p>
      </Section>

      <Section title="Surface colors" desc="Background and card surface tokens.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.bg.page}   name="bg-page"   value="#FFFFFF" />
          <Swatch color={colors.bg.card}   name="bg-card"   value="#FFFFFF" />
          <Swatch color={colors.bg.soft}   name="bg-soft"   value="#F3F4F6" />
          <Swatch color={colors.bg.subtle} name="bg-subtle" value="#FAFAFA" />
        </div>
      </Section>

      <Section title="Text colors" desc="Typographic color ramp from primary to muted.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.text.primary}   name="text-primary"   value="#0A0A0A" />
          <Swatch color={colors.text.secondary} name="text-secondary" value="#6B7280" />
          <Swatch color={colors.text.muted}     name="text-muted"     value="#9CA3AF" />
          <Swatch color={colors.text.positive}  name="text-positive"  value="#2E7D32" />
        </div>
      </Section>

      <Section title="Border colors" desc="Subtle and soft border options.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.border.subtle} name="border-subtle" value="#E5E7EB" />
          <Swatch color={colors.border.soft}   name="border-soft"   value="#F3F4F6" />
        </div>
      </Section>

      <Section title="Button colors" desc="Dark and light button surface tokens.">
        <div className="docs-swatch-grid">
          <Swatch color={colors.btn.dark}      name="btn-dark"       value="#0A0A0A" />
          <Swatch color={colors.btn.darkHover} name="btn-dark-hover" value="#1A1A1A" />
          <Swatch color={colors.btn.light}     name="btn-light"      value="#F3F4F6" />
        </div>
      </Section>

      <Section title="Spacing scale" desc="All spacing values are multiples of 4px.">
        <table className="docs-token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>CSS variable</th>
              <th>Value</th>
              <th>Preview</th>
            </tr>
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

      <Section title="Border radius scale" desc="Radius tokens from sharp to full-pill.">
        <table className="docs-token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>CSS variable</th>
              <th>Value</th>
              <th>Preview</th>
            </tr>
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
                    border: `1px solid ${colors.data[500]}`
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Motion tokens" desc="Duration and easing values for animation.">
        <table className="docs-token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>motion.fast</code></td><td>{motion.fast}ms</td></tr>
            <tr><td><code>motion.normal</code></td><td>{motion.normal}ms</td></tr>
            <tr><td><code>motion.slow</code></td><td>{motion.slow}ms</td></tr>
            <tr><td><code>motion.chart</code></td><td>{motion.chart}ms</td></tr>
            <tr><td><code>motion.ease.out</code></td><td><code>{motion.ease.out}</code></td></tr>
            <tr><td><code>motion.ease.standard</code></td><td><code>{motion.ease.standard}</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="CSS custom properties" desc="All tokens are exposed as CSS variables for use in any stylesheet.">
        <pre style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 20,
          fontSize: 12,
          fontFamily: "monospace",
          lineHeight: 1.7,
          overflow: "auto",
          margin: 0,
        }}>
{`:root {
  /* Surfaces */
  --bg-page:        #FFFFFF;
  --bg-card:        #FFFFFF;
  --bg-soft:        #F3F4F6;
  --bg-subtle:      #FAFAFA;

  /* Data palette */
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

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;

  /* Radius */
  --radius-sm: 4px;    --radius-md: 8px;
  --radius-lg: 12px;   --radius-card: 16px;
  --radius-xl: 20px;   --radius-pill: 9999px;
}`}
        </pre>
      </Section>
    </div>
  );
}

