import { useState, useEffect, useCallback } from "react";
import "./docs.css";
import { AppBar, IconButton, Avatar } from "@finance-ui/components";

import Preview from "./pages/Preview";
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

// Parse the current URL path into a page id
function pathToPage(path: string): string {
  if (path === "/" || path === "") return "home";
  const match = path.match(/^\/docs\/?(.*)$/);
  if (match) {
    const slug = match[1] || "primitives";
    return CATEGORIES.some(c => c.id === slug) ? slug : "primitives";
  }
  return "home";
}

function pageToPath(id: string): string {
  if (id === "home") return "/";
  return `/docs/${id}`;
}

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

export default function App() {
  const [active, setActive] = useState(() => pathToPage(window.location.pathname));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("ui-theme") as Theme) ?? "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("ui-theme", theme);
  }, [theme]);

  // Sync browser back/forward
  useEffect(() => {
    function onPop() {
      setActive(pathToPage(window.location.pathname));
      setSidebarOpen(false);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((id: string) => {
    const path = pageToPath(id);
    window.history.pushState({ page: id }, "", path);
    setActive(id);
    setSidebarOpen(false);
  }, []);

  if (active === "home") {
    return <Preview onDocsClick={() => navigate("primitives")} />;
  }

  return (
    <div className="docs-root">
      <AppBar
        className="docs-appbar"
        brand="◐ finance-ui"
        items={[
          { label: "Overview",  onClick: () => navigate("home") },
          { label: "Charts",    onClick: () => navigate("home") },
          { label: "Lists",     onClick: () => navigate("home") },
          { label: "Invest",    onClick: () => navigate("home") },
          { label: "Chat",      onClick: () => navigate("home") },
          { label: "Docs",      active: true },
        ]}
        end={
          <>
            <IconButton aria-label="Search">🔍</IconButton>
            <IconButton aria-label="Notifications">🔔</IconButton>
            <Avatar initials="YL" />
          </>
        }
      />

      {sidebarOpen && (
        <div className="docs-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <nav className={`docs-sidebar docs-sidebar--under-appbar${sidebarOpen ? " open" : ""}`}>
        <div className="docs-sidebar-section">Components API</div>
        {CATEGORIES.map(c => (
          <a
            key={c.id}
            className={`docs-sidebar-link${active === c.id ? " active" : ""}`}
            onClick={() => navigate(c.id)}
          >
            {c.label}
          </a>
        ))}
      </nav>

      <main className="docs-content docs-content--under-appbar">
        {renderPage(active)}
      </main>
    </div>
  );
}
