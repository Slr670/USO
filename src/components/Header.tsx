/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Header.tsx
 * Purpose: Top Navigation Header with Brand, Lang Switcher & Version Badge
 * Version: 3.0.3
 * ===================================================================
 */

'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { APP_VERSION } from '../lib/constants';
import { USO_LOGO_SRC } from '../assets/uso-logo';

export const Header: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <header className="dashboard-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="USO OPERATIONS PORTAL">
          <span className="brand-mark uso-image-mark">
            <img
              src={USO_LOGO_SRC}
              alt="USO Logo"
              width={42}
              height={40}
            />
          </span>
          <span className="brand-text">USO OPERATIONS PORTAL</span>
        </a>

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
