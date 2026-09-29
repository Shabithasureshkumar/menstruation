import React from 'react';
import { Sparkles } from 'lucide-react';
import type { CyclePhase } from '../../types/cycle';

export const DailyLogAiInsightBanner: React.FC<{ phase: CyclePhase | null }> = () => {
  return (
    <aside
      aria-label="AI Insight"
      className="w-full bg-[#FFF0F6] border border-[#F1DDE8]/80 rounded-[22px] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 shadow-2xs text-left"
    >
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F43F8F] text-white flex items-center justify-center shadow-xs shrink-0" aria-hidden="true">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 min-w-0">
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#68708A] block">AI INSIGHT</span>
          <h3 className="text-sm sm:text-base font-bold text-[#17152B] tracking-tight leading-tight">Day 2 of your period</h3>
        </div>
      </div>
      <div className="flex-1 min-w-0 border-t md:border-t-0 md:border-l border-pink-200/80 pt-2 md:pt-0 md:pl-6">
        <p className="text-xs sm:text-[0.84rem] text-[#4A5568] font-medium leading-relaxed">
          Moderate flow with mild cramps is completely normal. Stay hydrated, get iron-rich foods, and prioritize rest today.
        </p>
      </div>
    </aside>
  );
};

