import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronRight, Download, MapPin, Monitor, Star } from "lucide-react";
import { Card, CardHeader, ProgressBar, StatusPill } from "@/components/ui";
import { eventDetail as ev } from "@/lib/mock-data";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO(API): GET /events/{id}/report → ตอนนี้ใช้ข้อมูล Tech Expo 2026 จาก mock data ทุก id
  void id;
  const maxDay = Math.max(...ev.perDay.map((d) => d.kiosk + d.online));

  // donut chart ทำจาก conic-gradient
  let acc = 0;
  const donut = ev.gender.map((g) => {
    const seg = `${g.color} ${acc}% ${acc + g.pct}%`;
    acc += g.pct;
    return seg;
  });

  return (
    <div className="space-y-4">
      <nav className="flex items-center gap-2 text-[13px]">
        <Link href="/events" className="flex items-center gap-1 text-muted hover:text-ink">
          <ArrowLeft className="size-4" /> Events
        </Link>
        <ChevronRight className="size-4 text-muted" />
        <span className="font-semibold text-ink">{ev.name}</span>
      </nav>

      {/* Hero */}
      <section className="flex items-center justify-between rounded-xl bg-gradient-to-r from-brand to-[#33b3d1] px-6 py-6 text-white">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{ev.name}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-dark">
              <span className="size-1.5 rounded-full bg-current" /> Registration open
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs">
              Starts in <b>{ev.startsIn}</b>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-5 text-[13px] text-white/90">
            <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{ev.dates}</span>
            <span className="flex items-center gap-1.5"><MapPin className="size-4" />{ev.venue}</span>
            <span className="flex items-center gap-1.5"><Monitor className="size-4" />{ev.kiosksOnline} kiosks online</span>
          </div>
        </div>
        {/* TODO(API): GET /events/{id}/export */}
        <button className="flex h-10 items-center gap-2 rounded-lg bg-brand-dark px-4 text-sm font-semibold">
          <Download className="size-4" /> Export data
        </button>
      </section>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {ev.kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <p className="text-[13px] text-body">{k.label}</p>
            <p className="mt-1 text-[26px] font-bold text-ink">{k.value}</p>
            <ProgressBar className="mt-2" pct={k.pct} color={k.color} />
            <p className="mt-2 text-xs text-muted">{k.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-4">
        <Card className="p-6">
          <CardHeader
            title="Registrations per day"
            subtitle="Last 12 days · kiosk QR vs online link"
            action={
              <div className="flex gap-4 text-xs text-body">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-brand" />Kiosk QR</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-brand-light" />Online link</span>
              </div>
            }
          />
          <div className="mt-6 flex h-[190px] items-end gap-2.5">
            {ev.perDay.map((d) => {
              const total = d.kiosk + d.online;
              return (
                <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[11px] font-semibold text-ink">{total}</span>
                  <div className="flex w-full flex-col overflow-hidden rounded-md" style={{ height: `${(total / maxDay) * 150}px` }}>
                    <div className="bg-brand-light" style={{ flex: d.online }} />
                    <div className="bg-brand" style={{ flex: d.kiosk }} />
                  </div>
                  <span className="text-[10px] text-muted">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Attendee funnel" subtitle="From QR scan to survey" />
          <ul className="mt-5 space-y-4">
            {ev.funnel.map((f) => (
              <li key={f.label}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="text-body">{f.label}</span>
                  <span className="font-semibold text-ink">{f.value} · {f.pct}%</span>
                </div>
                <div className="h-4 w-full rounded-md bg-field">
                  <div className="h-full rounded-md" style={{ width: `${f.pct}%`, backgroundColor: f.color }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <CardHeader title="Age groups" subtitle="Registered attendees" />
          <ul className="mt-4 space-y-3.5">
            {ev.ageGroups.map((a) => (
              <li key={a.label}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="text-body">{a.label}</span>
                  <span className="font-semibold text-ink">{a.pct}%</span>
                </div>
                <ProgressBar pct={(a.pct / 40) * 100} color="#2baccc" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <CardHeader title="Gender" subtitle="642 attendees" />
          <div className="my-5 flex justify-center">
            <div className="relative size-[140px] rounded-full" style={{ background: `conic-gradient(${donut.join(",")})` }}>
              <div className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-xl font-bold text-ink">642</span>
                <span className="text-[11px] text-muted">attendees</span>
              </div>
            </div>
          </div>
          <ul className="space-y-2.5">
            {ev.gender.map((g) => (
              <li key={g.label} className="flex justify-between text-[13px]">
                <span className="flex items-center gap-2 text-body"><span className="size-2 rounded-full" style={{ backgroundColor: g.color }} />{g.label}</span>
                <span className="font-semibold text-ink">{g.pct}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          {/* TODO(API): GET /events/{id}/kiosks (สถานะ online/offline แบบ realtime) */}
          <CardHeader title="Kiosks" subtitle="Screens showing this event" />
          <ul className="mt-3 divide-y divide-line">
            {ev.kiosks.map((k) => (
              <li key={k.name} className="flex items-center gap-3 py-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand-dark"><Monitor className="size-4" /></span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-ink">{k.name}</p>
                  <p className="text-xs text-muted">{k.scans}</p>
                </div>
                <StatusPill variant={k.online ? "online" : "offline"}>{k.online ? "Online" : "Offline"}</StatusPill>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-[1fr_440px] gap-4">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-[15px] font-semibold text-ink">Recent registrations</h2>
            <a href="#" className="text-[13px] font-semibold text-brand-dark">View all 642</a>
          </div>
          <table className="w-full text-left text-[13px]">
            <thead className="bg-field text-xs text-body">
              <tr>
                <th className="px-6 py-2.5 font-medium">Attendee</th>
                <th className="py-2.5 font-medium">Age</th>
                <th className="py-2.5 font-medium">Gender</th>
                <th className="py-2.5 font-medium">Via</th>
                <th className="py-2.5 font-medium">Survey</th>
              </tr>
            </thead>
            <tbody>
              {ev.recent.map((r) => (
                <tr key={r.name} className="border-t border-line">
                  <td className="px-6 py-3">
                    <span className="flex items-center gap-3 font-semibold text-ink">
                      <span className="flex size-7 items-center justify-center rounded-full bg-brand-soft text-xs text-brand-dark">{r.name[0]}</span>
                      {r.name}
                    </span>
                  </td>
                  <td className="py-3 text-body">{r.age}</td>
                  <td className="py-3 text-body">{r.gender}</td>
                  <td className="py-3 text-body">{r.via}</td>
                  <td className="py-3"><StatusPill variant={r.done ? "done" : "pending"}>{r.done ? "Done" : "Pending"}</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <CardHeader
            title="Survey snapshot"
            subtitle="Q1 · How did you hear about this event?"
            action={<Link href="/surveys" className="text-[13px] font-semibold text-brand-dark">Open survey</Link>}
          />
          <ul className="mt-4 space-y-3">
            {ev.snapshot.map((s) => (
              <li key={s.label}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="text-body">{s.label}</span>
                  <span className="font-semibold text-ink">{s.pct}%</span>
                </div>
                <ProgressBar pct={(s.pct / 50) * 100} color="#2baccc" />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
            <div>
              <p className="text-xs text-muted">Avg. satisfaction</p>
              <p className="text-xl font-bold text-ink">4.3 / 5</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={i <= 4 ? "size-5 fill-amber-400 text-amber-400" : "size-5 fill-line text-line"} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
