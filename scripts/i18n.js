/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: scripts/i18n.js
 * Purpose: Translation Engine using i18next + react-i18next
 *          Supports 100% English UI (Default) with Thai localization option
 * Version: 2.4.4
 * ===================================================================
 */

/**
 * Dual-language Translation Resources (English Default / Thai Localization)
 */
const I18N_RESOURCES = {
    en: {
        translation: {
            header: {
                mainTitle: "Super High Frequency (SHF) Repeater Network Optimization Project",
                subTitle: "Project Operations & Maintenance Center (SHF Network Operations Dashboard)",
                status: "All Systems Operational (NMS Live)",
                logoTooltip: "SHF Repeater Network Operations Dashboard",
                versionTooltip: "Authoritative System Version"
            },
            section: {
                title: "Operational Categories & System Services",
                help: "Select a module card to view operational details or access external systems."
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
            actions: {
                openPrimary: "Launch Primary System: {{title}} • 181 Stations Dashboard (New Tab)",
                openNewTab: "Open in New Tab"
            },
            footer: {
                copyright: "© 2026 SHF Repeater Network Operations & Maintenance Center. All rights reserved.",
                architecture: "System Architecture: Modular Web Architecture",
                versionLabel: "Version:"
            },
            lang: {
                thLabel: "Thai (TH)",
                enLabel: "English (EN)",
                switchLangTitle: "Select Language / สลับภาษา"
            }
        }
    },
    th: {
        translation: {
            header: {
                mainTitle: "โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)",
                subTitle: "ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (แดชบอร์ดปฏิบัติการและบำรุงรักษาระบบ SHF)",
                status: "ระบบออนไลน์ปกติ (สถานะการเฝ้าระวังสด)",
                logoTooltip: "แดชบอร์ดโครงข่ายอุปกรณ์ทวนสัญญาณ SHF",
                versionTooltip: "เวอร์ชันระบบอย่างเป็นทางการ"
            },
            section: {
                title: "หมวดหมู่การปฏิบัติงานและบริการระบบ (การปฏิบัติการและบริการโครงข่าย)",
                help: "คลิกเลือกการ์ดเพื่อดูรายละเอียด หรือเข้าสู่ระบบบริการภายนอก"
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
            actions: {
                openPrimary: "เปิดระบบหลัก: {{title}} • แดชบอร์ด 181 สถานี (แท็บใหม่)",
                openNewTab: "เปิดในแท็บใหม่"
            },
            footer: {
                copyright: "© 2026 ศูนย์ปฏิบัติการและบำรุงรักษาโครงข่าย SHF. สงวนลิขสิทธิ์ทั้งหมด.",
                architecture: "โครงสร้างระบบ: สถาปัตยกรรมเว็บแบบแยกส่วน",
                versionLabel: "เวอร์ชัน:"
            },
            lang: {
                thLabel: "ไทย (TH)",
                enLabel: "English (EN)",
                switchLangTitle: "สลับภาษา / Select Language"
            }
        }
    }
};

/**
 * Module Keys Mapping
 * @constant {Array<string>}
 */
const MODULE_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];

/**
 * Get stored language from LocalStorage safely (defaults to 'en' for 100% English UI)
 * @returns {string} Language code ('en' or 'th')
 */
function getStoredLanguage() {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.getItem) {
            return localStorage.getItem('shf_app_lang') || 'en';
        }
    } catch (e) {}
    return 'en';
}

/**
 * Persist language code in LocalStorage safely
 * @param {string} lng Language code
 */
function setStoredLanguage(lng) {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.setItem) {
            localStorage.setItem('shf_app_lang', lng);
        }
    } catch (e) {}
}

/**
 * Initialize i18next engine with react-i18next
 */
function initI18nEngine() {
    const savedLang = getStoredLanguage();

    // Check availability of i18next
    if (typeof i18next !== 'undefined') {
        // Integrate react-i18next plugin if available
        if (typeof ReactI18next !== 'undefined' && ReactI18next.initReactI18next) {
            i18next.use(ReactI18next.initReactI18next);
        }

        i18next.init({
            lng: savedLang,
            fallbackLng: 'en',
            debug: false,
            resources: I18N_RESOURCES,
            interpolation: {
                escapeValue: false
            }
        }, (err, t) => {
            if (err) {
                console.error('[i18n] Initialization error:', err);
                return;
            }
            console.log(`[i18n] Engine initialized successfully with language: ${savedLang}`);
            applyTranslations(savedLang);
            mountReactLanguageSwitcher();
        });

        // Listen for language changes
        i18next.on('languageChanged', (lng) => {
            setStoredLanguage(lng);
            applyTranslations(lng);
            mountReactLanguageSwitcher();
        });
    } else {
        console.warn('[i18n] i18next library not loaded, using fallback.');
        applyFallbackTranslations(savedLang);
        mountReactLanguageSwitcher();
    }
}

/**
 * Translate key with options
 * @param {string} key Translation key (e.g., 'header.mainTitle')
 * @param {Object} [options={}] Interpolation options
 * @returns {string} Translated string
 */
