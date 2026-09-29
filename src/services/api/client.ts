/**
 * HTTP client for the backend described in docs/API_CONTRACT.md.
 *
 * NOT CONNECTED: no base URL is configured and API_MODE is 'demo', so nothing
 * calls this yet. Every failure surfaces as a typed ApiError whose `message` is
 * safe to show users; server-provided text is never shown for 5xx responses.
 *
 * Only non-secret configuration may come from VITE_* variables (they are bundled
 * into public JavaScript). Auth relies on an httpOnly session cookie sent with
 * `credentials: 'include'`; no tokens are stored in the frontend.
 */

export type ApiErrorCode =
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'validation_error'
  | 'rate_limited'
  | 'server_error'
  | 'network_error'
  | 'timeout'
  | 'aborted'
  | 'invalid_response'
  | 'not_configured'
  | 'unknown';

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly fieldErrors?: Record<string, string>;

  constructor(code: ApiErrorCode, message: string, status = 0, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** Wire format of error bodies (see docs/API_CONTRACT.md → Errors). */
interface ErrorBody {
  error?: { code?: string; message?: string; fieldErrors?: Record<string, string> };
}

const DEFAULT_TIMEOUT_MS = 15_000;

const USER_MESSAGES: Record<ApiErrorCode, string> = {
  unauthorized: 'Your session has expired. Please sign in again.',
  forbidden: "You don't have permission to do that.",
  not_found: "We couldn't find that record.",
  conflict: 'This record was changed elsewhere. Reload and try again.',
  validation_error: 'Some details need fixing. Check the highlighted fields.',
  rate_limited: 'Too many requests. Please wait a moment and try again.',
  server_error: 'Something went wrong on our side. Please try again.',
  network_error: "You appear to be offline. Check your connection and try again.",
  timeout: 'The request took too long. Please try again.',
  aborted: 'The request was cancelled.',
  invalid_response: 'We received an unexpected response. Please try again.',
  not_configured: 'The service is not available yet.',
  unknown: 'Something went wrong. Please try again.',
};

function codeForStatus(status: number): ApiErrorCode {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  if (status === 409) return 'conflict';
  if (status === 400 || status === 422) return 'validation_error';
  if (status === 429) return 'rate_limited';
  if (status >= 500) return 'server_error';
  return 'unknown';
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/** Registers what happens on any 401 (e.g. redirect to sign-in). Returns an unregister function. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): () => void {
  unauthorizedHandler = handler;
  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = null;
  };
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | undefined>;
  /** JSON-serialisable body. Dates must already be strings (YYYY-MM-DD / ISO 8601). */
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (!baseUrl) throw new ApiError('not_configured', USER_MESSAGES.not_configured);

  const url = new URL(path.replace(/^\//, ''), baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const onExternalAbort = () => controller.abort();
  options.signal?.addEventListener('abort', onExternalAbort);

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? 'GET',
      credentials: 'include',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch (error) {
    if (timedOut) throw new ApiError('timeout', USER_MESSAGES.timeout);
    if (options.signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
      throw new ApiError('aborted', USER_MESSAGES.aborted);
    }
    throw new ApiError('network_error', USER_MESSAGES.network_error);
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener('abort', onExternalAbort);
  }

  if (!response.ok) {
    const code = codeForStatus(response.status);
    let body: ErrorBody = {};
    try {
      body = (await response.json()) as ErrorBody;
    } catch {
      // Non-JSON error body; the status code is enough.
    }
    if (code === 'unauthorized') unauthorizedHandler?.();
    // Server text is shown only for 4xx validation-style messages, never for 5xx.
    const message =
      code === 'validation_error' && body.error?.message ? body.error.message : USER_MESSAGES[code];
    throw new ApiError(code, message, response.status, code === 'validation_error' ? body.error?.fieldErrors : undefined);
  }

  if (response.status === 204) return undefined as T;
  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError('invalid_response', USER_MESSAGES.invalid_response, response.status);
  }
}

/** User-safe text for any thrown value. */
export function toUserMessage(error: unknown, fallback = USER_MESSAGES.unknown): string {
  return isApiError(error) ? error.message : fallback;
}
