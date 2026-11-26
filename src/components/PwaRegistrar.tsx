'use client';

import React, { useEffect } from 'react';
import { PWA_SW_URL, PWA_VERSION } from '../lib/constants';
import {
  isReceivingEndMissingError,
  safePostMessage,
  safeSendServiceWorkerMessage
} from '../lib/safe-messaging';

declare global {
  interface Window {
    __pwaVersion?: string;
    __pwaInstallPrompt?: Event | null;
  }
}

/**
 * Progressive Web App (PWA v2.0.0) Service Worker Registrar
 * - Initializes message listeners before registering /sw.js or calling postMessage
 * - Guards all Service Worker & external/extension messaging against unhandled rejections
 * - Safely suppresses transient "Could not establish connection. Receiving end does not exist." rejections
 */
export const PwaRegistrar: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;
    let activeRegistration: ServiceWorkerRegistration | null = null;
    const cleanupFns: Array<() => void> = [];

    window.__pwaVersion = PWA_VERSION;

    // Guard against unhandled promise rejections from disconnected extension content scripts
    // or closed Service Worker message ports ("Receiving end does not exist")
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isReceivingEndMissingError(event.reason)) {
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    cleanupFns.push(() => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    });

    const handleBeforeInstallPrompt = (event: Event) => {
      window.__pwaInstallPrompt = event;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    cleanupFns.push(() => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    });

    if (!('serviceWorker' in navigator)) {
      return () => {
        isMounted = false;
        cleanupFns.forEach((fn) => fn());
      };
    }

    // Service Workers require HTTPS or localhost secure contexts
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]';

    if (!window.isSecureContext && !isLocalhost) {
      return () => {
        isMounted = false;
        cleanupFns.forEach((fn) => fn());
      };
    }

    // 1. Initialize Service Worker message listener BEFORE registering or sending any postMessage
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      try {
        if (!event || !event.data || typeof event.data !== 'object') {
          return;
        }
        if (event.data.type === 'PWA_VERSION' && typeof event.data.version === 'string') {
          window.__pwaVersion = event.data.version;
        }
      } catch {
        // Ignore malformed incoming messages safely
      }
    };

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    cleanupFns.push(() => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    });

    const activateWaitingWorker = (worker: ServiceWorker | null | undefined) => {
      if (!isMounted || !worker || worker.state === 'redundant') {
        return;
      }
      if (navigator.serviceWorker.controller) {
        safePostMessage(worker, { type: 'SKIP_WAITING' });
      }
    };

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register(PWA_SW_URL, { scope: '/' }).catch(() => null);

        if (!isMounted || !registration) {
          return;
        }

        activeRegistration = registration;

        // If an updated worker is already waiting, notify it safely
        if (registration.waiting && registration.waiting.state === 'installed') {
          activateWaitingWorker(registration.waiting);
        }

        const handleUpdateFound = () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          const handleStateChange = () => {
            if (!isMounted) return;
            if (installingWorker.state === 'installed') {
              activateWaitingWorker(installingWorker);
            }
            if (
              installingWorker.state === 'activated' ||
              installingWorker.state === 'redundant'
            ) {
              installingWorker.removeEventListener('statechange', handleStateChange);
            }
          };

          installingWorker.addEventListener('statechange', handleStateChange);
          cleanupFns.push(() => {
            installingWorker.removeEventListener('statechange', handleStateChange);
          });
        };

        registration.addEventListener('updatefound', handleUpdateFound);
        cleanupFns.push(() => {
          registration.removeEventListener('updatefound', handleUpdateFound);
        });

        // Wait until the Service Worker is fully active & ready before performing a safe handshake
        await navigator.serviceWorker.ready.catch(() => null);
        if (isMounted && activeRegistration?.active) {
          await safeSendServiceWorkerMessage({ type: 'PWA_PING' }).catch(() => null);
        }
      } catch (err) {
        if (!isReceivingEndMissingError(err)) {
          console.warn('[PWA] Service Worker registration skipped or failed:', err);
        }
      }
    };

    if (document.readyState === 'complete') {
      void registerServiceWorker();
    } else {
      const onLoad = () => {
        void registerServiceWorker();
      };
      window.addEventListener('load', onLoad, { once: true });
      cleanupFns.push(() => {
        window.removeEventListener('load', onLoad);
      });
    }

    return () => {
      isMounted = false;
      cleanupFns.forEach((fn) => {
        try {
          fn();
        } catch {
          // Ignore cleanup errors
        }
      });
    };
  }, []);

  return null;
};
