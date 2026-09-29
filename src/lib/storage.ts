/**
 * Versioned, validated localStorage access.
 *
 * DEMO ONLY: health data kept here is plain text in this browser. It is not
 * encrypted and must move to the backend before production use.
 *
 * Stored shape: `{ version: number, data: unknown }`. Anything that fails to
 * parse or validate clears only that key and falls back to `null`, so the app
 * keeps rendering instead of crashing on corrupted data.
 */

export interface VersionedRecord {
  version: number;
  data: unknown;
}

export type ReadStatus = 'ok' | 'missing' | 'reset' | 'unavailable';

export interface ReadResult<T> {
  value: T | null;
  status: ReadStatus;
}

function getStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function removeKey(key: string): void {
  try {
    getStorage()?.removeItem(key);
  } catch {
    // Storage may be blocked (private mode); nothing else to clean up.
  }
}

/**
 * Reads `key`, checks its version, and validates `data` with `validate`.
 * Invalid or outdated values are removed and reported as `reset`.
 */
export function readVersioned<T>(
  key: string,
  version: number,
  validate: (data: unknown) => T | null,
): ReadResult<T> {
  const storage = getStorage();
  if (!storage) return { value: null, status: 'unavailable' };

  let raw: string | null;
  try {
    raw = storage.getItem(key);
  } catch {
    return { value: null, status: 'unavailable' };
  }
  if (raw === null) return { value: null, status: 'missing' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    warnReset(key, 'invalid JSON');
    removeKey(key);
    return { value: null, status: 'reset' };
  }

  if (!isRecord(parsed) || parsed.version !== version || !('data' in parsed)) {
    warnReset(key, 'unexpected shape or version');
    removeKey(key);
    return { value: null, status: 'reset' };
  }

  const value = validate(parsed.data);
  if (value === null) {
    warnReset(key, 'schema validation failed');
    removeKey(key);
    return { value: null, status: 'reset' };
  }
  return { value, status: 'ok' };
}

/** Writes `data` under `key`. Returns false when storage is unavailable or full. */
export function writeVersioned(key: string, version: number, data: unknown): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const record: VersionedRecord = { version, data };
    storage.setItem(key, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

/** Reads a raw legacy (unversioned) JSON value once, for migration. */
export function readLegacyJson(key: string): unknown {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function warnReset(key: string, reason: string) {
  if (import.meta.env.DEV) {
    console.warn(`[storage] Discarded "${key}" (${reason}); using defaults.`);
  }
}

export { isRecord };
