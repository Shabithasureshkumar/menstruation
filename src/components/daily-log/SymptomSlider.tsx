import React from 'react';
import type { SymptomKey } from '../../types/dailyLog';

interface SymptomSliderProps {
  id: SymptomKey;
  name: string;
  emoji: string;
  value: number;
  onChange: (id: SymptomKey, val: number) => void;
}

export const SymptomSlider: React.FC<SymptomSliderProps> = ({
  id,
  name,
  emoji,
  value,
  onChange,
}) => {
  const percentage = (value / 10) * 100;

  return (
    <div className="flex items-center gap-2 sm:gap-3 py-1 w-full min-w-0">
      {/* Emoji & Name */}
      <div className="flex items-center gap-1.5 w-[95px] sm:w-[125px] shrink-0 min-w-0">
        <span className="text-sm shrink-0" role="img" aria-label={name}>
          {emoji}
        </span>
        <span className="text-[0.76rem] sm:text-[0.8rem] font-medium text-[#181322] truncate">
          {name}
        </span>
      </div>

      {/* Interactive Slider Track */}
      <div className="relative flex-1 flex items-center min-w-[50px]">
        <div className="w-full h-1.5 rounded-full bg-[#F8F3F9] relative overflow-hidden pointer-events-none">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #955BE3 0%, #E942A2 100%)',
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(id, parseInt(e.target.value, 10))}
          aria-label={`${name} severity rating`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Visual Custom Thumb */}
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-[#955BE3] shadow-xs pointer-events-none transform -translate-x-1/2 transition-all duration-75"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Numeric Score */}
      <div className="w-4 text-right shrink-0">
        <span className="text-xs font-semibold text-[#666072] tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
};
