import type { DateOnly } from '../../lib/date';
import type { DateRange } from '../../types/cycle';
import type { DailyLogEntry } from '../../types/dailyLog';
import { API_MODE } from './config';
import { demoDailyLogApi } from '../demo/demoDailyLogApi';
import { httpDailyLogApi } from './http/httpDailyLogApi';

/**
 * Daily logs. See docs/API_CONTRACT.md:
 * GET /daily-logs/{date}, GET /daily-logs?from&to, POST /daily-logs,
 * PUT /daily-logs/{date}, DELETE /daily-logs/{date}.
 */
export interface DailyLogApi {
  /** Returns null when no log exists for the date (404). */
  get(date: DateOnly, signal?: AbortSignal): Promise<DailyLogEntry | null>;
  list(range: DateRange, signal?: AbortSignal): Promise<DailyLogEntry[]>;
  /** Creates the first log for `entry.date`. Fails with `conflict` if one exists. */
  create(entry: DailyLogEntry): Promise<DailyLogEntry>;
  /** Replaces the log for `entry.date`. */
  update(entry: DailyLogEntry): Promise<DailyLogEntry>;
  remove(date: DateOnly): Promise<void>;
}

export const dailyLogApi: DailyLogApi = API_MODE === 'http' ? httpDailyLogApi : demoDailyLogApi;
