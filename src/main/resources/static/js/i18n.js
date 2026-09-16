"use strict";
/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/i18n.ts
 * Purpose: Translation Engine using i18next + react-i18next
 *          Supports 100% English UI (Default) with Thai localization option
 * Version: 2.6.4
 * ===================================================================
 */
/**
 * Dual-language Translation Resources (English Default / Thai Localization)
 */
const I18N_RESOURCES = {
    en: {
        translation: {
            hero: {
                badge: "Next-Gen Telemetry & Operations Command Hub",
                title: "Super High Frequency (SHF) Repeater Network Optimization Project",
                ctaPrimary: "Explore Operational Modules",
                ctaSecondary: "Watch Master Operations Video"
            },
            section: {
                title: "Operational Categories & System Services",
                help: "Select a module card to view operational details or access external systems.",
                details: "Module Details"
            },
            modules: {
                m1: {
                    shortTitle: "1. Perform PM",
                    fullTitle: "1. Perform Preventive Maintenance (PM)",
                    badge: "Category: Preventive Maintenance",
                    description: "Schedule and record periodic inspection logs for SHF repeater base stations, measure radio frequency (RF) signal levels, inspect feeder cables, antennas, and verify backup power systems across all sites.",
                    tooltip: "Preventive Maintenance Operations (1. Perform PM)"
                },
                m2: {
                    shortTitle: "2. Handle CM",
                    fullTitle: "2. Handle Corrective Maintenance (CM)",
                    badge: "Category: Corrective Maintenance & Emergency Response",
                    description: "Open, track, and resolve incident tickets for SHF repeater equipment malfunctions and microwave link interruptions, dispatching technical teams within SLA-governed recovery windows.",
                    tooltip: "Corrective Maintenance & Troubleshooting (2. Handle CM)"
                },
                m3: {
                    shortTitle: "3. Quarterly Visits",
                    fullTitle: "3. Conduct Quarterly Site Inspection Visits",
                    badge: "Category: Quarterly Site Inspections",
                    description: "Coordinate and manage quarterly on-site inspection visits to regional stations, consolidate stakeholder feedback, resolve operational issues, and evaluate network user satisfaction.",
                    tooltip: "Quarterly Site Inspections & Field Audits (3. Quarterly Visits)"
                },
                m4: {
                    shortTitle: "4. Process Claims",
                    fullTitle: "4. Process Equipment & Warranty Claims",
                    badge: "Category: Warranty & Equipment RMA",
                    description: "Manage Return Merchandise Authorization (RMA) workflows for defective SHF transceiver modules, microwave feedhorns, and power supply units with equipment vendors, maintaining complete replacement audit trails.",
                    tooltip: "Equipment & Warranty Claims Management (4. Process Claims)"
                },
                m5: {
                    shortTitle: "5. Monitor System",
                    fullTitle: "5. Monitor System & Radio Telemetry",
                    badge: "Category: Network Telemetry & Real-Time Monitoring",
                    description: "Real-time telemetry dashboard displaying network uptime, SHF radio link degradation (Link Down events), received signal level (RSL) thresholds, and centralized alert event logs.",
                    tooltip: "System Telemetry & Network Monitoring (5. Monitor System)"
                },
                m6: {
                    shortTitle: "6. DOPA Tenure",
                    fullTitle: "6. Track DOPA Officials' Tenure",
                    badge: "Category: DOPA Tenure Tracking",
                    description: "Track the remaining tenure and operational missions of DOPA officials across the 181 USO stations network.",
                    tooltip: "Track DOPA Officials' Tenure (6. DOPA Tenure)"
                },
                m7: {
                    shortTitle: "7. Manage Inventory",
                    fullTitle: "7. Manage Spare Parts & Inventory",
                    badge: "Category: Spare Parts & Inventory Management",
                    description: "Manage reserve inventory levels for SHF repeater spare parts, parabolic antennas, RF amplifiers, power converters, and auxiliary components, auditing requisition logs for PM and CM dispatches.",
                    tooltip: "Inventory & Spare Parts Management (7. Manage Inventory)"
                },
                m8: {
                    shortTitle: "8. Assets & Equipment",
                    fullTitle: "8. Track Assets & Equipment Registry",
                    badge: "Category: Asset & Equipment Registry",
                    description: "Maintain comprehensive fixed-asset registration records for SHF telecommunication infrastructure, tracking Asset IDs, serial numbers, operational readiness, handover certificates, and equipment relocation histories.",
                    tooltip: "Asset & Equipment Registry Management (8. Assets & Equipment)"
                }
            },
            video: {
                sectionTitle: "FORTH Master System Operations",
                badge: "System Demonstration & Media Presentation",
                title: "FORTH Master System Operations Video",
                description: "Comprehensive overview and instructional walkthrough of the Super High Frequency (SHF) Repeater Network system operations and maintenance procedures.",
                fallback: "Your browser does not support HTML5 video playback. Please update your browser."
            },
            actions: {
                openPrimary: "Launch Primary System: {{title}}",
                openNewTab: "Launch Portal (New Tab)",
                viewDetails: "Operational Procedures & SLA Specs"
            },
            footer: {
                copyright: "© 2026 SHF Repeater Network Operations & Maintenance Center. All rights reserved.",
                architecture: "System Architecture: Modular Web Architecture (Dual-Stack)",
                versionLabel: "Version:"
            }
        }
    },
    th: {
        translation: {
            hero: {
                badge: "ศูนย์บัญชาการและเฝ้าระวังโทรมาตรโครงข่ายยุคใหม่",
                title: "ศูนย์ปฏิบัติการโครงข่ายทวนสัญญาณ USO",
                ctaPrimary: "สำรวจโมดูลปฏิบัติการทั้ง 8",
                ctaSecondary: "รับชมวิดีโอนำเสนอระบบ"
            },
            section: {
                title: "หมวดหมู่การปฏิบัติงานและบริการระบบ (การปฏิบัติการและบริการโครงข่าย)",
                help: "คลิกเลือกการ์ดเพื่อดูรายละเอียด หรือเข้าสู่ระบบบริการภายนอก",
                details: "รายละเอียดโมดูล"
            },
            modules: {
                m1: {
                    shortTitle: "1. Perform PM",
                    fullTitle: "1. ปฏิบัติการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
                    badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
                    description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
                    tooltip: "งานบำรุงรักษาเชิงป้องกัน (1. Perform PM)"
                },
                m2: {
                    shortTitle: "2. Handle CM",
                    fullTitle: "2. ปฏิบัติการแก้ไขเหตุขัดข้อง (Corrective Maintenance — CM)",
                    badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
                    description: "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมวิศวกรและช่างเทคนิคเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
                    tooltip: "งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา (2. Handle CM)"
                },
                m3: {
                    shortTitle: "3. Quarterly Visits",
                    fullTitle: "3. ดำเนินการตรวจเยี่ยมทุก 3 เดือน (Conduct Quarterly Visits)",
                    badge: "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
                    description: "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
                    tooltip: "การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน (3. Quarterly Visits)"
                },
                m4: {
                    shortTitle: "4. Process Claims",
                    fullTitle: "4. จัดการและยื่นเคลมอุปกรณ์ (Process Claims)",
                    badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
                    description: "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
                    tooltip: "การจัดการและยื่นเคลมอุปกรณ์/ประกัน (4. Process Claims)"
                },
                m5: {
                    shortTitle: "5. Monitor System",
                    fullTitle: "5. ตรวจสอบและเฝ้าระวังสถานะระบบ (Monitor System)",
                    badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
                    description: "แดชบอร์ดแสดงสถานะเวลาทำงานต่อเนื่อง (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือน",
                    tooltip: "การตรวจสอบและเฝ้าระวังสถานะระบบ (5. Monitor System)"
                },
                m6: {
                    shortTitle: "6. DOPA Tenure",
                    fullTitle: "6. ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง (Track DOPA Tenure)",
                    badge: "หมวดหมู่งาน: วาระคงเหลือ (DOPA)",
                    description: "ระบบติดตามวาระและภารกิจของเจ้าหน้าที่รัฐ กรมการปกครอง ประจำสถานีเครือข่าย USO รวม 181 สถานี",
                    tooltip: "ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง (6. DOPA Tenure)"
                },
                m7: {
                    shortTitle: "7. Manage Inventory",
                    fullTitle: "7. บริหารจัดการคลังสินค้าและสต็อกอะไหล่ (Manage Inventory)",
                    badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
                    description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงานบำรุงรักษาเชิงป้องกัน (PM) และงานแก้ไขเหตุขัดข้อง (CM)",
                    tooltip: "การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (7. Manage Inventory)"
                },
                m8: {
                    shortTitle: "8. Assets & Equipment",
                    fullTitle: "8. ติดตามและจัดการทะเบียนครุภัณฑ์ (Track Assets & Equipment)",
                    badge: "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
                    description: "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขประจำเครื่อง), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
                    tooltip: "การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (8. Assets & Equipment)"
                }
            },
            video: {
                sectionTitle: "วิดีโอนำเสนอการปฏิบัติการระบบ FORTH Master",
                badge: "การสาธิตระบบและสื่อนำเสนอ",
                title: "วิดีโอนำเสนอการปฏิบัติการระบบ FORTH Master",
                description: "ภาพรวมและขั้นตอนการปฏิบัติการโครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF) และกระบวนการบำรุงรักษา",
                fallback: "เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5 กรุณาอัปเดตเบราว์เซอร์"
            },
            actions: {
                openPrimary: "เปิดระบบหลัก: {{title}}",
                openNewTab: "เปิดพอร์ทัล (แท็บใหม่)",
                viewDetails: "รายละเอียดขั้นตอนและข้อกำหนด SLA"
            },
            footer: {
                copyright: "© 2026 ศูนย์ปฏิบัติการและบำรุงรักษาโครงข่าย SHF. สงวนลิขสิทธิ์ทั้งหมด.",
                architecture: "โครงสร้างระบบ: สถาปัตยกรรมเว็บแบบแยกส่วน (Dual-Stack)",
                versionLabel: "เวอร์ชัน:"
            }
        }
    }
};
/**
 * Module Keys Mapping
 */
