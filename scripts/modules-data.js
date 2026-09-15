/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/modules-data.js
 * วัตถุประสงค์: ชุดข้อมูลคงที่และไอคอน SVG ประจำทั้ง 8 หมวดหมู่งาน (Inline SVG Icons System)
 * เชื่อมโยงระบบแปลภาษา: i18next + react-i18next (Translation Keys Integration)
 * เวอร์ชัน: 2.4.0
 * ===================================================================
 */

/**
 * รวมชุดไอคอน SVG คุณภาพสูงแบบ Inline เพื่อแก้ปัญหาไอคอนไม่แสดงผลจากภายนอก
 * และสอดคล้องตามกฎ UI Icon Policy (Scalable Vector SVG, No Unicode Emoji)
 */
const ICONS = {
    // 1. PM: เครื่องมือช่างและการบำรุงรักษาเชิงป้องกัน (Wrench & Screwdriver)
    pm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>`,

    // 2. CM: งานแก้ไขเหตุขัดข้องฉุกเฉินและการแจ้งเตือน (Alert Triangle with Exclamation)
    cm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,

    // 3. แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน (Calendar Schedule with Checkmark)
    calendar: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
    </svg>`,

    // 4. ระบบส่งซ่อมและเคลมอุปกรณ์ (RMA / Return Merchandise & Exchange Cycle)
    claim: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
    </svg>`,

    // 5. ระบบตรวจสอบสถานะสัญญาณและโครงข่าย (Network Monitoring & Signal Telemetry)
    monitor: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`,

    // 6. วาระประสานงานเจ้าหน้าที่รัฐ กรมการปกครอง (Government Landmark Columns)
    government: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="2" y1="22" x2="22" y2="22"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
        <path d="M6 18V9"/>
        <path d="M10 18V9"/>
        <path d="M14 18V9"/>
        <path d="M18 18V9"/>
        <polygon points="12 2 2 7 22 7 12 2"/>
    </svg>`,

    // 7. ระบบคลังอะไหล่และอุปกรณ์คงคลัง (Warehouse & Inventory Boxes)
    inventory: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
    </svg>`,

    // 8. การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (Assets & Equipment Registration Clipboard)
    assetEquipment: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <path d="m9 14 2 2 4-4"/>
    </svg>`,

    // ไอคอนลูกศรเปิดลิงก์แท็บใหม่ (External Arrow Up Right)
    externalArrow: `<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>`,

    // ไอคอนหัวเรื่อง: เสาสัญญาณทวนความถี่สูง SHF (Repeater Broadcast Tower)
    broadcastTower: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.93 4.93a10 10 0 0 1 14.14 0"/>
        <path d="M7.76 7.76a6 6 0 0 1 8.48 0"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="m16.24 16.24-2.83 2.83a2 2 0 0 1-2.82 0l-2.83-2.83"/>
        <line x1="12" y1="12" x2="12" y2="22"/>
    </svg>`
};

/**
 * ข้อมูลรายละเอียดของ 8 หมวดหมู่งาน แปลงเป็นภาษาไทย 100% พร้อม Translation Keys
 * @constant {Array<Object>}
 */
