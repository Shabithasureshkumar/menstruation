import React, { useId } from 'react';
import { Heart } from 'lucide-react';
import { ChoicePills } from './ChoicePills';

interface DailyLogIntercourseCardProps {
  intercourse: boolean | null;
  onChange: (value: boolean | null) => void;
  disabled?: boolean;
}

export const DailyLogIntercourseCard: React.FC<DailyLogIntercourseCardProps> = ({ intercourse, onChange, disabled }) => {
  const headingId = useId();
  const value = intercourse === null ? null : intercourse ? 'Yes' : 'No';
  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0" aria-hidden="true">
          <Heart className={`w-4 h-4 ${intercourse ? 'fill-[#F43F8F]' : ''}`} />
        </div>
        <div>
          <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
            Intercourse
          </h3>
          <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">Intimacy tracking</p>
        </div>
      </div>
      <ChoicePills
        options={['Yes', 'No'] as const}
        value={value}
        onChange={(v) => onChange(v === null ? null : v === 'Yes')}
        labelledBy={headingId}
        disabled={disabled}
        stacked
        renderIcon={(o) => (o === 'Yes' ? <Heart className="w-3.5 h-3.5" /> : null)}
      />
    </section>
  );
};
