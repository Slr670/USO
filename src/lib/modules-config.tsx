'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode
} from 'react';
import type {
  OperationalModule,
  LanguageCode,
  ModuleItemCustomConfig,
  ModulesCustomConfigMap,
  ModulesConfigContextType
} from './types';
import { MENU_MODULES_DATA } from './modules-data';
import { I18N_RESOURCES } from './i18n';

/**
 * Administrative Passcode Requirement
 * Authenticates administrators to edit module metadata and URLs
 */
export const ADMIN_PASSCODE = '258025';

export const LOCAL_STORAGE_CONFIG_KEY = 'shf_modules_custom_config_v1';

/**
 * Generate default module configuration from authoritative datasets
 */
export function getDefaultModuleConfigs(): ModulesCustomConfigMap {
  const defaults: ModulesCustomConfigMap = {};

  for (const mod of MENU_MODULES_DATA) {
    const key = `m${mod.id}`;
    const enMod = I18N_RESOURCES.en.translation.modules[key];
    const thMod = I18N_RESOURCES.th.translation.modules[key];

    defaults[mod.id] = {
      id: mod.id,
      externalUrl: mod.externalUrl,
      en: {
        shortTitle: enMod?.shortTitle || mod.shortTitle,
        fullTitle: enMod?.fullTitle || mod.fullTitle,
        badge: enMod?.badge || mod.badge,
        description: enMod?.description || mod.description
      },
      th: {
        shortTitle: thMod?.shortTitle || mod.shortTitle,
        fullTitle: thMod?.fullTitle || mod.fullTitle,
        badge: thMod?.badge || mod.badge,
        description: thMod?.description || mod.description
      }
    };
  }

  return defaults;
}

/**
 * Transform custom config map into OperationalModule array for active language
 */
export function getOperationalModulesFromConfig(
  config: ModulesCustomConfigMap,
  language: LanguageCode = 'en'
): OperationalModule[] {
  return MENU_MODULES_DATA.map((baseMod) => {
    const custom = config[baseMod.id];
    if (!custom) return baseMod;

    const langData = custom[language] || custom.en;
    return {
      ...baseMod,
      shortTitle: langData.shortTitle || baseMod.shortTitle,
      fullTitle: langData.fullTitle || baseMod.fullTitle,
      badge: langData.badge || baseMod.badge,
      description: langData.description || baseMod.description,
      externalUrl: custom.externalUrl || baseMod.externalUrl
    };
  });
}

/**
 * Generate translation dictionary overrides for i18n
 */
export function getTranslationOverrides(
  config: ModulesCustomConfigMap
): Record<LanguageCode, Record<string, string>> {
  const overrides: Record<LanguageCode, Record<string, string>> = {
    en: {},
    th: {}
  };

  for (const [idStr, custom] of Object.entries(config)) {
    const key = `m${idStr}`;
    if (custom.en) {
      if (custom.en.shortTitle) overrides.en[`modules.${key}.shortTitle`] = custom.en.shortTitle;
      if (custom.en.fullTitle) overrides.en[`modules.${key}.fullTitle`] = custom.en.fullTitle;
      if (custom.en.badge) overrides.en[`modules.${key}.badge`] = custom.en.badge;
      if (custom.en.description) overrides.en[`modules.${key}.description`] = custom.en.description;
    }
    if (custom.th) {
      if (custom.th.shortTitle) overrides.th[`modules.${key}.shortTitle`] = custom.th.shortTitle;
      if (custom.th.fullTitle) overrides.th[`modules.${key}.fullTitle`] = custom.th.fullTitle;
      if (custom.th.badge) overrides.th[`modules.${key}.badge`] = custom.th.badge;
      if (custom.th.description) overrides.th[`modules.${key}.description`] = custom.th.description;
    }
  }

  return overrides;
}

const ModulesConfigContext = createContext<
  (ModulesConfigContextType & { translationOverrides: Record<LanguageCode, Record<string, string>> }) | null
>(null);

