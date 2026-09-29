import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getToday, msUntilNextMidnight } from '../lib/date';
import { TodayContext } from './contexts';

/** Provides the real local date and rolls it over at midnight. */
export const TodayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [today, setToday] = useState(getToday);

  useEffect(() => {
    const timer = window.setTimeout(() => setToday(getToday()), msUntilNextMidnight());
    return () => window.clearTimeout(timer);
  }, [today]);

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>;
};
