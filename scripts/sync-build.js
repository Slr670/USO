/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: scripts/sync-build.js
 * Purpose: Synchronize compiled TypeScript artifacts to public/ and Spring Boot static/
 * Version: 2.6.0
 * ===================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, 'scripts');
const TARGET_PUBLIC = path.join(ROOT_DIR, 'public', 'scripts');
const TARGET_SPRING = path.join(ROOT_DIR, 'src', 'main', 'resources', 'static', 'js');

// Files to synchronize
const COMPILED_BASENAMES = ['modules-data', 'i18n', 'dashboard', 'landing'];
const EXTENSIONS = ['.js', '.d.ts', '.js.map'];

function ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyRecursive(src, destPub, destSpring) {
    if (!fs.existsSync(src)) return 0;
    let count = 0;
    ensureDirectoryExists(destPub);
    ensureDirectoryExists(destSpring);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcChild = path.join(src, entry.name);
        const pubChild = path.join(destPub, entry.name);
        const springChild = path.join(destSpring, entry.name);
        if (entry.isDirectory()) {
            count += copyRecursive(srcChild, pubChild, springChild);
        } else {
            const data = fs.readFileSync(srcChild);
            fs.writeFileSync(pubChild, data);
            fs.writeFileSync(springChild, data);
            count++;
        }
    }
    return count;
}

function syncArtifacts() {
    console.log('[Sync-Build] Starting synchronization of TypeScript 7.0.2 compiled artifacts...');

    ensureDirectoryExists(TARGET_PUBLIC);
    ensureDirectoryExists(TARGET_SPRING);

    let syncCount = 0;

    for (const base of COMPILED_BASENAMES) {
        for (const ext of EXTENSIONS) {
            const fileName = base + ext;
            const srcPath = path.join(SOURCE_DIR, fileName);

            if (fs.existsSync(srcPath)) {
                const content = fs.readFileSync(srcPath);

                // 1. Copy to public/scripts/
                const destPublic = path.join(TARGET_PUBLIC, fileName);
                fs.writeFileSync(destPublic, content);

                // 2. Copy to src/main/resources/static/js/
                const destSpring = path.join(TARGET_SPRING, fileName);
                fs.writeFileSync(destSpring, content);

                syncCount++;
                console.log(`[Sync-Build] Synchronized: ${fileName} -> public/scripts/ & static/js/`);
            } else {
                console.warn(`[Sync-Build] Notice: Source file not found: ${fileName} (will be generated during tsc compile)`);
            }
        }
    }

    // Synchronize components directory
    const componentsSrc = path.join(SOURCE_DIR, 'components');
    const componentsPub = path.join(TARGET_PUBLIC, 'components');
    const componentsSpring = path.join(TARGET_SPRING, 'components');
    const componentCount = copyRecursive(componentsSrc, componentsPub, componentsSpring);
    syncCount += componentCount;
    if (componentCount > 0) {
        console.log(`[Sync-Build] Synchronized ${componentCount} component file(s) -> public/scripts/components/ & static/js/components/`);
    }

    // Synchronize CSS
    const cssSrc = path.join(ROOT_DIR, 'styles', 'dashboard.css');
    if (fs.existsSync(cssSrc)) {
        const cssContent = fs.readFileSync(cssSrc);
        const cssPub = path.join(ROOT_DIR, 'public', 'styles', 'dashboard.css');
        const cssSpring = path.join(ROOT_DIR, 'src', 'main', 'resources', 'static', 'css', 'dashboard.css');
        ensureDirectoryExists(path.dirname(cssPub));
        ensureDirectoryExists(path.dirname(cssSpring));
        fs.writeFileSync(cssPub, cssContent);
        fs.writeFileSync(cssSpring, cssContent);
        syncCount += 2;
        console.log('[Sync-Build] Synchronized: styles/dashboard.css -> public/styles/ & static/css/');
    }

    console.log(`[Sync-Build] Successfully synchronized ${syncCount} build artifact(s).`);
}

if (require.main === module) {
    syncArtifacts();
}

module.exports = { syncArtifacts };
