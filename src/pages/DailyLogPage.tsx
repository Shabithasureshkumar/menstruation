import React from 'react';
import { useDailyLog } from '../hooks/useDailyLog';
import { initialPatientProfile, initialCycleSummary } from '../data/dailyLogData';

// Left Column Components
import { DailyLogHeader } from '../components/daily-log/DailyLogHeader';
import { DailyLogCalendar } from '../components/daily-log/DailyLogCalendar';
import { MenstruationPhaseCard } from '../components/daily-log/MenstruationPhaseCard';
import { WellnessMetrics } from '../components/daily-log/WellnessMetrics';
import { SymptomsTracking } from '../components/daily-log/SymptomsTracking';
import { EditWellnessModal } from '../components/daily-log/EditWellnessModal';
import { SymptomTrendsModal } from '../components/daily-log/SymptomTrendsModal';

// Right Column Sidebar Components
import { PatientProfile } from '../components/sidebar/PatientProfile';
import { CycleSummary } from '../components/sidebar/CycleSummary';
import { TodayInsights } from '../components/sidebar/TodayInsights';
import { PersonalNotes } from '../components/sidebar/PersonalNotes';
import { ConnectedDevices } from '../components/sidebar/ConnectedDevices';
import { QuickLog } from '../components/sidebar/QuickLog';
import { QuickLogModal } from '../components/sidebar/QuickLogModal';

// Common Components
import { Toast } from '../components/common/Toast';

export const DailyLogPage: React.FC = () => {
  const {
    selectedDate,
    calendarDays,
    logState,
    devices,
    toast,
    isEditWellnessOpen,
    isSymptomTrendsOpen,
    quickLogModalType,
    setIsEditWellnessOpen,
    setIsSymptomTrendsOpen,
    setQuickLogModalType,
    hideToast,
    selectDate,
    goToToday,
    shiftCalendarRange,
    setBloodFlow,
    setCrampsSeverity,
    updateProductCount,
    setBloodColor,
    setEnergyLevel,
    toggleClotsPresent,
    setClotSize,
    toggleMedication,
    updateWellnessMetrics,
    updateSymptom,
    setPersonalNote,
    savePersonalNote,
    syncDevice,
  } = useDailyLog();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 selection:bg-brand-pink-200">
      {/* Centered Maximum Container */}
      <div className="max-w-[1440px] mx-auto px-[clamp(0.875rem,2vw,2.5rem)] py-[clamp(1rem,2vw,2rem)]">
        {/* Main Grid: Fluid Left Column + Fluid Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(17.5rem,22vw,20.5rem)] gap-[clamp(1rem,2vw,2rem)] items-start">
          {/* ============================================================ */}
          {/* LEFT PRIMARY CONTENT AREA                                    */}
          {/* ============================================================ */}
          <main className="min-w-0 self-start flex flex-col gap-[clamp(0.875rem,1.5vw,1.25rem)]">
            {/* 1. Page Header */}
            <DailyLogHeader />

            {/* 2. Horizontal Calendar */}
            <DailyLogCalendar
              selectedDate={selectedDate}
              calendarDays={calendarDays}
              onSelectDate={selectDate}
              onGoToToday={goToToday}
              onShiftCalendar={shiftCalendarRange}
            />

            {/* 3. Menstruation Phase Dashboard */}
            <MenstruationPhaseCard
              formattedDate={logState.formattedDate}
              bloodFlow={logState.bloodFlow}
              crampsScore={logState.crampsScore}
              crampsSeverity={logState.crampsSeverity}
              productsUsed={logState.productsUsed}
              bloodColor={logState.bloodColor}
              clotsPresent={logState.clotsPresent}
              clotSize={logState.clotSize}
              energyLevel={logState.energyLevel}
              medicationActive={logState.medicationActive}
              medicationName={logState.medicationName}
              aiInsight={logState.aiInsight}
              onSelectFlow={setBloodFlow}
              onSelectCrampsSeverity={setCrampsSeverity}
              onUpdateProductCount={updateProductCount}
              onSelectBloodColor={setBloodColor}
              onSelectEnergyLevel={setEnergyLevel}
              onToggleClots={toggleClotsPresent}
              onSelectClotSize={setClotSize}
              onToggleMedication={toggleMedication}
            />

            {/* 4. Wellness Metrics */}
            <WellnessMetrics
              metrics={logState.wellnessMetrics}
              formattedSubtext={`${logState.formattedDate.replace('2026', '').trim()} – Cycle Day ${logState.cycleDay}`}
              onOpenEditModal={() => setIsEditWellnessOpen(true)}
            />

            {/* 5. Symptoms Tracking */}
            <SymptomsTracking
              symptoms={logState.symptoms}
              onUpdateSymptom={updateSymptom}
              onViewTrends={() => setIsSymptomTrendsOpen(true)}
            />
          </main>

          {/* ============================================================ */}
          {/* RIGHT SIDEBAR                                                */}
          {/* ============================================================ */}
          <aside className="self-start flex flex-col gap-[clamp(1rem,1.5vw,1.5rem)] bg-white p-[clamp(1rem,1.5vw,1.25rem)] rounded-3xl border border-gray-100/90 shadow-2xs lg:border-l lg:border-gray-100 lg:shadow-none lg:bg-transparent lg:p-0">
            {/* 1. Patient Profile Card */}
            <PatientProfile profile={initialPatientProfile} />

            {/* 2. Cycle Summary */}
            <CycleSummary summary={initialCycleSummary} />

            {/* 3. Today's Insights */}
            <TodayInsights insights={logState.insights} />

            {/* 4. Personal Notes */}
            <PersonalNotes
              note={logState.personalNote}
              onChangeNote={setPersonalNote}
              onSaveNote={savePersonalNote}
            />

            {/* 5. Connected Devices */}
            <ConnectedDevices
              devices={devices}
              onSyncDevice={syncDevice}
            />

            {/* 6. Quick Log */}
            <QuickLog onOpenQuickLog={(type) => setQuickLogModalType(type)} />
          </aside>
        </div>
      </div>

      {/* Modals & Dialogs */}
      <EditWellnessModal
        isOpen={isEditWellnessOpen}
        onClose={() => setIsEditWellnessOpen(false)}
        metrics={logState.wellnessMetrics}
        onSave={updateWellnessMetrics}
      />

      <SymptomTrendsModal
        isOpen={isSymptomTrendsOpen}
        onClose={() => setIsSymptomTrendsOpen(false)}
      />

      <QuickLogModal
        type={quickLogModalType}
        onClose={() => setQuickLogModalType(null)}
        currentFlow={logState.bloodFlow}
        wellness={logState.wellnessMetrics}
        symptoms={logState.symptoms}
        onUpdateFlow={setBloodFlow}
        onUpdateWellness={updateWellnessMetrics}
        onUpdateSymptom={updateSymptom}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
};
