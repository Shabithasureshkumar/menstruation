import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useDailyLog } from '../hooks/useDailyLog';
import { useCycle, useCyclePredictions } from '../hooks/useCycle';
import { createId } from '../lib/id';
import type { DailyLogEntry, MedicationEntry, ProductEntry, SymptomKey } from '../types/dailyLog';
import { ErrorState, LoadingState } from '../components/common/AsyncState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { DailyLogDateSelectorCard } from '../components/daily-log/DailyLogDateSelectorCard';
import { DailyLogPhaseHeader } from '../components/daily-log/DailyLogPhaseHeader';
import { DailyLogAiInsightBanner } from '../components/daily-log/DailyLogAiInsightBanner';
import { DailyLogBloodFlowCard } from '../components/daily-log/DailyLogBloodFlowCard';
import { DailyLogMoodCard } from '../components/daily-log/DailyLogMoodCard';
import { DailyLogSymptomsCard } from '../components/daily-log/DailyLogSymptomsCard';
import { DailyLogProductsUsedCard } from '../components/daily-log/DailyLogProductsUsedCard';
import { DailyLogBloodColorCard } from '../components/daily-log/DailyLogBloodColorCard';
import { DailyLogCrampsCard } from '../components/daily-log/DailyLogCrampsCard';
import { DailyLogClotsCard } from '../components/daily-log/DailyLogClotsCard';
import { DailyLogEnergyCard } from '../components/daily-log/DailyLogEnergyCard';
import { DailyLogMedicationCard } from '../components/daily-log/DailyLogMedicationCard';
import { DailyLogMedicationModal } from '../components/daily-log/DailyLogMedicationModal';
import { DailyLogAddProductModal } from '../components/daily-log/DailyLogAddProductModal';
import { DailyLogFertilitySignsCard } from '../components/daily-log/DailyLogFertilitySignsCard';
import { DailyLogIntercourseCard } from '../components/daily-log/DailyLogIntercourseCard';

