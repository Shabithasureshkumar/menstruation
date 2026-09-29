import { apiRequest } from '../client';
import type { InsightsApi } from '../insightsApi';
import type { InsightsDto } from '../dto';
import { fromInsightsDto } from '../mappers';

/** HTTP implementation of InsightsApi (not active while API_MODE is 'demo'). */
export const httpInsightsApi: InsightsApi = {
  async getSummary(range, signal) {
    return fromInsightsDto(await apiRequest<InsightsDto>('/insights', { query: { from: range.start, to: range.end }, signal }));
  },
};
