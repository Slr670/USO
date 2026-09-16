/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Hero.tsx
 * Purpose: Hero Component with Operations Command Banner & Full-Screen Video Background
 * Version: 3.0.8
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
        <div className="eyebrow">USO TELECOMMUNICATION OPERATIONS</div>
        <h1 className="hero-title">
          <span className="uso-word" data-text="USO">
            USO
          </span>
          <span className="thai-title">
            <span className="thai-line">ศูนย์ปฏิบัติการ</span>
            <span className="thai-line thai-accent">อัจฉริยะ</span>
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

