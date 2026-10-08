import React, { useId, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { SYMPTOMS } from '../../types/dailyLog';
import type { SymptomKey } from '../../types/dailyLog';

interface DailyLogSymptomsCardProps {
  symptoms: SymptomKey[];
  onToggle: (symptom: SymptomKey) => void;
  disabled?: boolean;
}

export const DailyLogSymptomsCard: React.FC<DailyLogSymptomsCardProps> = ({ symptoms, onToggle, disabled }) => {
  const headingId = useId();
  const [customSymptom, setCustomSymptom] = useState('');

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white rounded-[22px] p-5 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4 text-left"
    >
      <div className="space-y-0.5 text-left">
        <h3 id={headingId} className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-[#17152B]">
          SYMPTOMS
        </h3>
        <p className="text-xs text-[#8A92A6] font-medium">
          Options — select as many as you like.
        </p>
      </div>

      <div role="group" aria-labelledby={headingId} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {SYMPTOMS.map((s) => {
          const isSelected = symptoms.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onToggle(s.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-2 ${
                isSelected
                  ? 'border-[#F43F8F] bg-[#FFF0F6] text-[#D81B60] font-bold shadow-2xs'
                  : 'border-[#EAE7EE] bg-white text-[#17152B] hover:border-pink-200 hover:bg-pink-50/40'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#F43F8F] text-white' : 'text-[#8A92A6]'
                }`}
              >
                {isSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <Plus className="w-3 h-3" />}
              </span>
              <span className="truncate">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-1">
        <input
          type="text"
          value={customSymptom}
          disabled={disabled}
          onChange={(e) => setCustomSymptom(e.target.value)}
          placeholder="Tell us what you'd like to track, e.g. Joint pain"
          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#F1DDE8] bg-white placeholder-[#9CA3AF] text-xs sm:text-sm text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 transition-all"
        />
      </div>
    </section>
  );
};
