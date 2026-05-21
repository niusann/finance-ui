import {
  Button, IconButton, Card, CardHeader, Divider, Avatar, Spinner, Chip,
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

export default function Primitives() {
  return (
    <div>
      <h1 className="docs-page-title">Primitives</h1>
      <p className="docs-page-subtitle">
        Core building blocks: buttons, cards, avatars, and utility components.
      </p>

      <Section title="Button" desc="Five variants, three sizes, optional full-width.">
        <div className="docs-label">Variants</div>
        <div className="docs-row" style={{ marginBottom: 20 }}>
          <Button>Primary</Button>
          <Button variant="data">Save changes</Button>
          <Button variant="secondary">Skip</Button>
          <Button variant="tertiary">Learn more</Button>
          <Button variant="destructive">Cancel</Button>
        </div>
        <div className="docs-label">Sizes</div>
        <div className="docs-row" style={{ marginBottom: 20 }}>
          <Button size="sm">Small</Button>
          <Button size="md">Regular</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="docs-label">Block</div>
        <Button block>Full-width button</Button>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "variant", type: '"primary" | "secondary" | "tertiary" | "data" | "destructive"', default: '"primary"', description: "Visual style of the button." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls padding and font size." },
        { name: "block", type: "boolean", description: "When true, stretches to full container width." },
        { name: "children", type: "ReactNode", required: true, description: "Button label content." },
        { name: "...", type: "ButtonHTMLAttributes", description: "Also accepts all standard <button> HTML attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Button variant="data" size="lg" onClick={handleSave}>
  Save changes
</Button>

<Button variant="destructive" block>
  Delete account
</Button>`} />

      <Section title="IconButton" desc="Square icon-only button for toolbar actions.">
        <div className="docs-row">
          <IconButton aria-label="Search">🔍</IconButton>
          <IconButton aria-label="Notifications">🔔</IconButton>
          <IconButton aria-label="Settings">⚙️</IconButton>
          <IconButton aria-label="Close">✕</IconButton>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "children", type: "ReactNode", required: true, description: "Icon content (emoji, SVG, or text)." },
        { name: "aria-label", type: "string", required: true, description: "Accessible label required for icon-only buttons." },
        { name: "...", type: "ButtonHTMLAttributes", description: "Also accepts all standard <button> HTML attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<IconButton aria-label="Close modal" onClick={onClose}>
  ✕
</IconButton>`} />

      <Section title="Avatar" desc="Circular avatar showing user initials.">
        <div className="docs-row">
          <Avatar initials="YL" />
          <Avatar initials="JD" color="#2196F3" />
          <Avatar initials="AB" color="#4CAF50" />
          <Avatar initials="MK" color="#2E7D32" />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "initials", type: "string", required: true, description: "1–2 character string displayed inside the avatar." },
        { name: "color", type: "string", description: "CSS background color. Defaults to the data-700 token." },
        { name: "...", type: "ButtonHTMLAttributes", description: "Also accepts all standard <button> HTML attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Avatar initials="YL" color="#2196F3" onClick={openProfile} />`} />

      <Section title="Card" desc="Surface container with three padding variants.">
        <div className="docs-grid-3">
          <Card>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>default padding</p>
          </Card>
          <Card variant="compact">
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>compact padding</p>
          </Card>
          <Card variant="flush">
            <div style={{ padding: 12, fontSize: 14, color: "#6b7280" }}>flush (no padding)</div>
          </Card>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "variant", type: '"default" | "compact" | "flush"', default: '"default"', description: "Controls internal padding. flush removes all padding." },
        { name: "children", type: "ReactNode", required: true, description: "Card body content." },
        { name: "...", type: "HTMLAttributes<HTMLElement>", description: "Also accepts all standard HTML article element attributes." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Card variant="compact">
  <CardHeader title="Net worth" amount="$128,450" />
  <Divider />
  <p>Card body</p>
</Card>`} />

      <Section title="CardHeader" desc="Standardized header for card titles, meta, amounts, and right-side slots.">
        <Card>
          <CardHeader
            title="Portfolio distribution"
            meta="5 holdings across 3 accounts"
            amount="$102,938.83"
          />
          <Divider />
          <p style={{ margin: "16px 0 0", fontSize: 14, color: "#6b7280" }}>Card body content</p>
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "title", type: "ReactNode", description: "Primary heading text." },
        { name: "meta", type: "ReactNode", description: "Secondary subtext shown below the title." },
        { name: "amount", type: "ReactNode", description: "Right-aligned amount or primary value." },
        { name: "right", type: "ReactNode", description: "Arbitrary right-side slot (e.g. buttons, badges)." },
        { name: "children", type: "ReactNode", description: "Additional content rendered in the left column." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<CardHeader
  title="Portfolio"
  meta="5 holdings"
  amount="$102,938"
  right={<Button size="sm" variant="tertiary">Edit</Button>}
/>`} />

      <Section title="Divider" desc="1px horizontal rule using the border-subtle token.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Section above divider</p>
          <Divider />
          <p style={{ margin: 0, fontSize: 14 }}>Section below divider</p>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "...", type: "HTMLAttributes<HTMLHRElement>", description: "Accepts all standard <hr> HTML attributes (className, style, etc.)." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Divider />
<Divider style={{ margin: "8px 0" }} />`} />

      <Section title="Spinner" desc="Animated loading indicator.">
        <div className="docs-row">
          <Spinner />
          <span style={{ fontSize: 14, color: "#6b7280" }}>Loading data…</span>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`{isLoading ? <Spinner /> : <DataTable ... />}`} />

      <Section title="Chip" desc="Filter chips with optional remove button.">
        <div className="docs-row">
          <Chip onRemove={() => {}}>Dining</Chip>
          <Chip onRemove={() => {}}>Travel</Chip>
          <Chip onRemove={() => {}}>Last 30 days</Chip>
          <Chip>Recurring</Chip>
          <Chip>Saved filter</Chip>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "children", type: "ReactNode", required: true, description: "Chip label content." },
        { name: "onRemove", type: "() => void", description: "When provided, renders an × button that calls this handler." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Chip onRemove={() => removeFilter("dining")}>Dining</Chip>
<Chip>Recurring</Chip>`} />
    </div>
  );
}
