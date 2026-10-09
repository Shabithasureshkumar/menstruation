import React from 'react';
import { Activity, Calendar, ChevronRight, Droplet, Droplets, Heart, Sparkles, Stethoscope } from 'lucide-react';
import { surface } from '../common/surface';
import type { MetricCardData } from '../../types/cycleTracker';

interface MetricCardProps {
  card: MetricCardData;
  onClick: () => void;
}

const imgClass = 'max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-xs transition-transform duration-300 group-hover:scale-105';

export const MetricCard: React.FC<MetricCardProps> = ({ card, onClick }) => {
  const getSmallIcon = () => {
    switch (card.visualType) {
      case 'period-tracker-woman':
        return <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      case 'cramps':
        return <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      case 'clot':
        return <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      case 'symptoms':
        return <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6]" />;
      case 'intercourse':
        return <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      case 'next-period':
        return <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      case 'ai-prediction':
        return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
      default:
        return <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F43F8F]" />;
    }
  };

  const iconBg =
    card.visualType === 'symptoms' ? 'bg-[#F3EEFF]' : 'bg-[#FFEEF5]';

  const getVisual = () => {
    switch (card.visualType) {
      case 'period-tracker-woman':
        return (
          <span className="w-[90px] h-[85px] sm:w-[115px] sm:h-[105px] md:w-[125px] md:h-[115px] lg:w-[140px] lg:h-[125px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/period-tracker-3d.png"
              alt="3D menstrual pad illustration"
              width={140}
              height={125}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'cramps':
        return (
          <span className="w-[85px] h-[95px] sm:w-[105px] sm:h-[120px] md:w-[115px] md:h-[130px] lg:w-[130px] lg:h-[140px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/cramp-level-3d.png"
              alt="3D cramp level illustration"
              width={130}
              height={140}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'clot':
        return (
          <span className="w-[88px] h-[88px] sm:w-[112px] sm:h-[112px] md:w-[122px] md:h-[122px] lg:w-[135px] lg:h-[135px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/blood-flow-3d.png"
              alt="3D blood flow illustration"
              width={135}
              height={135}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'symptoms':
        return (
          <span className="w-[88px] h-[92px] sm:w-[112px] sm:h-[115px] md:w-[122px] md:h-[125px] lg:w-[135px] lg:h-[138px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/symptoms-3d.png"
              alt="3D symptoms illustration"
              width={135}
              height={138}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'next-period':
        return (
          <span className="w-[95px] h-[80px] sm:w-[118px] sm:h-[96px] md:w-[128px] md:h-[105px] lg:w-[145px] lg:h-[118px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/next-period-calendar-3d.png"
              alt="3D next period calendar illustration"
              width={145}
              height={118}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'ai-prediction':
        return (
          <span className="w-[92px] h-[82px] sm:w-[116px] sm:h-[100px] md:w-[126px] md:h-[110px] lg:w-[142px] lg:h-[122px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/ai-prediction-3d.png"
              alt="3D AI prediction illustration"
              width={142}
              height={122}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      default:
        return null;
    }
  };

  const visual = getVisual();
  const eyebrow = card.labelStyle === 'eyebrow';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${surface.halo} group relative w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 min-h-[148px] sm:min-h-[156px] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(236,72,153,0.16)]`}
    >
      <span className="min-w-0 flex-1 block pr-2">
        {eyebrow ? (
          <span className="flex items-center gap-2">
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${iconBg} flex items-center justify-center shrink-0`} aria-hidden="true">
              {getSmallIcon()}
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-[#17152B] tracking-tight">{card.label}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${iconBg} flex items-center justify-center shrink-0`} aria-hidden="true">
              {getSmallIcon()}
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-[#17152B] tracking-tight">{card.label}</span>
          </span>
        )}
        <span className="block mt-2 sm:mt-2.5 text-base sm:text-[19px] font-black text-[#17152B] tracking-tight leading-tight break-words">
          {card.value}
        </span>
        <span className="block mt-1 text-[11.5px] sm:text-xs text-[#68708A] font-medium leading-snug break-words whitespace-pre-line">
          {card.description}
        </span>
        {card.actionLabel && <span className="sr-only">. {card.actionLabel}</span>}
      </span>

      {visual && (
        <span className="shrink-0 self-center -my-2 select-none" aria-hidden="true">
          {visual}
        </span>
      )}

      <ChevronRight
        className="absolute top-4 right-4 w-4 h-4 text-[#A0AEC0] group-hover:text-[#F43F8F] group-hover:translate-x-0.5 transition-all"
        aria-hidden="true"
      />
    </button>
  );
};
