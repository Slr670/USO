'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModulesConfig } from '../lib/modules-config';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { authenticate } = useModulesConfig();
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError('');
      setIsShaking(false);
      // Autofocus input on open
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passcode) {
      setError('Please enter the administrator passcode.');
      triggerShake();
      return;
    }

    const ok = authenticate(passcode);
    if (ok) {
      setError('');
      setPasscode('');
      onSuccess();
    } else {
      setError('Incorrect passcode. Access denied.');
      triggerShake();
      inputRef.current?.select();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  return (
    <div
      className="admin-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        className={`admin-modal-card admin-auth-card ${isShaking ? 'shake-anim' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          type="button"
          className="admin-modal-close-btn"
          onClick={onClose}
          aria-label="Close authentication modal"
          title="Close (Esc)"
        >
          <svg
            className="ui-icon-xs"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="admin-auth-header">
          <div className="admin-auth-icon-circle">
            <svg
              className="ui-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 id="auth-modal-title" className="admin-auth-title">
            Administrator Authentication
          </h2>
          <p className="admin-auth-subtitle">
            Enter the administrative passcode (258025) to grant access to module configuration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <div className="admin-input-group">
            <label htmlFor="admin-passcode-input" className="admin-label">
              Admin Passcode
            </label>
            <div className="admin-password-field-wrapper">
              <input
                id="admin-passcode-input"
                ref={inputRef}
                type={showPasscode ? 'text' : 'password'}
                className={`admin-text-input ${error ? 'input-error' : ''}`}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter passcode (258025)"
                autoComplete="current-password"
                maxLength={20}
              />
              <button
                type="button"
                className="admin-toggle-visibility-btn"
                onClick={() => setShowPasscode((prev) => !prev)}
                title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
              >
                {showPasscode ? (
                  <svg
                    className="ui-icon-xs"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="ui-icon-xs"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="admin-error-text" role="alert">
                <svg
                  className="ui-icon-xs"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="admin-auth-actions">
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
            >
              Verify Passcode &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
