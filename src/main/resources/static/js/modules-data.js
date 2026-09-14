/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: src/main/resources/static/js/modules-data.js
 * วัตถุประสงค์: ชุดข้อมูลคงที่และไอคอน SVG ประจำแต่ละหมวดหมู่งาน (Inline SVG Icons System)
 * เวอร์ชัน: 2.1.1
 * ===================================================================
 */

const ICONS = {
    pm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>`,
    cm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,
    calendar: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
    </svg>`,
    claim: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
    </svg>`,
    monitor: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`,
    government: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="2" y1="22" x2="22" y2="22"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
        <path d="M6 18V9"/>
        <path d="M10 18V9"/>
        <path d="M14 18V9"/>
        <path d="M18 18V9"/>
        <polygon points="12 2 2 7 22 7 12 2"/>
    </svg>`,
    inventory: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
    </svg>`,
    externalArrow: `<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>`,
    broadcastTower: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.93 4.93a10 10 0 0 1 14.14 0"/>
        <path d="M7.76 7.76a6 6 0 0 1 8.48 0"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="m16.24 16.24-2.83 2.83a2 2 0 0 1-2.82 0l-2.83-2.83"/>
        <line x1="12" y1="12" x2="12" y2="22"/>
    </svg>`
};

const MENU_MODULES_DATA = [
    {
        id: 1,
        orderIndex: 0,
        shortTitle: "1. PM",
        fullTitle: "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)",
        badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
        icon: "fa-solid fa-screwdriver-wrench",
        svgIcon: ICONS.pm,
        description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 2,
        orderIndex: 1,
        shortTitle: "2. CM",
        fullTitle: "2. งานแก้ไขเหตุขัดข้อง (Corrective Maintenance - CM)",
        badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
        icon: "fa-solid fa-triangle-exclamation",
        svgIcon: ICONS.cm,
        description: "การเปิดและติดตาม Incident Ticket เมื่ออุปกรณ์ SHF เกิดขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมช่างเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 3,
        orderIndex: 2,
        shortTitle: "3. เยี่ยมเยือนทุก 3 เดือน",
        fullTitle: "3. แผนเข้าพบและเยี่ยมเยือนทุก 3 เดือน",
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
        shortTitle: "4. เคลม",
        fullTitle: "4. ระบบส่งซ่อมและเคลมอุปกรณ์ (RMA / Warranty Claim)",
        badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
        icon: "fa-solid fa-arrows-rotate",
        svgIcon: ICONS.claim,
        description: "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรืออุปกรณ์ Power Unit ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 5,
        orderIndex: 4,
        shortTitle: "5. Monitor",
        fullTitle: "5. ระบบตรวจสอบสถานะสัญญาณและโครงข่าย (Monitor / NMS)",
        badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
        icon: "fa-solid fa-chart-line",
        svgIcon: ICONS.monitor,
        description: "แดชบอร์ดแสดงสถานะ Uptime, ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบ Real-time หรือ Log การแจ้งเตือนต่างๆ",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 6,
        orderIndex: 5,
        shortTitle: "6. วาระเจ้าหน้าที่รัฐ กรมการปกครอง",
        fullTitle: "6. วาระประสานงานเจ้าหน้าที่รัฐ กรมการปกครอง",
        badge: "หมวดหมู่งาน: ประสานงานราชการ",
        icon: "fa-solid fa-building-columns",
        svgIcon: ICONS.government,
        description: "รวบรวมวาระการประชุม บันทึกข้อตกลง (MOU), เอกสารขออนุญาตเข้าพื้นที่ว่าการอำเภอ/ท้องถิ่น และรายงานผลการดำเนินงานเสนอผู้บริหารกรมการปกครอง",
        externalUrl: "https://wara5year.vercel.app/",
        isExternal: true
    },
    {
        id: 7,
        orderIndex: 6,
        shortTitle: "7. คลัง",
        fullTitle: "7. ระบบคลังอะไหล่และอุปกรณ์คงคลัง (Inventory)",
        badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
        icon: "fa-solid fa-boxes-stacked",
        svgIcon: ICONS.inventory,
        description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
        externalUrl: null,
        isExternal: false
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ICONS, MENU_MODULES_DATA };
}
