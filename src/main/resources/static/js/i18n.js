/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: src/main/resources/static/js/i18n.js
 * วัตถุประสงค์: ระบบแปลภาษาหลัก (Translation Engine) โดยใช้ i18next + react-i18next
 * เวอร์ชัน: 2.4.0
 * ===================================================================
 */

/**
 * พจนานุกรมคำแปลภาษาไทย (Thai Translation Resource - 100% Thai Coverage)
 * แปลงข้อความ UI ภาษาอังกฤษทั้งหมดเป็นภาษาไทยที่ถูกต้อง ชัดเจน และสอดคล้องกับระเบียบราชการ
 */
const TRANSLATIONS_TH = {
    header: {
        logoTooltip: "ศูนย์แดชบอร์ดโครงข่ายอุปกรณ์ทวนสัญญาณ SHF",
        mainTitle: "โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)",
        subTitle: "ศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ (การดำเนินงานและบำรุงรักษาโครงข่าย)",
        versionTooltip: "เวอร์ชันระบบอ้างอิงหลัก",
        statusLive: "ระบบออนไลน์ปกติ (สถานะระบบสด)"
    },
    section: {
        operationsAndServices: "หมวดหมู่การปฏิบัติงานและบริการระบบ (การปฏิบัติการและบริการระบบ)",
        helpText: "คลิกเลือกการ์ดเพื่อดูรายละเอียด หรือเข้าสู่ระบบบริการภายนอก",
        ariaLabel: "หมวดหมู่งานโครงการ SHF"
    },
    modules: {
        pm: {
            shortTitle: "1. บำรุงรักษาเชิงป้องกัน (PM)",
            fullTitle: "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
            badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
            description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
            tooltip: "งานบำรุงรักษาเชิงป้องกัน (1. บำรุงรักษาเชิงป้องกัน - PM)"
        },
        cm: {
            shortTitle: "2. แก้ไขเหตุขัดข้อง (CM)",
            fullTitle: "2. งานแก้ไขเหตุขัดข้องฉุกเฉิน (Corrective Maintenance — CM)",
            badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
            description: "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้องหรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลาข้อตกลงระดับบริการ (SLA)",
            tooltip: "งานซ่อมแซมแก้ไขเมื่อเกิดเหตุขัดข้อง (2. แก้ไขเหตุขัดข้อง - CM)"
        },
        quarterly: {
            shortTitle: "3. ตรวจเช็กทุก 3 เดือน",
            fullTitle: "3. การเข้าตรวจเช็กและเยี่ยมเยือนทุก 3 เดือน (การตรวจติดตามรายไตรมาส)",
            badge: "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
            description: "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
            tooltip: "การเข้าตรวจเช็กและเยี่ยมเยือนทุก 3 เดือน (3. ตรวจเยี่ยมรายไตรมาส)"
        },
        claims: {
            shortTitle: "4. จัดการเคลมอุปกรณ์",
            fullTitle: "4. การจัดการและยื่นเคลมอุปกรณ์และประกัน (ส่งซ่อมและรับประกัน)",
            badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
            description: "ติดตามสถานะโมดูล SHF, สายเคเบิล หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
            tooltip: "การจัดการและยื่นเคลมอุปกรณ์และประกัน (4. ส่งซ่อมและเคลมอุปกรณ์)"
        },
        monitor: {
            shortTitle: "5. เฝ้าระวังสถานะระบบ",
            fullTitle: "5. การตรวจสอบและเฝ้าระวังสถานะระบบ (เฝ้าระวังโครงข่ายสด)",
            badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
            description: "แดชบอร์ดแสดงสถานะเวลาการทำงานของระบบ (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือนต่างๆ (Logs)",
            tooltip: "การตรวจสอบและเฝ้าระวังสถานะระบบ (5. เฝ้าระวังระบบโครงข่าย)"
        },
        dopa: {
            shortTitle: "6. วาระเจ้าหน้าที่ DOPA",
            fullTitle: "6. ระบบติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง (DOPA)",
            badge: "หมวดหมู่งาน: วาระคงเหลือและเกษียณอายุราชการ (DOPA)",
            description: "ติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง รวมถึงวันสิ้นสุดวาระและกรอบเวลาเกษียณอายุราชการ (ระบบติดตามวาระคงเหลือ 5 ปี และเกษียณอายุราชการ รวม 181 สถานี USO)",
            tooltip: "ติดตามและคำนวณวาระคงเหลือและเกษียณอายุราชการเจ้าหน้าที่รัฐ กรมการปกครอง"
        },
        inventory: {
            shortTitle: "7. จัดการคลังพัสดุ",
            fullTitle: "7. การบริหารจัดการคลังสินค้าและสต็อกอะไหล่ (คลังพัสดุและอุปกรณ์)",
            badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
            description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (ชิ้นส่วนอะไหล่), เสาอากาศ, ตัวแปลงไฟ และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
            tooltip: "การบริหารจัดการคลังสินค้าและสต็อกอะไหล่ (7. จัดการคลังพัสดุ)"
        },
        assets: {
            shortTitle: "8. ทรัพย์สินและครุภัณฑ์",
            fullTitle: "8. การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (ทะเบียนพัสดุอุปกรณ์)",
            badge: "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
            description: "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขทะเบียนครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขซีเรียล), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
            tooltip: "การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (8. ทะเบียนทรัพย์สินและครุภัณฑ์)"
        }
    },
    common: {
        openInNewTab: "เปิดในแท็บใหม่",
        authoritativeVersion: "เวอร์ชันระบบอ้างอิงหลัก"
    },
    actions: {
        openMainSystem: "เปิดระบบหลัก: {{title}} • แดชบอร์ด 181 สถานี (แท็บใหม่)"
    },
    calculator: {
        mainTitle: "เครื่องมือติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง",
        subTitle: "เครื่องมือคำนวณวันสิ้นสุดวาระและกำหนดการเกษียณอายุราชการ กรมการปกครอง (DOPA)",
        stationBadge: "ระบบติดตาม 181 สถานี USO",
        termSectionTitle: "1. คำนวณวันสิ้นสุดวาระการดำรงตำแหน่ง (สิ้นสุดวาระ)",
        startDateLabel: "วันที่เริ่มดำรงตำแหน่ง:",
        termDurationLabel: "ระยะเวลาของวาระ:",
        term5Years: "5 ปี (วาระตามโครงการ 181 สถานี)",
        term4Years: "4 ปี (วาระผู้บริหารท้องถิ่น)",
        term3Years: "3 ปี",
        term2Years: "2 ปี",
        emptyStartDate: "กรุณาระบุวันที่เริ่มต้น",
        termExpDateLabel: "วันครบกำหนดวาระ:",
        termStatusLabel: "สถานะวาระคงเหลือ:",
        termExpired: "สิ้นสุดวาระแล้ว",
        termRemaining: "คงเหลือ {{years}} ปี {{months}} เดือน {{days}} วัน",
        termProgressLabel: "ความคืบหน้าของวาระ:",
        retirementSectionTitle: "2. คำนวณกรอบเวลาเกษียณอายุราชการ (กำหนดการเกษียณ)",
        dobLabel: "วันเดือนปีเกิดของเจ้าหน้าที่:",
        retirementHint: "* ระเบียบข้าราชการไทย: เกษียณ ณ สิ้นปีงบประมาณ (30 ก.ย.) ของปีที่อายุครบ 60 ปีบริบูรณ์",
        emptyDob: "กรุณาระบุวันเดือนปีเกิด",
        retDateLabel: "วันเกษียณอายุราชการ:",
        retTimeRemainingLabel: "ระยะเวลาก่อนเกษียณ:",
        retExpired: "เกษียณอายุราชการแล้ว",
        retRemaining: "อีก {{years}} ปี {{months}} เดือน {{days}} วัน",
        retFiscalCountdown: "สิ้นปีงบประมาณ พ.ศ. {{year}} (นับถอยหลัง {{days}} วัน)"
    },
    footer: {
        copyright: "© 2026 ศูนย์ปฏิบัติการและบำรุงรักษาโครงข่าย SHF. สงวนลิขสิทธิ์ทั้งหมด.",
        architecture: "สถาปัตยกรรมระบบ: <strong>สถาปัตยกรรมเว็บแบบโมดูลาร์ (Modular Web Architecture)</strong> | เวอร์ชัน: <strong class=\"app-version-text\">v{{version}}</strong>"
    }
};

