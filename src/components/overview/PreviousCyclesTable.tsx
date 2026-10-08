import React from 'react';
import { CalendarPlus } from 'lucide-react';
import type { CompletedCycle } from '../../types/insights';
import { ErrorState, LoadingState } from '../common/AsyncState';
import { surface } from '../common/surface';

interface PreviousCyclesTableProps {
  status: 'loading' | 'success' | 'error';
  cycles: CompletedCycle[];
  onRetry: () => void;
}

interface DisplayCycle {
  cycle: string;
  cycleLength: string;
  periodLength: string;
  flowLevel: 'Light' | 'Medium' | 'Heavy';
  score: string;
}

const FLOW_COLORS: Record<'Light' | 'Medium' | 'Heavy', string> = {
  Medium: 'text-[#EA580C] font-semibold',
  Heavy: 'text-[#DC2626] font-semibold',
  Light: 'text-[#16A34A] font-semibold',
};

export const PreviousCyclesTable: React.FC<PreviousCyclesTableProps> = ({ status, cycles, onRetry }) => {
  const displayRows: DisplayCycle[] = cycles.map((c) => ({
    cycle: `${c.startDate} – ${c.endDate}`,
    cycleLength: `${c.cycleLength} days`,
    periodLength: c.periodLength !== null ? `${c.periodLength} days` : '—',
    flowLevel: 'Medium',
    score: '85/100',
  }));

  return (
    <section
      aria-labelledby="previous-cycles-title"
      className={`${surface.card} w-full p-5 sm:p-6 space-y-4 min-h-[165px] text-left`}
    >
      <h2 id="previous-cycles-title" className="text-[15px] sm:text-base font-bold text-[#17152B] tracking-tight">
        Previous Cycles
      </h2>

      {status === 'loading' && <LoadingState label="Loading previous cycles" rows={2} />}
      {status === 'error' && <ErrorState message="We couldn't load your cycle history." onRetry={onRetry} />}

      {status !== 'loading' && status !== 'error' && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Completed cycles</caption>
              <thead>
                <tr className="border-b border-[#F1F1F4] text-xs font-medium text-[#8A92A6]">
                  <th scope="col" className="pb-2.5 font-normal">Cycle</th>
                  <th scope="col" className="pb-2.5 font-normal">Cycle Length</th>
                  <th scope="col" className="pb-2.5 font-normal">Period Length</th>
                  <th scope="col" className="pb-2.5 font-normal">Flow (avg)</th>
                  <th scope="col" className="pb-2.5 font-normal text-right pr-2">Score</th>
                </tr>
              </thead>
              {displayRows.length > 0 && (
                <tbody className="text-xs sm:text-[13px] text-[#374151] divide-y divide-[#F8F7FA]">
                  {displayRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FFFDFE] transition-colors">
                      <th scope="row" className="py-3 font-normal text-[#374151]">{row.cycle}</th>
                      <td className="py-3">{row.cycleLength}</td>
                      <td className="py-3">{row.periodLength}</td>
                      <td className={`py-3 ${FLOW_COLORS[row.flowLevel]}`}>{row.flowLevel}</td>
                      <td className="py-3 text-right pr-2 text-[#4B5563] font-medium">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          {displayRows.length === 0 && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F6] border border-[#F9A8D4] text-[#F43F8F] flex items-center justify-center mb-2.5 shadow-2xs">
                <CalendarPlus className="w-6 h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#17152B]">No previous cycles yet</h3>
              <p className="text-xs sm:text-[13px] text-[#68708A] mt-0.5">
                Your cycle history will appear here after you log your first period.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};
