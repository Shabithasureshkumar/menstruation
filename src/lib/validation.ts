import { isValidDateOnly, isValidTime } from './date';
import { isRecord } from './storage';
import {
  BBT_MAX_C,
  BBT_MIN_C,
  BLOOD_COLORS,
  BLOOD_FLOWS,
  CERVICAL_MUCUS_TYPES,
  CLOT_SIZES,
  CRAMP_SEVERITIES,
  ENERGY_LEVELS,
  LH_TEST_RESULTS,
  LIBIDO_LEVELS,
  MEDICATION_DOSE_MAX,
  MEDICATION_FORMS,
  MEDICATION_STATUSES,
  MEDICATION_UNITS,
  MOODS,
  NOTES_MAX_LENGTH,
  PAIN_SCORE_MAX,
  PAIN_SCORE_MIN,
  PRODUCT_QUANTITY_MAX,
  PRODUCT_QUANTITY_MIN,
  PRODUCT_SIZES,
  PRODUCT_TYPES,
  SYMPTOMS,
  createEmptyLog,
} from '../types/dailyLog';
import type {
  DailyLogEntry,
  DailyLogsByDate,
  MedicationEntry,
  MedicationInput,
  ProductEntry,
  ProductType,
  SymptomKey,
} from '../types/dailyLog';
import {
  CYCLE_LENGTH_MAX,
  CYCLE_LENGTH_MIN,
  PERIOD_DURATION_MAX,
  PERIOD_DURATION_MIN,
} from '../types/cycle';
import { DEFAULT_SETTINGS, JOURNEY_TYPES, REMINDER_LEAD_DAYS } from '../types/settings';
import type { SettingsState } from '../types/settings';

// ---- small field sanitizers: invalid values become null / defaults ----

function oneOf<T extends string | number>(value: unknown, allowed: readonly T[]): T | null {
  return allowed.includes(value as T) ? (value as T) : null;
}

function bool(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function numberInRange(value: unknown, min: number, max: number): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : null;
}

function nonEmptyString(value: unknown, maxLength = 120): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

const SYMPTOM_KEYS = SYMPTOMS.map((s) => s.id);

// ---- products ----

export function sanitizeProduct(value: unknown): ProductEntry | null {
  if (!isRecord(value)) return null;
  const id = nonEmptyString(value.id, 80);
  const type = oneOf<ProductType>(value.type, PRODUCT_TYPES);
  const quantity = numberInRange(value.quantity, PRODUCT_QUANTITY_MIN, PRODUCT_QUANTITY_MAX);
  if (!id || !type || quantity === null || !Number.isInteger(quantity)) return null;
  const sizes = PRODUCT_SIZES[type];
  const size = sizes.length === 0 ? null : oneOf(value.size, sizes as string[]);
  if (sizes.length > 0 && size === null) return null;
  const label = typeof value.label === 'string' ? value.label.trim().slice(0, 60) : '';
  if (type === 'Other' && !label) return null;
  return { id, type, label, size, quantity };
}

// ---- daily logs ----

export function sanitizeDailyLog(value: unknown, date: string): DailyLogEntry | null {
  if (!isRecord(value) || !isValidDateOnly(date)) return null;
  const base = createEmptyLog(date);
  const clotsPresent = bool(value.clotsPresent);
  const painScore = numberInRange(value.painScore, PAIN_SCORE_MIN, PAIN_SCORE_MAX);
  const symptoms = Array.isArray(value.symptoms)
    ? [...new Set(value.symptoms.filter((s): s is SymptomKey => SYMPTOM_KEYS.includes(s as SymptomKey)))]
    : [];
  const products = Array.isArray(value.products)
    ? value.products.map(sanitizeProduct).filter((p): p is ProductEntry => p !== null)
    : [];
  return {
    ...base,
    flow: oneOf(value.flow, BLOOD_FLOWS),
    bloodColor: oneOf(value.bloodColor, BLOOD_COLORS),
    clotsPresent,
    clotSize: clotsPresent ? oneOf(value.clotSize, CLOT_SIZES) : null,
    cramps: oneOf(value.cramps, CRAMP_SEVERITIES),
    painScore: painScore !== null && Number.isInteger(painScore) ? painScore : null,
    symptoms,
    mood: oneOf(value.mood, MOODS),
    energy: oneOf(value.energy, ENERGY_LEVELS),
    libido: oneOf(value.libido, LIBIDO_LEVELS),
    cervicalMucus: oneOf(value.cervicalMucus, CERVICAL_MUCUS_TYPES),
    bbtCelsius: numberInRange(value.bbtCelsius, BBT_MIN_C, BBT_MAX_C),
    lhTest: oneOf(value.lhTest, LH_TEST_RESULTS),
    intercourse: bool(value.intercourse),
    products,
    notes: typeof value.notes === 'string' && value.notes.trim() ? value.notes.trim().slice(0, NOTES_MAX_LENGTH) : null,
  };
}

/** Validates the logs map. Entries with a bad date key are dropped; bad fields become null. */
export function sanitizeDailyLogs(value: unknown): DailyLogsByDate | null {
  if (!isRecord(value)) return null;
  const result: DailyLogsByDate = {};
  for (const [date, entry] of Object.entries(value)) {
    const log = sanitizeDailyLog(entry, date);
    if (log) result[date] = log;
  }
  return result;
}

