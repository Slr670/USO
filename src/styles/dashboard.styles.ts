/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/styles/dashboard.styles.ts
 * Purpose: Pure TypeScript Design System & CSS-in-TS Styles
 * Version: 3.0.0
 * ===================================================================
 */

export const dashboardGlobalStyles: string = `
  /* --- 1. Design Tokens & CSS Variables --- */
  :root {
    /* Brand & Color Palette */
    --primary-950: #060d1d;
    --primary-900: #0f172a;
    --primary-800: #1e293b;
    --primary-700: #1e3a8a;
    --primary-600: #1d4ed8;
    --primary-500: #2563eb;
    --primary-400: #3b82f6;
    --primary-200: #bfdbfe;
    --primary-100: #dbeafe;
    --primary-50:  #eff6ff;

    --accent-cyan:    #06b6d4;
    --accent-sky:     #38bdf8;
    --accent-emerald: #10b981;
    --accent-amber:   #f59e0b;

    /* Slate Grayscale */
    --slate-900: #0f172a;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --slate-600: #475569;
    --slate-500: #64748b;
    --slate-400: #94a3b8;
    --slate-300: #cbd5e1;
    --slate-200: #e2e8f0;
    --slate-100: #f1f5f9;
    --slate-50:  #f8fafc;

    /* Surfaces & Glassmorphism */
    --surface-body: #f8fafc;
    --surface-card: #ffffff;
    --surface-card-hover: #ffffff;
    --card-border: #e2e8f0;
    --card-hover-border: #93c5fd;

    /* Typography & Spacing */
    --font-base: 'Sarabun', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-pill: 9999px;

    /* Shadows & Glows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 10px 15px -3px rgba(30, 58, 138, 0.08), 0 4px 6px -2px rgba(30, 58, 138, 0.04);
    --shadow-xl: 0 20px 25px -5px rgba(30, 58, 138, 0.12), 0 10px 10px -5px rgba(30, 58, 138, 0.04);
    --shadow-active: 0 8px 20px rgba(29, 78, 216, 0.35);

    /* Animation Timing */
    --anim-fast: 0.18s ease;
    --anim-base: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    --anim-smooth: 0.38s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- 2. Base Reset & Layout --- */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-base);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--surface-body);
    background-image: 
      radial-gradient(at 0% 0%, rgba(219, 234, 254, 0.5) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(224, 242, 254, 0.5) 0px, transparent 50%),
      radial-gradient(at 50% 100%, rgba(241, 245, 249, 0.8) 0px, transparent 50%);
    background-attachment: fixed;
    color: var(--slate-800);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }

  /* --- 3. Top Navigation Header --- */
  .dashboard-header {
    background: rgba(15, 23, 42, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 14px 24px;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .header-inner {
    max-width: 1320px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity var(--anim-base), transform var(--anim-base);
  }

  .brand:hover {
    opacity: 0.95;
    transform: translateY(-1px);
  }

  .brand-mark,
  .uso-image-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 42px;
  }

  .uso-image-mark img {
    height: 42px;
    width: auto;
    max-width: 100%;
    aspect-ratio: 84 / 80;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 2px 8px rgba(6, 182, 212, 0.35));
    transition: filter var(--anim-base), transform var(--anim-base);
  }

  .brand:hover .uso-image-mark img {
    filter: drop-shadow(0 4px 14px rgba(56, 189, 248, 0.55));
    transform: scale(1.02);
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .brand-logo-circle {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-cyan) 100%);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.35);
  }

  .brand-logo-circle svg {
    width: 26px;
    height: 26px;
    stroke: #ffffff;
  }

  .brand-titles h1 {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #ffffff;
    line-height: 1.25;
  }

  .brand-titles p {
    font-size: 0.82rem;
    color: var(--slate-400);
    line-height: 1.2;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .lang-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--slate-200);
    padding: 6px 14px;
    border-radius: var(--radius-pill);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--anim-base);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lang-btn:hover {
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
    border-color: var(--primary-400);
  }

  .lang-btn.active {
    background: var(--primary-600);
    color: #ffffff;
    border-color: var(--primary-400);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
  }

  .version-pill {
    background: rgba(30, 58, 138, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: var(--primary-200);
    padding: 5px 12px;
    border-radius: var(--radius-pill);
    font-size: 0.78rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .version-indicator-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent-emerald);
    box-shadow: 0 0 8px var(--accent-emerald);
    animation: pulse 2s infinite;
  }

  /* --- 4. Main Container & Hero Section --- */
  .container.hero,
  .hero {
    background: linear-gradient(180deg, #0b1329 0%, #0f172a 55%, #1e293b 100%);
    color: #ffffff;
    padding: 60px 24px 72px;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .container.hero::before,
  .hero::before {
    content: '';
    position: absolute;
    top: -45%;
    left: 50%;
    transform: translateX(-50%);
    width: 950px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, rgba(37, 99, 235, 0.12) 45%, transparent 75%);
    pointer-events: none;
    z-index: 1;
  }

  .container.hero > div,
  .hero > div {
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(6, 182, 212, 0.12);
    border: 1px solid rgba(6, 182, 212, 0.35);
    color: var(--accent-sky);
    padding: 7px 20px;
    border-radius: var(--radius-pill);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 24px;
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
    backdrop-filter: blur(8px);
  }

  .hero-title {
    font-size: clamp(2.2rem, 5.2vw, 3.75rem);
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .uso-word {
    font-weight: 900;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #38bdf8 0%, #2563eb 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px rgba(56, 189, 248, 0.45));
    position: relative;
    display: inline-block;
  }

  .thai-title {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .thai-line {
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .thai-accent {
    background: linear-gradient(135deg, #38bdf8 0%, #6ee7b7 60%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 8px rgba(52, 211, 153, 0.35));
    font-weight: 800;
  }

  .lead {
    font-size: clamp(1.02rem, 1.8vw, 1.18rem);
    line-height: 1.8;
    color: #cbd5e1;
    max-width: 780px;
    margin: 0 auto 32px;
    font-weight: 400;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 34px;
    border-radius: var(--radius-pill);
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all var(--anim-base);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 18px rgba(37, 99, 235, 0.45);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 26px rgba(37, 99, 235, 0.65);
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-400) 100%);
    color: #ffffff;
  }

  .quick-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .quick-list span {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    font-size: 0.88rem;
    font-weight: 500;
    padding: 7px 18px;
    border-radius: var(--radius-pill);
    backdrop-filter: blur(8px);
    transition: all var(--anim-fast);
  }

  .quick-list span:hover {
    color: #f8fafc;
    border-color: rgba(56, 189, 248, 0.4);
    background: rgba(56, 189, 248, 0.12);
    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.25);
    transform: translateY(-1px);
  }

  .landing-hero-section {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    padding: 52px 24px 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .landing-hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content-wrapper {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .hero-badge-container {
    margin-bottom: 18px;
    display: inline-block;
  }

  .hero-telemetry-badge {
    background: rgba(6, 182, 212, 0.12);
    border: 1px solid rgba(6, 182, 212, 0.35);
    color: var(--accent-sky);
    padding: 6px 16px;
    border-radius: var(--radius-pill);
    font-size: 0.82rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.02em;
  }

  .badge-pulse-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-cyan);
    box-shadow: 0 0 10px var(--accent-cyan);
    animation: pulse 1.8s infinite;
  }

  .hero-headline {
    font-size: clamp(1.6rem, 3.2vw, 2.35rem);
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 28px;
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-cta-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-hero-primary {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
    color: #ffffff;
    border: 1px solid var(--primary-500);
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    transition: all var(--anim-base);
  }

  .btn-hero-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.5);
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  }

  .btn-hero-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all var(--anim-base);
  }

  .btn-hero-secondary:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
  }

  /* --- 5. Main Dashboard Container & Section Meta --- */
  .dashboard-container {
    max-width: 1320px;
    margin: 32px auto;
    padding: 0 24px;
    width: 100%;
    flex: 1;
  }

  .section-info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--slate-200);
    flex-wrap: wrap;
    gap: 8px;
  }

  .section-label-text {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--slate-800);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-label-text svg {
    width: 20px;
    height: 20px;
    stroke: var(--primary-600);
  }

  .section-help-text {
    font-size: 0.85rem;
    color: var(--slate-500);
  }

  /* --- 6. 8-Module Grid Cards --- */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .card-btn {
    background: var(--surface-card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    padding: 20px 16px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 128px;
    box-shadow: var(--shadow-sm);
    transition: all var(--anim-base);
    text-decoration: none;
    color: inherit;
  }

  .card-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: transparent;
    transition: background var(--anim-base);
  }

  .card-btn:hover {
    transform: translateY(-3px);
    border-color: var(--card-hover-border);
    box-shadow: var(--shadow-md);
  }

  .card-btn:hover::before {
    background: var(--primary-400);
  }

  .card-icon-box {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-md);
    background: var(--primary-50);
    color: var(--primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    transition: all var(--anim-base);
  }

  .card-icon-box svg,
  .ui-icon {
    width: 26px;
    height: 26px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    display: inline-block;
    vertical-align: middle;
  }

  .ui-icon-xs {
    width: 13px;
    height: 13px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
    display: inline-block;
    vertical-align: middle;
  }

  .card-btn:hover .card-icon-box {
    background: var(--primary-100);
    color: var(--primary-700);
    transform: scale(1.08);
  }

  .card-label-text {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--slate-700);
    line-height: 1.35;
    transition: color var(--anim-base);
  }

  /* External Link Pill on Card */
  .external-link-pill {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.7rem;
    color: var(--primary-500);
    background: var(--primary-50);
    border: 1px solid var(--primary-100);
    border-radius: var(--radius-pill);
    padding: 2px 6px;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* Active Card State */
  .card-btn.active {
    background: linear-gradient(145deg, #1d4ed8 0%, #1e40af 100%);
    border-color: #1e40af;
    color: #ffffff;
    box-shadow: var(--shadow-active);
  }

  .card-btn.active::before {
    background: var(--accent-sky);
  }

  .card-btn.active .card-icon-box {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .card-btn.active .card-label-text {
    color: #ffffff;
  }

  .card-btn.active .external-link-pill {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
  }

  /* --- 7. Content Details Panel --- */
  .content-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: var(--surface-card);
    border: 1px solid var(--slate-200);
    border-radius: var(--radius-xl);
    padding: clamp(24px, 3vw, 36px);
    box-shadow: var(--shadow-lg);
    margin-bottom: 40px;
    transition: all var(--anim-smooth);
  }

  .panel-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--slate-200);
  }

  .panel-eyebrow {
    color: var(--slate-500);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-pill);
    background: var(--primary-50);
    color: var(--primary-700);
    font-size: 0.8rem;
    font-weight: 700;
  }

  .panel-body-content {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }

  .panel-icon-svg-wrap {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-50) 100%);
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-600);
    flex-shrink: 0;
  }

  .panel-icon-svg-wrap svg {
    width: 32px;
    height: 32px;
  }

  .panel-text-wrap {
    flex: 1;
  }

  .panel-main-heading {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--slate-900);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .panel-description {
    font-size: 0.95rem;
    color: var(--slate-600);
    line-height: 1.6;
  }

  .panel-action-area {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 18px;
    border-top: 1px solid var(--slate-100);
    flex-wrap: wrap;
  }

  .panel-action-hint {
    font-size: 0.82rem;
    color: var(--slate-400);
  }

  .btn-action-primary {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
    color: #ffffff;
    border: 1px solid var(--primary-500);
    padding: 10px 22px;
    border-radius: var(--radius-pill);
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    transition: all var(--anim-base);
    text-decoration: none;
  }

  .btn-action-primary:hover {
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
  }

  /* --- 8. Video Showcase Panel --- */
  .video-section-container {
    margin-bottom: 48px;
  }

  .video-showcase-card {
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    padding: clamp(20px, 3vw, 36px);
    color: #ffffff;
    box-shadow: var(--shadow-xl);
  }

  .video-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .video-title-group {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .video-icon-pill {
    width: 44px;
    height: 44px;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-cyan);
  }

  .video-icon-pill svg {
    width: 24px;
    height: 24px;
  }

  .video-heading-wrap h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.3;
  }

  .video-badge {
    background: rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
    color: var(--accent-cyan);
    margin-bottom: 4px;
  }

  .video-meta-badges {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .video-hd-pill {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    font-size: 0.75rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .video-spec-pill {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--slate-300);
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .video-player-wrapper {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #000000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }

  .responsive-video-player {
    width: 100%;
    max-height: 520px;
    display: block;
    object-fit: contain;
  }

  .video-caption-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
  }

  .video-caption-left {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--slate-400);
    font-size: 0.88rem;
    line-height: 1.5;
    flex: 1;
  }

  .video-caption-left svg {
    width: 20px;
    height: 20px;
    color: var(--accent-cyan);
    flex-shrink: 0;
  }

  .video-caption-tags {
    display: flex;
    gap: 8px;
  }

  .video-tag-item {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--slate-300);
    padding: 3px 8px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
  }

  /* --- 9. Footer --- */
  .dashboard-footer {
    background: #0f172a;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--slate-400);
    padding: 24px;
    font-size: 0.85rem;
    margin-top: auto;
  }

  .footer-inner {
    max-width: 1320px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .app-version-text {
    color: var(--accent-cyan);
    font-weight: 700;
  }

  /* --- 10. Keyframes & Animations --- */
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }

  /* --- 11. Responsive Breakpoints --- */
  @media (max-width: 1024px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
    .header-inner {
      flex-direction: column;
      align-items: flex-start;
    }
    .panel-body-content {
      flex-direction: column;
    }
    .panel-icon-svg-wrap {
      width: 48px;
      height: 48px;
    }
    .video-header-row {
      flex-direction: column;
      align-items: flex-start;
    }
    .footer-inner {
      flex-direction: column;
      text-align: center;
    }
  }
`;
