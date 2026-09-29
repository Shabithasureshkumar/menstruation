import { createContext } from 'react';
import type { DateOnly } from '../lib/date';
import type { DailyLogEntry, DailyLogsByDate, MedicationEntry, MedicationInput } from '../types/dailyLog';
import type { CurrentUser, Patient } from '../types/identity';
import type { JourneyType, SettingsState } from '../types/settings';

export type LoadStatus = 'loading' | 'ready' | 'error';

// ---- Today ----
/** Local "today" as YYYY-MM-DD; rolls over at midnight. */
export const TodayContext = createContext<DateOnly | null>(null);

// ---- Toasts ----
export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: () => void;
}
export const ToastContext = createContext<ToastContextValue | null>(null);

// ---- Settings ----
export interface SettingsContextValue {
  status: LoadStatus;
  settings: SettingsState;
  retry: () => void;
  /** Applies the change immediately and persists it; reverts and reports on failure. */
  update: (patch: Partial<SettingsState>) => Promise<boolean>;
  setJourney: (journey: JourneyType) => Promise<boolean>;
}
export const SettingsContext = createContext<SettingsContextValue | null>(null);

// ---- Identity ----
export interface PatientContextValue {
  status: LoadStatus;
  patient: Patient | null;
  currentUser: CurrentUser | null;
  retry: () => void;
}
export const PatientContext = createContext<PatientContextValue | null>(null);

// ---- Daily log + medications ----
export interface DailyLogContextValue {
  status: LoadStatus;
  retry: () => void;

  savedLogs: DailyLogsByDate;
  selectedDate: DateOnly;
  /** Editable copy of the selected date's log. Never written until `saveDraft`. */
  draft: DailyLogEntry;
  savedLog: DailyLogEntry | null;
  isDirty: boolean;
  canEditSelectedDate: boolean;
  isSaving: boolean;

  /** Selects a date. If the draft has unsaved changes the user is asked first. */
  selectDate: (date: DateOnly) => void;
  updateDraft: (update: (draft: DailyLogEntry) => DailyLogEntry) => void;
  discardDraft: () => void;
  saveDraft: () => Promise<boolean>;
  deleteSavedLog: () => Promise<boolean>;

  medications: MedicationEntry[];
  isMedicationPending: boolean;
  addMedication: (input: MedicationInput) => Promise<boolean>;
  updateMedication: (id: string, input: MedicationInput) => Promise<boolean>;
  removeMedication: (id: string) => Promise<boolean>;
}
export const DailyLogContext = createContext<DailyLogContextValue | null>(null);
