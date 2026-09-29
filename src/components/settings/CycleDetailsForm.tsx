import React, { useId, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { addDays, formatDate, isValidDateOnly } from '../../lib/date';
import {
  CYCLE_LENGTH_MAX,
  CYCLE_LENGTH_MIN,
  PERIOD_DURATION_MAX,
  PERIOD_DURATION_MIN,
} from '../../types/cycle';
import type { PeriodRegularity, SettingsState } from '../../types/settings';
import { buttonClass } from '../common/buttonStyles';

interface CycleDetailsFormProps {
  settings: SettingsState;
  today: string;
  onSave: (patch: Pick<SettingsState, 'lastPeriodDate' | 'cycleLength' | 'periodDuration' | 'periodRegularity'>) => Promise<boolean>;
}

interface FormState {
  lastPeriodDate: string;
  cycleLength: string;
  periodDuration: string;
  periodRegularity: PeriodRegularity;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EARLIEST_DAYS_AGO = 365;

function fromSettings(s: SettingsState): FormState {
  return {
    lastPeriodDate: s.lastPeriodDate ?? '',
    cycleLength: String(s.cycleLength),
    periodDuration: String(s.periodDuration),
    periodRegularity: s.periodRegularity,
  };
}

function validate(form: FormState, today: string): Errors {
  const errors: Errors = {};
  const earliest = addDays(today, -EARLIEST_DAYS_AGO);
  if (!form.lastPeriodDate) errors.lastPeriodDate = 'Enter the first day of your last period.';
  else if (!isValidDateOnly(form.lastPeriodDate)) errors.lastPeriodDate = 'Enter a valid date.';
  else if (form.lastPeriodDate > today) errors.lastPeriodDate = 'The date cannot be in the future.';
  else if (form.lastPeriodDate < earliest) errors.lastPeriodDate = `Use a date after ${formatDate(earliest, 'long')}.`;

  const cycle = Number(form.cycleLength);
  if (!/^\d+$/.test(form.cycleLength) || cycle < CYCLE_LENGTH_MIN || cycle > CYCLE_LENGTH_MAX)
    errors.cycleLength = `Enter a whole number from ${CYCLE_LENGTH_MIN} to ${CYCLE_LENGTH_MAX}.`;

  const period = Number(form.periodDuration);
  if (!/^\d+$/.test(form.periodDuration) || period < PERIOD_DURATION_MIN || period > PERIOD_DURATION_MAX)
    errors.periodDuration = `Enter a whole number from ${PERIOD_DURATION_MIN} to ${PERIOD_DURATION_MAX}.`;
  else if (!errors.cycleLength && period >= cycle) errors.periodDuration = 'Period must be shorter than the cycle.';
  return errors;
}

const inputClass = (invalid: boolean) =>
  `w-full min-h-[44px] bg-[#FAF8FA] border rounded-xl px-3.5 text-sm font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 ${
    invalid ? 'border-rose-400' : 'border-[#F1DDE8]'
  }`;

/** Inputs for the local cycle estimate. Replaced by backend data once available. */
export const CycleDetailsForm: React.FC<CycleDetailsFormProps> = ({ settings, today, onSave }) => {
  const [form, setForm] = useState<FormState>(() => fromSettings(settings));
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const ids = { date: useId(), cycle: useId(), period: useId(), regularity: useId() };

  const saved = fromSettings(settings);
  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form, today);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSaving(true);
    await onSave({
      lastPeriodDate: form.lastPeriodDate,
      cycleLength: Number(form.cycleLength),
      periodDuration: Number(form.periodDuration),
      periodRegularity: form.periodRegularity,
    });
    setSaving(false);
  };

  const errorText = (key: keyof FormState, id: string) =>
    errors[key] ? (
      <p id={`${id}-error`} className="text-xs font-medium text-rose-600 mt-1">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-labelledby="cycle-details-title"
      className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
          <CalendarDays className="w-4.5 h-4.5" aria-hidden="true" />
        </div>
        <div>
          <h3 id="cycle-details-title" className="text-base sm:text-lg font-black text-[#17152B] tracking-tight">
            Cycle Details
          </h3>
          <p className="text-[0.72rem] sm:text-xs text-[#68708A]">Used to estimate your cycle day, phase and next period.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label htmlFor={ids.date} className="text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1">
            Last period start
          </label>
          <input
            id={ids.date}
            type="date"
            value={form.lastPeriodDate}
            max={today}
            min={addDays(today, -EARLIEST_DAYS_AGO)}
            required
            aria-invalid={Boolean(errors.lastPeriodDate)}
            aria-describedby={errors.lastPeriodDate ? `${ids.date}-error` : undefined}
            onChange={(e) => set('lastPeriodDate', e.target.value)}
            className={inputClass(Boolean(errors.lastPeriodDate))}
          />
          {errorText('lastPeriodDate', ids.date)}
        </div>
        <div>
          <label htmlFor={ids.cycle} className="text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1">
            Cycle length (days)
          </label>
          <input
            id={ids.cycle}
            type="number"
            inputMode="numeric"
            min={CYCLE_LENGTH_MIN}
            max={CYCLE_LENGTH_MAX}
            step={1}
            value={form.cycleLength}
            aria-invalid={Boolean(errors.cycleLength)}
            aria-describedby={errors.cycleLength ? `${ids.cycle}-error` : undefined}
            onChange={(e) => set('cycleLength', e.target.value)}
            className={inputClass(Boolean(errors.cycleLength))}
          />
          {errorText('cycleLength', ids.cycle)}
        </div>
        <div>
          <label htmlFor={ids.period} className="text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1">
            Period length (days)
          </label>
          <input
            id={ids.period}
            type="number"
            inputMode="numeric"
            min={PERIOD_DURATION_MIN}
            max={PERIOD_DURATION_MAX}
            step={1}
            value={form.periodDuration}
            aria-invalid={Boolean(errors.periodDuration)}
            aria-describedby={errors.periodDuration ? `${ids.period}-error` : undefined}
            onChange={(e) => set('periodDuration', e.target.value)}
            className={inputClass(Boolean(errors.periodDuration))}
          />
          {errorText('periodDuration', ids.period)}
        </div>
        <div>
          <label htmlFor={ids.regularity} className="text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1">
            Regularity
          </label>
          <select
            id={ids.regularity}
            value={form.periodRegularity}
            onChange={(e) => set('periodRegularity', e.target.value as PeriodRegularity)}
            className={inputClass(false)}
          >
            <option value="Regular">Regular</option>
            <option value="Irregular">Irregular</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 flex-wrap">
        {isDirty && (
          <button
            type="button"
            onClick={() => {
              setForm(saved);
              setErrors({});
            }}
            className={buttonClass.secondary}
          >
            Cancel
          </button>
        )}
        <button type="submit" disabled={!isDirty || saving} className={buttonClass.primary}>
          {saving ? 'Saving…' : 'Save cycle details'}
        </button>
      </div>
    </form>
  );
};
