# ระบบเช็คชื่อ-นับองค์ประชุม (Multi-event Quorum Check-in System)

ระบบเช็คชื่อเข้าประชุมที่ใช้ได้กับหลายงาน (สภานักเรียน, ประชุมครู ฯลฯ) โดยแค่สร้างงานใหม่ผ่านหน้าแอดมิน ไม่ต้องแก้โค้ด

**Stack:** Google Apps Script (backend/API) + Google Sheets (database) + GitHub Pages (frontend)

## หน้าเว็บทั้งหมด

| ไฟล์ | ใช้ทำอะไร | ใครเข้าได้ |
|---|---|---|
| `index.html` | เลือกงานประชุมที่เปิดอยู่ | ทุกคน |
| `checkin.html` | เช็คชื่อ (เลือกชื่อตัวเองจาก dropdown) | ทุกคน |
| `display.html` | จอแสดงผลฉายโปรเจคเตอร์ | ทุกคน (ลิงก์ตรง) |
| `secretary.html` | เลขาสภายืนยันสิทธิ์ผู้เข้าประชุม + กดเริ่มประชุม | ต้องมี PIN |
| `admin.html` | สร้าง/ปิดงานประชุม + ดูประวัติย้อนหลัง | ต้องมี PIN |

## ขั้นตอนติดตั้ง

### 1) เตรียม Google Sheet + Apps Script
1. สร้าง Google Sheet ใหม่ (ว่างเปล่าได้ ระบบจะสร้างชีทที่ต้องใช้ให้เองอัตโนมัติ)
2. เปิด **Extensions > Apps Script** แล้วลบโค้ดเดิมทิ้ง วางโค้ดจาก `Code.gs` ทั้งหมด
3. ไปที่ **Project Settings** (รูปเฟือง) > **Script Properties** > เพิ่ม 2 ค่า:
   - `SPREADSHEET_ID` = ID ของ Google Sheet (ดูจาก URL ช่วงระหว่าง `/d/` กับ `/edit`)
   - `ADMIN_PIN` = รหัส PIN ที่จะใช้เข้าหน้าเลขา/แอดมิน เช่น `2569`
4. **Deploy > New deployment > เลือกประเภท "Web app"**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. กด Deploy แล้ว copy **Web app URL** เก็บไว้

### 2) ตั้งค่า Frontend
1. เปิดไฟล์ `app.js` แก้บรรทัด:
   ```js
   const API_BASE_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   วาง Web app URL ที่ copy มาแทน
2. Push ไฟล์ทั้งหมด (`index.html`, `checkin.html`, `display.html`, `secretary.html`, `admin.html`, `style.css`, `app.js`) ขึ้น GitHub repo แล้วเปิด GitHub Pages

### 3) ทดสอบ
1. เปิดหน้า `admin.html` → กรอก PIN → แท็บ "+ สร้างงานใหม่" → กรอกชื่องาน + เพิ่มรายชื่อ (พิมพ์เองหรือกด "+ เพิ่มแถว") → กด "สร้างงานประชุม"
2. เปิด `index.html` จะเห็นงานที่สร้างไว้ กดเข้าไปเช็คชื่อทดสอบ
3. เปิด `secretary.html?event=...` (มีลิงก์ให้จากหน้าแอดมิน) → กรอก PIN → กดยืนยันสิทธิ์คนที่เช็คชื่อเข้ามา
4. เปิด `display.html?event=...` ฉายจอ ดูว่าตัวเลข/กราฟอัปเดตทุก 7 วิ

## หมายเหตุสำคัญ (ตามที่เคยเจอปัญหามาก่อน)

- **ทุกครั้งที่ deploy ใหม่ (New deployment)** ต้อง copy Web app URL ใหม่มาใส่ใน `app.js` อีกครั้ง (ถ้าใช้ "Manage deployments > Edit > New version" กับ deployment เดิม URL จะไม่เปลี่ยน — แนะนำให้ใช้วิธีนี้แทนการสร้าง deployment ใหม่ทุกครั้ง)
- คำขอ POST ทั้งหมดใช้ `Content-Type: text/plain` เพื่อเลี่ยง CORS preflight ที่ Apps Script ไม่รองรับ — ห้ามเปลี่ยนเป็น `application/json`
- หลัง push โค้ดขึ้น GitHub Pages ต้อง hard refresh (Ctrl+Shift+R) ถึงจะเห็นการเปลี่ยนแปลง
- **กลุ่มสมาชิก (`group_name`)** สำหรับปุ่ม "โหลดรายชื่อจากกลุ่มที่มีอยู่" ในหน้าแอดมิน ต้องไปเพิ่มข้อมูลใน sheet `Members_Master` เอง (member_id, name, group_name, department) — ยังไม่มีหน้าเว็บสำหรับจัดการส่วนนี้ในเวอร์ชันนี้ ถ้าต้องการเพิ่มทีหลังบอกได้เลย
- ระบบรองรับได้ถึงหลักร้อยคนต่องานสบายๆ (ออกแบบมาสำหรับ 40-140 คนตามที่แจ้งไว้) Apps Script quota ปกติ 20,000 requests/วัน ไม่มีทางชนที่ scale นี้

## แนวคิดการออกแบบ (สั้นๆ)

- ธีมสี: น้ำเงินหมึกเข้ม (--ink) + ทองเหลือง (--brass) สื่อถึงบรรยากาศห้องประชุมทางการ อ่านง่ายจากระยะไกลบนจอโปรเจคเตอร์
- ฟอนต์: Kanit (หัวเรื่อง/ตัวเลข) + Sarabun (เนื้อหา) — คู่ฟอนต์ไทยที่อ่านง่ายทั้งจอเล็กจอใหญ่
- องค์ประกอบเด่นของหน้าจอแสดงผล: วงแหวนแสดง % องค์ประชุม (ring gauge) เปลี่ยนสีทอง → เขียว ทันทีที่ผ่านเกณฑ์ ให้เห็นสถานะได้จากระยะไกลโดยไม่ต้องอ่านตัวเลข
