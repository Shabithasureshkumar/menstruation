import React from 'react';
import { Pencil, Moon, Smile, Droplets, Footprints, Scale, Heart } from 'lucide-react';
import type { WellnessMetricsData } from '../../types/dailyLog';
import { WellnessMetricCard } from './WellnessMetricCard';

interface WellnessMetricsProps {
  metrics: WellnessMetricsData;
  formattedSubtext: string;
  onOpenEditModal: () => void;
}

export const WellnessMetrics: React.FC<WellnessMetricsProps> = ({
  metrics,
  formattedSubtext,
  onOpenEditModal,
}) => {
  return (
    <div className="w-full bg-white rounded-[clamp(1rem,1.5vw,1.25rem)] p-[clamp(1rem,1.5vw,1.25rem)] border border-gray-100 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2 className="text-[1.05rem] font-bold text-[#1F2937] tracking-tight">
            Wellness Metrics
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
            {formattedSubtext}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenEditModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9D5FF] bg-white hover:bg-purple-50/60 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-purple-400 group cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5 text-[#F475C1] group-hover:text-[#FF24AF] transition-colors" />
          <span className="text-xs sm:text-sm font-medium bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent">
            Edit Log
          </span>
        </button>
      </div>

      {/* Grid of 6 cards */}
      <div
        className="grid gap-2.5 sm:gap-3"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr))',
        }}
      >
        {/* 1. Sleep */}
        <WellnessMetricCard
          label="Sleep"
          value={`${metrics.sleepHours} hrs`}
          iconBgColor="bg-[#FAF5FF]"
          onClick={onOpenEditModal}
          iconSvg={<Moon className="w-4 h-4 text-purple-500 fill-purple-100" />}
        />

        {/* 2. Mood */}
        <WellnessMetricCard
          label="Mood"
          value={metrics.mood}
          iconBgColor="bg-[#FFF7ED]"
          onClick={onOpenEditModal}
          iconSvg={<Smile className="w-4 h-4 text-amber-500" />}
        />

        {/* 3. Water */}
        <WellnessMetricCard
          label="Water"
          value={`${metrics.waterCurrent} / ${metrics.waterTarget} L`}
          iconBgColor="bg-[#EFF6FF]"
          onClick={onOpenEditModal}
          iconSvg={<Droplets className="w-4 h-4 text-blue-500 fill-blue-100" />}
        />

        {/* 4. Steps */}
        <WellnessMetricCard
          label="Steps"
          value={metrics.steps.toLocaleString()}
          iconBgColor="bg-[#F0FDF4]"
          onClick={onOpenEditModal}
          iconSvg={<Footprints className="w-4 h-4 text-emerald-500" />}
        />

        {/* 5. Weight */}
        <WellnessMetricCard
          label="Weight"
          value={`${metrics.weightKg} kg`}
          iconBgColor="bg-[#FAF5FF]"
          onClick={onOpenEditModal}
          iconSvg={<Scale className="w-4 h-4 text-pink-500" />}
        />

        {/* 6. Sex Activity */}
        <WellnessMetricCard
          label="Sex Activity"
          value={metrics.sexActivityLogged ? 'Logged' : 'Not Logged'}
          iconBgColor="bg-[#FEF2F2]"
          onClick={onOpenEditModal}
          iconSvg={<Heart className={`w-4 h-4 ${metrics.sexActivityLogged ? 'text-red-500 fill-red-400' : 'text-red-400'}`} />}
        />
      </div>
    </div>
  );
};
