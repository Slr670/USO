/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/i18n.js
 * วัตถุประสงค์: ระบบจัดการภาษา (Translation Engine) โดยใช้ i18next + react-i18next
 *              รองรับการแปล UI เป็นภาษาไทย 100% (Default) และภาษาอังกฤษที่สละสลวย ถูกต้องตามหลักไวยากรณ์
 * เวอร์ชัน: 2.4.0
 * ===================================================================
 */

/**
 * พจนานุกรมคำแปลภาษาไทยและภาษาอังกฤษ (Translation Resources)
 * - 'th': ภาษาไทย 100% ครอบคลุม UI ทุกจุดตามข้อกำหนดของผู้ใช้
 * - 'en': ภาษาอังกฤษที่ผ่านการตรวจทานและแก้ไขคำศัพท์ วลี และไวยากรณ์ให้ถูกต้องและเป็นธรรมชาติ
 */
const I18N_RESOURCES = {
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
                    shortTitle: "1. บำรุงรักษาเชิงป้องกัน (PM)",
                    fullTitle: "1. ปฏิบัติการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
                    badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
                    description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
                    tooltip: "งานบำรุงรักษาเชิงป้องกัน (1. บำรุงรักษาเชิงป้องกัน PM)"
                },
                m2: {
                    shortTitle: "2. ซ่อมแซมแก้ไข (CM)",
                    fullTitle: "2. ปฏิบัติการแก้ไขเหตุขัดข้อง (Corrective Maintenance — CM)",
                    badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
                    description: "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมวิศวกรและช่างเทคนิคเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
                    tooltip: "งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา (2. แก้ไขเหตุขัดข้อง CM)"
                },
                m3: {
                    shortTitle: "3. ตรวจเยี่ยมทุก 3 เดือน",
                    fullTitle: "3. ดำเนินการตรวจเยี่ยมทุก 3 เดือน (Conduct Quarterly Visits)",
                    badge: "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
                    description: "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
                    tooltip: "การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน (3. ตรวจเยี่ยมทุก 3 เดือน)"
                },
                m4: {
                    shortTitle: "4. จัดการเคลมอุปกรณ์",
                    fullTitle: "4. จัดการและยื่นเคลมอุปกรณ์ (Process Claims)",
                    badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
                    description: "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
                    tooltip: "การจัดการและยื่นเคลมอุปกรณ์/ประกัน (4. จัดการเคลมอุปกรณ์)"
                },
                m5: {
                    shortTitle: "5. ตรวจสอบระบบ",
                    fullTitle: "5. ตรวจสอบและเฝ้าระวังสถานะระบบ (Monitor System)",
                    badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
                    description: "แดชบอร์ดแสดงสถานะเวลาทำงานต่อเนื่อง (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือน",
                    tooltip: "การตรวจสอบและเฝ้าระวังสถานะระบบ (5. ตรวจสอบระบบ)"
                },
                m6: {
                    shortTitle: "6. วาระเจ้าหน้าที่รัฐ",
                    fullTitle: "6. ติดตามและคำนวณวาระเจ้าหน้าที่รัฐ กรมการปกครอง (Track DOPA Tenure)",
                    badge: "หมวดหมู่งาน: วาระคงเหลือและเกษียณอายุราชการ (DOPA)",
                    description: "ติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง รวมถึงวันสิ้นสุดวาระและกรอบเวลาเกษียณอายุราชการ (ระบบติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง วันหมดวาระ 5 ปี และกรอบเวลาเกษียณอายุราชการ 181 สถานี USO)",
                    tooltip: "ติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง (6. วาระเจ้าหน้าที่รัฐ DOPA)"
                },
                m7: {
                    shortTitle: "7. จัดการคลังพัสดุ",
                    fullTitle: "7. บริหารจัดการคลังสินค้าและสต็อกอะไหล่ (Manage Inventory)",
                    badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
                    description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงานบำรุงรักษาเชิงป้องกัน (PM) และงานแก้ไขเหตุขัดข้อง (CM)",
                    tooltip: "การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (7. จัดการคลังพัสดุ)"
                },
                m8: {
                    shortTitle: "8. ครุภัณฑ์และอุปกรณ์",
                    fullTitle: "8. ติดตามและจัดการทะเบียนครุภัณฑ์ (Track Assets & Equipment)",
                    badge: "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
                    description: "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขประจำเครื่อง), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
                    tooltip: "การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (8. ครุภัณฑ์และอุปกรณ์)"
                }
            },
            calculator: {
                mainTitle: "เครื่องมือติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง",
                subTitle: "ระบบคำนวณวันหมดวาระการดำรงตำแหน่งและกรอบเวลาเกษียณอายุราชการ กรมการปกครอง",
                badgeDopa: "ระบบติดตาม 181 สถานี USO",
                box1Heading: "1. คำนวณวันหมดวาระการดำรงตำแหน่ง",
                startDateLabel: "วันที่เริ่มดำรงตำแหน่ง:",
                termDurationLabel: "ระยะเวลาของวาระ:",
                termOpt5: "5 ปี (วาระตามโครงการ 181 สถานี)",
                termOpt4: "4 ปี (วาระผู้บริหารท้องถิ่น)",
                termOpt3: "3 ปี",
                termOpt2: "2 ปี",
                termExpLabel: "วันครบกำหนดวาระ:",
                termStatusLabel: "สถานะวาระคงเหลือ:",
                termExpired: "สิ้นสุดวาระแล้ว",
                termRemaining: "คงเหลือ {{years}} ปี {{months}} เดือน {{days}} วัน",
                termProgressLabel: "ความคืบหน้าของวาระ:",
                box2Heading: "2. คำนวณกรอบเวลาเกษียณอายุราชการ",
                dobLabel: "วันเดือนปีเกิดของเจ้าหน้าที่:",
                retireHint: "* ระเบียบข้าราชการไทย: เกษียณ ณ สิ้นปีงบประมาณ (30 ก.ย.) ของปีที่อายุครบ 60 ปีบริบูรณ์",
                retireDateLabel: "วันเกษียณอายุราชการ:",
                retireTimeLabel: "ระยะเวลาก่อนเกษียณ:",
                retireExpired: "เกษียณอายุราชการแล้ว",
                retireRemaining: "อีก {{years}} ปี {{months}} เดือน {{days}} วัน",
                retireFiscalSub: "สิ้นปีงบประมาณ พ.ศ. {{year}} (นับถอยหลัง {{days}} วัน)",
                emptyDateHint: "กรุณาระบุวันที่เริ่มต้น",
                emptyDobHint: "กรุณาระบุวันเดือนปีเกิด"
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
                switchLangTitle: "สลับภาษา / Switch Language"
            }
        }
    },
    en: {
        translation: {
            header: {
                mainTitle: "High-Frequency Repeater Network Optimization Project (SHF)",
                subTitle: "Project Operations & Maintenance Operations Center (SHF Network Dashboard)",
                status: "System Operational (NMS Live)",
                logoTooltip: "SHF Repeater Network Dashboard",
                versionTooltip: "Authoritative System Version"
            },
            section: {
                title: "System Operations & Services Directory",
                help: "Select a card to view operational details or launch the external system"
            },
            modules: {
                m1: {
                    shortTitle: "1. Perform PM",
                    fullTitle: "1. Perform Preventive Maintenance (PM)",
                    badge: "Category: Preventive Maintenance",
                    description: "Log periodic inspection schedules and maintenance reports for SHF repeaters, measure RF signal strength levels, inspect feeder cables, antennas, and verify backup power systems across all base stations.",
                    tooltip: "Preventive Maintenance Operations (1. Perform PM)"
                },
                m2: {
                    shortTitle: "2. Handle CM",
                    fullTitle: "2. Handle Corrective Maintenance (CM)",
                    badge: "Category: Corrective Maintenance & Emergency Response",
                    description: "Open and track incident tickets for SHF equipment malfunctions or signal outages to dispatch technical engineering teams within strict SLA response windows.",
                    tooltip: "Corrective Maintenance & Troubleshooting (2. Handle CM)"
                },
                m3: {
                    shortTitle: "3. Quarterly Visits",
                    fullTitle: "3. Conduct Quarterly Inspection Visits",
                    badge: "Category: Quarterly Site Inspections",
                    description: "Schedule and manage quarterly on-site inspection visits, consolidate stakeholder feedback, resolve usability issues, and evaluate network user satisfaction across regional sites.",
                    tooltip: "Conduct Quarterly Inspection Visits (3. Quarterly Visits)"
                },
                m4: {
                    shortTitle: "4. Process Claims",
                    fullTitle: "4. Process Equipment & Warranty Claims",
                    badge: "Category: Warranty & Equipment RMA",
                    description: "Track Return Merchandise Authorization (RMA) claims for SHF modules, RF cables, and power supply units with equipment vendors, maintaining comprehensive replacement audit trails.",
                    tooltip: "Equipment & Warranty Claims Management (4. Process Claims)"
                },
                m5: {
                    shortTitle: "5. Monitor System",
                    fullTitle: "5. Monitor System & Signal Telemetry",
                    badge: "Category: Network Telemetry & Monitoring",
                    description: "Real-time monitoring dashboard displaying system uptime, SHF radio link degradation (Link Down events), received signal levels (RSL), and centralized alert event logs.",
                    tooltip: "System Monitoring & Signal Telemetry (5. Monitor System)"
                },
                m6: {
                    shortTitle: "6. DOPA Tenure",
                    fullTitle: "6. Track DOPA Officials' Tenure & Retirement",
                    badge: "Category: DOPA Tenure & Retirement Timeline",
                    description: "Track and calculate the remaining tenure of DOPA officials, including term expiration dates and civil service retirement timelines across 181 USO stations.",
                    tooltip: "Track DOPA Officials' Tenure & Retirement (6. DOPA Tenure)"
                },
                m7: {
                    shortTitle: "7. Manage Inventory",
                    fullTitle: "7. Manage Spare Parts & Inventory",
                    badge: "Category: Spare Parts & Inventory Management",
                    description: "Audit inventory levels for SHF repeater spare parts, parabolic antennas, power converters, and auxiliary components, tracking check-in/out logs for PM and CM workflows.",
                    tooltip: "Inventory & Spare Parts Management (7. Manage Inventory)"
                },
                m8: {
                    shortTitle: "8. Assets & Equipment",
                    fullTitle: "8. Track Assets & Equipment Registry",
                    badge: "Category: Asset & Equipment Registry",
                    description: "Maintain comprehensive asset registration records for SHF telecommunication equipment, tracking Asset IDs, serial numbers, operational readiness, handover documentation, and equipment relocation histories.",
                    tooltip: "Asset & Equipment Registry Management (8. Assets & Equipment)"
                }
            },
            calculator: {
                mainTitle: "DOPA Officials' Remaining Tenure & Retirement Calculator",
                subTitle: "Term Expiration & Civil Service Retirement Timelines for 181 USO Stations",
                badgeDopa: "181 USO Stations Tracking System",
                box1Heading: "1. Term Expiration Tracking",
                startDateLabel: "Tenure Start Date:",
                termDurationLabel: "Term Duration:",
                termOpt5: "5 Years (181 Stations Standard Term)",
                termOpt4: "4 Years (Local Administration Term)",
                termOpt3: "3 Years",
                termOpt2: "2 Years",
                termExpLabel: "Term Expiration Date:",
                termStatusLabel: "Remaining Tenure Status:",
                termExpired: "Term Expired",
                termRemaining: "{{years}} yrs {{months}} mos {{days}} days remaining",
                termProgressLabel: "Term Elapsed Progress:",
                box2Heading: "2. Civil Service Retirement Timeline",
                dobLabel: "Official's Date of Birth:",
                retireHint: "* Thai Civil Service Regulation: Retirement takes effect at the end of the fiscal year (September 30) in which the official reaches 60 years of age.",
                retireDateLabel: "Retirement Date:",
                retireTimeLabel: "Time Until Retirement:",
                retireExpired: "Already Retired",
                retireRemaining: "{{years}} yrs {{months}} mos {{days}} days remaining",
                retireFiscalSub: "End of Fiscal Year {{year}} (Countdown: {{days}} days)",
                emptyDateHint: "Please enter a valid start date",
                emptyDobHint: "Please enter a valid date of birth"
            },
            actions: {
                openPrimary: "Launch Primary System: {{title}} • 181 Stations Dashboard (New Tab)",
                openNewTab: "Open in new tab"
            },
            footer: {
                copyright: "© 2026 SHF Repeater Network Operations & Maintenance Center. All rights reserved.",
                architecture: "System Architecture: Modular Web Architecture",
                versionLabel: "Version:"
            },
            lang: {
                thLabel: "ไทย (TH)",
                enLabel: "English (EN)",
                switchLangTitle: "Switch Language / สลับภาษา"
            }
        }
    }
};

