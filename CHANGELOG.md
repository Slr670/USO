# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.21] - 2026-09-17
### Changed
- **UI Clean-Up: Removal of Video Showcase `<h2>` Heading:**
  - Removed `<h2>{t('video.title')}</h2>` ("FORTH Master System Operations Video") heading from `src/components/VideoShowcase.tsx`.
  - Removed unused `.video-heading-wrap h2` CSS rule and adjusted `.video-badge` margin from `src/styles/dashboard.styles.ts`.
  - Removed unused `title` property from `TranslationVideo` interface in `src/lib/types.ts` and bilingual resources in `src/lib/i18n.ts`.
  - Preserved clean vertical alignment and responsive layout of the video section badge and showcase player.
  - Expanded test suite in `tests/verify_system.ts` with assertions verifying absence of heading, style rules, and translation keys (88 checks).
  - Bumped application authoritative version to `v3.0.21`.

## [3.0.20] - 2026-09-17
### Changed
- **UI Clean-Up: Removal of Version Pill:**
  - Removed `.version-pill` element from `src/components/Header.tsx`, including the indicator dot, version text, and `Authoritative Version` tooltip.
  - Removed unused `APP_VERSION` import from `src/components/Header.tsx`.
  - Removed `.version-pill` and `.version-indicator-dot` CSS rules from `src/styles/dashboard.styles.ts`.
  - Preserved header alignment, spacing, language toggle functionality (`EN` / `TH`), and responsive layout.
  - Retained authoritative version display in `src/components/Footer.tsx` (`app-version-text`).
  - Expanded test suite in `tests/verify_system.ts` with assertions verifying absence of `version-pill` elements and styles (85 checks).
  - Bumped application authoritative version to `v3.0.20`.

## [3.0.19] - 2026-09-17
### Changed
- **UI Clean-Up: Removal of "Launch Primary System:" Prefix:**
  - Removed `Launch Primary System:` prefix from English dictionary (`actions.openPrimary`) in `src/lib/i18n.ts`.
  - Removed `เปิดระบบหลัก:` prefix from Thai dictionary (`actions.openPrimary`) in `src/lib/i18n.ts`.
  - Updated primary action button labels and `aria-label` across all operational module panels to display clean module title (e.g. `1. Perform PM`).
  - Preserved button functionality, external link arrow SVG icon, accessibility semantics, and responsive layout.
  - Expanded test suite in `tests/verify_system.ts` with assertions verifying absence of prefixes across components and translations (82 checks).
  - Bumped application authoritative version to `v3.0.19`.

## [3.0.18] - 2026-09-17
### Changed
- **UI Clean-Up: Removal of External Link Pills, Hints & Unused Keys:**
  - Removed `.external-link-pill` and its nested external arrow SVG icon from `src/components/ModuleCard.tsx`.
  - Removed unnecessary `title="Launch Portal (New Tab)"` attribute from module card buttons.
  - Removed `<span class="panel-action-hint">Launch Portal (New Tab)</span>` from `src/components/ModulesSection.tsx`.
  - Cleaned up unused CSS classes (`.external-link-pill`, `.card-btn:hover .external-link-pill`, `.card-btn.active .external-link-pill`, `.panel-action-hint`) from `src/styles/dashboard.styles.ts`.
  - Cleaned up unused i18n key `openNewTab` from `TranslationActions` in `src/lib/types.ts` and `src/lib/i18n.ts`.
  - Preserved full functionality and layout of primary launch buttons (`.btn-action-primary`).
  - Confirmed `content.js` and messaging errors (`onMessage`, `sendMessage`, `Receiving end does not exist`) are external browser extension artifacts, requiring zero application modification, keeping Next.js HMR intact.
  - Updated test suite in `tests/verify_system.ts` confirming all 80 checks pass.
  - Bumped application authoritative version to `v3.0.18`.

## [3.0.17] - 2026-09-17
### Changed
- **Codebase Clean-Up: Removal of File Header Banner Comments:**
  - Removed all redundant file-level banner/header comment blocks (project/file/purpose/version headers) across all 18 codebase files.
  - Preserved all functional comments, imports, application logic, and type declarations intact.
  - Updated test suite in `tests/verify_system.ts` confirming all 77 checks pass.
  - Bumped application authoritative version to `v3.0.17`.

