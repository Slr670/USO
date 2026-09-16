/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/ModuleCard.tsx
 * Purpose: Interactive Card for Operational Module
 * Version: 3.0.14
 * ===================================================================
 */

'use client';

import React from 'react';
import type { OperationalModule } from '../lib/types';
import { useI18n } from '../lib/i18n';
import { ICONS } from '../lib/modules-data';

interface ModuleCardProps {
  module: OperationalModule;
  isActive: boolean;
  onSelect: (index: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isActive,
  onSelect
}) => {
  const { t } = useI18n();
  const key = `m${module.id}`;
  const shortTitle = t(`modules.${key}.shortTitle`);
  const tooltip = t(`modules.${key}.tooltip`);

  return (
    <button
      type="button"
      className={`card-btn ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(module.orderIndex)}
      role="tab"
      aria-selected={isActive}
      id={`btn-module-${module.orderIndex}`}
      title={tooltip}
    >
      {module.isExternal && (
        <span
          className="external-link-pill"
          title={t('actions.openNewTab')}
          dangerouslySetInnerHTML={{ __html: ICONS.externalArrow }}
          aria-hidden="true"
        />
      )}

      <div
        className="card-icon-box"
        dangerouslySetInnerHTML={{ __html: module.svgIcon }}
        aria-hidden="true"
      />

      <span className="card-label-text">{shortTitle}</span>
    </button>
  );
};
