"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ButtonLink, Card, PageHeader, StatusPill, cn } from "@/components/ui";
import { events, type EventStatus } from "@/lib/mock-data";

const filters: { key: "all" | EventStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "scheduled", label: "Scheduled" },
  { key: "ended", label: "Ended" },
];

const statusLabel: Record<EventStatus, string> = { active: "Active", scheduled: "Scheduled", ended: "Ended" };

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | EventStatus>("all");
  // TODO(API): GET /events?status=... (ตอนนี้ filter จาก mock data)
  const rows = filter === "all" ? events : events.filter((e) => e.status === filter);

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="All events you manage, with registrations and survey responses."
        actions={
          <ButtonLink href="/events/new">
            <Plus className="size-4" /> Create event
          </ButtonLink>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[15px] font-semibold text-ink">All events</h2>
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn("h-7 rounded-full px-3 text-xs font-medium", filter === f.key ? "bg-ink text-white" : "bg-field text-body")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-field text-xs text-body">
            <tr>
              <th className="px-6 py-3 font-medium">Event</th>
              <th className="py-3 font-medium">Active period</th>
              <th className="py-3 font-medium">Registrations</th>
              <th className="py-3 font-medium">Responses</th>
              <th className="py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-t border-line hover:bg-canvas">
                <td className="px-6 py-3">
                  <Link href={`/events/${e.id}`} className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ backgroundColor: e.color }}>
                      {e.name[0]}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{e.name}</span>
                      <span className="block text-xs text-muted">{e.location}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 text-body">{e.period}</td>
                <td className="py-3 text-ink">{e.registrations}</td>
                <td className="py-3 text-ink">{e.responses}</td>
                <td className="py-3">
                  <StatusPill variant={e.status}>{statusLabel[e.status]}</StatusPill>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted">No events</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
