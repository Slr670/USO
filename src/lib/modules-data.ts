import type { OperationalModule, SvgIconRegistry } from './types';

/**
 * Scalable Vector Graphics (SVG) Icon Registry
 * Adheres strictly to UI Icon Policy (Scalable Vector SVG, No Unicode Emojis)
 */
export const ICONS: SvgIconRegistry = {
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

  // 4. Claims: Shield Check for Hardware Warranty & Return Merchandise
  warranty: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>`,

  // 5. Monitor: Radio Signal Activity Pulse & Network Telemetry
  monitor: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>`,

  // 6. DOPA: Official Administrative Building / Ministry Column
  government: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21h18"/>
    <path d="M3 10h18"/>
    <path d="m12 2 9 6H3l9-6z"/>
    <path d="M5 10v11"/>
    <path d="M9 10v11"/>
    <path d="M15 10v11"/>
    <path d="M19 10v11"/>
  </svg>`,

  // 7. Inventory: Stacked Warehouse Boxes
  inventory: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
  </svg>`,

  // 8. Assets & Equipment: Clipboard Inspection & Equipment Check
  assetEquipment: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>`,

  // External Link Indicator Arrow
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
  </svg>`,

  // Signal Tower
  signalTower: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v20"/>
    <path d="m17 7-5 5-5-5"/>
    <path d="m19 12-7 7-7-7"/>
  </svg>`,

  // Server Stack
  serverStack: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
    <line x1="6" x2="6.01" y1="6" y2="6"/>
    <line x1="6" x2="6.01" y1="18" y2="18"/>
  </svg>`,

  // Shield Check
  shieldCheck: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>`,

  // Speed Meter
  speedMeter: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 14 4-4"/>
    <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
  </svg>`,

  // 9. Calculate Antenna Spacing: Super High Frequency Antenna Tower
  antennaTower: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.93 4.93a10 10 0 0 1 14.14 0"/>
    <path d="M7.76 7.76a6 6 0 0 1 8.48 0"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="m16.24 16.24-2.83 2.83a2 2 0 0 1-2.82 0l-2.83-2.83"/>
    <line x1="12" y1="12" x2="12" y2="22"/>
  </svg>`
};

/**
 * Authoritative Operational Modules Dataset (9 Core Systems)
 * 181 SHF Repeater Station Network Optimization & Telemetry Operations
 */
export const MENU_MODULES_DATA: readonly OperationalModule[] = [
  {
    id: 1,
    orderIndex: 0,
    shortTitle: "1. Perform PM",
    fullTitle: "1. Perform PM (Preventive Maintenance)",
    badge: "Category: Preventive Maintenance (PM)",
    icon: "fa-solid fa-wrench",
    svgIcon: ICONS.pm,
    description: "Standardized preventive maintenance protocols, equipment inspection checklists, scheduled calibration intervals, and operational readiness for 181 SHF repeater stations.",
    externalUrl: "https://pm-5year.vercel.app/",
    isExternal: true
  },
  {
    id: 2,
    orderIndex: 1,
    shortTitle: "2. Handle CM",
    fullTitle: "2. Handle CM (Corrective Maintenance)",
    badge: "Category: Corrective Maintenance (CM)",
    icon: "fa-solid fa-triangle-exclamation",
    svgIcon: ICONS.cm,
    description: "Emergency incident dispatch ticketing, Root Cause Analysis (RCA), corrective repair action tracking, and Mean Time to Repair (MTTR) monitoring for unscheduled link outages.",
    externalUrl: "https://dtrs-app-uat.forth.co.th/dashboard",
    isExternal: true
  },
  {
    id: 3,
    orderIndex: 2,
    shortTitle: "3. Quarterly Visits",
    fullTitle: "3. Conduct Quarterly Site Inspection Visits",
    badge: "Category: Scheduled Quarterly Inspections",
    icon: "fa-solid fa-calendar-check",
    svgIcon: ICONS.calendar,
    description: "Every-3-month on-site field engineering audit schedules, physical tower infrastructure integrity verification, RF alignment checks, and station environment surveys.",
    externalUrl: "https://pre-pm-2.vercel.app/",
    isExternal: true
  },
  {
    id: 4,
    orderIndex: 3,
    shortTitle: "4. Process Claims",
    fullTitle: "4. Process Equipment Warranty & Claims",
    badge: "Category: Equipment Claims & Warranty Management",
    icon: "fa-solid fa-shield-halved",
    svgIcon: ICONS.warranty,
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
    fullTitle: "6. Track DOPA Officials' Tenure",
    badge: "Category: DOPA Tenure Tracking",
    icon: "fa-solid fa-building-columns",
    svgIcon: ICONS.government,
    description: "Track the remaining tenure and operational missions of DOPA officials across the 181 USO stations network.",
    externalUrl: "https://wara5year.vercel.app/",
    isExternal: true
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
    externalUrl: "https://contion.vercel.app/",
    isExternal: true
  },
  {
    id: 9,
    orderIndex: 8,
    shortTitle: "9. Calculate Antenna Spacing",
    fullTitle: "9. Calculate Antenna Spacing (Antenna Separation & Colocation)",
    badge: "Category: Antenna Spacing Calculation",
    icon: "fa-solid fa-tower-broadcast",
    svgIcon: ICONS.antennaTower,
    description: "Calculate vertical and horizontal isolation distances, antenna separation spacing, and colocation interference mitigation for radio towers and SHF repeater stations.",
    externalUrl: "https://antenna-inky.vercel.app/",
    isExternal: true,
    showExternalIndicator: true
  }
];
