import type { DateOnly } from '../../lib/date';
import type { CycleDayInfo, CycleSummary, DateRange } from '../../types/cycle';
import type { CompletedCycle } from '../../types/insights';
import { API_MODE } from './config';
import { demoCycleApi } from '../demo/demoCycleApi';
import { httpCycleApi } from './http/httpCycleApi';

/**
 * Cycle estimates, computed by the backend from the patient's settings and logs.
 * See docs/API_CONTRACT.md: GET /cycle/current, GET /cycle/predictions, GET /cycles/history.
 * `today` is the patient's local date, sent so the server uses the right calendar day.
 */
export interface CycleApi {
  /** Null when there is not enough data (no last period date). */
  getCurrent(today: DateOnly, signal?: AbortSignal): Promise<CycleSummary | null>;
  /** One entry per date in the range that has an estimate; dates before the first period are omitted. */
  getPredictions(range: DateRange, today: DateOnly, signal?: AbortSignal): Promise<CycleDayInfo[]>;
  getHistory(signal?: AbortSignal): Promise<CompletedCycle[]>;
}

export const cycleApi: CycleApi = API_MODE === 'http' ? httpCycleApi : demoCycleApi;
