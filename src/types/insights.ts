import type { DateOnly } from '../lib/date';
import type { EnergyLevel, MoodType, SymptomKey } from './dailyLog';

/** A finished cycle from `GET /cycles/history`. */
export interface CompletedCycle {
  startDate: DateOnly;
  endDate: DateOnly;
  cycleLength: number;
  periodLength: number | null;
}

export interface CountItem<K extends string> {
  key: K;
  count: number;
}

export interface BbtReading {
  date: DateOnly;
  celsius: number;
}

/** Shape of `GET /insights?from=&to=`. Every list may legitimately be empty. */
export interface InsightsSummary {
  from: DateOnly;
  to: DateOnly;
  windowDays: number;
  loggedDays: number;
  symptomFrequency: CountItem<SymptomKey>[];
  moodFrequency: CountItem<MoodType>[];
  energyFrequency: CountItem<EnergyLevel>[];
  bbtReadings: BbtReading[];
}

/** Below this many logged days the Insights view shows its "not enough data" state. */
export const INSIGHTS_MIN_LOGGED_DAYS = 3;