/**
 * พจนานุกรมคำแปลภาษาอังกฤษสำรอง (English Fallback / Reference)
 */
const TRANSLATIONS_EN = {
    header: {
        logoTooltip: "SHF Repeater Network Dashboard",
        mainTitle: "SHF Repeater Network Efficiency Improvement Project",
        subTitle: "Project Operation & Maintenance Dashboard",
        versionTooltip: "Authoritative System Version",
        statusLive: "System Online Normal (NMS Live)"
    },
    section: {
        operationsAndServices: "System Operations & Services",
        helpText: "Click a card to view details or navigate to external services",
        ariaLabel: "SHF Project Work Categories"
    },
    modules: {
        pm: {
            shortTitle: "1. Perform PM",
            fullTitle: "1. Perform PM (Preventive Maintenance)",
            badge: "Category: Preventive Maintenance",
            description: "Record periodic SHF repeater inspection plans, signal strength measurements, feeder line/antenna checks, and backup power systems.",
            tooltip: "Preventive Maintenance (1. Perform PM)"
        },
        cm: {
            shortTitle: "2. Handle CM",
            fullTitle: "2. Handle CM (Corrective Maintenance)",
            badge: "Category: Corrective Maintenance",
            description: "Open and monitor Incident Tickets for SHF equipment failures or link down incidents to dispatch technicians within SLA.",
            tooltip: "Corrective Maintenance (2. Handle CM)"
        },
        quarterly: {
            shortTitle: "3. Quarterly Visits",
            fullTitle: "3. Conduct Quarterly Visits",
            badge: "Category: Quarterly Site Visits",
            description: "Quarterly field visit schedules, user feedback collection, operational issues, and network satisfaction surveys.",
            tooltip: "Conduct Quarterly Visits"
        },
        claims: {
            shortTitle: "4. Process Claims",
            fullTitle: "4. Process Claims & Warranties",
            badge: "Category: Warranty & RMA Claims",
            description: "Track RMA status for SHF modules, cables, and power units sent for manufacturer warranty or repair.",
            tooltip: "Process Claims & Warranties"
        },
        monitor: {
            shortTitle: "5. Monitor System",
            fullTitle: "5. Monitor System (Real-time Telemetry)",
            badge: "Category: Network Monitoring",
            description: "Real-time dashboard displaying system uptime, SHF link down status, RF signal strength, and alert logs.",
            tooltip: "Monitor System"
        },
        dopa: {
            shortTitle: "6. DOPA Tenure",
            fullTitle: "6. Track DOPA Tenure & Retirement",
            badge: "Category: DOPA Tenure & Retirement",
            description: "Track and calculate the remaining tenure of DOPA officials, including term expiration dates and retirement timelines for 181 USO stations.",
            tooltip: "Track DOPA Tenure & Retirement"
        },
        inventory: {
            shortTitle: "7. Manage Inventory",
            fullTitle: "7. Manage Inventory & Spare Parts",
            badge: "Category: Inventory & Spare Parts",
            description: "Inventory tracking for SHF spare repeaters, antennas, power converters, and accessories for PM and CM tasks.",
            tooltip: "Manage Inventory"
        },
        assets: {
            shortTitle: "8. Assets & Equipment",
            fullTitle: "8. Track Assets & Equipment",
            badge: "Category: Assets & Equipment Registry",
            description: "Asset management system for SHF communication equipment, Asset IDs/Serial Numbers, operational status, and transfer records.",
            tooltip: "Track Assets & Equipment"
        }
    },
    common: {
        openInNewTab: "Open in new tab",
        authoritativeVersion: "Authoritative System Version"
    },
    actions: {
        openMainSystem: "Open Main System: {{title}} • 181 Stations Dashboard (New Tab)"
    },
    calculator: {
        mainTitle: "DOPA Officials Tenure & Retirement Tracking Tool",
        subTitle: "DOPA Tenure Expiration & Civil Service Retirement Timelines Calculator",
        stationBadge: "USO 181 Stations Tracking System",
        termSectionTitle: "1. Term Expiration Tracking",
        startDateLabel: "Term Start Date:",
        termDurationLabel: "Term Duration:",
        term5Years: "5 Years (181 Stations Project Term)",
        term4Years: "4 Years (Local Administration)",
        term3Years: "3 Years",
        term2Years: "2 Years",
        emptyStartDate: "Please specify start date",
        termExpDateLabel: "Term Expiration Date:",
        termStatusLabel: "Remaining Tenure Status:",
        termExpired: "Term Expired",
        termRemaining: "Remaining {{years}} years {{months}} months {{days}} days",
        termProgressLabel: "Term Elapsed Progress:",
        retirementSectionTitle: "2. Civil Service Retirement Timeline Tracking",
        dobLabel: "Official's Date of Birth:",
        retirementHint: "* Thai Civil Service Regulation: Retirement at the end of fiscal year (Sept 30) upon reaching 60 years of age.",
        emptyDob: "Please specify date of birth",
        retDateLabel: "Official Retirement Date:",
        retTimeRemainingLabel: "Time Until Retirement:",
        retExpired: "Retired",
        retRemaining: "{{years}} years {{months}} months {{days}} days remaining",
        retFiscalCountdown: "Fiscal Year B.E. {{year}} ({{days}} days countdown)"
    },
    footer: {
        copyright: "© 2026 SHF Network Operations & Maintenance Center. All Rights Reserved.",
        architecture: "System Architecture: <strong>Modular Web Architecture</strong> | Version: <strong class=\"app-version-text\">v{{version}}</strong>"
    }
};

