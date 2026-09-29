import React, { useId } from 'react';
import { Pencil, Pill, Plus, Trash2 } from 'lucide-react';
import { formatTime } from '../../lib/date';
import { formatDose } from '../../types/dailyLog';
import type { MedicationEntry, MedicationStatus } from '../../types/dailyLog';
import { EmptyState } from '../common/AsyncState';

interface DailyLogMedicationCardProps {
  medications: MedicationEntry[];
  canAdd: boolean;
  isPending: boolean;
  onAdd: () => void;
  onEdit: (med: MedicationEntry) => void;
  onDelete: (med: MedicationEntry) => void;
  onSetStatus: (med: MedicationEntry, status: MedicationStatus) => void;
}

/** Medications for the selected date. Changes save immediately (they are not part of the draft). */
export const DailyLogMedicationCard: React.FC<DailyLogMedicationCardProps> = ({
  medications,
  canAdd,
  isPending,
  onAdd,
  onEdit,
  onDelete,
  onSetStatus,
}) => {
  const headingId = useId();
  const sorted = [...medications].sort((a, b) => a.time.localeCompare(b.time));
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFF0F6] flex items-center justify-center shrink-0" aria-hidden="true">
            <Pill className="w-4 h-4 text-[#F43F8F]" />
          </div>
          <div>
            <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
              Medication
            </h3>
            <p className="text-[0.68rem] text-[#68708A]">Saved immediately</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          aria-haspopup="dialog"
          className="px-4 min-h-[44px] rounded-full bg-[#D81B60] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          <span>Log</span>
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState title="No medications logged" description={canAdd ? 'Use “Log” to record a medication for this date.' : 'Medications cannot be logged for future dates.'} />
      ) : (
        <ul className="space-y-2 pt-1">
          {sorted.map((med) => (
            <li key={med.id} className="p-2.5 rounded-2xl bg-[#FFF8FA] border border-[#F5E2EC] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#17152B] leading-tight break-words">{med.name}</h4>
                  <p className="text-[0.72rem] text-[#68708A] font-medium leading-tight">
                    {formatDose(med)} · {formatTime(med.time)}
                  </p>
                </div>
                <div className="flex items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onEdit(med)}
                    disabled={isPending}
                    aria-label={`Edit ${med.name}`}
                    className="w-11 h-11 rounded-full text-[#68708A] hover:text-[#17152B] hover:bg-white flex items-center justify-center cursor-pointer disabled:opacity-40"
                  >
                    <Pencil className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(med)}
                    disabled={isPending}
                    aria-label={`Delete ${med.name}`}
                    className="w-11 h-11 rounded-full text-pink-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center cursor-pointer disabled:opacity-40"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div role="group" aria-label={`${med.name} status`} className="flex items-center bg-white p-0.5 rounded-full border border-pink-200 shadow-2xs w-fit">
                {(['Taken', 'Skipped'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={med.status === s}
                    disabled={isPending}
                    onClick={() => med.status !== s && onSetStatus(med, s)}
                    className={`px-3.5 min-h-[44px] rounded-full text-[0.72rem] font-bold transition-all cursor-pointer disabled:opacity-60 ${
                      med.status === s ? (s === 'Taken' ? 'bg-[#047857] text-white' : 'bg-[#D81B60] text-white') : 'text-[#55607A] hover:text-[#17152B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
