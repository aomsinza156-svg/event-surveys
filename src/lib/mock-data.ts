/**
 * ข้อมูลจำลอง (mock data) ทั้งหมดของโปรเจกต์อยู่ที่ไฟล์นี้
 * TODO(API): เมื่อ backend พร้อม ให้แทนที่ข้อมูลในไฟล์นี้ด้วยการ fetch จาก API
 * (ดูรายการ endpoint ที่ต้องใช้ใน API-TODO.md)
 */

export type EventStatus = "active" | "scheduled" | "ended";

export type EventItem = {
  id: string;
  name: string;
  location: string;
  period: string;
  registrations: number;
  responses: number;
  status: EventStatus;
  color: string;
};

export const events: EventItem[] = [
  { id: "tech-expo-2026", name: "Tech Expo 2026", location: "Hall A · Bangkok", period: "12 Nov – 14 Nov 2026", registrations: 642, responses: 418, status: "active", color: "#2baccc" },
  { id: "startup-pitch-night", name: "Startup Pitch Night", location: "Rooftop · Sathorn", period: "20 Nov 2026", registrations: 0, responses: 0, status: "scheduled", color: "#6366f1" },
  { id: "campus-open-house", name: "Campus Open House", location: "Main building", period: "3 Oct – 5 Oct 2026", registrations: 394, responses: 301, status: "ended", color: "#f97316" },
  { id: "career-fair", name: "Career Fair", location: "Sports complex", period: "25 Oct – 26 Oct 2026", registrations: 248, responses: 143, status: "active", color: "#16a34a" },
];

/* ---------- Dashboard ---------- */
export const dashboardStats = [
  { label: "Active events", value: "4" },
  { label: "Total registrations", value: "1,284" },
  { label: "Survey responses", value: "862" },
];

export const registrationsByDay: Record<"7d" | "14d" | "30d", { label: string; value: number }[]> = {
  "14d": [18, 26, 31, 24, 40, 52, 47, 38, 61, 74, 69, 58, 82, 96].map((v, i) => ({ label: String(13 + i), value: v })),
  "7d": [61, 74, 69, 58, 82, 96, 88].map((v, i) => ({ label: String(20 + i), value: v })),
  "30d": Array.from({ length: 30 }, (_, i) => ({ label: String(((i + 27) % 31) + 1), value: Math.round(15 + i * 2.6 + (i % 4) * 6) })),
};

export const upcomingEvents = [
  { name: "Career Fair", sub: "Live now · 25 – 26 Oct", current: 248, capacity: 300, pill: "live" as const, bar: "#16a34a" },
  { name: "Tech Expo 2026", sub: "12 – 14 Nov", current: 642, capacity: 1000, pill: "open" as const, bar: "#2baccc" },
  { name: "Startup Pitch Night", sub: "20 Nov", current: 0, capacity: 200, pill: "scheduled" as const, bar: "#6366f1" },
];

