import { Search } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

function today() {
  return new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).replace(/,/g, "").replace(/^(\w+)/, "$1,");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[62px] items-center justify-between border-b border-line bg-white px-8">
          <label className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input placeholder="Search events, surveys..." className="h-9 w-full rounded-lg bg-field pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/20" />
          </label>
          <span className="text-[13px] text-muted">{today()}</span>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
