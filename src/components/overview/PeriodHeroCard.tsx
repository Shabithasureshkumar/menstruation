import React from 'react';
import { ArrowRight } from 'lucide-react';
import illustration from '../../assets/period-illustration.webp';
import heroBg from '../../assets/period-hero-bg.png';
import { navigateToTab } from '../../lib/router';
import type { CyclePhase } from '../../types/cycle';

interface PeriodHeroCardProps {
  phase: CyclePhase | null;
  onViewTips: () => void;
}

export const PeriodHeroCard: React.FC<PeriodHeroCardProps> = ({ onViewTips }) => {
  return (
    <section
      aria-label="You're on your period"
      className="relative w-full rounded-[28px] border border-[#F3DEEB] shadow-[0_8px_32px_rgba(244,63,143,0.07)] p-5 sm:p-6 overflow-hidden flex flex-col justify-between min-h-[220px] text-left transition-all bg-[#FFF5FA]"
    >
      {/* High-Resolution Source Background Artwork */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none -z-0"
      />

      {/* Main Content & Visual */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 w-full h-full">
        {/* Left Column: Heading, description and action buttons */}
        <div className="flex-1 min-w-0 space-y-2 max-w-md z-10">
          <h2
            style={{ fontSize: 'clamp(1.15rem, 1.4vw, 1.5rem)' }}
            className="font-black text-[#17152B] tracking-tight leading-tight"
          >
            You're on your period
          </h2>

          <p
            style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.95rem)' }}
            className="text-[#55607A] font-medium leading-relaxed max-w-[360px]"
          >
            Your body is shedding the uterine lining. It's normal to feel lower energy. Take rest, stay hydrated, and be kind to yourself.
          </p>

          <div className="flex items-center gap-2.5 pt-2 flex-wrap">
            <button
              type="button"
              onClick={onViewTips}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F43F8F] hover:bg-[#E02874] text-white text-xs sm:text-sm font-bold shadow-[0_6px_18px_rgba(244,63,143,0.3)] hover:shadow-[0_8px_22px_rgba(244,63,143,0.4)] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>View Period Tips</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToTab('dailyLog')}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-white/85 hover:bg-white text-[#D81B60] border border-pink-200/90 text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Log Period</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Female Meditation illustration integrated with the background floral artwork */}
        <div className="relative shrink-0 flex items-end justify-center self-end md:self-end pr-0 select-none">
          <img
            src={illustration}
            alt="Meditation & wellness during period"
            width={210}
            height={185}
            className="w-[140px] sm:w-[170px] md:w-[195px] lg:w-[210px] h-auto object-contain object-bottom select-none filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.25)] relative z-10"
          />
        </div>
      </div>
    </section>
  );
};
