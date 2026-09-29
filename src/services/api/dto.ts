/**
 * Wire types for the backend API. Must stay identical to docs/API_CONTRACT.md.
 *
 * Conventions:
 * - DateString: `YYYY-MM-DD` (date only, the patient's local calendar day)
 * - TimeString: `HH:mm` (24h, local)
 * - DateTimeString: ISO 8601 with offset, e.g. `2026-09-22T08:30:00+05:30`
 * - Enum values are lowercase snake_case codes.
 * - `null` means "not recorded". Fields are never omitted in responses.
 */

export type DateString = string;
export type TimeString = string;
export type DateTimeString = string;

export interface ErrorResponseDto {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
}

export interface ListResponseDto<T> {
  items: T[];
}

// ---- Identity: GET /me ----

export interface UserDto {
  id: string;
  name: string;
  role: 'clinician' | 'patient' | 'administrator';
  avatarUrl: string | null;
}

export interface PatientDto {
  id: string;
  name: string;
  ageYears: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  avatarUrl: string | null;
}

export interface MeResponseDto {
  user: UserDto;
  patient: PatientDto;
}

// ---- Cycle ----

export type CyclePhaseCode = 'menstruation' | 'follicular' | 'fertile_window' | 'ovulation' | 'luteal';

export interface CycleCurrentDto {
  date: DateString;
  cycleDay: number;
  cycleLength: number;
  periodStartDate: DateString;
  periodDuration: number;
  phase: CyclePhaseCode;
  isOnPeriod: boolean;
  nextPeriodDate: DateString;
  daysUntilNextPeriod: number;
  fertileWindow: { start: DateString; end: DateString };
  ovulationDate: DateString;
}

/** GET /cycle/current?date= — `current` is null when there is not enough data. */
export interface CycleCurrentResponseDto {
  current: CycleCurrentDto | null;
}

export interface CyclePredictionDto {
  date: DateString;
  cycleDay: number;
  phase: CyclePhaseCode;
  isPredicted: boolean;
}

export interface CompletedCycleDto {
  startDate: DateString;
  endDate: DateString;
  cycleLength: number;
  periodLength: number | null;
}

// ---- Daily logs ----

export type FlowCode = 'spotting' | 'light' | 'medium' | 'heavy';
export type BloodColorCode = 'bright_red' | 'dark_red' | 'brown' | 'pink';
export type CrampsCode = 'none' | 'mild' | 'moderate' | 'severe';
export type ClotSizeCode = 'small' | 'medium' | 'large';
export type LevelCode = 'low' | 'medium' | 'high';
export type MoodCode = 'happy' | 'calm' | 'neutral' | 'irritable' | 'sad';
export type CervicalMucusCode = 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg_white';
export type LhTestCode = 'negative' | 'positive';
export type SymptomCode =
  | 'headache'
  | 'bloating'
  | 'fatigue'
  | 'back_pain'
  | 'breast_tenderness'
  | 'acne'
  | 'nausea'
  | 'cravings'
  | 'insomnia'
  | 'anxiety';
export type ProductTypeCode = 'pad' | 'tampon' | 'menstrual_cup' | 'other';
export type ProductSizeCode = 'small' | 'medium' | 'large' | 'overnight' | 'light' | 'regular' | 'super';

export interface ProductDto {
  id: string;
  type: ProductTypeCode;
  label: string;
  /** null only for type `other`. */
  size: ProductSizeCode | null;
  /** 1–20 */
  quantity: number;
}

/** Body of POST /daily-logs and PUT /daily-logs/{date}. */
export interface DailyLogWriteDto {
  date: DateString;
  flow: FlowCode | null;
  bloodColor: BloodColorCode | null;
  clots: { present: boolean; size: ClotSizeCode | null } | null;
  cramps: CrampsCode | null;
  /** 0–10 integer */
  painScore: number | null;
  symptoms: SymptomCode[];
  mood: MoodCode | null;
  energy: LevelCode | null;
  libido: LevelCode | null;
  cervicalMucus: CervicalMucusCode | null;
  /** °C, 35.0–38.5, max 2 decimals */
  bbt: number | null;
  lhTest: LhTestCode | null;
  intercourse: boolean | null;
  products: ProductDto[];
  /** ≤ 1000 characters */
  notes: string | null;
}

export interface DailyLogDto extends DailyLogWriteDto {
  /** Read-only: medications recorded on this date (managed via /medications). */
  medications: MedicationDto[];
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

// ---- Medications ----

export type MedicationUnitCode = 'mg' | 'g' | 'mcg' | 'mL' | 'IU';
export type MedicationFormCode = 'tablet' | 'capsule' | 'liquid' | 'injection';
export type MedicationStatusCode = 'taken' | 'skipped';

/** Body of POST /medications and PATCH /medications/{id}. */
export interface MedicationWriteDto {
  date: DateString;
  time: TimeString;
  name: string;
  /** > 0 */
  dose: number;
  unit: MedicationUnitCode;
  form: MedicationFormCode;
  status: MedicationStatusCode;
}

export interface MedicationDto extends MedicationWriteDto {
  id: string;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

// ---- Settings ----

export type JourneyTypeCode = 'cycle_tracking' | 'trying_to_conceive' | 'pregnancy_prevention';

export interface ReminderDto {
  enabled: boolean;
  /** 1, 3 or 5 */
  daysBefore: 1 | 3 | 5;
}

export interface SettingsDto {
  journeyType: JourneyTypeCode;
  journeyStartedOn: DateString | null;
  lastPeriodDate: DateString | null;
  /** 21–45 */
  cycleLength: number;
  /** 2–10, and less than cycleLength */
  periodDuration: number;
  periodRegularity: 'regular' | 'irregular';
  intercourseTracking: boolean;
  cycleRegularity: boolean;
  periodReminder: ReminderDto;
  ovulationReminder: ReminderDto;
  medicationReminder: boolean;
  waterReminder: boolean;
  wellnessReminder: boolean;
  privacy: {
    shareWithProvider: boolean;
    researchParticipation: boolean;
  };
}

// ---- Insights: GET /insights?from=&to= ----

export interface CountDto<K extends string> {
  key: K;
  count: number;
}

export interface InsightsDto {
  from: DateString;
  to: DateString;
  loggedDays: number;
  symptomFrequency: CountDto<SymptomCode>[];
  moodFrequency: CountDto<MoodCode>[];
  energyFrequency: CountDto<LevelCode>[];
  bbtReadings: { date: DateString; celsius: number }[];
}

// ---- Assistant: POST /assistant/messages ----

export interface AssistantMessageRequestDto {
  message: string;
  /** The patient's local "today", so answers use the right day. */
  date: DateString;
}

export interface AssistantMessageResponseDto {
  reply: string;
  createdAt: DateTimeString;
}
