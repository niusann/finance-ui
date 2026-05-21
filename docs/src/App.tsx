import { useState, useEffect } from "react";
import "./docs.css";

import Primitives from "./pages/Primitives";
import Inputs from "./pages/Inputs";
import DataDisplay from "./pages/DataDisplay";
import Lists from "./pages/Lists";
import Charts from "./pages/Charts";
import FeatureCards from "./pages/FeatureCards";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";
import Overlays from "./pages/Overlays";
import Navigation from "./pages/Navigation";
import DesignTokens from "./pages/DesignTokens";

const CATEGORIES = [
  { id: "primitives",    label: "Primitives" },
  { id: "inputs",        label: "Inputs" },
  { id: "data-display",  label: "Data Display" },
  { id: "lists",         label: "Lists" },
  { id: "charts",        label: "Charts" },
  { id: "feature-cards", label: "Feature Cards" },
  { id: "chat",          label: "Chat" },
  { id: "feedback",      label: "Feedback" },
  { id: "overlays",      label: "Overlays" },
  { id: "navigation",    label: "Navigation" },
  { id: "design-tokens", label: "Design Tokens" },
];

function renderPage(id: string) {
  switch (id) {
    case "primitives":    return <Primitives />;
    case "inputs":        return <Inputs />;
    case "data-display":  return <DataDisplay />;
    case "lists":         return <Lists />;
    case "charts":        return <Charts />;
    case "feature-cards": return <FeatureCards />;
    case "chat":          return <Chat />;
    case "feedback":      return <Feedback />;
    case "overlays":      return <Overlays />;
    case "navigation":    return <Navigation />;
    case "design-tokens": return <DesignTokens />;
    default:              return <Primitives />;
  }
}

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

export default function App() {
  const [active, setActive] = useState("primitives");
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("ui-theme") as Theme | null;
    return saved ?? "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("ui-theme", theme);
  }, [theme]);

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  function cycleTheme() {
    setTheme(t => {
      if (t === "system") return "light";
      if (t === "light") return "dark";
      return "system";
    });
  }

  const themeIcon = theme === "dark" ? "◑" : theme === "light" ? "○" : "◐";
  const themeLabel = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <div className="docs-root">
      {/* ── Top bar ── */}
      <header className="docs-topbar">
        <span className="docs-topbar-brand">◐ finance-ui</span>
        <div className="docs-topbar-spacer" />
        <button
          className="docs-theme-toggle"
          onClick={cycleTheme}
          title={`Theme: ${themeLabel} — click to cycle`}
        >
          {themeIcon} {themeLabel}
        </button>
        <a href="https://github.com/blob-get/finance-ui" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </header>

      {/* ── Sidebar ── */}
      <nav className="docs-sidebar">
        <div className="docs-sidebar-section">Components</div>
        {CATEGORIES.map(c => (
          <a
            key={c.id}
            className={`docs-sidebar-link${active === c.id ? " active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </a>
        ))}
      </nav>

      {/* ── Main content ── */}
      <main className="docs-content">
        {renderPage(active)}
      </main>
    </div>
  );
}
