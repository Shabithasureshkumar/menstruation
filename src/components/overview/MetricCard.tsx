import React from 'react';
import { Activity, Calendar, ChevronRight, Droplet, Droplets, Sparkles, Users } from 'lucide-react';
import { surface } from '../common/surface';
import type { MetricCardData } from '../../types/cycleTracker';
import periodImg from '../../assets/period-illustration.webp';
import nextPeriodImg from '../../assets/next-period.webp';
import regularityImg from '../../assets/cycle-regularity.webp';

interface MetricCardProps {
  card: MetricCardData;
  onClick: () => void;
}

const imgClass = 'max-w-full max-h-full w-auto h-auto object-contain drop-shadow-xs select-none';

export const MetricCard: React.FC<MetricCardProps> = ({ card, onClick }) => {
  const getSmallIcon = () => {
    switch (card.visualType) {
      case 'period-tracker-woman':
        return <Droplet className="w-4 h-4 text-[#F43F8F]" />;
      case 'cramps':
        return <Activity className="w-4 h-4 text-[#F43F8F]" />;
      case 'clot':
        return <Droplets className="w-4 h-4 text-[#F43F8F]" />;
      case 'symptoms':
        return <Users className="w-4 h-4 text-[#8B5CF6]" />;
      case 'next-period':
        return <Calendar className="w-4 h-4 text-[#F43F8F]" />;
      case 'ai-prediction':
        return <Sparkles className="w-4 h-4 text-[#8B5CF6]" />;
      default:
        return <Droplet className="w-4 h-4 text-[#F43F8F]" />;
    }
  };

  const iconBg = card.visualType === 'symptoms' || card.visualType === 'ai-prediction' ? 'bg-[#F3EEFF]' : 'bg-[#FFEEF5]';

  /** Illustration sizes follow the reference (the period figure is the tallest). */
  const getVisual = () => {
    switch (card.visualType) {
      case 'period-tracker-woman':
        return (
          <span className="w-[96px] h-[112px] sm:w-[112px] sm:h-[128px] flex items-end justify-center">
            <img src={periodImg} alt="" width={112} height={124} loading="lazy" className={imgClass} />
          </span>
        );
      case 'cramps':
        return null;
      case 'clot':
        return null;
      case 'symptoms':
        return null;
      case 'next-period':
        return (
          <span className="w-[88px] h-[80px] sm:w-[96px] sm:h-[86px] flex items-center justify-center">
            <img src={nextPeriodImg} alt="" width={96} height={86} loading="lazy" className={imgClass} />
          </span>
        );
      case 'ai-prediction':
        return (
          <span className="w-[112px] h-[84px] sm:w-[128px] sm:h-[96px] flex items-center justify-center">
            <img src={regularityImg} alt="" width={128} height={96} loading="lazy" className={imgClass} />
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
      className={`${surface.halo} group relative w-full text-left px-5 py-5 sm:px-6 flex items-center justify-between gap-3 min-h-[128px] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(236,72,153,0.12)]`}
    >
      <span className="min-w-0 flex-1 block">
        {eyebrow ? (
          <span className="block text-[11px] font-medium text-[#4B5563] tracking-[0.12em] uppercase">{card.label}</span>
        ) : (
          <span className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`} aria-hidden="true">
              {getSmallIcon()}
            </span>
            <span className="text-[13px] font-medium text-[#374151] tracking-tight">{card.label}</span>
          </span>
        )}
        <span className={`block ${eyebrow ? 'mt-2' : 'mt-3'} text-lg sm:text-[19px] font-semibold text-[#17152B] tracking-tight leading-tight break-words`}>
          {card.value}
        </span>
        <span className="block mt-1.5 text-xs sm:text-[13px] text-[#6B7280] leading-snug break-words whitespace-pre-line">
          {card.description}
        </span>
        {card.actionLabel && <span className="sr-only">. {card.actionLabel}</span>}
      </span>
      {visual && (
        <span className="shrink-0 self-center -my-5" aria-hidden="true">
          {visual}
        </span>
      )}
      <ChevronRight
        className="absolute top-5 right-4 w-4 h-4 text-[#9CA3AF] group-hover:text-[#F43F8F] transition-colors"
        aria-hidden="true"
      />
    </button>
  );
};
