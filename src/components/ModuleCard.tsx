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

  const handleClick = () => {
    onSelect(module.orderIndex);
    if (module.id === 9 && module.externalUrl) {
      window.open(module.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      className={`card-btn ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      role="tab"
      aria-selected={isActive}
      id={`btn-module-${module.orderIndex}`}
      title={tooltip}
    >
      {module.showExternalIndicator && (
        <span
          className="card-ext-badge"
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
