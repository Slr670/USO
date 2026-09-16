/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: scripts/verify_system.js
 * Purpose: Automated Verification Suite for System Integrity, SemVer & TypeScript 7.0.2
 * Version: 2.6.2
 * ===================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const EXPECTED_VERSION = '2.6.4';

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assertCheck(name, condition, errorMsg = '') {
    totalChecks++;
    if (condition) {
        passedChecks++;
        console.log(`[PASS] ${name}`);
    } else {
        failedChecks++;
        console.error(`[FAIL] ${name}: ${errorMsg}`);
    }
}

function verifyVersions() {
    console.log('\n--- 1. System Version Integrity Verification ---');

    try {
        const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
        assertCheck('package.json has valid SemVer version', /^\d+\.\d+\.\d+$/.test(pkg.version), `Found: ${pkg.version}`);
    } catch (e) {
        assertCheck('package.json readable', false, e.message);
    }

    try {
        const pom = fs.readFileSync(path.join(ROOT_DIR, 'pom.xml'), 'utf8');
        const pomMatch = pom.match(/<artifactId>shf-dashboard<\/artifactId>\s*<version>([^<]+)<\/version>/);
        const pomVersion = pomMatch ? pomMatch[1] : null;
        assertCheck('pom.xml has valid SemVer version', !!(pomVersion && /^\d+\.\d+\.\d+$/.test(pomVersion)), `Found: ${pomVersion}`);
    } catch (e) {
        assertCheck('pom.xml readable', false, e.message);
    }

    try {
        const yml = fs.readFileSync(path.join(ROOT_DIR, 'src', 'main', 'resources', 'application.yml'), 'utf8');
        const ymlMatch = yml.match(/version:\s*(\d+\.\d+\.\d+)/);
        const ymlVersion = ymlMatch ? ymlMatch[1] : null;
        assertCheck('application.yml has valid SemVer version', !!ymlVersion, `Found: ${ymlVersion}`);
    } catch (e) {
        assertCheck('application.yml readable', false, e.message);
    }
}

function verifyModulesData() {
    console.log('\n--- 2. Operational Modules & Dataset Verification ---');

    try {
        const { MENU_MODULES_DATA, ICONS } = require(path.join(ROOT_DIR, 'scripts', 'modules-data.js'));

        assertCheck('MENU_MODULES_DATA is an array', Array.isArray(MENU_MODULES_DATA));
        assertCheck('Loaded exactly 8 operational modules', MENU_MODULES_DATA.length === 8, `Found ${MENU_MODULES_DATA.length} modules`);

        // Verify required URLs
        const expectedUrls = {
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
            assertCheck(`Module ${idx + 1} URL matches`, mod && mod.externalUrl === expectedUrl, `Module ${idx + 1} URL: ${mod?.externalUrl}`);
            assertCheck(`Module ${idx + 1} has valid SVG icon`, mod && typeof mod.svgIcon === 'string' && mod.svgIcon.includes('<svg'), `Module ${idx + 1} missing SVG`);
        }

        assertCheck('ICONS registry contains broadcastTower', typeof ICONS.broadcastTower === 'string' && ICONS.broadcastTower.includes('<svg'));
    } catch (e) {
        assertCheck('modules-data.js execution', false, e.message);
    }
}

function verifyI18nEngine() {
    console.log('\n--- 3. i18n Translation Resources & Engine Verification ---');

    try {
        const { I18N_RESOURCES, MODULE_KEYS } = require(path.join(ROOT_DIR, 'scripts', 'i18n.js'));

        assertCheck('I18N_RESOURCES has English (en)', !!(I18N_RESOURCES && I18N_RESOURCES.en));
        assertCheck('I18N_RESOURCES has Thai (th)', !!(I18N_RESOURCES && I18N_RESOURCES.th));
        assertCheck('MODULE_KEYS has 8 keys', Array.isArray(MODULE_KEYS) && MODULE_KEYS.length === 8);

        for (const mKey of MODULE_KEYS) {
            const enMod = I18N_RESOURCES.en.translation.modules[mKey];
            const thMod = I18N_RESOURCES.th.translation.modules[mKey];

            assertCheck(`Module ${mKey} has English translations`, !!(enMod && enMod.shortTitle && enMod.fullTitle && enMod.description));
            assertCheck(`Module ${mKey} has Thai translations`, !!(thMod && thMod.shortTitle && thMod.fullTitle && thMod.description));
        }

        // Verify Landing Page i18n
        const enTrans = I18N_RESOURCES.en.translation;
        const thTrans = I18N_RESOURCES.th.translation;
        assertCheck('Hero translations exist (EN/TH)', !!(enTrans.hero && thTrans.hero && enTrans.hero.badge && thTrans.hero.ctaPrimary && enTrans.hero.ctaSecondary && thTrans.hero.ctaSecondary));
    } catch (e) {
        assertCheck('i18n.js execution', false, e.message);
    }
}

