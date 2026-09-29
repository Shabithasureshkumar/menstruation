import React, { useId } from 'react';
import { ClipboardList } from 'lucide-react';
import { SYMPTOMS } from '../../types/dailyLog';
import type { SymptomKey } from '../../types/dailyLog';

interface DailyLogSymptomsCardProps {
  symptoms: SymptomKey[];
  onToggle: (symptom: SymptomKey) => void;
  disabled?: boolean;
}

export const DailyLogSymptomsCard: React.FC<DailyLogSymptomsCardProps> = ({ symptoms, onToggle, disabled }) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0" aria-hidden="true">
          <ClipboardList className="w-4 h-4" />
        </div>
        <div>
          <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
            Symptoms
          </h3>
          <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">
            {symptoms.length > 0 ? `${symptoms.length} selected` : 'Select any that apply'}
          </p>
        </div>
      </div>
      <div role="group" aria-labelledby={headingId} className="flex flex-wrap gap-2">
        {SYMPTOMS.map((s) => {
          const isSelected = symptoms.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onToggle(s.id)}
              className={`min-h-[44px] px-3.5 rounded-full text-xs font-bold border transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected ? 'bg-[#D81B60] text-white border-[#D81B60]' : 'bg-[#FAF8FA] text-[#55607A] border-gray-100 hover:bg-pink-50 hover:text-[#17152B]'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
