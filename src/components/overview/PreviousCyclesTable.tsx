import React from 'react';
import { formatDate } from '../../lib/date';
import type { CompletedCycle } from '../../types/insights';
import { EmptyState, ErrorState, LoadingState } from '../common/AsyncState';
import { surface } from '../common/surface';

interface PreviousCyclesTableProps {
  status: 'loading' | 'success' | 'error';
  cycles: CompletedCycle[];
  onRetry: () => void;
}

const range = (c: CompletedCycle) => `${formatDate(c.startDate, 'short')} – ${formatDate(c.endDate, 'short')}`;

export const PreviousCyclesTable: React.FC<PreviousCyclesTableProps> = ({ status, cycles, onRetry }) => (
  <section
    aria-labelledby="previous-cycles-title"
    className={`${surface.card} w-full p-5 sm:p-6 space-y-4 min-h-[165px]`}
  >
    <h2 id="previous-cycles-title" className="text-[15px] sm:text-base font-bold text-[#17152B] tracking-tight">
      Previous Cycles
    </h2>

    {status === 'loading' && <LoadingState label="Loading previous cycles" rows={2} />}
    {status === 'error' && <ErrorState message="We couldn't load your cycle history." onRetry={onRetry} />}
    {status === 'success' && cycles.length === 0 && (
      <EmptyState
        title="No completed cycles recorded yet"
        description="Cycle history will appear here once completed cycles are available from your records."
      />
    )}
    {status === 'success' && cycles.length > 0 && (
      <>
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Completed cycles</caption>
            <thead>
              <tr className="border-b border-[#F1F1F4] text-xs font-normal text-[#8A92A6]">
                <th scope="col" className="pb-2.5 font-normal">Cycle</th>
                <th scope="col" className="pb-2.5 font-normal">Cycle Length</th>
                <th scope="col" className="pb-2.5 font-normal">Period Length</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-[13px] text-[#374151]">
              {cycles.map((c) => (
                <tr key={c.startDate}>
                  <th scope="row" className="py-3 font-normal text-[#374151]">{range(c)}</th>
                  <td className="py-3">{c.cycleLength} days</td>
                  <td className="py-3">{c.periodLength !== null ? `${c.periodLength} days` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="sm:hidden space-y-3">
          {cycles.map((c) => (
            <li key={c.startDate} className="p-4 rounded-2xl bg-[#FFF8FA] border border-[#F1DDE8] space-y-1">
              <p className="text-sm font-bold text-[#17152B]">{range(c)}</p>
              <p className="text-xs text-[#68708A]">
                Cycle {c.cycleLength}d · Period {c.periodLength !== null ? `${c.periodLength}d` : '—'}
              </p>
            </li>
          ))}
        </ul>
      </>
    )}
  </section>
);
