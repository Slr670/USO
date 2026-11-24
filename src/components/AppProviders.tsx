'use client';

import React, { ReactNode } from 'react';
import { ModulesConfigProvider, useModulesConfig } from '../lib/modules-config';
import { I18nProvider } from '../lib/i18n';
import { PwaRegistrar } from './PwaRegistrar';

/**
 * Connects ModulesConfig dynamic translation overrides into I18nProvider
 */
const I18nBridge: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { translationOverrides } = useModulesConfig();
  return <I18nProvider overrides={translationOverrides}>{children}</I18nProvider>;
};

/**
 * Global App Providers
 * Provides dynamic module configuration, admin passcode authentication, i18n, and PWA registration
 */
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ModulesConfigProvider>
      <PwaRegistrar />
      <I18nBridge>{children}</I18nBridge>
    </ModulesConfigProvider>
  );
};
