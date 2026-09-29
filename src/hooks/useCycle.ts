import { useMemo } from 'react';
import type { DateOnly } from '../lib/date';
import { cycleApi } from '../services/api/cycleApi';
import type { CycleDayInfo, CycleSummary } from '../types/cycle';
import type { CompletedCycle } from '../types/insights';
import type { LoadStatus } from '../context/contexts';
import { useAsync } from './useAsync';
import { useSettings } from './useSettings';
import { useToday } from './useToday';

/**
 * Settings that change the server-side cycle estimate. Cycle data is refetched
 * whenever they change (the backend recomputes after PUT /settings).
 */
function useCycleInputsKey(): string {
  const { settings } = useSettings();
  return `${settings.lastPeriodDate}|${settings.cycleLength}|${settings.periodDuration}`;
}

function combine(settingsStatus: LoadStatus, asyncStatus: 'loading' | 'success' | 'error'): LoadStatus {
  if (settingsStatus !== 'ready') return settingsStatus;
  return asyncStatus === 'success' ? 'ready' : asyncStatus;
}

export interface UseCycleResult {
  status: LoadStatus;
  retry: () => void;
  today: DateOnly;
  /** Null when there is no cycle data yet (no last period date). */
  summary: CycleSummary | null;
}

/** The single source for "where am I in my cycle today" (GET /cycle/current). */
export function useCycle(): UseCycleResult {
  const { status: settingsStatus, retry: retrySettings } = useSettings();
  const today = useToday();
  const key = useCycleInputsKey();
  const current = useAsync(() => cycleApi.getCurrent(today), [today, key]);

  return {
    status: combine(settingsStatus, current.status),
    retry: () => {
      if (settingsStatus === 'error') retrySettings();
      current.retry();
    },
    today,
    summary: current.data ?? null,
  };
}

export interface UseCyclePredictionsResult {
  status: LoadStatus;
  retry: () => void;
  /** Keyed by date; dates with no estimate are absent. */
  byDate: Record<DateOnly, CycleDayInfo>;
}

/** Per-day phase estimates for an inclusive range (GET /cycle/predictions). */
export function useCyclePredictions(from: DateOnly, to: DateOnly): UseCyclePredictionsResult {
  const { status: settingsStatus } = useSettings();
  const today = useToday();
  const key = useCycleInputsKey();
  const result = useAsync(() => cycleApi.getPredictions({ start: from, end: to }, today), [from, to, today, key]);
  const byDate = useMemo(() => Object.fromEntries((result.data ?? []).map((d) => [d.date, d])), [result.data]);
  return { status: combine(settingsStatus, result.status), retry: result.retry, byDate };
}

/** Completed cycles (GET /cycles/history). */
export function useCycleHistory() {
  const key = useCycleInputsKey();
  return useAsync<CompletedCycle[]>(() => cycleApi.getHistory(), [key]);
}
