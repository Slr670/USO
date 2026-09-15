/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/dashboard.js
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เวอร์ชัน: 2.2.0
 * ===================================================================
 */

/**
 * กำหนดเวอร์ชันหลักของระบบ (Authoritative Application Version)
 * สอดคล้องตามมาตรฐาน Semantic Versioning (SemVer)
 * @constant {string}
 */
const APP_VERSION = '2.2.0';

/**
 * ดัชนีของเมนูที่กำลังเปิดใช้งานอยู่ในปัจจุบัน (0 ถึง 7)
 * ค่าเริ่มต้นคือ 0 (งานบำรุงรักษาเชิงป้องกัน - PM)
 * @type {number}
 */
let currentActiveIndex = 0;

/**
 * เริ่มต้นการทำงานของระบบเมื่อ DOM โครงสร้างหน้าเว็บโหลดเสร็จสมบูรณ์
 */
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

/**
 * ฟังก์ชันหลักในการเริ่มต้นระบบแดชบอร์ด (Dashboard Initialization)
 * ทำหน้าที่:
 * 1. แสดงผลเลขเวอร์ชันระบบบน Header และ Footer
 * 2. ตั้งค่าการแสดงผลหมวดหมู่เริ่มต้น (Index 0: PM)
 * 3. ผูกระบบการควบคุมด้วยคีย์บอร์ด (Keyboard Accessibility)
 */
function initDashboard() {
    // 1. อัปเดตแสดงผลเวอร์ชันบน UI
    renderVersionBadges();

    // 2. แสดงผลหมวดหมู่เริ่มต้น (Initial Active Module)
    selectMenu(0, false);

    // 3. ผูก Event สำหรับการควบคุมผ่าน Keyboard
    setupKeyboardNavigation();

    console.log(`[SHF Dashboard] Initialized successfully with SVG icon system. Version: v${APP_VERSION}`);
}

/**
 * แสดงผลค่าเวอร์ชันระบบในทุกจุดที่มี ID หรือ Class เกี่ยวข้อง
 */
function renderVersionBadges() {
    const versionElements = document.querySelectorAll('#app-version, .app-version-text');
    versionElements.forEach((el) => {
        el.textContent = `v${APP_VERSION}`;
    });
}

/**
 * ฟังก์ชันเลือกหมวดหมู่งานและสลับการแสดงผล (Core Menu Selection Function)
 * 
 * การทำงาน:
 * - อัปเดต CSS Class `active` ให้กับปุ่มการ์ดที่ถูกเลือก และปลดออกจากปุ่มอื่น
 * - อัปเดตเนื้อหาใน Content Panel ให้แสดงข้อมูลของหมวดหมู่นั้นๆ
 * - หากเป็นหมวดหมู่ที่ 6 (หรือมี isExternal = true) จะทำการ Redirect ไปยัง URL ในแท็บใหม่อัตโนมัติ
 *
 * @param {number} index ลำดับของหมวดหมู่งาน (0 ถึง 7)
 * @param {boolean} [triggerRedirect=true] สั่งให้เปิดแท็บใหม่หรือไม่ (ค่าเริ่มต้นคือ true เมื่อผู้ใช้คลิก)
 */
function selectMenu(index, triggerRedirect = true) {
    if (typeof MENU_MODULES_DATA === 'undefined') {
        console.error('[SHF Dashboard] Error: MENU_MODULES_DATA not loaded.');
        return;
    }

    const item = MENU_MODULES_DATA[index];
    if (!item) {
        console.warn(`[SHF Dashboard] Warning: No module data found for index: ${index}`);
        return;
    }

    currentActiveIndex = index;

    // 1. ปรับปรุงสถานะภาพ Active บนปุ่มการ์ดทั้งหมด
    updateCardStates(index);

    // 2. อัปเดตข้อมูลรายละเอียดและไอคอนใน Content Panel
    renderPanelDetails(item);

    // 3. จัดการกรณีหมวดหมู่ที่เป็นลิงก์ภายนอก (เช่น ช่องที่ 6: wara5year.vercel.app)
    if (triggerRedirect && item.isExternal && item.externalUrl) {
        openExternalLink(item.externalUrl);
    }
}

