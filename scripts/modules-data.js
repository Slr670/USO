/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: scripts/modules-data.js
 * Purpose: Constant datasets and scalable inline SVG icons for all 8 operational modules
 * Version: 2.4.1
 * ===================================================================
 */

/**
 * Scalable Inline Vector SVG Icon System
 * Fully compliant with UI Icon Policy (Scalable Vector SVG, No Unicode Emojis)
 */
const ICONS = {
    // 1. PM: Technician Tools & Preventive Maintenance (Wrench & Screwdriver)
    pm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>`,

    // 2. CM: Incident Ticket & Corrective Maintenance (Alert Triangle with Exclamation)
    cm: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,

    // 3. Quarterly Visits: Calendar Schedule with Checkmark
    calendar: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
    </svg>`,

    // 4. Process Claims: Return Merchandise Authorization (RMA Exchange Cycle)
    claim: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
    </svg>`,

    // 5. Monitor System: Network Telemetry & Pulse Activity
    monitor: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`,

    // 6. DOPA Tenure: Government Civic Columns
    government: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="2" y1="22" x2="22" y2="22"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
        <path d="M6 18V9"/>
        <path d="M10 18V9"/>
        <path d="M14 18V9"/>
        <path d="M18 18V9"/>
        <polygon points="12 2 2 7 22 7 12 2"/>
    </svg>`,

    // 7. Manage Inventory: Warehouse Packages & Spare Parts Storage
    inventory: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
    </svg>`,

    // 8. Track Assets & Equipment: Asset Inventory Registration Clipboard
    assetEquipment: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <path d="m9 14 2 2 4-4"/>
    </svg>`,

    // External Link Indicator Arrow (Arrow Up Right)
    externalArrow: `<svg class="ui-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>`,

    // Header Logo: Super High Frequency Repeater Broadcast Tower
    broadcastTower: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.93 4.93a10 10 0 0 1 14.14 0"/>
        <path d="M7.76 7.76a6 6 0 0 1 8.48 0"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="m16.24 16.24-2.83 2.83a2 2 0 0 1-2.82 0l-2.83-2.83"/>
        <line x1="12" y1="12" x2="12" y2="22"/>
    </svg>`
};

/**
 * 8 Operational Modules Dataset (English Default Values)
 * @constant {Array<Object>}
 */
const MENU_MODULES_DATA = [
    {
        id: 1,
        orderIndex: 0,
        shortTitle: "1. Perform PM",
        fullTitle: "1. Perform Preventive Maintenance (PM)",
        badge: "Category: Preventive Maintenance",
        icon: "fa-solid fa-screwdriver-wrench",
        svgIcon: ICONS.pm,
        description: "Schedule and record periodic inspection logs for SHF repeater base stations, measure radio frequency (RF) signal levels, inspect feeder cables, antennas, and verify backup power systems across all sites.",
        externalUrl: "https://pm-5year.vercel.app/",
        isExternal: true
    },
    {
        id: 2,
        orderIndex: 1,
        shortTitle: "2. Handle CM",
        fullTitle: "2. Handle Corrective Maintenance (CM)",
        badge: "Category: Corrective Maintenance & Emergency Response",
        icon: "fa-solid fa-triangle-exclamation",
        svgIcon: ICONS.cm,
        description: "Open, track, and resolve incident tickets for SHF repeater equipment malfunctions and microwave link interruptions, dispatching technical teams within SLA-governed recovery windows.",
        externalUrl: "https://dtrs-app-uat.forth.co.th/",
        isExternal: true
    },
    {
        id: 3,
        orderIndex: 2,
        shortTitle: "3. Quarterly Visits",
        fullTitle: "3. Conduct Quarterly Site Inspection Visits",
        badge: "Category: Quarterly Site Inspections",
        icon: "fa-solid fa-calendar-check",
        svgIcon: ICONS.calendar,
        description: "Coordinate and manage quarterly on-site inspection visits to regional stations, consolidate stakeholder feedback, resolve operational issues, and evaluate network user satisfaction.",
        externalUrl: null,
        isExternal: false
    },
    {
        id: 4,
        orderIndex: 3,
        shortTitle: "4. Process Claims",
        fullTitle: "4. Process Equipment & Warranty Claims",
        badge: "Category: Warranty & Equipment RMA",
        icon: "fa-solid fa-arrows-rotate",
        svgIcon: ICONS.claim,
        description: "Manage Return Merchandise Authorization (RMA) workflows for defective SHF transceiver modules, microwave feedhorns, and power supply units with equipment vendors, maintaining complete replacement audit trails.",
        externalUrl: "https://equipment-claims.vercel.app/",
        isExternal: true
    },
    {
        id: 5,
        orderIndex: 4,
        shortTitle: "5. Monitor System",
        fullTitle: "5. Monitor System & Radio Telemetry",
        badge: "Category: Network Telemetry & Real-Time Monitoring",
        icon: "fa-solid fa-chart-line",
        svgIcon: ICONS.monitor,
        description: "Real-time telemetry dashboard displaying network uptime, SHF radio link degradation (Link Down events), received signal level (RSL) thresholds, and centralized alert event logs.",
        externalUrl: "https://bssc-nine.vercel.app/",
        isExternal: true
    },
    {
        id: 6,
        orderIndex: 5,
        shortTitle: "6. DOPA Tenure",
        fullTitle: "6. Track DOPA Officials' Tenure & Retirement",
        badge: "Category: DOPA Tenure & Retirement Timeline",
        icon: "fa-solid fa-building-columns",
        svgIcon: ICONS.government,
        description: "Track and calculate the remaining tenure of DOPA officials, including term expiration dates and civil service retirement timelines across 181 USO stations.",
        externalUrl: "https://wara5year.vercel.app/",
        isExternal: true,
        hasTenureCalculator: true
    },
    {
        id: 7,
        orderIndex: 6,
        shortTitle: "7. Manage Inventory",
        fullTitle: "7. Manage Spare Parts & Inventory",
        badge: "Category: Spare Parts & Inventory Management",
        icon: "fa-solid fa-boxes-stacked",
        svgIcon: ICONS.inventory,
        description: "Manage reserve inventory levels for SHF repeater spare parts, parabolic antennas, RF amplifiers, power converters, and auxiliary components, auditing requisition logs for PM and CM dispatches.",
        externalUrl: "https://www.stockflowth.online/dashboard",
        isExternal: true
    },
    {
        id: 8,
        orderIndex: 7,
        shortTitle: "8. Assets & Equipment",
        fullTitle: "8. Track Assets & Equipment Registry",
        badge: "Category: Asset & Equipment Registry",
        icon: "fa-solid fa-clipboard-check",
        svgIcon: ICONS.assetEquipment,
        description: "Maintain comprehensive fixed-asset registration records for SHF telecommunication infrastructure, tracking Asset IDs, serial numbers, operational readiness, handover certificates, and equipment relocation histories.",
        externalUrl: null,
        isExternal: false
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ICONS, MENU_MODULES_DATA };
}
