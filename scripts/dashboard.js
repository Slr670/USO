/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: scripts/dashboard.js
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เชื่อมโยงระบบแปลภาษา: i18next + react-i18next (Translation Engine)
 * เวอร์ชัน: 2.4.0
 * ===================================================================
 */

/**
 * กำหนดเวอร์ชันหลักของระบบ (Authoritative Application Version)
 * สอดคล้องตามมาตรฐาน Semantic Versioning (SemVer)
 * @constant {string}
 */
const APP_VERSION = '2.4.0';

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
 * 1. กำหนดการแปลภาษาสำหรับ UI ทั้งหมดด้วย Translation Keys ผ่าน t()
 * 2. แสดงผลเลขเวอร์ชันระบบบน Header และ Footer
 * 3. ตั้งค่าการแสดงผลหมวดหมู่เริ่มต้น (Index 0: PM)
 * 4. ผูกระบบการควบคุมด้วยคีย์บอร์ด (Keyboard Accessibility)
 */
function initDashboard() {
    // 1. นำชุดคำแปลภาษาไทย 100% ไปใช้กับทุกองค์ประกอบบนหน้าเว็บ
    applyTranslationsToUI();

    // 2. อัปเดตแสดงผลเวอร์ชันบน UI
    renderVersionBadges();

    // 3. แสดงผลหมวดหมู่เริ่มต้น (Initial Active Module)
    selectMenu(0, false);

    // 4. ผูก Event สำหรับการควบคุมผ่าน Keyboard
    setupKeyboardNavigation();

    console.log(`[SHF Dashboard] Initialized successfully with i18next translation engine and SVG icons. Version: v${APP_VERSION}`);
}

/**
 * นำคำแปลภาษาไทยผ่าน Translation Keys จาก i18next ไปอัปเดตองค์ประกอบ UI ทั้งหมด
 */
function applyTranslationsToUI() {
    if (typeof t !== 'function') return;

    // ส่วนหัว (Header Hero Bar)
    const logoContainer = document.querySelector('.header-logo-container');
    if (logoContainer) logoContainer.setAttribute('title', t('header.logoTooltip'));

    const mainTitleEl = document.querySelector('.header-main-title');
    if (mainTitleEl) mainTitleEl.textContent = t('header.mainTitle');

    const subTitleEl = document.querySelector('.header-sub-title');
    if (subTitleEl) subTitleEl.textContent = t('header.subTitle');

    const versionBadgeEl = document.getElementById('app-version');
    if (versionBadgeEl) versionBadgeEl.setAttribute('title', t('header.versionTooltip'));

    const statusTextEl = document.querySelector('.header-status-pill span:last-child');
    if (statusTextEl) statusTextEl.textContent = t('header.statusLive');

    // ส่วนคำแนะนำและหัวข้อ (Section Info Bar)
    const sectionLabelEl = document.querySelector('.section-label-text span');
    if (sectionLabelEl) sectionLabelEl.textContent = t('section.operationsAndServices');

    const sectionHelpEl = document.querySelector('.section-help-text');
    if (sectionHelpEl) sectionHelpEl.textContent = t('section.helpText');

    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) gridContainer.setAttribute('aria-label', t('section.ariaLabel'));

    // ปุ่มการ์ดทั้ง 8 ช่อง (Buttons Grid 0-7)
    if (typeof MENU_MODULES_DATA !== 'undefined') {
        MENU_MODULES_DATA.forEach((module, idx) => {
            const btn = document.getElementById(`btn-module-${idx}`);
            if (btn) {
                const localized = (typeof getLocalizedModule === 'function') ? getLocalizedModule(idx) : module;
                const labelTextEl = btn.querySelector('.card-label-text');
                if (labelTextEl) {
                    labelTextEl.textContent = localized.shortTitle;
                }
                const tooltipText = t(`${module.translationKey}.tooltip`);
                btn.setAttribute('title', tooltipText);

                const extPill = btn.querySelector('.external-link-pill');
                if (extPill) extPill.setAttribute('title', t('common.openInNewTab'));
            }
        });
    }

    // ส่วนท้าย (Footer)
    const footerInner = document.querySelector('.dashboard-footer .footer-inner');
    if (footerInner) {
        footerInner.innerHTML = `
            <div>
                ${t('footer.copyright')}
            </div>
            <div>
                ${t('footer.architecture', { version: APP_VERSION })}
            </div>
        `;
    }
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

    // 3. จัดการกรณีหมวดหมู่ที่เป็นลิงก์ภายนอก
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
 *
 * @param {Object} item ข้อมูลของโมดูลที่เลือก
 */
