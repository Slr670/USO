'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { useModulesConfig } from '../lib/modules-config';
import { USO_LOGO_SRC } from '../assets/uso-logo';
import { AdminAuthModal } from './AdminAuthModal';
import { AdminConfigModal } from './AdminConfigModal';

export const Header: React.FC = () => {
  const { language, setLanguage } = useI18n();
  const {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    isConfigModalOpen,
    openConfigModal,
    closeConfigModal,
    logout
  } = useModulesConfig();

  const handleGearClick = () => {
    // Ephemeral auth: always require passcode re-entry every single time the modal is opened
    logout();
    openAuthModal();
  };

  return (
    <>
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

            {/* Gear/Settings icon button for dynamic module configuration */}
            <button
              type="button"
              id="btn-admin-settings"
              className="admin-gear-btn"
              onClick={handleGearClick}
              aria-label="Dashboard Module Configuration Settings"
              title="Configure Modules (Passcode Required)"
            >
              <svg
                className="ui-icon-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Passcode Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          closeAuthModal();
          logout();
        }}
        onSuccess={() => {
          closeAuthModal();
          openConfigModal();
        }}
      />

      {/* Admin Module Configuration Panel / Modal */}
      <AdminConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => {
          closeConfigModal();
          logout();
        }}
      />
    </>
  );
};

