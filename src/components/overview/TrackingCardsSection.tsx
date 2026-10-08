import React from 'react';
import { ChevronRight, Droplet, Heart, Pipette, Thermometer } from 'lucide-react';
import type { DailyLogEntry } from '../../types/dailyLog';

interface TrackingCardsSectionProps {
  todayLog: DailyLogEntry | null;
  onLogNow: (type: 'bbt' | 'mucus' | 'lh' | 'libido') => void;
}

export const TrackingCardsSection: React.FC<TrackingCardsSectionProps> = ({ todayLog, onLogNow }) => {
  const cards = [
    {
      id: 'bbt' as const,
      title: 'Basal Body Temp',
      headerIcon: <Thermometer className="w-4 h-4 text-[#0284C7]" />,
      headerBg: 'bg-[#EBF5FF]',
      centerIcon: <Thermometer className="w-6 h-6 text-[#F43F8F]" />,
      isLogged: todayLog?.bbtCelsius !== null && todayLog?.bbtCelsius !== undefined,
      value: todayLog?.bbtCelsius ? `${todayLog.bbtCelsius}°C` : 'Not logged',
      description: todayLog?.bbtCelsius ? 'Logged for today' : 'Log your BBT to see your daily trend',
    },
    {
      id: 'mucus' as const,
      title: 'Cervical Mucus',
      headerIcon: <Droplet className="w-4 h-4 text-[#F43F8F]" />,
      headerBg: 'bg-[#FFF0F6]',
      centerIcon: <Droplet className="w-6 h-6 text-[#F43F8F]" />,
      isLogged: Boolean(todayLog?.cervicalMucus),
      value: todayLog?.cervicalMucus ?? 'Not logged',
      description: todayLog?.cervicalMucus ? 'Logged for today' : 'Track your cervical mucus for better insights',
    },
    {
      id: 'lh' as const,
      title: 'LH Ovulation Test',
      headerIcon: <Pipette className="w-4 h-4 text-[#0284C7]" />,
      headerBg: 'bg-[#EBF5FF]',
      centerIcon: <Pipette className="w-6 h-6 text-[#F43F8F]" />,
      isLogged: Boolean(todayLog?.lhTest),
      value: todayLog?.lhTest ? `${todayLog.lhTest} result` : 'Not logged',
      description: todayLog?.lhTest ? 'Logged for today' : 'Log your LH test to track ovulation',
    },
    {
      id: 'libido' as const,
      title: 'Libido',
      headerIcon: <Heart className="w-4 h-4 fill-[#F43F8F] text-[#F43F8F]" />,
      headerBg: 'bg-[#FFF0F6]',
      centerIcon: <Heart className="w-6 h-6 fill-[#F43F8F] text-[#F43F8F]" />,
      isLogged: Boolean(todayLog?.libido),
      value: todayLog?.libido ? `${todayLog.libido} drive` : 'Not logged',
      description: todayLog?.libido ? 'Logged for today' : 'Track your libido to understand your cycle',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => (
        <section
          key={card.id}
          aria-label={card.title}
          className="bg-white rounded-[24px] border border-[#F1DDE8]/80 shadow-[0_8px_28px_rgba(23,21,43,0.045)] p-4 sm:p-5 flex flex-col justify-between min-h-[190px] text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Header row */}
          <div className="flex items-center gap-2.5">
            <span
              className={`w-7 h-7 rounded-full ${card.headerBg} flex items-center justify-center shrink-0`}
              aria-hidden="true"
            >
              {card.headerIcon}
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#17152B] tracking-tight">
              {card.title}
            </h3>
          </div>

          {/* Center visual & status */}
          <div className="flex items-center gap-3.5 my-2.5">
            <div
              className="w-14 h-14 rounded-full border-2 border-dashed border-[#FCA5C5] bg-[#FFF5F8] flex items-center justify-center shrink-0 shadow-2xs"
              aria-hidden="true"
            >
              {card.centerIcon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-[15px] font-bold text-[#17152B] tracking-tight truncate">
                {card.value}
              </p>
              <p className="text-[11px] sm:text-xs text-[#68708A] font-medium leading-snug mt-0.5">
                {card.description}
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onLogNow(card.id)}
              className="px-4 py-1.5 rounded-full bg-[#FFF0F6] hover:bg-pink-100 text-[#F43F8F] text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Log now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};