// ---- medications ----

export type MedicationFieldErrors = Partial<Record<keyof MedicationInput, string>>;

/** Field-level validation used by both the form and storage. */
export function validateMedicationInput(input: {
  name: string;
  dose: string | number;
  unit: string;
  form: string;
  date: string;
  time: string;
  status: string;
}, today: string): { value: MedicationInput | null; errors: MedicationFieldErrors } {
  const errors: MedicationFieldErrors = {};
  const name = input.name.trim();
  if (!name) errors.name = 'Medication name is required.';
  else if (name.length > 80) errors.name = 'Use 80 characters or fewer.';

  const doseText = String(input.dose).trim();
  const dose = Number(doseText);
  if (!doseText) errors.dose = 'Dose is required.';
  else if (!/^\d+(\.\d{1,3})?$/.test(doseText) || !Number.isFinite(dose)) errors.dose = 'Enter a number, e.g. 200 or 2.5.';
  else if (dose <= 0) errors.dose = 'Dose must be greater than 0.';
  else if (dose > MEDICATION_DOSE_MAX) errors.dose = 'Dose is too large.';

  const unit = oneOf(input.unit, MEDICATION_UNITS);
  if (!unit) errors.unit = 'Choose a unit.';
  const form = oneOf(input.form, MEDICATION_FORMS);
  if (!form) errors.form = 'Choose a form.';
  const status = oneOf(input.status, MEDICATION_STATUSES);
  if (!status) errors.status = 'Choose taken or skipped.';

  if (!isValidDateOnly(input.date)) errors.date = 'Enter a valid date.';
  else if (input.date > today) errors.date = 'Date cannot be in the future.';

  if (!isValidTime(input.time)) errors.time = 'Enter a time as HH:mm.';

  if (Object.keys(errors).length > 0 || !unit || !form || !status) return { value: null, errors };
  return {
    value: { name, dose, unit, form, status, date: input.date, time: input.time },
    errors,
  };
}

export function sanitizeMedication(value: unknown): MedicationEntry | null {
  if (!isRecord(value)) return null;
  const id = nonEmptyString(value.id, 80);
  if (!id) return null;
  const { value: input } = validateMedicationInput(
    {
      name: typeof value.name === 'string' ? value.name : '',
      dose: typeof value.dose === 'number' ? value.dose : '',
      unit: String(value.unit ?? ''),
      form: String(value.form ?? ''),
      date: String(value.date ?? ''),
      time: String(value.time ?? ''),
      status: String(value.status ?? ''),
    },
    '9999-12-31',
  );
  return input ? { id, ...input } : null;
}

export function sanitizeMedications(value: unknown): MedicationEntry[] | null {
  if (!Array.isArray(value)) return null;
  return value.map(sanitizeMedication).filter((m): m is MedicationEntry => m !== null);
}

// ---- settings ----

export function sanitizeSettings(value: unknown): SettingsState | null {
  if (!isRecord(value)) return null;
  const d = DEFAULT_SETTINGS;
  const pickBool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback);
  const cycleLength = numberInRange(value.cycleLength, CYCLE_LENGTH_MIN, CYCLE_LENGTH_MAX);
  const periodDuration = numberInRange(value.periodDuration, PERIOD_DURATION_MIN, PERIOD_DURATION_MAX);
  return {
    // 'track_cycle' was the pre-contract name for 'cycle_tracking'.
    journeyType: oneOf(value.journeyType === 'track_cycle' ? 'cycle_tracking' : value.journeyType, JOURNEY_TYPES) ?? d.journeyType,
    journeyStartedOn: isValidDateOnly(value.journeyStartedOn) ? value.journeyStartedOn : null,
    lastPeriodDate: isValidDateOnly(value.lastPeriodDate) ? value.lastPeriodDate : d.lastPeriodDate,
    cycleLength: cycleLength !== null && Number.isInteger(cycleLength) ? cycleLength : d.cycleLength,
    periodDuration: periodDuration !== null && Number.isInteger(periodDuration) ? periodDuration : d.periodDuration,
    periodRegularity: oneOf(value.periodRegularity, ['Regular', 'Irregular'] as const) ?? d.periodRegularity,
    shareWithProvider: pickBool(value.shareWithProvider, d.shareWithProvider),
    researchParticipation: pickBool(value.researchParticipation, d.researchParticipation),
    medicationReminders: pickBool(value.medicationReminders, d.medicationReminders),
    waterReminders: pickBool(value.waterReminders, d.waterReminders),
    wellnessReminders: pickBool(value.wellnessReminders, d.wellnessReminders),
    periodReminders: pickBool(value.periodReminders, d.periodReminders),
    periodReminderDaysBefore: oneOf(value.periodReminderDaysBefore, REMINDER_LEAD_DAYS) ?? d.periodReminderDaysBefore,
    ovulationReminders: pickBool(value.ovulationReminders, d.ovulationReminders),
    ovulationReminderDaysBefore: oneOf(value.ovulationReminderDaysBefore, REMINDER_LEAD_DAYS) ?? d.ovulationReminderDaysBefore,
    intercourseTracking: pickBool(value.intercourseTracking, d.intercourseTracking),
    cycleRegularity: pickBool(value.cycleRegularity, d.cycleRegularity),
  };
}
