/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Hero.tsx
 * Purpose: Hero Component with Telemetry Badge & Action Buttons
 * Version: 3.0.0
 * ===================================================================
 */

'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';

interface HeroProps {
  onExploreClick: () => void;
  onVideoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVideoClick }) => {
  const { t } = useI18n();

  return (
    <section className="landing-hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-badge-container">
          <span className="hero-telemetry-badge">
            <span className="badge-pulse-indicator" aria-hidden="true" />
            <span>{t('hero.badge')}</span>
          </span>
        </div>

        <h1 className="hero-headline">{t('hero.title')}</h1>

        <div className="hero-cta-group">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={onExploreClick}
          >
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
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>{t('hero.ctaPrimary')}</span>
          </button>

          <button
            type="button"
            className="btn-hero-secondary"
            onClick={onVideoClick}
          >
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
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{t('hero.ctaSecondary')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
