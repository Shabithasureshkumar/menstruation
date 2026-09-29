import type { DateRange } from '../../types/cycle';
import type { InsightsSummary } from '../../types/insights';
import { API_MODE } from './config';
import { demoInsightsApi } from '../demo/demoInsightsApi';
import { httpInsightsApi } from './http/httpInsightsApi';

/** Aggregates over logged data only. See docs/API_CONTRACT.md: GET /insights?from&to. */
export interface InsightsApi {
  getSummary(range: DateRange, signal?: AbortSignal): Promise<InsightsSummary>;
}

export const insightsApi: InsightsApi = API_MODE === 'http' ? httpInsightsApi : demoInsightsApi;
