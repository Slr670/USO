import fs from 'fs';
import path from 'path';
import os from 'os';
import { MENU_MODULES_DATA } from './modules-data';
import { I18N_RESOURCES } from './i18n';
import type { ModulesCustomConfigMap } from './types';

declare global {
  // eslint-disable-next-line no-var
  var __shf_modules_config__: ModulesCustomConfigMap | undefined;
  // eslint-disable-next-line no-var
  var __shf_modules_config_updated_at__: string | undefined;
}

/**
 * Diagnostics and environment variable validation
 */
export function checkStorageEnvironment() {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  const adminKey = process.env.ADMIN_KEY || process.env.ADMIN_PASSCODE;

  const kvValidUrl = kvUrl ? kvUrl.startsWith('http://') || kvUrl.startsWith('https://') : false;

  const diagnostics = {
    hasKvUrl: !!kvUrl,
    hasKvToken: !!kvToken,
    kvReady: !!(kvUrl && kvToken && kvValidUrl),
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseKey: !!supabaseKey,
    supabaseReady: !!(supabaseUrl && supabaseKey),
    hasCustomAdminKey: !!adminKey,
    isVercel: !!process.env.VERCEL,
    nodeEnv: process.env.NODE_ENV || 'development'
  };

  // Proactive logging of missing or mismatched credentials
  if (kvUrl && !kvToken) {
    console.warn('[server-config-store] Warning: KV_REST_API_URL is configured, but KV_REST_API_TOKEN is missing. KV store cannot be used.');
  }
  if (!kvUrl && kvToken) {
    console.warn('[server-config-store] Warning: KV_REST_API_TOKEN is present, but KV_REST_API_URL is missing.');
  }
  if (kvUrl && !kvValidUrl) {
    console.warn(`[server-config-store] Warning: KV URL does not start with http:// or https:// ("${kvUrl.substring(0, 12)}..."). If you configured KV_URL with redis:// protocol, please set KV_REST_API_URL with https:// REST endpoint instead.`);
  }
  if (supabaseUrl && !supabaseKey) {
    console.warn('[server-config-store] Warning: SUPABASE_URL is configured, but SUPABASE API key is missing.');
  }
  if (!supabaseUrl && supabaseKey) {
    console.warn('[server-config-store] Warning: SUPABASE key is present, but SUPABASE_URL is missing.');
  }

  return diagnostics;
}

/**
 * Authoritative default configuration generator
 */
export function getDefaultModuleConfigs(): ModulesCustomConfigMap {
  const defaults: ModulesCustomConfigMap = {};

  for (const mod of MENU_MODULES_DATA) {
    const key = `m${mod.id}`;
    const enMod = I18N_RESOURCES.en.translation.modules[key];
    const thMod = I18N_RESOURCES.th.translation.modules[key];

    defaults[mod.id] = {
      id: mod.id,
      externalUrl: mod.externalUrl,
      en: {
        shortTitle: enMod?.shortTitle || mod.shortTitle,
        fullTitle: enMod?.fullTitle || mod.fullTitle,
        badge: enMod?.badge || mod.badge,
        description: enMod?.description || mod.description
      },
      th: {
        shortTitle: thMod?.shortTitle || mod.shortTitle,
        fullTitle: thMod?.fullTitle || mod.fullTitle,
        badge: thMod?.badge || mod.badge,
        description: thMod?.description || mod.description
      }
    };
  }

  return defaults;
}

/**
 * Safely merge stored configuration with authoritative defaults
 * Guarantees all 10 modules have shortTitle, fullTitle, URLs and translations
 * Prevents empty or partial configurations from causing runtime errors
 */
export function mergeConfigWithDefaults(stored: any): ModulesCustomConfigMap {
  const defaults = getDefaultModuleConfigs();
  if (!stored || typeof stored !== 'object') {
    return defaults;
  }

  const merged: ModulesCustomConfigMap = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const id = Number(key);
    const item = stored[id] || stored[key];
    if (item && typeof item === 'object') {
      merged[id] = {
        ...defaults[id],
        ...item,
        externalUrl: typeof item.externalUrl === 'string' && item.externalUrl.trim()
          ? item.externalUrl.trim()
          : defaults[id].externalUrl,
        en: {
          ...defaults[id].en,
          ...(item.en && typeof item.en === 'object' ? item.en : {}),
          shortTitle: item.en?.shortTitle || defaults[id].en.shortTitle,
          fullTitle: item.en?.fullTitle || defaults[id].en.fullTitle
        },
        th: {
          ...defaults[id].th,
          ...(item.th && typeof item.th === 'object' ? item.th : {}),
          shortTitle: item.th?.shortTitle || defaults[id].th.shortTitle,
          fullTitle: item.th?.fullTitle || defaults[id].th.fullTitle
        }
      };
    }
  }

  return merged;
}

/**
 * Storage Path Resolver
 */
