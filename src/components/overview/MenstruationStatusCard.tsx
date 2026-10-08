import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { CycleSummary } from '../../types/cycle';
import statusBg from '../../assets/menstruation-status-bg.png';

interface MenstruationStatusCardProps {
  summary: CycleSummary | null;
  onOpenAssistant: () => void;
}

const PHASES = [
  { id: 'Period', label: 'Period' },
  { id: 'Follicular', label: 'Follicular' },
  { id: 'Ovulation', label: 'Ovulation' },
  { id: 'Luteal', label: 'Luteal' },
];

export const MenstruationStatusCard: React.FC<MenstruationStatusCardProps> = ({ summary, onOpenAssistant }) => {
  const currentDay = summary?.currentCycleDay ?? 5;
  const currentPhase = summary?.currentPhase ?? 'Menstruation';
  const phaseLabel = currentPhase === 'Fertile Window' ? 'Fertile Window' : `${currentPhase} Phase`;

  return (
    <section
      aria-label="Current Cycle Status"
      className="relative w-full rounded-[28px] border border-white/60 shadow-[0_8px_32px_rgba(244,63,143,0.08)] p-5 sm:p-6 overflow-hidden flex flex-col justify-between min-h-[220px] text-left transition-all bg-[#FFF5FA]"
    >
      {/* High-Resolution Source Background Artwork */}
      <img
        src={statusBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none -z-0"
      />

      {/* Main Top Area: Cycle Ring (Left) & Status Text (Middle) */}
      <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-6 w-full">
        {/* Left: 3D Glowing Cycle Indicator Ring */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className="relative w-[130px] h-[130px] sm:w-[144px] sm:h-[144px] shrink-0">
            {/* Outer Radiant Glow Aura */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F43F8F] via-[#E879F9] to-[#8B5CF6] opacity-35 blur-xl -z-1"
              aria-hidden="true"
            />
            {/* Inner Spherical Orb Base */}
            <div
              className="absolute inset-[8px] rounded-full bg-gradient-to-br from-white/95 via-pink-50/75 to-purple-100/60 shadow-[inset_0_0_15px_rgba(244,63,143,0.12)] -z-1"
              aria-hidden="true"
            />

            <svg
              className="w-full h-full -rotate-90 select-none filter drop-shadow-[0_4px_16px_rgba(244,63,143,0.3)]"
              viewBox="0 0 140 140"
              role="img"
              aria-label={`Cycle day ${currentDay}`}
            >
              <defs>
                <linearGradient id="ringTrack3D" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FCE7F3" />
                  <stop offset="50%" stopColor="#F5E8FF" />
                  <stop offset="100%" stopColor="#EDE9FE" />
                </linearGradient>
                <linearGradient id="ringActive3D" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F43F8F" />
                  <stop offset="35%" stopColor="#EC4899" />
                  <stop offset="70%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <radialGradient id="beadGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#FFA0CA" />
                  <stop offset="75%" stopColor="#F43F8F" />
                  <stop offset="100%" stopColor="#9D174D" />
                </radialGradient>
              </defs>

              {/* Background Track 3D Ring */}
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="url(#ringTrack3D)"
                strokeWidth="11"
                fill="none"
              />

              {/* Foreground Gradient Active Progress Arc */}
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="url(#ringActive3D)"
                strokeWidth="11.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="339.3"
                strokeDashoffset="120"
              />

              {/* Glowing 3D Sphere Marker Bead */}
              <circle
                cx="70"
                cy="16"
                r="6.5"
                fill="url(#beadGrad)"
                className="filter drop-shadow-[0_0_6px_rgba(244,63,143,0.9)]"
              />
              <circle
                cx="68"
                cy="14"
                r="2"
                fill="#FFFFFF"
                fillOpacity="0.9"
              />
            </svg>

            {/* Inner Center Number, Label & Sparkling Glints */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none"
            >
              {/* Inner Starlight Glints */}
              <span className="text-[10px] text-pink-300 absolute top-7 right-8 animate-pulse-subtle">✦</span>
              <span className="text-[9px] text-purple-300 absolute bottom-8 left-8 animate-pulse-subtle">✦</span>

              <span className="text-[34px] sm:text-[38px] font-black text-[#17152B] tracking-tight leading-none">
                {currentDay}
              </span>
              <span
                style={{ fontSize: 'clamp(0.6rem, 0.65vw, 0.7rem)' }}
                className="font-bold tracking-[0.14em] text-[#17152B] uppercase mt-1"
              >
                CYCLE DAY
              </span>
            </div>
          </div>

          {/* Middle: Details & Status */}
          <div className="min-w-0 space-y-1.5">
            <span
              style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)' }}
              className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-black uppercase tracking-wider inline-flex items-center shadow-2xs"
            >
              STATUS
            </span>

            <button
              type="button"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 group text-left cursor-pointer focus:outline-none"
            >
              <h2
                style={{ fontSize: 'clamp(1.15rem, 1.4vw, 1.5rem)' }}
                className="font-black text-[#17152B] tracking-tight leading-tight group-hover:text-[#F43F8F] transition-colors"
              >
                {phaseLabel}
              </h2>
              <ChevronRight className="w-4 h-4 text-[#7C3AED] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-2 pt-0.5">
              <span className="px-3 py-0.5 rounded-full bg-[#D1FAE5] text-[#064E3B] text-[11.5px] sm:text-xs font-bold inline-flex items-center gap-1.5 border border-[#A7F3D0] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-emerald-300/60 inline-block shrink-0" aria-hidden="true" />
                <span className="text-[#17152B]">Healthy</span>
                <span aria-hidden="true" className="text-emerald-700">🌿</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right spacing to allow the background droplet and botanical artwork to breathe */}
        <div className="hidden sm:block w-36 md:w-44 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Bottom: Horizontal Phase Timeline */}
      <div className="relative z-10 pt-4 mt-2 border-t border-pink-200/50">
        <div className="relative w-full">
          {/* Timeline Continuous Gradient Connecting Bar Track */}
          <div
            className="absolute top-2 left-2 right-2 h-[3.5px] rounded-full bg-gradient-to-r from-[#F43F8F] via-[#F472B6] via-[#C084FC] to-[#DDD6FE]"
            aria-hidden="true"
          />

          {/* Timeline Nodes */}
          <div className="relative flex items-center justify-between">
            {PHASES.map((p) => {
              const isPeriod = p.id === 'Period';
              return (
                <div key={p.id} className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`rounded-full transition-all ${
                      isPeriod
                        ? 'w-4.5 h-4.5 bg-[#F43F8F] ring-3 ring-pink-300/80 shadow-[0_0_8px_rgba(244,63,143,0.6)] flex items-center justify-center'
                        : p.id === 'Follicular'
                        ? 'w-2.5 h-2.5 bg-[#F472B6]'
                        : p.id === 'Ovulation'
                        ? 'w-2.5 h-2.5 bg-[#A855F7]'
                        : 'w-2.5 h-2.5 bg-[#C084FC]'
                    }`}
                  >
                    {isPeriod && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </span>
                  <span
                    className={`text-[10.5px] sm:text-[11px] mt-1.5 ${
                      isPeriod ? 'font-black text-[#F43F8F]' : 'font-semibold text-[#64748B]'
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
