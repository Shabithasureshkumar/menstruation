import { apiRequest } from '../client';
import type { CycleApi } from '../cycleApi';
import type { CompletedCycleDto, CycleCurrentResponseDto, CyclePredictionDto, ListResponseDto } from '../dto';
import { fromCompletedCycleDto, fromCycleCurrentDto, fromPredictionDto } from '../mappers';

/** HTTP implementation of CycleApi (not active while API_MODE is 'demo'). */
export const httpCycleApi: CycleApi = {
  async getCurrent(today, signal) {
    const res = await apiRequest<CycleCurrentResponseDto>('/cycle/current', { query: { date: today }, signal });
    return res.current ? fromCycleCurrentDto(res.current) : null;
  },
  async getPredictions(range, today, signal) {
    const res = await apiRequest<ListResponseDto<CyclePredictionDto>>('/cycle/predictions', {
      query: { from: range.start, to: range.end, today },
      signal,
    });
    return res.items.map(fromPredictionDto);
  },
  async getHistory(signal) {
    const res = await apiRequest<ListResponseDto<CompletedCycleDto>>('/cycles/history', { signal });
    return res.items.map(fromCompletedCycleDto);
  },
};