function renderPanelDetails(item) {
    const badgeEl = document.getElementById('section-badge');
    const iconEl = document.getElementById('display-icon');
    const titleEl = document.getElementById('display-title');
    const descEl = document.getElementById('display-desc');
    const actionAreaEl = document.getElementById('panel-action-container');

    const localized = (typeof getLocalizedModule === 'function')
        ? getLocalizedModule(currentActiveIndex) || item
        : item;

    if (badgeEl) badgeEl.textContent = localized.badge;
    if (titleEl) titleEl.textContent = localized.fullTitle;
    if (descEl) descEl.textContent = localized.description;

    // อัปเดตไอคอนใน Content Panel
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
            const actionText = (typeof t === 'function')
                ? t('actions.openMainSystem', { title: localized.shortTitle })
                : `เปิดระบบหลัก: ${localized.shortTitle} • แดชบอร์ด 181 สถานี (แท็บใหม่)`;
            redirectBtn.innerHTML = `
                ${arrowIcon}
                <span>${actionText}</span>
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

    const mainTitle = (typeof t === 'function') ? t('calculator.mainTitle') : "เครื่องมือติดตามและคำนวณวาระคงเหลือเจ้าหน้าที่รัฐ กรมการปกครอง";
    const subTitle = (typeof t === 'function') ? t('calculator.subTitle') : "เครื่องมือคำนวณวันสิ้นสุดวาระและกำหนดการเกษียณอายุราชการ กรมการปกครอง (DOPA)";
    const stationBadge = (typeof t === 'function') ? t('calculator.stationBadge') : "ระบบติดตาม 181 สถานี USO";
    const termSectionTitle = (typeof t === 'function') ? t('calculator.termSectionTitle') : "1. คำนวณวันสิ้นสุดวาระการดำรงตำแหน่ง (สิ้นสุดวาระ)";
    const startDateLabel = (typeof t === 'function') ? t('calculator.startDateLabel') : "วันที่เริ่มดำรงตำแหน่ง:";
    const termDurationLabel = (typeof t === 'function') ? t('calculator.termDurationLabel') : "ระยะเวลาของวาระ:";
    const term5Years = (typeof t === 'function') ? t('calculator.term5Years') : "5 ปี (วาระตามโครงการ 181 สถานี)";
    const term4Years = (typeof t === 'function') ? t('calculator.term4Years') : "4 ปี (วาระผู้บริหารท้องถิ่น)";
    const term3Years = (typeof t === 'function') ? t('calculator.term3Years') : "3 ปี";
    const term2Years = (typeof t === 'function') ? t('calculator.term2Years') : "2 ปี";

    const retirementSectionTitle = (typeof t === 'function') ? t('calculator.retirementSectionTitle') : "2. คำนวณกรอบเวลาเกษียณอายุราชการ (กำหนดการเกษียณ)";
    const dobLabel = (typeof t === 'function') ? t('calculator.dobLabel') : "วันเดือนปีเกิดของเจ้าหน้าที่:";
    const retirementHint = (typeof t === 'function') ? t('calculator.retirementHint') : "* ระเบียบข้าราชการไทย: เกษียณ ณ สิ้นปีงบประมาณ (30 ก.ย.) ของปีที่อายุครบ 60 ปีบริบูรณ์";

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
                    <h3 class="calc-main-title">${mainTitle}</h3>
                    <p class="calc-sub-title">${subTitle}</p>
                </div>
            </div>
            <span class="calc-badge-dopa">${stationBadge}</span>
        </div>

        <div class="calc-grid-layout">
            <!-- ส่วนที่ 1: คำนวณวันหมดวาระการดำรงตำแหน่ง -->
            <div class="calc-column-box">
                <div class="calc-box-heading">
                    <svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>${termSectionTitle}</span>
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-start-date">${startDateLabel}</label>
                    <input type="date" id="calc-start-date" class="calc-date-input" value="2023-10-01">
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-term-years">${termDurationLabel}</label>
                    <select id="calc-term-years" class="calc-select-input">
                        <option value="5" selected>${term5Years}</option>
                        <option value="4">${term4Years}</option>
                        <option value="3">${term3Years}</option>
                        <option value="2">${term2Years}</option>
                    </select>
                </div>

                <div class="calc-result-card" id="term-result-card">
                    <!-- คำนวณผลลัพธ์แบบ Dynamic -->
                </div>
            </div>

            <!-- ส่วนที่ 2: คำนวณกรอบเวลาเกษียณอายุราชการ -->
            <div class="calc-column-box">
                <div class="calc-box-heading">
                    <svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <polyline points="17 11 19 13 23 9"/>
                    </svg>
                    <span>${retirementSectionTitle}</span>
                </div>
                <div class="calc-field-row">
                    <label class="calc-label" for="calc-dob">${dobLabel}</label>
                    <input type="date" id="calc-dob" class="calc-date-input" value="1968-04-15">
                </div>
                <div class="calc-hint-text">
                    ${retirementHint}
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
 * คำนวณและแสดงผลการติดตามวันหมดวาระการดำรงตำแหน่ง (ใช้คีย์แปลภาษา 100%)
 *
 * @param {string} startDateStr วันที่เริ่มต้นในรูปแบบ YYYY-MM-DD
 * @param {number} termYears จำนวนปีของวาระ
 */
function updateTermCalculation(startDateStr, termYears) {
    const resultBox = document.getElementById('term-result-card');
    if (!resultBox) return;

    if (!startDateStr) {
        const emptyMsg = (typeof t === 'function') ? t('calculator.emptyStartDate') : "กรุณาระบุวันที่เริ่มต้น";
        resultBox.innerHTML = `<span class="calc-empty-hint">${emptyMsg}</span>`;
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

    const termExpDateLabel = (typeof t === 'function') ? t('calculator.termExpDateLabel') : "วันครบกำหนดวาระ:";
    const termStatusLabel = (typeof t === 'function') ? t('calculator.termStatusLabel') : "สถานะวาระคงเหลือ:";
    const termProgressLabel = (typeof t === 'function') ? t('calculator.termProgressLabel') : "ความคืบหน้าของวาระ:";
    const statusText = isExpired
        ? ((typeof t === 'function') ? t('calculator.termExpired') : 'สิ้นสุดวาระแล้ว')
        : ((typeof t === 'function')
            ? t('calculator.termRemaining', { years: yearsLeft, months: monthsLeft, days: daysLeft })
            : `คงเหลือ ${yearsLeft} ปี ${monthsLeft} เดือน ${daysLeft} วัน`);

    resultBox.innerHTML = `
        <div class="calc-stat-row">
            <span class="stat-label">${termExpDateLabel}</span>
            <strong class="stat-highlight">${expDateThai}</strong>
        </div>
        <div class="calc-stat-row">
            <span class="stat-label">${termStatusLabel}</span>
            <span class="stat-badge-pill ${isExpired ? 'badge-expired' : 'badge-active'}">
                ${statusText}
            </span>
        </div>
        <div class="calc-progress-wrapper">
            <div class="calc-progress-labels">
                <span>${termProgressLabel}</span>
                <strong>${progressPct}%</strong>
            </div>
            <div class="calc-progress-track">
                <div class="calc-progress-bar" style="width: ${progressPct}%;"></div>
            </div>
        </div>
    `;
}

/**
 * คำนวณและแสดงผลวันเกษียณอายุราชการตามระเบียบข้าราชการไทย (ใช้คีย์แปลภาษา 100%)
 *
 * @param {string} dobStr วันเดือนปีเกิดในรูปแบบ YYYY-MM-DD
 */
function updateRetirementCalculation(dobStr) {
    const resultBox = document.getElementById('retirement-result-card');
    if (!resultBox) return;

    if (!dobStr) {
        const emptyDobMsg = (typeof t === 'function') ? t('calculator.emptyDob') : "กรุณาระบุวันเดือนปีเกิด";
        resultBox.innerHTML = `<span class="calc-empty-hint">${emptyDobMsg}</span>`;
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

    const retDateLabel = (typeof t === 'function') ? t('calculator.retDateLabel') : "วันเกษียณอายุราชการ:";
    const retTimeRemainingLabel = (typeof t === 'function') ? t('calculator.retTimeRemainingLabel') : "ระยะเวลาก่อนเกษียณ:";
    const statusText = isRetired
        ? ((typeof t === 'function') ? t('calculator.retExpired') : 'เกษียณอายุราชการแล้ว')
        : ((typeof t === 'function')
            ? t('calculator.retRemaining', { years: yearsLeft, months: monthsLeft, days: daysLeft })
            : `อีก ${yearsLeft} ปี ${monthsLeft} เดือน ${daysLeft} วัน`);

    const fiscalCountdownText = (typeof t === 'function')
        ? t('calculator.retFiscalCountdown', { year: retYear + 543, days: totalDays.toLocaleString() })
        : `สิ้นปีงบประมาณ พ.ศ. ${retYear + 543} (นับถอยหลัง ${totalDays.toLocaleString()} วัน)`;

    resultBox.innerHTML = `
        <div class="calc-stat-row">
            <span class="stat-label">${retDateLabel}</span>
            <strong class="stat-highlight">${retDateThai}</strong>
        </div>
        <div class="calc-stat-row">
            <span class="stat-label">${retTimeRemainingLabel}</span>
            <span class="stat-badge-pill ${isRetired ? 'badge-expired' : 'badge-active'}">
                ${statusText}
            </span>
        </div>
        <div class="calc-stat-sub">
            <span>${fiscalCountdownText}</span>
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
