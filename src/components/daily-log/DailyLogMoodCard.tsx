import React, { useId } from 'react';
import { Info } from 'lucide-react';
import { MOODS } from '../../types/dailyLog';
import type { MoodType } from '../../types/dailyLog';
import { PatientAvatar } from '../layout/PatientAvatar';
import patientAvatar from '../../assets/patient-avatar.webp';

interface DailyLogMoodCardProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType | null) => void;
  disabled?: boolean;
}

export const DailyLogMoodCard: React.FC<DailyLogMoodCardProps> = ({ selectedMood, onSelectMood, disabled }) => {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white rounded-[22px] p-5 sm:p-6 border border-[#F1EEF3] shadow-[0_8px_28px_rgba(23,21,43,0.045)] flex flex-col justify-between min-h-[190px]"
    >
      <div className="flex items-center gap-3 text-left">
        <PatientAvatar className="w-9 h-9" />
        <div className="space-y-0.5">
          <h3 id={headingId} className="text-base font-bold text-[#17152B] tracking-tight">
            Mood
          </h3>
          <p className="text-xs text-[#68708A] font-medium inline-flex items-center gap-1">
            <span>Select how you feel today</span>
            <Info className="w-3.5 h-3.5 text-[#8A92A6]" aria-hidden="true" />
          </p>
        </div>
      </div>

      <div role="group" aria-labelledby={headingId} className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-3">
        {MOODS.map((mood) => {
          const isSelected = mood === selectedMood;
          return (
            <button
              key={mood}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectMood(isSelected ? null : mood)}
              className={`min-h-[76px] py-2 px-0.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? 'border-2 border-[#F43F8F] bg-[#FFF0F6] shadow-2xs'
                  : 'border border-[#F1EEF3] hover:border-pink-200 bg-white hover:bg-pink-50/50'
              }`}
            >
              <img
                src={patientAvatar}
                alt=""
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-top shrink-0 border border-pink-100 shadow-2xs"
              />
              <span className={`text-[0.68rem] sm:text-xs tracking-tight ${isSelected ? 'font-bold text-[#F43F8F]' : 'font-medium text-[#68708A]'}`}>
                {mood}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