/* ---------- Event detail (Tech Expo 2026) ---------- */
export const eventDetail = {
  name: "Tech Expo 2026",
  dates: "12 – 14 Nov 2026 · 09:00 – 18:00",
  venue: "Hall A, Bangkok Convention Centre",
  kiosksOnline: 3,
  startsIn: "14 days",
  kpis: [
    { label: "Registrations", value: "642", note: "of 1,000 capacity", pct: 64, color: "#2baccc" },
    { label: "Survey responses", value: "418", note: "65% of registrants", pct: 65, color: "#16a34a" },
    { label: "Avg. satisfaction", value: "4.3 / 5", note: "from 418 ratings", pct: 86, color: "#6366f1" },
    { label: "QR scans", value: "1,105", note: "58% scan → register", pct: 58, color: "#f97316" },
  ],
  perDay: [
    { day: "17 Oct", kiosk: 14, online: 20 }, { day: "18 Oct", kiosk: 20, online: 28 },
    { day: "19 Oct", kiosk: 17, online: 22 }, { day: "20 Oct", kiosk: 24, online: 29 },
    { day: "21 Oct", kiosk: 33, online: 35 }, { day: "22 Oct", kiosk: 29, online: 32 },
    { day: "23 Oct", kiosk: 37, online: 37 }, { day: "24 Oct", kiosk: 31, online: 31 },
    { day: "25 Oct", kiosk: 45, online: 41 }, { day: "26 Oct", kiosk: 42, online: 38 },
    { day: "27 Oct", kiosk: 46, online: 38 }, { day: "28 Oct", kiosk: 55, online: 52 },
  ],
  funnel: [
    { label: "Scanned QR", value: "1,105", pct: 100, color: "#8fd6e7" },
    { label: "Opened form", value: "896", pct: 81, color: "#55bed8" },
    { label: "Registered", value: "642", pct: 58, color: "#2baccc" },
    { label: "Completed survey", value: "418", pct: 38, color: "#16a34a" },
  ],
  ageGroups: [
    { label: "Under 18", pct: 6 }, { label: "18 – 24", pct: 38 }, { label: "25 – 34", pct: 31 },
    { label: "35 – 44", pct: 17 }, { label: "45+", pct: 8 },
  ],
  gender: [
    { label: "Female", pct: 52, color: "#2baccc" },
    { label: "Male", pct: 41, color: "#6366f1" },
    { label: "Other", pct: 7, color: "#f97316" },
  ],
  kiosks: [
    { name: "Kiosk A · Main entrance", scans: "482 scans", online: true },
    { name: "Kiosk B · Hall A lobby", scans: "391 scans", online: true },
    { name: "Kiosk C · Food court", scans: "232 scans", online: true },
    { name: "Kiosk D · Parking", scans: "–", online: false },
  ],
  recent: [
    { name: "Nattaya K.", age: 31, gender: "Female", via: "Kiosk A", done: true },
    { name: "Pimchanok R.", age: 28, gender: "Female", via: "Online", done: false },
    { name: "Thanakorn B.", age: 22, gender: "Male", via: "Kiosk B", done: true },
    { name: "Siriporn L.", age: 19, gender: "Female", via: "Kiosk A", done: true },
    { name: "Ekkachai M.", age: 40, gender: "Male", via: "Kiosk C", done: false },
  ],
  snapshot: [
    { label: "Social media", pct: 46 }, { label: "Friends or family", pct: 28 },
    { label: "Advertisement", pct: 18 }, { label: "Other", pct: 8 },
  ],
};

/* ---------- Survey ---------- */
export type QuestionType = "single" | "multiple" | "rating" | "text" | "dropdown";

export type Question = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[];
  maxSelect?: number;
};

export const questionTypeLabel: Record<QuestionType, string> = {
  single: "Single choice",
  multiple: "Multiple choice",
  rating: "Rating",
  text: "Short text",
  dropdown: "Dropdown",
};

export const surveyQuestions: Question[] = [
  { id: 1, title: "How did you hear about this event?", type: "single", required: true, options: ["Social media", "Friends or family", "Advertisement", "Other"] },
  { id: 2, title: "Which zones did you visit?", type: "multiple", required: true, maxSelect: 3, options: ["Main stage", "Workshop area", "Exhibition hall", "Food court", "Networking lounge"] },
  { id: 3, title: "How satisfied are you with the event?", type: "rating", required: true, options: [] },
  { id: 4, title: "Any suggestions for us?", type: "text", required: true, options: [] },
];

/* ---------- Admin management ---------- */
export type Role = "Super admin" | "Event manager" | "Viewer";

export const admins = [
  { initial: "N", name: "CP", email: "nakhon@event.co", role: "Super admin" as Role, access: "All events", active: true, last: "Just now", color: "bg-brand-soft text-brand-dark" },
  { initial: "J", name: "Jirayu W.", email: "jirayu@event.co", role: "Event manager" as Role, access: "Career Fair", active: true, last: "Yesterday", color: "bg-amber-100 text-amber-700" },
  { initial: "P", name: "Pailin C.", email: "pailin@event.co", role: "Viewer" as Role, access: "All events", active: true, last: "3 days ago", color: "bg-indigo-100 text-indigo-600" },
  { initial: "T", name: "Tanawat R.", email: "tanawat@event.co", role: "Viewer" as Role, access: "Campus Open House", active: false, last: "2 weeks ago", color: "bg-red-100 text-red-600" },
];

export const permissions: { label: string; roles: [boolean, boolean, boolean] }[] = [
  { label: "Create & edit events", roles: [true, true, false] },
  { label: "Manage surveys", roles: [true, true, false] },
  { label: "View Dashboard", roles: [true, true, true] },
  { label: "Export registrations & reports", roles: [true, true, false] },
  { label: "Manage admins", roles: [true, false, false] },
];

/* ---------- Public (kiosk / register) ---------- */
export const publicEvent = {
  name: "Tech Expo 2026",
  shortDate: "12 – 14 Nov 2026 · Hall A",
  kioskDate: "12 – 14 Nov 2026 · Hall A, Bangkok",
  details: ["Hall A, Bangkok Convention Centre", "Open daily 10:00 – 18:00", "Free entry · registration required"],
  registerUrl: "https://evt.app/r/techexpo26",
  surveyUrl: "https://evt.app/s/techexpo26",
};