/**
 * ฟังก์ชันค้นหาค่าคำแปลแบบ Nested Key จาก Dictionary พร้อมแทรกตัวแปร
 *
 * @param {Object} dictionary วัตถุข้อมูลคำแปล
 * @param {string} keyPath คีย์แบบ dot notation (เช่น 'header.mainTitle')
 * @param {Object} [options={}] ตัวแปรสำหรับการแทนที่ (Interpolation)
 * @returns {string|null} ข้อความคำแปลที่แทนที่ตัวแปรแล้ว
 */
function resolveTranslation(dictionary, keyPath, options = {}) {
    if (!dictionary || !keyPath) return null;
    const parts = keyPath.split('.');
    let current = dictionary;
    for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
            current = current[part];
        } else {
            return null;
        }
    }
    if (typeof current !== 'string') return null;

    // แทนที่ตัวแปร Interpolation: {{varName}}
    let result = current;
    for (const [varName, varVal] of Object.entries(options)) {
        const regex = new RegExp(`{{\\s*${varName}\\s*}}`, 'g');
        result = result.replace(regex, String(varVal));
    }
    return result;
}

/**
 * ฟังก์ชันหลักในการแปลภาษา (Translation Helper)
 * ดึงคำแปลจาก i18next หากเริ่มต้นแล้ว หรือใช้ Local Dictionary เป็น Fallback
 *
 * @param {string} key คีย์คำแปล (เช่น 'header.mainTitle')
 * @param {Object} [options={}] ตัวแปรเสริมสำหรับการแทนที่
 * @returns {string} ข้อความที่แปลแล้ว
 */
