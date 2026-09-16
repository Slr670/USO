/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/types/dashboard.types.ts
 * Purpose: Authoritative Type Definitions & Interfaces for SHF Dashboard
 * Version: 2.5.0
 * ===================================================================
 */
/**
 * Operational Module Specification Interface
 * Represents each of the 8 core operational domains in the SHF Network
 */
export interface OperationalModule {
    readonly id: number;
    readonly orderIndex: number;
    readonly shortTitle: string;
    readonly fullTitle: string;
    readonly badge: string;
    readonly icon: string;
    readonly svgIcon: string;
    readonly description: string;
    readonly externalUrl: string;
    readonly isExternal: boolean;
}
/**
 * Registry of Scalable Vector Graphics (SVG) Icons
 * Strictly compliant with UI Icon Policy (Scalable Vector SVG, No Unicode Emojis)
 */
export interface SvgIconRegistry {
    readonly pm: string;
    readonly cm: string;
    readonly calendar: string;
    readonly warranty: string;
    readonly monitor: string;
    readonly government: string;
    readonly inventory: string;
    readonly assetEquipment: string;
    readonly externalArrow: string;
    readonly broadcastTower: string;
}
/**
 * Supported Language Codes for the Dashboard
 */
export type LanguageCode = 'en' | 'th';
/**
 * Translation Dictionary Structure for Operational Modules
 */
export interface TranslationModule {
    readonly shortTitle: string;
    readonly fullTitle: string;
    readonly badge: string;
    readonly description: string;
    readonly tooltip: string;
}
/**
 * Translation Dictionary Structure for Header Section
 */
export interface TranslationHeader {
    readonly mainTitle: string;
    readonly subTitle: string;
    readonly status: string;
    readonly logoTooltip: string;
    readonly versionTooltip: string;
}
/**
 * Translation Dictionary Structure for Section Meta Bar
 */
export interface TranslationSection {
    readonly title: string;
    readonly help: string;
}
/**
 * Translation Dictionary Structure for Media Video Showcase
 */
export interface TranslationVideo {
    readonly badge: string;
    readonly title: string;
    readonly description: string;
    readonly fallback: string;
}
/**
 * Translation Dictionary Structure for Action Buttons
 */
export interface TranslationActions {
    readonly openPrimary: string;
}
/**
 * Translation Dictionary Structure for Language Switcher
 */
export interface TranslationLang {
    readonly switchLangTitle: string;
    readonly enLabel: string;
    readonly thLabel: string;
}
/**
 * Translation Dictionary Structure for Footer
 */
export interface TranslationFooter {
    readonly copyright: string;
    readonly architecture: string;
    readonly versionLabel: string;
}
/**
 * Complete Translation Bundle
 */
export interface TranslationPayload {
    readonly header: TranslationHeader;
    readonly section: TranslationSection;
    readonly modules: Record<string, TranslationModule>;
    readonly video: TranslationVideo;
    readonly actions: TranslationActions;
    readonly lang: TranslationLang;
    readonly footer: TranslationFooter;
}
export interface I18nResourceBundle {
    readonly translation: TranslationPayload;
}
export interface I18nResources {
    readonly en: I18nResourceBundle;
    readonly th: I18nResourceBundle;
}
/**
 * Extended HTML Container Element supporting React 18 Root
 */
export interface ReactRootContainer extends HTMLElement {
    _reactRoot?: {
        render: (element: unknown) => void;
        unmount?: () => void;
    };
}
/**
 * Minimal Global Window Augmentation for Standalone & Browser Runtime
 */
declare global {
    interface Window {
        readonly APP_VERSION?: string;
        readonly ICONS?: SvgIconRegistry;
        readonly MENU_MODULES_DATA?: readonly OperationalModule[];
        readonly I18N_RESOURCES?: I18nResources;
        readonly MODULE_KEYS?: readonly string[];
        currentActiveIndex?: number;
        selectMenu?: (index: number, triggerRedirect?: boolean) => void;
        changeLanguage?: (lng: LanguageCode) => Promise<void> | void;
        t?: (key: string, options?: Record<string, unknown>) => string;
        applyTranslations?: () => void;
        initDashboard?: () => void;
        initI18nEngine?: () => void;
        i18next?: {
            init: (options: unknown, callback?: (err: unknown, t: unknown) => void) => Promise<unknown>;
            changeLanguage: (lng: string, callback?: (err: unknown, t: unknown) => void) => Promise<unknown>;
            t: (key: string, options?: unknown) => string;
            language: string;
        };
        React?: {
            createElement: (type: unknown, props?: unknown, ...children: unknown[]) => unknown;
            useState: <T>(initial: T) => [T, (val: T | ((prev: T) => T)) => void];
            useEffect: (effect: () => void | (() => void), deps?: unknown[]) => void;
        };
        ReactDOM?: {
            createRoot?: (container: Element) => {
                render: (element: unknown) => void;
            };
            render?: (element: unknown, container: Element) => void;
        };
    }
    const module: {
        exports: unknown;
    } | undefined;
}
//# sourceMappingURL=dashboard.types.d.ts.map