/**
 * Conversions between wire DTOs (dto.ts) and frontend models (src/types).
 * Inbound data is re-validated with the same sanitizers used for local
 * storage, so a malformed response can never reach the UI unchecked.
 */
import { diffDays } from '../../lib/date';
import { sanitizeDailyLog, sanitizeMedication, sanitizeSettings } from '../../lib/validation';
import {
  BLOOD_COLORS,
  BLOOD_FLOWS,
  CERVICAL_MUCUS_TYPES,
  CLOT_SIZES,
  CRAMP_SEVERITIES,
  ENERGY_LEVELS,
  LH_TEST_RESULTS,
  LIBIDO_LEVELS,
  MEDICATION_FORMS,
  MEDICATION_STATUSES,
  MOODS,
  PRODUCT_TYPES,
  SYMPTOMS,
} from '../../types/dailyLog';
import type { DailyLogEntry, MedicationEntry, MedicationInput, ProductEntry, SymptomKey } from '../../types/dailyLog';
import { CYCLE_PHASES } from '../../types/cycle';
import type { CycleDayInfo, CycleSummary } from '../../types/cycle';
import type { SettingsState } from '../../types/settings';
import type { CurrentUser, Patient } from '../../types/identity';
import type { CompletedCycle, InsightsSummary } from '../../types/insights';
import { ApiError } from './client';
import type * as Dto from './dto';

/** 'Bright Red' → 'bright_red', 'Menstrual cup' → 'menstrual_cup'. */
export function toCode(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, '_');
}

function fromCode<T extends string>(code: string | null | undefined, labels: readonly T[]): T | null {
  if (code === null || code === undefined) return null;
  return labels.find((l) => toCode(l) === code) ?? null;
}

