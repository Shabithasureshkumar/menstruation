import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SymptomKey } from '../../types/dailyLog';
import { SymptomSlider } from './SymptomSlider';

interface SymptomsTrackingProps {
  symptoms: Record<SymptomKey, number>;
  onUpdateSymptom: (key: SymptomKey, val: number) => void;
  onViewTrends: () => void;
}

export const SymptomsTracking: React.FC<SymptomsTrackingProps> = ({
  symptoms,
  onUpdateSymptom,
  onViewTrends,
}) => {
  const [symptomDateLabel, setSymptomDateLabel] = useState('Today, Jun 12');

  const shiftSymptomDate = (dir: 'prev' | 'next') => {
    setSymptomDateLabel(dir === 'prev' ? 'Yesterday, Jun 11' : 'Tomorrow, Jun 13');
  };

  const symptomRows: Array<[
    { id: SymptomKey; name: string; emoji: string },
    { id: SymptomKey; name: string; emoji: string }
  ]> = [
    [
      { id: 'cramps', name: 'Cramps', emoji: '🌸' },
      { id: 'headache', name: 'Headache', emoji: '💫' },
    ],
    [
      { id: 'bloating', name: 'Bloating', emoji: '🌊' },
      { id: 'fatigue', name: 'Fatigue', emoji: '😴' },
    ],
    [
      { id: 'moodSwings', name: 'Mood Swings', emoji: '🌀' },
      { id: 'acne', name: 'Acne', emoji: '✨' },
    ],
    [
      { id: 'breastTenderness', name: 'Breast Tenderness', emoji: '🌷' },
      { id: 'backPain', name: 'Back Pain', emoji: '🌿' },
    ],
    [
      { id: 'nausea', name: 'Nausea', emoji: '🍃' },
      { id: 'sleepIssues', name: 'Sleep Issues', emoji: '🌙' },
    ],
    [
      { id: 'anxiety', name: 'Anxiety', emoji: '🕊' },
      { id: 'foodCravings', name: 'Food Cravings', emoji: '🍫' },
    ],
  ];

  return (
    <section className="w-full bg-white rounded-[clamp(1rem,1.5vw,1.3rem)] p-[clamp(1rem,1.5vw,1.25rem)] shadow-sm border border-gray-100 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-50 flex-wrap">
        <h2 className="text-[0.95rem] sm:text-base font-bold text-[#181322] tracking-tight">
          Symptoms Tracking <span className="text-xs sm:text-sm font-medium text-[#666072]">(0–10 Scale)</span>
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#666072] font-medium">{symptomDateLabel}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => shiftSymptomDate('prev')}
              aria-label="Previous day symptoms"
              className="w-6 h-6 rounded-full bg-[#F8F3F9] hover:bg-purple-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => shiftSymptomDate('next')}
              aria-label="Next day symptoms"
              className="w-6 h-6 rounded-full bg-[#F8F3F9] hover:bg-purple-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Symptom Sliders Grid */}
      <div className="pt-3 space-y-2">
        {symptomRows.map(([sym1, sym2]) => (
          <div
            key={`${sym1.id}-${sym2.id}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 items-center"
          >
            <SymptomSlider
              id={sym1.id}
              name={sym1.name}
              emoji={sym1.emoji}
              value={symptoms[sym1.id]}
              onChange={onUpdateSymptom}
            />
            <SymptomSlider
              id={sym2.id}
              name={sym2.name}
              emoji={sym2.emoji}
              value={symptoms[sym2.id]}
              onChange={onUpdateSymptom}
            />
          </div>
        ))}
      </div>

      {/* View Trends Button */}
      <div className="pt-4 mt-2 flex justify-center">
        <button
          type="button"
          onClick={onViewTrends}
          className="px-4 py-1.5 rounded-full border border-[#E942A2] hover:bg-pink-50/70 text-xs font-semibold text-[#D7068E] transition-all flex items-center justify-center gap-1 shadow-2xs focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
        >
          View Symptom Trends →
        </button>
      </div>
    </section>
  );
};
