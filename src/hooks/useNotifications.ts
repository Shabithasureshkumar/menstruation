import { useMemo } from 'react';
import { diffDays, formatDate } from '../lib/date';
import type { SubNavTab } from '../types/cycleTracker';
import { useCycle } from './useCycle';
import { useDailyLog } from './useDailyLog';
import { useSettings } from './useSettings';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  target: SubNavTab;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/**
 * In-app notices derived from the user's own reminder settings, cycle estimate
 * and saved logs. (Push/email delivery needs the backend.)
 */
export function useNotifications(): AppNotification[] {
  const { settings } = useSettings();
  const { summary, today } = useCycle();
  const { savedLogs, status } = useDailyLog();

  return useMemo(() => {
    const items: AppNotification[] = [];

    if (!settings.lastPeriodDate) {
      items.push({
        id: 'setup-cycle',
        title: 'Add your last period date',
        body: 'Cycle day, phase and predictions appear once your cycle details are set.',
        target: 'settings',
      });
    }

    if (summary && settings.periodReminders && !summary.isOnPeriod) {
      const days = summary.daysUntilNextPeriod;
      if (days >= 0 && days <= settings.periodReminderDaysBefore) {
        items.push({
          id: `period-${summary.nextPeriodDate}`,
          title: days === 0 ? 'Period expected today' : `Period expected in ${plural(days, 'day')}`,
          body: `Estimated start: ${formatDate(summary.nextPeriodDate, 'long')}.`,
          target: 'calendar',
        });
      }
    }

    if (summary && settings.ovulationReminders) {
      const days = diffDays(today, summary.fertileWindow.start);
      if (days >= 0 && days <= settings.ovulationReminderDaysBefore) {
        items.push({
          id: `fertile-${summary.fertileWindow.start}`,
          title: days === 0 ? 'Fertile window starts today' : `Fertile window in ${plural(days, 'day')}`,
          body: `Estimated ${formatDate(summary.fertileWindow.start, 'short')} – ${formatDate(summary.fertileWindow.end, 'short')}.`,
          target: 'calendar',
        });
      }
    }

    if (status === 'ready' && !savedLogs[today]) {
      items.push({
        id: `log-${today}`,
        title: "Today's log is empty",
        body: 'Record flow, symptoms and mood for today.',
        target: 'dailyLog',
      });
    }

    return items;
  }, [settings, summary, today, savedLogs, status]);
}
