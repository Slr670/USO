'use client';

import React, { ReactNode } from 'react';
import { ModulesConfigProvider, useModulesConfig } from '../lib/modules-config';
import { I18nProvider } from '../lib/i18n';

/**
 * Connects ModulesConfig dynamic translation overrides into I18nProvider
 */
const I18nBridge: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { translationOverrides } = useModulesConfig();
  return <I18nProvider overrides={translationOverrides}>{children}</I18nProvider>;
};

/**
 * Global App Providers
 * Provides dynamic module configuration, admin passcode authentication, and i18n
 */
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ModulesConfigProvider>
      <I18nBridge>{children}</I18nBridge>
    </ModulesConfigProvider>
  );
};
