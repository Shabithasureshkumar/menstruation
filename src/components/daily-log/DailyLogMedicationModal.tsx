import React, { useId, useState } from 'react';
import { Pill } from 'lucide-react';
import { Modal } from '../common/Modal';
import { buttonClass } from '../common/buttonStyles';
import { getCurrentTime } from '../../lib/date';
import { validateMedicationInput } from '../../lib/validation';
import type { MedicationFieldErrors } from '../../lib/validation';
import { MEDICATION_FORMS, MEDICATION_STATUSES, MEDICATION_UNITS } from '../../types/dailyLog';
import type { MedicationEntry, MedicationInput, MedicationStatus } from '../../types/dailyLog';

interface DailyLogMedicationModalProps {
  isOpen: boolean;
  /** Present when editing an existing entry. */
  editing: MedicationEntry | null;
  defaultDate: string;
  today: string;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (input: MedicationInput) => Promise<boolean>;
}

export const DailyLogMedicationModal: React.FC<DailyLogMedicationModalProps> = (props) =>
  props.isOpen ? <MedicationDialog {...props} /> : null;

/** Mounted per open: fields start empty for a new entry, or from the entry being edited. */
const MedicationDialog: React.FC<DailyLogMedicationModalProps> = ({ editing, defaultDate, today, isSaving, onClose, onSubmit }) => {
  const [form, setForm] = useState(() => ({
    name: editing?.name ?? '',
    dose: editing ? String(editing.dose) : '',
    unit: editing?.unit ?? 'mg',
    form: editing?.form ?? 'Tablet',
    date: editing?.date ?? defaultDate,
    time: editing?.time ?? getCurrentTime(),
    status: (editing?.status ?? 'Taken') as MedicationStatus,
  }));
  const [errors, setErrors] = useState<MedicationFieldErrors>({});
  const ids = {
    form: useId(),
    name: useId(),
    dose: useId(),
    unit: useId(),
    kind: useId(),
    date: useId(),
    time: useId(),
    status: useId(),
  };

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { value, errors: found } = validateMedicationInput(form, today);
    setErrors(found);
    if (!value) return;
    if (await onSubmit(value)) onClose();
  };

  const fieldClass = (invalid?: string) =>
    `w-full min-h-[44px] bg-[#FAF8FA] border rounded-xl px-3.5 text-sm font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 ${
      invalid ? 'border-rose-400' : 'border-[#F1DDE8]'
    }`;
  const labelClass = 'text-xs font-bold text-[#68708A] uppercase tracking-wider block mb-1';
  const described = (key: keyof MedicationFieldErrors, id: string) => ({
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${id}-error` : undefined,
  });
  const errorOf = (key: keyof MedicationFieldErrors, id: string) =>
    errors[key] ? (
      <p id={`${id}-error`} className="text-xs font-medium text-rose-600 mt-1">
        {errors[key]}
      </p>
    ) : null;

  return (
    <Modal
      isOpen
      onClose={onClose}
      icon={<Pill className="w-5 h-5" />}
      title={editing ? 'Edit Medication' : 'Log Medication'}
      description="Record a medication you took or skipped."
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonClass.secondary}>
            Cancel
          </button>
          <button type="submit" form={ids.form} disabled={isSaving} className={buttonClass.primary}>
            {isSaving ? 'Saving…' : editing ? 'Save changes' : 'Save medication'}
          </button>
        </>
      }
    >
      <form id={ids.form} onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
            Medication name
          </label>
          <input
            id={ids.name}
            type="text"
            required
            maxLength={80}
            autoComplete="off"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Ibuprofen"
            className={fieldClass(errors.name)}
            {...described('name', ids.name)}
          />
          {errorOf('name', ids.name)}
        </div>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
          <div>
            <label htmlFor={ids.dose} className={labelClass}>
              Dose
            </label>
            <input
              id={ids.dose}
              type="text"
              inputMode="decimal"
              required
              value={form.dose}
              onChange={(e) => set('dose', e.target.value)}
              placeholder="e.g. 200"
              className={fieldClass(errors.dose)}
              {...described('dose', ids.dose)}
            />
            {errorOf('dose', ids.dose)}
          </div>
          <div>
            <label htmlFor={ids.unit} className={labelClass}>
              Unit
            </label>
            <select id={ids.unit} value={form.unit} onChange={(e) => set('unit', e.target.value as typeof form.unit)} className={fieldClass(errors.unit)}>
              {MEDICATION_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.kind} className={labelClass}>
              Form
            </label>
            <select id={ids.kind} value={form.form} onChange={(e) => set('form', e.target.value as typeof form.form)} className={fieldClass(errors.form)}>
              {MEDICATION_FORMS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
          <div>
            <label htmlFor={ids.date} className={labelClass}>
              Date
            </label>
            <input
              id={ids.date}
              type="date"
              required
              max={today}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className={fieldClass(errors.date)}
              {...described('date', ids.date)}
            />
            {errorOf('date', ids.date)}
          </div>
          <div>
            <label htmlFor={ids.time} className={labelClass}>
              Time
            </label>
            <input
              id={ids.time}
              type="time"
              required
              value={form.time}
              onChange={(e) => set('time', e.target.value)}
              className={fieldClass(errors.time)}
              {...described('time', ids.time)}
            />
            {errorOf('time', ids.time)}
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Status</legend>
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8FA] rounded-xl border border-[#F1DDE8]">
            {MEDICATION_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={form.status === s}
                onClick={() => set('status', s)}
                className={`flex-1 min-h-[44px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  form.status === s ? (s === 'Taken' ? 'bg-[#047857] text-white' : 'bg-[#D81B60] text-white') : 'text-[#55607A] hover:text-[#17152B]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      </form>
    </Modal>
  );
};
