import { Check, ImageIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { publicEvent as ev } from "@/lib/mock-data";

// หน้าจอ Kiosk แนวตั้ง 720×1280 (Figma 11:1021)
export default function KioskPage() {
  // TODO(API): GET /kiosk/{kioskId}/event → ดึง event ที่ kiosk นี้ต้องแสดง (ชื่อ, รูปโฆษณา, QR)
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#2b2b2b] p-8">
      <div className="flex aspect-[656/1216] w-full max-w-[656px] flex-col rounded-[32px] bg-white p-9">
        <header className="flex items-center gap-5">
          <span className="flex size-[60px] items-center justify-center rounded-2xl bg-brand text-[28px] font-bold text-white">T</span>
          <div>
            <h1 className="text-[36px] font-bold leading-tight text-ink">{ev.name}</h1>
            <p className="text-lg text-muted">{ev.kioskDate}</p>
          </div>
        </header>

        {/* รูปโฆษณา: ตอนนี้เป็น placeholder — จะใช้รูปที่อัปโหลดในหน้า Create Event */}
        <div className="mt-6 flex flex-[1_1_0] flex-col items-center justify-center rounded-3xl bg-[#fcd29f] text-[#9a5a1c]">
          <ImageIcon className="size-12" strokeWidth={1.5} />
          <p className="mt-3 text-xl font-medium">Image for ads</p>
        </div>

        <section className="mt-6">
          <p className="text-[15px] font-semibold text-ink">Event detail</p>
          <ul className="mt-2 space-y-1.5">
            {ev.details.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-[17px] text-body">
                <Check className="size-4 text-success" /> {d}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <QrPanel step="Step 1" title="Scan to register" note="Takes about 1 minute" url={ev.registerUrl} tone="brand" />
          <QrPanel step="Step 2" title="Scan for survey" note="4 quick questions" url={ev.surveyUrl} tone="green" />
        </div>

        <p className="mt-6 text-center text-sm text-muted">Powered by Event&amp;Survey</p>
      </div>
    </main>
  );
}

function QrPanel({ step, title, note, url, tone }: { step: string; title: string; note: string; url: string; tone: "brand" | "green" }) {
  const green = tone === "green";
  return (
    <div className={`flex flex-col items-center rounded-3xl p-6 ${green ? "bg-[#dcf5e4]" : "bg-brand-soft"}`}>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${green ? "bg-success" : "bg-brand"}`}>{step}</span>
      <p className="mt-3 text-[22px] font-semibold text-ink">{title}</p>
      <div className="mt-4 rounded-2xl bg-white p-4">
        <QRCodeSVG value={url} size={170} fgColor="#111827" />
      </div>
      <p className="mt-4 text-sm text-muted">{note}</p>
    </div>
  );
}
