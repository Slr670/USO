import { NextResponse } from 'next/server';
import {
  getStoredModulesConfigWithMeta,
  saveStoredModulesConfig,
  resetStoredModulesConfig
} from '../../../../../lib/server-config-store';
import { ADMIN_PASSCODE } from '../../../../../lib/modules-config';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-passcode',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
};

/**
 * GET /api/v1/modules/config
 * Retrieves shared module configuration for all users
 */
export async function GET() {
  try {
    const { config, source, updatedAt } = await getStoredModulesConfigWithMeta();

    return NextResponse.json(
      {
        success: true,
        data: config,
        meta: {
          source,
          updatedAt,
          totalModules: Object.keys(config).length
        }
      },
      {
        status: 200,
        headers: CORS_HEADERS
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to retrieve configuration'
      },
      {
        status: 500,
        headers: CORS_HEADERS
      }
    );
  }
}

/**
 * POST /api/v1/modules/config
 * Updates and persists configuration globally across all users and browsers
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Configuration payload can be inside `config` key or the root body
    const configToSave = body.config || body;
    const providedPasscode = body.passcode || request.headers.get('x-passcode');

    // Validate passcode if provided
    if (providedPasscode && providedPasscode.trim() !== ADMIN_PASSCODE) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid admin passcode.'
        },
        {
          status: 401,
          headers: CORS_HEADERS
        }
      );
    }

    if (!configToSave || typeof configToSave !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid configuration payload.'
        },
        {
          status: 400,
          headers: CORS_HEADERS
        }
      );
    }

    const result = await saveStoredModulesConfig(configToSave);

    return NextResponse.json(
      {
        success: true,
        message: 'Configuration saved globally across all users and browsers.',
        meta: result
      },
      {
        status: 200,
        headers: CORS_HEADERS
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to persist configuration.'
      },
      {
        status: 500,
        headers: CORS_HEADERS
      }
    );
  }
}

/**
 * PUT /api/v1/modules/config
 * Alias for POST
 */
export async function PUT(request: Request) {
  return POST(request);
}

/**
 * DELETE /api/v1/modules/config
 * Resets configuration to authoritative system defaults
 */
export async function DELETE(request: Request) {
  try {
    let providedPasscode = request.headers.get('x-passcode');
    try {
      const body = await request.json();
      if (body?.passcode) providedPasscode = body.passcode;
    } catch {
      // Body is optional on DELETE
    }

    if (providedPasscode && providedPasscode.trim() !== ADMIN_PASSCODE) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid admin passcode.'
        },
        {
          status: 401,
          headers: CORS_HEADERS
        }
      );
    }

    const result = await resetStoredModulesConfig();

    return NextResponse.json(
      {
        success: true,
        message: 'Configuration successfully reset to system defaults globally.',
        meta: result
      },
      {
        status: 200,
        headers: CORS_HEADERS
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to reset configuration.'
      },
      {
        status: 500,
        headers: CORS_HEADERS
      }
    );
  }
}

/**
 * OPTIONS /api/v1/modules/config
 * Handles preflight CORS checks
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}
