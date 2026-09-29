import React, { useId } from 'react';
import { Droplet, Sparkle } from 'lucide-react';
import { BLOOD_FLOWS } from '../../types/dailyLog';
import type { BloodFlow } from '../../types/dailyLog';

interface DailyLogBloodFlowCardProps {
  selectedFlow: BloodFlow | null;
  onSelectFlow: (flow: BloodFlow | null) => void;
  disabled?: boolean;
}

const ICONS: Record<BloodFlow, React.ReactNode> = {
  Light: <Droplet className="w-3.5 h-3.5 fill-current" />,
  Medium: (
    <span className="flex items-center gap-0.5">
      <Droplet className="w-3.5 h-3.5 fill-current" />
      <Droplet className="w-3.5 h-3.5 fill-current" />
    </span>
  ),
  Heavy: (
    <span className="flex items-center gap-0.5">
      <Droplet className="w-3 h-3 fill-current" />
      <Droplet className="w-3 h-3 fill-current" />
      <Droplet className="w-3 h-3 fill-current" />
    </span>
  ),
  Spotting: <Sparkle className="w-3.5 h-3.5 fill-current" />,
};

export const DailyLogBloodFlowCard: React.FC<DailyLogBloodFlowCardProps> = ({ selectedFlow, onSelectFlow, disabled }) => {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="w-full rounded-[22px] p-5 sm:p-6 text-white shadow-card flex flex-col justify-between min-h-[190px] relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FF5E62 0%, #E83A64 45%, #B81958 100%)' }}
    >
      <div className="space-y-1 text-left z-10">
        <h3 id={headingId} className="text-xs font-bold tracking-wider uppercase text-white/90 block">
          BLOOD FLOW
        </h3>
        <p className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight" aria-live="polite">
          {selectedFlow ?? 'Medium'}
        </p>
      </div>

      <div role="group" aria-labelledby={headingId} className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-4 z-10">
        {BLOOD_FLOWS.map((flow) => {
          const isSelected = flow === selectedFlow;
          return (
            <button
              key={flow}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectFlow(isSelected ? null : flow)}
              className={`min-h-[52px] px-1 rounded-full flex flex-col items-center justify-center gap-1 text-xs font-bold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected ? 'bg-white text-[#A3155A] shadow-md scale-102' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span className="h-4 flex items-center justify-center" aria-hidden="true">
                {ICONS[flow]}
              </span>
              <span className="text-[0.72rem] sm:text-xs truncate max-w-full">{flow}</span>
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
    </section>
  );
};
