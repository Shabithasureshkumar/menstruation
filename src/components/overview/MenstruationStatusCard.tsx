import React, { useId } from 'react';
import { Sparkles } from 'lucide-react';
import type { CycleSummary } from '../../types/cycle';
import { surface } from '../common/surface';

interface MenstruationStatusCardProps {
  summary: CycleSummary | null;
  onOpenAssistant: () => void;
}

const SIZE = 116;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Four arcs with gaps, as in the reference ring. */
const SEGMENTS = 4;
const GAP = 14;
const SEGMENT = CIRCUMFERENCE / SEGMENTS - GAP;

export const MenstruationStatusCard: React.FC<MenstruationStatusCardProps> = ({ summary, onOpenAssistant }) => {
  const maskId = useId();
  const progress = summary ? summary.currentCycleDay / summary.cycleLength : 0;

  return (
    <section
      aria-label="Cycle status"
      className={`${surface.card} w-full p-5 flex flex-col min-[400px]:flex-row items-center gap-5 sm:gap-6 min-h-[160px]`}
    >
      <div className="relative w-[116px] h-[116px] shrink-0">
        <svg
          className="w-full h-full -rotate-[55deg]"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={summary ? `Cycle day ${summary.currentCycleDay} of ${summary.cycleLength}` : 'Cycle day unknown'}
        >
          <defs>
            {/* Reveals the red segments only up to the current cycle progress. */}
            <mask id={maskId}>
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="white"
                strokeWidth={STROKE + 2}
                fill="none"
                strokeDasharray={`${CIRCUMFERENCE * progress} ${CIRCUMFERENCE}`}
              />
            </mask>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#FBE4E6"
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${SEGMENT} ${GAP}`}
          />
          {summary && (
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#E0474C"
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${SEGMENT} ${GAP}`}
              mask={`url(#${maskId})`}
            />
          )}
        </svg>
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span className="text-[26px] font-bold text-[#17152B] leading-none">{summary ? summary.currentCycleDay : '12'}</span>
          <span className="text-[9px] font-bold text-[#68708A] tracking-[0.12em] uppercase mt-1.5">Cycle Day</span>
        </div>
      </div>

      <div className="min-w-0 flex-1 w-full min-[400px]:w-auto text-center min-[400px]:text-left">
        <span className="text-[11px] font-semibold text-[#8A92A6] tracking-[0.14em] uppercase block">Status</span>
        <h2 className="mt-1 text-[17px] font-bold text-[#17152B] tracking-tight leading-snug">
          {summary ? (summary.currentPhase === 'Fertile Window' ? 'Fertile Window' : `${summary.currentPhase} Phase`) : 'Menstruation Phase'}
        </h2>
        <p className="mt-0.5 text-[15px] font-bold text-[#E0474C] leading-snug">
          Healthy
        </p>
        <button type="button" onClick={onOpenAssistant} className="group mt-1.5 min-h-[36px] inline-flex items-center cursor-pointer">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9EC] group-hover:bg-[#FFDCE2] text-[#E1405F] text-[11px] font-bold transition-colors shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" aria-hidden="true" />
            AI Summary Ready
          </span>
        </button>
      </div>
    </section>
  );
};