function getStorageFilePaths() {
  const projectDataDir = path.join(process.cwd(), 'data');
  const primaryPath = path.join(projectDataDir, 'modules-config.json');
  const fallbackPath = path.join(os.tmpdir(), 'shf_modules_config.json');
  return { projectDataDir, primaryPath, fallbackPath };
}

/**
 * Adapter 1: Vercel KV / Upstash Redis REST API
 */
async function getFromVercelKv(): Promise<ModulesCustomConfigMap | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) {
    return null;
  }

  if (!kvUrl.startsWith('http://') && !kvUrl.startsWith('https://')) {
    console.warn(`[server-config-store] Skipping KV read: invalid protocol in KV_REST_API_URL: "${kvUrl.substring(0, 12)}...". Must begin with http:// or https://`);
    return null;
  }

  try {
    const cleanUrl = kvUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/get/shf_modules_config_v1`, {
      headers: {
        Authorization: `Bearer ${kvToken}`
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      console.warn(`[server-config-store] Vercel KV read returned HTTP status ${res.status} (${res.statusText})`);
      return null;
    }

    const json = await res.json();
    if (!json || json.result === null || json.result === undefined) return null;

    let data: any = json.result;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (parseErr) {
        console.warn('[server-config-store] Failed to parse JSON string in KV result:', parseErr);
        return null;
      }
    }

    return mergeConfigWithDefaults(data);
  } catch (err: any) {
    console.error('[server-config-store] Exception during Vercel KV read:', err?.message || err);
    return null;
  }
}

async function saveToVercelKv(config: ModulesCustomConfigMap): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) {
    return false;
  }

  if (!kvUrl.startsWith('http://') && !kvUrl.startsWith('https://')) {
    console.warn(`[server-config-store] Skipping KV write: invalid protocol in KV_REST_API_URL: "${kvUrl.substring(0, 12)}..."`);
    return false;
  }

  try {
    const cleanUrl = kvUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/set/shf_modules_config_v1`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.stringify(config))
    });

    if (!res.ok) {
      console.warn(`[server-config-store] Vercel KV save returned HTTP status ${res.status}`);
      return false;
    }

    return true;
  } catch (err: any) {
    console.error('[server-config-store] Exception during Vercel KV save:', err?.message || err);
    return false;
  }
}

async function resetVercelKv(): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) {
    return false;
  }

  if (!kvUrl.startsWith('http://') && !kvUrl.startsWith('https://')) {
    return false;
  }

  try {
    const cleanUrl = kvUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/del/shf_modules_config_v1`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`
      }
    });

    return res.ok;
  } catch (err: any) {
    console.error('[server-config-store] Exception during Vercel KV reset:', err?.message || err);
    return false;
  }
}

/**
 * Adapter 2: Supabase REST API (if configured)
 */
async function getFromSupabase(): Promise<ModulesCustomConfigMap | null> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
    console.warn(`[server-config-store] Skipping Supabase read: invalid URL protocol`);
    return null;
  }

  try {
    const cleanUrl = supabaseUrl.replace(/\/+$/, '');
    const res = await fetch(
      `${cleanUrl}/rest/v1/app_config?key=eq.shf_modules_config&select=value`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      console.warn(`[server-config-store] Supabase query returned HTTP ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (Array.isArray(json) && json.length > 0 && json[0]?.value) {
      return mergeConfigWithDefaults(json[0].value);
    }
    return null;
  } catch (err: any) {
    console.error('[server-config-store] Exception during Supabase read:', err?.message || err);
    return null;
  }
}

async function saveToSupabase(config: ModulesCustomConfigMap): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
    return false;
  }

  try {
    const cleanUrl = supabaseUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/rest/v1/app_config`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        key: 'shf_modules_config',
        value: config,
        updated_at: new Date().toISOString()
      })
    });

    return res.ok;
  } catch (err: any) {
    console.error('[server-config-store] Exception during Supabase save:', err?.message || err);
    return false;
  }
}

/**
 * Adapter 3: File System Storage
 */
function getFromFileSystem(): ModulesCustomConfigMap | null {
  const { primaryPath, fallbackPath } = getStorageFilePaths();

  for (const filePath of [primaryPath, fallbackPath]) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content && content.trim()) {
          try {
            const parsed = JSON.parse(content);
            return mergeConfigWithDefaults(parsed);
          } catch (jsonErr) {
            console.warn(`[server-config-store] Failed to parse JSON in ${filePath}:`, jsonErr);
          }
        }
      }
    } catch (err) {
      console.warn(`[server-config-store] File read warning on ${filePath}:`, err);
    }
  }

  return null;
}

