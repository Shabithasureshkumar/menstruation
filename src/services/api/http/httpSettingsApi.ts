import { apiRequest } from '../client';
import type { SettingsApi } from '../settingsApi';
import type { SettingsDto } from '../dto';
import { fromSettingsDto, toSettingsDto } from '../mappers';

/** HTTP implementation of SettingsApi (not active while API_MODE is 'demo'). */
export const httpSettingsApi: SettingsApi = {
  async get(signal) {
    return fromSettingsDto(await apiRequest<SettingsDto>('/settings', { signal }));
  },
  async save(settings) {
    return fromSettingsDto(await apiRequest<SettingsDto>('/settings', { method: 'PUT', body: toSettingsDto(settings) }));
  },
};
