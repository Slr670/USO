# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.6] - 2026-09-15
### Fixed
- **Video Playback Black Screen Resolution:** Transcoded the FORTH Master presentation video from Apple ProRes 422 (`apcn` QuickTime codec unsupported by web browsers) to standardized **H.264 / AVC1** (`yuv420p` profile) with AAC stereo audio in a fast-start MP4 container (`isom/mp41`), completely fixing the black screen issue where only audio was playing in web browsers.
- **Autoplay Muted Behavior:** Configured the video player with `autoplay`, `muted`, `playsinline`, and `controls` attributes across `index.html`, `gemini-code-1789376108233.html`, and `templates/index.html` to ensure immediate, uninterrupted video playback on page load compliant with modern browser autoplay policies.

### Added
- **Module 3 ("Quarterly Visits") External Link Integration:** Connected Module 3 to the live external system `https://pre-pm-2.vercel.app/` (`isExternal: true`).
- **Module 8 ("Assets & Equipment") External Link Integration:** Connected Module 8 to the live external system `https://contion.vercel.app/` (`isExternal: true`).

### Changed
- **Unit & Integration Test Suite:** Updated `ShfDashboardApplicationTests.java` with assertions for Module 3 (`https://pre-pm-2.vercel.app/`) and Module 8 (`https://contion.vercel.app/`) external link routing.
- **Documentation & Links:** Updated `README.md` module registry links for Module 3 and Module 8.
- **System Version Synchronization:** Bumped authoritative SemVer system version from `v2.4.5` to `v2.4.6` across all project files (`pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `styles/dashboard.css`, Java controllers/services/models, HTML templates, and documentation).

## [2.4.5] - 2026-09-15
### Added
- **Embedded Responsive HTML5 Video Showcase:** Embedded the FORTH Master system operations video (`FORTH_MASTER_Video Final-Additional.mp4` / `.mov`) into `index.html`, `gemini-code-1789376108233.html`, and `src/main/resources/templates/index.html`.
- **Public Media Organization & Git Large File Protection:** 
  - Organized video assets in dedicated public media directories (`assets/media/` and `src/main/resources/static/media/`) using NTFS hardlinks for zero storage duplication.
  - Configured `.gitignore` to prevent committing large video binaries (>100MB) to GitHub while preserving `.gitkeep` directory tracking.
- **Modern Video Showcase UI & Video Player Controls:**
  - Responsive 16:9 aspect-ratio video player wrapper with standard HTML5 controls (`controls`, `preload="metadata"`, `playsinline`).
  - Sleek showcase header with vector play icon, status badge, HD 1080p pill, and descriptive caption bar.
- **Dual-Language i18n Video Support:** Added video section titles, badges, headings, descriptions, and fallback playback notices to `scripts/i18n.js` and `src/main/resources/static/js/i18n.js` for both English (`EN`) and Thai (`TH`).

### Changed
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `styles/dashboard.css`, `index.html`, `gemini-code-1789376108233.html`, Spring Boot backend service, Thymeleaf templates, and `README.md` to `v2.4.5`.

## [2.4.4] - 2026-09-15
### Removed
- **DOPA Officials' Remaining Tenure Calculator Card:** Completely removed the entire embedded tenure calculation card, interactive start date / duration inputs, expiration countdown status box, progress bar, and calculation logic from Module 6 in the UI.
- Removed obsolete calculator CSS classes (`.tenure-calculator-card`, `.calc-*`) and translation dictionary entries from `i18n.js`.

### Changed
- **Module 6 Streamlining:** Module 6 ("6. Track DOPA Officials' Tenure") now functions consistently with other external integration modules, displaying operational scope and providing a direct action button linking to the live 181 USO stations dashboard (`https://wara5year.vercel.app/`).
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `index.html`, `gemini-code-1789376108233.html`, Spring Boot backend service, and Thymeleaf templates to `v2.4.4`.

## [2.4.3] - 2026-09-15
### Changed
- **Documentation & Metadata Synchronization:** Updated `README.md` to reflect the complete 8 operational modules, dual-stack architecture (Spring Boot 3 Thymeleaf MVC & Standalone Web Client), i18next + react-i18next translation system, and full-width DOPA tenure tracker.
- **Java Backend & JavaDoc Alignment:** Synchronized JavaDoc tags, parameter ranges (`0 to 7`), comments, and fallback properties across `DashboardController.java`, `DashboardApiController.java`, `DashboardModule.java`, `DashboardService.java`, and `ShfDashboardApplication.java`.
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `index.html`, `gemini-code-1789376108233.html`, Spring Boot backend service, and Thymeleaf templates to `v2.4.3`.

## [2.4.2] - 2026-09-15
### Removed
- **Civil Service Retirement Timeline:** Removed the entire "2. Civil Service Retirement Timeline" section from Module 6 (DOPA Tenure tracking widget), including official's date of birth input, retirement calculation hints, and retirement countdown results.

### Changed
- **Full-Width Layout Adaptation:** Adjusted the remaining "Term Expiration Tracking" section to fit the full width (`100%`) of the card container:
  - Responsive two-column input row for tenure start date and duration.
  - Full-width countdown metrics status card and animated progress bar.
- **Terminology & Translation Dictionary:** Streamlined Module 6 title, badge, and description to focus specifically on DOPA tenure and term expiration tracking across 181 USO stations in both English (`EN`) and Thai (`TH`).
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `index.html`, `gemini-code-1789376108233.html`, Spring Boot backend service, and Thymeleaf templates to `v2.4.2`.

## [2.4.1] - 2026-09-15
### Added
- **i18next + react-i18next Translation Engine:** Integrated dual-mode translation engine with offline vendor bundles (`i18next.min.js`, `react.production.min.js`, `react-dom.production.min.js`, `react-i18next.min.js`):
  - **React Language Switcher:** Interactive header widget utilizing `react-i18next` (`useTranslation` hook) allowing seamless switching between English (`EN`) and Thai (`TH`).
  - **Dynamic Reactive DOM Translation:** Instant DOM and module data updates via `data-i18n` and `data-i18n-attr` without page reload.
  - **Localized Date & Time Formatter:** Multi-locale date formatting for DOPA term expiration and civil service retirement timelines.
- **100% English UI Default:** Converted the entire dashboard interface, titles, badges, descriptions, tooltips, hints, and calculator labels to 100% fluent, domain-accurate English.

### Changed
- Comprehensive terminology and grammar audit across all 8 operational modules and telecommunication domains (Preventive Maintenance, Corrective Maintenance, RMA claims, telemetry monitoring, DOPA civil service tenure, spare parts inventory, and fixed-asset registries).
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/i18n.js`, `index.html`, `gemini-code-1789376108233.html`, and Spring Boot templates to `v2.4.1`.

## [2.3.0] - 2026-09-15
### Added
- **DOPA Tenure & Retirement Tracking System:** Implemented interactive tenure expiration and civil service retirement calculation tools in Module 6 (`6. DOPA Tenure`):
  - **Term Expiration Calculator:** Computes exact term end date (default 5-year tenure for 181 USO stations or custom 2-6 years), remaining days/months/years, and real-time percentage progress bar.
  - **Retirement Timeline Calculator:** Computes official Thai civil service retirement timeline (effective Sept 30 at end of fiscal year upon reaching age 60 under Civil Service Pension Act) and countdown timer.
  - **Live DOPA Dashboard Link:** Direct action shortcut to `https://wara5year.vercel.app/` for the 181 USO stations network.
- Dedicated UI styles for the tenure calculator widget in `styles/dashboard.css` and `src/main/resources/static/css/dashboard.css` adhering to UI Icon Policy.

### Changed
- Refined Module 6 title, badge, and description to "Track and calculate the remaining tenure of DOPA officials, including term expiration dates and retirement timelines."
- Synchronized authoritative application version across `pom.xml`, `application.yml`, `scripts/dashboard.js`, `index.html`, and UI badges to `v2.3.0`.

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
