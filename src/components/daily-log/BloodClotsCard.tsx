import React from 'react';
import { Droplet } from 'lucide-react';
import type { ClotSize } from '../../types/dailyLog';

interface BloodClotsCardProps {
  clotsPresent: boolean;
  clotSize?: ClotSize;
  onToggleClots: () => void;
  onSelectClotSize: (size: ClotSize) => void;
}

export const BloodClotsCard: React.FC<BloodClotsCardProps> = ({
  clotsPresent,
  clotSize = 'Small',
  onToggleClots,
  onSelectClotSize,
}) => {
  const sizes: ClotSize[] = ['Small', 'Medium', 'Large'];

  return (
    <div className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(0.875rem,1.6vw,1.25rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-gray-200 select-none min-h-[155px] sm:min-h-[165px]">
      {/* Top row: Icon + Title + Toggle switch */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-2xs shrink-0 transition-colors ${
            clotsPresent ? 'bg-purple-100 text-[#955BE3]' : 'bg-[#F8F3F9] text-gray-400'
          }`}>
            <Droplet className={`w-4 h-4 ${clotsPresent ? 'fill-[#955BE3]' : ''}`} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1923] tracking-tight truncate">
              Clots present
            </h4>
            <p className="text-[0.68rem] sm:text-xs text-[#6B6578] truncate">
              {clotsPresent ? 'Track size below' : 'Track blood clots'}
            </p>
          </div>
        </div>

        {/* Switch Toggle */}
        <button
          type="button"
          onClick={onToggleClots}
          role="switch"
          aria-checked={clotsPresent}
          aria-label="Toggle blood clots presence"
          className={`w-10 h-5.5 sm:w-11 sm:h-6 rounded-full transition-colors relative p-0.5 shadow-inner cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#955BE3]/40 ${
            clotsPresent ? 'bg-[#955BE3]' : 'bg-gray-200'
          }`}
        >
          <div
            className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white shadow-md transition-transform duration-200 transform ${
              clotsPresent ? 'translate-x-4.5 sm:translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Clot Size selection options */}
      <div className="mt-3 pt-2.5 border-t border-gray-100">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#6B6578]">
            Clot Size
          </span>
          {clotsPresent && (
            <span className="text-[0.68rem] font-bold text-[#955BE3]">
              {clotSize}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {sizes.map((size) => {
            const isSelected = clotsPresent && clotSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectClotSize(size)}
                disabled={!clotsPresent}
                aria-pressed={isSelected}
                className={`py-1.5 px-2 rounded-xl text-[0.72rem] sm:text-xs font-semibold tracking-tight transition-all duration-150 border text-center ${
                  !clotsPresent
                    ? 'opacity-40 bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#955BE3] text-white border-[#955BE3] shadow-xs cursor-pointer'
                    : 'bg-white text-[#6B6578] border-[#EBE6EC] hover:bg-gray-50 cursor-pointer'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
