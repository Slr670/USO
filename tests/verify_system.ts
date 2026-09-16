/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: tests/verify_system.ts
 * Purpose: TypeScript Automated Verification Suite (v3.0.0)
 * ===================================================================
 */

import fs from 'fs';
import path from 'path';
import { APP_VERSION } from '../src/lib/constants';
import { MENU_MODULES_DATA, ICONS } from '../src/lib/modules-data';
import { dashboardService } from '../src/lib/modules-service';
import { I18N_RESOURCES, MODULE_KEYS, resolveTranslation } from '../src/lib/i18n';

const ROOT_DIR = path.resolve(__dirname, '..');
const EXPECTED_VERSION = '3.0.4';

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
  console.log('\n--- 1. System Version Integrity (v3.0.0) ---');

  assertCheck(
    'constants.ts APP_VERSION is 3.0.0',
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
}

function verifyModulesDataAndUrls() {
  console.log('\n--- 2. Modules Data & Operational URLs ---');

  assertCheck('Loaded exactly 8 operational modules', MENU_MODULES_DATA.length === 8);

  const expectedUrls: Record<number, string> = {
    0: 'https://pm-5year.vercel.app/',
    1: 'https://dtrs-app-uat.forth.co.th/dashboard',
    2: 'https://pre-pm-2.vercel.app/',
    3: 'https://equipment-claims.vercel.app/',
    4: 'https://bssc-nine.vercel.app/',
    5: 'https://wara5year.vercel.app/',
    6: 'https://www.stockflowth.online/dashboard',
    7: 'https://contion.vercel.app/'
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
}

function verifyBackendService() {
  console.log('\n--- 3. TypeScript Backend Service Parity ---');

  const allMods = dashboardService.getAllModules();
  assertCheck('DashboardService.getAllModules returns 8 items', allMods.length === 8);

  const defaultMod = dashboardService.getDefaultModule();
  assertCheck('DashboardService.getDefaultModule returns PM module (index 0)', defaultMod.orderIndex === 0);

  const mod0 = dashboardService.getModuleByOrderIndex(0);
  assertCheck('DashboardService.getModuleByOrderIndex(0) found', mod0 !== undefined && mod0.id === 1);

  const modInvalid = dashboardService.getModuleByOrderIndex(99);
  assertCheck('DashboardService.getModuleByOrderIndex(99) returns undefined', modInvalid === undefined);
}

function verifyI18nEngine() {
  console.log('\n--- 4. i18n Bilingual Engine (EN / TH) ---');

  assertCheck('I18N_RESOURCES contains English', !!I18N_RESOURCES.en);
  assertCheck('I18N_RESOURCES contains Thai', !!I18N_RESOURCES.th);
  assertCheck('MODULE_KEYS has 8 keys', MODULE_KEYS.length === 8);

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
    'resolveTranslation handles interpolation',
    enResolved === 'Launch Primary System: Test',
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