/**
 * ตัวช่วยอ้างอิง Translation Keys สำหรับ 8 โมดูล
 * @constant {Array<string>}
 */
const MODULE_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];

/**
 * ดึงภาษาที่บันทึกไว้ใน LocalStorage อย่างปลอดภัย
 * @returns {string} รหัสภาษา (ค่าเริ่มต้น: 'th')
 */
function getStoredLanguage() {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.getItem) {
            return localStorage.getItem('shf_app_lang') || 'th';
        }
    } catch (e) {}
    return 'th';
}

/**
 * บันทึกภาษาลงใน LocalStorage อย่างปลอดภัย
 * @param {string} lng รหัสภาษา
 */
function setStoredLanguage(lng) {
    try {
        if (typeof localStorage !== 'undefined' && localStorage.setItem) {
            localStorage.setItem('shf_app_lang', lng);
        }
    } catch (e) {}
}

/**
 * เริ่มต้นการทำงานของ i18next ร่วมกับ react-i18next
 */
function initI18nEngine() {
    const savedLang = getStoredLanguage();

    // ตรวจสอบความพร้อมของ i18next และ react-i18next
    if (typeof i18next !== 'undefined') {
        // หากมี react-i18next ให้ผูกเข้ากับ i18next ผ่าน initReactI18next
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

        // ดักจับเหตุการณ์เมื่อมีการสลับภาษา
        i18next.on('languageChanged', (lng) => {
            setStoredLanguage(lng);
            applyTranslations(lng);
        });
    } else {
        console.warn('[i18n] i18next library not loaded, using fallback.');
        applyFallbackTranslations(savedLang);
    }
}