function t(key, options = {}) {
    // 1. ตรวจสอบว่า i18next โหลดและเริ่มต้นแล้วหรือไม่
    if (typeof i18next !== 'undefined' && typeof i18next.t === 'function' && i18next.isInitialized) {
        return i18next.t(key, options);
    }
    // 2. Fallback ภาษาไทย
    const translated = resolveTranslation(TRANSLATIONS_TH, key, options);
    if (translated !== null) {
        return translated;
    }
    // 3. Fallback ภาษาอังกฤษ
    const enFallback = resolveTranslation(TRANSLATIONS_EN, key, options);
    if (enFallback !== null) {
        return enFallback;
    }
    // 4. หากไม่พบคีย์ คืนค่า key เดิม
    return key;
}

/**
 * กำหนดค่าและเริ่มต้นการทำงานของ i18next ร่วมกับ react-i18next
 */
function initI18nEngine() {
    if (typeof i18next === 'undefined') {
        console.warn('[i18n] i18next library not detected via CDN. Running in built-in fallback mode.');
        return;
    }

    // เชื่อมต่อ react-i18next หากมีอยู่ใน Global Scope
    if (typeof ReactI18next !== 'undefined' && typeof i18next.use === 'function') {
        try {
            i18next.use(ReactI18next.initReactI18next);
            console.log('[i18n] react-i18next integration enabled successfully.');
        } catch (err) {
            console.warn('[i18n] Could not bind react-i18next:', err);
        }
    }

    i18next.init({
        lng: 'th',
        fallbackLng: 'th',
        debug: false,
        resources: {
            th: {
                translation: TRANSLATIONS_TH
            },
            en: {
                translation: TRANSLATIONS_EN
            }
        },
        interpolation: {
            escapeValue: false
        }
    }, (err) => {
        if (err) {
            console.error('[i18n] Error initializing i18next:', err);
        } else {
            console.log('[i18n] i18next translation engine initialized with 100% Thai UI coverage.');
        }
    });
}

// เริ่มต้น i18n อัตโนมัติเมื่อโหลดสคริปต์
if (typeof window !== 'undefined') {
    window.TRANSLATIONS_TH = TRANSLATIONS_TH;
    window.TRANSLATIONS_EN = TRANSLATIONS_EN;
    window.t = t;
    window.initI18nEngine = initI18nEngine;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18nEngine);
    } else {
        initI18nEngine();
    }
}

// รองรับการทำงานใน Node.js สภาพแวดล้อมทดสอบ (Unit Tests / Verification)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TRANSLATIONS_TH,
        TRANSLATIONS_EN,
        resolveTranslation,
        t,
        initI18nEngine
    };
}
