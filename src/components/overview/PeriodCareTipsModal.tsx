import React from 'react';
import { Activity, AlertCircle, Apple, Droplets, Flame, Heart, Moon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Modal } from '../common/Modal';
import { buttonClass } from '../common/buttonStyles';
import { PERIOD_CARE_TIPS } from '../../data/phaseContent';

const ICONS: Record<(typeof PERIOD_CARE_TIPS)[number]['icon'], { node: ReactNode; bg: string }> = {
  moon: { node: <Moon className="w-4 h-4 text-[#8B5CF6]" />, bg: 'bg-[#F5F3FF]' },
  droplets: { node: <Droplets className="w-4 h-4 text-[#0284C7]" />, bg: 'bg-[#F0F9FF]' },
  apple: { node: <Apple className="w-4 h-4 text-[#16A34A]" />, bg: 'bg-[#F0FDF4]' },
  flame: { node: <Flame className="w-4 h-4 text-[#EA580C]" />, bg: 'bg-[#FFF7ED]' },
  activity: { node: <Activity className="w-4 h-4 text-[#F43F8F]" />, bg: 'bg-[#FFF0F6]' },
  alert: { node: <AlertCircle className="w-4 h-4 text-[#E11D48]" />, bg: 'bg-[#FFF1F2]' },
};

export const PeriodCareTipsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="lg"
    icon={<Heart className="w-5 h-5" />}
    title="Period Care Tips"
    description="Simple ways to feel more comfortable during your period."
    footer={
      <button type="button" onClick={onClose} className={`${buttonClass.primary} w-full sm:w-auto`}>
        Got it
      </button>
    }
  >
    <ul className="space-y-2.5">
      {PERIOD_CARE_TIPS.map((tip) => (
        <li key={tip.title} className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFCFE] border border-[#F5E2EC] flex items-start gap-3">
          <div className={`w-8 h-8 rounded-xl ${ICONS[tip.icon].bg} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`} aria-hidden="true">
            {ICONS[tip.icon].node}
          </div>
          <div className="space-y-0.5 min-w-0 flex-1">
            <h3 className="text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider text-[#17152B]">{tip.title}</h3>
            <p className="text-xs sm:text-[0.8rem] text-[#55607A] font-medium leading-relaxed">{tip.desc}</p>
          </div>
        </li>
      ))}
    </ul>
    <p className="mt-3 text-[0.7rem] text-[#68708A]">General wellness information, not medical advice.</p>
  </Modal>
);
