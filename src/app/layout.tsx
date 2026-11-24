import React from 'react';
import type { Metadata, Viewport } from 'next';
import { dashboardGlobalStyles } from '../styles/dashboard.styles';
import { AppProviders } from '../components/AppProviders';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  PWA_MANIFEST_URL,
  PWA_THEME_COLOR,
  PWA_VERSION
} from '../lib/constants';

export const metadata: Metadata = {
  title: 'Super High Frequency (SHF) Repeater Network Optimization Project',
  description:
    'Operations and status tracking center for the Super High Frequency (SHF) Repeater Network Optimization Project',
  applicationName: 'USO Operations Portal',
  manifest: PWA_MANIFEST_URL,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'USO Portal'
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: ['/favicon.ico']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: PWA_THEME_COLOR
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="USO Portal" />
        <meta name="msapplication-TileColor" content={PWA_THEME_COLOR} />
        <meta name="msapplication-TileImage" content="/assets/icons/icon-144x144.png" />
        <meta name="pwa-version" content={PWA_VERSION} />
        <link rel="manifest" href={PWA_MANIFEST_URL} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        <AppProviders>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 150px)' }}>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
