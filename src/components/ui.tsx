import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-xl border border-line bg-white", className)} {...props} />;
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-bold leading-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-white text-ink hover:bg-field",
  success: "bg-success text-white hover:brightness-95",
  ghost: "text-brand-dark hover:bg-brand-soft",
};

type ButtonProps = ComponentProps<"button"> & { variant?: keyof typeof buttonStyles };

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:opacity-50",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return (
    <Link
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

const pillStyles = {
  active: "bg-success-soft text-success",
  live: "bg-success-soft text-success",
  online: "bg-success-soft text-success",
  done: "bg-success-soft text-success",
  scheduled: "bg-warning-soft text-warning",
  pending: "bg-warning-soft text-warning",
  open: "bg-brand-soft text-brand-dark",
  ended: "bg-field text-body",
  offline: "bg-field text-body",
  disabled: "bg-field text-body",
};

export type PillVariant = keyof typeof pillStyles;

export function StatusPill({ variant, children }: { variant: PillVariant; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", pillStyles[variant])}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex rounded-md bg-field px-2 py-0.5 text-[11px] text-body", className)}>{children}</span>;
}

export function ProgressBar({ pct, color, className }: { pct: number; color: string; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-field", className)}>
      <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 1)}%`, backgroundColor: color }} />
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
