"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Check, Download, Plus, Upload } from "lucide-react";
import { Button, Card, Field, PageHeader, Tag, inputClass, cn } from "@/components/ui";
import { Toggle } from "@/components/toggle";
import { publicEvent } from "@/lib/mock-data";

const themeColors = ["#2BACCC", "#16A34A", "#6366F1", "#F97316", "#EC4899", "#1F2937"];

type FormField = { name: string; type: string; required: boolean };

export default function CreateEventPage() {
  const router = useRouter();
  const [color, setColor] = useState(themeColors[0]);
  const [logo, setLogo] = useState<string | null>(null);
  const [ad, setAd] = useState<string | null>(null);
  const [fields, setFields] = useState<FormField[]>([
    { name: "Full name", type: "Text", required: true },
    { name: "Age", type: "Number", required: true },
    { name: "Gender", type: "Dropdown", required: false },
    { name: "Email", type: "Text", required: false },
  ]);

  function save() {
    // TODO(API): POST /events (ชื่อ, รายละเอียด, ช่วงเวลา, สี, โลโก้, รูปโฆษณา, ฟิลด์ฟอร์ม)
    // TODO(API): อัปโหลดไฟล์รูป POST /uploads
    router.push("/events");
  }

  return (
    <>
      <PageHeader
        title="Create Event"
        subtitle="Set up the event page, branding, registration fields and active period."
        actions={
          <>
            <Link href="/events" className="inline-flex h-10 items-center rounded-lg border border-line bg-white px-5 text-sm font-semibold hover:bg-field">Cancel</Link>
            <Button onClick={save}><Check className="size-4" /> Save event</Button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_380px] items-start gap-5">
        <div className="space-y-5">
          <Card className="space-y-5 p-6">
            <h2 className="text-[15px] font-semibold">Event details</h2>
            <Field label="Event name">
              <input className={inputClass} defaultValue="Tech Expo 2026" />
            </Field>
            <Field label="Event detail">
              <textarea
                rows={3}
                className={cn(inputClass, "h-auto py-2.5 leading-5")}
                defaultValue={"Hall A, Bangkok Convention Centre\nOpen daily 10:00 – 18:00\nFree entry, registration required"}
              />
            </Field>
            <div>
              <p className="mb-3 text-xs font-medium">Active period</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Starts">
                  <input type="datetime-local" defaultValue="2026-11-12T09:00" className={inputClass} />
                </Field>
                <Field label="Ends">
                  <input type="datetime-local" defaultValue="2026-11-14T18:00" className={inputClass} />
                </Field>
              </div>
            </div>
          </Card>

          <Card className="space-y-5 p-6">
            <h2 className="text-[15px] font-semibold">Branding</h2>
            <div>
              <p className="mb-3 text-xs font-medium">Theme color</p>
              <div className="flex items-center gap-3">
                {themeColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={c}
                    className={cn("size-7 rounded-full", color === c && "ring-2 ring-offset-2")}
                    style={{ backgroundColor: c, ["--tw-ring-color" as string]: c }}
                  />
                ))}
                <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium">{color}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <UploadBox label="Event logo" hint="PNG or SVG · 512×512" preview={logo} onFile={setLogo} />
              <UploadBox label="Advertising image" hint="PNG or JPG · 1080×1920" preview={ad} onFile={setAd} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[15px] font-semibold">Registration form fields</h2>
            <p className="mt-1 text-xs text-muted">Choose what attendees must fill in after scanning the QR code.</p>
            <ul className="mt-4 space-y-3">
              {fields.map((f, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
                  <input
                    value={f.name}
                    onChange={(e) => setFields((fs) => fs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                    className="flex-1 bg-transparent text-sm font-semibold outline-none"
                  />
                  <Tag>{f.type}</Tag>
                  <span className="text-xs text-muted">Required</span>
                  <Toggle
                    label={`${f.name} required`}
                    checked={f.required}
                    onChange={(v) => setFields((fs) => fs.map((x, j) => (j === i ? { ...x, required: v } : x)))}
                  />
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              className="mt-4 border border-line"
              onClick={() => setFields((fs) => [...fs, { name: "New field", type: "Text", required: false }])}
            >
              <Plus className="size-4" /> Add field
            </Button>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-6">
            <h2 className="text-[15px] font-semibold">QR codes</h2>
            <p className="mt-1 text-xs text-muted">Registration and survey use separate QR codes.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <QrBox label="Registration" url={publicEvent.registerUrl} />
              <QrBox label="Survey" url={publicEvent.surveyUrl} />
            </div>
          </Card>
          <Card className="space-y-4 p-6">
            <h2 className="text-[15px] font-semibold">Public links</h2>
            {/* TODO(API): ลิงก์จริงจะได้จาก backend หลังสร้าง event */}
            <Field label="Registration URL">
              <input readOnly className={inputClass} value={publicEvent.registerUrl.replace("https://", "")} />
            </Field>
            <Field label="Survey URL">
              <input readOnly className={inputClass} value={publicEvent.surveyUrl.replace("https://", "")} />
            </Field>
          </Card>
        </div>
      </div>
    </>
  );
}

function UploadBox({ label, hint, preview, onFile }: { label: string; hint: string; preview: string | null; onFile: (url: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium">{label}</p>
      <label className="flex h-[82px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-line bg-field text-center hover:border-brand">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={label} className="h-full w-full object-contain" />
        ) : (
          <>
            <Upload className="size-4 text-brand-dark" />
            <span className="mt-1 text-xs font-semibold text-brand-dark">Click to upload</span>
            <span className="text-[11px] text-muted">{hint}</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(URL.createObjectURL(e.target.files[0]))} />
      </label>
    </div>
  );
}

function QrBox({ label, url }: { label: string; url: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-field p-3">
      <div className="rounded-md bg-white p-1.5">
        <QRCodeSVG value={url} size={80} />
      </div>
      <p className="mt-2 text-xs font-semibold">{label}</p>
      <button className="mt-2 flex h-7 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[11px] font-medium">
        <Download className="size-3" /> Download
      </button>
    </div>
  );
}
