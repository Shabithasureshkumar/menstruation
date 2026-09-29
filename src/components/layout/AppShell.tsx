import React, { useEffect } from 'react';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { TopHeader } from './TopHeader';
import { NotFoundView } from './NotFoundView';
import { MainHeroHeader } from '../overview/MainHeroHeader';
import { PhaseNavigation } from '../overview/PhaseNavigation';
import { MenstruationOverviewPage } from '../../pages/MenstruationOverviewPage';
import { CycleCalendarPage } from '../../pages/CycleCalendarPage';
import { DailyLogPage } from '../../pages/DailyLogPage';
import { InsightsPage } from '../../pages/InsightsPage';
import { MenstruationSettingsPage } from '../../pages/MenstruationSettingsPage';
import { useRoute } from '../../hooks/useRoute';
import type { SubNavTab } from '../../types/cycleTracker';

const TITLES: Record<SubNavTab, string> = {
  overview: 'Overview',
  calendar: 'Calendar',
  dailyLog: 'Daily Log',
  insights: 'Insights',
  settings: 'Settings',
};

const VIEWS: Record<SubNavTab, React.FC> = {
  overview: MenstruationOverviewPage,
  calendar: CycleCalendarPage,
  dailyLog: DailyLogPage,
  insights: InsightsPage,
  settings: MenstruationSettingsPage,
};

/** Shared header, hero and phase navigation around the routed view. */
export const AppShell: React.FC = () => {
  const route = useRoute();
  const tab = route.tab;

  useEffect(() => {
    document.title = `${tab ? TITLES[tab] : 'Page not found'} · Cycle Tracker`;
  }, [tab]);

  const View = tab ? VIEWS[tab] : null;

  return (
    <div className="min-h-screen bg-[#FFFCFE] text-[#17152B] font-sans antialiased w-full">
      <TopHeader />

      <main
        id="main-content"
        className="w-full max-w-none mx-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 space-y-4 sm:space-y-5 md:space-y-6"
      >
        <MainHeroHeader />
        <PhaseNavigation activeTab={tab} />

        <ErrorBoundary resetKey={tab ?? 'not-found'}>
          <div>{View ? <View /> : <NotFoundView />}</div>
        </ErrorBoundary>
      </main>

      <footer className="w-full max-w-none mx-0 px-4 sm:px-6 lg:px-8 xl:px-10 pb-24 sm:pb-8 pt-2">
        <p className="text-[0.7rem] sm:text-xs text-[#8A92A6] leading-relaxed border-t border-[#F1DDE8]/70 pt-3">
          Demo build — patient identity is sample data. Logs and settings are stored only in this browser (localStorage),
          are not encrypted, and are not shared with anyone. Cycle dates are estimates from your settings, not medical advice.
        </p>
      </footer>
    </div>
  );
};
