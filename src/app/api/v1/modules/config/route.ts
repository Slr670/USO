import { NextResponse } from 'next/server';
import {
  getStoredModulesConfigWithMeta,
  saveStoredModulesConfig,
  resetStoredModulesConfig,
  getDefaultModuleConfigs,
  checkStorageEnvironment
} from '../../../../../lib/server-config-store';
import { ADMIN_PASSCODE } from '../../../../../lib/modules-config';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key, x-passcode',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
};

/**
 * Extract admin authorization token from headers or body
 * Supports:
 * - Header: Authorization (Bearer <token> or <token>)
 * - Header: x-admin-key (<token>)
 * - Header: x-passcode (<token>)
 * - Body: passcode, adminKey, token
 */
function extractAuthToken(request: Request, body?: any): string | null {
  // 1. Check `x-admin-key` header
  const xAdminKey = request.headers.get('x-admin-key');
  if (xAdminKey && xAdminKey.trim()) {
    return xAdminKey.trim();
  }

  // 2. Check `Authorization` header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.trim()) {
    const raw = authHeader.trim();
    if (raw.toLowerCase().startsWith('bearer ')) {
      return raw.slice(7).trim();
    }
    return raw;
  }

  // 3. Check legacy `x-passcode` header
  const xPasscode = request.headers.get('x-passcode');
  if (xPasscode && xPasscode.trim()) {
    return xPasscode.trim();
  }

  // 4. Check body fields
  if (body && typeof body === 'object') {
    if (body.passcode && typeof body.passcode === 'string') return body.passcode.trim();
    if (body.adminKey && typeof body.adminKey === 'string') return body.adminKey.trim();
    if (body.token && typeof body.token === 'string') return body.token.trim();
  }

  return null;
}

/**
 * Validate token against server environment variables or default constant
 */
function isAuthorized(token: string | null): boolean {
  if (!token) return false;

  const validTokens = [
    ADMIN_PASSCODE, // '258025'
    process.env.ADMIN_KEY,
    process.env.ADMIN_PASSCODE,
    process.env.ADMIN_AUTH_TOKEN
  ]
    .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
    .map((t) => t.trim());

  return validTokens.includes(token.trim());
}

/**
 * GET /api/v1/modules/config
 * Retrieves shared module configuration for all users
 * Fail-safe: Always returns 200 with default fallback data even if backend services are offline
 */
export async function GET() {
  try {
    const diagnostics = checkStorageEnvironment();
    const { config, source, updatedAt } = await getStoredModulesConfigWithMeta();

    return NextResponse.json(
      {
        success: true,
        data: config,
        meta: {
          source,
          updatedAt,
          totalModules: Object.keys(config).length,
          diagnostics
        }
      },
      {
        status: 200,
        headers: CORS_HEADERS
      }
    );
  } catch (err: any) {
    console.error('[API /api/v1/modules/config GET] Uncaught server exception, recovering with fallback defaults:', err);

    // Fail-safe: never return 500 to client. Serve authoritative system defaults
    const fallbackDefaults = getDefaultModuleConfigs();
    return NextResponse.json(
      {
        success: true,
        data: fallbackDefaults,
        meta: {
          source: 'emergency-fallback-defaults',
          updatedAt: new Date().toISOString(),
          totalModules: Object.keys(fallbackDefaults).length,
          warning: 'Recovered from backend exception using static defaults'
        }
      },
      {
        status: 200,
        headers: CORS_HEADERS
      }
    );
  }
}

/**
 * POST /api/v1/modules/config
 * Updates and persists configuration globally across all users and browsers
 * Validates authentication token in Authorization or x-admin-key header
 */
export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      // Body may be empty or invalid json
    }

    const token = extractAuthToken(request, body);

    if (!isAuthorized(token)) {
      console.warn('[API /api/v1/modules/config POST] 401 Unauthorized attempt:', {
        tokenProvided: !!token,
        hasAuthHeader: !!request.headers.get('authorization'),
        hasAdminKeyHeader: !!request.headers.get('x-admin-key'),
        hasPasscodeHeader: !!request.headers.get('x-passcode'),
        hasBodyPasscode: !!(body && (body.passcode || body.adminKey || body.token))
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid or missing admin credentials. Please provide Authorization: Bearer <token> or x-admin-key header.'
        },
        {
          status: 401,
          headers: CORS_HEADERS
        }
      );
    }

    // Configuration payload can be inside `config` key or the root body
    const configToSave = body?.config || body;

    if (!configToSave || typeof configToSave !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid configuration payload. Expected JSON object with module configurations.'
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
    console.error('[API /api/v1/modules/config POST] Server error during configuration save:', err);
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
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      // Body is optional on DELETE
    }

    const token = extractAuthToken(request, body);

    if (!isAuthorized(token)) {
      console.warn('[API /api/v1/modules/config DELETE] 401 Unauthorized attempt');
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid admin authentication key or passcode. Provide Authorization or x-admin-key header.'
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
    console.error('[API /api/v1/modules/config DELETE] Server error during reset:', err);
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
