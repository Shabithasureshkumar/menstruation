export type ApiMode = 'demo' | 'http';

/**
 * Which adapter set the services use. Stays 'demo' until the backend is ready;
 * switching to 'http' also requires VITE_API_BASE_URL and the auth flow.
 */
export const API_MODE = 'demo' as ApiMode;

/** True while identity, logs and assistant answers come from local demo adapters. */
export const IS_DEMO_MODE = API_MODE === 'demo';