const MODULE_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];
/**
 * Get stored language from LocalStorage safely (defaults to 'en' for 100% English UI)
 */
function getStoredLanguage() {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.getItem) {
            const stored = localStorage.getItem('shf_app_lang');
            if (stored === 'th' || stored === 'en') {
                return stored;
            }
        }
    }
    catch {
        // Ignore Storage access restrictions
    }
    return 'en';
}
/**
 * Persist language code in LocalStorage safely
 */
function setStoredLanguage(lng) {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.setItem) {
            localStorage.setItem('shf_app_lang', lng);
        }
    }
    catch {
        // Ignore Storage access restrictions
    }
}
/**
 * Initialize i18next engine with react-i18next
 */
function initI18nEngine() {
    const savedLang = getStoredLanguage();
    const i18n = typeof window !== 'undefined' ? window.i18next : undefined;
    const reactI18next = typeof window !== 'undefined' ? window.ReactI18next : undefined;
    if (i18n) {
        if (reactI18next && reactI18next.initReactI18next) {
            i18n.use(reactI18next.initReactI18next);
        }
        i18n.init({
            lng: savedLang,
            fallbackLng: 'en',
            debug: false,
            resources: I18N_RESOURCES,
            interpolation: {
                escapeValue: false
            }
        }, (err) => {
            if (err) {
                console.error('[i18n] Initialization error:', err);
                return;
            }
            console.log(`[i18n] Engine initialized successfully with language: ${savedLang}`);
            applyTranslations(savedLang);
        });
        // Listen for language changes
        i18n.on('languageChanged', (lng) => {
            const validLng = (lng === 'th' || lng === 'en') ? lng : 'en';
            setStoredLanguage(validLng);
            applyTranslations(validLng);
        });
    }
    else {
        console.warn('[i18n] i18next library not loaded, using fallback.');
        applyFallbackTranslations(savedLang);
    }
}
/**
 * Translate key with options
 */