/**
 * ดึงคำแปลตาม Key และ Parameter
 * @param {string} key คีย์คำแปล เช่น 'header.mainTitle'
 * @param {Object} [options={}] ออปชันเพิ่มเติม เช่น interpolation
 * @returns {string} คำแปล
 */
function t(key, options = {}) {
    if (typeof i18next !== 'undefined' && i18next.t) {
        return i18next.t(key, options);
    }
    // Fallback เมื่อ i18next ยังไม่พร้อม
    const currentLang = getStoredLanguage();
    const dict = I18N_RESOURCES[currentLang]?.translation || I18N_RESOURCES.th.translation;
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
 * สลับภาษาของระบบ (Language Switcher Controller)
 * @param {string} lng รหัสภาษา ('th' หรือ 'en')
 */
function changeLanguage(lng) {
    if (typeof i18next !== 'undefined' && i18next.changeLanguage) {
        i18next.changeLanguage(lng);
    } else {
        setStoredLanguage(lng);
        applyFallbackTranslations(lng);
    }
}

/**
 * นำคำแปลไปประยุกต์ใช้กับ DOM และชุดข้อมูลโมดูล
 * @param {string} lng รหัสภาษาปัจจุบัน
 */
function applyTranslations(lng) {
    document.documentElement.lang = lng;

    // 1. แปล DOM Elements ที่มี attribute data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = t(key);
        }
    });

    // 2. แปล HTML Attributes (เช่น title, aria-label)
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
        const spec = el.getAttribute('data-i18n-attr'); // รูปแบบ "title:key,aria-label:key"
        if (spec) {
            spec.split(',').forEach(pair => {
                const [attr, key] = pair.split(':');
                if (attr && key) {
                    el.setAttribute(attr.trim(), t(key.trim()));
                }
            });
        }
    });

    // 3. ปรับปรุงข้อมูลใน MENU_MODULES_DATA ให้แสดงผลตามภาษาที่เลือก
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

        // 4. อัปเดตการ์ดปุ่มทั้ง 8 ช่อง
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

        // 5. อัปเดต Content Panel ที่กำลังเปิดใช้งานอยู่
        if (typeof currentActiveIndex !== 'undefined' && typeof renderPanelDetails === 'function') {
            const activeItem = MENU_MODULES_DATA[currentActiveIndex];
            if (activeItem) {
                renderPanelDetails(activeItem);
            }
        }
    }

    // 6. อัปเดต Title และ Meta Description ของหน้า
    document.title = t('header.mainTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', t('header.subTitle'));
    }
}