const MENU_MODULES_DATA = [
    {
        id: 1,
        orderIndex: 0,
        translationKey: "modules.pm",
        shortTitle: "1. บำรุงรักษาเชิงป้องกัน (PM)",
        fullTitle: "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
        badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
        icon: "fa-solid fa-screwdriver-wrench",
        svgIcon: ICONS.pm,
        description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
        externalUrl: "https://pm-5year.vercel.app/",
        isExternal: true
    },
    {
        id: 2,
        orderIndex: 1,
        translationKey: "modules.cm",
        shortTitle: "2. แก้ไขเหตุขัดข้อง (CM)",
        fullTitle: "2. งานแก้ไขเหตุขัดข้องฉุกเฉิน (Corrective Maintenance — CM)",
        badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
        icon: "fa-solid fa-triangle-exclamation",
        svgIcon: ICONS.cm,
        description: "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้องหรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลาข้อตกลงระดับบริการ (SLA)",
        externalUrl: "https://dtrs-app-uat.forth.co.th/",
        isExternal: true
    },
    {
        id: 3,
        orderIndex: 2,
        translationKey: "modules.quarterly",
        shortTitle: "3. ตรวจเช็กทุก 3 เดือน",
        fullTitle: "3. การเข้าตรวจเช็กและเยี่ยมเยือนทุก 3 เดือน (การตรวจติดตามรายไตรมาส)",
        badge: "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
        icon: "fa-solid fa-calendar-check",
        svgIcon: ICONS.calendar,
        description: "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 4,
        orderIndex: 3,
        translationKey: "modules.claims",
        shortTitle: "4. จัดการเคลมอุปกรณ์",
        fullTitle: "4. การจัดการและยื่นเคลมอุปกรณ์และประกัน (ส่งซ่อมและรับประกัน)",
        badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
        icon: "fa-solid fa-arrows-rotate",
        svgIcon: ICONS.claim,
        description: "ติดตามสถานะโมดูล SHF, สายเคเบิล หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
        externalUrl: "https://equipment-claims.vercel.app/",
        isExternal: true
    },
    {
        id: 5,
        orderIndex: 4,
        translationKey: "modules.monitor",
        shortTitle: "5. เฝ้าระวังสถานะระบบ",
        fullTitle: "5. การตรวจสอบและเฝ้าระวังสถานะระบบ (เฝ้าระวังโครงข่ายสด)",
        badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
        icon: "fa-solid fa-chart-line",
        svgIcon: ICONS.monitor,
        description: "แดชบอร์ดแสดงสถานะเวลาการทำงานของระบบ (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือนต่างๆ (Logs)",
        externalUrl: "https://bssc-nine.vercel.app/",
        isExternal: true
    },
    {
        id: 6,
        orderIndex: 5,
        translationKey: "modules.dopa",
        shortTitle: "6. วาระเจ้าหน้าที่ DOPA",
        fullTitle: "6. ระบบติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง (DOPA)",
        badge: "หมวดหมู่งาน: วาระคงเหลือและเกษียณอายุราชการ (DOPA)",
        icon: "fa-solid fa-building-columns",
        svgIcon: ICONS.government,
        description: "ติดตามและคำนวณวาระการดำรงตำแหน่งคงเหลือของเจ้าหน้าที่รัฐ กรมการปกครอง รวมถึงวันสิ้นสุดวาระและกรอบเวลาเกษียณอายุราชการ (ระบบติดตามวาระคงเหลือ 5 ปี และเกษียณอายุราชการ รวม 181 สถานี USO)",
        externalUrl: "https://wara5year.vercel.app/",
        isExternal: true,
        hasTenureCalculator: true
    },
    {
        id: 7,
        orderIndex: 6,
        translationKey: "modules.inventory",
        shortTitle: "7. จัดการคลังพัสดุ",
        fullTitle: "7. การบริหารจัดการคลังสินค้าและสต็อกอะไหล่ (คลังพัสดุและอุปกรณ์)",
        badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
        icon: "fa-solid fa-boxes-stacked",
        svgIcon: ICONS.inventory,
        description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (ชิ้นส่วนอะไหล่), เสาอากาศ, ตัวแปลงไฟ และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
        externalUrl: "https://www.stockflowth.online/dashboard",
        isExternal: true
    },
    {
        id: 8,
        orderIndex: 7,
        translationKey: "modules.assets",
        shortTitle: "8. ทรัพย์สินและครุภัณฑ์",
        fullTitle: "8. การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (ทะเบียนพัสดุอุปกรณ์)",
        badge: "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
        icon: "fa-solid fa-clipboard-check",
        svgIcon: ICONS.assetEquipment,
        description: "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขทะเบียนครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขซีเรียล), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
        externalUrl: null,
        isExternal: false
    }
];

/**
 * ดึงข้อมูลโมดูลที่แปลงตามภาษาปัจจุบันผ่าน translation helper `t()`
 *
 * @param {number} index ดัชนีโมดูล (0 ถึง 7)
 * @returns {Object|null} ข้อมูลโมดูลพร้อมข้อความภาษาไทย 100%
 */
function getLocalizedModule(index) {
    const item = MENU_MODULES_DATA[index];
    if (!item) return null;
    if (typeof t === 'function' && item.translationKey) {
        return {
            ...item,
            shortTitle: t(`${item.translationKey}.shortTitle`),
            fullTitle: t(`${item.translationKey}.fullTitle`),
            badge: t(`${item.translationKey}.badge`),
            description: t(`${item.translationKey}.description`)
        };
    }
    return item;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ICONS, MENU_MODULES_DATA, getLocalizedModule };
}
