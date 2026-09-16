/**
 * ===================================================================
 * Super High Frequency (SHF) Repeater Network Optimization Project
 * File: src/app/api/v1/modules/route.ts
 * Purpose: REST API Route Handler for all modules (replaces DashboardApiController.getAllModules)
 * Version: 3.0.0
 * ===================================================================
 */

import { NextResponse } from 'next/server';
import { dashboardService } from '../../../../lib/modules-service';

export async function GET() {
  const modules = dashboardService.getAllModules();
  return NextResponse.json(modules, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
    }
  });
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
