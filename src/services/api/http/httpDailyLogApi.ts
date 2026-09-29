import { ApiError, apiRequest } from '../client';
import type { DailyLogApi } from '../dailyLogApi';
import type { DailyLogDto, ListResponseDto } from '../dto';
import { fromDailyLogDto, toDailyLogWriteDto } from '../mappers';

/** HTTP implementation of DailyLogApi (not active while API_MODE is 'demo'). */
export const httpDailyLogApi: DailyLogApi = {
  async get(date, signal) {
    try {
      return fromDailyLogDto(await apiRequest<DailyLogDto>(`/daily-logs/${date}`, { signal }));
    } catch (error) {
      if (error instanceof ApiError && error.code === 'not_found') return null;
      throw error;
    }
  },
  async list(range, signal) {
    const res = await apiRequest<ListResponseDto<DailyLogDto>>('/daily-logs', { query: { from: range.start, to: range.end }, signal });
    return res.items.map(fromDailyLogDto);
  },
  async create(entry) {
    return fromDailyLogDto(await apiRequest<DailyLogDto>('/daily-logs', { method: 'POST', body: toDailyLogWriteDto(entry) }));
  },
  async update(entry) {
    return fromDailyLogDto(await apiRequest<DailyLogDto>(`/daily-logs/${entry.date}`, { method: 'PUT', body: toDailyLogWriteDto(entry) }));
  },
  async remove(date) {
    await apiRequest<void>(`/daily-logs/${date}`, { method: 'DELETE' });
  },
};
