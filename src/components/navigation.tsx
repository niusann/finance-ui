import { ReactNode } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── AppBar ─────────────────────────────────────────── */
export interface AppBarItem {
  label: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}
export interface AppBarProps {
  brand: ReactNode;
  items: AppBarItem[];
  end?: ReactNode;       // search button, avatar, etc.
  className?: string;
}
export function AppBar({ brand, items, end, className }: AppBarProps) {
  return (
    <header className={cn("ui-appbar", className)}>
      <a className="ui-appbar-brand" href="#top">{brand}</a>
      <nav className="ui-appbar-nav">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className={item.active ? "active" : undefined}
            onClick={item.onClick}
          >
            {item.label}
          </a>
        ))}
      </nav>
      {end && <div className="ui-appbar-end">{end}</div>}
    </header>
  );
}

/* ─── SideNav ────────────────────────────────────────── */
export interface SideNavItem {
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}
export interface SideNavProps {
  items: SideNavItem[];
  className?: string;
}
export function SideNav({ items, className }: SideNavProps) {
  return (
    <nav className={cn("ui-sidenav", className)}>
      {items.map((item, i) => (
        <a key={i} href={item.href} className={item.active ? "active" : undefined} onClick={item.onClick}>
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* ─── TabBar (mobile bottom) ─────────────────────────── */
export interface TabBarItem {
  label: ReactNode;
  icon: ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}
export interface TabBarProps {
  items: TabBarItem[];
  className?: string;
}
export function TabBar({ items, className }: TabBarProps) {
  return (
    <nav className={cn("ui-tabbar", className)}>
      {items.map((item, i) => (
        <a key={i} href={item.href} className={item.active ? "active" : undefined} onClick={item.onClick}>
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
