import type { CycleApi } from '../api/cycleApi';
import type { CycleProfile } from '../../types/cycle';
import { readSettings } from './demoStore';
import { getCycleSummary, getPredictions } from './localCycleEngine';

/** Like the backend, derives the cycle from the patient's stored settings. */
function currentProfile(): CycleProfile | null {
  const s = readSettings();
  if (!s.lastPeriodDate) return null;
  return { periodStartDate: s.lastPeriodDate, cycleLength: s.cycleLength, periodDuration: s.periodDuration };
}

/** DEMO adapter for /cycle/current, /cycle/predictions and /cycles/history. */
export const demoCycleApi: CycleApi = {
  async getCurrent(today) {
    const profile = currentProfile();
    return profile ? getCycleSummary(profile, today) : null;
  },
  async getPredictions(range, today) {
    const profile = currentProfile();
    return profile ? Object.values(getPredictions(profile, range.start, range.end, today)) : [];
  },
  async getHistory() {
    // Completed-cycle history needs confirmed period starts across cycles, which
    // only the backend will hold. The demo honestly returns none.
    return [];
  },
};
