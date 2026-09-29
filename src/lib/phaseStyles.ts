import type { CyclePhase } from '../types/cycle';

/**
 * One visual language for phases across Calendar, Daily Log and legends.
 * Each phase also has a distinct border/ring pattern, so meaning never relies
 * on colour alone.
 */
export interface PhaseStyle {
  label: string;
  /** Short text for tight spaces. */
  short: string;
  /** Day pastel pill (calendar / date strip). */
  pill: string;
  /** Stronger filled version for selected date. */
  selectedPill: string;
  /** Small legend / status dot. */
  dot: string;
  /** Text accent colour. */
  text: string;
  /** Plain-language description of the non-colour cue, for legends. */
  pattern: string;
}

export const PHASE_STYLES: Record<CyclePhase, PhaseStyle> = {
  Menstruation: {
    label: 'Menstruation',
    short: 'Period',
    pill: 'bg-[#FFE2EC] text-[#D81B60] font-bold',
    selectedPill: 'bg-[#E91E63] text-white font-bold shadow-md shadow-pink-300/50',
    dot: 'bg-[#F43F8F]',
    text: 'text-[#D81B60]',
    pattern: 'pink pill',
  },
  Follicular: {
    label: 'Follicular',
    short: 'Follicular',
    pill: 'bg-white text-[#17152B] hover:bg-pink-50',
    selectedPill: 'bg-[#E91E63] text-white font-bold shadow-md shadow-pink-300/50',
    dot: 'bg-white border-2 border-solid border-[#CBD5E1]',
    text: 'text-[#475569]',
    pattern: 'thin border',
  },
  'Fertile Window': {
    label: 'Fertility Window',
    short: 'Fertile',
    pill: 'bg-[#FCE7D2] text-[#9A5B28] font-bold',
    selectedPill: 'bg-[#F59E0B] text-white font-bold shadow-md shadow-amber-300/50',
    dot: 'bg-[#F59E0B]',
    text: 'text-[#9A5B28]',
    pattern: 'orange pill',
  },
  Ovulation: {
    label: 'Ovulation',
    short: 'Ovulation',
    pill: 'bg-[#22C55E] text-white font-bold shadow-md shadow-emerald-400/40',
    selectedPill: 'bg-[#16A34A] text-white font-bold shadow-md shadow-emerald-400/50',
    dot: 'bg-[#22C55E]',
    text: 'text-[#16A34A]',
    pattern: 'green pill',
  },
  Luteal: {
    label: 'Luteal Phase',
    short: 'Luteal',
    pill: 'bg-[#EDE9FE] text-[#6D4AD8] font-bold',
    selectedPill: 'bg-[#8B5CF6] text-white font-bold shadow-md shadow-purple-300/50',
    dot: 'bg-[#8B5CF6]',
    text: 'text-[#6D4AD8]',
    pattern: 'purple pill',
  },
};