const symptomToCode = (key: SymptomKey) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`) as Dto.SymptomCode;
const SYMPTOM_KEYS = SYMPTOMS.map((s) => s.id);
const symptomFromCode = (code: string) => SYMPTOM_KEYS.find((k) => symptomToCode(k) === code) ?? null;

function invalid(what: string): never {
  throw new ApiError('invalid_response', `We received an unexpected response (${what}).`);
}

// ---- identity ----

export function fromMeDto(dto: Dto.MeResponseDto): { user: CurrentUser; patient: Patient } {
  const role = dto.user.role === 'patient' ? 'Patient' : dto.user.role === 'administrator' ? 'Administrator' : 'Clinician';
  return {
    user: { id: dto.user.id, name: dto.user.name, role, avatarUrl: dto.user.avatarUrl },
    patient: { ...dto.patient },
  };
}

// ---- cycle ----

export function fromCycleCurrentDto(dto: Dto.CycleCurrentDto): CycleSummary {
  const phase = fromCode(dto.phase, CYCLE_PHASES) ?? invalid('cycle phase');
  return {
    date: dto.date,
    currentCycleDay: dto.cycleDay,
    cycleLength: dto.cycleLength,
    periodStartDate: dto.periodStartDate,
    periodDuration: dto.periodDuration,
    currentPhase: phase,
    isOnPeriod: dto.isOnPeriod,
    nextPeriodDate: dto.nextPeriodDate,
    daysUntilNextPeriod: dto.daysUntilNextPeriod,
    fertileWindow: { ...dto.fertileWindow },
    ovulationDate: dto.ovulationDate,
  };
}

export function fromPredictionDto(dto: Dto.CyclePredictionDto): CycleDayInfo {
  return {
    date: dto.date,
    cycleDay: dto.cycleDay,
    phase: fromCode(dto.phase, CYCLE_PHASES) ?? invalid('cycle phase'),
    isPredicted: dto.isPredicted,
  };
}

export function fromCompletedCycleDto(dto: Dto.CompletedCycleDto): CompletedCycle {
  return { ...dto };
}

// ---- daily logs ----

function toProductDto(p: ProductEntry): Dto.ProductDto {
  return {
    id: p.id,
    type: toCode(p.type) as Dto.ProductTypeCode,
    label: p.label,
    size: p.size ? (toCode(p.size) as Dto.ProductSizeCode) : null,
    quantity: p.quantity,
  };
}

export function toDailyLogWriteDto(log: DailyLogEntry): Dto.DailyLogWriteDto {
  const code = <T extends string>(v: T | null) => (v ? toCode(v) : null);
  return {
    date: log.date,
    flow: code(log.flow) as Dto.FlowCode | null,
    bloodColor: code(log.bloodColor) as Dto.BloodColorCode | null,
    clots: log.clotsPresent === null ? null : { present: log.clotsPresent, size: code(log.clotSize) as Dto.ClotSizeCode | null },
    cramps: code(log.cramps) as Dto.CrampsCode | null,
    painScore: log.painScore,
    symptoms: log.symptoms.map(symptomToCode),
    mood: code(log.mood) as Dto.MoodCode | null,
    energy: code(log.energy) as Dto.LevelCode | null,
    libido: code(log.libido) as Dto.LevelCode | null,
    cervicalMucus: code(log.cervicalMucus) as Dto.CervicalMucusCode | null,
    bbt: log.bbtCelsius,
    lhTest: code(log.lhTest) as Dto.LhTestCode | null,
    intercourse: log.intercourse,
    products: log.products.map(toProductDto),
    notes: log.notes,
  };
}

export function fromDailyLogDto(dto: Dto.DailyLogWriteDto): DailyLogEntry {
  const productType = (c: string) => fromCode(c, PRODUCT_TYPES);
  const candidate = {
    flow: fromCode(dto.flow, BLOOD_FLOWS),
    bloodColor: fromCode(dto.bloodColor, BLOOD_COLORS),
    clotsPresent: dto.clots ? dto.clots.present : null,
    clotSize: dto.clots ? fromCode(dto.clots.size, CLOT_SIZES) : null,
    cramps: fromCode(dto.cramps, CRAMP_SEVERITIES),
    painScore: dto.painScore,
    symptoms: dto.symptoms.map(symptomFromCode).filter(Boolean),
    mood: fromCode(dto.mood, MOODS),
    energy: fromCode(dto.energy, ENERGY_LEVELS),
    libido: fromCode(dto.libido, LIBIDO_LEVELS),
    cervicalMucus: fromCode(dto.cervicalMucus, CERVICAL_MUCUS_TYPES),
    bbtCelsius: dto.bbt,
    lhTest: fromCode(dto.lhTest, LH_TEST_RESULTS),
    intercourse: dto.intercourse,
    products: dto.products.map((p) => {
      const type = productType(p.type);
      // Sizes are title-cased labels in the model ('small' → 'Small').
      const size = p.size ? p.size.charAt(0).toUpperCase() + p.size.slice(1) : null;
      return { id: p.id, type, label: p.label, size, quantity: p.quantity };
    }),
    notes: dto.notes,
  };
  return sanitizeDailyLog(candidate, dto.date) ?? invalid('daily log');
}

// ---- medications ----

export function toMedicationWriteDto(input: MedicationInput): Dto.MedicationWriteDto {
  return {
    date: input.date,
    time: input.time,
    name: input.name,
    dose: input.dose,
    unit: input.unit,
    form: toCode(input.form) as Dto.MedicationFormCode,
    status: toCode(input.status) as Dto.MedicationStatusCode,
  };
}

export function fromMedicationDto(dto: Dto.MedicationDto): MedicationEntry {
  return (
    sanitizeMedication({
      id: dto.id,
      date: dto.date,
      time: dto.time,
      name: dto.name,
      dose: dto.dose,
      unit: dto.unit,
      form: fromCode(dto.form, MEDICATION_FORMS),
      status: fromCode(dto.status, MEDICATION_STATUSES),
    }) ?? invalid('medication')
  );
}

// ---- settings ----

export function toSettingsDto(s: SettingsState): Dto.SettingsDto {
  return {
    journeyType: s.journeyType,
    journeyStartedOn: s.journeyStartedOn,
    lastPeriodDate: s.lastPeriodDate,
    cycleLength: s.cycleLength,
    periodDuration: s.periodDuration,
    periodRegularity: s.periodRegularity === 'Irregular' ? 'irregular' : 'regular',
    intercourseTracking: s.intercourseTracking,
    cycleRegularity: s.cycleRegularity,
    periodReminder: { enabled: s.periodReminders, daysBefore: s.periodReminderDaysBefore },
    ovulationReminder: { enabled: s.ovulationReminders, daysBefore: s.ovulationReminderDaysBefore },
    medicationReminder: s.medicationReminders,
    waterReminder: s.waterReminders,
    wellnessReminder: s.wellnessReminders,
    privacy: { shareWithProvider: s.shareWithProvider, researchParticipation: s.researchParticipation },
  };
}

export function fromSettingsDto(dto: Dto.SettingsDto): SettingsState {
  return (
    sanitizeSettings({
      journeyType: dto.journeyType,
      journeyStartedOn: dto.journeyStartedOn,
      lastPeriodDate: dto.lastPeriodDate,
      cycleLength: dto.cycleLength,
      periodDuration: dto.periodDuration,
      periodRegularity: dto.periodRegularity === 'irregular' ? 'Irregular' : 'Regular',
      intercourseTracking: dto.intercourseTracking,
      cycleRegularity: dto.cycleRegularity,
      periodReminders: dto.periodReminder?.enabled,
      periodReminderDaysBefore: dto.periodReminder?.daysBefore,
      ovulationReminders: dto.ovulationReminder?.enabled,
      ovulationReminderDaysBefore: dto.ovulationReminder?.daysBefore,
      medicationReminders: dto.medicationReminder,
      waterReminders: dto.waterReminder,
      wellnessReminders: dto.wellnessReminder,
      shareWithProvider: dto.privacy?.shareWithProvider,
      researchParticipation: dto.privacy?.researchParticipation,
    }) ?? invalid('settings')
  );
}

// ---- insights ----

export function fromInsightsDto(dto: Dto.InsightsDto): InsightsSummary {
  const counts = <K extends string>(items: Dto.CountDto<string>[], map: (code: string) => K | null) =>
    items.flatMap((i) => {
      const key = map(i.key);
      return key ? [{ key, count: i.count }] : [];
    });
  return {
    from: dto.from,
    to: dto.to,
    windowDays: diffDays(dto.from, dto.to) + 1,
    loggedDays: dto.loggedDays,
    symptomFrequency: counts(dto.symptomFrequency, symptomFromCode),
    moodFrequency: counts(dto.moodFrequency, (c) => fromCode(c, MOODS)),
    energyFrequency: counts(dto.energyFrequency, (c) => fromCode(c, ENERGY_LEVELS)),
    bbtReadings: dto.bbtReadings.map((r) => ({ ...r })),
  };
}
