import React from 'react';
import heroBg from '../../assets/period-hero-bg.png';
import type { CyclePhase } from '../../types/cycle';

interface PeriodHeroCardProps {
  phase: CyclePhase | null;
  isPeriodLogged?: boolean;
  onViewTips: () => void;
  onLogPeriod?: () => void;
}

export const PeriodHeroCard: React.FC<PeriodHeroCardProps> = ({
  isPeriodLogged = false,
  onViewTips,
}) => {
  if (!isPeriodLogged) {
    return (
      <section
        aria-label="Start your period log"
        className="relative w-full rounded-[28px] border border-[#F3DEEB] shadow-[0_8px_32px_rgba(244,63,143,0.06)] p-5 sm:p-6 overflow-hidden flex flex-col justify-between min-h-[220px] text-left transition-all bg-[#FFF5FA]"
      >
        {/* High-Resolution Source Background Artwork */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none -z-0"
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full h-full my-auto">
          {/* Left Column: Heading, description and action button */}
          <div className="flex-1 min-w-0 space-y-2 max-w-md z-10">
            <h2
              style={{ fontSize: 'clamp(1.25rem, 1.5vw, 1.65rem)' }}
              className="font-black text-[#17152B] tracking-tight leading-tight"
            >
              Start your period log
            </h2>

            <p
              style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.92rem)' }}
              className="text-[#55607A] font-medium leading-relaxed max-w-[340px]"
            >
              Log your period to get personalized insights, predictions and health tips.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={onViewTips}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F43F8F] hover:bg-[#E02874] text-white text-xs sm:text-sm font-bold shadow-[0_6px_18px_rgba(244,63,143,0.3)] hover:shadow-[0_8px_22px_rgba(244,63,143,0.4)] transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Log Period Tips</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Standing Calendar Floral Artwork */}
          <div className="relative shrink-0 flex items-center justify-center self-center sm:self-center pr-0 select-none">
            <img
              src="/images/cycle-tracker/period-banner-3d.png"
              alt="3D calendar with blooming flowers illustration"
              width={190}
              height={170}
              loading="lazy"
              className="w-[130px] sm:w-[155px] md:w-[185px] h-auto object-contain select-none pointer-events-none drop-shadow-xs -my-4 -mr-1"
            />
          </div>
        </div>
      </section>
    );
  }

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
            style={{ fontSize: 'clamp(1.15rem, 1.4vw, 1.55rem)' }}
            className="font-black text-[#17152B] tracking-tight leading-tight"
          >
            You're on your <span className="text-[#F43F8F]">period</span>
          </h2>

          <p
            style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.95rem)' }}
            className="text-[#55607A] font-medium leading-relaxed max-w-[360px]"
          >
            Your body is shedding the uterine lining. It's normal to feel lower energy, have mild cramps and emotional changes.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onViewTips}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F43F8F] hover:bg-[#E02874] text-white text-xs sm:text-sm font-bold shadow-[0_6px_18px_rgba(244,63,143,0.3)] hover:shadow-[0_8px_22px_rgba(244,63,143,0.4)] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>View Period Tips</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Standing Calendar with Blooming Flowers Artwork */}
        <div className="relative shrink-0 flex items-center justify-center self-center md:self-center pr-0 select-none">
          <img
            src="/images/cycle-tracker/period-banner-3d.png"
            alt="3D calendar with blooming flowers illustration"
            width={190}
            height={170}
            loading="lazy"
            className="w-[130px] sm:w-[155px] md:w-[185px] h-auto object-contain select-none pointer-events-none drop-shadow-xs -my-4 -mr-1"
          />
        </div>
      </div>
    </section>
  );
};
