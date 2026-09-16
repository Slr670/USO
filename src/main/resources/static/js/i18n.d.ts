/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/i18n.ts
 * Purpose: Translation Engine using i18next + react-i18next
 *          Supports 100% English UI (Default) with Thai localization option
 * Version: 2.6.4
 * ===================================================================
 */
/**
 * Dual-language Translation Resources (English Default / Thai Localization)
 */
declare const I18N_RESOURCES: I18nResources;
/**
 * Module Keys Mapping
 */
declare const MODULE_KEYS: readonly string[];
/**
 * Get stored language from LocalStorage safely (defaults to 'en' for 100% English UI)
 */
declare function getStoredLanguage(): LanguageCode;
/**
 * Persist language code in LocalStorage safely
 */
declare function setStoredLanguage(lng: LanguageCode): void;
/**
 * Initialize i18next engine with react-i18next
 */
declare function initI18nEngine(): void;
/**
 * Translate key with options
 */
declare function t(key: string, options?: Record<string, unknown>): string;
/**
 * Switch system language
 */
declare function changeLanguage(lng: LanguageCode): void;
/**
 * Apply translations to DOM elements and module dataset
 */
declare function applyTranslations(lng?: LanguageCode): void;
/**
 * Fallback translation handler
 */
declare function applyFallbackTranslations(lng: LanguageCode): void;
//# sourceMappingURL=i18n.d.ts.map