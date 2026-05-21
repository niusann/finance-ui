import { useState } from "react";
import {
  AppBar, SideNav, TabBar,
  IconButton, Avatar,
  colors,
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

export default function Navigation() {
  const [sideActive, setSideActive] = useState("Overview");
  const [tabActive, setTabActive] = useState("Home");

  return (
    <div>
      <h1 className="docs-page-title">Navigation</h1>
      <p className="docs-page-subtitle">
        App bar, side navigation, and mobile bottom tab bar.
      </p>

      <Section title="AppBar" desc="Top navigation bar with brand, nav links, and right-side slot.">
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <AppBar
            brand="◐ finance-ui"
            items={[
              { label: "Overview",     href: "#", active: true },
              { label: "Transactions", href: "#" },
              { label: "Investments",  href: "#" },
              { label: "Goals",        href: "#" },
              { label: "Chat",         href: "#" },
            ]}
            end={
              <>
                <IconButton aria-label="Search">🔍</IconButton>
                <IconButton aria-label="Notifications">🔔</IconButton>
                <Avatar initials="YL" />
              </>
            }
          />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "brand", type: "ReactNode", required: true, description: "Brand logo or name shown at the left." },
        { name: "items", type: "AppBarItem[]", required: true, description: "Navigation links. Each has: label (ReactNode), optional href, active (boolean), onClick." },
        { name: "end", type: "ReactNode", description: "Right-side slot for search, avatar, notifications, etc." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<AppBar
  brand="◐ MyApp"
  items={[
    { label: "Overview",  href: "/",      active: true },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Goals",     href: "/goals" },
  ]}
  end={<Avatar initials="YL" />}
/>`} />

      <Section title="SideNav" desc="Vertical navigation sidebar with icon + label rows.">
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div>
            <div className="docs-label">Finance app nav</div>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, width: 220 }}>
              <SideNav
                items={[
                  { label: "Overview",     icon: "◐", active: sideActive === "Overview",     onClick: () => setSideActive("Overview") },
                  { label: "Transactions", icon: "↔", active: sideActive === "Transactions", onClick: () => setSideActive("Transactions") },
                  { label: "Investments",  icon: "◓", active: sideActive === "Investments",  onClick: () => setSideActive("Investments") },
                  { label: "Goals",        icon: "◔", active: sideActive === "Goals",        onClick: () => setSideActive("Goals") },
                  { label: "Settings",     icon: "⚙", active: sideActive === "Settings",     onClick: () => setSideActive("Settings") },
                ]}
              />
            </div>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}>Active: <strong>{sideActive}</strong></p>
          </div>
          <div>
            <div className="docs-label">Docs-style nav</div>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, width: 220 }}>
              <SideNav
                items={[
                  { label: "Getting Started", icon: "◐", active: true },
                  { label: "Primitives",       icon: "□" },
                  { label: "Inputs",           icon: "⌨" },
                  { label: "Charts",           icon: "◳" },
                  { label: "API Reference",    icon: "⟨⟩" },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "items", type: "SideNavItem[]", required: true, description: "Navigation items. Each has: label (ReactNode), optional icon (ReactNode), href, active (boolean), onClick." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<SideNav
  items={[
    { label: "Overview",     icon: "◐", href: "/",           active: true },
    { label: "Transactions", icon: "↔", href: "/transactions" },
    { label: "Investments",  icon: "◓", href: "/investments" },
    { label: "Settings",     icon: "⚙", href: "/settings" },
  ]}
/>`} />

      <Section title="TabBar" desc="Mobile bottom navigation with icon + label tabs.">
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 20, overflow: "hidden" }}>
            <div style={{
              height: 140,
              background: colors.bg.soft,
              display: "grid",
              placeItems: "center",
              color: colors.text.muted,
              fontSize: 14
            }}>
              App screen — {tabActive}
            </div>
            <TabBar
              items={[
                { icon: "⌂", label: "Home",     active: tabActive === "Home",     onClick: () => setTabActive("Home") },
                { icon: "↔", label: "Activity", active: tabActive === "Activity", onClick: () => setTabActive("Activity") },
                { icon: "◐", label: "Insights", active: tabActive === "Insights", onClick: () => setTabActive("Insights") },
                { icon: "◔", label: "Goals",    active: tabActive === "Goals",    onClick: () => setTabActive("Goals") },
              ]}
            />
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: 8 }}>
            Tap tabs above to switch views.
          </p>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "items", type: "TabBarItem[]", required: true, description: "Tab items. Each has: icon (ReactNode), label (ReactNode), optional active (boolean), href, onClick." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<TabBar
  items={[
    { icon: "⌂", label: "Home",     active: tab === "Home",     onClick: () => setTab("Home") },
    { icon: "↔", label: "Activity", active: tab === "Activity", onClick: () => setTab("Activity") },
    { icon: "◐", label: "Insights", active: tab === "Insights", onClick: () => setTab("Insights") },
    { icon: "◔", label: "Goals",    active: tab === "Goals",    onClick: () => setTab("Goals") },
  ]}
/>`} />
    </div>
  );
}
