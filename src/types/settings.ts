import type { DateOnly } from '../lib/date';

/** Exactly one journey is active at a time. */
export type JourneyType = 'cycle_tracking' | 'trying_to_conceive' | 'pregnancy_prevention';

export const JOURNEY_TYPES: readonly JourneyType[] = ['cycle_tracking', 'trying_to_conceive', 'pregnancy_prevention'];

export type ReminderLeadDays = 1 | 3 | 5;
export const REMINDER_LEAD_DAYS: readonly ReminderLeadDays[] = [1, 3, 5];

export type PeriodRegularity = 'Regular' | 'Irregular';

export interface SettingsState {
  // Health journey
  journeyType: JourneyType;
  journeyStartedOn: DateOnly | null;

  // Cycle profile (drives the local cycle estimate until the backend provides one)
  lastPeriodDate: DateOnly | null;
  cycleLength: number;
  periodDuration: number;
  periodRegularity: PeriodRegularity;

  // Privacy
  shareWithProvider: boolean;
  researchParticipation: boolean;

  // Reminder preferences
  medicationReminders: boolean;
  waterReminders: boolean;
  wellnessReminders: boolean;

  // Notifications
  periodReminders: boolean;
  periodReminderDaysBefore: ReminderLeadDays;
  ovulationReminders: boolean;
  ovulationReminderDaysBefore: ReminderLeadDays;

  // Tracking preferences
  intercourseTracking: boolean;
  cycleRegularity: boolean;
}

export const DEFAULT_SETTINGS: SettingsState = {
  journeyType: 'cycle_tracking',
  journeyStartedOn: null,
  lastPeriodDate: '2026-06-14',
  cycleLength: 28,
  periodDuration: 5,
  periodRegularity: 'Regular',
  shareWithProvider: false,
  researchParticipation: false,
  medicationReminders: false,
  waterReminders: false,
  wellnessReminders: false,
  periodReminders: true,
  periodReminderDaysBefore: 1,
  ovulationReminders: false,
  ovulationReminderDaysBefore: 1,
  intercourseTracking: true,
  cycleRegularity: true,
};

/** Journey-derived flags. Never stored separately, so they cannot contradict each other. */
export function isTryingToConceive(settings: Pick<SettingsState, 'journeyType'>): boolean {
  return settings.journeyType === 'trying_to_conceive';
}

export function isPreventingPregnancy(settings: Pick<SettingsState, 'journeyType'>): boolean {
  return settings.journeyType === 'pregnancy_prevention';
}
