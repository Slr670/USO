'use client';

import React, { useEffect } from 'react';
import { PWA_SW_URL, PWA_VERSION } from '../lib/constants';

declare global {
  interface Window {
    __pwaVersion?: string;
    __pwaInstallPrompt?: Event | null;
  }
}

/**
 * Progressive Web App (PWA v2.0.0) Service Worker Registrar
 * Registers /sw.js for offline caching and manages seamless lifecycle updates
 */
export const PwaRegistrar: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    window.__pwaVersion = PWA_VERSION;

    const handleBeforeInstallPrompt = (event: Event) => {
      window.__pwaInstallPrompt = event;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register(PWA_SW_URL, {
          scope: '/'
        });

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (
              installingWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              installingWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      } catch (err) {
        console.warn('[PWA] Service Worker registration skipped or failed:', err);
      }
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker, { once: true });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
};
