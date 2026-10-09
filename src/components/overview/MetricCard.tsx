import React from 'react';
import { Activity, Calendar, ChevronRight, Droplet, Droplets, Heart, Sparkles, Stethoscope } from 'lucide-react';
import { surface } from '../common/surface';
import type { MetricCardData } from '../../types/cycleTracker';
import {
  Visual3DPeriodPad,
  Visual3DCrampsTorso,
  Visual3DBloodFlowDrops,
  Visual3DSymptomsTiredGirl,
  Visual3DNextPeriodCalendar,
  Visual3DAIPredictionUterus,
  Visual3DCalendar,
} from './VisualAssets3D';

interface MetricCardProps {
  card: MetricCardData;
  onClick: () => void;
}

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
        return <Visual3DPeriodPad className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />;
      case 'cramps':
        return <Visual3DCrampsTorso className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />;
      case 'clot':
        return <Visual3DBloodFlowDrops className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />;
      case 'symptoms':
        return <Visual3DSymptomsTiredGirl className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />;
      case 'next-period':
        return <Visual3DNextPeriodCalendar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />;
      case 'ai-prediction':
        return <Visual3DAIPredictionUterus className="w-22 h-20 sm:w-26 sm:h-24 md:w-30 md:h-28" />;
      case 'intercourse':
        return <Visual3DCalendar className="w-16 h-16 sm:w-20 sm:h-20" />;
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
