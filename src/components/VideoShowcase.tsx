'use client';

import React, { useRef, useEffect } from 'react';
import { useI18n } from '../lib/i18n';

export const VideoShowcase: React.FC = () => {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay with unmuted audio default whenever policy allows; fallback to muted + interaction unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasStarted = false;

    // Enable audio by default whenever browser policy allows
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasStarted = true;
        })
        .catch(() => {
          // If unmuted autoplay is restricted by browser policy, fall back to muted autoplay
          if (!hasStarted) {
            video.muted = true;
            video.play().catch(() => {});
            attachInteractionListener();
          }
        });
    }

    // Enable audio upon first explicit user interaction
    const enableAudioOnInteraction = () => {
      if (video) {
        video.muted = false;
        video.volume = 1.0;
      }
      detachInteractionListener();
    };

    const interactionEvents = ['click', 'keydown', 'touchstart', 'pointerdown'];
    let listenersAttached = false;

    const attachInteractionListener = () => {
      if (listenersAttached) return;
      listenersAttached = true;
      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, enableAudioOnInteraction, {
          capture: true,
          once: true,
          passive: true
        });
      });
    };

    const detachInteractionListener = () => {
      if (!listenersAttached) return;
      listenersAttached = false;
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, enableAudioOnInteraction, true);
      });
    };

    return () => {
      detachInteractionListener();
    };
  }, []);

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
            </div>
          </div>
        </div>

        <div className="video-player-wrapper">
          <video
            ref={videoRef}
            id="forth-master-video"
            className="responsive-video-player"
            controls
            autoPlay
            loop
            playsInline
            preload="auto"
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
