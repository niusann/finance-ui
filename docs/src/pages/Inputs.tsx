import { useState } from "react";
import {
  Field, TextInput, CurrencyInput, SearchBar, DateRange, TimeRange,
  TabToggle, RangeSlider,
} from "../../../src/lib";
import { ApiTable } from "../ApiTable";
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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "label", type: "ReactNode", required: true, description: "The field label shown above the input." },
        { name: "children", type: "ReactNode", required: true, description: "The input element to wrap (e.g. TextInput, CurrencyInput)." },
        { name: "help", type: "ReactNode", description: "Helper text shown below the input." },
        { name: "error", type: "boolean", description: "When true, applies error styling to the field." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Field label="Email address" help="We'll never share this." error={!!errors.email}>
  <TextInput type="email" placeholder="you@example.com" />
</Field>`} />

      <Section title="TextInput" desc="Standard text input with placeholder and default value support.">
        <div className="docs-grid-2">
          <TextInput placeholder="Search transactions…" />
          <TextInput defaultValue="AAPL" />
          <TextInput type="email" placeholder="you@example.com" />
          <TextInput type="number" placeholder="10" inputMode="decimal" />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "...", type: "InputHTMLAttributes<HTMLInputElement>", description: "Accepts all standard <input> HTML attributes (type, placeholder, value, onChange, etc.)." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<TextInput
  type="text"
  placeholder="Enter ticker symbol"
  value={ticker}
  onChange={e => setTicker(e.target.value)}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "prefix", type: "string", default: '"$"', description: "Symbol shown to the left of the input." },
        { name: "suffix", type: "string", description: "Text shown to the right of the input (e.g. 'USD', '/mo')." },
        { name: "...", type: "InputHTMLAttributes<HTMLInputElement>", description: "Also accepts all standard <input> HTML attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<CurrencyInput
  prefix="$"
  suffix="USD"
  value={amount}
  onChange={e => setAmount(e.target.value)}
/>`} />

      <Section title="SearchBar" desc="Search input with icon.">
        <div style={{ maxWidth: 480 }}>
          <SearchBar placeholder="Search transactions…" />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "shortcut", type: "string", default: '"⌘K"', description: "Keyboard shortcut hint shown on the right side of the search bar." },
        { name: "...", type: "InputHTMLAttributes<HTMLInputElement>", description: "Also accepts all standard <input> HTML attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<SearchBar
  placeholder="Search transactions…"
  shortcut="⌘K"
  value={query}
  onChange={e => setQuery(e.target.value)}
/>`} />

      <Section title="DateRange" desc="Date range display and picker trigger.">
        <div style={{ display: "inline-block" }}>
          <DateRange label="Jan 1 – May 20, 2026" />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "label", type: "string", required: true, description: "The formatted date range string displayed in the button." },
        { name: "onClick", type: "() => void", description: "Called when the button is clicked to open a date picker." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<DateRange
  label="Jan 1 – May 20, 2026"
  onClick={() => setPickerOpen(true)}
/>`} />

      <Section title="TimeRange" desc="Segmented time range selector (e.g. for charts).">
        <TimeRange
          options={["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"]}
          value={range}
          onChange={setRange}
        />
        <p style={{ marginTop: 12, fontSize: 14, color: "#6b7280" }}>Selected: <strong>{range}</strong></p>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "options", type: "string[]", required: true, description: "Array of option labels to display as tabs." },
        { name: "value", type: "string", required: true, description: "Currently selected option." },
        { name: "onChange", type: "(v: string) => void", required: true, description: "Callback fired when the user selects a different option." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<TimeRange
  options={["1D", "1W", "1M", "3M", "1Y"]}
  value={range}
  onChange={setRange}
/>`} />

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
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "options", type: "string[]", required: true, description: "Array of tab labels." },
        { name: "value", type: "string", required: true, description: "Currently active tab." },
        { name: "onChange", type: "(v: string) => void", required: true, description: "Callback fired when the active tab changes." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<TabToggle
  options={["Monthly", "Annual"]}
  value={billingCycle}
  onChange={setBillingCycle}
/>`} />

      <Section title="RangeSlider" desc="Dual-handle slider for filtering by a numeric range.">
        <div>
          <RangeSlider min={50} max={500} value={sliderVal} />
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12 }}>
            Showing stocks priced <strong style={{ color: "#0a0a0a" }}>${sliderVal[0]} – ${sliderVal[1]}</strong>
          </p>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "min", type: "number", required: true, description: "Minimum value of the range." },
        { name: "max", type: "number", required: true, description: "Maximum value of the range." },
        { name: "value", type: "[number, number]", required: true, description: "Tuple of [low, high] handle positions." },
        { name: "showLabels", type: "boolean", default: "true", description: "When true, renders min/max labels below the track." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<RangeSlider
  min={0}
  max={1000}
  value={priceRange}
  showLabels
/>`} />
    </div>
  );
}
