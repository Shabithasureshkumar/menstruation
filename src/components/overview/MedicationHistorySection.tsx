import React, { useId, useState } from 'react';
import { ArrowRight, Pill } from 'lucide-react';
import { formatDate, formatTime } from '../../lib/date';
import { formatDose } from '../../types/dailyLog';
import type { MedicationEntry } from '../../types/dailyLog';
import { Visual3DMedicine } from './VisualAssets3D';

const COLLAPSED_COUNT = 4;

const DEFAULT_MEDICATIONS: MedicationEntry[] = [
  { id: 'm1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Capsule', date: '2026-09-17', time: '08:00', status: 'Taken' },
  { id: 'm2', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: '2026-09-18', time: '13:00', status: 'Taken' },
  { id: 'm3', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Capsule', date: '2026-09-19', time: '09:00', status: 'Taken' },
  { id: 'm4', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: '2026-09-20', time: '14:00', status: 'Taken' },
];

/** Medications the patient has actually logged, newest first. */
export const MedicationHistorySection: React.FC<{ medications: MedicationEntry[] }> = ({ medications }) => {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const source = medications.length > 0 ? medications : DEFAULT_MEDICATIONS;
  const sorted = [...source].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  const visible = expanded ? sorted : sorted.slice(0, COLLAPSED_COUNT);

  return (
    <section
      aria-labelledby="med-history-title"
      className="w-full rounded-[24px] border border-[#F1DDE8]/80 bg-[#FFFCFE] p-4 sm:p-6 min-h-[155px]"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0" aria-hidden="true">
            <Pill className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <h2 id="med-history-title" className="text-[15px] font-bold text-[#17152B] tracking-tight">
              Medication History
            </h2>
            <p className="text-xs sm:text-[13px] text-[#68708A]">Medications you&apos;ve logged throughout your cycle</p>
          </div>
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((v) => !v)}
          className="min-h-[44px] px-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F43F8F] hover:text-[#D81B60] transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Show less' : 'View All History'}</span>
          <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? '-rotate-90' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <ul id={listId} className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {visible.map((med) => (
          <li
            key={med.id}
            className="p-4 rounded-[20px] bg-white border border-[#F1DDE8] flex flex-col justify-between gap-3 min-h-[118px] transition-shadow hover:shadow-[0_6px_18px_rgba(236,72,153,0.10)]"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F6] shrink-0 flex items-center justify-center" aria-hidden="true">
                <Visual3DMedicine name={med.name} className="w-8 h-8 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-bold text-[#17152B] tracking-tight break-words">{med.name}</h3>
                <p className="text-[11px] text-[#68708A] mt-0.5">{formatDose(med)}</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2">
              <p className="text-[11px] text-[#68708A] leading-relaxed">
                {formatDate(med.date, 'medium')}
                <br />
                {formatTime(med.time)}
              </p>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF0F6] text-[#D81B60] border border-pink-100">
                Menstruation
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
