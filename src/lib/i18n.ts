'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { LanguageCode, I18nResources } from './types';

export const I18N_RESOURCES: I18nResources = {
  en: {
    translation: {
      nav: {
        title: "SHF Network Operations",
        subtitle: "Operations & Maintenance Command Center",
        statusLive: "Live Operational Telemetry"
      },
      hero: {
        badge: "Next-Gen Telemetry & Operations Command Hub",
        title: "Super High Frequency (SHF) Repeater Network Optimization Project",
        ctaPrimary: "Explore Operational Modules",
        ctaSecondary: "Watch Master Operations Video"
      },
      section: {
        title: "Operational Categories & System Services",
        help: "Select a module card to view operational details or access external systems.",
        details: "Module Details"
      },
      modules: {
        m1: {
          shortTitle: "1. Perform PM",
          fullTitle: "1. Perform Preventive Maintenance (PM)",
          badge: "Category: Preventive Maintenance",
          description: "Schedule and record periodic inspection logs for SHF repeater base stations, measure radio frequency (RF) signal levels, inspect feeder cables, antennas, and verify backup power systems across all sites.",
          tooltip: "Preventive Maintenance Operations (1. Perform PM)"
        },
        m2: {
          shortTitle: "2. Handle CM",
          fullTitle: "2. Handle Corrective Maintenance (CM)",
          badge: "Category: Corrective Maintenance & Emergency Response",
          description: "Open, track, and resolve incident tickets for SHF repeater equipment malfunctions and microwave link interruptions, dispatching technical teams within SLA-governed recovery windows.",
          tooltip: "Corrective Maintenance & Troubleshooting (2. Handle CM)"
        },
        m3: {
          shortTitle: "3. Quarterly Visits",
          fullTitle: "3. Conduct Quarterly Site Inspection Visits",
          badge: "Category: Quarterly Site Inspections",
          description: "Coordinate and manage quarterly on-site inspection visits to regional stations, consolidate stakeholder feedback, resolve operational issues, and evaluate network user satisfaction.",
          tooltip: "Quarterly Site Inspections & Field Audits (3. Quarterly Visits)"
        },
        m4: {
          shortTitle: "4. Process Claims",
          fullTitle: "4. Process Equipment & Warranty Claims",
          badge: "Category: Warranty & Equipment RMA",
          description: "Manage Return Merchandise Authorization (RMA) workflows for defective SHF transceiver modules, microwave feedhorns, and power supply units with equipment vendors, maintaining complete replacement audit trails.",
          tooltip: "Equipment & Warranty Claims Management (4. Process Claims)"
        },
        m5: {
          shortTitle: "5. Monitor System",
          fullTitle: "5. Monitor System & Radio Telemetry",
          badge: "Category: Network Telemetry & Real-Time Monitoring",
          description: "Real-time telemetry dashboard displaying network uptime, SHF radio link degradation (Link Down events), received signal level (RSL) thresholds, and centralized alert event logs.",
          tooltip: "System Telemetry & Network Monitoring (5. Monitor System)"
        },
        m6: {
          shortTitle: "6. DOPA Tenure",
          fullTitle: "6. Track DOPA Officials' Tenure",
          badge: "Category: DOPA Tenure Tracking",
          description: "Track the remaining tenure and operational missions of DOPA officials across the 181 USO stations network.",
          tooltip: "Track DOPA Officials' Tenure (6. DOPA Tenure)"
        },
        m7: {
          shortTitle: "7. Manage Inventory",
          fullTitle: "7. Manage Spare Parts & Inventory",
          badge: "Category: Spare Parts & Inventory Management",
          description: "Manage reserve inventory levels for SHF repeater spare parts, parabolic antennas, RF amplifiers, power converters, and auxiliary components, auditing requisition logs for PM and CM dispatches.",
          tooltip: "Inventory & Spare Parts Management (7. Manage Inventory)"
        },
        m8: {
          shortTitle: "8. Assets & Equipment",
          fullTitle: "8. Track Assets & Equipment Registry",
          badge: "Category: Asset & Equipment Registry",
          description: "Maintain comprehensive fixed-asset registration records for SHF telecommunication infrastructure, tracking Asset IDs, serial numbers, operational readiness, handover certificates, and equipment relocation histories.",
          tooltip: "Asset & Equipment Registry Management (8. Assets & Equipment)"
        }
      },
      video: {
        sectionTitle: "FORTH Master System Operations",
        badge: "System Demonstration & Media Presentation",
        description: "Comprehensive overview and instructional walkthrough of the Super High Frequency (SHF) Repeater Network system operations and maintenance procedures.",
        fallback: "Your browser does not support HTML5 video playback. Please update your browser."
      },
      actions: {
        openPrimary: "{{title}}",
        viewDetails: "Operational Procedures & SLA Specs"
      },
      footer: {
        copyright: "© 2026 SHF Repeater Network Operations & Maintenance Center. All rights reserved.",
        versionLabel: "Version:"
      }
    }
  },
  th: {
    translation: {
      nav: {
        title: "ศูนย์ปฏิบัติการโครงข่าย SHF",
        subtitle: "ศูนย์สั่งการและบำรุงรักษาโครงข่ายทวนสัญญาณ",
        statusLive: "ระบบโทรมาตรสดแบบเรียลไทม์"
      },
      hero: {
        badge: "ศูนย์บัญชาการและเฝ้าระวังโทรมาตรโครงข่ายยุคใหม่",
        title: "โครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF)",
        ctaPrimary: "สำรวจโมดูลปฏิบัติการทั้ง 8",
        ctaSecondary: "รับชมวิดีโอนำเสนอระบบ"
      },
      section: {
        title: "หมวดหมู่การปฏิบัติงานและบริการระบบ (Operational Categories)",
        help: "คลิกเลือกการ์ดเพื่อดูรายละเอียด หรือเข้าสู่ระบบบริการภายนอก",
        details: "รายละเอียดโมดูล"
      },
      modules: {
        m1: {
          shortTitle: "1. Perform PM",
          fullTitle: "1. ปฏิบัติการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance — PM)",
          badge: "หมวดหมู่งาน: บำรุงรักษาเชิงป้องกัน",
          description: "บันทึกแผนและรายงานการตรวจสอบอุปกรณ์ทวนสัญญาณ SHF ประจำรอบ, ตรวจวัดระดับความแรงสัญญาณ, ตรวจสอบสายนำสัญญาณ เสาอากาศ และระบบไฟฟ้าสำรองในแต่ละสถานีฐาน",
          tooltip: "งานบำรุงรักษาเชิงป้องกัน (1. Perform PM)"
        },
        m2: {
          shortTitle: "2. Handle CM",
          fullTitle: "2. ปฏิบัติการแก้ไขเหตุขัดข้อง (Corrective Maintenance — CM)",
          badge: "หมวดหมู่งาน: แก้ไขเหตุขัดข้องฉุกเฉิน",
          description: "การเปิดและติดตามใบแจ้งเหตุขัดข้อง (Incident Ticket) เมื่ออุปกรณ์ SHF ขัดข้อง หรือสัญญาณขาดหาย เพื่อให้ทีมวิศวกรและช่างเทคนิคเข้าพื้นที่แก้ไขตามกรอบเวลา SLA",
          tooltip: "งานซ่อมแซมแก้ไขเมื่อเกิดปัญหา (2. Handle CM)"
        },
        m3: {
          shortTitle: "3. Quarterly Visits",
          fullTitle: "3. ดำเนินการตรวจเยี่ยมทุก 3 เดือน (Conduct Quarterly Visits)",
          badge: "หมวดหมู่งาน: แผนลงพื้นที่ตรวจติดตาม",
          description: "ตารางนัดหมายการเข้าตรวจเยี่ยมหน่วยงานในพื้นที่ทุกไตรมาส รวบรวมข้อเสนอแนะ ปัญหาการใช้งาน และประเมินความพึงพอใจของผู้ใช้งานโครงข่าย",
          tooltip: "การเข้าตรวจเช็ก/เยี่ยมเยือนทุก 3 เดือน (3. Quarterly Visits)"
        },
        m4: {
          shortTitle: "4. Process Claims",
          fullTitle: "4. จัดการและยื่นเคลมอุปกรณ์ (Process Claims)",
          badge: "หมวดหมู่งาน: การรับประกันและส่งซ่อม",
          description: "ติดตามสถานะโมดูล SHF, สายเคเบิล, หรือชุดจ่ายไฟ (Power Unit) ที่ส่งเคลมกับคู่สัญญาหรือโรงงานผู้ผลิต พร้อมบันทึกประวัติการเปลี่ยนอะไหล่",
          tooltip: "การจัดการและยื่นเคลมอุปกรณ์/ประกัน (4. Process Claims)"
        },
        m5: {
          shortTitle: "5. Monitor System",
          fullTitle: "5. ตรวจสอบและเฝ้าระวังสถานะระบบ (Monitor System)",
          badge: "หมวดหมู่งาน: ตรวจสอบสถานะโครงข่าย",
          description: "แดชบอร์ดแสดงสถานะเวลาทำงานต่อเนื่อง (Uptime), ลิงก์สัญญาณ SHF ขาดหาย (Link Down), ระดับความแรงของคลื่นความถี่ SHF แบบเรียลไทม์ และบันทึกประวัติการแจ้งเตือน",
          tooltip: "การตรวจสอบและเฝ้าระวังสถานะระบบ (5. Monitor System)"
        },
        m6: {
          shortTitle: "6. DOPA Tenure",
          fullTitle: "6. ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง (Track DOPA Tenure)",
          badge: "หมวดหมู่งาน: วาระคงเหลือ (DOPA)",
          description: "ระบบติดตามวาระและภารกิจของเจ้าหน้าที่รัฐ กรมการปกครอง ประจำสถานีเครือข่าย USO รวม 181 สถานี",
          tooltip: "ติดตามวาระเจ้าหน้าที่รัฐ กรมการปกครอง (6. DOPA Tenure)"
        },
        m7: {
          shortTitle: "7. Manage Inventory",
          fullTitle: "7. บริหารจัดการคลังสินค้าและสต็อกอะไหล่ (Manage Inventory)",
          badge: "หมวดหมู่งาน: วัสดุและอุปกรณ์คงคลัง",
          description: "ตรวจนับจำนวนสต็อกอุปกรณ์ทวนสัญญาณ SHF สำรอง (Spare Parts), เสาอากาศ, ตัวแปลงไฟ, และอุปกรณ์เสริม พร้อมประวัติการเบิก-จ่ายสำหรับงานบำรุงรักษาเชิงป้องกัน (PM) และงานแก้ไขเหตุขัดข้อง (CM)",
          tooltip: "การบริหารจัดการคลังสินค้า/สต็อกอะไหล่ (7. Manage Inventory)"
        },
        m8: {
          shortTitle: "8. Assets & Equipment",
          fullTitle: "8. ติดตามและจัดการทะเบียนครุภัณฑ์ (Track Assets & Equipment)",
          badge: "หมวดหมู่งาน: ทะเบียนครุภัณฑ์และทรัพย์สิน",
          description: "ระบบบันทึกและจัดการทะเบียนครุภัณฑ์ อุปกรณ์สื่อสาร SHF หมายเลขครุภัณฑ์ (รหัสทรัพย์สิน/หมายเลขประจำเครื่อง), สถานะการใช้งาน, ประวัติการส่งมอบและโอนย้ายทรัพย์สิน",
          tooltip: "การจัดการทะเบียนครุภัณฑ์และทรัพย์สิน (8. Assets & Equipment)"
        }
      },
      video: {
        sectionTitle: "วิดีโอนำเสนอการปฏิบัติการระบบ FORTH Master",
        badge: "การสาธิตระบบและสื่อนำเสนอ",
        description: "ภาพรวมและขั้นตอนการปฏิบัติการโครงการเพิ่มประสิทธิภาพโครงข่ายสื่อสารด้วยอุปกรณ์ทวนสัญญาณผ่านคลื่นความถี่สูง (SHF) และกระบวนการบำรุงรักษา",
        fallback: "เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5 กรุณาอัปเดตเบราว์เซอร์"
      },
      actions: {
        openPrimary: "{{title}}",
        viewDetails: "รายละเอียดขั้นตอนและข้อกำหนด SLA"
      },
      footer: {
        copyright: "© 2026 ศูนย์ปฏิบัติการและบำรุงรักษาโครงข่าย SHF. สงวนลิขสิทธิ์ทั้งหมด.",
        versionLabel: "เวอร์ชัน:"
      }
    }
  }
};

