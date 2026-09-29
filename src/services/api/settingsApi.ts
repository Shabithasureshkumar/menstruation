import type { SettingsState } from '../../types/settings';
import { API_MODE } from './config';
import { demoSettingsApi } from '../demo/demoSettingsApi';
import { httpSettingsApi } from './http/httpSettingsApi';

/** Settings. See docs/API_CONTRACT.md: GET /settings, PUT /settings (full replace). */
export interface SettingsApi {
  get(signal?: AbortSignal): Promise<SettingsState>;
  save(settings: SettingsState): Promise<SettingsState>;
}

export const settingsApi: SettingsApi = API_MODE === 'http' ? httpSettingsApi : demoSettingsApi;
