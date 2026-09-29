/**
 * DEMO ONLY: temporary local cycle estimator.
 *
 * Replace with `GET /cycle/current` and `GET /cycle/predictions` once the
 * backend exists. It uses only the patient's own settings (last period start,
 * cycle length, period duration) and a standard 14-day luteal phase, and is
 * fully deterministic. It never projects backwards before the recorded period
 * start, so it cannot invent past history.
 */
import { addDays, diffDays } from '../../lib/date';
import type { DateOnly } from '../../lib/date';
import {
  CYCLE_LENGTH_MAX,
  CYCLE_LENGTH_MIN,
  PERIOD_DURATION_MAX,
  PERIOD_DURATION_MIN,
} from '../../types/cycle';
import type { CycleDayInfo, CyclePhase, CycleProfile, CycleSummary } from '../../types/cycle';

const LUTEAL_PHASE_DAYS = 14;
const FERTILE_DAYS_BEFORE_OVULATION = 5;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(n)));

function normalize(profile: CycleProfile): CycleProfile {
  return {
    periodStartDate: profile.periodStartDate,
    cycleLength: clamp(profile.cycleLength, CYCLE_LENGTH_MIN, CYCLE_LENGTH_MAX),
    periodDuration: clamp(profile.periodDuration, PERIOD_DURATION_MIN, PERIOD_DURATION_MAX),
  };
}

/** Cycle day (1-based) on which ovulation is estimated. */
export function getOvulationDay(cycleLength: number, periodDuration: number): number {
  return Math.max(periodDuration + 1, cycleLength - LUTEAL_PHASE_DAYS);
}

/** Phase for a 1-based cycle day. Menstruation takes precedence over overlaps. */
export function getPhase(cycleDay: number, cycleLength: number, periodDuration: number): CyclePhase {
  const ovulationDay = getOvulationDay(cycleLength, periodDuration);
  if (cycleDay <= periodDuration) return 'Menstruation';
  if (cycleDay === ovulationDay) return 'Ovulation';
  if (cycleDay >= ovulationDay - FERTILE_DAYS_BEFORE_OVULATION && cycleDay < ovulationDay) return 'Fertile Window';
  if (cycleDay > ovulationDay) return 'Luteal';
  return 'Follicular';
}

/** 1-based cycle day for `date`, or null before the recorded period start. */
export function getCycleDay(profile: CycleProfile, date: DateOnly): number | null {
  const p = normalize(profile);
  const offset = diffDays(p.periodStartDate, date);
  if (offset < 0) return null;
  return (offset % p.cycleLength) + 1;
}

export function getCycleDayInfo(profile: CycleProfile, date: DateOnly, today: DateOnly): CycleDayInfo | null {
  const p = normalize(profile);
  const cycleDay = getCycleDay(p, date);
  if (cycleDay === null) return null;
  return {
    date,
    cycleDay,
    phase: getPhase(cycleDay, p.cycleLength, p.periodDuration),
    isPredicted: date > today,
  };
}

/** Per-day estimates for an inclusive date range (e.g. one calendar month grid). */
export function getPredictions(profile: CycleProfile, from: DateOnly, to: DateOnly, today: DateOnly): Record<DateOnly, CycleDayInfo> {
  const result: Record<DateOnly, CycleDayInfo> = {};
  const span = diffDays(from, to);
  for (let i = 0; i <= span; i++) {
    const date = addDays(from, i);
    const info = getCycleDayInfo(profile, date, today);
    if (info) result[date] = info;
  }
  return result;
}

/** Cycle position on `today`, or null when `today` precedes the recorded period start. */
export function getCycleSummary(profile: CycleProfile, today: DateOnly): CycleSummary | null {
  const p = normalize(profile);
  const offset = diffDays(p.periodStartDate, today);
  if (offset < 0) return null;

  const cycleIndex = Math.floor(offset / p.cycleLength);
  const cycleStart = addDays(p.periodStartDate, cycleIndex * p.cycleLength);
  const currentCycleDay = (offset % p.cycleLength) + 1;
  const currentPhase = getPhase(currentCycleDay, p.cycleLength, p.periodDuration);
  const nextPeriodDate = addDays(cycleStart, p.cycleLength);
  const ovulationDay = getOvulationDay(p.cycleLength, p.periodDuration);

  // Report the current fertile window if it has not ended yet, otherwise the next one.
  let windowCycleStart = cycleStart;
  if (currentCycleDay > ovulationDay) windowCycleStart = nextPeriodDate;
  const ovulationDate = addDays(windowCycleStart, ovulationDay - 1);
  const fertileStartDay = Math.max(p.periodDuration + 1, ovulationDay - FERTILE_DAYS_BEFORE_OVULATION);

  return {
    date: today,
    currentCycleDay,
    cycleLength: p.cycleLength,
    periodStartDate: cycleStart,
    periodDuration: p.periodDuration,
    currentPhase,
    isOnPeriod: currentPhase === 'Menstruation',
    nextPeriodDate,
    daysUntilNextPeriod: diffDays(today, nextPeriodDate),
    // The fertile window runs through ovulation day, so start <= end even when a
    // long period overlaps the pre-ovulation days.
    fertileWindow: {
      start: addDays(windowCycleStart, Math.min(fertileStartDay, ovulationDay) - 1),
      end: ovulationDate,
    },
    ovulationDate,
  };
}