## [3.0.16] - 2026-09-17
### Changed
- **Video Section Continuous Looping, Audio Optimization & Meta-Badge Clean Up:**
  - Configured `#forth-master-video` for continuous looping (`loop`), autoplay, and audio enabled by default whenever browser policy permits.
  - Implemented automatic fallback to muted autoplay if unmuted playback is restricted, restoring sound upon the first user interaction (`click`, `keydown`, `touchstart`, `pointerdown`).
  - Preserved `controls`, `playsinline`, and `preload="auto"` video player attributes.
  - Removed the entire `video-meta-badges` block (`1080p Full HD`, `60 FPS`, and HD icon) from `src/components/VideoShowcase.tsx`.
  - Cleaned up unused CSS rules (`.video-meta-badges`, `.video-hd-pill`, `.video-spec-pill`) from `src/styles/dashboard.styles.ts`.
  - Removed `System Architecture: TypeScript-Only Fullstack Architecture (Next.js App Router + React TSX)` span and unused references from `src/components/Footer.tsx`, `src/lib/types.ts`, `src/lib/i18n.ts`, and `src/lib/constants.ts`.
  - Updated test suite in `tests/verify_system.ts` confirming all 77 checks pass.
  - Bumped application authoritative version to `v3.0.16`.

## [3.0.15] - 2026-09-17
### Fixed
- **Video Showcase Autoplay Policy Compliance & Audio Restoration:**
  - Configured `<video>` element with `muted` fallback to strictly comply with modern browser autoplay policies (eliminating `NotAllowedError` and duplicate autoplay rejections).
  - Implemented one-time user interaction listeners (`click`, `keydown`, `touchstart`, `pointerdown`) to unmute video and restore sound upon explicit user action.
  - Eliminated duplicate autoplay calls (`video.paused` check) and removed console policy warnings (`[VideoShowcase] Unmuted autoplay restricted by browser policy`).
  - Diagnosed browser messaging errors (`content.js`, `onMessage`, `sendMessage`, `Receiving end does not exist`) as external browser extension artifacts; verified zero application-owned messaging code, preserving Next.js HMR stability.
  - Updated test suite `verifyVideoShowcaseAutoplay` in `tests/verify_system.ts` confirming all 76 checks pass.
  - Bumped application authoritative version to `v3.0.15`.

## [3.0.14] - 2026-09-16
### Changed
- **Service Module Card Icons Visual Micro-Interactions & Hover Dynamics:**
  - Added smooth, engaging visual micro-interactions to the service module icons (`.card-icon-box` and `.card-icon-box svg`).
  - Implemented radial glowing aura backdrop (`.card-icon-box::before`) that blooms with a smooth blur on hover (`radial-gradient` transitioning with `cubic-bezier(0.34, 1.56, 0.64, 1)`).
  - Implemented an interactive spring bounce and rotation micro-animation (`@keyframes iconSpringBounce`) on card hover, subtly scaling up the SVG icon with an elegant tilt and drop-shadow depth.
  - Enhanced active card state (`.card-btn.active`) with intense white/cyan luminous aura and drop-shadow glow.
  - Added interactive hover elevation to the detail display icon (`.panel-icon-svg-wrap`).
  - Added accessibility support in `@media (prefers-reduced-motion: reduce)` to gracefully disable icon spring animations for users who prefer reduced motion.
  - Added automated test suite `verifyModuleCardMicroInteractions` to `tests/verify_system.ts` confirming all 75 checks pass.
  - Bumped application authoritative version to `v3.0.14`.

