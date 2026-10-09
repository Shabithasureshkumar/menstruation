import React from 'react';
import { Activity, Calendar, ChevronRight, Droplet, Droplets, Heart, Sparkles, Stethoscope } from 'lucide-react';
import { surface } from '../common/surface';
import type { MetricCardData } from '../../types/cycleTracker';

interface MetricCardProps {
  card: MetricCardData;
  onClick: () => void;
}

const imgClass = 'max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-xs transition-transform duration-200 group-hover:scale-105';

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
          <span className="w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/period-tracker-3d.png"
              alt="3D menstrual pad illustration"
              width={104}
              height={104}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'cramps':
        return (
          <span className="w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/cramp-level-3d.png"
              alt="3D cramp level illustration"
              width={104}
              height={104}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'clot':
        return (
          <span className="w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/blood-flow-3d.png"
              alt="3D blood flow illustration"
              width={104}
              height={104}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'symptoms':
        return (
          <span className="w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/symptoms-3d.png"
              alt="3D symptoms illustration"
              width={104}
              height={104}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'next-period':
        return (
          <span className="w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/next-period-calendar-3d.png"
              alt="3D next period calendar illustration"
              width={104}
              height={104}
              loading="lazy"
              className={imgClass}
            />
          </span>
        );
      case 'ai-prediction':
        return (
          <span className="w-[84px] h-[80px] sm:w-[98px] sm:h-[94px] md:w-[108px] md:h-[104px] flex items-center justify-center shrink-0">
            <img
              src="/images/cycle-tracker/ai-prediction-3d.png"
              alt="3D AI prediction illustration"
              width={108}
              height={104}
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
      className={`${surface.halo} group relative w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 min-h-[136px] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(236,72,153,0.14)]`}
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
