import React, { useId } from 'react';
import { Flame, Zap, BatteryLow } from 'lucide-react';
import { ENERGY_LEVELS } from '../../types/dailyLog';
import type { EnergyLevel } from '../../types/dailyLog';
import { ChoicePills } from './ChoicePills';

interface DailyLogEnergyCardProps {
  energy: EnergyLevel | null;
  onChangeEnergy: (level: EnergyLevel | null) => void;
  disabled?: boolean;
}

const ENERGY_ICONS: Record<EnergyLevel, React.ReactNode> = {
  Low: <BatteryLow className="w-4 h-4" />,
  Medium: <Zap className="w-4 h-4" />,
  High: <Flame className="w-4 h-4" />,
};

export const DailyLogEnergyCard: React.FC<DailyLogEnergyCardProps> = ({ energy, onChangeEnergy, disabled }) => {
  const energyId = useId();
  return (
    <section aria-labelledby={energyId} className="w-full h-auto self-start bg-white rounded-[22px] p-4 sm:p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0" aria-hidden="true">
          <Flame className="w-4 h-4" />
        </div>
        <div>
          <h3 id={energyId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
            Energy Level
          </h3>
          <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">Daily vitality rating</p>
        </div>
      </div>
      <ChoicePills options={ENERGY_LEVELS} value={energy} onChange={onChangeEnergy} labelledBy={energyId} disabled={disabled} stacked renderIcon={(o) => ENERGY_ICONS[o]} />
    </section>
  );
};