export const DailyLogPage: React.FC = () => {
  const log = useDailyLog();
  const { today } = useCycle();

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [medModal, setMedModal] = useState<{ open: boolean; editing: MedicationEntry | null }>({ open: false, editing: null });
  const [medToDelete, setMedToDelete] = useState<MedicationEntry | null>(null);
  const selectedPrediction = useCyclePredictions(log.selectedDate, log.selectedDate);

  if (log.status === 'loading') return <LoadingState label="Loading daily log" rows={5} />;
  if (log.status === 'error') return <ErrorState message="We couldn't load your logs." onRetry={log.retry} />;

  const { draft, selectedDate, canEditSelectedDate: canEdit } = log;
  const info = selectedPrediction.byDate[selectedDate] ?? null;
  const disabled = !canEdit;
  const set = <K extends keyof DailyLogEntry>(key: K, value: DailyLogEntry[K]) => log.updateDraft((d) => ({ ...d, [key]: value }));
  const medsForDate = log.medications.filter((m) => m.date === selectedDate);

  const DEFAULT_PRODUCTS: ProductEntry[] = [
    { id: 'prod-pad', type: 'Pad', label: 'Pads', size: 'Small', quantity: 2 },
    { id: 'prod-tampon', type: 'Tampon', label: 'Tampons', size: 'Light', quantity: 2 },
    { id: 'prod-cup', type: 'Menstrual cup', label: 'Menstrual cup', size: 'Medium', quantity: 0 },
  ];
  const currentProducts = draft.products.length > 0 ? draft.products : DEFAULT_PRODUCTS;

  const updateProduct = (id: string, patch: Partial<Pick<ProductEntry, 'quantity' | 'size'>>) =>
    log.updateDraft((d) => ({
      ...d,
      products: (d.products.length > 0 ? d.products : DEFAULT_PRODUCTS).map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));

  const DEFAULT_ACTIVE_SYMPTOMS: SymptomKey[] = ['headache', 'breastTenderness', 'fatigue', 'nausea', 'other'];

  return (
    <div className="w-full space-y-6 sm:space-y-7">
      <DailyLogDateSelectorCard
        selectedDate={selectedDate}
        today={today}
        savedLogs={log.savedLogs}
        onSelectDate={log.selectDate}
      />

      <DailyLogPhaseHeader date={selectedDate} isToday={selectedDate === today} info={info} />

      {!canEdit && (
        <p role="note" className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          This date is in the future. You can view the estimated phase, but logging is only available for today and earlier.
        </p>
      )}

      <DailyLogAiInsightBanner phase={info?.phase ?? null} />

      {/* Row: Blood Flow + Mood */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch w-full">
        <DailyLogBloodFlowCard selectedFlow={draft.flow ?? 'Medium'} onSelectFlow={(v) => set('flow', v)} disabled={disabled} />
        <DailyLogMoodCard selectedMood={draft.mood ?? 'Irritable'} onSelectMood={(v) => set('mood', v)} disabled={disabled} />
      </div>

      {/* Full-Width Symptoms Section Matching Reference */}
      <DailyLogSymptomsCard
        symptoms={draft.symptoms.length > 0 ? draft.symptoms : DEFAULT_ACTIVE_SYMPTOMS}
        onToggle={(s: SymptomKey) =>
          log.updateDraft((d) => {
            const current: SymptomKey[] = d.symptoms.length > 0 ? d.symptoms : DEFAULT_ACTIVE_SYMPTOMS;
            return {
              ...d,
              symptoms: current.includes(s) ? current.filter((x) => x !== s) : [...current, s],
            };
          })
        }
        disabled={disabled}
      />

      {/* Two Column Layout Matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start w-full">
        {/* Left Column: Products Used */}
        <div className="w-full">
          <DailyLogProductsUsedCard
            products={currentProducts}
            onChangeProduct={updateProduct}
            onDeleteProduct={(id) =>
              log.updateDraft((d) => ({
                ...d,
                products: (d.products.length > 0 ? d.products : DEFAULT_PRODUCTS).filter((p) => p.id !== id),
              }))
            }
            onOpenAddModal={() => setProductModalOpen(true)}
            disabled={disabled}
          />
        </div>

        {/* Right Column: Blood Color + (Cramps/Clots) + (Energy/Medication) */}
        <div className="w-full space-y-5 sm:space-y-6">
          <DailyLogBloodColorCard selectedColor={draft.bloodColor ?? 'Bright Red'} onSelectColor={(v) => set('bloodColor', v)} disabled={disabled} />

          {/* Row 1: Cramps Level + Clots Present */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            <DailyLogCrampsCard
              cramps={draft.cramps ?? 'Mild'}
              onChangeCramps={(v) => set('cramps', v)}
              disabled={disabled}
            />
            <DailyLogClotsCard
              clotsPresent={draft.clotsPresent ?? true}
              clotSize={draft.clotSize ?? 'Small'}
              onChangePresent={(v) => log.updateDraft((d) => ({ ...d, clotsPresent: v, clotSize: v ? (d.clotSize ?? 'Small') : null }))}
              onChangeSize={(v) => set('clotSize', v)}
              disabled={disabled}
            />
          </div>

          {/* Row 2: Energy Level + Medication */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <DailyLogEnergyCard
              energy={draft.energy ?? 'Medium'}
              onChangeEnergy={(v) => set('energy', v)}
              disabled={disabled}
            />
            <DailyLogMedicationCard
              medications={
                medsForDate.length > 0
                  ? medsForDate
                  : [
                      { id: 'med-ibu', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: selectedDate, time: '08:00', status: 'Taken' },
                      { id: 'med-mef', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: selectedDate, time: '13:00', status: 'Taken' },
                    ]
              }
              canAdd={canEdit}
              isPending={log.isMedicationPending}
              onAdd={() => setMedModal({ open: true, editing: null })}
              onEdit={(med) => setMedModal({ open: true, editing: med })}
              onDelete={setMedToDelete}
              onSetStatus={(med, status) => {
                const { id, ...rest } = med;
                log.updateMedication(id, { ...rest, status });
              }}
            />
          </div>
        </div>
      </div>

      {/* Fertility Signs & Intimacy / Libido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start w-full">
        <DailyLogFertilitySignsCard
          key={`${selectedDate}-fertility`}
          cervicalMucus={draft.cervicalMucus}
          bbtCelsius={draft.bbtCelsius}
          lhTest={draft.lhTest}
          onChangeMucus={(v) => set('cervicalMucus', v)}
          onChangeBbt={(v) => set('bbtCelsius', v)}
          onChangeLh={(v) => set('lhTest', v)}
          onValidityChange={() => {}}
          disabled={disabled}
        />
        <DailyLogIntercourseCard
          intercourse={draft.intercourse}
          libido={draft.libido}
          onChangeIntercourse={(v) => set('intercourse', v)}
          onChangeLibido={(v) => set('libido', v)}
          disabled={disabled}
        />
      </div>

      {/* Bottom Save Log Button */}
      <div className="flex items-center justify-end pt-4 pb-8">
        <button
          type="button"
          onClick={() => log.saveDraft()}
          disabled={log.isSaving || disabled}
          className="px-10 py-3.5 rounded-full bg-[#F43F8F] hover:bg-[#E02874] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {log.isSaving ? 'Saving…' : 'Save log'}
        </button>
      </div>

      <DailyLogAddProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onAdd={(p) => log.updateDraft((d) => ({ ...d, products: [...d.products, { ...p, id: createId('prod') }] }))}
      />

      <DailyLogMedicationModal
        isOpen={medModal.open}
        editing={medModal.editing}
        defaultDate={selectedDate}
        today={today}
        isSaving={log.isMedicationPending}
        onClose={() => setMedModal({ open: false, editing: null })}
        onSubmit={(input) => (medModal.editing ? log.updateMedication(medModal.editing.id, input) : log.addMedication(input))}
      />

      <ConfirmDialog
        isOpen={medToDelete !== null}
        title="Delete medication?"
        message={medToDelete ? `Remove ${medToDelete.name} from this date? This can't be undone.` : ''}
        confirmLabel="Delete"
        onConfirm={() => (medToDelete ? log.removeMedication(medToDelete.id) : false)}
        onClose={() => setMedToDelete(null)}
      />
    </div>
  );
};
