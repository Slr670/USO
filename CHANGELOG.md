# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-09-15
### Added
- Expanded operational modules structure from 7 to 8 modules:
  1. **1. Perform PM:** Preventive Maintenance — งานบำรุงรักษาเชิงป้องกัน (`https://pm-5year.vercel.app/`)
  2. **2. Handle CM:** Corrective Maintenance — งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา (`https://dtrs-app-uat.forth.co.th/`)
  3. **3. Conduct Quarterly Visits:** การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน
  4. **4. Process Claims:** การจัดการและยื่นเคลมอุปกรณ์/ประกัน (`https://equipment-claims.vercel.app/`)
  5. **5. Monitor System:** การตรวจสอบและเฝ้าระวังสถานะระบบ (`https://bssc-nine.vercel.app/`)
  6. **6. Track DOPA Agendas:** วาระและภารกิจเจ้าหน้าที่รัฐ กรมการปกครอง — Department of Provincial Administration (`https://wara5year.vercel.app/`)
  7. **7. Manage Inventory:** การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (`https://www.stockflowth.online/dashboard`)
  8. **8. Track Assets & Equipment:** การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน
- Added dedicated inline SVG icon for `Track Assets & Equipment` (Clipboard with Checkmark and Asset Tag) compliant with UI Icon Policy.
- Seeded module 8 in Spring Boot `DashboardServiceImpl` and expanded unit tests in `ShfDashboardApplicationTests`.

### Changed
- Refactored `.grid-container` to symmetrical 8-column layout on desktop, smoothly transitioning to 4x2 on laptop, 2x4 on tablet/mobile, and 1 column on small screens.
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `index.html`, and UI badges to `v2.2.0`.

## [2.1.1] - 2026-09-14
### Fixed
- Resolved missing icon display issue caused by CORS/SRI restriction on local `file:///` protocol and external CDN font blocking.
- Replaced card icons with contextually accurate, crisp inline SVG icons for all 7 topics:
  1. **PM:** Precision tool maintenance (Wrench & Screwdriver)
  2. **CM:** Emergency repair incident & alert (Warning Triangle with Exclamation)
  3. **เยี่ยมเยือนทุก 3 เดือน:** Quarterly inspection calendar schedule with checkmark
  4. **เคลม:** RMA merchandise exchange cycle arrows
  5. **Monitor:** Real-time signal telemetry activity pulse wave
  6. **วาระเจ้าหน้าที่รัฐ กรมการปกครอง:** Government administration landmark columns
  7. **คลัง:** Warehouse inventory & stacked spare parts boxes
- Updated header brand logo with dedicated SHF repeater broadcast tower SVG icon.
- Enhanced CSS with responsive SVG rules (`.ui-icon`, `.ui-icon-xs`) ensuring 100% offline and cross-origin reliability.

## [2.1.0] - 2026-09-14
### Added
- Modular frontend project structure:
  - `styles/dashboard.css`: Dedicated modern stylesheet with glassmorphism, responsive grid, and refined typography.
  - `scripts/modules-data.js`: Dedicated data source module for the 7 operations categories.
  - `scripts/dashboard.js`: Dedicated client-side UI controller with tab management and keyboard accessibility.
  - `assets/icons/`: Dedicated assets folder with vector SVG resources.
  - `index.html`: Clean HTML5 entry point referencing external styles and scripts.
- Revamped single-file `gemini-code-1789376108233.html` into a clean modular layout without monolithic embedded blocks.
- Comprehensive JSDoc and descriptive comments explaining the purpose and logic of each function and code block.

### Changed
- Refined interactive state animations, ambient card elevation on hover, and active glowing indicators.
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, and UI badges to `v2.1.0`.

## [2.0.0] - 2026-09-14
### Added
- Complete architecture refactoring to **Modern Java Spring Boot Web Application (Thymeleaf MVC)**.
- Standard Maven folder structure: `src/main/java/com/uso/dashboard/` (Controller, Model, Service, Application).
- `DashboardModule.java` domain model with complete Thai & English Javadocs.
- `DashboardService` interface & `DashboardServiceImpl` managing all 7 modules.
- `DashboardController` for server-side HTML rendering with Thymeleaf.
- `DashboardApiController` providing REST API endpoints (`/api/v1/modules`).
- Revamped modern UI/UX design in `src/main/resources/static/css/dashboard.css` with enterprise glassmorphism, fluid responsive grid, and accessible typography.
- Modular client-side interactive logic in `src/main/resources/static/js/dashboard.js` supporting card selection, external URL redirects, and keyboard navigation.
- Thymeleaf modular templates and fragments (`index.html`, `fragments/header.html`, `fragments/footer.html`).
- Automated Spring Boot context and module integrity unit tests in `ShfDashboardApplicationTests.java`.
- Maven configuration (`pom.xml`), Maven Wrapper scripts (`mvnw`, `mvnw.cmd`), `.gitignore`, and comprehensive `README.md`.

### Changed
- Preserved and enhanced button "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง" clickable redirect to `https://wara5year.vercel.app/` in a new tab upon clicking.
- Authoritative version bumped from `v1.0.1` to `v2.0.0` (MAJOR) following SemVer guidelines.

## [1.0.1] - 2026-09-14
### Changed
- Make button "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง" clickable to redirect to `https://wara5year.vercel.app/` in a new tab upon clicking.
- Add direct link action button in panel description for category 6.
- Implement authoritative application version management (`APP_VERSION = '1.0.1'`) and display in header.

## [1.0.0] - 2026-09-14
### Added
- Initial release of SHF Network Operation & Maintenance Dashboard.