function t(key, options = {}) {
    if (typeof i18next !== 'undefined' && i18next.t) {
        return i18next.t(key, options);
    }
    // Fallback when i18next is not ready
    const currentLang = getStoredLanguage();
    const dict = I18N_RESOURCES[currentLang]?.translation || I18N_RESOURCES.en.translation;
    const parts = key.split('.');
    let val = dict;
    for (const p of parts) {
        if (val && typeof val === 'object' && p in val) {
            val = val[p];
        } else {
            return key;
        }
    }
    if (typeof val === 'string') {
        let res = val;
        for (const [k, v] of Object.entries(options)) {
            res = res.replace(new RegExp(`{{${k}}}`, 'g'), v);
        }
        return res;
    }
    return key;
}

/**
 * Switch system language
 * @param {string} lng Language code ('en' or 'th')
 */
function changeLanguage(lng) {
    if (typeof i18next !== 'undefined' && i18next.changeLanguage) {
        i18next.changeLanguage(lng);
    } else {
        setStoredLanguage(lng);
        applyFallbackTranslations(lng);
        mountReactLanguageSwitcher();
    }
}

/**
 * Apply translations to DOM elements and module dataset
 * @param {string} lng Current language code
 */
function applyTranslations(lng) {
    document.documentElement.lang = lng;

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
    if (typeof MENU_MODULES_DATA !== 'undefined' && Array.isArray(MENU_MODULES_DATA)) {
        MENU_MODULES_DATA.forEach((item, index) => {
            const mKey = MODULE_KEYS[index];
            if (mKey) {
                item.shortTitle = t(`modules.${mKey}.shortTitle`);
                item.fullTitle = t(`modules.${mKey}.fullTitle`);
                item.badge = t(`modules.${mKey}.badge`);
                item.description = t(`modules.${mKey}.description`);
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
        if (typeof currentActiveIndex !== 'undefined' && typeof renderPanelDetails === 'function') {
            const activeItem = MENU_MODULES_DATA[currentActiveIndex];
            if (activeItem) {
                renderPanelDetails(activeItem);
            }
        }
    }

    // 6. Update document title and meta description
    document.title = t('header.mainTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', t('header.subTitle'));
    }
}

/**
 * Fallback translation handler
 * @param {string} lng Language code
 */
function applyFallbackTranslations(lng) {
    applyTranslations(lng);
}

/**
 * React Language Switcher Component powered by react-i18next (useTranslation hook)
 */
function mountReactLanguageSwitcher() {
    const container = document.getElementById('react-lang-switcher');
    if (!container) return;

    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        renderVanillaLanguageSwitcher(container);
        return;
    }

    try {
        // React component using react-i18next useTranslation hook
        const LanguageSwitcherComponent = () => {
            let activeLang = 'en';
            let tFunc = (k) => k;
            let changeLangFunc = (l) => {};

            if (typeof ReactI18next !== 'undefined' && ReactI18next.useTranslation) {
                const { t: hookT, i18n: hookI18n } = ReactI18next.useTranslation();
                activeLang = hookI18n.language || 'en';
                tFunc = hookT;
                changeLangFunc = (l) => hookI18n.changeLanguage(l);
            } else {
                activeLang = getStoredLanguage();
                changeLangFunc = changeLanguage;
            }

            return React.createElement('div', {
                className: 'lang-switcher-container',
                role: 'group',
                'aria-label': t('lang.switchLangTitle')
            },
                React.createElement('button', {
                    type: 'button',
                    className: `lang-btn ${activeLang === 'en' ? 'active' : ''}`,
                    onClick: () => changeLangFunc('en'),
                    title: 'English (EN) — 100% English UI',
                    'aria-pressed': activeLang === 'en'
                }, 'EN'),
                React.createElement('span', { className: 'lang-divider' }, '|'),
                React.createElement('button', {
                    type: 'button',
                    className: `lang-btn ${activeLang === 'th' ? 'active' : ''}`,
                    onClick: () => changeLangFunc('th'),
                    title: 'ภาษาไทย (TH) — สลับเป็นภาษาไทย',
                    'aria-pressed': activeLang === 'th'
                }, 'TH')
            );
        };

        if (ReactDOM.createRoot) {
            if (!container._reactRoot) {
                container._reactRoot = ReactDOM.createRoot(container);
            }
            container._reactRoot.render(React.createElement(LanguageSwitcherComponent));
        } else if (ReactDOM.render) {
            ReactDOM.render(React.createElement(LanguageSwitcherComponent), container);
        }
    } catch (e) {
        console.warn('[i18n] Failed to render React component, fallback to vanilla:', e);
        renderVanillaLanguageSwitcher(container);
    }
}

/**
 * Vanilla Language Switcher fallback
 * @param {HTMLElement} container Container element
 */
function renderVanillaLanguageSwitcher(container) {
    const currentLang = getStoredLanguage();
    container.innerHTML = `
        <div class="lang-switcher-container" role="group" aria-label="${t('lang.switchLangTitle')}">
            <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="changeLanguage('en')" title="English (EN)">EN</button>
            <span class="lang-divider">|</span>
            <button type="button" class="lang-btn ${currentLang === 'th' ? 'active' : ''}" onclick="changeLanguage('th')" title="ภาษาไทย (TH)">TH</button>
        </div>
    `;
}

// Attach initialization on script load
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18nEngine);
    } else {
        initI18nEngine();
    }
}

// Export for Node.js verification environment
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
