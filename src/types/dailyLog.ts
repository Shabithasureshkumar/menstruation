import type { DateOnly } from '../lib/date';

export type BloodFlow = 'Spotting' | 'Light' | 'Medium' | 'Heavy';
export type BloodColor = 'Bright Red' | 'Dark Red' | 'Brown' | 'Pink';
export type CrampSeverity = 'None' | 'Mild' | 'Moderate' | 'Severe';
export type ClotSize = 'Small' | 'Medium' | 'Large';
export type EnergyLevel = 'Low' | 'Medium' | 'High';
export type LibidoLevel = 'Low' | 'Medium' | 'High';
export type MoodType = 'Happy' | 'Calm' | 'Neutral' | 'Irritable' | 'Sad';
export type CervicalMucus = 'Dry' | 'Sticky' | 'Creamy' | 'Watery' | 'Egg white';
export type LhTestResult = 'Negative' | 'Positive';

export type SymptomKey =
  | 'cramps'
  | 'headache'
  | 'backPain'
  | 'bloating'
  | 'breastTenderness'
  | 'fatigue'
  | 'nausea'
  | 'acne'
  | 'discharge'
  | 'other'
  | 'cravings'
  | 'insomnia'
  | 'anxiety';

export const BLOOD_FLOWS: readonly BloodFlow[] = ['Light', 'Medium', 'Heavy', 'Spotting'];
export const BLOOD_COLORS: readonly BloodColor[] = ['Bright Red', 'Dark Red', 'Brown', 'Pink'];
export const CRAMP_SEVERITIES: readonly CrampSeverity[] = ['None', 'Mild', 'Moderate', 'Severe'];
export const CLOT_SIZES: readonly ClotSize[] = ['Small', 'Medium', 'Large'];
export const ENERGY_LEVELS: readonly EnergyLevel[] = ['Low', 'Medium', 'High'];
export const LIBIDO_LEVELS: readonly LibidoLevel[] = ['Low', 'Medium', 'High'];
export const MOODS: readonly MoodType[] = ['Happy', 'Calm', 'Neutral', 'Irritable', 'Sad'];
export const CERVICAL_MUCUS_TYPES: readonly CervicalMucus[] = ['Dry', 'Sticky', 'Creamy', 'Watery', 'Egg white'];
export const LH_TEST_RESULTS: readonly LhTestResult[] = ['Negative', 'Positive'];

export const SYMPTOMS: ReadonlyArray<{ id: SymptomKey; label: string }> = [
  { id: 'cramps', label: 'Cramps' },
  { id: 'headache', label: 'Headache' },
  { id: 'backPain', label: 'Back pain' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'breastTenderness', label: 'Breast tenderness' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'acne', label: 'Acne' },
  { id: 'discharge', label: 'Discharge' },
  { id: 'other', label: 'Other' },
];

export const PAIN_SCORE_MIN = 0;
export const PAIN_SCORE_MAX = 10;
export const BBT_MIN_C = 35.0;
export const BBT_MAX_C = 38.5;
export const NOTES_MAX_LENGTH = 1000;

// ---- Products ----

export type ProductType = 'Pad' | 'Tampon' | 'Menstrual cup' | 'Other';

export const PRODUCT_TYPES: readonly ProductType[] = ['Pad', 'Tampon', 'Menstrual cup', 'Other'];

/** Valid size options per product type. `Other` has no size. */
export const PRODUCT_SIZES: Record<ProductType, readonly string[]> = {
  Pad: ['Small', 'Medium', 'Large', 'Overnight'],
  Tampon: ['Light', 'Regular', 'Super'],
  'Menstrual cup': ['Small', 'Medium', 'Large'],
  Other: [],
};

export const PRODUCT_QUANTITY_MIN = 1;
export const PRODUCT_QUANTITY_MAX = 20;

export interface ProductEntry {
  id: string;
  type: ProductType;
  /** Required for `Other`, optional note for the rest. */
  label: string;
  /** Always one of PRODUCT_SIZES[type], or null when the type has no sizes. */
  size: string | null;
  quantity: number;
}

