import React from 'react';
import { ChevronRight, Pill, Smile, Sparkles, Zap } from 'lucide-react';
import type { EnergyLevel, MoodType } from '../../types/dailyLog';
import type { CyclePhase } from '../../types/cycle';
import { PHASE_CONTENT } from '../../data/phaseContent';
import { surface } from '../common/surface';
import { Visual3DInsightsBannerChart } from './VisualAssets3D';

interface CycleInsightsSectionProps {
  energy: EnergyLevel | null;
  mood: MoodType | null;
  phase: CyclePhase | null;
  isPeriodLogged?: boolean;
  onLogPeriod?: () => void;
}

const SEGMENT_COUNT = 10;
const ENERGY_SEGMENTS: Record<EnergyLevel, number> = { Low: 3, Medium: 6, High: 9 };
const MOOD_SEGMENTS: Record<MoodType, number> = { Happy: 9, Calm: 8, Neutral: 6, Irritable: 4, Sad: 3 };

const ENERGY_TEXT: Record<EnergyLevel, string> = {
  Low: "It's normal to feel lower energy during your period.",
  Medium: 'Balanced energy today. Keep hydrated and steady.',
  High: 'Great energy today! Enjoy it, and keep hydrated.',
};

const MOOD_TEXT: Record<MoodType, string> = {
  Happy: 'Positive, bright mood logged today.',
  Calm: 'Feeling relaxed, peaceful and grounded.',
  Neutral: 'Balanced, steady emotional baseline today.',
  Irritable: 'You may feel more emotional today. Be gentle with yourself.',
  Sad: 'Take extra rest and give yourself comforting self-care.',
};

/** Short dashes, as in the reference meter. The value is also given as text for assistive tech. */
const DashMeter: React.FC<{ filled: number; label: string }> = ({ filled, label }) => (
  <div className="flex items-center gap-1.5 mt-3" role="img" aria-label={label}>
    {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
      <span key={i} className={`h-[5px] w-4 rounded-full ${i < filled ? 'bg-[#F43F8F]' : 'bg-[#FDE4EE]'}`} />
    ))}
  </div>
);

const CardHeader: React.FC<{ icon: React.ReactNode; iconClass: string; title: string }> = ({ icon, iconClass, title }) => (
  <div className="flex items-center gap-3">
    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconClass}`} aria-hidden="true">
      {icon}
    </div>
    <h3 className="text-sm sm:text-[15px] font-medium text-[#17152B] tracking-tight">{title}</h3>
  </div>
);

export const CycleInsightsSection: React.FC<CycleInsightsSectionProps> = ({
  energy,
  mood,
  phase,
  isPeriodLogged = false,
  onLogPeriod,
}) => {
  const content = phase ? PHASE_CONTENT[phase] : null;

  return (
    <section aria-labelledby="cycle-insights-title" className={`${surface.card} w-full p-4 sm:p-5 text-left`}>
      <h2 id="cycle-insights-title" className="text-sm sm:text-[15px] font-bold text-[#17152B] tracking-tight">
        Cycle Insights
      </h2>
      <p className="text-xs sm:text-[13px] text-[#68708A] mt-1">Based on your logged data and current cycle phase.</p>

      {!isPeriodLogged ? (
        <div
          className="mt-4 rounded-[24px] border border-[#F3DEEB] p-5 sm:p-6 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 relative"
          style={{ background: 'linear-gradient(105deg, #FFF5F9 0%, #FDF2F8 50%, #FAF5FF 100%)' }}
        >
          <div className="flex-1 min-w-0 space-y-2.5 z-10">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shadow-2xs" aria-hidden="true">
              <Pill className="w-5 h-5 -rotate-45" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#17152B] tracking-tight">
              Insights will appear after you start logging
            </h3>

            <p className="text-xs sm:text-sm text-[#68708A] font-medium leading-relaxed max-w-lg">
              Log your period, symptoms and daily details to see personalized insights about your cycle, mood, energy and hormonal changes.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLogPeriod}
                className="px-6 py-2.5 rounded-full bg-[#F43F8F] hover:bg-[#E02874] text-white text-xs sm:text-sm font-bold shadow-[0_6px_18px_rgba(244,63,143,0.3)] hover:shadow-[0_8px_22px_rgba(244,63,143,0.4)] transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Log period</span>
                <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center relative select-none">
            <Visual3DInsightsBannerChart />
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`${surface.inner} p-4 sm:p-5 min-h-[168px]`}>
            <CardHeader icon={<Zap className="w-[18px] h-[18px]" />} iconClass="bg-[#FFF3DC] text-[#F59E0B]" title="Energy Level" />
            <p className="mt-4 text-lg sm:text-[19px] font-semibold text-[#17152B] tracking-tight">{energy ?? 'Low'}</p>
            <DashMeter filled={energy ? ENERGY_SEGMENTS[energy] : 2} label={`Energy ${energy ?? 'Low'}`} />
            <p className="mt-3 text-xs sm:text-[13px] text-[#6B7280] leading-relaxed">
              {energy ? ENERGY_TEXT[energy] : "It's normal to feel lower energy during your period."}
            </p>
          </div>

          <div className={`${surface.inner} p-4 sm:p-5 min-h-[168px]`}>
            <CardHeader icon={<Smile className="w-[18px] h-[18px]" />} iconClass="bg-[#DDF7E8] text-[#16A34A]" title="Mood" />
            <p className="mt-4 text-lg sm:text-[19px] font-semibold text-[#17152B] tracking-tight">{mood ?? 'Sensitive'}</p>
            <DashMeter filled={mood ? MOOD_SEGMENTS[mood] : 2} label={`Mood ${mood ?? 'Sensitive'}`} />
            <p className="mt-3 text-xs sm:text-[13px] text-[#6B7280] leading-relaxed">
              {mood ? MOOD_TEXT[mood] : 'You may feel more emotional today. Be gentle with yourself.'}
            </p>
          </div>

          <div className={`${surface.inner} p-4 sm:p-5 min-h-[168px] md:col-span-2 lg:col-span-1`}>
            <CardHeader icon={<Sparkles className="w-[18px] h-[18px]" />} iconClass="bg-[#F1EAFE] text-[#8B5CF6]" title="Hormonal Changes" />
            <p className="mt-4 text-xs sm:text-[13px] text-[#6B7280] leading-relaxed">
              {content ? content.hormones : 'Estrogen and progesterone are at the lowest levels during menstruation.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

