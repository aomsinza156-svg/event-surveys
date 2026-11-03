"use client";

import { useState } from "react";
import { registrationsByDay } from "@/lib/mock-data";
import { cn } from "./ui";

type Range = keyof typeof registrationsByDay;

export function RegistrationsChart() {
  const [range, setRange] = useState<Range>("14d");
  // TODO(API): GET /dashboard/registrations?range=7d|14d|30d
  const data = registrationsByDay[range];
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Registrations · last {range.replace("d", "")} days</h2>
          <p className="mt-1 text-xs text-muted">All events combined</p>
        </div>
        <div className="flex gap-1.5">
          {(["7d", "14d", "30d"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn("h-7 rounded-full px-3 text-xs font-medium", r === range ? "bg-ink text-white" : "bg-field text-body")}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex h-[170px] items-end gap-2">
        {data.map((d, i) => {
          const last = i === data.length - 1;
          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              {data.length <= 14 && <span className="text-[11px] font-semibold text-ink">{d.value}</span>}
              <div
                className={cn("w-full rounded-md", last ? "bg-brand" : "bg-brand-light")}
                style={{ height: `${(d.value / max) * 120}px` }}
              />
              <span className="text-[11px] text-muted">{data.length <= 14 || i % 3 === 0 ? d.label : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
