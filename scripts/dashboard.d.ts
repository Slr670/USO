/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: src/main/typescript/dashboard.ts
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เวอร์ชัน: 2.6.3
 * ===================================================================
 */
/**
 * กำหนดเวอร์ชันหลักของระบบ (Authoritative Application Version)
 * สอดคล้องตามมาตรฐาน Semantic Versioning (SemVer)
 */
declare const APP_VERSION: string;
/**
 * ดัชนีของเมนูที่กำลังเปิดใช้งานอยู่ในปัจจุบัน (0 ถึง 7)
 * ค่าเริ่มต้นคือ 0 (งานบำรุงรักษาเชิงป้องกัน - PM)
 */
declare let currentActiveIndex: number;
/**
 * แสดงผลค่าเวอร์ชันระบบในทุกจุดที่มี ID หรือ Class เกี่ยวข้อง
 */
declare function renderVersionBadges(): void;
/**
 * ปรับปรุงคลาส `active` และ `aria-selected` ของปุ่มการ์ดทั้ง 8 ช่อง
 * @param activeIndex ลำดับของปุ่มที่ต้อง Active
 */
declare function updateCardStates(activeIndex: number): void;
/**
 * ทำการเปิด URL ในแท็บใหม่อย่างปลอดภัย
 * @param url ที่อยู่เว็บไซต์ปลายทาง
 */
declare function openExternalLink(url: string): void;
/**
 * แสดงผลข้อมูลของโมดูลที่เลือกลงใน Content Panel
 * รองรับทั้ง Inline SVG Rendering และ Font Awesome Fallback
 * @param item ข้อมูลของโมดูลที่เลือก
 */
declare function renderPanelDetails(item: OperationalModule): void;
/**
 * ฟังก์ชันเลือกหมวดหมู่งานและสลับการแสดงผล (Core Menu Selection Function)
 * @param index ลำดับของหมวดหมู่งาน (0 ถึง 7)
 * @param triggerRedirect สั่งให้เปิดแท็บใหม่หรือไม่ (ค่าเริ่มต้นคือ true เมื่อผู้ใช้คลิก)
 */
declare function selectMenu(index: number, triggerRedirect?: boolean): void;
/**
 * รองรับการควบคุมผ่าน Keyboard (Accessibility: A11y)
 * - กดลูกศรซ้าย/ขวา/ขึ้น/ลง เพื่อเลื่อนระหว่างการ์ด
 * - กด Enter หรือ Space เพื่อเลือกการ์ด
 */
declare function setupKeyboardNavigation(): void;
/**
 * ฟังก์ชันหลักในการเริ่มต้นระบบแดชบอร์ด (Dashboard Initialization)
 * ทำหน้าที่:
 * 1. แสดงผลเลขเวอร์ชันระบบบน Header และ Footer
 * 2. ตั้งค่าการแสดงผลหมวดหมู่เริ่มต้น (Index 0: PM)
 * 3. ผูกระบบการควบคุมด้วยคีย์บอร์ด (Keyboard Accessibility)
 */
declare function initDashboard(): void;
//# sourceMappingURL=dashboard.d.ts.map