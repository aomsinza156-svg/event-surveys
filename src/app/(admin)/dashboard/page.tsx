import { Download } from "lucide-react";
import { RegistrationsChart } from "@/components/bar-chart";
import { Button, Card, PageHeader, ProgressBar, StatusPill } from "@/components/ui";
import { dashboardStats, upcomingEvents } from "@/lib/mock-data";

const pillText = { live: "Live", open: "Open", scheduled: "Scheduled" };

export default function DashboardPage() {
  // TODO(API): GET /dashboard/summary (จำนวน active events, registrations, responses)
  // TODO(API): GET /events?status=active,scheduled (รายการ Active & upcoming events)
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of all events, registrations and survey activity."
        actions={
          // TODO(API): GET /dashboard/export → ดาวน์โหลดไฟล์ CSV/Excel
          <Button variant="secondary">
            <Download className="size-4" /> Export overview
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        {dashboardStats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-[13px] text-body">{s.label}</p>
            <p className="mt-2 text-[28px] font-bold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_380px] gap-4">
        <Card className="p-6">
          <RegistrationsChart />
        </Card>

        <Card className="p-6">
          <h2 className="text-[15px] font-semibold text-ink">Active &amp; upcoming events</h2>
          <ul className="mt-4 space-y-5">
            {upcomingEvents.map((e) => (
              <li key={e.name}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">{e.name}</p>
                    <p className="text-xs text-muted">{e.sub}</p>
                  </div>
                  <StatusPill variant={e.pill}>{pillText[e.pill]}</StatusPill>
                </div>
                <ProgressBar className="mt-2" pct={(e.current / e.capacity) * 100} color={e.bar} />
                <p className="mt-2 text-xs text-muted">
                  {e.current} of {e.capacity} registrations
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
