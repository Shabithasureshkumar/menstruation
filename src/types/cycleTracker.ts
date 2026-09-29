export type TopNavTab = 'dashboard' | 'appointment' | 'patient' | 'reports' | 'chats' | 'billing';

export type SubNavTab = 'overview' | 'calendar' | 'dailyLog' | 'insights' | 'settings';

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  description: string;
  visualType: 'period-tracker-woman' | 'cramps' | 'clot' | 'symptoms' | 'next-period' | 'ai-prediction';
  /** Where the card leads when activated (announced to screen readers). */
  actionLabel?: string;
  /** 'eyebrow' renders the label as small uppercase text without an icon. */
  labelStyle?: 'default' | 'eyebrow';
}

export interface WellnessCardData {
  id: string;
  title: string;
  iconType: 'nutrition' | 'exercise' | 'wellness';
  items: string[];
  themeColor: 'pink' | 'cyan' | 'green';
}
