# โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
> **ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (Project Operation & Maintenance Dashboard)**  
> สถาปัตยกรรมระบบ: **TypeScript-Only Fullstack Architecture (Next.js 16 App Router + React 19 TSX)**  
> เวอร์ชันระบบ: **v3.0.0**

---

## สารบัญ
- [ภาพรวมโครงการ](#ภาพรวมโครงการ)
- [ฟีเจอร์เด่นของระบบ (Key Features)](#ฟีเจอร์เด่นของระบบ-key-features)
- [เทคโนโลยีที่ใช้ (Tech Stack)](#เทคโนโลยีที่ใช้-tech-stack)
- [โครงสร้างสถาปัตยกรรม (Project Architecture)](#โครงสร้างสถาปัตยกรรม-project-architecture)
- [รายการหมวดหมู่งาน 8 โมดูล (8 Operational Modules)](#รายการหมวดหมู่งาน-8-โมดูล-8-operational-modules)
- [ระบบแปลภาษา (i18n Bilingual Engine)](#ระบบแปลภาษา-i18n-bilingual-engine)
- [API Endpoints](#api-endpoints)
- [วิธีติดตั้งและเรียกใช้งาน (Getting Started)](#วิธีติดตั้งและเรียกใช้งาน-getting-started)
- [คำสั่งการพัฒนาและการทดสอบ (Development & Verification)](#คำสั่งการพัฒนาและการทดสอบ-development--verification)
- [ประวัติเวอร์ชัน (Changelog)](#ประวัติเวอร์ชัน-changelog)

---

## ภาพรวมโครงการ
ระบบแดชบอร์ดศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ SHF ได้รับการยกระดับสถาปัตยกรรมสู่ **TypeScript-Only Fullstack Architecture (v3.0.0)** อย่างสมบูรณ์ 100% โดยขจัดความจำเป็นในการใช้ Java/Spring Boot, Standalone HTML, Standalone CSS, และ JavaScript แบบเดิมทั้งหมด แทนที่ด้วย **Next.js App Router**, **React TSX**, และการจัดการสไตล์ผ่าน **CSS-in-TS** ที่มีความปลอดภัยด้าน Type สูงสุด รองรับการทำงานทั้ง Frontend และ Backend REST API ภายใต้เทคโนโลยี TypeScript เพียงภาษาเดียว

---

## ฟีเจอร์เด่นของระบบ (Key Features)
1. **TypeScript-Only Architecture (v3.0.0):** ระบบพัฒนาด้วย TypeScript 100% ทั้งฝั่ง Frontend (React TSX) และ Backend REST API Route Handlers
2. **Zero Standalone HTML & CSS:** โครงสร้าง HTML ทั้งหมดถูกสร้างแบบ Dynamic ผ่าน Next.js `layout.tsx` และการจัดการสไตล์ทั้งหมดเขียนในรูปของ TypeScript (`src/styles/dashboard.styles.ts`)
3. **8 Operational Modules:** ครอบคลุมภารกิจการบำรุงรักษาเชิงป้องกัน (PM), การแก้ไขปัญหา (CM), แผนตรวจเยี่ยมรายไตรมาส, การเคลมอุปกรณ์, มอนิเตอร์โทรมาตรโครงข่าย, วาระเจ้าหน้าที่รัฐ กรมการปกครอง, คลังพัสดุและอะไหล่, และทะเบียนครุภัณฑ์
4. **Embedded HTML5 Video Showcase:** ฝังวิดีโอแนะนำและสาธิตการปฏิบัติการระบบ FORTH Master ความละเอียดสูง 1080p Full HD 60 FPS พร้อมการรองรับ Byte-range streaming
5. **Full Bilingual Engine (EN / TH):** สลับภาษาได้ทันทีผ่าน Header และ Context Hook (`useI18n`) พร้อมจดจำค่าภาษาผ่าน LocalStorage
6. **UI Icon Policy Compliance:** ใช้ Scalable Vector SVGs บริสุทธิ์ ปราศจาก Unicode Emojis ทั้งหมด
7. **REST API Parity:** มี Route Handlers `/api/v1/modules` และ `/api/v1/modules/[orderIndex]` คืนค่า JSON สำหรับ Single-Page Application และ Third-Party Integrations
8. **Automated Verification Suite:** ชุดทดสอบอัตโนมัติ 61 รายการ เขียนด้วย TypeScript ตรวจสอบความถูกต้องของ SemVer, URLs, Backend API, i18n, และตรวจสอบการไม่มีไฟล์ Legacy หลงเหลือ

---

## เทคโนโลยีที่ใช้ (Tech Stack)

### Fullstack Framework & Runtime
- **Runtime:** Node.js 18+ (ทดสอบบน Node.js 24)
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 7.0.2 / ECMAScript 2022
- **Frontend Library:** React 19 & React-DOM 19
- **Deployment Platform:** Vercel (Edge & Serverless Native)

### Styling & Design System
- **Styling Architecture:** Component-Based CSS-in-TS (`src/styles/dashboard.styles.ts`)
- **Theme:** Modern Deep Navy (`#070e1b`), Radiant Cyan (`#00e5ff`), Glassmorphism, CSS Grid
- **Typography:** Google Fonts (Sarabun, Inter)
- **Iconography:** Scalable Vector SVGs (100% Inline SVG, Zero Unicode Emojis)

---

## โครงสร้างสถาปัตยกรรม (Project Architecture)

```text
d:\Dashboard รวม/
├── public/                                      # Static Media & Favicons
│   ├── assets/icons/favicon.svg                 # SVG Vector Favicon
│   ├── favicon.ico                              # Fallback ICO Favicon
│   └── FORTH_MASTER_Video_Final-Additional.mp4  # H.264 HD 1080p Video (<100MB)
├── src/
│   ├── app/                                     # Next.js App Router
│   │   ├── layout.tsx                           # Root HTML Layout in TSX
│   │   ├── page.tsx                             # Main Interactive Dashboard Page
│   │   └── api/v1/modules/                      # TypeScript Backend REST API
│   │       ├── route.ts                         # GET /api/v1/modules
│   │       └── [orderIndex]/
│   │           └── route.ts                     # GET /api/v1/modules/[orderIndex]
│   ├── components/                              # Modular React TSX Components
│   │   ├── Header.tsx                           # Top Navigation Bar, Lang & Version
│   │   ├── Hero.tsx                             # Hero Banner, Telemetry Badge & CTAs
│   │   ├── ModuleCard.tsx                       # Interactive 8-Module Card
│   │   ├── ModulesSection.tsx                   # 8-Card Grid & Content Details Panel
│   │   ├── VideoShowcase.tsx                    # Video Player & Full HD 1080p Badges
│   │   └── Footer.tsx                           # Architecture & Version Footer
│   ├── lib/                                     # Core Logic & Services
│   │   ├── constants.ts                         # Authoritative Version (v3.0.0)
│   │   ├── types.ts                             # TypeScript Interfaces
│   │   ├── modules-data.ts                      # 8 Modules Data & SVG Icons
│   │   ├── modules-service.ts                   # Backend Business Logic (DashboardService)
│   │   └── i18n.ts                              # Bilingual Engine (EN / TH) & useI18n Hook
│   └── styles/                                  # Component-Based CSS-in-TS
│       └── dashboard.styles.ts                  # Pure TypeScript Design System
├── tests/
│   └── verify_system.ts                         # Automated Verification Suite (61 Tests)
├── package.json                                 # Manifest (v3.0.0)
├── tsconfig.json                                # TypeScript Compiler Config
├── vercel.json                                  # Vercel Deployment & Streaming Headers
├── CHANGELOG.md                                 # Release History
└── README.md                                    # Documentation
```

---

## รายการหมวดหมู่งาน 8 โมดูล (8 Operational Modules)

| ลำดับ | รหัสโมดูล | ชื่อหมวดหมู่งาน (English) | ชื่อหมวดหมู่งาน (ภาษาไทย) | ระบบปลายทาง (URL) |
|:---:|:---:|:---|:---|:---|
| 1 | `m1` | 1. Perform PM | 1. ปฏิบัติการบำรุงรักษาเชิงป้องกัน | `https://pm-5year.vercel.app/` |
| 2 | `m2` | 2. Handle CM | 2. ปฏิบัติการแก้ไขเหตุขัดข้อง | `https://dtrs-app-uat.forth.co.th/dashboard` |
| 3 | `m3` | 3. Quarterly Visits | 3. ดำเนินการตรวจเยี่ยมทุก 3 เดือน | `https://pre-pm-2.vercel.app/` |
| 4 | `m4` | 4. Process Claims | 4. จัดการและยื่นเคลมอุปกรณ์ | `https://equipment-claims.vercel.app/` |
| 5 | `m5` | 5. Monitor System | 5. ตรวจสอบและเฝ้าระวังสถานะระบบ | `https://bssc-nine.vercel.app/` |
| 6 | `m6` | 6. DOPA Tenure | 6. ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง | `https://wara5year.vercel.app/` |
| 7 | `m7` | 7. Manage Inventory | 7. บริหารจัดการคลังสินค้าและสต็อกอะไหล่ | `https://www.stockflowth.online/dashboard` |
| 8 | `m8` | 8. Assets & Equipment | 8. ติดตามและจัดการทะเบียนครุภัณฑ์ | `https://contion.vercel.app/` |

---

## ระบบแปลภาษา (i18n Bilingual Engine)
- **Default Language:** English (`en`) 100%
- **Supported Localization:** ภาษาไทย (`th`)
- **State Management:** Reactive Context ผ่าน `useI18n()`
- **Persistence:** LocalStorage key `shf_app_lang`
- **Interpolation:** รองรับ dynamic variable replacement เช่น `{{title}}`

---

## API Endpoints

### 1. ดึงรายการโมดูลทั้งหมด (All Modules)
- **Method:** `GET`
- **Endpoint:** `/api/v1/modules`
- **Response:** `200 OK` (JSON Array บรรจุ 8 โมดูล พร้อมข้อมูล URL และ SVG Icon)

### 2. ดึงข้อมูลโมดูลเดี่ยวตาม Order Index (Single Module)
- **Method:** `GET`
- **Endpoint:** `/api/v1/modules/{orderIndex}` (0 ถึง 7)
- **Response:** `200 OK` (JSON Object) หรือ `404 Not Found` หากไม่พบ

---

## วิธีติดตั้งและเรียกใช้งาน (Getting Started)

### ความต้องการของระบบ (Prerequisites)
- Node.js 18.0.0 ขึ้นไป
- npm 9.0.0 ขึ้นไป

### การติดตั้งและเริ่มรัน Development Server
```bash
# ติดตั้ง dependencies
npm install

# รัน Development Server
npm run dev
```
เปิดเบราว์เซอร์และเข้าไปที่ `http://localhost:3000`

---

## คำสั่งการพัฒนาและการทดสอบ (Development & Verification)

```bash
# ตรวจสอบ TypeScript Types ทั้งหมด
npm run typecheck

# รันชุดทดสอบระบบอัตโนมัติ 61 รายการ
npm test

# สร้าง Production Build ด้วย Next.js Turbopack
npm run build

# รันการตรวจสอบแบบครบวงจร (Typecheck + Test + Build)
npm run verify

# รัน Production Server บนเครื่อง Local
npm run start
```

---

## ข้อมูลไฟล์ Non-TypeScript ที่จำเป็นต้องมี (Unavoidable Files)
1. `package.json` — กำหนดค่า dependencies และ npm scripts
2. `tsconfig.json` — คอนฟิกูเรชันสำหรับ TypeScript Compiler
3. `vercel.json` — กำหนดค่า byte-range headers สำหรับการสตรีมมิ่งไฟล์วิดีโอบน Vercel
4. `.gitignore` — กำหนดการละเว้นไฟล์ชั่วคราวและ build artifacts
5. `README.md` & `CHANGELOG.md` — เอกสารประกอบระบบ
6. `public/` media assets — ไฟล์ Favicon และ MP4 Master Video
