/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Hero.tsx
 * Purpose: Hero Component with Operations Command Banner & Full-Screen Video Background
 * Version: 3.0.9
 * ===================================================================
 */

'use client';

import React from 'react';
import { HERO_BG_VIDEO_SRC } from '../lib/constants';

interface HeroProps {
  onExploreClick?: () => void;
  onVideoClick?: () => void;
  videoSrc?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  videoSrc = HERO_BG_VIDEO_SRC,
}) => {
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
            className="btn btn-primary"
            href="#systems"
            onClick={(e) => {
              if (onExploreClick) {
                e.preventDefault();
                onExploreClick();
              }
            }}
          >
            เข้าสู่ระบบงาน &rarr;
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