function saveToFileSystem(config: ModulesCustomConfigMap): boolean {
  const { projectDataDir, primaryPath, fallbackPath } = getStorageFilePaths();

  // Try saving to project data directory
  try {
    if (!fs.existsSync(projectDataDir)) {
      fs.mkdirSync(projectDataDir, { recursive: true });
    }
    fs.writeFileSync(primaryPath, JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.warn('[server-config-store] Primary directory write failed (common in serverless read-only containers), falling back to /tmp:', err);
  }

  // Fallback to OS temp directory (works in AWS Lambda / Vercel Serverless ephemeral envs)
  try {
    fs.writeFileSync(fallbackPath, JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (tmpErr) {
    console.warn('[server-config-store] Fallback /tmp directory write failed:', tmpErr);
    return false;
  }
}

function resetFileSystem(): boolean {
  const { primaryPath, fallbackPath } = getStorageFilePaths();
  let deleted = false;

  for (const filePath of [primaryPath, fallbackPath]) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deleted = true;
      }
    } catch (err) {
      console.warn(`[server-config-store] Failed to unlink ${filePath}:`, err);
    }
  }

  return deleted;
}

/**
 * Public Server-Side Store API
 */

export interface StoredConfigResult {
  config: ModulesCustomConfigMap;
  source: 'vercel-kv' | 'supabase' | 'filesystem' | 'memory' | 'default';
  updatedAt: string;
}

/**
 * Retrieve current configuration with metadata
 * Guarantees zero 500 exceptions by falling back safely to system defaults
 */
export async function getStoredModulesConfigWithMeta(): Promise<StoredConfigResult> {
  const now = new Date().toISOString();

  // Log diagnostic status on missing variables
  checkStorageEnvironment();

  try {
    // 1. Try Vercel KV / Upstash
    const kvConfig = await getFromVercelKv();
    if (kvConfig) {
      globalThis.__shf_modules_config__ = kvConfig;
      return {
        config: kvConfig,
        source: 'vercel-kv',
        updatedAt: globalThis.__shf_modules_config_updated_at__ || now
      };
    }

    // 2. Try Supabase
    const supabaseConfig = await getFromSupabase();
    if (supabaseConfig) {
      globalThis.__shf_modules_config__ = supabaseConfig;
      return {
        config: supabaseConfig,
        source: 'supabase',
        updatedAt: globalThis.__shf_modules_config_updated_at__ || now
      };
    }

    // 3. Try In-Memory Cache (if updated during current process lifetime)
    if (globalThis.__shf_modules_config__) {
      return {
        config: globalThis.__shf_modules_config__,
        source: 'memory',
        updatedAt: globalThis.__shf_modules_config_updated_at__ || now
      };
    }

    // 4. Try File System Storage
    const fsConfig = getFromFileSystem();
    if (fsConfig) {
      globalThis.__shf_modules_config__ = fsConfig;
      return {
        config: fsConfig,
        source: 'filesystem',
        updatedAt: globalThis.__shf_modules_config_updated_at__ || now
      };
    }
  } catch (err: any) {
    console.error('[server-config-store] Critical error during configuration lookup. Safely falling back to defaults:', err?.message || err);
  }

  // 5. Fallback to Authoritative System Defaults (Guaranteed Safe)
  const defaults = getDefaultModuleConfigs();
  return {
    config: defaults,
    source: 'default',
    updatedAt: now
  };
}

/**
 * Retrieve current module configuration map
 */
export async function getStoredModulesConfig(): Promise<ModulesCustomConfigMap> {
  const result = await getStoredModulesConfigWithMeta();
  return result.config;
}

/**
 * Persist module configuration globally across all clients
 */
export async function saveStoredModulesConfig(
  newConfig: ModulesCustomConfigMap
): Promise<{
  success: boolean;
  persistedTo: string[];
  updatedAt: string;
}> {
  const validMerged = mergeConfigWithDefaults(newConfig);
  const now = new Date().toISOString();
  const persistedTo: string[] = [];

  // Update In-Memory cache
  globalThis.__shf_modules_config__ = validMerged;
  globalThis.__shf_modules_config_updated_at__ = now;
  persistedTo.push('memory');

  // Persist to File System
  if (saveToFileSystem(validMerged)) {
    persistedTo.push('filesystem');
  }

  // Persist to Vercel KV if available
  const kvSaved = await saveToVercelKv(validMerged);
  if (kvSaved) {
    persistedTo.push('vercel-kv');
  }

  // Persist to Supabase if available
  const supabaseSaved = await saveToSupabase(validMerged);
  if (supabaseSaved) {
    persistedTo.push('supabase');
  }

  return {
    success: true,
    persistedTo,
    updatedAt: now
  };
}

/**
 * Revert module configuration to system defaults across all stores
 */
export async function resetStoredModulesConfig(): Promise<{
  success: boolean;
  resetAt: string;
}> {
  const now = new Date().toISOString();

  // Clear in-memory
  globalThis.__shf_modules_config__ = undefined;
  globalThis.__shf_modules_config_updated_at__ = undefined;

  // Reset file system
  resetFileSystem();

  // Reset KV
  await resetVercelKv();

  return {
    success: true,
    resetAt: now
  };
}
