import React from 'react';
import type { CrampSeverity } from '../../types/dailyLog';
import profile2 from '../../assets/profile 2.png';

interface CrampsLevelProps {
  score: number;
  severity: CrampSeverity;
  onSelectSeverity: (severity: CrampSeverity) => void;
  onScoreChange?: (score: number) => void;
}

export const CrampsLevel: React.FC<CrampsLevelProps> = ({
  score,
  severity,
  onSelectSeverity,
}) => {
  const severities: CrampSeverity[] = ['None', 'Mild', 'Moderate', 'Severe'];

  const getEmoji = (sev: CrampSeverity) => {
    switch (sev) {
      case 'None':
        return '😊';
      case 'Mild':
        return '😐';
      case 'Moderate':
        return '😣';
      case 'Severe':
        return '😫';
      default:
        return '😐';
    }
  };

  return (
    <div className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1rem,1.8vw,1.5rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        {/* Left column: Title, Emoji, Score & 2x2 Severity Buttons */}
        <div className="flex-1 min-w-0 flex flex-col justify-between z-10">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-[#6B6578]">
                Cramps Level
              </span>
              <span className="text-base sm:text-lg leading-none" role="img" aria-label="cramps mood">
                {getEmoji(severity)}
              </span>
            </div>

            <div className="flex items-baseline gap-0.5 pt-0.5">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1923] tracking-tight leading-none">
                {score}
              </span>
              <span className="text-sm sm:text-base md:text-lg font-medium text-[#6B6578]">/10</span>
            </div>
          </div>

          {/* 2x2 Severity buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3 sm:mt-4 max-w-[170px]">
            {severities.map((sev) => {
              const isSelected = sev === severity;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => onSelectSeverity(sev)}
                  aria-pressed={isSelected}
                  className={`py-1.5 px-2 rounded-lg text-[0.7rem] sm:text-xs font-semibold tracking-tight transition-all duration-150 border text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#DD0E5A] text-white border-[#DD0E5A] shadow-xs'
                      : 'bg-white text-[#6B6578] border-[#F2F2F2] hover:bg-gray-50'
                  }`}
                >
                  {sev}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: 3D Comfort/Character Illustration Asset */}
        <div className="w-[clamp(4.5rem,7vw,7rem)] h-[clamp(5.5rem,8.5vw,8rem)] shrink-0 flex items-center justify-center self-center overflow-hidden">
          <img
            src={profile2}
            alt="Cramps comfort care illustration"
            className="w-full h-full object-contain filter drop-shadow-sm select-none"
          />
        </div>
      </div>
    </div>
  );
};
