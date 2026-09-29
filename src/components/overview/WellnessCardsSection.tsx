import React from 'react';
import { Apple, Check, Dumbbell, Leaf } from 'lucide-react';
import type { WellnessCardData } from '../../types/cycleTracker';
import { surface } from '../common/surface';

const ICONS: Record<WellnessCardData['iconType'], React.ReactNode> = {
  nutrition: <Apple className="w-[18px] h-[18px] text-[#F43F8F]" aria-hidden="true" />,
  exercise: <Dumbbell className="w-[18px] h-[18px] text-[#3B82F6]" aria-hidden="true" />,
  wellness: <Leaf className="w-[18px] h-[18px] text-[#16A34A]" aria-hidden="true" />,
};

const CHECK_COLOR: Record<WellnessCardData['themeColor'], string> = {
  pink: 'text-[#F43F8F]',
  cyan: 'text-[#3B82F6]',
  green: 'text-[#16A34A]',
};

export const WellnessCardsSection: React.FC<{ cards: WellnessCardData[] }> = ({ cards }) => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
    {cards.map((card) => (
      <section key={card.id} aria-labelledby={`${card.id}-title`} className={`${surface.card} p-5 sm:p-6`}>
        <div className="flex items-center gap-2.5">
          {ICONS[card.iconType]}
          <h2 id={`${card.id}-title`} className="text-[15px] font-semibold text-[#17152B] tracking-tight">
            {card.title}
          </h2>
        </div>
        <ul className="mt-4 space-y-3">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[13px] sm:text-sm text-[#4B5563] leading-snug">
              <Check className={`w-4 h-4 ${CHECK_COLOR[card.themeColor]} shrink-0 mt-0.5`} strokeWidth={2.4} aria-hidden="true" />
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);
