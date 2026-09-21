/**
 * Operational Module Specification Interface
 * Represents each of the core operational domains in the SHF Network
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
  readonly showExternalIndicator?: boolean;
}

/**
 * Scalable Vector Graphics (SVG) Icon Registry
 * Adheres to UI Icon Policy (Scalable Vector SVG, No Unicode Emojis)
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
  readonly signalTower?: string;
  readonly serverStack?: string;
  readonly shieldCheck?: string;
  readonly speedMeter?: string;
  readonly antennaTower: string;
}

/**
 * Supported Language Codes
 */
export type LanguageCode = 'en' | 'th';

/**
 * Translation Sub-dictionaries
 */
export interface TranslationModule {
  readonly shortTitle: string;
  readonly fullTitle: string;
  readonly badge: string;
  readonly description: string;
  readonly tooltip: string;
}

export interface TranslationHero {
  readonly badge: string;
  readonly title: string;
  readonly ctaPrimary: string;
  readonly ctaSecondary: string;
  readonly enterSystem: string;
}

export interface TranslationSection {
  readonly title: string;
  readonly help: string;
  readonly details: string;
}

export interface TranslationVideo {
  readonly sectionTitle: string;
  readonly badge: string;
  readonly description: string;
  readonly fallback: string;
}

export interface TranslationActions {
  readonly openPrimary: string;
  readonly viewDetails: string;
}

export interface TranslationFooter {
  readonly copyright: string;
  readonly versionLabel: string;
}

export interface TranslationNav {
  readonly title: string;
  readonly subtitle: string;
  readonly statusLive: string;
}

export interface TranslationPayload {
  readonly nav: TranslationNav;
  readonly hero: TranslationHero;
  readonly section: TranslationSection;
  readonly modules: Record<string, TranslationModule>;
  readonly video: TranslationVideo;
  readonly actions: TranslationActions;
  readonly footer: TranslationFooter;
}

export interface I18nResources {
  readonly en: { readonly translation: TranslationPayload };
  readonly th: { readonly translation: TranslationPayload };
}

/**
 * Backend API Response Envelope
 */
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: string;
  readonly version: string;
}

/**
 * Dashboard Service Contract (replacing Java DashboardService interface)
 */
export interface IDashboardService {
  getAllModules(): OperationalModule[];
  getModuleByOrderIndex(orderIndex: number): OperationalModule | undefined;
  getModuleById(id: number): OperationalModule | undefined;
  getDefaultModule(): OperationalModule;
}
