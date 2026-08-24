import React from 'react';
import { Check } from 'lucide-react';
import type { BloodColor } from '../../types/dailyLog';

interface BloodColorSelectorProps {
  currentColor: BloodColor;
  onSelectColor: (color: BloodColor) => void;
}

export const BloodColorSelector: React.FC<BloodColorSelectorProps> = ({
  currentColor,
  onSelectColor,
}) => {
  const colors: Array<{
    name: BloodColor;
    hex: string;
    bgHover: string;
  }> = [
    { name: 'Bright Red', hex: '#F51D31', bgHover: 'hover:border-red-200' },
    { name: 'Dark Red', hex: '#930016', bgHover: 'hover:border-rose-300' },
    { name: 'Brown', hex: '#6E351A', bgHover: 'hover:border-amber-300' },
    { name: 'Pink', hex: '#F9ACB1', bgHover: 'hover:border-pink-300' },
  ];

  return (
    <div className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1rem,1.8vw,1.5rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6578] block mb-2.5 sm:mb-3">
        Blood Color
      </span>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
        {colors.map((c) => {
          const isSelected = c.name === currentColor;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onSelectColor(c.name)}
              aria-pressed={isSelected}
              className={`p-2.5 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-between gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer min-h-[68px] sm:min-h-[76px] ${
                isSelected
                  ? 'bg-white border-2 sm:border-3 border-[#FFEFF4] shadow-md ring-2 ring-[#F51D31]/30 scale-[1.02]'
                  : `bg-white border border-[#EBE6EC] ${c.bgHover} hover:bg-gray-50/70 shadow-xs`
              }`}
            >
              {/* Left side: color circle + label */}
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs shrink-0 relative"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3]" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1923] truncate">
                  {c.name}
                </span>
              </div>

              {/* Droplet graphic */}
              <div className="shrink-0 opacity-85 hidden sm:block">
                <svg className="w-4 h-5 sm:w-5 sm:h-6" viewBox="0 0 24 28" fill="none">
                  <path
                    d="M12 2C12 2 3 13 3 19C3 23.97 7.03 28 12 28C16.97 28 21 23.97 21 19C21 13 12 2 12 2Z"
                    fill={c.hex}
                  />
                  <ellipse cx="9" cy="19" rx="2" ry="3.5" fill="#FFFFFF" fillOpacity="0.25" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
