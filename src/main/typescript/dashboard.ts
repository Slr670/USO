/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: src/main/typescript/dashboard.ts
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เวอร์ชัน: 2.6.4
 * ===================================================================
 */

/**
 * กำหนดเวอร์ชันหลักของระบบ (Authoritative Application Version)
 * สอดคล้องตามมาตรฐาน Semantic Versioning (SemVer)
 */
const APP_VERSION: string = '2.6.4';

/**
 * ดัชนีของเมนูที่กำลังเปิดใช้งานอยู่ในปัจจุบัน (0 ถึง 7)
 * ค่าเริ่มต้นคือ 0 (งานบำรุงรักษาเชิงป้องกัน - PM)
 */
let currentActiveIndex: number = 0;

/**
 * แสดงผลค่าเวอร์ชันระบบในทุกจุดที่มี ID หรือ Class เกี่ยวข้อง
 */
function renderVersionBadges(): void {
    if (typeof document === 'undefined') return;
    const versionElements = document.querySelectorAll<HTMLElement>('#app-version, .app-version-text');
    versionElements.forEach((el) => {
        // หากมี span ลูกภายใน (เช่นใน Header badge)
        const innerSpan = el.querySelector<HTMLSpanElement>('span:not(.version-indicator-dot)');
        if (innerSpan) {
            innerSpan.textContent = `v${APP_VERSION}`;
        } else {
            el.textContent = `v${APP_VERSION}`;
        }
    });
}

/**
 * ปรับปรุงคลาส `active` และ `aria-selected` ของปุ่มการ์ดทั้ง 8 ช่อง
 * @param activeIndex ลำดับของปุ่มที่ต้อง Active
 */
function updateCardStates(activeIndex: number): void {
    if (typeof document === 'undefined') return;
    const buttons = document.querySelectorAll<HTMLButtonElement>('.card-btn');
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
 * ทำการเปิด URL ในแท็บใหม่อย่างปลอดภัย
 * @param url ที่อยู่เว็บไซต์ปลายทาง
 */
function openExternalLink(url: string): void {
    try {
        if (typeof window === 'undefined') return;
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
 * แสดงผลข้อมูลของโมดูลที่เลือกลงใน Content Panel
 * รองรับทั้ง Inline SVG Rendering และ Font Awesome Fallback
 * @param item ข้อมูลของโมดูลที่เลือก
 */
function renderPanelDetails(item: OperationalModule): void {
    if (typeof document === 'undefined') return;

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

            const iconsObj = typeof window !== 'undefined' ? window.ICONS : undefined;
            const arrowIcon = (iconsObj && iconsObj.externalArrow)
                ? iconsObj.externalArrow
                : `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;

            const tFunc = typeof window !== 'undefined' ? window.t : undefined;
            const buttonText = (typeof tFunc === 'function')
                ? tFunc('actions.openPrimary', { title: item.shortTitle })
                : `เปิดระบบหลัก: ${item.shortTitle}`;

            redirectBtn.innerHTML = `
                ${arrowIcon}
                <span>${buttonText}</span>
            `;
            actionAreaEl.appendChild(redirectBtn);
        }
    }
}

/**
 * ฟังก์ชันเลือกหมวดหมู่งานและสลับการแสดงผล (Core Menu Selection Function)
 * @param index ลำดับของหมวดหมู่งาน (0 ถึง 7)
 * @param triggerRedirect สั่งให้เปิดแท็บใหม่หรือไม่ (ค่าเริ่มต้นคือ true เมื่อผู้ใช้คลิก)
 */
function selectMenu(index: number, triggerRedirect: boolean = true): void {
    const modulesData = typeof window !== 'undefined' ? window.MENU_MODULES_DATA : undefined;
    if (!modulesData) {
        console.error('[SHF Dashboard] Error: MENU_MODULES_DATA not loaded.');
        return;
    }

    const item = modulesData[index];
    if (!item) {
        console.warn(`[SHF Dashboard] Warning: No module data found for index: ${index}`);
        return;
    }

    currentActiveIndex = index;
    if (typeof window !== 'undefined') {
        window.currentActiveIndex = index;
    }

    // 1. ปรับปรุงสถานะภาพ Active บนปุ่มการ์ดทั้งหมด
    updateCardStates(index);

    // 2. อัปเดตข้อมูลรายละเอียดและไอคอนใน Content Panel
    renderPanelDetails(item);

    // 3. จัดการกรณีหมวดหมู่ที่เป็นลิงก์ภายนอก
    if (triggerRedirect && item.isExternal && item.externalUrl) {
        openExternalLink(item.externalUrl);
    }
}

/**
 * รองรับการควบคุมผ่าน Keyboard (Accessibility: A11y)
 * - กดลูกศรซ้าย/ขวา/ขึ้น/ลง เพื่อเลื่อนระหว่างการ์ด
 * - กด Enter หรือ Space เพื่อเลือกการ์ด
 */
function setupKeyboardNavigation(): void {
    if (typeof document === 'undefined') return;
    const buttons = document.querySelectorAll<HTMLButtonElement>('.card-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('keydown', (event: KeyboardEvent) => {
            let nextIndex: number | null = null;
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
                const nextBtn = buttons[nextIndex];
                if (nextBtn) {
                    nextBtn.focus();
                }
                selectMenu(nextIndex, true);
            }
        });
    });
}

/**
 * ฟังก์ชันหลักในการเริ่มต้นระบบแดชบอร์ด (Dashboard Initialization)
 * ทำหน้าที่:
 * 1. แสดงผลเลขเวอร์ชันระบบบน Header และ Footer
 * 2. ตั้งค่าการแสดงผลหมวดหมู่เริ่มต้น (Index 0: PM)
 * 3. ผูกระบบการควบคุมด้วยคีย์บอร์ด (Keyboard Accessibility)
 */
function initDashboard(): void {
    // 1. อัปเดตแสดงผลเวอร์ชันบน UI
    renderVersionBadges();

    // 2. แสดงผลหมวดหมู่เริ่มต้น (Initial Active Module)
    selectMenu(0, false);

    // 3. ผูก Event สำหรับการควบคุมผ่าน Keyboard
    setupKeyboardNavigation();

    console.log(`[SHF Dashboard] Initialized successfully with SVG icon system. Version: v${APP_VERSION}`);
}

// Mount to global Window scope for Standalone Browser Environment
if (typeof window !== 'undefined') {
    const win = window as unknown as Record<string, unknown>;
    win.APP_VERSION = APP_VERSION;
    win.currentActiveIndex = currentActiveIndex;
    win.initDashboard = initDashboard;
    win.renderVersionBadges = renderVersionBadges;
    win.selectMenu = selectMenu;
    win.updateCardStates = updateCardStates;
    win.renderPanelDetails = renderPanelDetails;
    win.openExternalLink = openExternalLink;
    win.setupKeyboardNavigation = setupKeyboardNavigation;
}

// Attach initialization on DOMContentLoaded in browser
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDashboard();
        });
    } else {
        initDashboard();
    }
}

// Export for Node.js / CommonJS verification environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_VERSION,
        currentActiveIndex,
        initDashboard,
        renderVersionBadges,
        selectMenu,
        updateCardStates,
        renderPanelDetails,
        openExternalLink,
        setupKeyboardNavigation
    };
}
