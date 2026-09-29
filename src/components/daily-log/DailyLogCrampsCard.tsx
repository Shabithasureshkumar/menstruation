import React, { useId } from 'react';
import { CRAMP_SEVERITIES } from '../../types/dailyLog';
import type { CrampSeverity } from '../../types/dailyLog';
import { ChoicePills } from './ChoicePills';

interface DailyLogCrampsCardProps {
  cramps: CrampSeverity | null;
  onChangeCramps: (value: CrampSeverity | null) => void;
  disabled?: boolean;
}

export const DailyLogCrampsCard: React.FC<DailyLogCrampsCardProps> = ({ cramps, onChangeCramps, disabled }) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left">
      <h3 id={headingId} className="text-xs font-bold tracking-wider uppercase text-[#68708A] flex items-center gap-1.5">
        CRAMPS LEVEL <span aria-hidden="true">🤕</span>
      </h3>
      <ChoicePills options={CRAMP_SEVERITIES} value={cramps} onChange={onChangeCramps} labelledBy={headingId} disabled={disabled} columns={2} />
    </section>
  );
};

