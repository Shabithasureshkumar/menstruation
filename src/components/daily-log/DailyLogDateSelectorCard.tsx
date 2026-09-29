import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, diffDays, formatDate, getDateParts, getMonthShort } from '../../lib/date';
import type { DateOnly } from '../../lib/date';
import { PHASE_STYLES } from '../../lib/phaseStyles';
import { CYCLE_PHASES } from '../../types/cycle';
import type { DailyLogsByDate } from '../../types/dailyLog';
import { useCyclePredictions } from '../../hooks/useCycle';

interface DailyLogDateSelectorCardProps {
  selectedDate: DateOnly;
  today: DateOnly;
  savedLogs: DailyLogsByDate;
  onSelectDate: (date: DateOnly) => void;
}

const WINDOW = 7;

export const DailyLogDateSelectorCard: React.FC<DailyLogDateSelectorCardProps> = ({ selectedDate, today, savedLogs, onSelectDate }) => {
  const [windowStart, setWindowStart] = useState(() => addDays(selectedDate, -3));
  // Keep the selected date visible when it changes from elsewhere (e.g. the Calendar).
  const offset = diffDays(windowStart, selectedDate);
  const start = offset >= 0 && offset < WINDOW ? windowStart : addDays(selectedDate, -3);
  const days = Array.from({ length: WINDOW }, (_, i) => addDays(start, i));
  const predictions = useCyclePredictions(start, addDays(start, WINDOW - 1));
  const selectedPrediction = useCyclePredictions(selectedDate, selectedDate);
  const getDay = (date: DateOnly) => predictions.byDate[date] ?? selectedPrediction.byDate[date] ?? null;
  const selectedInfo = getDay(selectedDate);

  const navButton =
    'w-11 h-11 rounded-full text-[#55607A] hover:text-[#17152B] hover:bg-white flex items-center justify-center transition-colors cursor-pointer';

  return (
    <section aria-label="Choose a date" className="w-full bg-white rounded-[22px] p-4 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="space-y-0.5 text-left min-w-0">
          <h2 className="text-lg sm:text-xl font-black text-[#17152B] tracking-tight">
            {selectedInfo ? (
              <>
                Cycle Day <span className="text-[#C2185B]">{selectedInfo.cycleDay}</span>
              </>
            ) : (
              'Cycle day unknown'
            )}
          </h2>
          <p className="text-xs text-[#68708A] font-medium">
            {selectedDate === today ? 'Today · ' : ''}
            {formatDate(selectedDate, 'weekday-long')}
            {selectedInfo ? ` · ${PHASE_STYLES[selectedInfo.phase].label}${selectedInfo.isPredicted ? ' (estimate)' : ''}` : ''}
          </p>
        </div>

        <div className="flex items-center gap-0.5 bg-[#FAF8FA] p-0.5 rounded-full border border-[#F1DDE8]/70">
          <button type="button" onClick={() => setWindowStart(addDays(start, -WINDOW))} aria-label="Show previous week" className={navButton}>
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setWindowStart(addDays(today, -3));
              onSelectDate(today);
            }}
            className="px-4 min-h-[44px] rounded-full bg-[#FFF0F6] hover:bg-pink-100 text-[#C2185B] text-xs font-bold transition-colors border border-pink-200 shadow-2xs cursor-pointer"
          >
            Today
          </button>
          <button type="button" onClick={() => setWindowStart(addDays(start, WINDOW))} aria-label="Show next week" className={navButton}>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
        <ul className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[300px]" aria-label={`Week of ${formatDate(start, 'long')}`}>
          {days.map((date) => {
            const info = getDay(date);
            const isSelected = date === selectedDate;
            const isToday = date === today;
            const logged = Boolean(savedLogs[date]);
            const { day, monthIndex } = getDateParts(date);
            const label = [
              formatDate(date, 'weekday-long'),
              isToday ? 'today' : null,
              info ? `cycle day ${info.cycleDay}, ${PHASE_STYLES[info.phase].label}${info.isPredicted ? ' (estimate)' : ''}` : null,
              logged ? 'logged' : 'not logged',
            ]
              .filter(Boolean)
              .join(', ');
            return (
              <li key={date}>
                <button
                  type="button"
                  aria-label={label}
                  aria-pressed={isSelected}
                  aria-current={isToday ? 'date' : undefined}
                  onClick={() => onSelectDate(date)}
                  className={`w-full min-h-[76px] py-2 px-0.5 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                    isSelected ? 'bg-[#D81B60] text-white shadow-md shadow-pink-300/40' : 'hover:bg-[#FFF0F6]/70 text-[#17152B]'
                  } ${isToday && !isSelected ? 'ring-2 ring-inset ring-[#F43F8F]/40' : ''}`}
                >
                  <span className={`text-[0.66rem] uppercase font-bold leading-tight ${isSelected ? 'text-white/90' : 'text-[#68708A]'}`}>
                    {getMonthShort(monthIndex)}
                  </span>
                  <span className="text-base sm:text-lg font-black leading-tight">{day}</span>
                  <span className={`text-[0.62rem] font-bold leading-tight ${isSelected ? 'text-white/95' : 'text-[#68708A]'}`}>
                    {info ? `CD ${info.cycleDay}` : '—'}
                  </span>
                  <span className="mt-1 h-3 flex items-center gap-1" aria-hidden="true">
                    {info && <span className={`w-2.5 h-2.5 rounded-full ${PHASE_STYLES[info.phase].dot}`} />}
                    {logged && <Check className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#047857]'}`} strokeWidth={3} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="pt-2 border-t border-[#F1DDE8]/60 flex items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 flex-wrap text-[0.7rem] text-[#55607A] font-medium" aria-label="Legend">
        {CYCLE_PHASES.map((phase) => (
          <li key={phase} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${PHASE_STYLES[phase].dot}`} />
            <span>{PHASE_STYLES[phase].label}</span>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <Check className="w-3 h-3 text-[#047857]" strokeWidth={3} aria-hidden="true" />
          <span>Logged</span>
        </li>
      </ul>
    </section>
  );
};
