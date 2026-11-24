import { NextResponse } from 'next/server';
import { buildServiceWorkerScript } from '../../lib/pwa-sw';

export const dynamic = 'force-static';

export async function GET() {
  const script = buildServiceWorkerScript();
  return new NextResponse(script, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Service-Worker-Allowed': '/',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
