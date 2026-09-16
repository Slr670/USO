/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/app/layout.tsx
 * Purpose: Next.js Root Layout (100% TSX, Zero Standalone HTML/CSS)
 * Version: 3.0.0
 * ===================================================================
 */

import React from 'react';
import type { Metadata, Viewport } from 'next';
import { dashboardGlobalStyles } from '../styles/dashboard.styles';
import { I18nProvider } from '../lib/i18n';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Super High Frequency (SHF) Repeater Network Optimization Project',
  description:
    'Operations and status tracking center for the Super High Frequency (SHF) Repeater Network Optimization Project',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/icons/favicon.svg', type: 'image/svg+xml' }
    ]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style
          id="dashboard-styles"
          dangerouslySetInnerHTML={{ __html: dashboardGlobalStyles }}
        />
      </head>
      <body>
        <I18nProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 150px)' }}>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
