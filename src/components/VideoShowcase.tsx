/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/components/VideoShowcase.tsx
 * Purpose: Responsive Video Presentation Player & Showcase Metadata
 * Version: 3.0.12
 * ===================================================================
 */

'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useI18n } from '../lib/i18n';

export const VideoShowcase: React.FC = () => {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioBlocked, setIsAudioBlocked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Manual unmute handler for user click
  const handleManualUnmute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      setIsMuted(false);
      setIsAudioBlocked(false);
    }
  }, []);

  // Synchronize state with native video player events
  const handleVolumeChange = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const currentlyMuted = video.muted || video.volume === 0;
      setIsMuted(currentlyMuted);
      if (!currentlyMuted) {
        setIsAudioBlocked(false);
      }
    }
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const currentlyMuted = video.muted || video.volume === 0;
      setIsMuted(currentlyMuted);
    }
  }, []);

  // Immediate unmuted autoplay with policy-aware fallback and one-gesture unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cleanupListeners: (() => void) | null = null;

    // 1. Remove muted constraints and set full volume
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1.0;

    // 2. Attempt unmuted autoplay immediately upon page load
    const startPlayback = async () => {
      try {
        await video.play();
        // Browser allowed unmuted autoplay! Audio is playing right away.
        setIsAudioBlocked(false);
        setIsMuted(false);
      } catch (policyError) {
        console.warn(
          '[VideoShowcase] Unmuted autoplay prevented by browser policy (MEI/gesture requirement). Falling back to muted playback with immediate gesture unmuter:',
          policyError
        );

        // Fallback: start playing muted so video playback starts immediately without stall
        video.muted = true;
        try {
          await video.play();
        } catch (playError) {
          console.warn('[VideoShowcase] Fallback muted play failed:', playError);
        }

        setIsAudioBlocked(true);
        setIsMuted(true);

        // Handler to instantly unmute and enable audio on the very first user interaction anywhere
        const unlockAudioOnGesture = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            videoRef.current.play().catch(() => {});
            setIsMuted(false);
            setIsAudioBlocked(false);
          }
          detachListeners();
        };

        const detachListeners = () => {
          window.removeEventListener('click', unlockAudioOnGesture, true);
          window.removeEventListener('keydown', unlockAudioOnGesture, true);
          window.removeEventListener('touchstart', unlockAudioOnGesture, true);
          window.removeEventListener('pointerdown', unlockAudioOnGesture, true);
        };

        window.addEventListener('click', unlockAudioOnGesture, { capture: true, once: true });
        window.addEventListener('keydown', unlockAudioOnGesture, { capture: true, once: true });
        window.addEventListener('touchstart', unlockAudioOnGesture, { capture: true, once: true });
        window.addEventListener('pointerdown', unlockAudioOnGesture, { capture: true, once: true });

        cleanupListeners = detachListeners;
      }
    };

    startPlayback();

    return () => {
      if (cleanupListeners) {
        cleanupListeners();
      }
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
            <span
              className={`video-spec-pill video-audio-pill ${
                isMuted ? 'video-audio-muted' : 'video-audio-active'
              }`}
              title={isMuted ? t('video.enableSound') : t('video.soundActive')}
              onClick={isMuted ? handleManualUnmute : undefined}
              style={{ cursor: isMuted ? 'pointer' : 'default' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ui-icon video-audio-icon"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {!isMuted ? (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </>
                ) : (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                )}
              </svg>
              <span>{isMuted ? 'Muted' : 'Audio On'}</span>
            </span>
          </div>
        </div>

        <div className="video-player-wrapper">
          <video
            ref={videoRef}
            id="forth-master-video"
            className="responsive-video-player"
            controls
            autoPlay
            playsInline
            preload="auto"
            onVolumeChange={handleVolumeChange}
            onPlay={handlePlay}
          >
            <source
              src="/FORTH_MASTER_Video_Final-Additional.mp4"
              type="video/mp4"
            />
            <p>{t('video.fallback')}</p>
          </video>

          {/* Autoplay Policy Fallback Prompt: Enables sound with 1 click */}
          {isAudioBlocked && (
            <button
              type="button"
              className="video-unmute-prompt-btn"
              onClick={handleManualUnmute}
              aria-label={t('video.enableSound')}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ui-icon"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>{t('video.enableSound')}</span>
            </button>
          )}
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
