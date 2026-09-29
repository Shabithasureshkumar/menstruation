import type { CyclePhase } from '../types/cycle';

/**
 * General educational copy per phase. This is static content (like a CMS
 * entry), not an assessment of the patient.
 */
export interface PhaseContent {
  heroTitle: string;
  heroBody: string;
  guidance: string;
  hormones: string;
  hormonesTip: string;
  chips: { label: string; emoji: string }[];
}

export const PHASE_CONTENT: Record<CyclePhase, PhaseContent> = {
  Menstruation: {
    heroTitle: "You're likely on your period",
    heroBody: 'The uterine lining is shedding. Lower energy is common — rest, stay hydrated, and be kind to yourself.',
    guidance: 'Prioritise rest, hydration and iron-rich meals. Gentle stretching or walking may ease cramps.',
    hormones: 'Estrogen and progesterone are typically at their lowest during menstruation.',
    hormonesTip: 'Warm drinks and mineral-rich foods can feel comforting.',
    chips: [
      { label: 'Hydrate', emoji: '💧' },
      { label: 'Gentle walk', emoji: '🚶' },
      { label: 'Rest', emoji: '😴' },
    ],
  },
  Follicular: {
    heroTitle: 'Follicular phase',
    heroBody: 'After your period, estrogen typically rises. Many people notice energy and mood improving.',
    guidance: 'A good time to build activity back up and plan balanced, protein-rich meals.',
    hormones: 'Estrogen typically rises as follicles in the ovaries mature.',
    hormonesTip: 'Fresh vegetables, whole grains and lean protein support this phase.',
    chips: [
      { label: 'Stay active', emoji: '🏃' },
      { label: 'Balanced meals', emoji: '🥗' },
      { label: 'Sleep well', emoji: '😴' },
    ],
  },
  'Fertile Window': {
    heroTitle: 'Fertile window (estimate)',
    heroBody: 'The days leading up to ovulation are when pregnancy is most likely. This is an estimate from your settings.',
    guidance: 'If you are trying to conceive or preventing pregnancy, remember these dates are estimates, not a guarantee.',
    hormones: 'Estrogen typically peaks and luteinising hormone (LH) surges before ovulation.',
    hormonesTip: 'Cervical mucus and LH tests can help confirm this window.',
    chips: [
      { label: 'Track mucus', emoji: '💧' },
      { label: 'LH test', emoji: '🧪' },
      { label: 'Hydrate', emoji: '🥤' },
    ],
  },
  Ovulation: {
    heroTitle: 'Estimated ovulation day',
    heroBody: 'An egg is typically released around this day. Timing varies from cycle to cycle.',
    guidance: 'Basal body temperature usually rises slightly after ovulation — logging BBT helps confirm it.',
    hormones: 'An LH surge typically triggers ovulation; progesterone begins to rise afterwards.',
    hormonesTip: 'Logging BBT daily makes the post-ovulation rise easier to spot.',
    chips: [
      { label: 'Log BBT', emoji: '🌡️' },
      { label: 'LH test', emoji: '🧪' },
      { label: 'Hydrate', emoji: '💧' },
    ],
  },
  Luteal: {
    heroTitle: 'Luteal phase',
    heroBody: 'Progesterone rises after ovulation. Some people notice bloating, cravings or mood changes before their period.',
    guidance: 'Regular meals, magnesium-rich foods and steady sleep can help with premenstrual symptoms.',
    hormones: 'Progesterone typically rises, then both hormones fall if pregnancy does not occur.',
    hormonesTip: 'Complex carbohydrates and magnesium sources may ease cravings.',
    chips: [
      { label: 'Steady meals', emoji: '🍲' },
      { label: 'Stretching', emoji: '🧘' },
      { label: 'Sleep 8h', emoji: '😴' },
    ],
  },
};

export const PERIOD_CARE_TIPS = [
  { title: 'Rest & recovery', desc: 'Give your body extra rest when you need it. Gentle movement and enough sleep can help you feel more comfortable.', icon: 'moon' },
  { title: 'Stay hydrated', desc: 'Drink water regularly throughout the day. Warm fluids may also feel soothing during cramps.', icon: 'droplets' },
  { title: 'Nutrition', desc: 'Choose balanced meals with iron-rich foods, protein, fruits, vegetables and whole grains.', icon: 'apple' },
  { title: 'Cramp relief', desc: 'A warm heating pad or warm bath may help ease menstrual cramps.', icon: 'flame' },
  { title: 'Track your symptoms', desc: 'Log your flow, cramps, mood and other symptoms to understand your cycle patterns.', icon: 'activity' },
  { title: 'When to seek care', desc: 'If pain is severe, suddenly worse than usual, or bleeding is unusually heavy, consider contacting a healthcare professional.', icon: 'alert' },
] as const;
