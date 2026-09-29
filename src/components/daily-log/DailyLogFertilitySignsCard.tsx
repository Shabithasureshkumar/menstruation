import React, { useId, useState } from 'react';
import { Thermometer } from 'lucide-react';
import { BBT_MAX_C, BBT_MIN_C, CERVICAL_MUCUS_TYPES, LH_TEST_RESULTS } from '../../types/dailyLog';
import type { CervicalMucus, LhTestResult } from '../../types/dailyLog';
import { ChoicePills } from './ChoicePills';

interface DailyLogFertilitySignsCardProps {
  cervicalMucus: CervicalMucus | null;
  bbtCelsius: number | null;
  lhTest: LhTestResult | null;
  onChangeMucus: (value: CervicalMucus | null) => void;
  onChangeBbt: (value: number | null) => void;
  onChangeLh: (value: LhTestResult | null) => void;
  /** Reports whether the BBT text is currently valid, so the page can block saving. */
  onValidityChange: (valid: boolean) => void;
  disabled?: boolean;
}

/** Only accepts BBT values in the physiological range, to 2 decimals. */
function parseBbt(text: string): { value: number | null; error: string | null } {
  const trimmed = text.trim();
  if (!trimmed) return { value: null, error: null };
  if (!/^\d{2}(\.\d{1,2})?$/.test(trimmed)) return { value: null, error: 'Enter a temperature like 36.45.' };
  const n = Number(trimmed);
  if (n < BBT_MIN_C || n > BBT_MAX_C) return { value: null, error: `Enter a value between ${BBT_MIN_C.toFixed(1)} and ${BBT_MAX_C.toFixed(1)} °C.` };
  return { value: n, error: null };
}

export const DailyLogFertilitySignsCard: React.FC<DailyLogFertilitySignsCardProps> = ({
  cervicalMucus,
  bbtCelsius,
  lhTest,
  onChangeMucus,
  onChangeBbt,
  onChangeLh,
  onValidityChange,
  disabled,
}) => {
  const headingId = useId();
  const mucusId = useId();
  const lhId = useId();
  const bbtId = useId();
  // Local text so partially typed values ("36.") aren't lost; only valid numbers reach the draft.
  // The page remounts this card (via `key`) when the date changes or the draft is discarded.
  const [bbtText, setBbtText] = useState(bbtCelsius === null ? '' : String(bbtCelsius));
  const [bbtError, setBbtError] = useState<string | null>(null);

  const handleBbt = (text: string) => {
    setBbtText(text);
    const { value, error } = parseBbt(text);
    setBbtError(error);
    onValidityChange(!error);
    if (!error) onChangeBbt(value);
  };

  return (
    <section aria-labelledby={headingId} className="w-full bg-white rounded-[22px] p-5 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4 text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0" aria-hidden="true">
          <Thermometer className="w-4 h-4" />
        </div>
        <div>
          <h3 id={headingId} className="text-xs sm:text-sm font-bold text-[#17152B] leading-tight">
            Fertility signs
          </h3>
          <p className="text-[0.7rem] text-[#68708A] font-medium leading-tight">BBT, cervical mucus and LH test</p>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor={bbtId} className="text-[0.7rem] font-bold uppercase tracking-wider text-[#68708A] block">
          Basal body temperature (°C)
        </label>
        <input
          id={bbtId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="e.g. 36.45"
          value={bbtText}
          disabled={disabled}
          aria-invalid={Boolean(bbtError)}
          aria-describedby={bbtError ? `${bbtId}-error` : undefined}
          onChange={(e) => handleBbt(e.target.value)}
          className={`w-full sm:max-w-[200px] min-h-[44px] bg-[#FAF8FA] border rounded-xl px-3.5 text-sm font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 disabled:opacity-60 ${
            bbtError ? 'border-rose-400' : 'border-[#F1DDE8]'
          }`}
        />
        {bbtError && (
          <p id={`${bbtId}-error`} role="alert" className="text-xs font-medium text-rose-600">
            {bbtError}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <p id={mucusId} className="text-[0.7rem] font-bold uppercase tracking-wider text-[#68708A]">
          Cervical mucus
        </p>
        <ChoicePills options={CERVICAL_MUCUS_TYPES} value={cervicalMucus} onChange={onChangeMucus} labelledBy={mucusId} disabled={disabled} columns={5} />
      </div>

      <div className="space-y-1.5">
        <p id={lhId} className="text-[0.7rem] font-bold uppercase tracking-wider text-[#68708A]">
          LH / ovulation test
        </p>
        <ChoicePills options={LH_TEST_RESULTS} value={lhTest} onChange={onChangeLh} labelledBy={lhId} disabled={disabled} />
      </div>
    </section>
  );
};
