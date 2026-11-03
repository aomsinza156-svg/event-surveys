"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ClipboardList, LayoutGrid, Users } from "lucide-react";
import { cn } from "./ui";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/surveys", label: "Surveys", icon: ClipboardList },
  { href: "/admins", label: "Admin Management", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col border-r border-line bg-white px-[17px] py-[25px]">
      <Link href="/dashboard" className="mb-3 flex items-center gap-2.5 px-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-base font-bold text-white">E</span>
        <span className="text-[17px] font-bold text-ink">Event&amp;Survey</span>
      </Link>

      <nav className="mt-4 flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-[38px] items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                active ? "bg-brand-soft font-semibold text-brand-dark" : "text-body hover:bg-field",
              )}
            >
              <Icon className="size-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* TODO(API): ดึงข้อมูลผู้ใช้ที่ login อยู่จาก GET /auth/me */}
      <div className="flex items-center gap-3 px-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">AD</span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">Admin</p>
          <p className="text-xs text-muted">admin@event.co</p>
        </div>
      </div>
    </aside>
  );
}