## [3.0.13] - 2026-09-16
### Changed
- **Removed Audio Toggle Button/Widget & Cleaned Up Associated State:**
  - Removed extraneous `.video-unmute-prompt-btn` overlay button and `.video-audio-pill` badge from `src/components/VideoShowcase.tsx` layout entirely.
  - Cleaned up state (`isAudioBlocked`, `isMuted`), callback handlers (`handleManualUnmute`, `handleVolumeChange`, `handlePlay`), and window interaction listeners (`click`, `keydown`, `touchstart`, `pointerdown`).
  - Removed unused CSS rules (`.video-unmute-prompt-btn`, `.video-audio-pill`, `@keyframes videoUnmutePulse`, responsive media queries) from `src/styles/dashboard.styles.ts`.
  - Cleaned up unused translation keys (`enableSound`, `soundActive`) from `src/lib/types.ts` and `src/lib/i18n.ts`.
  - Retained clean unmuted autoplay initialization (`video.muted = false`, `video.volume = 1.0`, `video.play()`) with standard HTML5 native video controls.
  - Bumped application authoritative version to `v3.0.13`.

## [3.0.12] - 2026-09-16
### Changed
- **Video Showcase Immediate Unmuted Autoplay & Policy-Aware Audio Handler:**
  - Removed hardcoded `muted` constraint from the master presentation video element (`#forth-master-video` in `src/components/VideoShowcase.tsx`) to enable immediate audio playback on page load.
  - Implemented programmatic unmuted autoplay initialization (`video.muted = false`, `video.volume = 1.0`, `video.play()`) on component mount.
  - Implemented modern browser autoplay policy handling (Chrome/Safari/Edge MEI and user-gesture policies):
    - In case the browser restricts unmuted autoplay, immediately falls back to playing muted so video playback starts instantly without freezing or waiting.
    - Registers one-time capture listeners on window (`click`, `keydown`, `touchstart`, `pointerdown`) to immediately unmute audio and restore full volume upon the user's very first interaction anywhere on the page.
    - Added an interactive, glassmorphic unmute prompt overlay button (`.video-unmute-prompt-btn`) with pulsing neon glow and SVG speaker icon, allowing one-click instant audio activation.
    - Synchronized native video player `volumechange` and `play` events with component state.
    - Added audio status indicator pill (`Audio On` / `Muted`) in the video showcase header badge row.
  - Added bilingual translations (`enableSound`, `soundActive`) in `src/lib/i18n.ts` and updated `TranslationVideo` interface in `src/lib/types.ts`.
  - Added automated test suite `verifyVideoShowcaseAutoplay` to `tests/verify_system.ts` confirming all 69 checks pass.
  - Restored ambient background video in `src/components/Hero.tsx` to standard muted loop and bumped application authoritative version to `v3.0.12`.

## [3.0.11] - 2026-09-16
### Changed
- **Hero Video Autoplay with Sound & Browser Restriction Fallback:**
  - Configured unmuted playback experimentation on hero banner video.

## [3.0.10] - 2026-09-16
### Changed
- **Dynamic Gradient Glow Animation & Ultra-Smooth Responsiveness Optimization:**
  - Applied dynamic glowing gradient color-shifting animations (`neonShiftUSO`, `neonShiftDivider`, `neonShiftOperations`, `neonShiftPortal`, `neonShiftEyebrow`, `neonShiftBrand`) across every word in the title and header elements, creating a vibrant, continuous neon light transition.
  - Implemented fluid typography (`clamp()`) across all viewports (mobile, tablet, desktop, ultra-wide) for `.uso-word`, `.portal-line`, `.portal-accent`, `.eyebrow`, `.brand-text`, `.lead`, and CTA buttons.
  - Optimized fluid container padding, grid tracks (`minmax(clamp(...))`), and layout margins to ensure seamless transitions across all device sizes with zero layout breakage.
  - Added `@media (prefers-reduced-motion: reduce)` accessibility rule to gracefully pause animations for users who prefer reduced motion.

## [3.0.9] - 2026-09-16
### Changed
- **Redesigned 'USO' Typography, Eyebrow Dash, & Glowing Gradient Divider Line:**
  - Added a vibrant cyan horizontal accent line/dash (`.eyebrow-dash`) to the left of the uppercase eyebrow text `'USO TELECOMMUNICATION OPERATIONS'`.
  - Redesigned the main `'USO'` lettering with large, bold, rounded/3D typography (`font-weight: 900`, `font-size: clamp(4.2rem, 9.5vw, 7rem)`) featuring a smooth teal-to-purple gradient fill (`#34d399` -> `#2dd4bf` -> `#38bdf8` -> `#818cf8` -> `#c084fc`).
  - Added a thin luminous outline/stroke effect (`-webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.28)`) and multi-layer glowing aura (`drop-shadow` in cyan, indigo, and violet).
  - Added a glowing gradient divider line (`.uso-divider-glow`) directly beneath the 'USO' text transitioning from cyan/teal to soft purple with balanced radiance and rounded pill ends.
  - Aligned and spaced the accompanying `'OPERATIONS PORTAL'` subtitle alongside the brand group with responsive baseline alignment and mobile wrapping.

