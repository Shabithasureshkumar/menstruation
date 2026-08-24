export type BloodFlow = 'Light' | 'Medium' | 'Heavy' | 'Spotting';

export type CrampSeverity = 'None' | 'Mild' | 'Moderate' | 'Severe';

export type BloodColor = 'Bright Red' | 'Dark Red' | 'Brown' | 'Pink';

export interface ProductsUsed {
  pads: number;
  tampons: number;
  menstrualCup: number;
}

export type MoodType = 'Great' | 'Good' | 'Neutral' | 'Low' | 'Tired' | 'Anxious';

export interface WellnessMetricsData {
  sleepHours: number;
  mood: MoodType;
  waterCurrent: number;
  waterTarget: number;
  steps: number;
  weightKg: number;
  sexActivityLogged: boolean;
  sexActivityNote?: string;
}

export type SymptomKey =
  | 'cramps'
  | 'headache'
  | 'bloating'
  | 'fatigue'
  | 'moodSwings'
  | 'acne'
  | 'breastTenderness'
  | 'backPain'
  | 'nausea'
  | 'sleepIssues'
  | 'anxiety'
  | 'foodCravings';

export interface SymptomItem {
  id: SymptomKey;
  name: string;
  emoji: string;
  value: number; // 0 - 10
}

export type CyclePhase =
  | 'Menstruation'
  | 'Fertile Window'
  | 'Ovulation'
  | 'Luteal Phase'
  | 'Follicular';

export interface CalendarDay {
  dateStr: string; // ISO YYYY-MM-DD
  dayNumber: number;
  monthName: string;
  cycleDay: number;
  phase: CyclePhase;
  isLogged: boolean;
  isToday?: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'watch' | 'thermometer' | 'scale';
  syncedText: string;
  lastSyncedTimestamp: number;
  isSyncing?: boolean;
}

export interface PatientProfileData {
  name: string;
  gender: string;
  age: number;
  avatarUrl: string;
}

export interface CycleSummaryData {
  currentPhase: string;
  ovulationPredictedDate: string;
  fertileWindowRange: string;
  lutealPhaseRange: string;
}

export interface DailyLogState {
  dateStr: string;
  formattedDate: string;
  cycleDay: number;
  phase: CyclePhase;
  bloodFlow: BloodFlow;
  crampsScore: number;
  crampsSeverity: CrampSeverity;
  productsUsed: ProductsUsed;
  bloodColor: BloodColor;
  clotsPresent: boolean;
  medicationActive: boolean;
  medicationName: string;
  aiInsight: {
    title: string;
    description: string;
  };
  wellnessMetrics: WellnessMetricsData;
  symptoms: Record<SymptomKey, number>;
  personalNote: string;
  insights: string[];
}

export type QuickLogType = 'flow' | 'symptoms' | 'mood' | 'weight' | 'sleep' | 'water';
