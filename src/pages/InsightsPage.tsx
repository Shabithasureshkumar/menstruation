import React from 'react';
import { Activity, BarChart3, Smile, Thermometer, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { formatDate } from '../lib/date';
import { navigateToTab } from '../lib/router';
import { PHASE_STYLES } from '../lib/phaseStyles';
import { SYMPTOMS } from '../types/dailyLog';
import { INSIGHTS_MIN_LOGGED_DAYS } from '../types/insights';
import type { CountItem } from '../types/insights';
import { useInsights } from '../hooks/useInsights';
import { useCycle, useCycleHistory } from '../hooks/useCycle';
import { EmptyState, ErrorState, LoadingState } from '../components/common/AsyncState';

const Card: React.FC<{ title: string; icon: ReactNode; children: ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
  <section className={`bg-white rounded-[22px] p-5 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4 ${className}`}>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-black text-[#17152B] tracking-tight">{title}</h3>
    </div>
    {children}
  </section>
);

/** Horizontal bars with the count as text, so values never depend on the bar graphic. */
function FrequencyBars<K extends string>({ items, total, label }: { items: CountItem<K>[]; total: number; label: (k: K) => string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
        return (
          <li key={item.key} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-[#17152B]">{label(item.key)}</span>
              <span className="text-[#55607A] font-medium whitespace-nowrap">
                {item.count} of {total} days
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[#FFF0F6] overflow-hidden" aria-hidden="true">
              <div className="h-full rounded-full bg-[#F43F8F]" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const InsightsPage: React.FC = () => {
  const insights = useInsights(30);
  const { summary } = useCycle();
  const history = useCycleHistory();

  const header = (
    <div>
      <h2 className="text-xl sm:text-2xl font-black text-[#17152B] tracking-tight">Insights</h2>
      <p className="text-xs sm:text-sm text-[#68708A] font-medium">Patterns from your saved logs over the last 30 days.</p>
    </div>
  );

  if (insights.status === 'loading' && !insights.data) {
    return (
      <div className="space-y-4">
        {header}
        <LoadingState label="Loading insights" rows={3} />
      </div>
    );
  }
  if (insights.status === 'error' || !insights.data) {
    return (
      <div className="space-y-4">
        {header}
        <ErrorState message="We couldn't load your insights." onRetry={insights.retry} />
      </div>
    );
  }

  const data = insights.data;
  const enough = data.loggedDays >= INSIGHTS_MIN_LOGGED_DAYS;

  return (
    <div className="w-full space-y-5 sm:space-y-6 animate-fade-in">
      {header}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[22px] p-4 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#55607A]">Days logged</p>
          <p className="text-2xl font-black text-[#17152B] mt-1">
            {data.loggedDays}
            <span className="text-sm font-bold text-[#68708A]"> / {data.windowDays}</span>
          </p>
        </div>
        <div className="bg-white rounded-[22px] p-4 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#55607A]">Current phase (estimate)</p>
          <p className={`text-lg font-black mt-1 ${summary ? PHASE_STYLES[summary.currentPhase].text : 'text-[#17152B]'}`}>
            {summary ? `${PHASE_STYLES[summary.currentPhase].label} · day ${summary.currentCycleDay}` : 'Not set'}
          </p>
        </div>
        <div className="bg-white rounded-[22px] p-4 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#55607A]">Next period (estimate)</p>
          <p className="text-lg font-black text-[#17152B] mt-1">{summary ? formatDate(summary.nextPeriodDate, 'medium') : 'Not set'}</p>
        </div>
      </div>

      {!enough ? (
        <EmptyState
          icon={<BarChart3 className="w-5 h-5" aria-hidden="true" />}
          title="Not enough data yet"
          description={`Insights will appear after enough cycle data has been recorded. You've logged ${data.loggedDays} of the ${INSIGHTS_MIN_LOGGED_DAYS} days needed in the last ${data.windowDays} days.`}
          action={
            <button
              type="button"
              onClick={() => navigateToTab('dailyLog')}
              className="min-h-[44px] px-5 rounded-full bg-[#D81B60] hover:bg-[#BE123C] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Open Daily Log
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <Card title="Symptom frequency" icon={<Activity className="w-4.5 h-4.5" />}>
            {data.symptomFrequency.length === 0 ? (
              <EmptyState title="No symptoms logged" />
            ) : (
              <FrequencyBars items={data.symptomFrequency} total={data.loggedDays} label={(k) => SYMPTOMS.find((s) => s.id === k)?.label ?? k} />
            )}
          </Card>

          <Card title="Mood" icon={<Smile className="w-4.5 h-4.5" />}>
            {data.moodFrequency.length === 0 ? (
              <EmptyState title="No moods logged" />
            ) : (
              <FrequencyBars items={data.moodFrequency} total={data.loggedDays} label={(k) => k} />
            )}
          </Card>

          <Card title="Energy" icon={<Zap className="w-4.5 h-4.5" />}>
            {data.energyFrequency.length === 0 ? (
              <EmptyState title="No energy levels logged" />
            ) : (
              <FrequencyBars items={data.energyFrequency} total={data.loggedDays} label={(k) => k} />
            )}
          </Card>

          <Card title="Basal body temperature" icon={<Thermometer className="w-4.5 h-4.5" />}>
            {data.bbtReadings.length === 0 ? (
              <EmptyState title="No BBT readings" description="Log your temperature each morning to see the trend." />
            ) : (
              <table className="w-full text-left text-sm">
                <caption className="sr-only">BBT readings</caption>
                <thead>
                  <tr className="text-xs text-[#55607A] border-b border-[#F1DDE8]">
                    <th scope="col" className="pb-2 font-bold">Date</th>
                    <th scope="col" className="pb-2 font-bold text-right">°C</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1DDE8]/60">
                  {[...data.bbtReadings].reverse().map((r) => (
                    <tr key={r.date}>
                      <th scope="row" className="py-2 font-semibold text-[#17152B]">{formatDate(r.date, 'medium')}</th>
                      <td className="py-2 text-right font-bold text-[#17152B]">{r.celsius.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      )}

      <Card title="Cycle trends" icon={<BarChart3 className="w-4.5 h-4.5" />}>
        {history.status === 'loading' ? (
          <LoadingState label="Loading cycle history" rows={2} />
        ) : history.status === 'error' ? (
          <ErrorState message="We couldn't load your cycle history." onRetry={history.retry} />
        ) : (history.data ?? []).length === 0 ? (
          <EmptyState
            title="No completed cycles yet"
            description="Cycle length and period length trends need confirmed cycle history, which will come from your records once the backend is connected."
          />
        ) : (
          <ul className="space-y-2">
            {(history.data ?? []).map((c) => (
              <li key={c.startDate} className="text-sm text-[#17152B]">
                {formatDate(c.startDate, 'short')} – {formatDate(c.endDate, 'short')}: {c.cycleLength} days
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
