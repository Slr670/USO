/**
 * ===================================================================
 * โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)
 * ไฟล์: src/main/resources/static/js/dashboard.js
 * วัตถุประสงค์: ควบคุมการทำงานของหน้า Dashboard (UI State, Interactivity & Routing)
 * เวอร์ชัน: 2.1.1
 * ===================================================================
 */

const APP_VERSION = '2.1.1';
let currentActiveIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    renderVersionBadges();
    selectMenu(0, false);
    setupKeyboardNavigation();
    console.log(`[SHF Dashboard] Initialized successfully with SVG icon system. Version: v${APP_VERSION}`);
}

function renderVersionBadges() {
    const versionElements = document.querySelectorAll('#app-version, .app-version-text');
    versionElements.forEach((el) => {
        el.textContent = `v${APP_VERSION}`;
    });
}

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
    updateCardStates(index);
    renderPanelDetails(item);

    if (triggerRedirect && item.isExternal && item.externalUrl) {
        openExternalLink(item.externalUrl);
    }
}

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

function renderPanelDetails(item) {
    const badgeEl = document.getElementById('section-badge');
    const iconEl = document.getElementById('display-icon');
    const titleEl = document.getElementById('display-title');
    const descEl = document.getElementById('display-desc');
    const actionAreaEl = document.getElementById('panel-action-container');

    if (badgeEl) badgeEl.textContent = item.badge;
    if (titleEl) titleEl.textContent = item.fullTitle;
    if (descEl) descEl.textContent = item.description;

    if (iconEl) {
        if (item.svgIcon) {
            iconEl.innerHTML = item.svgIcon;
            iconEl.className = 'panel-icon-svg-wrap';
        } else {
            iconEl.className = item.icon;
        }
    }

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

function openExternalLink(url) {
    try {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.opener = null;
        }
    } catch (error) {
        console.error('[SHF Dashboard] Failed to open external URL:', error);
    }
}

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
