import React, { useId } from 'react';
import { Droplet } from 'lucide-react';
import { CLOT_SIZES } from '../../types/dailyLog';
import type { ClotSize } from '../../types/dailyLog';
import { ChoicePills } from './ChoicePills';

interface DailyLogClotsCardProps {
  clotsPresent: boolean | null;
  clotSize: ClotSize | null;
  onChangePresent: (value: boolean | null) => void;
  onChangeSize: (size: ClotSize | null) => void;
  disabled?: boolean;
}

export const DailyLogClotsCard: React.FC<DailyLogClotsCardProps> = ({
  clotsPresent,
  clotSize,
  onChangePresent,
  onChangeSize,
  disabled,
}) => {
  const headingId = useId();
  const sizeId = useId();
  const isOn = clotsPresent === true;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    onChangePresent(next);
    if (!next) {
      onChangeSize(null);
    } else if (!clotSize) {
      onChangeSize('Small');
    }
  };

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-3 text-left"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFF0F6] flex items-center justify-center shrink-0" aria-hidden="true">
            <Droplet className="w-4 h-4 text-[#F43F8F]" />
          </div>
          <div>
            <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
              Clots present
            </h3>
            <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">Track blood clots</p>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-labelledby={headingId}
          disabled={disabled}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            isOn ? 'bg-[#F43F8F]' : 'bg-[#E5E7EB]'
          }`}
        >
          <span className="sr-only">Toggle clots present</span>
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isOn ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <div className="space-y-1 pt-1">
        <p id={sizeId} className="text-[0.66rem] font-bold tracking-wider uppercase text-[#68708A]">
          CLOT SIZE
        </p>
        <ChoicePills
          options={CLOT_SIZES}
          value={isOn ? clotSize : null}
          onChange={(sz) => {
            if (isOn) onChangeSize(sz);
          }}
          labelledBy={sizeId}
          disabled={disabled || !isOn}
          columns={3}
        />
      </div>
    </section>
  );
};
