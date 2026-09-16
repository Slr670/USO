/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Footer.tsx
 * Purpose: Dashboard Footer with System Architecture & Version Badge
 * Version: 3.0.0
 * ===================================================================
 */

'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { APP_VERSION } from '../lib/constants';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="dashboard-footer">
      <div className="footer-inner">
        <div>{t('footer.copyright')}</div>
        <div>
          <span>{t('footer.architecture')}</span>
          {' | '}
          <span>{t('footer.versionLabel')}</span>{' '}
          <strong className="app-version-text">v{APP_VERSION}</strong>
        </div>
      </div>
    </footer>
  );
};
