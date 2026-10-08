import React, { useId } from 'react';
import { Ban, Heart, MoreHorizontal, Pill, ShieldCheck } from 'lucide-react';
import type { ProtectionType } from '../../types/dailyLog';

interface DailyLogIntercourseCardProps {
  intercourse: boolean | null;
  protection: ProtectionType | null;
  protectionOther?: string | null;
  onChangeIntercourse: (value: boolean | null) => void;
  onChangeProtection: (value: ProtectionType | null) => void;
  onChangeProtectionOther: (value: string) => void;
  disabled?: boolean;
}

const PROTECTION_OPTIONS: { id: ProtectionType; label: string; icon: (isSelected: boolean) => React.ReactNode }[] = [
  {
    id: 'Pill',
    label: 'Pill',
    icon: (sel) => <Pill className={`w-4 h-4 ${sel ? 'text-[#F43F8F]' : 'text-[#F43F8F]'}`} />,
  },
  {
    id: 'Condom',
    label: 'Condom',
    icon: (sel) => <ShieldCheck className={`w-4 h-4 ${sel ? 'text-[#0EA5E9]' : 'text-[#0EA5E9]'}`} />,
  },
  {
    id: 'None',
    label: 'None',
    icon: (sel) => <Ban className={`w-4 h-4 ${sel ? 'text-[#F43F8F]' : 'text-[#F43F8F]'}`} />,
  },
  {
    id: 'Other',
    label: 'Other',
    icon: (sel) => <MoreHorizontal className={`w-4 h-4 ${sel ? 'text-[#F43F8F]' : 'text-[#68708A]'}`} />,
  },
];

export const DailyLogIntercourseCard: React.FC<DailyLogIntercourseCardProps> = ({
  intercourse,
  protection,
  protectionOther,
  onChangeIntercourse,
  onChangeProtection,
  onChangeProtectionOther,
  disabled,
}) => {
  const headingId = useId();
  const questionId = useId();
  const protectionHeadingId = useId();
  const otherInputId = useId();

  const handleSelectYes = () => {
    if (disabled) return;
    onChangeIntercourse(intercourse === true ? null : true);
  };

  const handleSelectNo = () => {
    if (disabled) return;
    onChangeIntercourse(intercourse === false ? null : false);
  };

  const isYes = intercourse === true;
  const isNo = intercourse === false;

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white rounded-[22px] p-5 sm:p-6 border border-[#F3DEEB] shadow-[0_8px_28px_rgba(244,63,143,0.045)] space-y-5 text-left transition-all"
    >
      {/* Header matching reference image */}
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0 shadow-2xs"
          aria-hidden="true"
        >
          <Heart className="w-4 h-4 fill-[#F43F8F]" />
        </div>
        <div className="min-w-0">
          <h3 id={headingId} className="text-sm sm:text-base font-bold text-[#17152B] leading-tight">
            Intercourse
          </h3>
          <p className="text-xs text-[#68708A] font-medium leading-tight mt-0.5">
            Log your sexual activity to track your fertile window and understand your cycle better.
          </p>
        </div>
      </div>

      {/* Row 1: Did you have intercourse today? */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        <div className="md:col-span-4 min-w-0">
          <p id={questionId} className="text-xs sm:text-[13px] font-bold text-[#17152B]">
            Did you have intercourse today?
          </p>
        </div>

        <div role="group" aria-labelledby={questionId} className="md:col-span-8 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            aria-pressed={isYes}
            disabled={disabled}
            onClick={handleSelectYes}
            className={`min-h-[44px] sm:min-h-[46px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 ${
              isYes
                ? 'bg-[#F43F8F] text-white shadow-[0_4px_14px_rgba(244,63,143,0.3)] border-transparent'
                : 'bg-white border border-[#EAE7EE] text-[#17152B] hover:border-pink-200 hover:bg-pink-50/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isYes ? 'fill-white text-white' : 'text-[#68708A]'}`} />
            <span>Yes</span>
          </button>

          <button
            type="button"
            aria-pressed={isNo}
            disabled={disabled}
            onClick={handleSelectNo}
            className={`min-h-[44px] sm:min-h-[46px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 ${
              isNo
                ? 'bg-[#F43F8F] text-white shadow-[0_4px_14px_rgba(244,63,143,0.3)] border-transparent'
                : 'bg-white border border-[#EAE7EE] text-[#17152B] hover:border-pink-200 hover:bg-pink-50/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isNo ? 'fill-white text-white' : 'text-[#68708A]'}`} />
            <span>No</span>
          </button>
        </div>
      </div>

      {/* Row 2: Protection method (Visible ONLY when intercourse === true) */}
      {isYes && (
        <div className="space-y-3 pt-1 border-t border-[#F1DDE8]/60 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center pt-2">
            <div className="md:col-span-4 min-w-0">
              <p id={protectionHeadingId} className="text-xs sm:text-[13px] font-bold text-[#17152B]">
                Protection method
              </p>
            </div>

            <div
              role="group"
              aria-labelledby={protectionHeadingId}
              className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
            >
              {PROTECTION_OPTIONS.map((opt) => {
                const isSelected = protection === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={disabled}
                    onClick={() => onChangeProtection(isSelected ? null : opt.id)}
                    className={`min-h-[64px] sm:min-h-[68px] py-2 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                      isSelected
                        ? 'border-2 border-[#F43F8F] bg-[#FFF0F6] text-[#F43F8F] shadow-2xs font-bold'
                        : 'border border-[#EAE7EE] bg-white text-[#68708A] hover:border-pink-200 hover:bg-pink-50/30 font-medium'
                    }`}
                  >
                    <span className="shrink-0" aria-hidden="true">
                      {opt.icon(isSelected)}
                    </span>
                    <span className={`text-[0.72rem] sm:text-xs tracking-tight ${isSelected ? 'font-bold text-[#F43F8F]' : 'font-medium text-[#68708A]'}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Description box (Visible ONLY when protection === 'Other') */}
          {protection === 'Other' && (
            <div className="pt-2 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                <div className="md:col-span-4 min-w-0">
                  <label htmlFor={otherInputId} className="text-xs sm:text-[13px] font-bold text-[#17152B] block">
                    Describe
                  </label>
                </div>

                <div className="md:col-span-8">
                  <input
                    id={otherInputId}
                    type="text"
                    value={protectionOther ?? ''}
                    disabled={disabled}
                    onChange={(e) => onChangeProtectionOther(e.target.value)}
                    placeholder="Please describe…"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#F1DDE8] bg-white placeholder-[#9CA3AF] text-xs sm:text-sm text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
