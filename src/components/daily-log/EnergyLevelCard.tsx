import React from 'react';
import { Zap } from 'lucide-react';
import type { EnergyLevel } from '../../types/dailyLog';

interface EnergyLevelCardProps {
  energyLevel: EnergyLevel;
  onSelectEnergyLevel: (level: EnergyLevel) => void;
}

export const EnergyLevelCard: React.FC<EnergyLevelCardProps> = ({
  energyLevel,
  onSelectEnergyLevel,
}) => {
  const levels: Array<{ label: EnergyLevel; icon: string }> = [
    { label: 'Low', icon: '🌱' },
    { label: 'Medium', icon: '⚡' },
    { label: 'High', icon: '🔥' },
  ];

  return (
    <div className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(0.875rem,1.6vw,1.25rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-gray-200 select-none min-h-[155px] sm:min-h-[165px]">
      {/* Top row: Icon + Title + Selected Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shadow-2xs shrink-0">
            <Zap className="w-4 h-4 fill-[#EA580C]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1923] tracking-tight truncate">
              Energy Level
            </h4>
            <p className="text-[0.68rem] sm:text-xs text-[#6B6578] truncate">
              Daily vitality rating
            </p>
          </div>
        </div>

        {/* Selected badge indicator */}
        <span className="px-2 py-0.5 rounded-full text-[0.68rem] font-bold bg-[#FFF1F2] text-[#E11D48] border border-rose-100 shrink-0">
          {energyLevel}
        </span>
      </div>

      {/* Energy Level selection pills */}
      <div className="mt-3 pt-2.5 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-1.5">
          {levels.map((item) => {
            const isSelected = item.label === energyLevel;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelectEnergyLevel(item.label)}
                aria-pressed={isSelected}
                className={`py-1.5 px-2 rounded-xl text-[0.72rem] sm:text-xs font-semibold tracking-tight transition-all duration-150 border text-center cursor-pointer flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#DD0E5A] text-white border-[#DD0E5A] shadow-xs scale-[1.02]'
                    : 'bg-white text-[#6B6578] border-[#EBE6EC] hover:bg-gray-50'
                }`}
              >
                <span className="text-[0.75rem] leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
