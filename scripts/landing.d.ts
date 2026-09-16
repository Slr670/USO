/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/main/typescript/landing.tsx
 * Purpose: Full React 18 Landing Page Experience (TSX)
 *          Includes Header, Hero, 8-Module Grid, Video Showcase, and Footer
 * Version: 2.6.4
 * ===================================================================
 */
interface HeroProps {
    readonly onExploreClick: () => void;
    readonly onVideoClick: () => void;
}
declare const Hero: React.FC<HeroProps>;
interface ModuleCardProps {
    readonly module: OperationalModule;
    readonly isActive: boolean;
    readonly onSelect: (index: number) => void;
}
declare const ModuleCard: React.FC<ModuleCardProps>;
interface ModulesSectionProps {
    readonly activeIndex: number;
    readonly onSelectModule: (index: number) => void;
}
declare const ModulesSection: React.FC<ModulesSectionProps>;
declare const VideoShowcase: React.FC;
declare const Footer: React.FC;
declare const LandingPage: React.FC;
/**
 * Mount React 18 Landing Page into DOM
 */
declare function initLandingPage(): void;
//# sourceMappingURL=landing.d.ts.map