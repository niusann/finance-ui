import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./primitives";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── Modal ──────────────────────────────────────────── */
export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Pass false to render in-place (for design previews). Defaults to true. */
  portal?: boolean;
}
export function Modal({
  open, title, onClose, children, footer, className, portal = true,
}: ModalProps) {
  if (!open) return null;
  const node = (
    <div className="ui-scrim" onClick={onClose}>
      <div
        className={cn("ui-modal", className)}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <header className="ui-modal-head">
            {title && <h3 className="ui-modal-title">{title}</h3>}
            {onClose && (
              <IconButton aria-label="Close" onClick={onClose}>×</IconButton>
            )}
          </header>
        )}
        <div className="ui-modal-body">{children}</div>
        {footer && <footer className="ui-modal-foot">{footer}</footer>}
      </div>
    </div>
  );
  return portal && typeof document !== "undefined" ? createPortal(node, document.body) : node;
}

/* ─── BottomSheet ────────────────────────────────────── */
export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  portal?: boolean;
}
export function BottomSheet({ open, onClose, children, className, portal = true }: BottomSheetProps) {
  if (!open) return null;
  const node = (
    <>
      <div className="ui-scrim" onClick={onClose} />
      <div className={cn("ui-sheet", className)}>{children}</div>
    </>
  );
  return portal && typeof document !== "undefined" ? createPortal(node, document.body) : node;
}
