/**
 * ===================================================================
 * SHF Dashboard - Client-Side Interactive Controller
 * Version: 2.0.0
 * Description: ควบคุมการทำงานเชิงโต้ตอบ (Interactivity), การสลับหมวดหมู่งาน,
 *              และการ Redirect ไปยังระบบภายนอก (wara5year.vercel.app)
 * ===================================================================
 */

(function () {
    'use strict';

    /**
     * ดึงข้อมูลแคชของโมดูลทั้งหมดที่ถูกส่งมาจากฝั่งเซิร์ฟเวอร์
     * หรืออ่านจาก DOM Element Attributes
     */
    let currentActiveIndex = 0;
    let modulesCache = [];

    /**
     * เริ่มต้นการทำงานเมื่อโครงสร้าง DOM โหลดเสร็จสมบูรณ์
     */
    document.addEventListener('DOMContentLoaded', () => {
        initDashboard();
    });

    /**
     * ฟังก์ชันเริ่มต้นระบบ (Dashboard Initialization)
     * ทำการผูก Event Listener, โหลดข้อมูลโมดูล และตั้งค่าการแสดงผลเบื้องต้น
     */
    function initDashboard() {
        // อ่านข้อมูลโมดูลจาก embedded json script tag หรือปุ่มที่ปรากฏบนหน้าจอ
        extractModulesFromDOM();

        // ผูก Event Listener กับปุ่มการ์ดทั้งหมด
        bindCardEvents();

        // รองรับการควบคุมผ่าน Keyboard (Accessibility)
        bindKeyboardNavigation();
    }

    /**
     * ดึงข้อมูลโครงสร้างของแต่ละการ์ดจาก DOM เพื่อใช้ในการสลับเนื้อหาอย่างรวดเร็ว
     */
    function extractModulesFromDOM() {
        const cards = document.querySelectorAll('.card-btn');
        modulesCache = Array.from(cards).map((card, index) => {
            return {
                index: index,
                id: card.dataset.id || (index + 1),
                shortCode: card.dataset.shortcode || card.querySelector('.card-title-text')?.textContent.trim(),
                title: card.dataset.title || '',
                badge: card.dataset.badge || '',
                iconClass: card.dataset.icon || '',
                desc: card.dataset.desc || '',
                externalUrl: card.dataset.url || null,
                isExternal: card.dataset.external === 'true'
            };
        });
    }

    /**
     * ผูก Click Event ให้กับการ์ดแต่ละใบ
     */
    function bindCardEvents() {
        const cards = document.querySelectorAll('.card-btn');
        cards.forEach((card, index) => {
            card.addEventListener('click', (event) => {
                handleCardSelection(index, card);
            });
        });
    }

    /**
     * จัดการเมื่อผู้ใช้งานคลิกเลือกการ์ดโมดูล
     *
     * @param {number} index ลำดับของการ์ดที่ถูกคลิก (0 ถึง 6)
     * @param {HTMLElement} cardElement โหนดการ์ดที่ถูกคลิก
     */
    window.handleCardSelection = function (index, cardElement) {
        const moduleData = modulesCache[index];
        if (!moduleData) return;

        // 1. ปรับปรุงสถานะ Active บนการ์ดทั้งหมด
        updateActiveCardUI(index);

        // 2. อัปเดตเนื้อหาใน Content Panel ให้ตรงกับโมดูลที่เลือก
        renderContentPanel(moduleData);

        // 3. กรณีเป็นโมดูลที่ 6 (หรือโมดูลที่มี externalUrl):
        //    ทำการเปิดลิงก์ไปยังระบบภายนอกในแท็บใหม่อัตโนมัติตามข้อกำหนด
        if (moduleData.isExternal && moduleData.externalUrl) {
            openExternalSystem(moduleData.externalUrl);
        }

        currentActiveIndex = index;
    };

    /**
     * ปรับปรุงสถานะภาพการแสดงผลของการ์ดที่ถูก Active
     *
     * @param {number} activeIndex ลำดับที่ต้อง Active
     */
    function updateActiveCardUI(activeIndex) {
        const cards = document.querySelectorAll('.card-btn');
        cards.forEach((btn, idx) => {
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
     * อัปเดตเนื้อหาในกล่อง Content Panel
     *
     * @param {Object} item ข้อมูลของโมดูลที่ต้องการแสดงผล
     */
    function renderContentPanel(item) {
        const badgeEl = document.getElementById('panel-badge');
        const iconEl = document.getElementById('panel-icon');
        const titleEl = document.getElementById('panel-title');
        const descBoxEl = document.getElementById('panel-desc-box');
        const actionAreaEl = document.getElementById('panel-action-area');

        if (badgeEl) badgeEl.textContent = item.badge;
        if (iconEl) iconEl.className = item.iconClass;
        if (titleEl) titleEl.textContent = item.title;
        if (descBoxEl) descBoxEl.textContent = item.desc;

        // จัดการส่วนปุ่ม Action ในกรณีที่เป็นโมดูลภายนอก
        if (actionAreaEl) {
            actionAreaEl.innerHTML = '';
            if (item.isExternal && item.externalUrl) {
                const linkBtn = document.createElement('a');
                linkBtn.href = item.externalUrl;
                linkBtn.target = '_blank';
                linkBtn.rel = 'noopener noreferrer';
                linkBtn.className = 'btn-action-primary';
                linkBtn.innerHTML = `
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>เข้าสู่ระบบ: ${item.shortCode}</span>
                `;
                actionAreaEl.appendChild(linkBtn);
            }
        }
    }

    /**
     * เปิด URL ภายนอกในแท็บใหม่อย่างปลอดภัย
     *
     * @param {string} url ที่อยู่เว็บไซต์ปลายทาง
     */
    function openExternalSystem(url) {
        try {
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.opener = null; // ป้องกัน Reverse Tabnabbing Security Vulnerability
            }
        } catch (err) {
            console.error('ไม่สามารถเปิดหน้าต่างใหม่ได้:', err);
        }
    }

    /**
     * รองรับการนำทางด้วยแป้นพิมพ์สำหรับ Accessibility (A11y)
     */
    function bindKeyboardNavigation() {
        const cards = document.querySelectorAll('.card-btn');
        cards.forEach((card, index) => {
            card.addEventListener('keydown', (e) => {
                let targetIndex = null;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    targetIndex = (index + 1) % cards.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    targetIndex = (index - 1 + cards.length) % cards.length;
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                    return;
                }

                if (targetIndex !== null) {
                    e.preventDefault();
                    cards[targetIndex].focus();
                    cards[targetIndex].click();
                }
            });
        });
    }

})();
