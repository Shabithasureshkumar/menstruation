import type {
  CalendarDay,
  ConnectedDevice,
  CycleSummaryData,
  DailyLogState,
  PatientProfileData,
  SymptomItem,
} from '../types/dailyLog';

export const initialPatientProfile: PatientProfileData = {
  name: 'Jimmy Alexa',
  gender: 'Female',
  age: 38,
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
};

export const initialCycleSummary: CycleSummaryData = {
  currentPhase: 'Menstruation',
  ovulationPredictedDate: 'Jul 6, 2025',
  fertileWindowRange: 'Jul 2 – Jul 6, 2025',
  lutealPhaseRange: 'Jul 7 – Jul 20, 2025',
};

export const initialCalendarDays: CalendarDay[] = [
  {
    dateStr: '2026-06-18',
    dayNumber: 18,
    monthName: 'Jun',
    cycleDay: 28,
    phase: 'Luteal Phase',
    isLogged: true,
  },
  {
    dateStr: '2026-06-19',
    dayNumber: 19,
    monthName: 'Jun',
    cycleDay: 29,
    phase: 'Luteal Phase',
    isLogged: true,
  },
  {
    dateStr: '2026-06-20',
    dayNumber: 20,
    monthName: 'Jun',
    cycleDay: 30,
    phase: 'Fertile Window',
    isLogged: true,
  },
  {
    dateStr: '2026-06-21',
    dayNumber: 21,
    monthName: 'Jun',
    cycleDay: 1,
    phase: 'Menstruation',
    isLogged: true,
    isToday: true,
  },
  {
    dateStr: '2026-06-22',
    dayNumber: 22,
    monthName: 'Jun',
    cycleDay: 2,
    phase: 'Menstruation',
    isLogged: true,
  },
  {
    dateStr: '2026-06-23',
    dayNumber: 23,
    monthName: 'Jun',
    cycleDay: 3,
    phase: 'Menstruation',
    isLogged: true,
  },
  {
    dateStr: '2026-06-24',
    dayNumber: 24,
    monthName: 'Jun',
    cycleDay: 4,
    phase: 'Menstruation',
    isLogged: true,
  },
];

export const initialConnectedDevices: ConnectedDevice[] = [
  {
    id: 'device-1',
    name: 'Smart Watch',
    type: 'watch',
    syncedText: 'Synced · 2m ago',
    lastSyncedTimestamp: Date.now() - 120000,
  },
  {
    id: 'device-2',
    name: 'Thermometer',
    type: 'thermometer',
    syncedText: 'Synced · 2m ago',
    lastSyncedTimestamp: Date.now() - 120000,
  },
  {
    id: 'device-3',
    name: 'Scale',
    type: 'scale',
    syncedText: 'Synced · 2m ago',
    lastSyncedTimestamp: Date.now() - 120000,
  },
];

export const defaultDailyLogState: DailyLogState = {
  dateStr: '2026-06-21',
  formattedDate: 'Today, 21 June 2026',
  cycleDay: 1,
  phase: 'Menstruation',
  bloodFlow: 'Medium',
  crampsScore: 4,
  crampsSeverity: 'Mild',
  productsUsed: {
    pads: 3,
    tampons: 0,
    menstrualCup: 0,
  },
  bloodColor: 'Bright Red',
  clotsPresent: false,
  medicationActive: true,
  medicationName: 'Ibuprofen 400mg',
  aiInsight: {
    title: 'Day 2 of your period',
    description:
      'Moderate flow with mild cramps is completely normal. Stay hydrated, get iron-rich foods, and prioritise rest today.',
  },
  wellnessMetrics: {
    sleepHours: 7.2,
    mood: 'Good',
    waterCurrent: 2.1,
    waterTarget: 2.5,
    steps: 6245,
    weightKg: 58.5,
    sexActivityLogged: false,
  },
  symptoms: {
    cramps: 6,
    headache: 4,
    bloating: 5,
    fatigue: 7,
    moodSwings: 6,
    acne: 3,
    breastTenderness: 4,
    backPain: 5,
    nausea: 2,
    sleepIssues: 6,
    anxiety: 5,
    foodCravings: 7,
  },
  personalNote: '',
  insights: [
    'You are on your period day 1.',
    "It's normal to feel low energy.",
    'Stay hydrated and take rest.',
    'Light exercise like walking may help with cramps.',
  ],
};

export const symptomDefinitions: Array<{ id: SymptomItem['id']; name: string; emoji: string }> = [
  { id: 'cramps', name: 'Cramps', emoji: '🌸' },
  { id: 'headache', name: 'Headache', emoji: '💫' },
  { id: 'bloating', name: 'Bloating', emoji: '🌊' },
  { id: 'fatigue', name: 'Fatigue', emoji: '😴' },
  { id: 'moodSwings', name: 'Mood Swings', emoji: '🌀' },
  { id: 'acne', name: 'Acne', emoji: '✨' },
  { id: 'breastTenderness', name: 'Breast Tenderness', emoji: '🌷' },
  { id: 'backPain', name: 'Back Pain', emoji: '🌿' },
  { id: 'nausea', name: 'Nausea', emoji: '🍃' },
  { id: 'sleepIssues', name: 'Sleep Issues', emoji: '🌙' },
  { id: 'anxiety', name: 'Anxiety', emoji: '🕊' },
  { id: 'foodCravings', name: 'Food Cravings', emoji: '🍫' },
];

export const symptomTrendMockData = [
  { day: 'Jun 15', cramps: 1, fatigue: 3, bloating: 2, moodSwings: 2, headache: 1 },
  { day: 'Jun 16', cramps: 2, fatigue: 4, bloating: 3, moodSwings: 3, headache: 2 },
  { day: 'Jun 17', cramps: 3, fatigue: 5, bloating: 4, moodSwings: 5, headache: 3 },
  { day: 'Jun 18', cramps: 4, fatigue: 6, bloating: 5, moodSwings: 6, headache: 3 },
  { day: 'Jun 19', cramps: 5, fatigue: 6, bloating: 5, moodSwings: 6, headache: 4 },
  { day: 'Jun 20', cramps: 6, fatigue: 7, bloating: 6, moodSwings: 7, headache: 4 },
  { day: 'Jun 21', cramps: 6, fatigue: 7, bloating: 5, moodSwings: 6, headache: 4 },
];
