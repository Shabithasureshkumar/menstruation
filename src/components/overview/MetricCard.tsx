import React from 'react';
import { Activity, Calendar, ChevronRight, Droplet, Droplets, Heart, Sparkles, Users } from 'lucide-react';
import { surface } from '../common/surface';
import type { MetricCardData } from '../../types/cycleTracker';
import periodImg from '../../assets/period-illustration.webp';
import nextPeriodImg from '../../assets/next-period.webp';
import regularityImg from '../../assets/cycle-regularity.webp';
import { Visual3DCalendar, Visual3DUterusQuestion } from './VisualAssets3D';

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
      case 'intercourse':
        return <Heart className="w-4 h-4 text-[#F43F8F]" />;
      case 'next-period':
        return <Calendar className="w-4 h-4 text-[#F43F8F]" />;
      case 'ai-prediction':
        return <Sparkles className="w-4 h-4 text-[#8B5CF6]" />;
      default:
        return <Droplet className="w-4 h-4 text-[#F43F8F]" />;
    }
  };

  const iconBg =
    card.visualType === 'symptoms' || card.visualType === 'ai-prediction' ? 'bg-[#F3EEFF]' : 'bg-[#FFEEF5]';

  const getVisual = () => {
    switch (card.visualType) {
      case 'period-tracker-woman':
        return (
          <span className="w-[84px] h-[96px] sm:w-[96px] sm:h-[110px] flex items-end justify-center">
            <img src={periodImg} alt="" width={100} height={110} loading="lazy" className={imgClass} />
          </span>
        );
      case 'intercourse':
        return <Visual3DCalendar className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'next-period':
        return (
          <span className="w-[76px] h-[70px] sm:w-[84px] sm:h-[76px] flex items-center justify-center">
            <img src={nextPeriodImg} alt="" width={84} height={76} loading="lazy" className={imgClass} />
          </span>
        );
      case 'ai-prediction':
        if (card.value === 'Not available') {
          return <Visual3DUterusQuestion className="w-20 h-16 sm:w-24 sm:h-20" />;
        }
        return (
          <span className="w-[88px] h-[72px] sm:w-[104px] sm:h-[80px] flex items-center justify-center">
            <img src={regularityImg} alt="" width={104} height={80} loading="lazy" className={imgClass} />
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
      className={`${surface.halo} group relative w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 min-h-[128px] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(236,72,153,0.12)]`}
    >
      <span className="min-w-0 flex-1 block">
        {eyebrow ? (
          <span className="block text-[11px] font-bold text-[#68708A] tracking-[0.14em] uppercase">{card.label}</span>
        ) : (
          <span className="flex items-center gap-2">
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${iconBg} flex items-center justify-center shrink-0`} aria-hidden="true">
              {getSmallIcon()}
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-[#17152B] tracking-tight">{card.label}</span>
          </span>
        )}
        <span className={`block ${eyebrow ? 'mt-2' : 'mt-2.5'} text-base sm:text-[18px] font-black text-[#17152B] tracking-tight leading-tight break-words`}>
          {card.value}
        </span>
        <span className="block mt-1 text-[11.5px] sm:text-xs text-[#68708A] font-medium leading-snug break-words whitespace-pre-line">
          {card.description}
        </span>
        {card.actionLabel && <span className="sr-only">. {card.actionLabel}</span>}
      </span>
      {visual && (
        <span className="shrink-0 self-center -my-3" aria-hidden="true">
          {visual}
        </span>
      )}
      {card.visualType === 'period-tracker-woman' && (
        <ChevronRight
          className="absolute top-4 right-4 w-4 h-4 text-[#A0AEC0] group-hover:text-[#F43F8F] transition-colors"
          aria-hidden="true"
        />
      )}
    </button>
  );
};
