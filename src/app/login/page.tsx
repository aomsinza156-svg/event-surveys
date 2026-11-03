"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, CalendarDays, ClipboardList, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Field, inputClass } from "@/components/ui";

const features = [
  { icon: CalendarDays, text: "Create events with custom theme and logo" },
  { icon: ClipboardList, text: "Build surveys with flexible answer types" },
  { icon: BarChart3, text: "Track reports and export data per event" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(API): POST /auth/login { email, password } → เก็บ token/session แล้วค่อยไปหน้า dashboard
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen bg-white">
      {/* Brand panel (Figma 31:2) */}
      <section className="relative hidden w-[620px] shrink-0 flex-col overflow-hidden bg-brand p-14 lg:flex">
        <div className="pointer-events-none absolute -top-[120px] left-[380px] size-[360px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute left-[460px] top-[720px] size-[220px] rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[10px] bg-white text-xl font-bold text-brand-dark">E</div>
          <span className="text-xl font-bold text-white">Event&amp;Survey</span>
        </div>

        <div className="flex-1" />
        <div className="relative flex flex-col gap-4">
          <h1 className="w-[508px] text-[38px] font-bold leading-tight text-white">Run events and collect feedback in one place.</h1>
          <p className="w-[480px] text-base text-[#e0f4f9]">
            Create events, show them on kiosks, and turn every QR scan into registrations and survey insights.
          </p>
        </div>
        <ul className="relative flex flex-col gap-3.5 pt-7">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand-mid">
                <Icon className="size-[18px] text-white" />
              </span>
              <span className="text-[15px] font-medium text-white">{text}</span>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <p className="relative text-[13px] text-[#c8ecf5]">© 2026 Event&amp;Survey</p>
      </section>

      {/* Form side (Figma 31:33) */}
      <section className="flex flex-1 items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">Admin portal</p>
          <h2 className="mt-2 text-[28px] font-bold text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">Sign in to manage your events and surveys.</p>

          <div className="mt-8 space-y-5">
            <Field label="Email">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@event.co" className={`${inputClass} h-11 pl-10`} />
              </div>
            </Field>
            <Field label="Password">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${inputClass} h-11 pl-10 pr-10`}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" className="size-4 accent-brand" /> Remember me
            </label>
            <a href="#" className="font-medium text-brand-dark">Forgot password?</a>
          </div>

          <button type="submit" className="mt-6 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-dark">
            Sign in
          </button>
          <p className="mt-6 text-center text-xs text-muted">Only invited admins can sign in.</p>
        </form>
      </section>
    </main>
  );
}
