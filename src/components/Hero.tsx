/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/Hero.tsx
 * Purpose: Hero Component with Operations Command Banner & Full-Screen Video Background
 * Version: 3.0.11
 * ===================================================================
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);

  // Attempt unmuted autoplay on initial page load with graceful fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio track is enabled upon page load
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay with sound successfully initiated
          setIsMuted(false);
          setIsAudioBlocked(false);
        })
        .catch((error) => {
          // Browser autoplay restriction: sound autoplay was blocked
          console.warn(
            'Autoplay with sound was blocked by browser security policy. Falling back to muted playback:',
            error
          );
          setIsAudioBlocked(true);
          video.muted = true;
          setIsMuted(true);
          video.play().catch((fallbackError) => {
            console.error('Fallback muted playback failed:', fallbackError);
          });
        });
    }
  }, [videoSrc]);

  // Fallback listener: unmute video upon user's first document interaction
  useEffect(() => {
    if (!isAudioBlocked) return;

    const handleFirstInteraction = () => {
      const video = videoRef.current;
      if (video && video.muted) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsMuted(false);
            setIsAudioBlocked(false);
          })
          .catch((err) => {
            console.warn('Playback unmute after user interaction was prevented:', err);
          });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isAudioBlocked]);

  // Interactive toggle function for manual sound control
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsMuted(false);
          setIsAudioBlocked(false);
        })
        .catch((err) => {
          console.warn('Failed to toggle sound to unmuted:', err);
        });
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section className="container hero">
      {/* Full-Screen Background Video Container */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-background-video"
          autoPlay
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* Floating Audio Control Button */}
      <button
        type="button"
        className={`hero-audio-toggle ${isMuted ? 'muted' : 'unmuted'}`}
        onClick={toggleSound}
        aria-label={isMuted ? 'เปิดเสียงวิดีโอ (Unmute)' : 'ปิดเสียงวิดีโอ (Mute)'}
        title={isMuted ? 'คลิกเพื่อเปิดเสียง (Unmute)' : 'คลิกเพื่อปิดเสียง (Mute)'}
      >
        {isMuted ? (
          <>
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
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span className="audio-toggle-label">
              {isAudioBlocked ? 'คลิกเพื่อเปิดเสียง' : 'เปิดเสียง'}
            </span>
          </>
        ) : (
          <>
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
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <span className="audio-toggle-label">เสียงทำงาน</span>
          </>
        )}
      </button>

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

