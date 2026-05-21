import {
  Button, IconButton, Card, CardHeader, Divider, Avatar, Spinner, Chip,
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

      <Section title="IconButton" desc="Square icon-only button for toolbar actions.">
        <div className="docs-row">
          <IconButton aria-label="Search">🔍</IconButton>
          <IconButton aria-label="Notifications">🔔</IconButton>
          <IconButton aria-label="Settings">⚙️</IconButton>
          <IconButton aria-label="Close">✕</IconButton>
        </div>
      </Section>

      <Section title="Avatar" desc="Circular avatar showing user initials.">
        <div className="docs-row">
          <Avatar initials="YL" />
          <Avatar initials="JD" color="#2196F3" />
          <Avatar initials="AB" color="#4CAF50" />
          <Avatar initials="MK" color="#2E7D32" />
        </div>
      </Section>

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

      <Section title="Divider" desc="1px horizontal rule using the border-subtle token.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Section above divider</p>
          <Divider />
          <p style={{ margin: 0, fontSize: 14 }}>Section below divider</p>
        </div>
      </Section>

      <Section title="Spinner" desc="Animated loading indicator.">
        <div className="docs-row">
          <Spinner />
          <span style={{ fontSize: 14, color: "#6b7280" }}>Loading data…</span>
        </div>
      </Section>

      <Section title="Chip" desc="Filter chips with optional remove button.">
        <div className="docs-row">
          <Chip onRemove={() => {}}>Dining</Chip>
          <Chip onRemove={() => {}}>Travel</Chip>
          <Chip onRemove={() => {}}>Last 30 days</Chip>
          <Chip>Recurring</Chip>
          <Chip>Saved filter</Chip>
        </div>
      </Section>
    </div>
  );
}
