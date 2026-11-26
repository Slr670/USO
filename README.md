# โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
> **USO Operations Portal — ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (Operations & Maintenance Dashboard)**  
> สถาปัตยกรรมระบบ: **TypeScript-Only Fullstack Architecture (Next.js 16 App Router + React 19 TSX)**  
> เวอร์ชันระบบ: **v3.2.1**

---

## สารบัญ
- [ภาพรวมโครงการ](#ภาพรวมโครงการ)
- [ฟีเจอร์เด่นของระบบ (Key Features)](#ฟีเจอร์เด่นของระบบ-key-features)
- [เทคโนโลยีที่ใช้ (Tech Stack)](#เทคโนโลยีที่ใช้-tech-stack)
- [โครงสร้างสถาปัตยกรรม (Project Architecture)](#โครงสร้างสถาปัตยกรรม-project-architecture)
- [รายการหมวดหมู่งาน 10 โมดูล (10 Operational Modules)](#รายการหมวดหมู่งาน-10-โมดูล-10-operational-modules)
- [ระบบจัดการตั้งค่าโมดูลแบบไดนามิก (Admin Config & Global Sync)](#ระบบจัดการตั้งค่าโมดูลแบบไดนามิก-admin-config--global-sync)
- [ระบบแปลภาษา (i18n Bilingual Engine)](#ระบบแปลภาษา-i18n-bilingual-engine)
- [API Endpoints](#api-endpoints)
- [ตัวแปรสภาพแวดล้อม (Environment Variables)](#ตัวแปรสภาพแวดล้อม-environment-variables)
- [วิธีติดตั้งและเรียกใช้งาน (Getting Started)](#วิธีติดตั้งและเรียกใช้งาน-getting-started)
- [คำสั่งการพัฒนาและการทดสอบ (Development & Verification)](#คำสั่งการพัฒนาและการทดสอบ-development--verification)
- [ข้อมูลไฟล์ Non-TypeScript ที่จำเป็นต้องมี (Unavoidable Files)](#ข้อมูลไฟล์-non-typescript-ที่จำเป็นต้องมี-unavoidable-files)

---

## ภาพรวมโครงการ
ระบบแดชบอร์ดศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ **USO Operations Portal (SHF Repeater Network Optimization Project)** รองรับการบริหารจัดการโครงข่ายสถานีทวนสัญญาณ 181 สถานี พัฒนาภายใต้สถาปัตยกรรม **TypeScript-Only Fullstack Architecture (v3.2.1)** อย่างสมบูรณ์ 100% โดยขจัดความจำเป็นในการใช้ Java/Spring Boot, Standalone HTML, Standalone CSS และไฟล์ JavaScript แบบเดิมทั้งหมด แทนที่ด้วย **Next.js 16 App Router**, **React 19 TSX** และการจัดการสไตล์ผ่าน **CSS-in-TS** ที่มีความปลอดภัยด้าน Type สูงสุด พร้อมระบบปรับแต่งชื่อและลิงก์ปลายทางของทั้ง 10 โมดูลแบบไดนามิกที่ซิงโครไนซ์ข้อมูลร่วมกันได้ทั่วทั้งระบบ (Global Shared Configuration Synchronization)

---

## ฟีเจอร์เด่นของระบบ (Key Features)
1. **TypeScript-Only Architecture (v3.2.1):** พัฒนาด้วย TypeScript 100% ทั้งฝั่ง Frontend (React TSX) และ Backend REST API Route Handlers ปราศจากไฟล์ `.java`, `.html`, `.css` หรือ `.js` แยกเดี่ยว
2. **10 Operational Modules (5x2 Responsive Grid):** ครอบคลุมภารกิจครบวงจร 10 ระบบงาน ตั้งแต่การบำรุงรักษาเชิงป้องกัน (PM), การแก้ไขเหตุขัดข้อง (CM), การตรวจเยี่ยมรายไตรมาส, การเคลมอุปกรณ์, มอนิเตอร์สถานะโครงข่าย, ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง (DOPA), บริหารคลังอะไหล่, ทะเบียนครุภัณฑ์, คำนวณระยะติดตั้งสายอากาศ (Antenna Spacing) และคำนวณทิศทางองศาสายอากาศ (Antenna Azimuth)
3. **Immersive Hero Command Banner:** ส่วนต้อนรับเต็มหน้าจอ (`100vh` / `100dvh`) พร้อมวิดีโอพื้นหลัง `VEO1.mp4`, เอฟเฟกต์แสงนีออนไล่เฉดสี (`USO OPERATIONS PORTAL`), ปุ่มหลัก **Enter System (`เข้าสู่ระบบงาน`)** ที่เปิดโมดูล PM และเลื่อนหน้าจอไปยังแดชบอร์ดอัตโนมัติ และปุ่มรอง **View Presentation (`รับชมวิดีโอนำเสนอ`)** ที่เลื่อนไปยังส่วนวิดีโอสาธิต
4. **Dynamic Admin Configuration & Global Cloud Sync:** ผู้ดูแลระบบสามารถคลิกไอคอนฟันเฟืองบน Header ยืนยันตัวตนด้วยรหัสผ่านแบบ Ephemeral Session เพื่อแก้ไข URL ปลายทาง ชื่อการ์ด และคำอธิบายทั้งภาษาไทย/อังกฤษของทั้ง 10 โมดูล พร้อมซิงโครไนซ์ข้อมูลไปยังผู้ใช้งานทุกคนแบบเรียลไทม์
5. **Multi-Tier Resilient Storage & Safe Fallback:** รองรับการบันทึกค่าตั้งค่าผ่าน Vercel KV (Upstash Redis), Supabase REST API, In-Memory Cache และ Local/Temp Filesystem พร้อมระบบ Fail-safe คืนค่าเริ่มต้นอัตโนมัติ (`200 OK`) หากยังไม่ได้เชื่อมต่อฐานข้อมูลภายนอก
6. **Policy-Aware HTML5 Video Showcase:** ฝังวิดีโอสาธิตการปฏิบัติการระบบ FORTH Master (`FORTH_MASTER_Video_Final-Additional.mp4`) รองรับการเล่นวนซ้ำอัตโนมัติ (`loop`), Byte-range streaming, ตั้งค่าระดับเสียงเริ่มต้นที่ 50% และระบบสลับ Muted Fallback อัตโนมัติตามนโยบายเบราว์เซอร์
7. **Full Bilingual Engine (EN / TH) + Runtime Overrides:** สลับภาษาอังกฤษ/ไทยได้ทันทีผ่าน Header พร้อมจดจำค่าภาษาใน `localStorage` และรองรับการเขียนทับคำแปลแบบไดนามิกจาก Admin Config
8. **UI Icon Policy & Micro-Interactions:** ใช้ Scalable Vector SVGs บริสุทธิ์ 100% (Zero Unicode Emojis) พร้อมอนิเมชัน Spring Bounce, แสงออร่าเมื่อ Hover และรองรับ `prefers-reduced-motion`
9. **Progressive Web App (PWA v2.0.0) & Offline Caching:** รองรับการติดตั้งเป็นแอปพลิเคชัน Standalone บน Desktop, Android และ iOS พร้อมไฟล์ `public/manifest.json`, ชุดไอคอนครบทุกขนาด (`72x72`–`512x512`, Maskable Icons, Apple Touch Icon), PWA Meta Tags ใน `<head>` และ Service Worker (`/sw.js` ผ่าน TypeScript Route Handler) สำหรับแคช App Shell, Static Assets และ API แบบออฟไลน์โดยไม่กระทบการสตรีมวิดีโอ
10. **Automated Verification Suite (254 Checks):** ชุดทดสอบอัตโนมัติ 254 รายการ (14 หมวดการทดสอบ) เขียนด้วย TypeScript ตรวจสอบความถูกต้องของเวอร์ชัน, ลิงก์ทั้ง 10 โมดูล, i18n, UI Interactions, ระบบยืนยันตัวตน, การซิงโครไนซ์ API และระบบ PWA v2.0.0

---

## เทคโนโลยีที่ใช้ (Tech Stack)

### Fullstack Framework & Runtime
- **Runtime:** Node.js 18+
- **Framework:** Next.js `^16.3.5` (App Router)
- **Language:** TypeScript `7.0.2` / ECMAScript 2022
- **Frontend Library:** React `19` & React-DOM `19`
- **Test Runner:** `tsx` (`^4.19.0`)
- **Deployment Platform:** Vercel (Serverless Node.js Runtime & Edge CDN)

### Styling & Design System
- **Styling Architecture:** Component-Based CSS-in-TS (`src/styles/dashboard.styles.ts`)
- **Theme:** Modern Deep Navy (`#070e1b`), Radiant Cyan (`#00e5ff`), Neon Teal-to-Purple Gradients, Glassmorphism, Fluid Typography (`clamp()`)
- **Typography:** Google Fonts (Sarabun, Inter)
- **Iconography:** 100% Scalable Vector SVGs (Zero Unicode Emojis)

---

## โครงสร้างสถาปัตยกรรม (Project Architecture)

```text
shf-dashboard/
├── data/
│   └── modules-config.json                      # Local JSON Persistence สำหรับค่าตั้งค่าโมดูล
├── public/                                      # Static Media, Branding & Favicons
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── broadcast-tower.svg              # Broadcast Tower Vector Asset
│   │   │   └── favicon.svg                      # SVG Vector Favicon
│   │   └── image/
│   │       ├── USO_portal_icon.png              # USO Operations Portal Brand Emblem
│   │       └── VEO1.mp4                         # Hero Ambient Background Video
│   ├── favicon.ico                              # Fallback ICO Favicon
│   └── FORTH_MASTER_Video_Final-Additional.mp4  # H.264 Master Operations Video (<100MB)
├── src/
│   ├── app/                                     # Next.js App Router
│   │   ├── layout.tsx                           # Root HTML Layout in TSX (wraps AppProviders)
│   │   ├── page.tsx                             # Main Interactive Dashboard Page & Hash Routing
│   │   └── api/v1/                              # TypeScript Backend REST API Route Handlers
│   │       ├── config/
│   │       │   └── route.ts                     # Alias Endpoint -> /api/v1/modules/config
│   │       └── modules/
│   │           ├── route.ts                     # GET /api/v1/modules (10 Modules)
│   │           ├── [orderIndex]/
│   │           │   └── route.ts                 # GET /api/v1/modules/[orderIndex] (0-9)
│   │           └── config/
│   │               └── route.ts                 # GET, POST, PUT, DELETE, OPTIONS Global Config
│   ├── assets/
│   │   └── uso-logo.ts                          # Typed USO Logo Path & Base64 Constant
│   ├── components/                              # Modular React TSX Components
│   │   ├── AppProviders.tsx                     # Global Context Providers & i18n Override Bridge
│   │   ├── Header.tsx                           # USO Brand Bar, EN/TH Switch & Admin Gear Button
│   │   ├── Hero.tsx                             # Full-Screen Video Hero & Dual Navigation CTAs
│   │   ├── ModuleCard.tsx                       # Interactive Service Module Card with SVG Aura
│   │   ├── ModulesSection.tsx                   # 10-Card Grid, Auto-Scroll & Module Details Panel
│   │   ├── VideoShowcase.tsx                    # Policy-Aware Continuous Loop Video Player
│   │   ├── AdminAuthModal.tsx                   # Ephemeral Passcode Authentication Modal
│   │   ├── AdminConfigModal.tsx                 # Dynamic 10-Module Editor & Cloud Sync Badge
│   │   └── Footer.tsx                           # Copyright & Authoritative Version Footer
│   ├── lib/                                     # Core Business Logic, Config Store & i18n
│   │   ├── constants.ts                         # Authoritative Version (v3.2.1) & Asset Constants
│   │   ├── config-constants.ts                  # Admin Auth & LocalStorage Config Keys
│   │   ├── types.ts                             # TypeScript Interfaces & Type Definitions
│   │   ├── modules-data.ts                      # Default 10 Operational Modules & SVG Registry
│   │   ├── modules-service.ts                   # Backend Business Logic (DashboardService)
│   │   ├── modules-config.tsx                   # Client-Side Config Provider & Real-Time Sync
│   │   ├── server-config-store.ts               # Multi-Tier Persistence (KV / Supabase / FS / Memory)
│   │   ├── i18n-resources.ts                    # Server-Safe Bilingual Dictionary Payload (EN / TH)
│   │   └── i18n.ts                              # Client Reactive i18n Engine & useI18n() Hook
│   └── styles/
│       └── dashboard.styles.ts                  # Pure TypeScript Design System (CSS-in-TS)
├── tests/
│   └── verify_system.ts                         # Automated Verification Suite (202 Checks)
├── package.json                                 # Project Manifest & Scripts (v3.2.1)
├── tsconfig.json                                # TypeScript Compiler Configuration
├── vercel.json                                  # Vercel Next.js Config & Video Byte-Range Headers
├── CHANGELOG.md                                 # Detailed Semantic Version Release History
└── README.md                                    # Project Documentation
```

---

## รายการหมวดหมู่งาน 10 โมดูล (10 Operational Modules)

| ลำดับ | รหัสโมดูล | `orderIndex` | ชื่อหมวดหมู่งาน (English) | ชื่อหมวดหมู่งาน (ภาษาไทย) | ระบบปลายทางเริ่มต้น (Default URL) |
|:---:|:---:|:---:|:---|:---|:---|
| 1 | `m1` | `0` | 1. Perform PM | 1. ปฏิบัติการบำรุงรักษาเชิงป้องกัน | `https://pm-5year.vercel.app/` |
| 2 | `m2` | `1` | 2. Handle CM | 2. ปฏิบัติการแก้ไขเหตุขัดข้อง | `https://dtrs-app.forth.co.th/public/report` |
| 3 | `m3` | `2` | 3. Quarterly Visits | 3. ดำเนินการตรวจเยี่ยมทุก 3 เดือน | `https://thaidimaru.github.io/Pre_PM2/dashboard` |
| 4 | `m4` | `3` | 4. Process Claims | 4. จัดการและยื่นเคลมอุปกรณ์ | `https://claims-nu-taupe.vercel.app/` |
| 5 | `m5` | `4` | 5. Monitor System | 5. ตรวจสอบและเฝ้าระวังสถานะระบบ | `https://bssc-nine.vercel.app/` |
| 6 | `m6` | `5` | 6. DOPA Tenure | 6. ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง | `https://wara5year.vercel.app/` |
| 7 | `m7` | `6` | 7. Manage Inventory | 7. บริหารจัดการคลังสินค้าและสต็อกอะไหล่ | `https://www.stockflowth.online/dashboard` |
| 8 | `m8` | `7` | 8. Assets & Equipment | 8. ติดตามและจัดการทะเบียนครุภัณฑ์ | `https://contion.vercel.app/` |
| 9 | `m9` | `8` | 9. Calculate Antenna Spacing | 9. ระบบคำนวณระยะติดตั้งสายอากาศ | `https://antenna-inky.vercel.app/` |
| 10 | `m10` | `9` | 10. Calculate Antenna Azimuth | 10. ระบบคำนวณทิศทางองศาของสายอากาศ | `https://azmuth-kappa.vercel.app/` |

> **หมายเหตุ:** เมื่อคลิกเลือกการ์ดโมดูลใดๆ หน้าจอจะเลื่อนแบบนุ่มนวล (`scrollIntoView`) ไปยังแผง **MODULE DETAILS** พร้อมเว้นระยะใต้ Sticky Header อัตโนมัติ และสามารถกดปุ่มแอ็กชันหลักเพื่อเปิดระบบปลายทางในแท็บใหม่ได้ทันที

---

## ระบบจัดการตั้งค่าโมดูลแบบไดนามิก (Admin Config & Global Sync)
ระบบรองรับการปรับแต่งข้อมูลของทั้ง 10 โมดูลผ่านหน้าเว็บได้โดยตรงโดยไม่ต้องแก้ไขโค้ดหรือ Deploy ใหม่:
- **การเข้าใช้งาน:** คลิกปุ่มไอคอนฟันเฟือง (`#btn-admin-settings`) บนแถบ Header ด้านขวาบน และกรอกรหัสผ่านผู้ดูแลระบบ (บังคับยืนยันรหัสผ่านใหม่ทุกครั้งที่เปิดหน้าต่าง — Ephemeral Session)
- **สิ่งที่ปรับแต่งได้:** ลิงก์ระบบปลายทาง (`externalUrl`), ชื่อบนการ์ด (`shortTitle`), ชื่อเต็มในแผงรายละเอียด (`fullTitle`), ป้ายหมวดหมู่ (`badge`) และคำอธิบาย (`description`) แยกอิสระทั้งภาษาอังกฤษ (`EN`) และภาษาไทย (`TH`) พร้อมช่องค้นหา ปุ่มทดสอบลิงก์ (`Test Link`) และปุ่มคืนค่าเริ่มต้น (`Reset All to Defaults`)
- **ลำดับการจัดเก็บข้อมูลฝั่งเซิร์ฟเวอร์ (`server-config-store.ts`):**
  1. **Vercel KV / Upstash Redis REST API** (เมื่อกำหนดค่า Environment Variables)
  2. **Supabase REST API** (`app_config` table เมื่อกำหนดค่า Environment Variables)
  3. **In-Memory Global Singleton Cache** (ซิงค์ทันทีภายในโปรเซสเดียวกัน)
  4. **Local / Temp Filesystem** (`data/modules-config.json` หรือ `/tmp/shf_modules_config.json` บนสภาพแวดล้อม Serverless)
  5. **Guaranteed Default Fallback** (คืนค่าเริ่มต้นของระบบด้วยสถานะ `200 OK` เสมอ แม้ยังไม่ได้ตั้งค่าฐานข้อมูลภายนอก)
- **การซิงโครไนซ์ฝั่งไคลเอนต์ (`modules-config.tsx`):** โหลดข้อมูลเริ่มต้นอย่างรวดเร็วจาก `localStorage` (`shf_modules_custom_config_v1`) ตามด้วยการดึงข้อมูลล่าสุดจาก `/api/v1/modules/config` ทันทีเมื่อเปิดหน้าเว็บ และซิงค์ข้อมูลอัตโนมัติเมื่อสลับกลับมาที่หน้าต่างเบราว์เซอร์ (`window` focus event)

---

## ระบบแปลภาษา (i18n Bilingual Engine)
- **Default Language:** English (`en`)
- **Supported Localization:** ภาษาไทย (`th`)
- **Architecture:** แยกพจนานุกรมส่วนกลางไว้ที่ `src/lib/i18n-resources.ts` เพื่อให้เรียกใช้ได้ปลอดภัยทั้งฝั่ง Server Route Handlers และฝั่ง Client React Context (`src/lib/i18n.ts`)
- **State & Persistence:** จัดการผ่าน Hook `useI18n()` พร้อมบันทึกค่าภาษาลงใน `localStorage` (`shf_app_lang`)
- **Dynamic Overrides & Interpolation:** รองรับการแทนที่ตัวแปรแบบไดนามิก เช่น `{{title}}` และเชื่อมต่อกับ `AppProviders.tsx` เพื่อแสดงผลคำแปลที่ผู้ดูแลระบบปรับแต่งแบบเรียลไทม์

---

## API Endpoints

### 1. ดึงรายการโมดูลปฏิบัติการทั้งหมด (All Modules)
- **Method:** `GET`
- **Endpoint:** `/api/v1/modules`
- **Response:** `200 OK` — JSON Array บรรจุข้อมูลทั้ง 10 โมดูล (ผสานค่าที่ปรับแต่งล่าสุดจาก Shared Config Store พร้อม SVG Icon)

### 2. ดึงข้อมูลโมดูลรายตัวตามลำดับ (Single Module by Order Index)
- **Method:** `GET`
- **Endpoint:** `/api/v1/modules/{orderIndex}` (ค่า `0` ถึง `9`)
- **Response:** `200 OK` (JSON Object), `400 Bad Request` (กรณีพารามิเตอร์ไม่ใช่ตัวเลข) หรือ `404 Not Found` (กรณีไม่พบลำดับที่ระบุ)

### 3. ดึงและจัดการค่าตั้งค่าโมดูลส่วนกลาง (Global Modules Configuration)
- **Endpoint:** `/api/v1/modules/config` *(และ Alias `/api/v1/config`)*
- **Methods:**
  - `GET` — ดึงข้อมูลการตั้งค่าของทั้ง 10 โมดูล พร้อมข้อมูลแหล่งจัดเก็บและสถานะการเชื่อมต่อ (`meta.diagnostics`) คืนค่า `200 OK` เสมอ
  - `POST` / `PUT` — บันทึกและอัปเดตค่าตั้งค่าโมดูลส่วนกลาง (ต้องแนบ Header `Authorization: Bearer <token>` หรือ `x-admin-key: <token>` มิฉะนั้นจะได้รับ `401 Unauthorized`)
  - `DELETE` — รีเซ็ตค่าตั้งค่าทั้ง 10 โมดูลกลับเป็นค่าเริ่มต้นของระบบ (ต้องแนบ Admin Authorization Header)
  - `OPTIONS` — รองรับ CORS Preflight (`204 No Content`)

---

## ตัวแปรสภาพแวดล้อม (Environment Variables)
ระบบสามารถรันและใช้งานได้ทันทีโดย**ไม่จำเป็นต้องตั้งค่า Environment Variables ใดๆ** (ทำงานในโหมด Local Filesystem / Fallback อัตโนมัติ) หากนำไป Deploy บน Vercel และต้องการเปิดใช้งาน Cloud Database ถาวร สามารถกำหนดค่าเพิ่มเติมได้ดังนี้:

| ตัวแปร (Variable) | สถานะ | คำอธิบาย |
|:---|:---:|:---|
| `KV_REST_API_URL` *(หรือ `UPSTASH_REDIS_REST_URL`)* | Optional | HTTP/HTTPS Endpoint ของ Vercel KV หรือ Upstash Redis |
| `KV_REST_API_TOKEN` *(หรือ `UPSTASH_REDIS_REST_TOKEN`)* | Optional | REST API Token สำหรับอ่าน/เขียนข้อมูลบน Vercel KV / Upstash |
| `SUPABASE_URL` *(หรือ `NEXT_PUBLIC_SUPABASE_URL`)* | Optional | Project URL ของ Supabase สำหรับเก็บค่าคอนฟิกสำรอง |
| `SUPABASE_SERVICE_ROLE_KEY` *(หรือ `SUPABASE_ANON_KEY`)* | Optional | API Key สำหรับเชื่อมต่อตาราง `app_config` บน Supabase |
| `ADMIN_KEY` *(หรือ `ADMIN_PASSCODE` / `ADMIN_AUTH_TOKEN`)* | Optional | รหัสผ่านเพิ่มเติมสำหรับตรวจสอบสิทธิ์ API แก้ไขค่าตั้งค่าผู้ดูแลระบบ |

---

## วิธีติดตั้งและเรียกใช้งาน (Getting Started)

### ความต้องการของระบบ (Prerequisites)
- Node.js `>= 18.0.0`
- npm `>= 9.0.0`

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
# ตรวจสอบความถูกต้องของ TypeScript Types ทั้งหมด
npm run typecheck

# รันชุดทดสอบระบบอัตโนมัติครบวงจร (202 รายการ / 12 หมวดการทดสอบ)
npm test

# สร้าง Production Build ด้วย Next.js
npm run build

# รันการตรวจสอบคุณภาพแบบครบวงจร (Typecheck + Test + Build)
npm run verify

# รัน Production Server บนเครื่อง Local
npm run start
```

---

## ข้อมูลไฟล์ Non-TypeScript ที่จำเป็นต้องมี (Unavoidable Files)
1. `package.json` & `package-lock.json` — กำหนดค่า dependencies, เวอร์ชันระบบ (`3.2.1`) และ npm scripts
2. `tsconfig.json` — คอนฟิกูเรชันสำหรับ TypeScript Compiler
3. `vercel.json` — กำหนดค่าเฟรมเวิร์ก Next.js และ Byte-range headers สำหรับสตรีมวิดีโอบน Vercel
4. `data/modules-config.json` — ไฟล์ JSON สำหรับจัดเก็บค่าตั้งค่าโมดูลแบบ Local Persistence
5. `.gitignore` — กำหนดการละเว้นไฟล์ชั่วคราว ไฟล์วิดีโอขนาดใหญ่เกินพิกัด และ build artifacts
6. `README.md` & `CHANGELOG.md` — เอกสารคู่มือและประวัติการพัฒนาเวอร์ชันของระบบ ([ดูรายละเอียดใน CHANGELOG.md](./CHANGELOG.md))
7. `public/` & `assets/` media files — ไฟล์ไอคอน โลโก้ USO วิดีโอพื้นหลัง `VEO1.mp4` และวิดีโอสาธิต `FORTH_MASTER_Video_Final-Additional.mp4`
