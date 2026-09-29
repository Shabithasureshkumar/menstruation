import React from 'react';
import { formatDate } from '../../lib/date';
import { PHASE_STYLES } from '../../lib/phaseStyles';
import type { CycleDayInfo } from '../../types/cycle';

interface DailyLogPhaseHeaderProps {
  date: string;
  isToday: boolean;
  info: CycleDayInfo | null;
}

export const DailyLogPhaseHeader: React.FC<DailyLogPhaseHeaderProps> = ({ date, isToday, info }) => (
  <div className="w-full text-left space-y-0.5 pt-1 pb-1">
    <h2 className="text-xl sm:text-2xl font-black text-[#17152B] tracking-tight">
      {info ? (info.phase === 'Fertile Window' ? 'Fertile Window' : `${PHASE_STYLES[info.phase].label} Phase`) : 'Daily Log'}
    </h2>
    <p className="text-xs sm:text-sm text-[#68708A] font-medium">
      {isToday ? 'Today, ' : ''}
      {formatDate(date, 'long')}
      {info?.isPredicted ? ' · phase is an estimate' : ''}
    </p>
  </div>
);
