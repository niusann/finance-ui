import { ReactNode } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── EmptyState ─────────────────────────────────────── */
export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}
export function EmptyState({ icon = "✦", title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn("ui-empty", className)}>
      <div className="ui-empty-icon">{icon}</div>
      <h3 className="ui-empty-title">{title}</h3>
      {body && <p className="ui-empty-body">{body}</p>}
      {action}
    </div>
  );
}

/* ─── Skeleton ───────────────────────────────────────── */
export interface SkeletonProps {
  variant?: "line" | "line-lg" | "circle";
  width?: string | number;
  height?: string | number;
  className?: string;
}
export function Skeleton({ variant = "line", width, height, className }: SkeletonProps) {
  const variantClass =
    variant === "line" ? "ui-skel--line" :
    variant === "line-lg" ? "ui-skel--line-lg" :
    "ui-skel--circ";
  return (
    <div className={cn("ui-skel", variantClass, className)} style={{ width, height }} />
  );
}

/* ─── Toast ──────────────────────────────────────────── */
export interface ToastProps {
  children: ReactNode;
  type?: "success" | "warning";
  onClose?: () => void;
  className?: string;
}
export function Toast({ children, type = "success", onClose, className }: ToastProps) {
  const icon = type === "warning" ? "!" : "✓";
  return (
    <div className={cn("ui-toast", className)} role="status">
      <span className={cn("ui-toast-icon", type === "warning" && "ui-toast-icon--warning")}>{icon}</span>
      <p className="ui-toast-msg">{children}</p>
      {onClose && (
        <button className="ui-toast-close" onClick={onClose} aria-label="Close">×</button>
      )}
    </div>
  );
}

/* ─── Stepper ────────────────────────────────────────── */
export interface StepperProps {
  steps: ReactNode[];
  current: number;     // 0-indexed
  className?: string;
}
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn("ui-steps", className)}>
      {steps.map((s, i) => (
        <li key={i} className={i < current ? "done" : i === current ? "current" : undefined}>
          {s}
        </li>
      ))}
    </ol>
  );
}