/**
 * Fallback Translation เมื่อไม่มีไลบรารีภายนอก
 * @param {string} lng รหัสภาษา
 */
function applyFallbackTranslations(lng) {
    applyTranslations(lng);
}

/**
 * คอมโพเนนต์ React สลับภาษาโดยใช้ react-i18next (LanguageSwitcher React Component)
 * เรียกใช้ useTranslation hook ตามข้อกำหนดการผสานรวม
 */
function mountReactLanguageSwitcher() {
    const container = document.getElementById('react-lang-switcher');
    if (!container) return;

    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        renderVanillaLanguageSwitcher(container);
        return;
    }

    try {
        // คอมโพเนนต์ React ที่ใช้ react-i18next useTranslation Hook
        const LanguageSwitcherComponent = () => {
            let activeLang = 'th';
            let tFunc = (k) => k;
            let changeLangFunc = (l) => {};

            if (typeof ReactI18next !== 'undefined' && ReactI18next.useTranslation) {
                const { t: hookT, i18n: hookI18n } = ReactI18next.useTranslation();
                activeLang = hookI18n.language || 'th';
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
                    className: `lang-btn ${activeLang === 'th' ? 'active' : ''}`,
                    onClick: () => changeLangFunc('th'),
                    title: 'ภาษาไทย (TH) — แปลไทย 100%',
                    'aria-pressed': activeLang === 'th'
                }, 'TH'),
                React.createElement('span', { className: 'lang-divider' }, '|'),
                React.createElement('button', {
                    type: 'button',
                    className: `lang-btn ${activeLang === 'en' ? 'active' : ''}`,
                    onClick: () => changeLangFunc('en'),
                    title: 'English (EN) — Natural & Grammatically Correct',
                    'aria-pressed': activeLang === 'en'
                }, 'EN')
            );
        };

        if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(LanguageSwitcherComponent));
        } else if (ReactDOM.render) {
            ReactDOM.render(React.createElement(LanguageSwitcherComponent), container);
        }
    } catch (e) {
        console.warn('[i18n] Failed to render React component, fallback to vanilla:', e);
        renderVanillaLanguageSwitcher(container);
    }
}

/**
 * ฟังก์ชันสร้าง Vanilla Language Switcher สำรอง
 * @param {HTMLElement} container คอนเทนเนอร์
 */
function renderVanillaLanguageSwitcher(container) {
    const currentLang = getStoredLanguage();
    container.innerHTML = `
        <div class="lang-switcher-container" role="group" aria-label="${t('lang.switchLangTitle')}">
            <button type="button" class="lang-btn ${currentLang === 'th' ? 'active' : ''}" onclick="changeLanguage('th')" title="ภาษาไทย (TH)">TH</button>
            <span class="lang-divider">|</span>
            <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="changeLanguage('en')" title="English (EN)">EN</button>
        </div>
    `;
}

// ผูกการทำงานเมื่อโหลดสคริปต์
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18nEngine);
    } else {
        initI18nEngine();
    }
}

// สำหรับการทดสอบใน Node.js Environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        I18N_RESOURCES,
        MODULE_KEYS,
        initI18nEngine,
        t,
        changeLanguage,
        applyTranslations
    };
}
