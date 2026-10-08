import React from 'react';
import assistantImg from '../../assets/ai-assistant.webp';
import { PHASE_CONTENT } from '../../data/phaseContent';
import type { CyclePhase } from '../../types/cycle';

interface AIRecommendationCardProps {
  phase: CyclePhase | null;
  isPeriodLogged?: boolean;
  onAskAssistant: () => void;
}

/** Phase-based general guidance (static content), with an entry point to the demo assistant. */
export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  phase,
  isPeriodLogged = false,
  onAskAssistant,
}) => {
  const content = phase ? PHASE_CONTENT[phase] : null;

  return (
    <section
      aria-labelledby="phase-guidance-title"
      className="w-full rounded-[22px] border border-[#F4EAF3] p-3 sm:p-4 shadow-[0_8px_28px_rgba(23,21,43,0.045)] text-left"
      style={{ background: 'linear-gradient(100deg, #FFFFFF 0%, #FFF8FC 55%, #FBF5FF 100%)' }}
    >
      <div className="flex items-center justify-between gap-3 px-1 -my-0.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-full bg-[#FDE8F3] flex items-center justify-center shrink-0 overflow-hidden" aria-hidden="true">
            <img src={assistantImg} alt="" width={30} height={30} loading="lazy" className="w-[30px] h-[30px] object-contain" />
          </span>
          <h2 id="phase-guidance-title" className="text-sm sm:text-[15px] font-bold text-[#17152B] tracking-tight">
            AI Recommendation
          </h2>
        </div>
        <button type="button" onClick={onAskAssistant} className="group min-h-[44px] inline-flex items-center shrink-0 cursor-pointer">
          <span className="px-4 py-1.5 rounded-full bg-[#F4E3FF] group-hover:bg-[#EBD3FF] text-[#8B5CF6] text-xs sm:text-[13px] font-bold transition-colors">
            Ask Ava
          </span>
        </button>
      </div>

      <div
        className="mt-2.5 rounded-[18px] p-3 sm:px-4 sm:py-3.5 flex items-center gap-3 sm:gap-5"
        style={{ background: 'linear-gradient(100deg, #FDEAF6 0%, #F9EDFB 50%, #F2E8FF 100%)' }}
      >
        <img src={assistantImg} alt="" width={76} height={76} loading="lazy" className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0 select-none" />
        <div className="min-w-0 flex-1">
          {!isPeriodLogged ? (
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm font-bold text-[#17152B] tracking-tight">
                Start tracking to receive personalized recommendations.
              </p>
              <p className="text-xs sm:text-[13px] text-[#68708A] font-medium leading-relaxed">
                Log your period and daily details to get tailored insights, health tips and suggestions based on your cycle.
              </p>
              <ul className="mt-2 flex items-center gap-2 flex-wrap" aria-label="Suggestions">
                <li className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE2FF] text-xs font-medium text-[#6D4AD8]">
                  <span>Hydrate</span>
                  <span aria-hidden="true">💧</span>
                </li>
                <li className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE2FF] text-xs font-medium text-[#6D4AD8]">
                  <span>Gentle walk</span>
                  <span aria-hidden="true">🚶‍♀️</span>
                </li>
                <li className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE2FF] text-xs font-medium text-[#6D4AD8]">
                  <span>Sleep 8h</span>
                  <span aria-hidden="true">😴</span>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                {content ? content.guidance : 'Add your cycle details in Settings to get phase-based guidance.'}{' '}
                <span className="text-[#8A92A6]">General wellness information, not medical advice.</span>
              </p>
              {content && (
                <ul className="mt-2 flex items-center gap-2 flex-wrap" aria-label="Suggestions">
                  {content.chips.map((chip) => (
                    <li key={chip.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE2FF] text-xs font-medium text-[#6D4AD8]">
                      <span>{chip.label}</span>
                      <span aria-hidden="true">{chip.emoji}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