## [3.0.8] - 2026-09-16
### Changed
- **Full-Screen Background Video (VEO1) Implementation & Hero Layering:**
  - Integrated local video asset `VEO1.mp4` (~8.65 MB) from `assets/image/` into `public/assets/image/VEO1.mp4` and whitelisted it in `.gitignore` for GitHub tracking and Vercel deployment.
  - Exported authoritative asset constant `HERO_BG_VIDEO_SRC = '/assets/image/VEO1.mp4'` from `src/lib/constants.ts`.
  - Implemented a full-screen HTML5 `<video>` element inside `src/components/Hero.tsx` (`.hero-video-wrapper > .hero-background-video`) with `autoPlay`, `loop`, `muted`, `playsInline`, and `preload="auto"` attributes.
  - Positioned the video absolutely to cover the entire container (`position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center;`).
  - Added a dark gradient overlay layer (`.hero-video-overlay`) with `pointer-events: none` and layered proper z-indexes (`video: z-index 1`, `overlay: z-index 2`, `ambient glow: z-index 3`, `hero-inner: z-index 10`).
  - Enhanced text readability and contrast against the video with enhanced text-shadows on `.hero-title` and `.lead`.
  - Retained clean left-aligned grid placement (1320px) and full-height 100vh viewport scaling across all screen sizes.

## [3.0.7] - 2026-09-16
### Changed
- **Relocated Hero Content Block to Left Side & Flex-Start Layout Alignment:**
  - Relocated the entire landing hero section (`.container.hero`, `.hero`) content block to the left side of the screen.
  - Updated container alignment and justification: set `align-items: flex-start`, `text-align: left`, and flexbox justification to `flex-start` across the hero container, inner content wrapper, eyebrow badge, title, subtitle, CTA action button, and quick telemetry pill tags.
  - Constrained `.hero > div` to `max-width: 1320px; margin: 0 auto; padding: 0 24px;` aligning the hero content with the 1320px grid of the navigation header (`.header-inner`) and operations dashboard container (`.dashboard-container`).
  - Added width constraints (`max-width: 900px` for `.hero-title` and `max-width: 780px` for `.lead`) with left margin anchoring (`margin: 0 0 32px 0`) to ensure crisp readability without horizontal stretching on ultra-wide screens.
  - Repositioned the ambient radial glow background (`::before`) to `left: 25%` to create a harmonious visual backdrop behind the left-aligned hero content.
  - Updated mobile responsive breakpoint `@media (max-width: 640px)` with consistent left alignment and `padding: 0 16px`.

## [3.0.6] - 2026-09-16
### Changed
- **Full Viewport Height (100vh) Hero Section Layout & Flexbox Centering:**
  - Expanded the landing hero section (`.container.hero`) to fill the full viewport height (`min-height: 100vh; min-height: 100dvh;`).
  - Implemented vertical and horizontal Flexbox centering (`display: flex; flex-direction: column; align-items: center; justify-content: center;`) with balanced padding (`padding: 60px 24px; box-sizing: border-box;`).
  - Centered the ambient radial glow pseudo-element behind the hero content without leaving awkward empty gaps below the section.
  - Added responsive padding and typography scaling in `@media (max-width: 640px)` for mobile screens.

## [3.0.5] - 2026-09-16
### Changed
- **Header Brand Logo Refinement & Portal Text Integration:**
  - Removed harsh dark bounding box and edge artifacts from `USO_portal_icon.png` via smooth anti-aliased transparency, allowing the emblem to blend seamlessly into the dark navigation bar.
  - Appended high-contrast modern typography text `'USO OPERATIONS PORTAL'` (`.brand-text`) right after the logo icon inside `.brand`.
  - Tuned header CSS in `src/styles/dashboard.styles.ts` with flex alignment (`gap: 12px`, `height: 40px`, and hover transition) ensuring precise vertical centering and crisp contrast.

