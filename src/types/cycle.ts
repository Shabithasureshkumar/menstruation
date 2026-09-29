import type { DateOnly } from '../lib/date';

export type CyclePhase = 'Menstruation' | 'Follicular' | 'Fertile Window' | 'Ovulation' | 'Luteal';

export const CYCLE_PHASES: readonly CyclePhase[] = ['Menstruation', 'Follicular', 'Fertile Window', 'Ovulation', 'Luteal'];

export const CYCLE_LENGTH_MIN = 21;
export const CYCLE_LENGTH_MAX = 45;
export const PERIOD_DURATION_MIN = 2;
export const PERIOD_DURATION_MAX = 10;

/** Inputs needed to estimate a cycle. Comes from the patient's settings. */
export interface CycleProfile {
  periodStartDate: DateOnly;
  cycleLength: number;
  periodDuration: number;
}

export interface CycleDayInfo {
  date: DateOnly;
  cycleDay: number;
  phase: CyclePhase;
  /** True for dates after today — a forecast, not an observation. */
  isPredicted: boolean;
}

export interface DateRange {
  start: DateOnly;
  end: DateOnly;
}

/**
 * The single source of truth for "where am I in my cycle" on a given day.
 * Mirrors the shape expected from `GET /cycle/current`.
 */
export interface CycleSummary {
  date: DateOnly;
  currentCycleDay: number;
  cycleLength: number;
  periodStartDate: DateOnly;
  periodDuration: number;
  currentPhase: CyclePhase;
  isOnPeriod: boolean;
  nextPeriodDate: DateOnly;
  daysUntilNextPeriod: number;
  fertileWindow: DateRange;
  ovulationDate: DateOnly;
}
