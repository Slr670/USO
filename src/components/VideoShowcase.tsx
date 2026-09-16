/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/VideoShowcase.tsx
 * Purpose: Responsive Video Presentation Player & Showcase Metadata
 * Version: 3.0.0
 * ===================================================================
 */

'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';

export const VideoShowcase: React.FC = () => {
  const { t } = useI18n();

  return (
    <section
      id="video-section"
      className="dashboard-container video-section-container"
      aria-label="System Operations Video Presentation"
    >
      <div className="video-showcase-card">
        <div className="video-header-row">
          <div className="video-title-group">
            <div className="video-icon-pill" aria-hidden="true">
              <svg
                className="ui-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="video-heading-wrap">
              <span className="status-badge video-badge">
                {t('video.badge')}
              </span>
              <h2>{t('video.title')}</h2>
            </div>
          </div>

          <div className="video-meta-badges">
            <span className="video-hd-pill">
              <svg
                className="ui-icon video-hd-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>1080p Full HD</span>
            </span>
            <span className="video-spec-pill">60 FPS</span>
          </div>
        </div>

        <div className="video-player-wrapper">
          <video
            id="forth-master-video"
            className="responsive-video-player"
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
          >
            <source
              src="/FORTH_MASTER_Video_Final-Additional.mp4"
              type="video/mp4"
            />
            <p>{t('video.fallback')}</p>
          </video>
        </div>

        <div className="video-caption-bar">
          <div className="video-caption-left">
            <svg
              className="ui-icon video-caption-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p>{t('video.description')}</p>
          </div>

          <div className="video-caption-tags">
            <span className="video-tag-item">SHF Operations</span>
            <span className="video-tag-item">181 Stations</span>
          </div>
        </div>
      </div>
    </section>
  );
};