## [3.0.4] - 2026-09-16
### Changed
- **Local USO Portal Icon Asset Integration & Header Alignment:**
  - Copied authentic local image asset `USO_portal_icon.png` (84x80px) from `assets/image/` into `public/assets/image/USO_portal_icon.png` and `public/assets/USO_portal_icon.png`.
  - Updated image source `src` in `src/components/Header.tsx` to reference `USO_LOGO_SRC` (`/assets/image/USO_portal_icon.png`).
  - Synced base64 asset in `src/assets/uso-logo.ts` with authentic binary data of `USO_portal_icon.png`.
  - Tuned header CSS in `src/styles/dashboard.styles.ts` with explicit `aspect-ratio: 84 / 80`, `height: 42px`, and `object-fit: contain` to preserve crisp fidelity and harmonious vertical alignment.

## [3.0.3] - 2026-09-16
### Changed
- **Header Brand & USO Logo Component Refactor:**
  - Replaced the header logo/branding block in `src/components/Header.tsx` with the new USO brand link snippet (`.brand > .brand-mark.uso-image-mark > img`).
  - Refactored the snippet into clean TypeScript/TSX syntax (`className`, `alt="USO Logo"`, `aria-label="USO หน้าแรก"`, `href="#home"`).
  - Extracted inline base64 image data into a separate maintainable asset constant `src/assets/uso-logo.ts` (`USO_LOGO_BASE64`) and re-exported it from `src/lib/constants.ts`.
  - Added responsive header styling and drop-shadow effects for `.brand`, `.brand-mark`, and `.uso-image-mark` in `src/styles/dashboard.styles.ts`.
  - Configured `#home` anchor target on the root dashboard container in `src/app/page.tsx`.

## [3.0.2] - 2026-09-16
### Changed
- **Intelligent Operations Command Banner (Hero Section UI Refactor):**
  - Replaced the landing hero section in `src/components/Hero.tsx` with the new intelligent operations command banner (`.container.hero`).
  - Refactored the snippet into 100% valid TypeScript/TSX syntax (`className`, `data-text="USO"`, type-safe event handlers).
  - Preserved existing smooth navigation and anchor interactions targeting `#systems` and `#modules-section`.
  - Added modern glassmorphism, gradient accents, and responsive styling in `src/styles/dashboard.styles.ts` for `.hero`, `.eyebrow`, `.hero-title`, `.uso-word`, `.thai-title`, `.thai-line`, `.thai-accent`, `.lead`, `.actions`, `.btn-primary`, and `.quick-list`.

## [3.0.1] - 2026-09-16
### Fixed
- **Vercel Deployment 404 Resolution:**
  - Configured `"framework": "nextjs"` and `"buildCommand": "next build"` explicitly in `vercel.json` to enforce Next.js App Router detection on Vercel and prevent static "Other" preset fallback errors.

