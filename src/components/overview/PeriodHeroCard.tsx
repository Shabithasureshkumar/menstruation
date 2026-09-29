import React from 'react';
import illustration from '../../assets/period-illustration.webp';
import { PHASE_CONTENT } from '../../data/phaseContent';
import type { CyclePhase } from '../../types/cycle';
import { surface } from '../common/surface';

interface PeriodHeroCardProps {
  phase: CyclePhase | null;
  onViewTips: () => void;
}

export const PeriodHeroCard: React.FC<PeriodHeroCardProps> = ({ phase, onViewTips }) => {
  const content = phase ? PHASE_CONTENT[phase] : null;
  return (
    <section
      aria-label="Phase overview"
      className={`${surface.card} w-full relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-2 min-h-[160px]`}
    >
      <div className="flex-1 min-w-0 z-10 text-left p-5 sm:pl-6 sm:pr-2 self-stretch flex flex-col justify-center">
        <h2 className="text-[15px] sm:text-base font-bold text-[#17152B] tracking-tight leading-snug">
          {content ? content.heroTitle : 'Welcome to your cycle tracker'}
        </h2>
        <p className="mt-2 text-xs sm:text-[13px] text-[#6B7280] leading-relaxed max-w-[420px]">
          {content ? content.heroBody : 'Log your days and add your cycle details in Settings to get phase-aware guidance.'}
        </p>
        <div className="mt-1">
          <button type="button" onClick={onViewTips} className="group min-h-[44px] inline-flex items-center cursor-pointer">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFE4EF] group-hover:bg-[#FFD3E5] text-[#E11D74] text-[13px] font-medium transition-colors">
              View Period Tips
            </span>
          </button>
        </div>
      </div>

      <div className="w-[150px] h-[140px] sm:w-[170px] sm:h-auto shrink-0 flex items-end justify-center self-end sm:self-stretch sm:pr-2 sm:pt-1">
        <img
          src={illustration}
          alt=""
          width={170}
          height={160}
          className="max-w-full max-h-[150px] w-auto h-auto object-contain object-bottom select-none"
        />
      </div>
    </section>
  );
};
