/**
 * DEMO ONLY persistence for the local adapters.
 *
 * Health data kept here is plain text in this browser's localStorage. It is not
 * encrypted, not shared, and must never be treated as production storage. It is
 * replaced by the backend when API_MODE switches to 'http'.
 */
import { isRecord, readLegacyJson, readVersioned, removeKey, writeVersioned } from '../../lib/storage';
import { sanitizeDailyLogs, sanitizeMedications, sanitizeSettings } from '../../lib/validation';
import { DEFAULT_SETTINGS } from '../../types/settings';
import type { SettingsState } from '../../types/settings';
import type { DailyLogsByDate, MedicationEntry } from '../../types/dailyLog';

export const DEMO_STORAGE_KEYS = {
  dailyLogs: 'cycleTracker.dailyLogs',
  medications: 'cycleTracker.medications',
  settings: 'cycleTracker.settings',
} as const;

const VERSION = 1;

/** Pre-versioning keys from earlier builds. */
const LEGACY_KEYS = {
  dailyLogs: 'cycle_tracker_menstruation_daily_logs',
  settings: 'cycle_tracker_menstruation_settings_exact',
} as const;

function write(key: string, data: unknown) {
  if (!writeVersioned(key, VERSION, data)) throw new Error('Could not save to browser storage');
}

const DEFAULT_DEMO_LOGS: DailyLogsByDate = {
  '2026-06-09': {
    date: '2026-06-09',
    flow: null,
    bloodColor: null,
    clotsPresent: false,
    clotSize: null,
    cramps: 'None',
    painScore: null,
    symptoms: [],
    mood: 'Happy',
    energy: 'High',
    libido: 'High',
    cervicalMucus: 'Creamy',
    bbtCelsius: 36.30,
    lhTest: null,
    intercourse: true,
    products: [],
    notes: null,
  },
  '2026-06-10': {
    date: '2026-06-10',
    flow: null,
    bloodColor: null,
    clotsPresent: false,
    clotSize: null,
    cramps: 'None',
    painScore: null,
    symptoms: [],
    mood: 'Calm',
    energy: 'High',
    libido: 'Medium',
    cervicalMucus: 'Creamy',
    bbtCelsius: 36.35,
    lhTest: null,
    intercourse: false,
    products: [],
    notes: null,
  },
  '2026-06-11': {
    date: '2026-06-11',
    flow: null,
    bloodColor: null,
    clotsPresent: false,
    clotSize: null,
    cramps: 'None',
    painScore: null,
    symptoms: [],
    mood: 'Happy',
    energy: 'High',
    libido: 'High',
    cervicalMucus: 'Egg white',
    bbtCelsius: 36.40,
    lhTest: 'Positive',
    intercourse: true,
    products: [],
    notes: null,
  },
  '2026-06-16': {
    date: '2026-06-16',
    flow: 'Heavy',
    bloodColor: 'Bright Red',
    clotsPresent: true,
    clotSize: 'Small',
    cramps: 'Moderate',
    painScore: 5,
    symptoms: ['headache', 'fatigue'],
    mood: 'Irritable',
    energy: 'Low',
    libido: 'Low',
    cervicalMucus: null,
    bbtCelsius: 36.50,
    lhTest: null,
    intercourse: true,
    products: [{ id: 'prod-1', type: 'Pad', label: 'Day Pad', size: 'Medium', quantity: 3 }],
    notes: null,
  },
  '2026-06-17': {
    date: '2026-06-17',
    flow: 'Medium',
    bloodColor: 'Dark Red',
    clotsPresent: true,
    clotSize: 'Small',
    cramps: 'Mild',
    painScore: 3,
    symptoms: ['bloating'],
    mood: 'Calm',
    energy: 'Medium',
    libido: 'Low',
    cervicalMucus: null,
    bbtCelsius: 36.55,
    lhTest: null,
    intercourse: true,
    products: [{ id: 'prod-2', type: 'Pad', label: 'Day Pad', size: 'Small', quantity: 2 }],
    notes: null,
  },
  '2026-06-24': {
    date: '2026-06-24',
    flow: 'Medium',
    bloodColor: 'Bright Red',
    clotsPresent: true,
    clotSize: 'Small',
    cramps: 'Mild',
    painScore: 3,
    symptoms: ['headache', 'bloating', 'fatigue'],
    mood: 'Irritable',
    energy: 'Medium',
    libido: 'Low',
    cervicalMucus: 'Sticky',
    bbtCelsius: 36.82,
    lhTest: null,
    intercourse: false,
    products: [
      { id: 'prod-pad', type: 'Pad', label: 'Pads', size: 'Small', quantity: 2 },
      { id: 'prod-tampon', type: 'Tampon', label: 'Tampons', size: 'Light', quantity: 2 },
    ],
    notes: null,
  },
  '2026-06-25': {
    date: '2026-06-25',
    flow: 'Light',
    bloodColor: 'Pink',
    clotsPresent: false,
    clotSize: null,
    cramps: 'Mild',
    painScore: 2,
    symptoms: ['fatigue'],
    mood: 'Calm',
    energy: 'Medium',
    libido: 'Low',
    cervicalMucus: 'Dry',
    bbtCelsius: 36.80,
    lhTest: null,
    intercourse: true,
    products: [],
    notes: null,
  },
};

