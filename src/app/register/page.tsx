"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MobileHeader, MobileShell } from "@/components/mobile-header";
import { publicEvent as ev } from "@/lib/mock-data";

const input =
  "h-[46px] w-full rounded-xl border border-line bg-white px-3.5 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function RegisterPage() {
  const router = useRouter();
  // TODO(API): GET /public/events/{slug}/form → ฟิลด์ฟอร์มที่ admin ตั้งไว้ (ตอนนี้ fix ไว้ 3 ช่อง)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(API): POST /public/events/{slug}/registrations { fullName, age, gender }
    router.push("/register/success");
  }

  return (
    <MobileShell>
      <MobileHeader title={ev.name} subtitle={ev.shortDate} />
      <form onSubmit={submit} className="flex flex-1 flex-col px-5 pb-6 pt-6">
        <h1 className="text-2xl font-bold text-ink">Register</h1>
        <p className="mt-1 text-sm text-muted">Fill in your details to join the event.</p>

        <div className="mt-5 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Full name</span>
            <input name="fullName" required placeholder="Enter your full name" className={input} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Age</span>
            <input name="age" type="number" min={1} max={120} required placeholder="Enter your age" className={input} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Gender</span>
            <div className="relative">
              <select name="gender" required defaultValue="" className={`${input} appearance-none pr-10 invalid:text-muted`}>
                <option value="" disabled>Select gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </label>
        </div>

        <div className="flex-1" />
        <button type="submit" className="mt-8 h-[50px] w-full rounded-xl bg-success text-base font-semibold text-white hover:brightness-95">
          Submit
        </button>
        <p className="mt-4 text-center text-xs text-muted">By submitting you agree to share these details with the event organiser.</p>
      </form>
    </MobileShell>
  );
}