function verifyTypeScriptArtifacts() {
    console.log('\n--- 4. TypeScript 7.0.2 Source & Build Artifacts Verification ---');

    const tsSources = ['types/dashboard.types.d.ts', 'modules-data.ts', 'i18n.ts', 'dashboard.ts', 'landing.tsx'];
    for (const src of tsSources) {
        const fullPath = path.join(ROOT_DIR, 'src', 'main', 'typescript', src);
        assertCheck(`TypeScript source exists: ${src}`, fs.existsSync(fullPath));
    }

    const compiledDts = ['modules-data.d.ts', 'i18n.d.ts', 'dashboard.d.ts', 'landing.d.ts'];
    for (const dts of compiledDts) {
        const rootDts = path.join(ROOT_DIR, 'scripts', dts);
        const publicDts = path.join(ROOT_DIR, 'public', 'scripts', dts);
        const staticDts = path.join(ROOT_DIR, 'src', 'main', 'resources', 'static', 'js', dts);

        assertCheck(`scripts/${dts} exists`, fs.existsSync(rootDts));
        assertCheck(`public/scripts/${dts} exists`, fs.existsSync(publicDts));
        assertCheck(`static/js/${dts} exists`, fs.existsSync(staticDts));
    }
}

function verifyLandingPage() {
    console.log('\n--- 5. Landing Page Entry Experience & React 18 TSX Verification ---');

    // 5.1 Check landing.js artifact synchronization
    const landingLocations = [
        path.join(ROOT_DIR, 'scripts', 'landing.js'),
        path.join(ROOT_DIR, 'public', 'scripts', 'landing.js'),
        path.join(ROOT_DIR, 'src', 'main', 'resources', 'static', 'js', 'landing.js')
    ];
    for (const loc of landingLocations) {
        assertCheck(`landing.js synchronized: ${path.relative(ROOT_DIR, loc)}`, fs.existsSync(loc));
    }

    // 5.2 Check HTML entrypoint contains #root and loads landing.js
    try {
        const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
        assertCheck('index.html contains #root mount element', indexHtml.includes('id="root"'));
        assertCheck('index.html loads scripts/landing.js', indexHtml.includes('scripts/landing.js'));

        const publicHtml = fs.readFileSync(path.join(ROOT_DIR, 'public', 'index.html'), 'utf8');
        assertCheck('public/index.html contains #root mount element', publicHtml.includes('id="root"'));
        assertCheck('public/index.html loads scripts/landing.js', publicHtml.includes('scripts/landing.js'));
    } catch (e) {
        assertCheck('HTML entrypoint check', false, e.message);
    }

    // 5.3 Check landing.js exports
    try {
        const landingMod = require(path.join(ROOT_DIR, 'scripts', 'landing.js'));
        assertCheck('landing.js exports initLandingPage function', typeof landingMod.initLandingPage === 'function');
        assertCheck('landing.js exports LandingPage component', typeof landingMod.LandingPage === 'function');
    } catch (e) {
        assertCheck('landing.js export check', false, e.message);
    }
}

function runAllVerifications() {
    console.log('===================================================================');
    console.log('SHF Dashboard - Automated System Verification Suite');
    console.log('Testing TypeScript 7.0.2 & React 18 Landing Page Entry Experience');
    console.log('===================================================================');

    verifyVersions();
    verifyModulesData();
    verifyI18nEngine();
    verifyTypeScriptArtifacts();
    verifyLandingPage();

    console.log('\n===================================================================');
    console.log(`Verification Complete: ${passedChecks}/${totalChecks} Checks Passed.`);
    if (failedChecks > 0) {
        console.error(`Status: FAILED (${failedChecks} check(s) failed)`);
        process.exit(1);
    } else {
        console.log('Status: ALL CHECKS PASSED [OK]');
        process.exit(0);
    }
}

if (require.main === module) {
    runAllVerifications();
}

module.exports = { runAllVerifications };
