"use client";

import { useState } from "react";
import { Check, ChevronDown, Mail, MoreVertical, Plus, Search, X } from "lucide-react";
import { Button, Card, Field, PageHeader, StatusPill, inputClass, cn } from "@/components/ui";
import { admins, events, permissions, type Role } from "@/lib/mock-data";

const roleStyle: Record<Role, string> = {
  "Super admin": "bg-indigo-100 text-indigo-600",
  "Event manager": "bg-brand-soft text-brand-dark",
  Viewer: "bg-field text-body",
};

const roles: Role[] = ["Super admin", "Event manager", "Viewer"];

export default function AdminManagementPage() {
  // TODO(API): GET /admins, GET /admins/stats
  const [query, setQuery] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const rows = admins.filter((a) => (a.name + a.email).toLowerCase().includes(query.toLowerCase()));

  const stats = [
    { label: "Total admins", value: 6, note: "across 3 roles" },
    { label: "Active today", value: 2, note: "last seen under 1 hr" },
    { label: "Pending invites", value: 1, note: "sent 2 days ago" },
  ];

  return (
    <>
      <PageHeader
        title="Admin Management"
        subtitle="Invite teammates and control what each person can do."
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <Plus className="size-4" /> Invite admin
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-[13px] text-body">{s.label}</p>
            <p className="mt-1 text-[26px] font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.note}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[15px] font-semibold">Admins</h2>
          <label className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email" className="h-9 w-full rounded-lg bg-field pl-9 pr-3 text-sm outline-none" />
          </label>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-field text-xs text-body">
            <tr>
              <th className="px-6 py-2.5 font-medium">Admin</th>
              <th className="py-2.5 font-medium">Role</th>
              <th className="py-2.5 font-medium">Event access</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Last active</th>
              <th className="w-14" />
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.email} className="border-t border-line">
                <td className="px-6 py-3">
                  <span className="flex items-center gap-3">
                    <span className={cn("flex size-8 items-center justify-center rounded-full text-xs font-semibold", a.color)}>{a.initial}</span>
                    <span>
                      <span className="block font-semibold text-ink">{a.name}</span>
                      <span className="block text-xs text-muted">{a.email}</span>
                    </span>
                  </span>
                </td>
                <td className="py-3"><span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", roleStyle[a.role])}>{a.role}</span></td>
                <td className="py-3 text-body">{a.access}</td>
                <td className="py-3"><StatusPill variant={a.active ? "active" : "disabled"}>{a.active ? "Active" : "Disabled"}</StatusPill></td>
                <td className="py-3 text-body">{a.last}</td>
                <td className="py-3">
                  {/* TODO(API): PATCH /admins/{id} (เปลี่ยน role / ปิดการใช้งาน), DELETE /admins/{id} */}
                  <button className="flex size-8 items-center justify-center rounded-lg text-body hover:bg-field" aria-label="More">
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-5 overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-[15px] font-semibold">Roles &amp; permissions</h2>
          <p className="mt-1 text-xs text-muted">What each role can do across events and surveys.</p>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-field text-xs text-body">
            <tr>
              <th className="px-6 py-2.5 font-medium">Permission</th>
              {roles.map((r) => (
                <th key={r} className="w-[140px] py-2.5 text-center font-medium">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.label} className="border-t border-line">
                <td className="px-6 py-3 text-ink">{p.label}</td>
                {p.roles.map((ok, i) => (
                  <td key={i} className="py-3 text-center">
                    {ok ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-3.5" /></span>
                    ) : (
                      <span className="text-muted">–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {inviteOpen && <InviteModal onClose={() => setInviteOpen(false)} />}
    </>
  );
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<Role>("Event manager");

  function invite(e: React.FormEvent) {
    e.preventDefault();
    // TODO(API): POST /admins/invite { email, role, eventAccess } → ส่งอีเมลเชิญ
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6" onClick={onClose}>
      <form onSubmit={invite} onClick={(e) => e.stopPropagation()} className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Invite admin</h2>
          <button type="button" onClick={onClose} className="text-muted hover:text-ink" aria-label="Close"><X className="size-5" /></button>
        </div>

        <div className="mt-5 space-y-5">
          <Field label="Email">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input type="email" required placeholder="admin@event.co" className={cn(inputClass, "pl-9")} />
            </div>
          </Field>

          <div>
            <p className="mb-2 text-xs font-medium">Role</p>
            <div className="space-y-2">
              {roles.map((r) => (
                <label key={r} className={cn("flex h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 text-sm", role === r ? "border-brand bg-brand-soft font-semibold" : "border-line")}>
                  <input type="radio" name="role" checked={role === r} onChange={() => setRole(r)} className="size-4 accent-brand" />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <Field label="Event access">
            <div className="relative">
              <select className={cn(inputClass, "appearance-none pr-9")} disabled={role === "Super admin"}>
                <option>All events</option>
                {events.map((e) => (
                  <option key={e.id}>{e.name}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="success" className="px-6">Invite</Button>
        </div>
      </form>
    </div>
  );
}
