/**
 * Safe Messaging & External/Extension Communication Guards
 * Prevents "Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist."
 * across PWA Service Worker postMessage calls and browser extension/external channels.
 */

export interface PostMessageTarget {
  state?: string;
  postMessage?: {
    (message: unknown): void;
    (message: unknown, transfer: Transferable[]): void;
  };
}

const RECEIVING_END_ERROR_PATTERNS: readonly RegExp[] = [
  /could not establish connection/i,
  /receiving end does not exist/i,
  /extension context invalidated/i,
  /the message port closed before a response was received/i,
  /message channel closed before a response was received/i
];

/**
 * Extracts a normalized message string from any thrown value or rejection reason
 */
export function extractErrorMessage(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message || '';
  if (typeof error === 'object' && 'message' in error) {
    const msg = (error as { message?: unknown }).message;
    return typeof msg === 'string' ? msg : '';
  }
  try {
    return String(error);
  } catch {
    return '';
  }
}

/**
 * Identifies transient extension or closed-port messaging connection errors
 */
export function isReceivingEndMissingError(error: unknown): boolean {
  const message = extractErrorMessage(error);
  if (!message) return false;
  return RECEIVING_END_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * Safely invokes postMessage on a ServiceWorker, MessagePort, or Window target.
 * Verifies target readiness (never posts to a redundant worker) and catches synchronous errors.
 */
export function safePostMessage(
  target: PostMessageTarget | null | undefined,
  message: unknown,
  transfer?: Transferable[]
): boolean {
  if (!target || typeof target.postMessage !== 'function') {
    return false;
  }

  if (typeof target.state === 'string' && target.state === 'redundant') {
    return false;
  }

  try {
    if (transfer && transfer.length > 0) {
      target.postMessage(message, transfer);
    } else {
      target.postMessage(message);
    }
    return true;
  } catch (err) {
    if (!isReceivingEndMissingError(err)) {
      console.warn('[PWA] Safe postMessage warning:', extractErrorMessage(err));
    }
    return false;
  }
}

/**
 * Safely sends a request/response message to the active PWA Service Worker
 * only after navigator.serviceWorker.ready resolves and verifies an active receiver exists.
 * Always resolves (never produces an unhandled promise rejection).
 */
export async function safeSendServiceWorkerMessage<T = unknown>(
  message: Record<string, unknown>,
  timeoutMs: number = 2500
): Promise<T | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready.catch(() => null);
    const activeWorker = registration?.active || navigator.serviceWorker.controller;

    if (!activeWorker || activeWorker.state === 'redundant') {
      return null;
    }

    if (typeof MessageChannel === 'undefined') {
      safePostMessage(activeWorker, message);
      return null;
    }

    return await new Promise<T | null>((resolve) => {
      let settled = false;
      const channel = new MessageChannel();

      const finish = (value: T | null) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try {
          channel.port1.onmessage = null;
          channel.port1.onmessageerror = null;
          channel.port1.close();
        } catch {
          // Ignore port close errors
        }
        resolve(value);
      };

      const timer = setTimeout(() => finish(null), timeoutMs);

      channel.port1.onmessage = (event: MessageEvent) => {
        finish((event?.data as T) ?? null);
      };

      channel.port1.onmessageerror = () => {
        finish(null);
      };

      const sent = safePostMessage(activeWorker, message, [channel.port2]);
      if (!sent) {
        finish(null);
      }
    });
  } catch (err) {
    if (!isReceivingEndMissingError(err)) {
      console.warn('[PWA] Service Worker message failed safely:', extractErrorMessage(err));
    }
    return null;
  }
}

interface ExtensionRuntimeLike {
  id?: string;
  lastError?: { message?: string };
  sendMessage?: (...args: unknown[]) => unknown;
}

/**
 * Safely communicates with browser extension runtimes (chrome.runtime / browser.runtime)
 * if present. Wraps both callback-based and promise-based sendMessage APIs in try/catch
 * and .catch() so missing receivers never trigger unhandled promise rejections.
 */
export async function safeSendExternalMessage<T = unknown>(
  message: unknown,
  extensionId?: string,
  runtimeOverride?: ExtensionRuntimeLike | null
): Promise<T | null> {
  try {
    const globalObj = (typeof globalThis !== 'undefined' ? globalThis : {}) as {
      chrome?: { runtime?: ExtensionRuntimeLike };
      browser?: { runtime?: ExtensionRuntimeLike };
    };

    const runtime =
      runtimeOverride !== undefined
        ? runtimeOverride
        : globalObj.chrome?.runtime || globalObj.browser?.runtime || null;

    if (!runtime || typeof runtime.sendMessage !== 'function') {
      return null;
    }

    // Without an extensionId, only send if running inside an extension context
    if (!extensionId && !runtime.id) {
      return null;
    }

    const args = extensionId ? [extensionId, message] : [message];
    const result = runtime.sendMessage(...args);

    if (result && typeof (result as Promise<T>).then === 'function') {
      return await (result as Promise<T>).catch((err: unknown) => {
        if (!isReceivingEndMissingError(err)) {
          console.warn('[PWA] External runtime messaging error:', extractErrorMessage(err));
        }
        return null;
      });
    }

    // Consume chrome.runtime.lastError if set synchronously
    if (runtime.lastError) {
      return null;
    }

    return (result as T) ?? null;
  } catch (err) {
    if (!isReceivingEndMissingError(err)) {
      console.warn('[PWA] External messaging exception suppressed:', extractErrorMessage(err));
    }
    return null;
  }
}
