/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/ModulesSection.tsx
 * Purpose: 8-Module Grid & Active Content Details Panel
 * Version: 3.0.0
 * ===================================================================
 */

'use client';

import React from 'react';
import type { OperationalModule } from '../lib/types';
import { useI18n } from '../lib/i18n';
import { ModuleCard } from './ModuleCard';
import { ICONS } from '../lib/modules-data';

interface ModulesSectionProps {
  modules: readonly OperationalModule[];
  activeIndex: number;
  onSelectModule: (index: number) => void;
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({
  modules,
  activeIndex,
  onSelectModule
}) => {
  const { t } = useI18n();

  const activeModule = modules[activeIndex] || modules[0];
  const activeKey = activeModule ? `m${activeModule.id}` : 'm1';

  const panelBadge = t(`modules.${activeKey}.badge`);
  const panelTitle = t(`modules.${activeKey}.fullTitle`);
  const panelDesc = t(`modules.${activeKey}.description`);
  const openActionText = t('actions.openPrimary', { title: activeModule ? t(`modules.${activeKey}.shortTitle`) : '' });

  const handleLaunchPortal = () => {
    if (activeModule && activeModule.externalUrl) {
      window.open(activeModule.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="modules-section" className="dashboard-container">
      <div className="section-info-bar">
        <div className="section-label-text">
          <svg
            className="ui-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>{t('section.title')}</span>
        </div>
        <div className="section-help-text">
          {t('section.help')}
        </div>
      </div>

      <div
        className="grid-container"
        role="tablist"
        aria-label="SHF Operations Directory"
      >
        {modules.map((m, idx) => (
          <ModuleCard
            key={m.id}
            module={m}
            isActive={idx === activeIndex}
            onSelect={onSelectModule}
          />
        ))}
      </div>

      {activeModule && (
        <div
          id="dashboard-content-panel"
          className="content-panel"
          role="region"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Module Operations Details"
        >
          <div className="panel-header-row">
            <span className="panel-eyebrow">{t('section.details')}</span>
            <span id="section-badge" className="status-badge">
              {panelBadge}
            </span>
          </div>

          <div className="panel-body-content">
            <div
              id="display-icon"
              className="panel-icon-svg-wrap"
              dangerouslySetInnerHTML={{ __html: activeModule.svgIcon }}
              aria-hidden="true"
            />
            <div className="panel-text-wrap">
              <h2 id="display-title" className="panel-main-heading">
                {panelTitle}
              </h2>
              <p id="display-desc" className="panel-description">
                {panelDesc}
              </p>
            </div>
          </div>

          <div id="panel-action-container" className="panel-action-area">
            {activeModule.isExternal && activeModule.externalUrl && (
              <>
                <span className="panel-action-hint">{t('actions.openNewTab')}</span>
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={handleLaunchPortal}
                  title={panelTitle}
                  aria-label={openActionText}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: ICONS.externalArrow }}
                    aria-hidden="true"
                  />
                  <span>{openActionText}</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
