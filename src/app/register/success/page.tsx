import Link from "next/link";
import { Check } from "lucide-react";
import { MobileHeader, MobileShell } from "@/components/mobile-header";
import { publicEvent as ev } from "@/lib/mock-data";

export default function RegisterSuccessPage() {
  return (
    <MobileShell>
      <MobileHeader title={ev.name} subtitle={ev.shortDate} />
      <div className="flex flex-1 flex-col items-center justify-center px-7 pb-24 text-center">
        <span className="flex size-24 items-center justify-center rounded-full bg-success text-white">
          <Check className="size-12" strokeWidth={2.5} />
        </span>
        <h1 className="mt-5 text-[26px] font-bold text-ink">You&apos;re registered!</h1>
        <p className="mt-4 text-[15px] text-muted">Show this screen at the entrance. Want to help us improve? Take our 1-minute survey.</p>
        <Link href="/survey" className="mt-5 flex h-[51px] w-full items-center justify-center rounded-xl bg-brand text-base font-semibold text-white hover:bg-brand-dark">
          Take the survey
        </Link>
      </div>
    </MobileShell>
  );
}
