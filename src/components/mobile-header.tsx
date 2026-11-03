import type { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-canvas">
      <div className="flex min-h-screen w-full max-w-[430px] flex-col bg-white shadow-sm">{children}</div>
    </div>
  );
}

export function MobileHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return (
    <header className="bg-brand px-5 pb-5 pt-7 text-white">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-brand-dark">{title[0]}</span>
        <div>
          <p className="text-lg font-bold leading-tight">{title}</p>
          <p className="text-[13px] text-white/85">{subtitle}</p>
        </div>
      </div>
      {children}
    </header>
  );
}
