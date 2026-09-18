'use client';

import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ModulesSection } from '../components/ModulesSection';
import { VideoShowcase } from '../components/VideoShowcase';
import { MENU_MODULES_DATA } from '../lib/modules-data';

export default function DashboardPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);

  const handleExploreClick = () => {
    setActiveModuleIndex(0);
    const el = document.getElementById('systems') || document.getElementById('modules-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history.pushState) {
        window.history.pushState(null, '', '#systems');
      }
    }
  };

  const handleVideoClick = () => {
    const el = document.getElementById('video-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keyboard navigation support across cards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setActiveModuleIndex((prev) => (prev + 1) % MENU_MODULES_DATA.length);
      } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setActiveModuleIndex(
          (prev) => (prev - 1 + MENU_MODULES_DATA.length) % MENU_MODULES_DATA.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle direct navigation to #systems or #modules-section on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#systems' || hash === '#modules-section') {
        setActiveModuleIndex(0);
        const timer = setTimeout(() => {
          const el = document.getElementById('systems') || document.getElementById('modules-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div id="home" className="dashboard-page-root">
      <Hero
        onExploreClick={handleExploreClick}
        onVideoClick={handleVideoClick}
      />

      <ModulesSection
        modules={MENU_MODULES_DATA}
        activeIndex={activeModuleIndex}
        onSelectModule={setActiveModuleIndex}
      />

      <VideoShowcase />
    </div>
  );
}
