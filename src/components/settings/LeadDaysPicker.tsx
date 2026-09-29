import React from 'react';
import { REMINDER_LEAD_DAYS } from '../../types/settings';
import type { ReminderLeadDays } from '../../types/settings';

interface LeadDaysPickerProps {
  label: string;
  value: ReminderLeadDays;
  onChange: (days: ReminderLeadDays) => void;
}

export const LeadDaysPicker: React.FC<LeadDaysPickerProps> = ({ label, value, onChange }) => (
  <fieldset className="pt-1.5 space-y-1.5">
    <legend className="text-[0.68rem] text-[#68708A] font-medium">{label}</legend>
    <div className="grid grid-cols-3 gap-2">
      {REMINDER_LEAD_DAYS.map((days) => {
        const isSelected = value === days;
        return (
          <button
            key={days}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(days)}
            className={`px-2 rounded-full text-xs font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px] ${
              isSelected ? 'bg-[#FFF0F6] text-[#C2185B] border-[#F43F8F] shadow-2xs' : 'bg-white text-[#68708A] border-[#F1DDE8] hover:bg-gray-50'
            }`}
          >
            <span aria-hidden="true" className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#F43F8F]' : 'border border-[#68708A]'}`} />
            <span>
              {days} {days === 1 ? 'day' : 'days'} before
            </span>
          </button>
        );
      })}
    </div>
  </fieldset>
);
