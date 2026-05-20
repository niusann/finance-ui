import { FormHTMLAttributes, ReactNode } from "react";

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

/* ─── UserBubble ─────────────────────────────────────── */
export interface UserBubbleProps {
  children: ReactNode;
  className?: string;
}
export function UserBubble({ children, className }: UserBubbleProps) {
  return <div className={cn("ui-user-msg", className)}>{children}</div>;
}

/* ─── AIResponse ─────────────────────────────────────── */
export interface AIResponseProps {
  children: ReactNode;
  className?: string;
}
export function AIResponse({ children, className }: AIResponseProps) {
  return <div className={cn("ui-ai-msg", className)}>{children}</div>;
}

/* ─── AIActions ──────────────────────────────────────── */
export interface AIActionsProps {
  onCopy?: () => void;
  onSpeak?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onRegenerate?: () => void;
  onShare?: () => void;
  className?: string;
}
export function AIActions({
  onCopy, onSpeak, onLike, onDislike, onRegenerate, onShare, className,
}: AIActionsProps) {
  return (
    <div className={cn("ui-ai-actions", className)} role="toolbar" aria-label="Response actions">
      {onCopy && <button title="Copy" onClick={onCopy}>⧉</button>}
      {onSpeak && <button title="Read aloud" onClick={onSpeak}>⏵</button>}
      {onLike && <button title="Good response" onClick={onLike}>👍</button>}
      {onDislike && <button title="Bad response" onClick={onDislike}>👎</button>}
      {onRegenerate && <button title="Regenerate" onClick={onRegenerate}>↻</button>}
      {onShare && <button title="Share" onClick={onShare}>↗</button>}
    </div>
  );
}

/* ─── Composer ───────────────────────────────────────── */
export interface ComposerProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "children"> {
  placeholder?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  onAdd?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export function Composer({
  placeholder = "Ask anything…",
  value,
  onValueChange,
  onAdd,
  onSubmit,
  className,
  ...rest
}: ComposerProps) {
  return (
    <form
      className={cn("ui-composer", className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      {...rest}
    >
      <button type="button" className="ui-composer-add" onClick={onAdd} aria-label="Add">
        +
      </button>
      <div className="ui-composer-pill">
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
        />
        <button type="submit" className="ui-composer-send" aria-label="Send">
          ↑
        </button>
      </div>
    </form>
  );
}
