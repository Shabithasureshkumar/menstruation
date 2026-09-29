import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** id of the element that names this switch. */
  labelledBy: string;
  describedBy?: string;
  disabled?: boolean;
}

/**
 * Accessible on/off switch. Declared at module scope so it keeps its identity
 * (and keyboard focus) across re-renders. Space/Enter toggle it natively.
 * The 44px hit area wraps a smaller visual track.
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, labelledBy, describedBy, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    aria-describedby={describedBy}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className="group relative inline-flex items-center justify-center w-14 h-11 -mr-1.5 shrink-0 cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span
      aria-hidden="true"
      className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-200 ${
        checked ? 'bg-[#F43F8F]' : 'bg-[#E2E8F0]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </span>
  </button>
);
