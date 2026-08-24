import React from 'react';
import { Droplet, Calendar, Sparkles, Moon } from 'lucide-react';
import type { CycleSummaryData } from '../../types/dailyLog';

interface CycleSummaryProps {
  summary: CycleSummaryData;
}

export const CycleSummary: React.FC<CycleSummaryProps> = ({ summary }) => {
  return (
    <div className="w-full space-y-2.5">
      <h3 className="text-[0.98rem] font-bold text-[#1F2937] tracking-tight">
        Cycle Summary
      </h3>

      <div className="space-y-2">
        {/* Current Phase */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#EF4444] shrink-0">
            <Droplet className="w-4 h-4 fill-[#EF4444]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-[#6B7280] block truncate">Current Phase</span>
            <span className="text-sm font-bold text-[#EF4444] block truncate">
              {summary.currentPhase}
            </span>
          </div>
        </div>

        {/* Ovulation */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6] shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#22C55E] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-[#6B7280] block truncate">Ovulation</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-[#374151]">Predicted on</span>
              <span className="text-xs text-[#6B7280]">{summary.ovulationPredictedDate}</span>
            </div>
          </div>
        </div>

        {/* Fertile Window */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6] shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#3B82F6] shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-[#6B7280] block truncate">Fertile Window</span>
            <span className="text-xs sm:text-sm font-semibold text-[#374151] block truncate">
              {summary.fertileWindowRange}
            </span>
          </div>
        </div>

        {/* Luteal Phase */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6] shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#A855F7] shrink-0">
            <Moon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-[#6B7280] block truncate">Luteal Phase</span>
            <span className="text-xs sm:text-sm font-semibold text-[#374151] block truncate">
              {summary.lutealPhaseRange}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
