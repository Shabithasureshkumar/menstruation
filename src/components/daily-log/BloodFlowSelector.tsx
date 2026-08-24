import React from 'react';
import type { BloodFlow } from '../../types/dailyLog';

interface BloodFlowSelectorProps {
  currentFlow: BloodFlow;
  onSelectFlow: (flow: BloodFlow) => void;
}

export const BloodFlowSelector: React.FC<BloodFlowSelectorProps> = ({
  currentFlow,
  onSelectFlow,
}) => {
  const options: Array<{ label: BloodFlow; dropsCount: number; isSpotting?: boolean }> = [
    { label: 'Light', dropsCount: 1 },
    { label: 'Medium', dropsCount: 2 },
    { label: 'Heavy', dropsCount: 3 },
    { label: 'Spotting', dropsCount: 1, isSpotting: true },
  ];

  return (
    <div
      className="w-full relative overflow-hidden rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1rem,1.8vw,1.75rem)] text-white shadow-md flex flex-col justify-between"
      style={{
        background: 'linear-gradient(111deg, #FF6F61 0%, #C20054 100%)',
      }}
    >
      {/* Top section: Label & Selected State */}
      <div>
        <span className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-white/80 block">
          Blood Flow
        </span>
        <h3 className="text-[clamp(1.35rem,2vw,1.875rem)] font-bold text-white tracking-tight mt-0.5 sm:mt-1 leading-tight">
          {currentFlow}
        </h3>
      </div>

      {/* Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-4 sm:mt-5">
        {options.map((opt) => {
          const isSelected = opt.label === currentFlow;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelectFlow(opt.label)}
              aria-pressed={isSelected}
              className={`py-2.5 px-2 rounded-[2.5rem] flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer min-h-[64px] sm:min-h-[70px] ${
                isSelected
                  ? 'bg-white text-[#9A0022] shadow-lg scale-[1.02]'
                  : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-xs'
              }`}
            >
              {/* Drops representation */}
              <div className="flex items-center justify-center gap-1 h-3.5">
                {opt.isSpotting ? (
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#9A0022]' : 'bg-white'
                    }`}
                  />
                ) : (
                  Array.from({ length: opt.dropsCount }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-3 h-3 ${isSelected ? 'text-[#9A0022]' : 'text-white'}`}
                    >
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  ))
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-tight truncate">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
