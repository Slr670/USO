/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/dashboard.js
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เวอร์ชัน: 2.3.0
 * ===================================================================
 */

/**
 * กำหนดเวอร์ชันหลักของระบบ (Authoritative Application Version)
 * สอดคล้องตามมาตรฐาน Semantic Versioning (SemVer)
 * @constant {string}
 */
const APP_VERSION = '2.3.0';

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

    // แสดงปุ่ม Action เพิ่มเติมในกรณีเป็นลิงก์ระบบภายนอก หรือเครื่องมือคำนวณวาระคงเหลือ
    if (actionAreaEl) {
        actionAreaEl.innerHTML = '';

        // กรณีหมวดหมู่ที่ 6 (DOPA): แสดงเครื่องมือติดตามและคำนวณวาระคงเหลือและเกษียณอายุราชการ
        if (item.hasTenureCalculator || item.id === 6) {
            renderTenureCalculator(actionAreaEl);
        }

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
                <span>เปิดระบบหลัก: ${item.shortTitle} • Dashboard 181 สถานี (แท็บใหม่)</span>
            `;
            actionAreaEl.appendChild(redirectBtn);
        }
    }
}

/**
 * แสดงผลและควบคุมเครื่องมือคำนวณวาระคงเหลือและวันเกษียณอายุราชการ (DOPA Calculator)
 * 
 * @param {HTMLElement} container ตำแหน่ง Container ในการแทรกการ์ด
 */
function renderTenureCalculator(container) {
    const card = document.createElement('div');
    card.className = 'tenure-calculator-card';
    card.innerHTML = `
        <div class="calc-card-header">
            <div class="calc-card-title-group">
                <div class="calc-title-icon">
                    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                        <path d="M12 14v4"/>
                        <path d="M10 16h4"/>
                    </svg>
                </div>
                <div>
                    <h3 class="calc-main-title">เครื่องมือติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง</h3>
                    <p class="calc-sub-title">DOPA Tenure Expiration &amp; Civil Service Retirement Timelines Calculator</p>
                </div>
            </div>
            <span class="calc-badge-dopa">ระบบติดตาม 181 สถานี USO</span>
        </div>

        <div class="calc-grid-layout">
            <!-- ส่วนที่ 1: คำนวณวันหมดวาระการดำรงตำแหน่ง (Term Expiration Tracking) -->
            <div class="calc-column-box">
                <div class="calc-box-heading">
                    <svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>1. คำนวณวันหมดวาระการดำรงตำแหน่ง (Term Expiration)</span>
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-start-date">วันที่เริ่มดำรงตำแหน่ง:</label>
                    <input type="date" id="calc-start-date" class="calc-date-input" value="2023-10-01">
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-term-years">ระยะเวลาของวาระ:</label>
                    <select id="calc-term-years" class="calc-select-input">
                        <option value="5" selected>5 ปี (วาระตามโครงการ 181 สถานี)</option>
                        <option value="4">4 ปี (วาระผู้บริหารท้องถิ่น)</option>
                        <option value="3">3 ปี</option>
                        <option value="2">2 ปี</option>
                    </select>
                </div>

                <div class="calc-result-card" id="term-result-card">
                    <!-- คำนวณผลลัพธ์แบบ Dynamic -->
                </div>
            </div>

            <!-- ส่วนที่ 2: คำนวณกรอบเวลาเกษียณอายุราชการ (Retirement Timeline Tracking) -->
            <div class="calc-column-box">
                <div class="calc-box-heading">
                    <svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <polyline points="17 11 19 13 23 9"/>
                    </svg>
                    <span>2. คำนวณกรอบเวลาเกษียณอายุราชการ (Retirement Timeline)</span>
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-dob">วันเดือนปีเกิดของเจ้าหน้าที่:</label>
                    <input type="date" id="calc-dob" class="calc-date-input" value="1968-04-15">
                </div>
                <div class="calc-hint-text">
                    * ระเบียบข้าราชการไทย: เกษียณ ณ สิ้นปีงบประมาณ (30 ก.ย.) ของปีที่อายุครบ 60 ปีบริบูรณ์
                </div>

                <div class="calc-result-card" id="retirement-result-card">
                    <!-- คำนวณผลลัพธ์แบบ Dynamic -->
                </div>
            </div>
        </div>
    `;

    container.appendChild(card);
    setupTenureCalculatorListeners();
}

/**
 * ฟังก์ชันผูก Event Listeners และสั่งคำนวณผลลัพธ์แบบอัตโนมัติ
 */
function setupTenureCalculatorListeners() {
    const startDateInput = document.getElementById('calc-start-date');
    const termYearsInput = document.getElementById('calc-term-years');
    const dobInput = document.getElementById('calc-dob');

    function updateAll() {
        if (startDateInput && termYearsInput) {
            updateTermCalculation(startDateInput.value, parseInt(termYearsInput.value, 10));
        }
        if (dobInput) {
            updateRetirementCalculation(dobInput.value);
        }
    }

    if (startDateInput) startDateInput.addEventListener('change', updateAll);
    if (termYearsInput) termYearsInput.addEventListener('change', updateAll);
    if (dobInput) dobInput.addEventListener('change', updateAll);

    updateAll();
}

/**
 * คำนวณและแสดงผลการติดตามวันหมดวาระการดำรงตำแหน่ง
 *
 * @param {string} startDateStr วันที่เริ่มต้นในรูปแบบ YYYY-MM-DD
 * @param {number} termYears จำนวนปีของวาระ
 */
function updateTermCalculation(startDateStr, termYears) {
    const resultBox = document.getElementById('term-result-card');
    if (!resultBox) return;

    if (!startDateStr) {
        resultBox.innerHTML = `<span class="calc-empty-hint">กรุณาระบุวันที่เริ่มต้น</span>`;
        return;
    }

    const startParts = startDateStr.split('-');
    const start = new Date(parseInt(startParts[0], 10), parseInt(startParts[1], 10) - 1, parseInt(startParts[2], 10));
    
    const exp = new Date(start);
    exp.setFullYear(start.getFullYear() + termYears);
    exp.setDate(exp.getDate() - 1);

    const now = new Date();
    const diffMs = exp - now;
    const isExpired = diffMs <= 0;
    const totalDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const totalTermMs = exp - start;
    const elapsedMs = Math.max(0, now - start);
    const progressPct = totalTermMs > 0 ? Math.min(100, Math.max(0, Math.round((elapsedMs / totalTermMs) * 100))) : 100;

    const yearsLeft = Math.floor(totalDays / 365);
    const monthsLeft = Math.floor((totalDays % 365) / 30);
    const daysLeft = totalDays % 30;

    const expDateThai = formatThaiFullDate(exp);

    resultBox.innerHTML = `
        <div class="calc-stat-row">
            <span class="stat-label">วันครบกำหนดวาระ:</span>
            <strong class="stat-highlight">${expDateThai}</strong>
        </div>
        <div class="calc-stat-row">
            <span class="stat-label">สถานะวาระคงเหลือ:</span>
            <span class="stat-badge-pill ${isExpired ? 'badge-expired' : 'badge-active'}">
                ${isExpired ? 'สิ้นสุดวาระแล้ว' : `คงเหลือ ${yearsLeft} ปี ${monthsLeft} เดือน ${daysLeft} วัน`}
            </span>
        </div>
        <div class="calc-progress-wrapper">
            <div class="calc-progress-labels">
                <span>ความคืบหน้าของวาระ:</span>
                <strong>${progressPct}%</strong>
            </div>
            <div class="calc-progress-track">
                <div class="calc-progress-bar" style="width: ${progressPct}%;"></div>
            </div>
        </div>
    `;
}

/**
 * คำนวณและแสดงผลวันเกษียณอายุราชการตามระเบียบข้าราชการไทย
 *
 * @param {string} dobStr วันเดือนปีเกิดในรูปแบบ YYYY-MM-DD
 */
function updateRetirementCalculation(dobStr) {
    const resultBox = document.getElementById('retirement-result-card');
    if (!resultBox) return;

    if (!dobStr) {
        resultBox.innerHTML = `<span class="calc-empty-hint">กรุณาระบุวันเดือนปีเกิด</span>`;
        return;
    }

    const parts = dobStr.split('-');
    const birthYear = parseInt(parts[0], 10);
    const birthMonth = parseInt(parts[1], 10);
    const birthDate = parseInt(parts[2], 10);

    let retYear = birthYear + 60;
    if (birthMonth > 10 || (birthMonth === 10 && birthDate >= 2)) {
        retYear = birthYear + 61;
    }

    const retDate = new Date(retYear, 8, 30);
    const now = new Date();
    const diffMs = retDate - now;
    const isRetired = diffMs <= 0;
    const totalDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const yearsLeft = Math.floor(totalDays / 365);
    const monthsLeft = Math.floor((totalDays % 365) / 30);
    const daysLeft = totalDays % 30;

    const retDateThai = `30 กันยายน พ.ศ. ${retYear + 543}`;

    resultBox.innerHTML = `
        <div class="calc-stat-row">
            <span class="stat-label">วันเกษียณอายุราชการ:</span>
            <strong class="stat-highlight">${retDateThai}</strong>
        </div>
        <div class="calc-stat-row">
            <span class="stat-label">ระยะเวลาก่อนเกษียณ:</span>
            <span class="stat-badge-pill ${isRetired ? 'badge-expired' : 'badge-active'}">
                ${isRetired ? 'เกษียณอายุราชการแล้ว' : `อีก ${yearsLeft} ปี ${monthsLeft} เดือน ${daysLeft} วัน`}
            </span>
        </div>
        <div class="calc-stat-sub">
            <span>สิ้นปีงบประมาณ พ.ศ. ${retYear + 543} (นับถอยหลัง ${totalDays.toLocaleString()} วัน)</span>
        </div>
    `;
}

/**
 * แปลง Date Object เป็นข้อความวันที่ภาษาไทยแบบเต็ม
 *
 * @param {Date} date วันที่ที่ต้องการแปลง
 * @returns {string} วันที่ภาษาไทย เช่น "30 กันยายน พ.ศ. 2571"
 */
function formatThaiFullDate(date) {
    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} พ.ศ. ${date.getFullYear() + 543}`;
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
