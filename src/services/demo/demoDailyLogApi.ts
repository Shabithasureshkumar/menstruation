import { ApiError } from '../api/client';
import type { DailyLogApi } from '../api/dailyLogApi';
import { sanitizeDailyLog } from '../../lib/validation';
import type { DailyLogEntry } from '../../types/dailyLog';
import { readLogs, writeLogs } from './demoStore';

function validated(entry: DailyLogEntry): DailyLogEntry {
  const clean = sanitizeDailyLog(entry, entry.date);
  if (!clean) throw new ApiError('validation_error', 'Some details need fixing.', 422);
  return clean;
}

/** DEMO adapter: mirrors the /daily-logs contract on top of localStorage. */
export const demoDailyLogApi: DailyLogApi = {
  async get(date) {
    return readLogs()[date] ?? null;
  },
  async list(range) {
    return Object.values(readLogs())
      .filter((l) => l.date >= range.start && l.date <= range.end)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  async create(entry) {
    const logs = readLogs();
    if (logs[entry.date]) throw new ApiError('conflict', 'A log already exists for this date.', 409);
    const clean = validated(entry);
    writeLogs({ ...logs, [clean.date]: clean });
    return clean;
  },
  async update(entry) {
    const logs = readLogs();
    if (!logs[entry.date]) throw new ApiError('not_found', "We couldn't find that record.", 404);
    const clean = validated(entry);
    writeLogs({ ...logs, [clean.date]: clean });
    return clean;
  },
  async remove(date) {
    const logs = readLogs();
    delete logs[date];
    writeLogs(logs);
  },
};
