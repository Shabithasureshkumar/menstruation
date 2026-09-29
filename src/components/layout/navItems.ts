import type { SubNavTab, TopNavTab } from '../../types/cycleTracker';

/**
 * Top-level product modules. Only the Dashboard (this Cycle Tracker) exists in
 * this build; the rest are shown as unavailable rather than faking navigation.
 */
export const TOP_NAV_ITEMS: ReadonlyArray<{ id: TopNavTab; label: string; available: boolean }> = [
  { id: 'dashboard', label: 'Dashboard', available: true },
  { id: 'appointment', label: 'Appointment', available: false },
  { id: 'patient', label: 'Patient', available: false },
  { id: 'reports', label: 'Reports', available: false },
  { id: 'chats', label: 'Chats', available: false },
  { id: 'billing', label: 'Billing', available: false },
];

export const SUB_NAV_ITEMS: ReadonlyArray<{ id: SubNavTab; label: string; keywords: string }> = [
  { id: 'overview', label: 'Overview', keywords: 'home summary status dashboard' },
  { id: 'calendar', label: 'Calendar', keywords: 'month dates phases predictions period' },
  { id: 'dailyLog', label: 'Daily Log', keywords: 'log today flow symptoms mood medication products bbt' },
  { id: 'insights', label: 'Insights', keywords: 'trends analytics history patterns' },
  { id: 'settings', label: 'Settings', keywords: 'preferences journey reminders privacy cycle length' },
];
