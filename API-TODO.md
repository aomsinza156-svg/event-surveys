# หน้าที่ต้องต่อ API (ยังไม่ได้ทำ)

ตอนนี้ทุกหน้าใช้ **ข้อมูลจำลอง** จาก `src/lib/mock-data.ts`
ในโค้ดทุกจุดที่ต้องต่อ API จะมีคอมเมนต์ `TODO(API)` กำกับไว้ — ค้นใน VS Code ด้วย `Ctrl/Cmd + Shift + F` แล้วพิมพ์ `TODO(API)`

> ชื่อ endpoint ข้างล่างเป็นแค่ข้อเสนอ ปรับตามที่ทีม backend ออกแบบได้เลย

| หน้า | Route | ต้องใช้ API ทำอะไร |
|---|---|---|
| Login | `/login` | `POST /auth/login` เข้าสู่ระบบ, เก็บ session/token (ตอนนี้กด Sign in แล้วเข้า dashboard ได้เลย ไม่มีการตรวจรหัส) |
| Sidebar (ทุกหน้า admin) | — | `GET /auth/me` ชื่อ/อีเมลของคนที่ login อยู่ |
| Dashboard | `/dashboard` | `GET /dashboard/summary` ตัวเลข 3 การ์ด, `GET /dashboard/registrations?range=` กราฟ, `GET /events?status=` รายการ event, `GET /dashboard/export` ปุ่ม Export |
| Events | `/events` | `GET /events?status=` รายการ event + filter |
| Event detail | `/events/[id]` | `GET /events/{id}/report` ข้อมูลรายงานทั้งหมด, `GET /events/{id}/kiosks` สถานะ kiosk, `GET /events/{id}/export` (ตอนนี้ทุก id แสดง Tech Expo 2026) |
| Create Event | `/events/new` | `POST /events` บันทึก event, `POST /uploads` อัปโหลดโลโก้/รูปโฆษณา, ลิงก์ public + QR จริงจาก backend |
| Survey Builder | `/surveys` | `GET /events/{id}/survey` โหลดคำถาม, `PUT /events/{id}/survey` ปุ่ม Publish, `GET /events` รายชื่อ event ใน dropdown |
| Admin Management | `/admins` | `GET /admins`, `GET /admins/stats`, `POST /admins/invite` (ปุ่ม Invite ใน modal), `PATCH`/`DELETE /admins/{id}` (ปุ่ม ⋮) |
| Kiosk | `/kiosk` | `GET /kiosk/{kioskId}/event` ว่า kiosk นี้แสดง event ไหน + รูปโฆษณา |
| Register (มือถือ) | `/register` | `GET /public/events/{slug}/form` ฟิลด์ที่ admin ตั้งไว้, `POST /public/events/{slug}/registrations` ส่งฟอร์ม |
| Survey (มือถือ) | `/survey` | `GET /public/events/{slug}/survey` คำถาม, `POST /public/events/{slug}/survey-responses` ส่งคำตอบ |

หน้าที่ **ไม่ต้องใช้ API**: `/register/success` (หน้าลงทะเบียนสำเร็จ แสดงผลอย่างเดียว)

## สิ่งที่ทำงานได้แล้วโดยไม่ต้องมี API (เป็น state ในหน้าเว็บ)
- ปุ่ม filter All / Active / Scheduled / Ended ในหน้า Events
- ปุ่ม 7d / 14d / 30d ในกราฟ Dashboard
- Survey Builder: เพิ่ม/ลบคำถาม, เพิ่ม/ลบตัวเลือก, เปลี่ยนชนิดคำถาม, toggle Required
- Create Event: เลือกสีธีม, ดูตัวอย่างรูปที่อัปโหลด, เพิ่มฟิลด์ฟอร์ม, toggle Required, QR code สร้างจากลิงก์
- Admin Management: ค้นหาชื่อ/อีเมล, เปิด modal Invite admin
- Survey มือถือ: ตอบทีละข้อ, Back/Next, จำกัดเลือกได้สูงสุด 3 ข้อ, หน้า Thank you
- ข้อมูลที่กรอกจะหายเมื่อ refresh หน้า เพราะยังไม่ได้บันทึกลง backend
