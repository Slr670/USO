/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Header.tsx
 * Purpose: Top Navigation Header with Brand, Lang Switcher & Version Badge
 * Version: 3.0.0
 * ===================================================================
 */

'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { ICONS } from '../lib/modules-data';
import { APP_VERSION } from '../lib/constants';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="dashboard-header">
      <div className="header-inner">
        <div className="header-brand">
          <div
            className="brand-logo-circle"
            dangerouslySetInnerHTML={{ __html: ICONS.broadcastTower }}
            aria-hidden="true"
          />
          <div className="brand-titles">
            <h1>{t('nav.title')}</h1>
            <p>{t('nav.subtitle')}</p>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            type="button"
            className={`lang-btn ${language === 'th' ? 'active' : ''}`}
            onClick={() => setLanguage('th')}
            aria-label="สลับเป็นภาษาไทย"
          >
            TH
          </button>

          <div className="version-pill" title={`Authoritative Version: v${APP_VERSION}`}>
            <span className="version-indicator-dot" aria-hidden="true" />
            <span>v{APP_VERSION}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
