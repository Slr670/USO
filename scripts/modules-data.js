/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/modules-data.js
 * วัตถุประสงค์: เก็บชุดข้อมูลคงที่ของทั้ง 7 หมวดหมู่งาน (Single Source of Truth for Modules Data)
 * เวอร์ชัน: 2.1.0
 * ===================================================================
 */

/**
 * ข้อมูลรายละเอียดของ 7 หมวดหมู่งานในศูนย์ปฏิบัติการและติดตามสถานะงานโครงการ SHF
 * @constant {Array<Object>}
 */
const MENU_MODULES_DATA = [
    {
        id: 1,
        orderIndex: 0,
        shortTitle: "1. PM",
        fullTitle: "1. งานบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)",
        badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
        icon: "fa-solid fa-screwdriver-wrench",
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
        description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงาน PM และ CM",
        externalUrl: null,
        isExternal: false
    }
];

// รองรับทั้ง ES Module (ถ้ามีการ import) และ Browser Global Scope
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENU_MODULES_DATA };
}
