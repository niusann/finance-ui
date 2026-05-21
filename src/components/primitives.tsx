import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── Button ──────────────────────────────────────────── */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "data" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "ui-btn",
        `ui-btn--${variant}`,
        size === "sm" && "ui-btn--sm",
        size === "lg" && "ui-btn--lg",
        block && "ui-btn--block",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ─── IconButton ──────────────────────────────────────── */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  "aria-label": string;
}
export function IconButton({ className, children, ...rest }: IconButtonProps) {
  return (
    <button className={cn("ui-iconbtn", className)} {...rest}>
      {children}
    </button>
  );
}

/* ─── Card ────────────────────────────────────────────── */
export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "compact" | "flush";
  children: ReactNode;
}
export function Card({ variant = "default", className, children, ...rest }: CardProps) {
  return (
    <article
      className={cn(
        "ui-card",
        variant === "compact" && "ui-card--compact",
        variant === "flush" && "ui-card--flush",
        className
      )}
      {...rest}
    >
      {children}
    </article>
  );
}

export interface CardHeaderProps {
  title?: ReactNode;
  meta?: ReactNode;
  amount?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}
export function CardHeader({ title, meta, amount, right, children }: CardHeaderProps) {
  return (
    <header className="ui-card-header">
      <div>
        {title && <h3 className="ui-card-title">{title}</h3>}
        {meta && <p className="ui-card-meta">{meta}</p>}
        {children}
      </div>
      {(amount || right) && (
        <div style={{ textAlign: "right" }}>
          {amount && <div className="ui-card-amount">{amount}</div>}
          {right}
        </div>
      )}
    </header>
  );
}

export function Divider({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("ui-divider", className)} {...rest} />;
}

/* ─── Avatar ──────────────────────────────────────────── */
export interface AvatarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  initials?: string;
  src?: string;
  color?: string;
}
export function Avatar({ initials, src, color, className, style, ...rest }: AvatarProps) {
  return (
    <button
      className={cn("ui-avatar", className)}
      style={src ? style : { background: color, ...style }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={initials ?? "avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials
      )}
    </button>
  );
}

/* ─── Spinner ─────────────────────────────────────────── */
export function Spinner({ className }: { className?: string }) {
  return <span className={cn("ui-spinner", className)} role="status" aria-label="Loading" />;
}

/* ─── Chip ────────────────────────────────────────────── */
export interface ChipProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
}
export function Chip({ children, onRemove, className }: ChipProps) {
  return (
    <span className={cn("ui-chip", className)}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove">
          ×
        </button>
      )}
    </span>
  );
}
