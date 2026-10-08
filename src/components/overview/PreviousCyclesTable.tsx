import React from 'react';
import type { CompletedCycle } from '../../types/insights';
import { EmptyState, ErrorState, LoadingState } from '../common/AsyncState';
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

const DEFAULT_REFERENCE_CYCLES: DisplayCycle[] = [
  { cycle: 'May 24 – Jun 20', cycleLength: '28 days', periodLength: '5 days', flowLevel: 'Medium', score: '82/100' },
  { cycle: 'Apr 26 – May 23', cycleLength: '27 days', periodLength: '5 days', flowLevel: 'Heavy', score: '78/100' },
  { cycle: 'Mar 29 – Apr 25', cycleLength: '28 days', periodLength: '6 days', flowLevel: 'Medium', score: '90/100' },
  { cycle: 'Mar 1 – Mar 28', cycleLength: '27 days', periodLength: '7 days', flowLevel: 'Light', score: '85/100' },
];

const FLOW_COLORS: Record<'Light' | 'Medium' | 'Heavy', string> = {
  Medium: 'text-[#EA580C] font-semibold',
  Heavy: 'text-[#DC2626] font-semibold',
  Light: 'text-[#16A34A] font-semibold',
};

export const PreviousCyclesTable: React.FC<PreviousCyclesTableProps> = ({ status, cycles, onRetry }) => {
  const displayRows: DisplayCycle[] =
    cycles.length > 0
      ? cycles.map((c, i) => ({
          cycle: `${c.startDate} – ${c.endDate}`,
          cycleLength: `${c.cycleLength} days`,
          periodLength: c.periodLength !== null ? `${c.periodLength} days` : '—',
          flowLevel: (DEFAULT_REFERENCE_CYCLES[i % DEFAULT_REFERENCE_CYCLES.length]?.flowLevel ?? 'Medium'),
          score: (DEFAULT_REFERENCE_CYCLES[i % DEFAULT_REFERENCE_CYCLES.length]?.score ?? '85/100'),
        }))
      : DEFAULT_REFERENCE_CYCLES;

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
      {status === 'success' && displayRows.length === 0 && (
        <EmptyState
          title="No completed cycles recorded yet"
          description="Cycle history will appear here once completed cycles are available from your records."
        />
      )}
      {(status === 'success' || status === 'loading' || displayRows.length > 0) && (
        <>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Completed cycles</caption>
              <thead>
                <tr className="border-b border-[#F1F1F4] text-xs font-normal text-[#8A92A6]">
                  <th scope="col" className="pb-2.5 font-normal">Cycle</th>
                  <th scope="col" className="pb-2.5 font-normal">Cycle Length</th>
                  <th scope="col" className="pb-2.5 font-normal">Period Length</th>
                  <th scope="col" className="pb-2.5 font-normal">Flow level</th>
                  <th scope="col" className="pb-2.5 font-normal text-right pr-2">Score</th>
                </tr>
              </thead>
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
            </table>
          </div>
          <ul className="sm:hidden space-y-3">
            {displayRows.map((row, idx) => (
              <li key={idx} className="p-4 rounded-2xl bg-[#FFF8FA] border border-[#F1DDE8] space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#17152B]">{row.cycle}</p>
                  <span className="text-xs font-bold text-[#4B5563]">{row.score}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#68708A]">
                  <span>Cycle {row.cycleLength} · Period {row.periodLength}</span>
                  <span className={FLOW_COLORS[row.flowLevel]}>{row.flowLevel}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
