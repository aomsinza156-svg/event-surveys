# Event&Survey — Frontend (Next.js + Tailwind + TypeScript)

แปลงจากดีไซน์ Figma ของโปรเจกต์ Event & Survey (Admin UI, Kiosk UI, User UI)

## วิธีรัน
```bash
npm install      # ครั้งแรกครั้งเดียว
npm run dev
```
แล้วเปิด http://localhost:3000

## หน้าทั้งหมด
| หน้า | URL |
|---|---|
| Login | /login |
| Dashboard | /dashboard |
| Events (รายการ) | /events |
| Event detail / report | /events/tech-expo-2026 |
| Create Event | /events/new |
| Survey Builder | /surveys |
| Admin Management (+ Invite modal) | /admins |
| Kiosk (จอแนวตั้ง) | /kiosk |
| Register (มือถือ) | /register |
| Register success (มือถือ) | /register/success |
| Survey (มือถือ) | /survey |

> หน้ามือถือ ลองเปิด DevTools (F12) → Toggle device toolbar → เลือก iPhone

## โครงสร้างไฟล์
```
src/
  app/
    (admin)/          ← หน้าฝั่ง admin ทั้งหมด ใช้ layout ร่วมกัน (sidebar + topbar)
      layout.tsx
      dashboard/ events/ surveys/ admins/
    login/ kiosk/ register/ survey/
    globals.css       ← สีและฟอนต์ (design tokens จาก Figma)
  components/         ← ชิ้นส่วนที่ใช้ซ้ำ: Card, Button, StatusPill, Toggle, Sidebar ...
  lib/mock-data.ts    ← ข้อมูลจำลองทั้งหมด (จะแทนด้วย API ทีหลัง)
```

## ส่วนที่ต้องต่อ API
ดูที่ **API-TODO.md** และค้นหา `TODO(API)` ในโค้ด