const DEFAULT_DEMO_MEDICATIONS: MedicationEntry[] = [
  { id: 'med-9-1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: '2026-06-09', time: '08:00', status: 'Taken' },
  { id: 'med-16-1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: '2026-06-16', time: '08:00', status: 'Taken' },
  { id: 'med-16-2', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: '2026-06-16', time: '13:00', status: 'Taken' },
  { id: 'med-17-1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: '2026-06-17', time: '08:00', status: 'Taken' },
  { id: 'med-17-2', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: '2026-06-17', time: '13:00', status: 'Taken' },
  { id: 'med-24-1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: '2026-06-24', time: '08:00', status: 'Taken' },
  { id: 'med-24-2', name: 'Mefenamic Acid', dose: 500, unit: 'mg', form: 'Tablet', date: '2026-06-24', time: '13:00', status: 'Taken' },
  { id: 'med-25-1', name: 'Ibuprofen', dose: 200, unit: 'mg', form: 'Tablet', date: '2026-06-25', time: '08:00', status: 'Taken' },
];

// ---- daily logs ----

export function readLogs(): DailyLogsByDate {
  // Legacy logs were auto-filled with fabricated values whenever a date was opened,
  // so they cannot be trusted and are discarded.
  removeKey(LEGACY_KEYS.dailyLogs);
  const stored = readVersioned(DEMO_STORAGE_KEYS.dailyLogs, VERSION, sanitizeDailyLogs).value;
  return stored ?? { ...DEFAULT_DEMO_LOGS };
}

export function writeLogs(logs: DailyLogsByDate) {
  write(DEMO_STORAGE_KEYS.dailyLogs, logs);
}

// ---- medications ----

export function readMedications(): MedicationEntry[] {
  const stored = readVersioned(DEMO_STORAGE_KEYS.medications, VERSION, sanitizeMedications).value;
  return stored ?? [...DEFAULT_DEMO_MEDICATIONS];
}

export function writeMedications(items: MedicationEntry[]) {
  write(DEMO_STORAGE_KEYS.medications, items);
}

// ---- settings ----

/** Carries over the toggles users could change in the legacy build; its fixed demo cycle dates are dropped. */
function migrateLegacySettings(): SettingsState | null {
  const legacy = readLegacyJson(LEGACY_KEYS.settings);
  removeKey(LEGACY_KEYS.settings);
  if (!isRecord(legacy)) return null;
  return sanitizeSettings({
    journeyType: legacy.journeyType,
    shareWithProvider: legacy.shareWithProvider,
    researchParticipation: legacy.researchParticipation,
    medicationReminders: legacy.medicationReminders,
    waterReminders: legacy.waterIntake,
    wellnessReminders: legacy.wellnessActivity,
    periodReminders: legacy.periodReminders,
    periodReminderDaysBefore: legacy.periodReminderDaysBefore,
    ovulationReminders: legacy.ovulationAlerts,
    ovulationReminderDaysBefore: legacy.ovulationReminderDaysBefore,
    intercourseTracking: legacy.intercourseTracking,
    cycleRegularity: legacy.cycleRegularity,
  });
}

export function readSettings(): SettingsState {
  const stored = readVersioned(DEMO_STORAGE_KEYS.settings, VERSION, sanitizeSettings).value;
  if (stored) return stored;
  const migrated = migrateLegacySettings();
  if (migrated) {
    write(DEMO_STORAGE_KEYS.settings, migrated);
    return migrated;
  }
  return { ...DEFAULT_SETTINGS };
}

export function writeSettings(settings: SettingsState) {
  write(DEMO_STORAGE_KEYS.settings, settings);
}
