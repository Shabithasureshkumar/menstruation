import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarDay } from '../../types/dailyLog';

interface DailyLogCalendarProps {
  selectedDate: string;
  calendarDays: CalendarDay[];
  onSelectDate: (dateStr: string) => void;
  onGoToToday: () => void;
  onShiftCalendar: (direction: 'prev' | 'next') => void;
}

export const DailyLogCalendar: React.FC<DailyLogCalendarProps> = ({
  selectedDate,
  calendarDays,
  onSelectDate,
  onGoToToday,
  onShiftCalendar,
}) => {
  const getPhaseIndicator = (day: CalendarDay, isSelected: boolean) => {
    if (isSelected) {
      return null;
    }

    if (day.cycleDay === 28 || day.cycleDay === 29) {
      return (
        <div className="mt-0.5 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      );
    }

    if (day.cycleDay === 30 || day.phase === 'Fertile Window') {
      return (
        <div className="mt-0.5 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full border-2 border-blue-300 shrink-0" />
        </div>
      );
    }

    if (day.phase === 'Ovulation') {
      return (
        <div className="mt-0.5 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
        </div>
      );
    }

    return (
      <div className="mt-0.5 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 shrink-0" />
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-[clamp(1rem,1.5vw,1.25rem)] p-[clamp(0.875rem,1.5vw,1.25rem)] border border-gray-100 shadow-sm transition-all">
      {/* Calendar Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-50 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#EF4486] flex items-center justify-center shadow-xs shrink-0">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <span className="text-[1.05rem] font-bold text-gray-800 tracking-tight">Calender</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onShiftCalendar('prev')}
            aria-label="Previous week"
            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-brand-purple-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onGoToToday}
            className="px-3.5 py-1.5 rounded-full bg-[#FAF5FF] hover:bg-purple-100/80 transition-colors text-xs sm:text-sm font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-brand-purple-400 shadow-2xs cursor-pointer"
          >
            <span className="bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent">
              Today
            </span>
          </button>

          <button
            type="button"
            onClick={() => onShiftCalendar('next')}
            aria-label="Next week"
            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-brand-purple-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple-400 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dates row */}
      <div className="pt-3.5 flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => onShiftCalendar('prev')}
          aria-label="Scroll previous dates"
          className="hidden sm:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-7 gap-1 sm:gap-2.5 flex-1 min-w-0">
          {calendarDays.map((day) => {
            const isSelected = day.dateStr === selectedDate;

            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onSelectDate(day.dateStr)}
                aria-pressed={isSelected}
                className={`flex flex-col items-center justify-between py-2 px-0.5 sm:px-2 rounded-2xl transition-all duration-200 cursor-pointer min-h-[88px] sm:min-h-[96px] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[hsla(306,85%,71%,0.25)] to-[hsla(288,100%,57%,0.25)] border border-[#955BE3] shadow-md ring-1 ring-[#955BE3]/30 scale-[1.02]'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <span
                  className={`text-[clamp(0.65rem,1.4vw,0.75rem)] font-medium leading-none ${
                    isSelected ? 'text-[#AF71F4] font-semibold' : 'text-gray-400'
                  }`}
                >
                  {day.monthName}
                </span>
                <span
                  className={`text-[clamp(0.95rem,2vw,1.125rem)] font-bold leading-none my-1 ${
                    isSelected ? 'text-[#955BE3]' : 'text-gray-700'
                  }`}
                >
                  {day.dayNumber}
                </span>
                <span
                  className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-normal whitespace-nowrap leading-none ${
                    isSelected ? 'text-[#955BE3] font-medium' : 'text-gray-400'
                  }`}
                >
                  CD {day.cycleDay}
                </span>
                <div className="h-3.5 flex items-center justify-center">
                  {getPhaseIndicator(day, isSelected)}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onShiftCalendar('next')}
          aria-label="Scroll next dates"
          className="hidden sm:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend Footer */}
      <div className="pt-3.5 mt-2 border-t border-gray-50 flex items-center justify-start sm:justify-center gap-x-4 sm:gap-x-5 gap-y-1.5 flex-wrap text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F87171] shrink-0" />
          <span className="whitespace-nowrap">Menstruation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD] shrink-0" />
          <span className="whitespace-nowrap">Fertile Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shrink-0" />
          <span className="whitespace-nowrap">Ovulation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C084FC] shrink-0" />
          <span className="whitespace-nowrap">Luteal Phase</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB] shrink-0" />
          <span className="whitespace-nowrap">Logged</span>
        </div>
      </div>
    </div>
  );
};
