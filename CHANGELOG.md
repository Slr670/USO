# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