## [3.0.0] - 2026-09-16
### Added
- **TypeScript-Only Fullstack Architecture Migration:**
  - Migrated the entire application stack from multi-language (Java/Spring Boot, JavaScript, standalone HTML, and standalone CSS) to a unified **TypeScript-Only Stack** using **React + Next.js (App Router)**.
  - **Frontend (React + TypeScript TSX):**
    - `src/app/layout.tsx`: Root HTML layout written 100% in TSX, completely eliminating standalone HTML files.
    - `src/app/page.tsx`: Interactive dashboard home page with active state management, keyboard navigation (A11y), and smooth scrolling.
    - `src/components/Header.tsx`: Navigation bar with SVG broadcast tower logo, bilingual switch (EN/TH), and live authoritative version badge.
    - `src/components/Hero.tsx`: Telemetry badge with pulse indicator, headline, and primary/secondary action buttons.
    - `src/components/ModuleCard.tsx`: Scalable module cards with pure SVG icons, active states, and external portal hints.
    - `src/components/ModulesSection.tsx`: 8-card grid and interactive content details panel with launch portal action.
    - `src/components/VideoShowcase.tsx`: Responsive HTML5 video player with HD 1080p and 60 FPS badges, captions, and tags.
    - `src/components/Footer.tsx`: Architecture attribution and version badge.
  - **Backend (TypeScript Route Handlers):**
    - `src/app/api/v1/modules/route.ts`: Replaced Java `DashboardApiController.getAllModules()` with high-performance TypeScript Route Handler returning the 8 operational modules with CORS and caching headers.
    - `src/app/api/v1/modules/[orderIndex]/route.ts`: Replaced Java `DashboardApiController.getModuleByIndex()` with parameter-validated TypeScript Route Handler returning single module details or 404.
    - `src/lib/modules-service.ts`: Ported Java `DashboardServiceImpl` to TypeScript class `DashboardService`.
    - `src/lib/modules-data.ts`: Ported authoritative dataset and scalable vector SVG registry.
    - `src/lib/types.ts`: Comprehensive type safety across frontend and backend.
    - `src/lib/constants.ts`: Authoritative single source of truth for version (`3.0.0`) and metadata.
    - `src/lib/i18n.ts`: Full bilingual translation engine and reactive `useI18n()` hook.
  - **Component-Based CSS-in-TS:**
    - `src/styles/dashboard.styles.ts`: Replaced ~1,000 lines of standalone `.css` files with a pure TypeScript design system, design tokens, glassmorphism, responsive breakpoints, and keyframe animations.
  - **Automated Verification Suite:**
    - `tests/verify_system.ts`: 61 automated tests verifying SemVer v3.0.0 integrity, operational module URLs, backend service parity, bilingual coverage, SVG icon compliance, and zero legacy files.

### Removed
- **Legacy Java / Spring Boot Artifacts:**
  - Removed `pom.xml`, Maven wrappers (`mvnw`, `mvnw.cmd`, `.mvn/`), `src/main/java/`, `src/test/java/`, and `src/main/resources/`.
- **Standalone HTML & CSS:**
  - Removed standalone `index.html`, `public/index.html`, `gemini-code-1789376108233.html`, and `styles/dashboard.css`.
- **Legacy JavaScript & Build Scripts:**
  - Removed legacy JavaScript files (`scripts/*.js`, `public/scripts/`, `scripts/vendor/`).

### Changed
- **System Version Synchronization:** Bumped authoritative SemVer system version to `v3.0.0` across all metadata, APIs, and UI components.
- **Vercel Configuration:** Updated `vercel.json` for Next.js and byte-range video streaming.

## [2.6.4] - 2026-09-16
### Changed
- Removed redundant `• 181 Stations Dashboard (New Tab)` suffix from primary action labels across UI, fallback templates, and dual-language i18n dictionaries (`actions.openPrimary`), retaining the clean primary action label.

## [2.6.3] - 2026-09-16
### Changed
- Refined the responsive module details panel with clearer hierarchy, accessible relationships, and a prominent external-system action.

## [2.6.2] - 2026-09-16
### Changed
- Restored the landing-page hero heading with the project title using the existing responsive headline styling and i18n structure.

## [2.6.1] - 2026-09-16
### Changed
- Removed the landing-page hero title and subtitle, including their unused i18n keys, metadata references, CSS selectors, and responsive overrides.

## [2.5.0] - 2026-09-16
### Added
- **Complete Migration to TypeScript 7.0.2:**
  - Migrated entire client codebase to **TypeScript 7.0.2** using the next-generation Go-powered compiler engine for 8x-12x faster compilation and strict compile-time type safety.
  - Created source directory `src/main/typescript/` containing strongly-typed source files:
    - `types/dashboard.types.d.ts`: Comprehensive type definitions, interfaces (`OperationalModule`, `SvgIconRegistry`, `TranslationPayload`), and global DOM/Window augmentations.
    - `modules-data.ts`: Type-safe operational dataset for all 8 modules and scalable SVG icon registry.
    - `i18n.ts`: Type-safe translation engine integrating i18next and React 18 language switcher component.
    - `dashboard.ts`: Authoritative dashboard controller, UI state manager, and keyboard navigation.
