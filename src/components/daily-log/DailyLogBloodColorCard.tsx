import React, { useId } from 'react';
import { Check } from 'lucide-react';
import { BLOOD_COLORS } from '../../types/dailyLog';
import type { BloodColor } from '../../types/dailyLog';

interface DailyLogBloodColorCardProps {
  selectedColor: BloodColor | null;
  onSelectColor: (color: BloodColor | null) => void;
  disabled?: boolean;
}

const HEX: Record<BloodColor, string> = {
  'Bright Red': '#EF4444',
  'Dark Red': '#881337',
  Brown: '#78350F',
  Pink: '#FB7185',
};

export const DailyLogBloodColorCard: React.FC<DailyLogBloodColorCardProps> = ({ selectedColor, onSelectColor, disabled }) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3">
      <h3 id={headingId} className="text-xs font-bold tracking-wider uppercase text-[#68708A] text-left">
        Blood color
      </h3>
      <div role="group" aria-labelledby={headingId} className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2.5">
        {BLOOD_COLORS.map((color) => {
          const isSelected = color === selectedColor;
          return (
            <button
              key={color}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectColor(isSelected ? null : color)}
              className={`min-h-[44px] px-3 rounded-2xl flex items-center gap-3 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected ? 'border-2 border-[#F43F8F] bg-[#FFF0F6] shadow-2xs' : 'border border-gray-100 hover:border-pink-200 bg-white hover:bg-pink-50/40'
              }`}
            >
              <span
                aria-hidden="true"
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white shadow-2xs"
                style={{ backgroundColor: HEX[color] }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </span>
              <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold text-[#17152B]' : 'font-semibold text-[#68708A]'}`}>{color}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
