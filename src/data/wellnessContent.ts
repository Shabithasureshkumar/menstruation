import type { WellnessCardData } from '../types/cycleTracker';

/** General wellness tips (static educational content, not patient data). */
export const wellnessCardsData: WellnessCardData[] = [
  {
    id: 'well-1',
    title: 'Nutrition Tips',
    iconType: 'nutrition',
    themeColor: 'pink',
    items: [
      'Include iron-rich foods',
      'Eat fresh fruits and vegetables',
      'Stay hydrated',
      'Consider foods rich in omega-3',
    ],
  },
  {
    id: 'well-2',
    title: 'Exercise Suggestions',
    iconType: 'exercise',
    themeColor: 'cyan',
    items: [
      'Try light to moderate activities',
      'Walking or gentle yoga',
      'Stretching can help reduce cramps',
      'Listen to your body on low-energy days',
    ],
  },
  {
    id: 'well-3',
    title: 'General Wellness',
    iconType: 'wellness',
    themeColor: 'green',
    items: [
      'Get enough rest and sleep',
      'Use a heating pad for cramps',
      'Manage stress with relaxation techniques',
      'Take time for self-care',
    ],
  },
];