// ---- Daily log ----

/**
 * One day's self-reported log. `null` means "not recorded" — an empty log is
 * all nulls / empty arrays, never pre-filled values.
 */
export interface DailyLogEntry {
  date: DateOnly;
  flow: BloodFlow | null;
  bloodColor: BloodColor | null;
  clotsPresent: boolean | null;
  clotSize: ClotSize | null;
  cramps: CrampSeverity | null;
  painScore: number | null;
  symptoms: SymptomKey[];
  mood: MoodType | null;
  energy: EnergyLevel | null;
  libido: LibidoLevel | null;
  cervicalMucus: CervicalMucus | null;
  bbtCelsius: number | null;
  lhTest: LhTestResult | null;
  intercourse: boolean | null;
  products: ProductEntry[];
  /** Free-text note, up to NOTES_MAX_LENGTH characters. */
  notes: string | null;
}

export type DailyLogsByDate = Record<DateOnly, DailyLogEntry>;

export function createEmptyLog(date: DateOnly): DailyLogEntry {
  return {
    date,
    flow: null,
    bloodColor: null,
    clotsPresent: null,
    clotSize: null,
    cramps: null,
    painScore: null,
    symptoms: [],
    mood: null,
    energy: null,
    libido: null,
    cervicalMucus: null,
    bbtCelsius: null,
    lhTest: null,
    intercourse: null,
    products: [],
    notes: null,
  };
}

/** True when nothing at all has been recorded in the entry. */
export function isLogEmpty(log: DailyLogEntry): boolean {
  const empty = createEmptyLog(log.date);
  return JSON.stringify(normalizeLog(log)) === JSON.stringify(empty);
}

/** Stable key order + sorted symptoms, so two logs can be compared by JSON. */
export function normalizeLog(log: DailyLogEntry): DailyLogEntry {
  return {
    date: log.date,
    flow: log.flow,
    bloodColor: log.bloodColor,
    clotsPresent: log.clotsPresent,
    clotSize: log.clotsPresent ? log.clotSize : null,
    cramps: log.cramps,
    painScore: log.painScore,
    symptoms: [...log.symptoms].sort(),
    mood: log.mood,
    energy: log.energy,
    libido: log.libido,
    cervicalMucus: log.cervicalMucus,
    bbtCelsius: log.bbtCelsius,
    lhTest: log.lhTest,
    intercourse: log.intercourse,
    products: log.products.map((p) => ({ id: p.id, type: p.type, label: p.label, size: p.size, quantity: p.quantity })),
    notes: log.notes?.trim() ? log.notes.trim() : null,
  };
}

export function logsEqual(a: DailyLogEntry, b: DailyLogEntry): boolean {
  return JSON.stringify(normalizeLog(a)) === JSON.stringify(normalizeLog(b));
}

// ---- Medications ----

export type MedicationUnit = 'mg' | 'g' | 'mcg' | 'mL' | 'IU';
export type MedicationForm = 'Tablet' | 'Capsule' | 'Liquid' | 'Injection';
export type MedicationStatus = 'Taken' | 'Skipped';

export const MEDICATION_UNITS: readonly MedicationUnit[] = ['mg', 'g', 'mcg', 'mL', 'IU'];
export const MEDICATION_FORMS: readonly MedicationForm[] = ['Tablet', 'Capsule', 'Liquid', 'Injection'];
export const MEDICATION_STATUSES: readonly MedicationStatus[] = ['Taken', 'Skipped'];
export const MEDICATION_DOSE_MAX = 100_000;

export interface MedicationEntry {
  id: string;
  date: DateOnly;
  /** 24h `HH:mm`. */
  time: string;
  name: string;
  dose: number;
  unit: MedicationUnit;
  form: MedicationForm;
  status: MedicationStatus;
}

export type MedicationInput = Omit<MedicationEntry, 'id'>;

export function formatDose(med: Pick<MedicationEntry, 'dose' | 'unit' | 'form'>): string {
  return `${med.dose} ${med.unit} · ${med.form}`;
}
