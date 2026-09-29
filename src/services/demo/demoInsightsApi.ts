import { diffDays } from '../../lib/date';
import type { InsightsApi } from '../api/insightsApi';
import type { EnergyLevel, MoodType, SymptomKey } from '../../types/dailyLog';
import type { CountItem } from '../../types/insights';
import { readLogs } from './demoStore';

function countBy<K extends string>(values: K[]): CountItem<K>[] {
  const map = new Map<K, number>();
  for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
  return [...map.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
}

/** DEMO adapter for GET /insights: aggregates only what was actually logged. */
export const demoInsightsApi: InsightsApi = {
  async getSummary(range) {
    const logs = Object.values(readLogs())
      .filter((l) => l.date >= range.start && l.date <= range.end)
      .sort((a, b) => a.date.localeCompare(b.date));
    return {
      from: range.start,
      to: range.end,
      windowDays: diffDays(range.start, range.end) + 1,
      loggedDays: logs.length,
      symptomFrequency: countBy<SymptomKey>(logs.flatMap((l) => l.symptoms)),
      moodFrequency: countBy<MoodType>(logs.flatMap((l) => (l.mood ? [l.mood] : []))),
      energyFrequency: countBy<EnergyLevel>(logs.flatMap((l) => (l.energy ? [l.energy] : []))),
      bbtReadings: logs.flatMap((l) => (l.bbtCelsius !== null ? [{ date: l.date, celsius: l.bbtCelsius }] : [])),
    };
  },
};
