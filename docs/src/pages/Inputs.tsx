import { useState } from "react";
import {
  Field, TextInput, CurrencyInput, SearchBar, DateRange, TimeRange,
  TabToggle, RangeSlider,
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

export default function Inputs() {
  const [range, setRange] = useState("YTD");
  const [tab, setTab] = useState("Monthly");
  const [side, setSide] = useState("buy");
  const [sliderVal] = useState<[number, number]>([140, 400]);

  return (
    <div>
      <h1 className="docs-page-title">Inputs</h1>
      <p className="docs-page-subtitle">
        Form controls: text inputs, currency, search, date/time pickers, toggles, and sliders.
      </p>

      <Section title="Field" desc="Label + help text + error state wrapper for any input.">
        <div className="docs-grid-2">
          <Field label="Email address" help="We'll never share this.">
            <TextInput type="email" placeholder="you@example.com" />
          </Field>
          <Field label="Routing number" help="Must be 9 digits." error>
            <TextInput type="text" defaultValue="123" />
          </Field>
          <Field label="Full name">
            <TextInput placeholder="Jane Smith" />
          </Field>
          <Field label="Phone number" help="Optional.">
            <TextInput type="tel" placeholder="+1 (555) 000-0000" />
          </Field>
        </div>
      </Section>

      <Section title="TextInput" desc="Standard text input with placeholder and default value support.">
        <div className="docs-grid-2">
          <TextInput placeholder="Search transactions…" />
          <TextInput defaultValue="AAPL" />
          <TextInput type="email" placeholder="you@example.com" />
          <TextInput type="number" placeholder="10" inputMode="decimal" />
        </div>
      </Section>

      <Section title="CurrencyInput" desc="Input with currency suffix decoration.">
        <div className="docs-grid-2">
          <Field label="Monthly target">
            <CurrencyInput defaultValue="2,500" suffix="USD" />
          </Field>
          <Field label="Monthly limit">
            <CurrencyInput defaultValue="600" suffix="/mo" />
          </Field>
        </div>
      </Section>

      <Section title="SearchBar" desc="Search input with icon.">
        <div style={{ maxWidth: 480 }}>
          <SearchBar placeholder="Search transactions…" />
        </div>
      </Section>

      <Section title="DateRange" desc="Date range display and picker trigger.">
        <div style={{ display: "inline-block" }}>
          <DateRange label="Jan 1 – May 20, 2026" />
        </div>
      </Section>

      <Section title="TimeRange" desc="Segmented time range selector (e.g. for charts).">
        <TimeRange
          options={["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"]}
          value={range}
          onChange={setRange}
        />
        <p style={{ marginTop: 12, fontSize: 14, color: "#6b7280" }}>Selected: <strong>{range}</strong></p>
      </Section>

      <Section title="TabToggle" desc="Segmented control for switching between a small set of options.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div className="docs-label">Two options</div>
            <TabToggle options={["Monthly", "Annual"]} value={tab} onChange={setTab} />
          </div>
          <div>
            <div className="docs-label">Three options (buy/sell/short)</div>
            <TabToggle options={["buy", "sell", "short"]} value={side} onChange={setSide} />
          </div>
          <div>
            <div className="docs-label">Order types</div>
            <TabToggle options={["Market", "Limit", "Stop"]} value="Market" onChange={() => {}} />
          </div>
        </div>
      </Section>

      <Section title="RangeSlider" desc="Dual-handle slider for filtering by a numeric range.">
        <div>
          <RangeSlider min={50} max={500} value={sliderVal} />
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12 }}>
            Showing stocks priced <strong style={{ color: "#0a0a0a" }}>${sliderVal[0]} – ${sliderVal[1]}</strong>
          </p>
        </div>
      </Section>
    </div>
  );
}
