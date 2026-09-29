import { addDays } from '../lib/date';
import { insightsApi } from '../services/api/insightsApi';
import type { InsightsSummary } from '../types/insights';
import { useAsync } from './useAsync';
import { useDailyLog } from './useDailyLog';
import { useToday } from './useToday';

/** Insights for the last `windowDays` (GET /insights?from&to), refetched when saved logs change. */
export function useInsights(windowDays = 30) {
  const today = useToday();
  const { savedLogs } = useDailyLog();
  const from = addDays(today, -(windowDays - 1));
  return useAsync<InsightsSummary>(() => insightsApi.getSummary({ start: from, end: today }), [from, today, savedLogs]);
}
