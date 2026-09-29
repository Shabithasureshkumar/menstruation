import React, { useId } from 'react';
import type { ReactNode } from 'react';
import { ToggleSwitch } from '../common/ToggleSwitch';

interface SettingRowProps {
  label: string;
  description?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/** A labelled switch row; the heading text is the switch's accessible name. */
export const SettingRow: React.FC<SettingRowProps> = ({ label, description, checked, onChange, disabled }) => {
  const labelId = useId();
  const descriptionId = useId();
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p id={labelId} className="text-xs sm:text-sm font-bold text-[#17152B]">
          {label}
        </p>
        {description && (
          <p id={descriptionId} className="text-[0.72rem] text-[#68708A]">
            {description}
          </p>
        )}
      </div>
      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        labelledBy={labelId}
        describedBy={description ? descriptionId : undefined}
        disabled={disabled}
      />
    </div>
  );
};
