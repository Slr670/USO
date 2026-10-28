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
import { I18N_RESOURCES } from './i18n-resources';
import { ADMIN_PASSCODE, LOCAL_STORAGE_CONFIG_KEY } from './config-constants';

export { ADMIN_PASSCODE, LOCAL_STORAGE_CONFIG_KEY };

/**
 * Generate default module configuration from authoritative datasets
 */
export function getDefaultModuleConfigs(): ModulesCustomConfigMap {
  const defaults: ModulesCustomConfigMap = {};

  for (const mod of MENU_MODULES_DATA) {
    const key = `m${mod.id}`;
    const enMod = I18N_RESOURCES?.en?.translation?.modules?.[key as keyof typeof I18N_RESOURCES['en']['translation']['modules']];
    const thMod = I18N_RESOURCES?.th?.translation?.modules?.[key as keyof typeof I18N_RESOURCES['th']['translation']['modules']];

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
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Helper to merge stored/remote config with authoritative defaults
  const mergeRemoteConfig = useCallback((remote: any): ModulesCustomConfigMap => {
    const defaults = getDefaultModuleConfigs();
    if (!remote || typeof remote !== 'object') return defaults;
    const merged: ModulesCustomConfigMap = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const id = Number(key);
      if (remote[id]) {
        merged[id] = {
          ...defaults[id],
          ...remote[id],
          en: { ...defaults[id].en, ...(remote[id].en || {}) },
          th: { ...defaults[id].th, ...(remote[id].th || {}) }
        };
      }
    }
    return merged;
  }, []);

  // Fetch latest configuration from shared backend endpoint
  const refreshConfig = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      const res = await fetch('/api/v1/modules/config', {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ADMIN_PASSCODE}`,
          'x-admin-key': ADMIN_PASSCODE,
          'x-passcode': ADMIN_PASSCODE
        }
      });

      if (res.ok) {
        const payload = await res.json();
        const remoteData = payload?.data || payload;
        if (remoteData && typeof remoteData === 'object') {
          const merged = mergeRemoteConfig(remoteData);
          setConfig(merged);
          setLastSyncedAt(new Date());
          setSyncStatus('synced');
          try {
            localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(merged));
          } catch (e) {
            console.warn('Failed to cache modules config in localStorage:', e);
          }
        }
      } else {
        console.warn(`[modules-config] Backend returned non-200 status (${res.status}) on config fetch.`);
        setSyncStatus('error');
      }
    } catch (e) {
      console.warn('Network error while fetching shared modules config:', e);
      setSyncStatus('error');
    }
  }, [mergeRemoteConfig]);

  // Initial load: instant hydration from localStorage followed by backend fetch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setConfig(mergeRemoteConfig(parsed));
        }
      }
    } catch (e) {
      console.warn('Failed to read modules config from localStorage:', e);
    }

    // Always fetch authoritative configuration from shared backend on page load
    refreshConfig();

    // Re-synchronize when window gains focus (multi-tab/multi-user real-time sync)
    const handleFocus = () => {
      refreshConfig();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [mergeRemoteConfig, refreshConfig]);

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

  const saveAllConfig = useCallback(
    async (newConfig: ModulesCustomConfigMap): Promise<boolean> => {
      // 1. Optimistic local update & client storage cache
      setConfig(newConfig);
      try {
        localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(newConfig));
      } catch (e) {
        console.warn('Failed to persist module config to localStorage:', e);
      }

      // 2. Global shared backend synchronization
      try {
        setSyncStatus('syncing');
        const res = await fetch('/api/v1/modules/config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ADMIN_PASSCODE}`,
            'x-admin-key': ADMIN_PASSCODE,
            'x-passcode': ADMIN_PASSCODE
          },
          body: JSON.stringify({
            config: newConfig,
            passcode: ADMIN_PASSCODE,
            adminKey: ADMIN_PASSCODE,
            token: ADMIN_PASSCODE
          })
        });

        if (res.ok) {
          setSyncStatus('synced');
          setLastSyncedAt(new Date());
          return true;
        } else {
          console.error('Failed to save to shared backend. HTTP status:', res.status);
          setSyncStatus('error');
          return false;
        }
      } catch (err) {
        console.error('Network error during shared backend persistence:', err);
        setSyncStatus('error');
        return false;
      }
    },
    []
  );

  const updateModuleConfig = useCallback(
    (id: number, updates: Partial<ModuleItemCustomConfig>) => {
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
        // Trigger global persistence
        saveAllConfig(newMap);
        return newMap;
      });
    },
    [saveAllConfig]
  );

  const resetToDefaults = useCallback(async (): Promise<boolean> => {
    const defaults = getDefaultModuleConfigs();
    setConfig(defaults);

    // Clear client storage
    try {
      localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
    } catch (e) {
      console.warn('Failed to remove custom config from localStorage:', e);
    }

    // Reset shared backend storage
    try {
      setSyncStatus('syncing');
      const res = await fetch('/api/v1/modules/config', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ADMIN_PASSCODE}`,
          'x-admin-key': ADMIN_PASSCODE,
          'x-passcode': ADMIN_PASSCODE
        },
        body: JSON.stringify({
          passcode: ADMIN_PASSCODE,
          adminKey: ADMIN_PASSCODE,
          token: ADMIN_PASSCODE
        })
      });

      if (res.ok) {
        setSyncStatus('synced');
        setLastSyncedAt(new Date());
        return true;
      } else {
        setSyncStatus('error');
        return false;
      }
    } catch (err) {
      console.error('Network error during shared backend reset:', err);
      setSyncStatus('error');
      return false;
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
      isSyncing: syncStatus === 'syncing',
      syncStatus,
      lastSyncedAt,
      refreshConfig,
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
      syncStatus,
      lastSyncedAt,
      refreshConfig,
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
      isSyncing: false,
      syncStatus: 'synced',
      lastSyncedAt: null,
      refreshConfig: async () => {},
      translationOverrides: getTranslationOverrides(defaults)
    };
  }
  return ctx;
}
