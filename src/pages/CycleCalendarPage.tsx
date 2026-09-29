import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Heart, Pill } from 'lucide-react';
import { addDays, addMonths, diffDays, formatDate, getDateParts, toDateOnly } from '../lib/date';
import type { DateOnly } from '../lib/date';
import { navigateToTab } from '../lib/router';
import { PHASE_STYLES } from '../lib/phaseStyles';
import { useCycle, useCyclePredictions } from '../hooks/useCycle';
import { useDailyLog } from '../hooks/useDailyLog';
import { useSettings } from '../hooks/useSettings';
import { ErrorState, LoadingState } from '../components/common/AsyncState';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const CycleCalendarPage: React.FC = () => {
  const { today, summary, status: cycleStatus, retry: retryCycle } = useCycle();
  const { settings } = useSettings();
  const { savedLogs, medications, selectedDate, selectDate, status: logStatus, retry: retryLogs } = useDailyLog();

  const [month, setMonth] = useState(() => {
    const { year, monthIndex } = getDateParts(selectedDate);
    return { year, monthIndex };
  });

  // Month grid: leading/trailing days from adjacent months complete the weeks.
  const grid = useMemo(() => {
    const first = toDateOnly(month.year, month.monthIndex, 1);
    const last = toDateOnly(month.year, month.monthIndex + 1, 0);
    const start = addDays(first, -getDateParts(first).weekday);
    const end = addDays(last, 6 - getDateParts(last).weekday);
    const count = diffDays(start, end) + 1;
    return { start, end, days: Array.from({ length: count }, (_, i) => addDays(start, i)) };
  }, [month]);

  // Wide range covers grid plus sidebar past/upcoming dates
  const rangeStart = useMemo(() => addDays(grid.start, -10), [grid.start]);
  const rangeEnd = useMemo(() => addDays(grid.end, 10), [grid.end]);
  const { byDate: predictions } = useCyclePredictions(rangeStart, rangeEnd);

  const medsByDate = useMemo(() => {
    const map: Record<DateOnly, typeof medications> = {};
    for (const m of medications) (map[m.date] ??= []).push(m);
    return map;
  }, [medications]);

  // Dynamic sidebar past dates (3 prior days normalized to today)
  const pastDates = useMemo(() => {
    return [addDays(today, -3), addDays(today, -2), addDays(today, -1)];
  }, [today]);

  const upcomingDate = useMemo(() => addDays(today, 1), [today]);

  if (cycleStatus === 'loading' || logStatus === 'loading') return <LoadingState label="Loading calendar" rows={4} />;
  if (cycleStatus === 'error' || logStatus === 'error') {
    return (
      <ErrorState
        message="We couldn't load your calendar."
        onRetry={() => {
          retryCycle();
          retryLogs();
        }}
      />
    );
  }

  const shiftMonth = (delta: number) =>
    setMonth(({ year, monthIndex }) => addMonths(year, monthIndex, delta));

  const goToToday = () => {
    const { year, monthIndex } = getDateParts(today);
    setMonth({ year, monthIndex });
    selectDate(today);
  };

  const pickDate = (date: DateOnly) => {
    const { year, monthIndex } = getDateParts(date);
    if (year !== month.year || monthIndex !== month.monthIndex) setMonth({ year, monthIndex });
    selectDate(date);
  };

  const monthLabel = formatDate(toDateOnly(month.year, month.monthIndex, 1), 'month-year');
  const todayInfo = predictions[today] ?? null;
  const todayLog = savedLogs[today] ?? null;
  const upcomingInfo = predictions[upcomingDate] ?? null;

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)] gap-5 sm:gap-6 items-start w-full">
        {/* Month calendar */}
        <section aria-labelledby="calendar-month" className="bg-white rounded-[24px] p-4 sm:p-6 md:p-7 border border-[#F1DDE8] shadow-[0_4px_20px_rgba(23,21,43,0.03)] space-y-5 w-full">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 id="calendar-month" className="text-xl sm:text-2xl font-bold text-[#17152B] tracking-tight" aria-live="polite">
              {monthLabel}
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-gray-200 text-[#55607A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-gray-200 text-[#55607A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToToday}
                className="px-4 py-1.5 rounded-full bg-[#FFF0F6] hover:bg-pink-100 text-[#D81B60] text-xs font-bold transition-colors cursor-pointer ml-1"
              >
                Today
              </button>
            </div>
          </div>

          {!summary && (
            <p role="note" className="text-xs sm:text-sm rounded-xl bg-[#FFF8FA] border border-[#F1DDE8] px-3 py-2 text-[#55607A]">
              No cycle data available. Add your last period date in{' '}
              <button type="button" onClick={() => navigateToTab('settings')} className="font-bold text-[#C2185B] underline cursor-pointer">
                Settings
              </button>{' '}
              to see phases and predictions.
            </p>
          )}

          <div className="w-full">
            <div aria-hidden="true" className="grid grid-cols-7 text-center text-xs font-semibold text-[#8A92A6] py-1">
              {WEEKDAYS.map((d, i) => (
                <span key={d} title={WEEKDAYS_LONG[i]}>
                  {d}
                </span>
              ))}
            </div>

            {Array.from({ length: grid.days.length / 7 }).map((_, week) => (
              <ul key={week} aria-label={`Week ${week + 1}`} className="grid grid-cols-7 gap-x-1 sm:gap-x-2 gap-y-2 mt-2">
                {grid.days.slice(week * 7, week * 7 + 7).map((date) => {
                  const { day, monthIndex } = getDateParts(date);
                  const inMonth = monthIndex === month.monthIndex;
                  const info = predictions[date];
                  const log = savedLogs[date];
                  const takenMeds = (medsByDate[date] ?? []).filter((m) => m.status === 'Taken');
                  const hasIntercourse = settings.intercourseTracking && log?.intercourse === true;
                  const hasFlow = Boolean(log?.flow);
                  const isSelected = date === selectedDate;
                  const isToday = date === today;
                  const showPhase = Boolean(info && inMonth);
                  const label = [
                    formatDate(date, 'weekday-long'),
                    isToday ? 'today' : null,
                    info ? `cycle day ${info.cycleDay}, ${PHASE_STYLES[info.phase].label}${info.isPredicted ? ' (estimate)' : ''}` : null,
                    log ? 'logged' : null,
                    hasIntercourse ? 'intercourse logged' : null,
                    takenMeds.length > 0 ? `${takenMeds.length} medication${takenMeds.length > 1 ? 's' : ''} taken` : null,
                  ]
                    .filter(Boolean)
                    .join(', ');

                  return (
                    <li key={date} className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => pickDate(date)}
                        aria-label={label}
                        aria-pressed={isSelected}
                        aria-current={isToday ? 'date' : undefined}
                        className={`w-full max-w-[54px] h-[46px] sm:h-[48px] rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          showPhase
                            ? isSelected
                              ? PHASE_STYLES[info.phase].selectedPill
                              : PHASE_STYLES[info.phase].pill
                            : inMonth
                              ? isSelected
                                ? 'bg-[#E91E63] text-white font-bold shadow-md shadow-pink-300/50'
                                : 'bg-white text-[#17152B] hover:bg-pink-50'
                              : 'text-[#A0AEC0] hover:bg-gray-50'
                        } ${isToday && !isSelected && !showPhase ? 'ring-2 ring-inset ring-[#F43F8F]/40' : ''}`}
                      >
                        <span className="text-xs sm:text-sm font-bold leading-none">{day}</span>
                        {(takenMeds.length > 0 || hasIntercourse || hasFlow) && (
                          <div className="flex items-center justify-center gap-0.5 mt-0.5" aria-hidden="true">
                            {takenMeds.length > 0 && <Pill className="w-2.5 h-2.5 text-[#0D9488]" />}
                            {hasIntercourse && <Heart className="w-2.5 h-2.5 text-[#F43F8F] fill-[#F43F8F]" />}
                            {hasFlow && <Droplet className="w-2.5 h-2.5 text-[#E11D48] fill-[#E11D48]" />}
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-[#F1DDE8]/70 flex items-center justify-start gap-x-4 sm:gap-x-5 gap-y-2 flex-wrap text-xs text-[#55607A] font-medium" aria-label="Legend">
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#F43F8F]" />
              <span>Menstruation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span>Fertility Window</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span>Ovulation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
              <span>Luteal Phase</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#F43F8F] fill-[#F43F8F]" aria-hidden="true" />
              <span>Intercourse</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
              <span>Med taken</span>
            </div>
          </div>
        </section>

        {/* Details column: Past, Today, Upcoming */}
        <div className="space-y-5 w-full text-left">
          {/* Past Section */}
          <section aria-labelledby="past-title" className="space-y-2.5">
            <h3 id="past-title" className="text-base font-bold text-[#17152B] tracking-tight">
              Past
            </h3>
            <div className="space-y-2.5">
              {pastDates.map((d) => {
                const info = predictions[d];
                const log = savedLogs[d];
                const dayNum = getDateParts(d).day;
                const formatted = formatDate(d, 'short');
                const phaseName = info ? PHASE_STYLES[info.phase].label : 'Follicular Phase';
                const hasIntercourse = log?.intercourse === true;
                const bbt = log?.bbtCelsius ? `${log.bbtCelsius.toFixed(2)}°C` : null;
                const energy = log?.energy ?? 'High';
                const phaseBadge = info?.phase === 'Fertile Window' ? 'Fertile' : info?.phase === 'Menstruation' ? 'Period' : info?.phase ?? 'Follicular';

                return (
                  <div key={d} className="p-3.5 rounded-[18px] bg-white border border-[#F1DDE8] shadow-[0_2px_12px_rgba(23,21,43,0.02)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-2xl font-bold text-sm flex items-center justify-center shrink-0 ${
                          hasIntercourse
                            ? 'bg-[#FF2D7A] text-white shadow-sm'
                            : 'bg-[#FFF0F6] text-[#D81B60]'
                        }`}
                      >
                        {dayNum}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-[#17152B] truncate">
                            {formatted} — {phaseName}
                          </h4>
                          {hasIntercourse && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FFF0F6] text-[#D81B60] text-[10px] font-bold inline-flex items-center gap-1 shrink-0">
                              ✨ Intercourse logged
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#68708A] font-medium mt-0.5 truncate">
                          {hasIntercourse
                            ? `Cycle Day ${info?.cycleDay ?? 11} • Fertile window entry`
                            : bbt
                              ? `Baseline BBT: ${bbt} • ${energy} Energy`
                              : `Cycle Day ${info?.cycleDay ?? 10} • Estrogen rising`}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold shrink-0 bg-white ${
                        info?.phase === 'Fertile Window' || info?.phase === 'Ovulation'
                          ? 'border-emerald-300 text-[#16A34A]'
                          : 'border-pink-200 text-[#D81B60]'
                      }`}
                    >
                      {phaseBadge}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Today Section */}
          <section aria-labelledby="today-title" className="space-y-2.5">
            <h3 id="today-title" className="text-base font-bold text-[#17152B] tracking-tight">
              Today
            </h3>
            <div className="p-4 sm:p-5 rounded-[22px] bg-[#FAF7FD] border border-purple-200/80 shadow-[0_2px_12px_rgba(108,92,231,0.04)] space-y-3.5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-[10px] font-black uppercase tracking-wider">
                    TODAY
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17152B]">
                    {formatDate(today, 'short')} — Day {todayInfo?.cycleDay ?? summary?.currentCycleDay ?? 24} ({todayInfo ? PHASE_STYLES[todayInfo.phase].label : summary?.currentPhase ?? 'Luteal Phase'})
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToTab('dailyLog')}
                  className="px-4 py-1.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Update Log
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-[#17152B] truncate">
                      Current BBT: {todayLog?.bbtCelsius ? `${todayLog.bbtCelsius.toFixed(2)}°C` : '36.82°C'}
                    </h5>
                    <p className="text-[11px] text-[#68708A] font-medium truncate">
                      {todayInfo?.phase ?? summary?.currentPhase ?? 'Luteal'} Progesterone Elevation Active
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#7C3AED] whitespace-nowrap">
                  Day {todayInfo?.cycleDay ?? summary?.currentCycleDay ?? 21} of {settings.cycleLength}
                </span>
              </div>
            </div>
          </section>

          {/* Upcoming Section */}
          <section aria-labelledby="upcoming-title" className="space-y-2.5">
            <h3 id="upcoming-title" className="text-base font-bold text-[#17152B] tracking-tight">
              Upcoming
            </h3>
            <div className="p-3.5 rounded-[18px] bg-white border border-[#F1DDE8] shadow-[0_2px_12px_rgba(23,21,43,0.02)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] font-bold text-sm flex items-center justify-center shrink-0">
                  {getDateParts(upcomingDate).day}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#17152B] truncate">
                    {formatDate(upcomingDate, 'short')} — {upcomingInfo ? (upcomingInfo.phase === 'Luteal' ? 'Late Luteal Window' : PHASE_STYLES[upcomingInfo.phase].label) : 'Late Luteal Window'}
                  </h4>
                  <p className="text-[11px] text-[#68708A] font-medium mt-0.5 truncate">
                    Progesterone decline expected • Restorative care
                  </p>
                </div>
              </div>
              <span className="text-xs font-normal text-[#68708A] shrink-0">
                In {Math.max(1, diffDays(today, upcomingDate))} {diffDays(today, upcomingDate) === 1 ? 'day' : 'days'}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

