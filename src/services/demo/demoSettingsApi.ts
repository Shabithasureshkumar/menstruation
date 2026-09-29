import { ApiError } from '../api/client';
import type { SettingsApi } from '../api/settingsApi';
import { sanitizeSettings } from '../../lib/validation';
import { readSettings, writeSettings } from './demoStore';

/** DEMO adapter: mirrors GET/PUT /settings on top of localStorage. */
export const demoSettingsApi: SettingsApi = {
  async get() {
    return readSettings();
  },
  async save(settings) {
    const clean = sanitizeSettings(settings);
    if (!clean) throw new ApiError('validation_error', 'Some details need fixing.', 422);
    writeSettings(clean);
    return clean;
  },
};
