import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppShell } from './components/layout/AppShell';
import { DailyLogProvider } from './context/DailyLogProvider';
import { PatientProvider } from './context/PatientProvider';
import { SettingsProvider } from './context/SettingsProvider';
import { ToastProvider } from './context/ToastProvider';
import { TodayProvider } from './context/TodayProvider';

export function App() {
  return (
    <ErrorBoundary>
      <TodayProvider>
        <ToastProvider>
          <PatientProvider>
            <SettingsProvider>
              <DailyLogProvider>
                <AppShell />
              </DailyLogProvider>
            </SettingsProvider>
          </PatientProvider>
        </ToastProvider>
      </TodayProvider>
    </ErrorBoundary>
  );
}

export default App;
