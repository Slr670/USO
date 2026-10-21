'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { ModulesCustomConfigMap, ModuleItemCustomConfig } from '../lib/types';
import { useModulesConfig } from '../lib/modules-config';
import { ICONS, MENU_MODULES_DATA } from '../lib/modules-data';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({
  isOpen,
  onClose
}) => {
  const { config, saveAllConfig, resetToDefaults, logout, syncStatus } = useModulesConfig();

  // Local draft state for editing before committing
  const [draftConfig, setDraftConfig] = useState<ModulesCustomConfigMap>(config);
  const [activeLangTab, setActiveLangTab] = useState<'both' | 'en' | 'th'>('both');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedAdvanced, setExpandedAdvanced] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync draft state with global config when modal opens or config updates
  useEffect(() => {
    if (isOpen) {
      setDraftConfig(JSON.parse(JSON.stringify(config)));
      setSearchQuery('');
      setToastMessage(null);
    }
  }, [isOpen, config]);

  // Handle ESC key to close
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFieldChange = (
    moduleId: number,
    field: 'externalUrl',
    value: string
  ) => {
    setDraftConfig((prev) => {
      const item = prev[moduleId] || {
        id: moduleId,
        externalUrl: '',
        en: { shortTitle: '', fullTitle: '' },
        th: { shortTitle: '', fullTitle: '' }
      };
      return {
        ...prev,
        [moduleId]: {
          ...item,
          [field]: value
        }
      };
    });
  };

  const handleLangFieldChange = (
    moduleId: number,
    lang: 'en' | 'th',
    field: 'shortTitle' | 'fullTitle' | 'badge' | 'description',
    value: string
  ) => {
    setDraftConfig((prev) => {
      const item = prev[moduleId] || {
        id: moduleId,
        externalUrl: '',
        en: { shortTitle: '', fullTitle: '' },
        th: { shortTitle: '', fullTitle: '' }
      };
      return {
        ...prev,
        [moduleId]: {
          ...item,
          [lang]: {
            ...item[lang],
            [field]: value
          }
        }
      };
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const success = await saveAllConfig(draftConfig);
      if (success !== false) {
        showToast('Configuration successfully saved and synced globally across all users!');
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        showToast('Configuration saved locally, but server synchronization failed.');
      }
    } catch (e: any) {
      showToast(`Save failed: ${e?.message || 'Server error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        'Are you sure you want to revert all 10 modules to their original system defaults across all users?'
      )
    ) {
      setIsSubmitting(true);
      try {
        await resetToDefaults();
        showToast('Configuration reset to system default values globally.');
        setTimeout(() => {
          onClose();
        }, 700);
      } catch (e: any) {
        showToast(`Reset failed: ${e?.message || 'Server error'}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleAdvanced = (id: number) => {
    setExpandedAdvanced((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter modules by search query
  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MENU_MODULES_DATA.filter((baseMod) => {
      if (!q) return true;
      const custom = draftConfig[baseMod.id];
      const matchId = String(baseMod.id).includes(q);
      const matchUrl = custom?.externalUrl?.toLowerCase().includes(q) || false;
      const matchEnShort = custom?.en?.shortTitle?.toLowerCase().includes(q) || false;
      const matchEnFull = custom?.en?.fullTitle?.toLowerCase().includes(q) || false;
      const matchThShort = custom?.th?.shortTitle?.toLowerCase().includes(q) || false;
      const matchThFull = custom?.th?.fullTitle?.toLowerCase().includes(q) || false;

      return matchId || matchUrl || matchEnShort || matchEnFull || matchThShort || matchThFull;
    });
  }, [searchQuery, draftConfig]);

  if (!isOpen) return null;

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
        className="admin-modal-card admin-config-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-modal-title"
      >
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="admin-toast-banner" role="alert">
            <svg
              className="ui-icon-xs"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="admin-config-header">
          <div className="admin-config-title-group">
            <div className="admin-config-badge-row">
              <div className="admin-config-badge">
                <span className="admin-status-dot" />
                <span>ADMIN ACCESS GRANTED</span>
              </div>
              <div
                className="admin-sync-badge"
                title="Changes persist globally across all users and browsers via shared backend synchronization"
              >
                <span className={`admin-sync-dot ${syncStatus === 'syncing' ? 'syncing' : syncStatus === 'error' ? 'error' : 'synced'}`} />
                <span>{syncStatus === 'syncing' ? 'SYNCING...' : syncStatus === 'error' ? 'SYNC WARNING' : 'GLOBAL SYNC ACTIVE'}</span>
              </div>
            </div>
            <h2 id="config-modal-title" className="admin-config-title">
              Dashboard Module Configuration
            </h2>
            <p className="admin-config-subtitle">
              Dynamically customize destination URLs, card labels, and titles for all 10 operational modules.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="admin-btn admin-btn-xs admin-btn-ghost"
              onClick={logout}
              title="Lock Admin Access"
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Lock Session</span>
            </button>

            <button
              type="button"
              className="admin-modal-close-btn"
              onClick={onClose}
              aria-label="Close configuration panel"
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
          </div>
        </div>

        {/* Filter and View Controls Bar */}
        <div className="admin-config-toolbar">
          <div className="admin-search-wrapper">
            <svg
              className="ui-icon-xs admin-search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10 modules by title, ID, or URL..."
            />
            {searchQuery && (
              <button
                type="button"
                className="admin-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                &times;
              </button>
            )}
          </div>

          <div className="admin-lang-tabs" role="tablist">
            <button
              type="button"
              className={`admin-tab-btn ${activeLangTab === 'both' ? 'active' : ''}`}
              onClick={() => setActiveLangTab('both')}
            >
              Dual View (EN & TH)
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeLangTab === 'en' ? 'active' : ''}`}
              onClick={() => setActiveLangTab('en')}
            >
              English (EN)
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeLangTab === 'th' ? 'active' : ''}`}
              onClick={() => setActiveLangTab('th')}
            >
              ภาษาไทย (TH)
            </button>
          </div>
        </div>

        {/* Modules List Container */}
        <div className="admin-modules-list-container">
          {filteredModules.length === 0 ? (
            <div className="admin-no-results">
              <p>No operational modules matched &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                className="admin-btn admin-btn-xs admin-btn-ghost"
                onClick={() => setSearchQuery('')}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredModules.map((baseMod) => {
              const item = draftConfig[baseMod.id] || {
                id: baseMod.id,
                externalUrl: baseMod.externalUrl,
                en: { shortTitle: baseMod.shortTitle, fullTitle: baseMod.fullTitle },
                th: { shortTitle: baseMod.shortTitle, fullTitle: baseMod.fullTitle }
              };
              const isAdvancedOpen = !!expandedAdvanced[baseMod.id];

              return (
                <div key={baseMod.id} className="admin-module-editor-card">
                  {/* Card Head */}
                  <div className="admin-editor-card-header">
                    <div className="admin-card-head-left">
                      <span className="admin-mod-index-badge">
                        #{baseMod.id < 10 ? `0${baseMod.id}` : baseMod.id}
                      </span>
                      <div
                        className="admin-mod-icon-preview"
                        dangerouslySetInnerHTML={{ __html: baseMod.svgIcon }}
                        aria-hidden="true"
                      />
                      <div className="admin-card-head-titles">
                        <h3 className="admin-mod-name-preview">
                          {item.en?.shortTitle || baseMod.shortTitle}
                        </h3>
                        <span className="admin-mod-name-th-preview">
                          {item.th?.shortTitle || baseMod.shortTitle}
                        </span>
                      </div>
                    </div>

                    <div className="admin-card-head-right">
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn-xs admin-btn-ghost admin-test-link-btn"
                          title="Open URL in new tab to test destination link"
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: ICONS.externalArrow }}
                            aria-hidden="true"
                          />
                          <span>Test Link</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Body: Editable Form Fields */}
                  <div className="admin-editor-card-body">
                    {/* Destination URL */}
                    <div className="admin-field-row">
                      <label
                        htmlFor={`mod-url-${baseMod.id}`}
                        className="admin-field-label"
                      >
                        Destination URL (External Web App / Target Link)
                      </label>
                      <div className="admin-input-with-icon">
                        <svg
                          className="ui-icon-xs admin-field-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <input
                          id={`mod-url-${baseMod.id}`}
                          type="url"
                          className="admin-text-input admin-url-input"
                          value={item.externalUrl}
                          onChange={(e) =>
                            handleFieldChange(baseMod.id, 'externalUrl', e.target.value)
                          }
                          placeholder="https://..."
                          required
                        />
                      </div>
                    </div>

                    {/* Card Label (shortTitle) */}
                    <div className="admin-fields-grid">
                      {(activeLangTab === 'both' || activeLangTab === 'en') && (
                        <div className="admin-field-col">
                          <label
                            htmlFor={`mod-short-en-${baseMod.id}`}
                            className="admin-field-label"
                          >
                            Card Label [EN] <span className="admin-field-hint">(Grid button title)</span>
                          </label>
                          <input
                            id={`mod-short-en-${baseMod.id}`}
                            type="text"
                            className="admin-text-input"
                            value={item.en?.shortTitle || ''}
                            onChange={(e) =>
                              handleLangFieldChange(baseMod.id, 'en', 'shortTitle', e.target.value)
                            }
                            placeholder="e.g. 1. Perform PM"
                            required
                          />
                        </div>
                      )}

                      {(activeLangTab === 'both' || activeLangTab === 'th') && (
                        <div className="admin-field-col">
                          <label
                            htmlFor={`mod-short-th-${baseMod.id}`}
                            className="admin-field-label"
                          >
                            Card Label [TH] <span className="admin-field-hint">(ป้ายชื่อบนการ์ด)</span>
                          </label>
                          <input
                            id={`mod-short-th-${baseMod.id}`}
                            type="text"
                            className="admin-text-input"
                            value={item.th?.shortTitle || ''}
                            onChange={(e) =>
                              handleLangFieldChange(baseMod.id, 'th', 'shortTitle', e.target.value)
                            }
                            placeholder="e.g. 1. Perform PM"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Full Title (fullTitle) */}
                    <div className="admin-fields-grid">
                      {(activeLangTab === 'both' || activeLangTab === 'en') && (
                        <div className="admin-field-col">
                          <label
                            htmlFor={`mod-full-en-${baseMod.id}`}
                            className="admin-field-label"
                          >
                            Full Title [EN] <span className="admin-field-hint">(Detail panel heading)</span>
                          </label>
                          <input
                            id={`mod-full-en-${baseMod.id}`}
                            type="text"
                            className="admin-text-input"
                            value={item.en?.fullTitle || ''}
                            onChange={(e) =>
                              handleLangFieldChange(baseMod.id, 'en', 'fullTitle', e.target.value)
                            }
                            placeholder="Full detailed title in English"
                            required
                          />
                        </div>
                      )}

                      {(activeLangTab === 'both' || activeLangTab === 'th') && (
                        <div className="admin-field-col">
                          <label
                            htmlFor={`mod-full-th-${baseMod.id}`}
                            className="admin-field-label"
                          >
                            Full Title [TH] <span className="admin-field-hint">(หัวข้อใหญ่ในหน้ารายละเอียด)</span>
                          </label>
                          <input
                            id={`mod-full-th-${baseMod.id}`}
                            type="text"
                            className="admin-text-input"
                            value={item.th?.fullTitle || ''}
                            onChange={(e) =>
                              handleLangFieldChange(baseMod.id, 'th', 'fullTitle', e.target.value)
                            }
                            placeholder="หัวข้อเต็มภาษาไทย"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Collapsible Advanced Badge & Description Section */}
                    <div className="admin-advanced-toggle-row">
                      <button
                        type="button"
                        className="admin-advanced-toggle-btn"
                        onClick={() => toggleAdvanced(baseMod.id)}
                        aria-expanded={isAdvancedOpen}
                      >
                        <svg
                          className={`ui-icon-xs ${isAdvancedOpen ? 'rotated-90' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>
                          {isAdvancedOpen
                            ? 'Hide Category Badge & Description'
                            : 'Edit Category Badge & Description (Advanced)'}
                        </span>
                      </button>
                    </div>

                    {isAdvancedOpen && (
                      <div className="admin-advanced-fields-box">
                        <div className="admin-fields-grid">
                          {(activeLangTab === 'both' || activeLangTab === 'en') && (
                            <div className="admin-field-col">
                              <label className="admin-field-label">Category Badge [EN]</label>
                              <input
                                type="text"
                                className="admin-text-input"
                                value={item.en?.badge || ''}
                                onChange={(e) =>
                                  handleLangFieldChange(baseMod.id, 'en', 'badge', e.target.value)
                                }
                                placeholder="Category: ..."
                              />
                            </div>
                          )}
                          {(activeLangTab === 'both' || activeLangTab === 'th') && (
                            <div className="admin-field-col">
                              <label className="admin-field-label">Category Badge [TH]</label>
                              <input
                                type="text"
                                className="admin-text-input"
                                value={item.th?.badge || ''}
                                onChange={(e) =>
                                  handleLangFieldChange(baseMod.id, 'th', 'badge', e.target.value)
                                }
                                placeholder="หมวดหมู่งาน: ..."
                              />
                            </div>
                          )}
                        </div>

                        <div className="admin-fields-grid">
                          {(activeLangTab === 'both' || activeLangTab === 'en') && (
                            <div className="admin-field-col">
                              <label className="admin-field-label">Description [EN]</label>
                              <textarea
                                className="admin-textarea-input"
                                rows={2}
                                value={item.en?.description || ''}
                                onChange={(e) =>
                                  handleLangFieldChange(
                                    baseMod.id,
                                    'en',
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="Module description in English"
                              />
                            </div>
                          )}
                          {(activeLangTab === 'both' || activeLangTab === 'th') && (
                            <div className="admin-field-col">
                              <label className="admin-field-label">Description [TH]</label>
                              <textarea
                                className="admin-textarea-input"
                                rows={2}
                                value={item.th?.description || ''}
                                onChange={(e) =>
                                  handleLangFieldChange(
                                    baseMod.id,
                                    'th',
                                    'description',
                                    e.target.value
                                  )
                                }
                                placeholder="คำอธิบายโมดูลภาษาไทย"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="admin-config-footer">
          <div className="admin-footer-left">
            <button
              type="button"
              className="admin-btn admin-btn-danger-ghost"
              onClick={handleReset}
              disabled={isSubmitting}
              title="Revert all 10 modules to hardcoded default values"
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
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>{isSubmitting ? 'Resetting...' : 'Reset All to Defaults'}</span>
            </button>
          </div>

          <div className="admin-footer-right">
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-primary admin-btn-save"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="admin-btn-spinner" />
                  <span>Saving Globally...</span>
                </>
              ) : (
                <>
                  <svg
                    className="ui-icon-xs"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>Save & Apply Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
