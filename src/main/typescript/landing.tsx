/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/landing.tsx
 * Purpose: Full React 18 Landing Page Experience (TSX)
 *          Includes Header, Hero, 8-Module Grid, Video Showcase, and Footer
 * Version: 2.6.4
 * ===================================================================
 */

// ===================================================================
// 1. Hero Component
// ===================================================================

interface HeroProps {
    readonly onExploreClick: () => void;
    readonly onVideoClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick, onVideoClick }) => {
    const heroBadge = typeof t === 'function' ? t('hero.badge') : 'Next-Gen Telemetry & Operations Command Hub';
    const heroTitle = typeof t === 'function' ? t('hero.title') : 'Super High Frequency (SHF) Repeater Network Optimization Project';
    const ctaPrimary = typeof t === 'function' ? t('hero.ctaPrimary') : 'Explore Operational Modules';
    const ctaSecondary = typeof t === 'function' ? t('hero.ctaSecondary') : 'Watch Master Operations Video';

    return (
        <section className="landing-hero-section">
            <div className="hero-content-wrapper">
                <div className="hero-badge-container">
                    <span className="hero-telemetry-badge">
                        <span className="badge-pulse-indicator"></span>
                        <span data-i18n="hero.badge">{heroBadge}</span>
                    </span>
                </div>

                <h1 className="hero-headline" data-i18n="hero.title">{heroTitle}</h1>

                <div className="hero-cta-group">
                    <button
                        type="button"
                        className="btn-hero-primary"
                        onClick={onExploreClick}
                    >
                        <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        <span data-i18n="hero.ctaPrimary">{ctaPrimary}</span>
                    </button>

                    <button
                        type="button"
                        className="btn-hero-secondary"
                        onClick={onVideoClick}
                    >
                        <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span data-i18n="hero.ctaSecondary">{ctaSecondary}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

// ===================================================================
// 3. ModuleCard Component
// ===================================================================

interface ModuleCardProps {
    readonly module: OperationalModule;
    readonly isActive: boolean;
    readonly onSelect: (index: number) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isActive, onSelect }) => {
    const key = `m${module.id}`;
    const shortTitle = typeof t === 'function' ? t(`modules.${key}.shortTitle`) : module.shortTitle;
    const tooltip = typeof t === 'function' ? t(`modules.${key}.tooltip`) : module.fullTitle;

    return (
        <button
            type="button"
            className={`card-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(module.orderIndex)}
            role="tab"
            aria-selected={isActive}
            id={`btn-module-${module.orderIndex}`}
            title={tooltip}
            data-i18n-attr={`title:modules.${key}.tooltip`}
        >
            <div
                className="card-icon-box"
                dangerouslySetInnerHTML={{ __html: module.svgIcon }}
                aria-hidden="true"
            />
            <span className="card-label-text" data-i18n={`modules.${key}.shortTitle`}>
                {shortTitle}
            </span>
        </button>
    );
};

// ===================================================================
// 4. ModulesSection Component (8-Module Grid + Active Detail Panel)
// ===================================================================

interface ModulesSectionProps {
    readonly activeIndex: number;
    readonly onSelectModule: (index: number) => void;
}

const ModulesSection: React.FC<ModulesSectionProps> = ({ activeIndex, onSelectModule }) => {
    const modules: readonly OperationalModule[] = (typeof window !== 'undefined' && window.MENU_MODULES_DATA)
        ? window.MENU_MODULES_DATA
        : (typeof MENU_MODULES_DATA !== 'undefined' ? MENU_MODULES_DATA : []);

    const activeModule = modules[activeIndex] || modules[0];
    const activeKey = activeModule ? `m${activeModule.id}` : 'm1';

    const sectionTitle = typeof t === 'function' ? t('section.title') : 'Operational Categories & System Services';
    const sectionHelp = typeof t === 'function' ? t('section.help') : 'Select a module card to view operational details or access external systems.';

    const panelBadge = typeof t === 'function' ? t(`modules.${activeKey}.badge`) : (activeModule?.badge || '');
    const panelTitle = typeof t === 'function' ? t(`modules.${activeKey}.fullTitle`) : (activeModule?.fullTitle || '');
    const panelDesc = typeof t === 'function' ? t(`modules.${activeKey}.description`) : (activeModule?.description || '');

    const openActionText = typeof t === 'function' && activeModule
        ? t('actions.openPrimary', { title: activeModule.shortTitle })
        : `Launch Primary System: ${activeModule?.shortTitle || ''}`;
    const panelDetailsLabel = typeof t === 'function' ? t('section.details') : 'Module Details';
    const openNewTabHint = typeof t === 'function' ? t('actions.openNewTab') : 'Opens in a new tab';

    const handleCardClick = (index: number) => {
        onSelectModule(index);
        if (typeof selectMenu === 'function') {
            selectMenu(index, false);
        } else if (typeof window !== 'undefined' && typeof window.selectMenu === 'function') {
            window.selectMenu(index, false);
        }
    };

    const handleLaunchPortal = () => {
        if (activeModule && activeModule.externalUrl) {
            window.open(activeModule.externalUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id="modules-section" className="dashboard-container">
            <div className="section-info-bar">
                <div className="section-label-text">
                    <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                    <span data-i18n="section.title">{sectionTitle}</span>
                </div>
                <div className="section-help-text" data-i18n="section.help">
                    {sectionHelp}
                </div>
            </div>

            <div className="grid-container" role="tablist" aria-label="SHF Project Operations Directory" data-i18n-attr="aria-label:section.title">
                {modules.map((m, idx) => (
                    <ModuleCard
                        key={m.id}
                        module={m}
                        isActive={idx === activeIndex}
                        onSelect={handleCardClick}
                    />
                ))}
            </div>

            {activeModule && (
                <div
                    id="dashboard-content-panel"
                    className="content-panel"
                    role="region"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-label="Module Operations Details"
                    aria-labelledby="display-title"
                    aria-describedby="display-desc"
                >
                    <div className="panel-header-row">
                        <span className="panel-eyebrow" data-i18n="section.details">{panelDetailsLabel}</span>
                        <span id="section-badge" className="status-badge" data-i18n={`modules.${activeKey}.badge`}>
                            {panelBadge}
                        </span>
                    </div>

                    <div className="panel-body-content">
                        <div
                            id="display-icon"
                            className="panel-icon-svg-wrap"
                            dangerouslySetInnerHTML={{ __html: activeModule.svgIcon }}
                            aria-hidden="true"
                        />
                        <div className="panel-text-wrap">
                            <h2 id="display-title" className="panel-main-heading" data-i18n={`modules.${activeKey}.fullTitle`}>
                                {panelTitle}
                            </h2>
                            <p id="display-desc" className="panel-description" data-i18n={`modules.${activeKey}.description`}>
                                {panelDesc}
                            </p>
                        </div>
                    </div>

                    <div id="panel-action-container" className="panel-action-area">
                        {activeModule.isExternal && activeModule.externalUrl && (
                            <>
                                <span className="panel-action-hint" data-i18n="actions.openNewTab">{openNewTabHint}</span>
                                <button
                                    type="button"
                                    className="btn-action-primary"
                                    onClick={handleLaunchPortal}
                                    title={activeModule.fullTitle}
                                    aria-label={openActionText}
                                    aria-describedby="display-title"
                                >
                                    <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                        <polyline points="15 3 21 3 21 9"/>
                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                    </svg>
                                    <span>{openActionText}</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

// ===================================================================
// 4. VideoShowcase Component
// ===================================================================

const VideoShowcase: React.FC = () => {
    const videoBadge = typeof t === 'function' ? t('video.badge') : 'System Demonstration & Media Presentation';
    const videoTitle = typeof t === 'function' ? t('video.title') : 'FORTH Master System Operations Video';
    const videoDesc = typeof t === 'function' ? t('video.description') : 'Comprehensive overview and instructional walkthrough of the Super High Frequency (SHF) Repeater Network system operations and maintenance procedures.';
    const videoFallback = typeof t === 'function' ? t('video.fallback') : 'Your browser does not support HTML5 video playback. Please update your browser.';

    return (
        <section id="video-section" className="video-section-container" aria-label="System Operations Video Presentation">
            <div className="video-showcase-card">
                <div className="video-header-row">
                    <div className="video-title-group">
                        <div className="video-icon-pill" aria-hidden="true">
                            <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"/>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                            </svg>
                        </div>
                        <div className="video-heading-wrap">
                            <span className="status-badge video-badge" data-i18n="video.badge">
                                <span className="video-badge-dot" aria-hidden="true"></span>
                                {videoBadge}
                            </span>
                            <h2 className="video-main-heading" data-i18n="video.title">
                                {videoTitle}
                            </h2>
                        </div>
                    </div>

                    <div className="video-meta-badges">
                        <span className="video-hd-pill">
                            <svg className="ui-icon video-hd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            <span>1080p Full HD</span>
                        </span>
                        <span className="video-spec-pill">60 FPS</span>
                    </div>
                </div>

                <div className="video-player-wrapper">
                    <video
                        id="forth-master-video"
                        className="responsive-video-player"
                        controls
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src="public/FORTH_MASTER_Video_Final-Additional.mp4" type="video/mp4" />
                        <p data-i18n="video.fallback">{videoFallback}</p>
                    </video>
                </div>

                <div className="video-caption-bar">
                    <div className="video-caption-left">
                        <div className="video-caption-icon-wrap" aria-hidden="true">
                            <svg className="ui-icon video-caption-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                        </div>
                        <p className="video-caption-text" data-i18n="video.description">
                            {videoDesc}
                        </p>
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

// ===================================================================
// 5. Footer Component
// ===================================================================

const Footer: React.FC = () => {
    const copyright = typeof t === 'function' ? t('footer.copyright') : '© 2026 SHF Repeater Network Operations & Maintenance Center. All rights reserved.';
    const architecture = typeof t === 'function' ? t('footer.architecture') : 'System Architecture: Modular Web Architecture (Dual-Stack)';
    const versionLabel = typeof t === 'function' ? t('footer.versionLabel') : 'Version:';

    return (
        <footer className="dashboard-footer">
            <div className="footer-inner">
                <div data-i18n="footer.copyright">
                    {copyright}
                </div>
                <div>
                    <span data-i18n="footer.architecture">
                        {architecture}
                    </span>
                    {' | '}
                    <span data-i18n="footer.versionLabel">{versionLabel}</span>{' '}
                    <strong className="app-version-text">v2.6.4</strong>
                </div>
            </div>
        </footer>
    );
};

// ===================================================================
// 6. Master LandingPage Composition Component
// ===================================================================

const LandingPage: React.FC = () => {
    const [activeModuleIndex, setActiveModuleIndex] = React.useState<number>(0);

    const handleExploreClick = () => {
        const el = document.getElementById('modules-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleVideoClick = () => {
        const el = document.getElementById('video-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page-root">
            <Hero
                onExploreClick={handleExploreClick}
                onVideoClick={handleVideoClick}
            />

            <ModulesSection
                activeIndex={activeModuleIndex}
                onSelectModule={setActiveModuleIndex}
            />

            <VideoShowcase />

            <Footer />
        </div>
    );
};

// ===================================================================
// 7. Mount and Initialization Lifecycle
// ===================================================================

/**
 * Mount React 18 Landing Page into DOM
 */
function initLandingPage(): void {
    if (typeof document === 'undefined') return;

    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.warn('[LandingPage] Target #root element not found in DOM, skipping React mount.');
        return;
    }

    try {
        const ReactLib = (typeof React !== 'undefined') ? React : (window as unknown as { React: typeof React }).React;
        const ReactDOMLib = (typeof ReactDOM !== 'undefined') ? ReactDOM : (window as unknown as { ReactDOM: typeof ReactDOM }).ReactDOM;

        if (!ReactLib || !ReactDOMLib) {
            console.warn('[LandingPage] React or ReactDOM not available globally.');
            return;
        }

        const appElement = ReactLib.createElement(LandingPage);

        if (typeof ReactDOMLib.createRoot === 'function') {
            const container = rootElement as ReactRootContainer;
            if (!container._reactRoot) {
                container._reactRoot = ReactDOMLib.createRoot(container);
            }
            container._reactRoot.render(appElement);
            console.log('[LandingPage] Mounted React 18 Landing Page via createRoot.');
        } else if (typeof ReactDOMLib.render === 'function') {
            ReactDOMLib.render(appElement, rootElement);
            console.log('[LandingPage] Mounted React Landing Page via legacy render.');
        }
    } catch (err) {
        console.error('[LandingPage] Error mounting Landing Page:', err);
    }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLandingPage();
        });
    } else {
        initLandingPage();
    }
}

// Expose globally on Window object
if (typeof window !== 'undefined') {
    const win = window as unknown as Record<string, unknown>;
    win.initLandingPage = initLandingPage;
    win.LandingPage = LandingPage;
}

// Export for Node.js / CommonJS testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initLandingPage, LandingPage };
}