/**
 * ปรับปรุงคลาส `active` และ `aria-selected` ของปุ่มการ์ดทั้ง 8 ช่อง
 *
 * @param {number} activeIndex ลำดับของปุ่มที่ต้อง Active
 */
function updateCardStates(activeIndex) {
    const buttons = document.querySelectorAll('.card-btn');
    buttons.forEach((btn, idx) => {
        if (idx === activeIndex) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });
}

/**
 * แสดงผลข้อมูลของโมดูลที่เลือกลงใน Content Panel
 * รองรับทั้ง Inline SVG Rendering และ Font Awesome Fallback
 *
 * @param {Object} item ข้อมูลของโมดูลที่เลือก
 */
function renderPanelDetails(item) {
    const badgeEl = document.getElementById('section-badge');
    const iconEl = document.getElementById('display-icon');
    const titleEl = document.getElementById('display-title');
    const descEl = document.getElementById('display-desc');
    const actionAreaEl = document.getElementById('panel-action-container');

    if (badgeEl) badgeEl.textContent = item.badge;
    if (titleEl) titleEl.textContent = item.fullTitle;
    if (descEl) descEl.textContent = item.description;

    // อัปเดตไอคอนใน Content Panel: ใช้ SVG โดยตรงเพื่อความคมชัดและไม่พึ่งพา CDN ภายนอก
    if (iconEl) {
        if (item.svgIcon) {
            iconEl.innerHTML = item.svgIcon;
            iconEl.className = 'panel-icon-svg-wrap';
        } else {
            iconEl.className = item.icon;
        }
    }

    // แสดงปุ่ม Action เพิ่มเติมในกรณีเป็นลิงก์ระบบภายนอก
    if (actionAreaEl) {
        actionAreaEl.innerHTML = '';
        if (item.isExternal && item.externalUrl) {
            const redirectBtn = document.createElement('a');
            redirectBtn.href = item.externalUrl;
            redirectBtn.target = '_blank';
            redirectBtn.rel = 'noopener noreferrer';
            redirectBtn.className = 'btn-action-primary';
            const arrowIcon = (typeof ICONS !== 'undefined' && ICONS.externalArrow) 
                ? ICONS.externalArrow 
                : `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            redirectBtn.innerHTML = `
                ${arrowIcon}
                <span>เปิดระบบ: ${item.shortTitle} (แท็บใหม่)</span>
            `;
            actionAreaEl.appendChild(redirectBtn);
        }
    }
}

/**
 * ทำการเปิด URL ในแท็บใหม่อย่างปลอดภัย
 *
 * @param {string} url ที่อยู่เว็บไซต์ปลายทาง
 */
function openExternalLink(url) {
    try {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            // ป้องกัน Reverse Tabnabbing Security Vulnerability
            newTab.opener = null;
        }
    } catch (error) {
        console.error('[SHF Dashboard] Failed to open external URL:', error);
    }
}

/**
 * รองรับการควบคุมผ่าน Keyboard (Accessibility: A11y)
 * - กดลูกศรซ้าย/ขวา/ขึ้น/ลง เพื่อเลื่อนระหว่างการ์ด
 * - กด Enter หรือ Space เพื่อเลือกการ์ด
 */
function setupKeyboardNavigation() {
    const buttons = document.querySelectorAll('.card-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('keydown', (event) => {
            let nextIndex = null;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                nextIndex = (index + 1) % buttons.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                nextIndex = (index - 1 + buttons.length) % buttons.length;
            } else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectMenu(index, true);
                return;
            }

            if (nextIndex !== null) {
                event.preventDefault();
                buttons[nextIndex].focus();
                selectMenu(nextIndex, true);
            }
        });
    });
}
