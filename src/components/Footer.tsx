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
          <span>{t('footer.versionLabel')}</span>{' '}
          <strong className="app-version-text">v{APP_VERSION}</strong>
        </div>
      </div>
    </footer>
  );
};