export const ModulesConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ModulesCustomConfigMap>(() => getDefaultModuleConfigs());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load persisted configuration from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          // Merge defaults with stored custom configs to preserve missing keys
          const defaults = getDefaultModuleConfigs();
          const merged: ModulesCustomConfigMap = { ...defaults };
          for (const key of Object.keys(defaults)) {
            const id = Number(key);
            if (parsed[id]) {
              merged[id] = {
                ...defaults[id],
                ...parsed[id],
                en: { ...defaults[id].en, ...(parsed[id].en || {}) },
                th: { ...defaults[id].th, ...(parsed[id].th || {}) }
              };
            }
          }
          setConfig(merged);
        }
      }
    } catch (e) {
      console.warn('Failed to read modules config from localStorage:', e);
    }
  }, []);

  const openAuthModal = useCallback(() => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(false);
  }, []);
  const openConfigModal = useCallback(() => setIsConfigModalOpen(true), []);
  const closeConfigModal = useCallback(() => {
    setIsAuthenticated(false);
    setIsConfigModalOpen(false);
  }, []);

  const authenticate = useCallback((passcode: string): boolean => {
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsConfigModalOpen(false);
    setIsAuthModalOpen(false);
  }, []);

  const updateModuleConfig = useCallback((id: number, updates: Partial<ModuleItemCustomConfig>) => {
    setConfig((prev) => {
      const current = prev[id] || getDefaultModuleConfigs()[id];
      const updatedItem: ModuleItemCustomConfig = {
        ...current,
        ...updates,
        en: { ...current.en, ...(updates.en || {}) },
        th: { ...current.th, ...(updates.th || {}) }
      };
      const newMap: ModulesCustomConfigMap = {
        ...prev,
        [id]: updatedItem
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(newMap));
      } catch (e) {
        console.warn('Failed to persist module config:', e);
      }
      return newMap;
    });
  }, []);

  const saveAllConfig = useCallback((newConfig: ModulesCustomConfigMap) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Failed to persist all modules config:', e);
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultModuleConfigs();
    setConfig(defaults);
    try {
      localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
    } catch (e) {
      console.warn('Failed to remove custom config from localStorage:', e);
    }
  }, []);

  const getModules = useCallback(
    (language: LanguageCode) => {
      return getOperationalModulesFromConfig(config, language);
    },
    [config]
  );

  const translationOverrides = useMemo(() => {
    return getTranslationOverrides(config);
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      updateModuleConfig,
      saveAllConfig,
      resetToDefaults,
      getModules,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      isConfigModalOpen,
      openConfigModal,
      closeConfigModal,
      isAuthenticated,
      authenticate,
      logout,
      translationOverrides
    }),
    [
      config,
      updateModuleConfig,
      saveAllConfig,
      resetToDefaults,
      getModules,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      isConfigModalOpen,
      openConfigModal,
      closeConfigModal,
      isAuthenticated,
      authenticate,
      logout,
      translationOverrides
    ]
  );

  return (
    <ModulesConfigContext.Provider value={value}>
      {children}
    </ModulesConfigContext.Provider>
  );
};

export function useModulesConfig(): ModulesConfigContextType & {
  translationOverrides: Record<LanguageCode, Record<string, string>>;
} {
  const ctx = useContext(ModulesConfigContext);
  if (!ctx) {
    const defaults = getDefaultModuleConfigs();
    return {
      config: defaults,
      updateModuleConfig: () => {},
      saveAllConfig: () => {},
      resetToDefaults: () => {},
      getModules: (lang: LanguageCode) => getOperationalModulesFromConfig(defaults, lang),
      isAuthModalOpen: false,
      openAuthModal: () => {},
      closeAuthModal: () => {},
      isConfigModalOpen: false,
      openConfigModal: () => {},
      closeConfigModal: () => {},
      isAuthenticated: false,
      authenticate: (code: string) => code.trim() === ADMIN_PASSCODE,
      logout: () => {},
      translationOverrides: getTranslationOverrides(defaults)
    };
  }
  return ctx;
}
