'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { HERO_BG_VIDEO_SRC } from '../lib/constants';

interface HeroProps {
  onExploreClick?: () => void;
  onVideoClick?: () => void;
  videoSrc?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onVideoClick,
  videoSrc = HERO_BG_VIDEO_SRC,
}) => {
  const { t } = useI18n();

  return (
    <section className="container hero">
      {/* Full-Screen Background Video Container */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          className="hero-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-inner">
        <div className="eyebrow">
          <span className="eyebrow-dash" aria-hidden="true" />
          <span>USO TELECOMMUNICATION OPERATIONS</span>
        </div>
        <h1 className="hero-title">
          <div className="uso-brand-group">
            <span className="uso-word" data-text="USO">
              USO
            </span>
            <span className="uso-divider-glow" aria-hidden="true" />
          </div>
          <span className="thai-title portal-title">
            <span className="thai-line portal-line">OPERATIONS</span>
            <span className="thai-line thai-accent portal-accent">PORTAL</span>
          </span>
        </h1>
        <p className="lead">
          ศูนย์กลางบริหารงานและโครงสร้างพื้นฐานโทรคมนาคม เชื่อมโยงงานบำรุงรักษา การเยี่ยมเยือน การเคลม การมอนิเตอร์ งานคลัง และครุภัณฑ์ไว้ในประสบการณ์เดียวที่ทันสมัย เรียบหรู และใช้งานง่าย
        </p>
        <div className="actions">
          <a
            id="btn-enter-system"
            className="btn btn-primary"
            href="#systems"
            onClick={(e) => {
              if (onExploreClick) {
                e.preventDefault();
                onExploreClick();
              }
            }}
            title={t('hero.enterSystem')}
            aria-label={t('hero.enterSystem')}
          >
            {t('hero.enterSystem')} &rarr;
          </a>
          <a
            id="btn-view-presentation"
            className="btn btn-secondary"
            href="#video-section"
            onClick={(e) => {
              if (onVideoClick) {
                e.preventDefault();
                onVideoClick();
              } else {
                const el = document.getElementById('video-section');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            title={t('hero.viewPresentation')}
            aria-label={t('hero.viewPresentation')}
          >
            <svg
              className="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              width="18"
              height="18"
            >
              <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" />
            </svg>
            <span>{t('hero.viewPresentation')}</span>
          </a>
        </div>
        <div className="quick-list">
          <span>รวมข้อมูลเป็นศูนย์กลาง</span>
          <span>รองรับทุกหน้าจอ</span>
          <span>เข้าถึงเมนูได้รวดเร็ว</span>
        </div>
      </div>
    </section>
  );
};

