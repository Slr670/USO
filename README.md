# โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
> **ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (Project Operation & Maintenance Dashboard)**  
> สถาปัตยกรรมระบบ: **Dual-Stack (Java Spring Boot 3 Thymeleaf MVC & Standalone Web Client)**  
> เวอร์ชันระบบ: **v2.4.6**

---

## สารบัญ
- [ภาพรวมโครงการ](#ภาพรวมโครงการ)
- [ฟีเจอร์เด่นของระบบ (Key Features)](#ฟีเจอร์เด่นของระบบ-key-features)
- [เทคโนโลยีที่ใช้ (Tech Stack)](#เทคโนโลยีที่ใช้-tech-stack)
- [โครงสร้างสถาปัตยกรรม (Project Architecture)](#โครงสร้างสถาปัตยกรรม-project-architecture)
- [รายการหมวดหมู่งาน 8 โมดูล (8 Operational Modules)](#รายการหมวดหมู่งาน-8-โมดูล-8-operational-modules)
- [ระบบแปลภาษา (i18n Translation Engine)](#ระบบแปลภาษา-i18n-translation-engine)
- [API Endpoints](#api-endpoints)
- [วิธีติดตั้งและเรียกใช้งาน (Getting Started)](#วิธีติดตั้งและเรียกใช้งาน-getting-started)
- [การทดสอบระบบ (Testing & Verification)](#การทดสอบระบบ-testing--verification)
- [ประวัติเวอร์ชัน (Changelog)](#ประวัติเวอร์ชัน-changelog)

---

## ภาพรวมโครงการ
ระบบแดชบอร์ดศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ SHF พัฒนาขึ้นเพื่อบริหารจัดการและติดตามการดำเนินงานครอบคลุม **8 หมวดหมู่งานหลัก** ของเครือข่ายสถานีทวนสัญญาณความถี่สูง (SHF) และสถานี USO ทั่วประเทศ พร้อมระบบประสานงานเจ้าหน้าที่รัฐ กรมการปกครอง (DOPA), ระบบแปลภาษาสองภาษา (EN/TH) ผ่าน i18next และ React, สถาปัตยกรรมรองรับทั้ง Spring Boot MVC Server และ Standalone Client

---

## ฟีเจอร์เด่นของระบบ (Key Features)
1. **8 Operational Modules:** ครอบคลุมภารกิจการบำรุงรักษาเชิงป้องกัน (PM), การแก้ไขปัญหา (CM), แผนตรวจเยี่ยมรายไตรมาส, การเคลมอุปกรณ์, มอนิเตอร์โทรมาตรโครงข่าย, วาระเจ้าหน้าที่รัฐ กรมการปกครอง, คลังพัสดุและอะไหล่, และทะเบียนครุภัณฑ์
2. **Embedded Responsive HTML5 Video Showcase:** ฝังวิดีโอแนะนำและสาธิตการปฏิบัติการระบบ FORTH Master ความละเอียดสูง พร้อมเครื่องเล่นวิดีโอ HTML5 responsive แบบ 16:9 และคำบรรยายสองภาษา
3. **DOPA Officials' Tenure Portal Integration:** เชื่อมต่อระบบติดตามวาระและภารกิจของเจ้าหน้าที่ฝ่ายปกครองสำหรับ 181 สถานี USO ไปยังระบบหลักภายนอกโดยตรง ([wara5year.vercel.app](https://wara5year.vercel.app/))
4. **i18next + react-i18next Engine:** รองรับการสลับภาษาแบบ Dynamic On-the-Fly (English 100% เป็นค่าเริ่มต้น และ Thai) ผ่าน React Header Component โดยไม่ต้องรีเฟรชหน้าเว็บ
5. **UI Icon Policy Compliance:** ออกแบบตามมาตรฐาน UI Icon ระดับมืออาชีพ ปราศจาก Unicode Emojis ทั้งหมด โดยใช้ Scalable Inline SVGs และ Font Awesome 6
6. **Dual-Stack Architecture:** ใช้งานได้ทั้งแบบ Static Web Client (รันบน CDN/Vercel/Static Host) และ Enterprise Java Spring Boot 3 MVC Server

---

## เทคโนโลยีที่ใช้ (Tech Stack)

### Backend (Spring Boot Stack)
- **Runtime:** Java 17+ (LTS)
- **Framework:** Spring Boot 3.3.3
  - `spring-boot-starter-web` (Embedded Tomcat & RESTful Controller)
  - `spring-boot-starter-thymeleaf` (Server-Side Rendering MVC Views)
  - `spring-boot-starter-test` (JUnit 5 & Spring Boot Test Suite)
- **Build Tool:** Apache Maven 3.9+ (พร้อม Maven Wrapper `mvnw` / `mvnw.cmd`)

### Frontend & Client Stack
- **Languages & Frameworks:** HTML5, CSS3, Vanilla ES6 JavaScript, React 18, React-DOM 18
- **Translation Engine:** `i18next` v23+ และ `react-i18next` v13+
- **Styling System:** Enterprise Glassmorphism UI, Responsive CSS Grid, CSS Variables Design Tokens
- **Typography:** Google Fonts (Sarabun, Inter, Plus Jakarta Sans, Prompt)
- **Iconography:** Scalable Vector SVGs และ Font Awesome 6

---

## โครงสร้างสถาปัตยกรรม (Project Architecture)

```text
d:\Dashboard รวม\
├── pom.xml                                      # การตั้งค่า Maven & Dependencies (v2.4.3)
├── mvnw / mvnw.cmd                              # Maven Wrapper Scripts
├── .gitignore                                   # กรองไฟล์ที่ไม่จำเป็นต่อ Git
├── README.md                                    # เอกสารคู่มือระบบฉบับสมบูรณ์ (v2.4.3)
├── CHANGELOG.md                                 # บันทึกประวัติการปรับปรุงระบบ (SemVer)
├── index.html                                   # หน้าแดชบอร์ดหลักสำหรับ Standalone Web Client
├── gemini-code-1789376108233.html               # พรีวิวหน้าเว็บสำรอง
├── scripts/                                     # JavaScript ควบคุมการทำงานของ Client
│   ├── dashboard.js                             # Logic หลักของ UI State, Routing และ Event Handling
│   ├── modules-data.js                          # ข้อมูลจำเพาะและ Inline SVG ของทั้ง 8 โมดูล
│   ├── i18n.js                                  # กลไกแปลภาษา i18next & พจนานุกรม EN/TH
│   └── vendor/                                  # Vendor Libraries แบบ Standalone
│       ├── i18next.min.js
│       ├── react.production.min.js
│       ├── react-dom.production.min.js
│       └── react-i18next.min.js
├── styles/
│   └── dashboard.css                            # Glassmorphism Design System และสไตล์วิดเจ็ต
└── src/
    ├── main/
    │   ├── java/com/uso/dashboard/
    │   │   ├── ShfDashboardApplication.java     # Main Spring Boot Application Entry Point
    │   │   ├── controller/
    │   │   │   ├── DashboardController.java     # Spring MVC Controller เส้นทางหลัก ("/")
    │   │   │   └── DashboardApiController.java  # REST API Controller ให้บริการ JSON
    │   │   ├── model/
    │   │   │   └── DashboardModule.java         # Domain Model ห่อหุ้มข้อมูลโมดูล
    │   │   └── service/
    │   │       ├── DashboardService.java        # Service Interface กำหนดสัญญาทางธุรกิจ
    │   │       └── impl/
    │   │           └── DashboardServiceImpl.java # Implementation บรรจุข้อมูลทั้ง 8 โมดูล
    │   └── resources/
    │       ├── application.yml                  # การตั้งค่าพอร์ตและเมทาดาทาของ Spring Boot
    │       ├── static/                          # Static Assets สำหรับ Spring Boot Server
    │       │   ├── css/dashboard.css
    │       │   └── js/
    │       │       ├── dashboard.js
    │       │       ├── modules-data.js
    │       │       ├── i18n.js
    │       │       └── vendor/
    │       └── templates/                       # Thymeleaf Templates
    │           ├── index.html                   # แม่แบบหน้าแรกของ Spring Boot
    │           └── fragments/
    │               ├── header.html              # ส่วนหัวเรื่องและ Version Badge
    │               └── footer.html              # ส่วนท้ายและสถานะสถาปัตยกรรม
    └── test/
        └── java/com/uso/dashboard/
            └── ShfDashboardApplicationTests.java # Unit Test ตรวจสอบ Context และความถูกต้องของโมดูล
```

---

## รายการหมวดหมู่งาน 8 โมดูล (8 Operational Modules)
1. **1. Perform PM:** งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM) — บันทึกผลการตรวจเช็กสถานีฐาน SHF ระดับสัญญาณ RF สายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรอง ([เข้าสู่ระบบ PM](https://pm-5year.vercel.app/))
2. **2. Handle CM:** งานแก้ไขเหตุขัดข้อง (Corrective Maintenance - CM) — แจ้งซ่อมและจัดการ Incident ปัญหาอุปกรณ์หรือสัญญาณขัดข้องแบบเรียลไทม์ ([เข้าสู่ระบบ CM](https://dtrs-app-uat.forth.co.th/))
3. **3. Conduct Quarterly Visits:** การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน — ตรวจสอบสภาพแวดล้อมทางกายภาพและประสานงานเจ้าหน้าที่ผู้ดูแลสถานี ([เข้าสู่ระบบตรวจเช็ก 3 เดือน](https://pre-pm-2.vercel.app/))
4. **4. Process Claims:** การจัดการและยื่นเคลมอุปกรณ์/ประกัน (RMA & Warranty) — ติดตามสถานะการส่งเคลม การเปลี่ยนทดแทน และประวัติอุปกรณ์ ([เข้าสู่ระบบเคลม](https://equipment-claims.vercel.app/))
5. **5. Monitor System:** การตรวจสอบและเฝ้าระวังสถานะระบบ (Telemetry & Network Monitoring) — แดชบอร์ดตรวจสอบสถานะออนไลน์ การทำงานของรีพีตเตอร์ และทราฟฟิกโครงข่าย ([เข้าสู่ระบบ Monitor](https://bssc-nine.vercel.app/))
6. **6. Track DOPA Officials' Tenure:** ติดตามวาระและภารกิจเจ้าหน้าที่รัฐ กรมการปกครอง (Department of Provincial Administration) — ประสานงานและติดตามวาระสถานีเครือข่าย USO 181 แห่ง พร้อมลิงก์ตรง ([เข้าสู่ระบบวาระ DOPA](https://wara5year.vercel.app/))
7. **7. Manage Inventory:** การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (Spare Parts Inventory) — บริหารคลังอุปกรณ์ทวนสัญญาณ โมดูลความถี่ สายอากาศ และชิ้นส่วนสำรอง ([เข้าสู่ระบบคลัง](https://www.stockflowth.online/dashboard))
8. **8. Track Assets & Equipment:** การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (Fixed Asset Registry) — ติดตามทะเบียนทรัพย์สิน หมายเลขครุภัณฑ์ (Asset Tag) และประวัติการโอนย้ายอุปกรณ์ ([เข้าสู่ระบบทะเบียนครุภัณฑ์](https://contion.vercel.app/))

---

## ระบบแปลภาษา (i18n Translation Engine)
- **ค่าเริ่มต้นภาษาอังกฤษ 100%:** หน้าเว็บทั้งหมดแสดงผลภาษาอังกฤษมาตรฐานธุรกิจและโทรคมนาคมสากล
- **รองรับภาษาไทยครบทุกส่วน:** รวมทั้งชื่อโมดูล รายละเอียด ป้ายสถานะ และข้อความช่วยเหลือ
- **ปุ่มสลับภาษา React:** ฝัง React-i18next Switcher บริเวณ Header ให้ผู้ใช้งานเลือกสลับ `EN` และ `TH` ได้ทันที

---

## API Endpoints
- `GET /` — แสดงผลหน้าแดชบอร์ดหลัก (Server-Side Rendered ผ่าน Thymeleaf MVC)
- `GET /api/v1/modules` — ดึงรายการข้อมูลโมดูลทั้งหมด 8 โมดูลในรูปแบบ JSON Array
- `GET /api/v1/modules/{orderIndex}` — ดึงข้อมูลโมดูลเดี่ยวตามลำดับ (ดัชนี 0 ถึง 7)

---

## วิธีติดตั้งและเรียกใช้งาน (Getting Started)

### 1. เรียกใช้งานแบบ Standalone Web Client (รวดเร็ว ไม่ต้องติดตั้ง Backend)
เปิดไฟล์ `index.html` ผ่านเว็บเบราว์เซอร์ หรือรันผ่าน Live Server / Static HTTP Server:
```bash
# ตัวอย่างการใช้ npx serve
npx serve -l 3000 .
```

### 2. เรียกใช้งานผ่าน Spring Boot Application

#### ความต้องการของระบบ (Prerequisites)
- ติดตั้ง **Java Development Kit (JDK) 17 ขึ้นไป**

#### บน Windows (PowerShell / Command Prompt):
```powershell
.\mvnw.cmd spring-boot:run
```

#### บน Linux / macOS:
```bash
./mvnw spring-boot:run
```

หลังจากเริ่มการทำงาน เข้าใช้งานที่:
```text
http://localhost:8080
```

### การสร้าง Executable JAR เพื่อนำไป Deploy
```bash
./mvnw clean package
java -jar target/shf-dashboard-2.4.6.jar
```

---

## การทดสอบระบบ (Testing & Verification)

### รัน Unit Tests ของ Spring Boot:
```bash
./mvnw test
```

### ตรวจสอบความถูกต้องของสถาปัตยกรรมและเวอร์ชันแบบอัตโนมัติ:
```bash
node scripts/verify_system.js
```

---

## ประวัติเวอร์ชัน (Changelog)
ดูรายละเอียดการเปลี่ยนแปลงทั้งหมดของระบบในแต่ละรุ่นได้ที่ [CHANGELOG.md](CHANGELOG.md)
