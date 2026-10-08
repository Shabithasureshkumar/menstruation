import React, { useId } from 'react';
import { Heart, Flame } from 'lucide-react';
import { ChoicePills } from './ChoicePills';
import { LIBIDO_LEVELS } from '../../types/dailyLog';
import type { LibidoLevel } from '../../types/dailyLog';

interface DailyLogIntercourseCardProps {
  intercourse: boolean | null;
  libido?: LibidoLevel | null;
  onChangeIntercourse: (value: boolean | null) => void;
  onChangeLibido?: (value: LibidoLevel | null) => void;
  disabled?: boolean;
}

export const DailyLogIntercourseCard: React.FC<DailyLogIntercourseCardProps> = ({
  intercourse,
  libido = null,
  onChangeIntercourse,
  onChangeLibido,
  disabled,
}) => {
  const headingId = useId();
  const libidoId = useId();
  const value = intercourse === null ? null : intercourse ? 'Yes' : 'No';

  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4 text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0" aria-hidden="true">
          <Heart className={`w-4 h-4 ${intercourse ? 'fill-[#F43F8F]' : ''}`} />
        </div>
        <div>
          <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
            Intimacy & Libido
          </h3>
          <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">Intercourse & sex drive</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[#68708A]">
          Intercourse
        </p>
        <ChoicePills
          options={['Yes', 'No'] as const}
          value={value}
          onChange={(v) => onChangeIntercourse(v === null ? null : v === 'Yes')}
          labelledBy={headingId}
          disabled={disabled}
          renderIcon={(o) => (o === 'Yes' ? <Heart className="w-3.5 h-3.5" /> : null)}
        />
      </div>

      {onChangeLibido && (
        <div className="space-y-1.5 pt-1">
          <p id={libidoId} className="text-[0.7rem] font-bold uppercase tracking-wider text-[#68708A] flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#F43F8F]" />
            Libido
          </p>
          <ChoicePills
            options={LIBIDO_LEVELS}
            value={libido}
            onChange={onChangeLibido}
            labelledBy={libidoId}
            disabled={disabled}
          />
        </div>
      )}
    </section>
  );
};