- **TypeScript Tooling & Multi-Target Build Pipeline:**
  - Added `package.json` with build and verification scripts (`npm run build`, `npm run typecheck`, `npm run watch`, `npm run verify`).
  - Added `tsconfig.json` targeting ECMAScript 2022 with strict type-checking flags, `.d.ts` declaration generation, and `.js.map` source maps.
  - Implemented `scripts/sync-build.js` for automatic distribution of compiled JavaScript, declaration files, and maps to `public/scripts/` (Vercel) and `src/main/resources/static/js/` (Spring Boot).
- **Automated Verification Suite:**
  - Implemented `scripts/verify_system.js` executing 57 automated validation checks across SemVer consistency, 8-module integrity, dual-language i18n dictionaries, and TypeScript build outputs.

### Changed
- **System Version Synchronization:** Bumped authoritative SemVer system version from `v2.4.8` to `v2.5.0` across all project files (`package.json`, `pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `styles/dashboard.css`, Java controllers/services/models/tests, HTML templates, and documentation).

## [2.4.8] - 2026-09-15
### Fixed
- **Vercel Deployment Root 404 & SPA Routing Resolution:**
  - Resolved 404 (Not Found) deployment error on the root URL (`https://uso-nine.vercel.app/`) by explicitly defining `"outputDirectory": "."` and single-page application (SPA) rewrites in `vercel.json`.
  - Guaranteed fallback reliability by placing `index.html`, `styles/`, `scripts/`, `assets/`, `icons/`, and `favicon.ico` into the root `public/` directory in addition to project root, ensuring deployment success whether Vercel deploys from root `.` or `public/`.
- **Video Relocation & Whitespace Removal for Vercel Streaming:**
  - Placed the optimized H.264 video (`FORTH_MASTER_Video_Final-Additional.mp4`, 76.65 MB, safely under GitHub's 100MB limit) directly inside root `public/` directory with spaces removed from the filename to eliminate URL encoding mismatches.
  - Configured byte-range streaming headers (`Accept-Ranges: bytes`, `Content-Type: video/mp4`) in `vercel.json` and static rewrites from legacy media paths and space-encoded URLs.
  - Updated `<video src="...">` and `<source>` paths across `index.html`, `public/index.html`, `gemini-code-1789376108233.html`, and Thymeleaf `src/main/resources/templates/index.html`.

### Changed
- **System Version Synchronization:** Bumped authoritative SemVer system version from `v2.4.7` to `v2.4.8` across all project files (`pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `styles/dashboard.css`, Java controllers/services/models/tests, HTML templates, and documentation).

## [2.4.7] - 2026-09-15
### Fixed
- **Video 404 (Not Found) & URL Space Encoding Resolution:**
  - Resolved 404 errors when serving `/assets/media/FORTH_MASTER_Video Final-Additional.mp4` by introducing URL-encoded source paths (`%20`) alongside normalized alias paths (`FORTH_MASTER_Video_Final-Additional.mp4`) via NTFS hardlinks.
  - Implemented Spring MVC `WebMvcConfig` registering explicit static resource handlers for `/assets/**`, `/media/**`, `/favicon.ico`, and `/icons/**`, ensuring seamless serving across both Standalone Web Client and Spring Boot MVC architectures.
- **Missing Favicon Error:** Generated dedicated telecommunications-themed `favicon.ico` and vector `favicon.svg` in root, `assets/icons/`, and Spring Boot `static/` directories, and added `<link rel="icon">` declarations across all HTML templates.

### Changed
- **Module External URLs Synchronization:** Synchronized Module 1 (`https://pm-5year.vercel.app/`) and Module 2 (`https://dtrs-app-uat.forth.co.th/dashboard`) external URLs across client data, Spring Boot service, unit tests, and documentation.
- **System Version Synchronization:** Bumped authoritative SemVer system version from `v2.4.6` to `v2.4.7` across all project files (`pom.xml`, `application.yml`, `scripts/dashboard.js`, `scripts/modules-data.js`, `scripts/i18n.js`, `styles/dashboard.css`, Java controllers/services/models/tests, HTML templates, and documentation).

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
