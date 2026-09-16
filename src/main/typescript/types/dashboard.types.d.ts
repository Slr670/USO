/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/types/dashboard.types.d.ts
 * Purpose: Authoritative Ambient Type Definitions & Interfaces for SHF Dashboard & Landing Page
 * Version: 2.6.3
 * ===================================================================
 */

/**
 * JSX Intrinsic Elements declaration for TSX compilation
 */
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
    interface Element {
        [key: string]: any;
    }
}

declare namespace React {
    type FC<P = Record<string, unknown>> = (props: P & { key?: any; children?: any }) => any;
    type ReactNode = any;
    type CSSProperties = any;
}

declare const React: {
    createElement: (type: any, props?: any, ...children: any[]) => any;
    useState: <T>(initial: T | (() => T)) => [T, (val: T | ((prev: T) => T)) => void];
    useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
    useCallback: <T extends (...args: any[]) => any>(fn: T, deps?: any[]) => T;
    useMemo: <T>(factory: () => T, deps?: any[]) => T;
    Fragment: any;
};

declare const ReactDOM: {
    createRoot?: (container: Element | HTMLElement) => { render: (element: any) => void; unmount?: () => void };
    render?: (element: any, container: Element | HTMLElement) => void;
};

/**
 * Operational Module Specification Interface
 * Represents each of the 8 core operational domains in the SHF Network
 */
interface OperationalModule {
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
interface SvgIconRegistry {
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
    readonly signalTower?: string;
    readonly serverStack?: string;
    readonly shieldCheck?: string;
    readonly speedMeter?: string;
}

/**
 * Supported Language Codes for the Dashboard
 */
type LanguageCode = 'en' | 'th';

/**
 * Translation Dictionary Structure for Operational Modules
 */
interface TranslationModule {
    readonly shortTitle: string;
    readonly fullTitle: string;
    readonly badge: string;
    readonly description: string;
    readonly tooltip: string;
}

interface TranslationHero {
    readonly badge: string;
    readonly title: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
}

/**
 * Translation Dictionary Structure for Section Meta Bar
 */
interface TranslationSection {
    readonly title: string;
    readonly help: string;
    readonly details: string;
}

/**
 * Translation Dictionary Structure for Media Video Showcase
 */
interface TranslationVideo {
    readonly sectionTitle: string;
    readonly badge: string;
    readonly title: string;
    readonly description: string;
    readonly fallback: string;
}

/**
 * Translation Dictionary Structure for Action Buttons
 */
interface TranslationActions {
    readonly openPrimary: string;
    readonly openNewTab: string;
    readonly viewDetails: string;
}

/**
 * Translation Dictionary Structure for Footer
 */
interface TranslationFooter {
    readonly copyright: string;
    readonly architecture: string;
    readonly versionLabel: string;
}

/**
 * Complete Translation Bundle
 */
interface TranslationPayload {
    readonly hero: TranslationHero;
    readonly section: TranslationSection;
    readonly modules: Record<string, TranslationModule>;
    readonly video: TranslationVideo;
    readonly actions: TranslationActions;
    readonly footer: TranslationFooter;
}

interface I18nResourceBundle {
    readonly translation: TranslationPayload;
}

interface I18nResources {
    readonly en: I18nResourceBundle;
    readonly th: I18nResourceBundle;
}

/**
 * Extended HTML Container Element supporting React 18 Root
 */
interface ReactRootContainer extends HTMLElement {
    _reactRoot?: {
        render: (element: unknown) => void;
        unmount?: () => void;
    };
}

/**
 * Global Window and CommonJS Augmentations
 */
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
    applyTranslations?: (lng?: LanguageCode) => void;
    initDashboard?: () => void;
    initI18nEngine?: () => void;
    renderPanelDetails?: (item: OperationalModule) => void;
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
        createRoot?: (container: Element) => { render: (element: unknown) => void };
        render?: (element: unknown, container: Element) => void;
    };
    ReactI18next?: {
        initReactI18next?: unknown;
        useTranslation?: () => {
            t: (key: string, options?: unknown) => string;
            i18n: {
                language: string;
                changeLanguage: (lng: string) => void;
            };
        };
    };
}

declare const module: { exports: unknown } | undefined;
