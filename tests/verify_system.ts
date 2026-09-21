import fs from 'fs';
import path from 'path';
import { APP_VERSION, HERO_BG_VIDEO_SRC } from '../src/lib/constants';
import { MENU_MODULES_DATA, ICONS } from '../src/lib/modules-data';
import { dashboardService } from '../src/lib/modules-service';
import { I18N_RESOURCES, MODULE_KEYS, resolveTranslation } from '../src/lib/i18n';

const ROOT_DIR = path.resolve(__dirname, '..');
const EXPECTED_VERSION = '3.2.0';

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assertCheck(name: string, condition: boolean, errorMsg: string = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${name}`);
  } else {
    failedChecks++;
    console.error(`[FAIL] ${name}: ${errorMsg}`);
  }
}

function verifyVersionIntegrity() {
  console.log('\n--- 1. System Version & Core Assets Integrity (v3.2.0) ---');

  assertCheck(
    'constants.ts APP_VERSION is 3.2.0',
    APP_VERSION === EXPECTED_VERSION,
    `Found: ${APP_VERSION}`
  );

  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8')
    );
    assertCheck(
      'package.json version matches constants.ts',
      pkg.version === EXPECTED_VERSION,
      `Found: ${pkg.version}`
    );
  } catch (e: any) {
    assertCheck('package.json readable', false, e.message);
  }

  assertCheck(
    'HERO_BG_VIDEO_SRC constant is /assets/image/VEO1.mp4',
    HERO_BG_VIDEO_SRC === '/assets/image/VEO1.mp4',
    `Found: ${HERO_BG_VIDEO_SRC}`
  );

  const videoAssetPath = path.join(ROOT_DIR, 'public/assets/image/VEO1.mp4');
  assertCheck(
    'VEO1 background video asset exists in public/assets/image/',
    fs.existsSync(videoAssetPath) && fs.statSync(videoAssetPath).size > 0,
    `Missing or empty: ${videoAssetPath}`
  );
}

function verifyModulesDataAndUrls() {
  console.log('\n--- 2. Modules Data & Operational URLs ---');

  assertCheck('Loaded exactly 10 operational modules', MENU_MODULES_DATA.length === 10);

  const expectedUrls: Record<number, string> = {
    0: 'https://pm-5year.vercel.app/',
    1: 'https://dtrs-app-uat.forth.co.th/dashboard',
    2: 'https://pre-pm-2.vercel.app/',
    3: 'https://equipment-claims.vercel.app/',
    4: 'https://bssc-nine.vercel.app/',
    5: 'https://wara5year.vercel.app/',
    6: 'https://www.stockflowth.online/dashboard',
    7: 'https://contion.vercel.app/',
    8: 'https://antenna-inky.vercel.app/',
    9: 'https://azmuth-kappa.vercel.app/'
  };

  for (const [idxStr, expectedUrl] of Object.entries(expectedUrls)) {
    const idx = parseInt(idxStr, 10);
    const mod = MENU_MODULES_DATA[idx];
    assertCheck(
      `Module ${idx + 1} URL matches target`,
      mod !== undefined && mod.externalUrl === expectedUrl,
      `Actual URL: ${mod?.externalUrl}`
    );
    assertCheck(
      `Module ${idx + 1} has valid SVG icon (No Unicode Emoji)`,
      mod !== undefined && typeof mod.svgIcon === 'string' && mod.svgIcon.includes('<svg'),
      `Missing SVG in module ${idx + 1}`
    );
  }

  // Verify 9th module dedicated telecom antenna icon
  const mod9 = MENU_MODULES_DATA[8];
  assertCheck(
    'Module 9 uses dedicated telecom antenna SVG icon (Lucide antenna)',
    mod9 !== undefined &&
    typeof mod9.svgIcon === 'string' &&
    mod9.svgIcon.includes('M2 12h7') &&
    mod9.svgIcon.includes('M7 12v6a3 3 0 0 0 6 0v-6')
  );

  // Verify 10th module dedicated directional azimuth compass icon
  const mod10 = MENU_MODULES_DATA[9];
  assertCheck(
    'Module 10 uses dedicated directional azimuth compass SVG icon (Lucide compass)',
    mod10 !== undefined &&
    typeof mod10.svgIcon === 'string' &&
    mod10.svgIcon.includes('circle cx="12" cy="12" r="10"') &&
    mod10.svgIcon.includes('polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"')
  );
}

function verifyBackendService() {
  console.log('\n--- 3. TypeScript Backend Service Parity ---');

  const allMods = dashboardService.getAllModules();
  assertCheck('DashboardService.getAllModules returns 10 items', allMods.length === 10);

  const defaultMod = dashboardService.getDefaultModule();
  assertCheck('DashboardService.getDefaultModule returns PM module (index 0)', defaultMod.orderIndex === 0);

  const mod0 = dashboardService.getModuleByOrderIndex(0);
  assertCheck('DashboardService.getModuleByOrderIndex(0) found', mod0 !== undefined && mod0.id === 1);

  const mod8 = dashboardService.getModuleByOrderIndex(8);
  assertCheck('DashboardService.getModuleByOrderIndex(8) found module 9', mod8 !== undefined && mod8.id === 9);

  const mod9 = dashboardService.getModuleByOrderIndex(9);
  assertCheck('DashboardService.getModuleByOrderIndex(9) found module 10', mod9 !== undefined && mod9.id === 10);

  const modInvalid = dashboardService.getModuleByOrderIndex(99);
  assertCheck('DashboardService.getModuleByOrderIndex(99) returns undefined', modInvalid === undefined);
}

function verifyI18nEngine() {
  console.log('\n--- 4. i18n Bilingual Engine (EN / TH) ---');

  assertCheck('I18N_RESOURCES contains English', !!I18N_RESOURCES.en);
  assertCheck('I18N_RESOURCES contains Thai', !!I18N_RESOURCES.th);
  assertCheck('MODULE_KEYS has 10 keys', MODULE_KEYS.length === 10);

  for (const key of MODULE_KEYS) {
    const enMod = I18N_RESOURCES.en.translation.modules[key];
    const thMod = I18N_RESOURCES.th.translation.modules[key];

    assertCheck(
      `Module ${key} has EN translations`,
      !!(enMod && enMod.shortTitle && enMod.fullTitle && enMod.badge && enMod.description)
    );
    assertCheck(
      `Module ${key} has TH translations`,
      !!(thMod && thMod.shortTitle && thMod.fullTitle && thMod.badge && thMod.description)
    );
  }

  // Translation interpolation test
  const enResolved = resolveTranslation('en', 'actions.openPrimary', { title: 'Test' });
  assertCheck(
    'resolveTranslation handles interpolation without Launch Primary System prefix',
    enResolved === 'Test',
    `Resolved: ${enResolved}`
  );
}

function verifyUiIconPolicy() {
  console.log('\n--- 5. UI Icon Policy Compliance ---');

  // Verify that all icons in ICONS registry contain valid SVG markup and no emojis
  for (const [iconName, iconSvg] of Object.entries(ICONS)) {
    if (typeof iconSvg === 'string') {
      const isSvg = iconSvg.includes('<svg') && iconSvg.includes('</svg>');
      assertCheck(`Icon [${iconName}] is valid SVG`, isSvg);
    }
  }
}

function verifyZeroLegacyFiles() {
  console.log('\n--- 6. Zero Legacy Files Audit ---');

  function findFilesWithExt(dir: string, extensions: string[]): string[] {
    const results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findFilesWithExt(fullPath, extensions));
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
    return results;
  }

  const legacyJava = findFilesWithExt(ROOT_DIR, ['.java']);
  const legacyHtml = findFilesWithExt(ROOT_DIR, ['.html']);
  const legacyCss = findFilesWithExt(ROOT_DIR, ['.css']);
  const legacyJs = findFilesWithExt(ROOT_DIR, ['.js', '.jsx', '.cjs', '.mjs']);

  assertCheck(
    'Zero legacy .java files in project',
    legacyJava.length === 0,
    `Found ${legacyJava.length} file(s): ${legacyJava.join(', ')}`
  );

  assertCheck(
    'Zero standalone .html files in project',
    legacyHtml.length === 0,
    `Found ${legacyHtml.length} file(s): ${legacyHtml.join(', ')}`
  );

  assertCheck(
    'Zero standalone .css files in project',
    legacyCss.length === 0,
    `Found ${legacyCss.length} file(s): ${legacyCss.join(', ')}`
  );

  assertCheck(
    'Zero legacy standalone .js/.jsx/.cjs/.mjs files in source tree',
    legacyJs.length === 0,
    `Found ${legacyJs.length} file(s): ${legacyJs.join(', ')}`
  );

  return { legacyJava, legacyHtml, legacyCss, legacyJs };
}

function verifyVideoShowcaseAutoplay() {
  console.log('\n--- 7. Video Showcase Clean Layout, Continuous Looping & Autoplay Integrity ---');

  const videoComponentPath = path.join(ROOT_DIR, 'src/components/VideoShowcase.tsx');
  assertCheck('VideoShowcase.tsx component exists', fs.existsSync(videoComponentPath));

  const content = fs.readFileSync(videoComponentPath, 'utf8');

  // Video element contains autoPlay attribute
  assertCheck(
    'VideoShowcase video element contains autoPlay attribute',
    content.includes('autoPlay')
  );

  // Video element configured for continuous looping
  assertCheck(
    'VideoShowcase video element contains loop attribute for continuous playback',
    content.includes('loop')
  );

  // Video element preserves controls, playsInline, and preload="auto"
  assertCheck(
    'VideoShowcase video element preserves controls, playsInline, and preload="auto"',
    content.includes('controls') && content.includes('playsInline') && content.includes('preload="auto"')
  );

  // Handles unmuted-first autoplay with muted fallback
  assertCheck(
    'VideoShowcase configures audio enabled by default with muted fallback',
    content.includes('video.muted = false') && content.includes('video.muted = true')
  );

  // Video default volume level configured to 50% (0.5)
  assertCheck(
    'VideoShowcase configures default volume to 50% (video.volume = 0.5)',
    content.includes('video.volume = 0.5;')
  );

  // Video meta badges (1080p, 60 FPS, HD icon) completely removed from component
  assertCheck(
    'VideoShowcase has video-meta-badges block (1080p, 60 FPS) completely removed',
    !content.includes('video-meta-badges') && !content.includes('1080p Full HD') && !content.includes('60 FPS')
  );

  // Stylesheet has unused badge CSS rules removed
  const stylesPath = path.join(ROOT_DIR, 'src/styles/dashboard.styles.ts');
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  assertCheck(
    'dashboard.styles.ts has unused badge CSS classes completely removed',
    !stylesContent.includes('.video-meta-badges') &&
    !stylesContent.includes('.video-hd-pill') &&
    !stylesContent.includes('.video-spec-pill')
  );

  // Video heading h2 and unused CSS/i18n removal
  assertCheck(
    'VideoShowcase does not contain h2 heading or video.title',
    !content.includes('<h2>') && !content.includes("t('video.title')")
  );
  assertCheck(
    'dashboard.styles.ts has .video-heading-wrap h2 completely removed',
    !stylesContent.includes('.video-heading-wrap h2')
  );
  const i18nPath = path.join(ROOT_DIR, 'src/lib/i18n.ts');
  const i18nContent = fs.readFileSync(i18nPath, 'utf8');
  assertCheck(
    'i18n.ts does not contain FORTH Master System Operations Video title key',
    !('title' in (I18N_RESOURCES.en.translation.video as any)) &&
    !('title' in (I18N_RESOURCES.th.translation.video as any))
  );

  // Master video file exists
  const masterVideoPath = path.join(ROOT_DIR, 'public/FORTH_MASTER_Video_Final-Additional.mp4');
  assertCheck(
    'Master presentation video asset exists in public/',
    fs.existsSync(masterVideoPath) && fs.statSync(masterVideoPath).size > 0
  );
}

function verifyModuleCardMicroInteractions() {
  console.log('\n--- 8. Service Module Card Icon Micro-Interactions & Hover Dynamics ---');

  const stylesPath = path.join(ROOT_DIR, 'src/styles/dashboard.styles.ts');
  assertCheck('dashboard.styles.ts exists', fs.existsSync(stylesPath));

  const stylesContent = fs.readFileSync(stylesPath, 'utf8');

  // Check card-icon-box glowing aura backdrop
  assertCheck(
    'Styles contain card-icon-box glowing aura backdrop (.card-icon-box::before)',
    stylesContent.includes('.card-icon-box::before') && stylesContent.includes('radial-gradient')
  );

  // Check hover spring micro-interaction animation
  assertCheck(
    'Styles define iconSpringBounce keyframes for scale-up, rotation and spring bounce',
    stylesContent.includes('@keyframes iconSpringBounce')
  );

  assertCheck(
    'Card hover applies spring bounce animation and glowing aura bloom',
    stylesContent.includes('animation: iconSpringBounce') && stylesContent.includes('.card-btn:hover .card-icon-box::before')
  );

  // Check active card hover glow
  assertCheck(
    'Active card maintains enhanced hover aura and filter drop-shadow',
    stylesContent.includes('.card-btn.active:hover .card-icon-box')
  );

  // Check prefers-reduced-motion compliance
  assertCheck(
    'Reduced motion gracefully disables card icon spring animation',
    stylesContent.includes('.card-icon-box') && stylesContent.includes('prefers-reduced-motion')
  );

  // Check external-link-pill and panel-action-hint removal from styles
  assertCheck(
    'dashboard.styles.ts has external-link-pill and panel-action-hint styles completely removed',
    !stylesContent.includes('.external-link-pill') && !stylesContent.includes('.panel-action-hint')
  );

  // Check ModuleCard.tsx has external-link-pill and openNewTab removed
  const moduleCardPath = path.join(ROOT_DIR, 'src/components/ModuleCard.tsx');
  const moduleCardContent = fs.readFileSync(moduleCardPath, 'utf8');
  assertCheck(
    'ModuleCard.tsx does not contain external-link-pill or openNewTab',
    !moduleCardContent.includes('external-link-pill') && !moduleCardContent.includes('openNewTab')
  );

  // Check Card 9 aligned click behavior and in-place detail panel display
  assertCheck(
    'ModuleCard.tsx delegates onClick directly to onSelect for in-place selection',
    moduleCardContent.includes('onClick={() => onSelect(module.orderIndex)}')
  );
  assertCheck(
    'ModuleCard.tsx does not directly open external links on card click',
    !moduleCardContent.includes('window.open')
  );
  assertCheck(
    'ModuleCard.tsx and dashboard.styles.ts have card-ext-badge completely removed',
    !moduleCardContent.includes('card-ext-badge') && !stylesContent.includes('.card-ext-badge')
  );

  // Check ModulesSection.tsx has panel-action-hint removed and retains action button
  const modulesSectionPath = path.join(ROOT_DIR, 'src/components/ModulesSection.tsx');
  const modulesSectionContent = fs.readFileSync(modulesSectionPath, 'utf8');
  assertCheck(
    'ModulesSection.tsx retains external link launch on the detail panel action button',
    modulesSectionContent.includes('handleLaunchPortal') && modulesSectionContent.includes('btn-action-primary')
  );
  assertCheck(
    'ModulesSection.tsx does not contain panel-action-hint',
    !modulesSectionContent.includes('panel-action-hint')
  );

  // Check auto-scroll interaction on module card selection to MODULE DETAILS panel
  assertCheck(
    'ModulesSection.tsx contains auto-scroll interaction with scrollIntoView smooth block start',
    modulesSectionContent.includes("detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' })") &&
    modulesSectionContent.includes('dashboard-content-panel')
  );
  assertCheck(
    'dashboard.styles.ts configures scroll-margin-top: 80px for #dashboard-content-panel and .content-panel',
    stylesContent.includes('.content-panel') && stylesContent.includes('scroll-margin-top: 80px;')
  );

  // Check no "Launch Primary System:" prefix in i18n or ModulesSection
  const i18nPath = path.join(ROOT_DIR, 'src/lib/i18n.ts');
  const i18nContent = fs.readFileSync(i18nPath, 'utf8');
  assertCheck(
    'i18n.ts does not contain "Launch Primary System:" or "เปิดระบบหลัก:"',
    !i18nContent.includes('Launch Primary System:') && !i18nContent.includes('เปิดระบบหลัก:')
  );
  assertCheck(
    'ModulesSection.tsx does not contain "Launch Primary System:"',
    !modulesSectionContent.includes('Launch Primary System:')
  );

  // Check version-pill element and styles removal
  const headerPath = path.join(ROOT_DIR, 'src/components/Header.tsx');
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  assertCheck(
    'Header.tsx does not contain version-pill, version-indicator-dot, or Authoritative Version',
    !headerContent.includes('version-pill') &&
    !headerContent.includes('version-indicator-dot') &&
    !headerContent.includes('Authoritative Version')
  );
  assertCheck(
    'Header.tsx does not have unused APP_VERSION import',
    !headerContent.includes('APP_VERSION')
  );
  assertCheck(
    'dashboard.styles.ts has version-pill and version-indicator-dot styles completely removed',
    !stylesContent.includes('.version-pill') &&
    !stylesContent.includes('.version-indicator-dot')
  );
}

function verifyEnterSystemButtonAction() {
  console.log('\n--- 9. Enter System Button Action & PM Module Selection Integrity ---');

  // Verify i18n support for enterSystem in EN and TH
  assertCheck(
    'I18N_RESOURCES.en contains hero.enterSystem: "Enter System"',
    I18N_RESOURCES.en.translation.hero.enterSystem === 'Enter System'
  );
  assertCheck(
    'I18N_RESOURCES.th contains hero.enterSystem: "เข้าสู่ระบบงาน"',
    I18N_RESOURCES.th.translation.hero.enterSystem === 'เข้าสู่ระบบงาน'
  );

  // Verify Hero component button configuration
  const heroPath = path.join(ROOT_DIR, 'src/components/Hero.tsx');
  assertCheck('Hero.tsx component exists', fs.existsSync(heroPath));
  const heroContent = fs.readFileSync(heroPath, 'utf8');

  assertCheck(
    'Hero.tsx imports and uses useI18n',
    heroContent.includes("import { useI18n } from '../lib/i18n';") &&
    heroContent.includes('const { t } = useI18n();')
  );
  assertCheck(
    'Hero.tsx contains id="btn-enter-system" on the action button',
    heroContent.includes('id="btn-enter-system"')
  );
  assertCheck(
    'Hero.tsx primary button renders translated enterSystem label and arrow',
    heroContent.includes("{t('hero.enterSystem')} &rarr;")
  );
  assertCheck(
    'Hero.tsx button links to #systems anchor with onExploreClick handler',
    heroContent.includes('href="#systems"') && heroContent.includes('onExploreClick();')
  );

  // Verify page.tsx handleExploreClick sets module 0 and scrolls to dashboard
  const pagePath = path.join(ROOT_DIR, 'src/app/page.tsx');
  assertCheck('page.tsx exists', fs.existsSync(pagePath));
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  assertCheck(
    'page.tsx handleExploreClick explicitly sets activeModuleIndex to 0 (1. Perform PM)',
    pageContent.includes('setActiveModuleIndex(0);')
  );
  assertCheck(
    'page.tsx handleExploreClick smoothly scrolls to systems section',
    pageContent.includes("el.scrollIntoView({ behavior: 'smooth', block: 'start' });")
  );
  assertCheck(
    'page.tsx updates browser history state to #systems on click',
    pageContent.includes("window.history.pushState(null, '', '#systems');")
  );
  assertCheck(
    'page.tsx handles direct load with #systems hash to activate PM module and scroll',
    pageContent.includes("hash === '#systems'")
  );

  // Verify dashboard.styles.ts scroll-margin-top for #systems
  const stylesPath = path.join(ROOT_DIR, 'src/styles/dashboard.styles.ts');
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  assertCheck(
    'dashboard.styles.ts configures scroll-margin-top: 80px for #systems and .dashboard-container',
    stylesContent.includes('#systems') && stylesContent.includes('scroll-margin-top: 80px;')
  );
}

export function runSuite() {
  console.log('===================================================================');
  console.log('SHF Dashboard - TypeScript-Only Stack Verification Suite');
  console.log(`Version: v${EXPECTED_VERSION}`);
  console.log('===================================================================');

  verifyVersionIntegrity();
  verifyModulesDataAndUrls();
  verifyBackendService();
  verifyI18nEngine();
  verifyUiIconPolicy();
  verifyZeroLegacyFiles();
  verifyVideoShowcaseAutoplay();
  verifyModuleCardMicroInteractions();
  verifyEnterSystemButtonAction();

  console.log('\n===================================================================');
  console.log(`Summary: ${passedChecks}/${totalChecks} Checks Passed.`);

  if (failedChecks > 0) {
    console.error(`Status: FAILED with ${failedChecks} errors.`);
    process.exit(1);
  } else {
    console.log('Status: ALL CHECKS PASSED [OK]');
    process.exit(0);
  }
}

if (require.main === module || process.argv[1]?.endsWith('verify_system.ts')) {
  runSuite();
}
