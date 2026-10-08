import React, { useId } from 'react';
import { Ban, Heart, MoreHorizontal, Moon, Pill, Trash2 } from 'lucide-react';
import type { ProtectionType } from '../../types/dailyLog';

interface DailyLogIntercourseCardProps {
  intercourse: boolean | null;
  protection: ProtectionType | null;
  notes: string | null;
  onChangeIntercourse: (value: boolean | null) => void;
  onChangeProtection: (value: ProtectionType | null) => void;
  onChangeNotes: (value: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

const PROTECTION_OPTIONS: { id: ProtectionType; label: string; icon: React.ReactNode }[] = [
  { id: 'None', label: 'None', icon: <Ban className="w-4 h-4 text-[#F43F8F]" /> },
  { id: 'Condom', label: 'Condom', icon: <Moon className="w-4 h-4 text-[#4A5568]" /> },
  { id: 'Pill', label: 'Pill', icon: <Pill className="w-4 h-4 text-[#A855F7]" /> },
  { id: 'Other', label: 'Other', icon: <MoreHorizontal className="w-4 h-4 text-[#68708A]" /> },
];

export const DailyLogIntercourseCard: React.FC<DailyLogIntercourseCardProps> = ({
  intercourse,
  protection,
  notes,
  onChangeIntercourse,
  onChangeProtection,
  onChangeNotes,
  onClear,
  disabled,
}) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white rounded-[22px] p-5 sm:p-6 border border-[#F3DEEB] shadow-[0_8px_28px_rgba(244,63,143,0.04)] space-y-4 text-left"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0 shadow-2xs" aria-hidden="true">
            <Heart className={`w-4.5 h-4.5 ${intercourse ? 'fill-[#F43F8F]' : ''}`} />
          </div>
          <div>
            <h3 id={headingId} className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-[#17152B] leading-tight">
              INTERCOURSE
            </h3>
            <p className="text-xs text-[#68708A] font-medium leading-tight">
              Log sexual activity to track your fertile window, ovulation and cycle patterns.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={disabled || (intercourse === null && protection === null && !notes)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#F43F8F] hover:text-[#D81B60] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Clear</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 pt-2 items-start">
        {/* Column 1: Did you have intercourse today? */}
        <div className="md:col-span-3 space-y-2">
          <p className="text-xs font-bold text-[#17152B]">Did you have intercourse today?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChangeIntercourse(intercourse === true ? null : true)}
              className={`min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center ${
                intercourse === true
                  ? 'bg-[#F43F8F] text-white shadow-[0_4px_12px_rgba(244,63,143,0.3)]'
                  : 'bg-white border border-[#EAE7EE] text-[#17152B] hover:border-pink-200 hover:bg-pink-50/40'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChangeIntercourse(intercourse === false ? null : false)}
              className={`min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center ${
                intercourse === false
                  ? 'bg-[#F43F8F] text-white shadow-[0_4px_12px_rgba(244,63,143,0.3)]'
                  : 'bg-white border border-[#EAE7EE] text-[#17152B] hover:border-pink-200 hover:bg-pink-50/40'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Column 2: Protection used */}
        <div className="md:col-span-5 space-y-2">
          <p className="text-xs font-bold text-[#17152B]">Protection used</p>
          <div className="grid grid-cols-4 gap-2">
            {PROTECTION_OPTIONS.map((opt) => {
              const isSelected = protection === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChangeProtection(isSelected ? null : opt.id)}
                  className={`min-h-[58px] py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                    isSelected
                      ? 'border-2 border-[#F43F8F] bg-[#FFF0F6] shadow-2xs'
                      : 'border border-[#EAE7EE] bg-white hover:border-pink-200 hover:bg-pink-50/30'
                  }`}
                >
                  <span className="shrink-0" aria-hidden="true">
                    {opt.icon}
                  </span>
                  <span className={`text-[0.7rem] font-bold ${isSelected ? 'text-[#F43F8F]' : 'text-[#68708A]'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 3: Notes (Optional) */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="intercourse-notes" className="text-xs font-bold text-[#17152B]">
              Notes <span className="font-normal text-[#8A92A6]">(Optional)</span>
            </label>
          </div>
          <div className="relative">
            <textarea
              id="intercourse-notes"
              rows={2}
              maxLength={200}
              value={notes ?? ''}
              disabled={disabled}
              onChange={(e) => onChangeNotes(e.target.value)}
              placeholder="Any notes you'd like to add?"
              className="w-full p-2.5 pb-6 text-xs text-[#17152B] placeholder-[#9CA3AF] rounded-xl border border-[#F1DDE8] bg-white focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30 resize-none transition-all"
            />
            <span className="absolute right-2.5 bottom-2 text-[0.65rem] text-[#8A92A6] font-medium pointer-events-none" aria-live="polite">
              {(notes ?? '').length}/200
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