function t(key, options = {}) {
    const i18n = typeof window !== 'undefined' ? window.i18next : undefined;
    if (i18n && typeof i18n.t === 'function') {
        return i18n.t(key, options);
    }
    // Fallback when i18next is not loaded
    const currentLang = getStoredLanguage();
    const bundle = I18N_RESOURCES[currentLang] ?? I18N_RESOURCES.en;
    const parts = key.split('.');
    let val = bundle.translation;
    for (const p of parts) {
        if (val && typeof val === 'object' && p in val) {
            val = val[p];
        }
        else {
            return key;
        }
    }
    if (typeof val === 'string') {
        let res = val;
        for (const [k, v] of Object.entries(options)) {
            res = res.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
        }
        return res;
    }
    return key;
}
/**
 * Switch system language
 */
function changeLanguage(lng) {
    const i18n = typeof window !== 'undefined' ? window.i18next : undefined;
    if (i18n && typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(lng);
    }
    else {
        setStoredLanguage(lng);
        applyFallbackTranslations(lng);
    }
}
/**
 * Apply translations to DOM elements and module dataset
 */
function applyTranslations(lng) {
    const currentLng = lng ?? getStoredLanguage();
    if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLng;
        // 1. Translate elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = t(key);
            }
        });
        // 2. Translate attributes with data-i18n-attr (e.g. "title:key,aria-label:key")
        const attrElements = document.querySelectorAll('[data-i18n-attr]');
        attrElements.forEach(el => {
            const spec = el.getAttribute('data-i18n-attr');
            if (spec) {
                spec.split(',').forEach(pair => {
                    const [attr, key] = pair.split(':');
                    if (attr && key) {
                        el.setAttribute(attr.trim(), t(key.trim()));
                    }
                });
            }
        });
        // 3. Update MENU_MODULES_DATA dynamically based on active language
        const menuData = typeof window !== 'undefined' ? window.MENU_MODULES_DATA : undefined;
        if (Array.isArray(menuData)) {
            menuData.forEach((item, index) => {
                const mKey = MODULE_KEYS[index];
                if (mKey) {
                    const mutableItem = item;
                    mutableItem.shortTitle = t(`modules.${mKey}.shortTitle`);
                    mutableItem.fullTitle = t(`modules.${mKey}.fullTitle`);
                    mutableItem.badge = t(`modules.${mKey}.badge`);
                    mutableItem.description = t(`modules.${mKey}.description`);
                }
            });
            // 4. Update the 8 card buttons in the grid
            const cardButtons = document.querySelectorAll('.card-btn');
            cardButtons.forEach((btn, index) => {
                const labelSpan = btn.querySelector('.card-label-text');
                const mKey = MODULE_KEYS[index];
                if (labelSpan && mKey) {
                    labelSpan.textContent = t(`modules.${mKey}.shortTitle`);
                }
                if (mKey) {
                    btn.title = t(`modules.${mKey}.tooltip`);
                }
            });
            // 5. Update active Content Panel
            const activeIdx = typeof window !== 'undefined' ? window.currentActiveIndex : undefined;
            const renderDetails = typeof window !== 'undefined' ? window.renderPanelDetails : undefined;
            if (typeof activeIdx === 'number' && typeof renderDetails === 'function') {
                const activeItem = menuData[activeIdx];
                if (activeItem) {
                    renderDetails(activeItem);
                }
            }
        }
    }
}
/**
 * Fallback translation handler
 */
function applyFallbackTranslations(lng) {
    applyTranslations(lng);
}
// Mount to global Window scope for Standalone Browser Environment
if (typeof window !== 'undefined') {
    const win = window;
    win.I18N_RESOURCES = I18N_RESOURCES;
    win.MODULE_KEYS = MODULE_KEYS;
    win.getStoredLanguage = getStoredLanguage;
    win.setStoredLanguage = setStoredLanguage;
    win.initI18nEngine = initI18nEngine;
    win.t = t;
    win.changeLanguage = changeLanguage;
    win.applyTranslations = applyTranslations;
    win.applyFallbackTranslations = applyFallbackTranslations;
}
// Attach initialization on script load in browser
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18nEngine);
    }
    else {
        initI18nEngine();
    }
}
// Export for Node.js / CommonJS verification environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        I18N_RESOURCES,
        MODULE_KEYS,
        initI18nEngine,
        t,
        changeLanguage,
        applyTranslations,
        getStoredLanguage,
        setStoredLanguage
    };
}
//# sourceMappingURL=i18n.js.map