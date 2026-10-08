import React, { useState } from 'react';
import type { MetricCardData, SubNavTab } from '../types/cycleTracker';
import { SYMPTOMS } from '../types/dailyLog';
import { formatDate } from '../lib/date';
import { navigateToTab } from '../lib/router';
import { wellnessCardsData } from '../data/wellnessContent';
import { useCycle, useCycleHistory } from '../hooks/useCycle';
import { useDailyLog } from '../hooks/useDailyLog';
import { ErrorState, LoadingState } from '../components/common/AsyncState';
import { MenstruationStatusCard } from '../components/overview/MenstruationStatusCard';
import { PeriodHeroCard } from '../components/overview/PeriodHeroCard';
import { TrackingCardsSection } from '../components/overview/TrackingCardsSection';
import { SixMetricCards } from '../components/overview/SixMetricCards';
import { CycleInsightsSection } from '../components/overview/CycleInsightsSection';
import { AIRecommendationCard } from '../components/overview/AIRecommendationCard';
import { MedicationHistorySection } from '../components/overview/MedicationHistorySection';
import { WellnessCardsSection } from '../components/overview/WellnessCardsSection';
import { PreviousCyclesTable } from '../components/overview/PreviousCyclesTable';
import { PeriodCareTipsModal } from '../components/overview/PeriodCareTipsModal';
import { AICycleAssistantModal } from '../components/overview/AICycleAssistantModal';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const MenstruationOverviewPage: React.FC = () => {
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const { summary, today, status: cycleStatus, retry: retryCycle } = useCycle();
  const { savedLogs, medications, status: logStatus, retry: retryLogs, selectDate } = useDailyLog();
  const history = useCycleHistory();

  if (cycleStatus === 'loading' || logStatus === 'loading') {
    return <LoadingState label="Loading overview" rows={4} />;
  }
  if (cycleStatus === 'error' || logStatus === 'error') {
    return (
      <ErrorState
        message="We couldn't load your overview."
        onRetry={() => {
          retryCycle();
          retryLogs();
        }}
      />
    );
  }

  const todayLog = savedLogs[today] ?? null;
  const isPeriodLogged = Boolean(
    (todayLog?.flow !== null && todayLog?.flow !== undefined) ||
    (summary !== null && summary.isOnPeriod)
  );
  const symptomLabels = (todayLog?.symptoms ?? []).map((s) => SYMPTOMS.find((x) => x.id === s)?.label ?? s);

  // Derive dynamic Clots / Blood Flow card value & description from saved Daily Log
  const getClotsMetric = (): { value: string; description: string } => {
    if (todayLog) {
      const flowText = todayLog.flow ?? 'Medium';
      if (todayLog.clotsPresent) {
        const sizeText = todayLog.clotSize ? `\n${todayLog.clotSize} clots` : '\nSmall clots';
        return {
          value: flowText,
          description: `Clots present: ON${sizeText}`,
        };
      }
      if (todayLog.flow) {
        return {
          value: flowText,
          description: 'No clots logged',
        };
      }
    }

    return {
      value: 'Medium',
      description: 'Clots present: ON\nSmall clots',
    };
  };

  const clotsMetric = getClotsMetric();

  const metrics: (MetricCardData & { target: SubNavTab })[] = [
    {
      id: 'period',
      label: 'Period Tracker',
      value: !summary ? 'Day 2 of 5' : summary.isOnPeriod ? `Day ${summary.currentCycleDay} of ${summary.periodDuration}` : 'Day 2 of 5',
      description: todayLog?.flow ? `${todayLog.flow} flow` : 'Moderate flow',
      visualType: 'period-tracker-woman',
      actionLabel: 'Open today’s log',
      target: 'dailyLog',
    },
    {
      id: 'cramps',
      label: 'Cramps Level',
      value: todayLog?.cramps ?? 'Moderate',
      description: todayLog?.cramps ? 'Common during period' : 'Common during period',
      visualType: 'cramps',
      actionLabel: 'Open today’s log',
      target: 'dailyLog',
    },
    {
      id: 'clots',
      label: 'Blood Flow',
      value: clotsMetric.value,
      description: clotsMetric.description,
      visualType: 'clot',
      actionLabel: 'Open today’s log',
      target: 'dailyLog',
    },
    {
      id: 'symptoms',
      label: 'Symptoms',
      value: symptomLabels.length > 0 ? `${symptomLabels.length} logged today` : '3 logged today',
      description: symptomLabels.length > 0 ? symptomLabels.join(', ') : 'Cramps, Bloating, Fatigue',
      visualType: 'symptoms',
      actionLabel: 'Open today’s log',
      target: 'dailyLog',
    },
    {
      id: 'next-period',
      label: 'Next Period',
      value: summary ? formatDate(summary.nextPeriodDate, 'medium') : 'Oct 1, 2026',
      description: summary ? `In ${plural(summary.daysUntilNextPeriod, 'day')}` : 'In 26 days',
      visualType: 'next-period',
      actionLabel: summary ? 'Open calendar' : 'Open settings',
      target: summary ? 'calendar' : 'settings',
    },
    {
      id: 'regularity',
      label: 'AI PREDICTION',
      labelStyle: 'eyebrow',
      value: 'Regular cycle',
      description: '84% accuracy',
      visualType: 'ai-prediction',
      actionLabel: 'Open settings',
      target: 'settings',
    },
  ];

  const openMetric = (id: string) => {
    const metric = metrics.find((m) => m.id === id);
    if (!metric) return;
    if (metric.target === 'dailyLog') selectDate(today);
    navigateToTab(metric.target);
  };

  const handleOpenDailyLog = () => {
    selectDate(today);
    navigateToTab('dailyLog');
  };

  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch w-full">
        <div className="flex w-full">
          <MenstruationStatusCard
            summary={summary}
            isPeriodLogged={isPeriodLogged}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onLogPeriod={handleOpenDailyLog}
          />
        </div>
        <div className="flex w-full">
          <PeriodHeroCard
            phase={summary?.currentPhase ?? null}
            isPeriodLogged={isPeriodLogged}
            onViewTips={() => setIsTipsOpen(true)}
            onLogPeriod={handleOpenDailyLog}
          />
        </div>
      </div>

      {!isPeriodLogged ? (
        <TrackingCardsSection
          todayLog={todayLog}
          onLogNow={handleOpenDailyLog}
        />
      ) : (
        <>
          <SixMetricCards metrics={metrics} onCardClick={openMetric} />

          <CycleInsightsSection energy={todayLog?.energy ?? null} mood={todayLog?.mood ?? null} phase={summary?.currentPhase ?? null} />

          <AIRecommendationCard phase={summary?.currentPhase ?? null} onAskAssistant={() => setIsAssistantOpen(true)} />

          <MedicationHistorySection medications={medications} />

          <WellnessCardsSection cards={wellnessCardsData} />

          <PreviousCyclesTable
            status={history.status}
            cycles={history.data ?? []}
            onRetry={history.retry}
          />
        </>
      )}

      <PeriodCareTipsModal isOpen={isTipsOpen} onClose={() => setIsTipsOpen(false)} />
      <AICycleAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};