export const MODULE_KEYS: readonly string[] = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];

/**
 * Nested key resolver for translations
 */
export function resolveTranslation(
  lng: LanguageCode,
  keyPath: string,
  variables?: Record<string, string>
): string {
  const resource = I18N_RESOURCES[lng]?.translation;
  if (!resource) return keyPath;

  const parts = keyPath.split('.');
  let current: any = resource;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English if missing in target language
      const fallbackResource = I18N_RESOURCES.en.translation;
      let fallbackCurrent: any = fallbackResource;
      for (const fbPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fbPart];
        } else {
          return keyPath;
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== 'string') {
    return keyPath;
  }

  let result = current;
  if (variables) {
    for (const [varName, varVal] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${varName}}}`, 'g'), varVal);
    }
  }

  return result;
}

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lng: LanguageCode) => void;
  t: (keyPath: string, variables?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shf_app_lang');
      if (stored === 'th' || stored === 'en') {
        setLangState(stored);
      }
    } catch {
      // Ignore localStorage security restriction in sandboxed iframes
    }
  }, []);

  const setLanguage = useCallback((lng: LanguageCode) => {
    setLangState(lng);
    try {
      localStorage.setItem('shf_app_lang', lng);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
      }
    } catch {
      // Ignore
    }
  }, []);

  const t = useCallback(
    (keyPath: string, variables?: Record<string, string>) => {
      return resolveTranslation(language, keyPath, variables);
    },
    [language]
  );

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (keyPath: string, variables?: Record<string, string>) =>
        resolveTranslation('en', keyPath, variables)
    };
  }
  return ctx;
}
