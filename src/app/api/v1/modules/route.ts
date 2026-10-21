import { NextResponse } from 'next/server';
import { dashboardService } from '../../../../lib/modules-service';
import { getStoredModulesConfig } from '../../../../lib/server-config-store';
import { getOperationalModulesFromConfig } from '../../../../lib/modules-config';

export async function GET() {
  try {
    const config = await getStoredModulesConfig();
    const modules = getOperationalModulesFromConfig(config, 'en');
    return NextResponse.json(modules, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (err) {
    console.warn('Failed to load shared config in /api/v1/modules, using default service:', err);
    const modules = dashboardService.getAllModules();
    return NextResponse.json(modules, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
