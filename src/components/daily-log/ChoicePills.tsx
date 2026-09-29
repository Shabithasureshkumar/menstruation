import React from 'react';

interface ChoicePillsProps<T extends string> {
  options: readonly T[];
  value: T | null;
  onChange: (value: T | null) => void;
  labelledBy: string;
  disabled?: boolean;
  columns?: 2 | 3 | 4 | 5;
  /** Vertical list with full-width rows instead of a grid. */
  stacked?: boolean;
  renderIcon?: (option: T) => React.ReactNode;
}

const GRID: Record<NonNullable<ChoicePillsProps<string>['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 min-[400px]:grid-cols-4',
  5: 'grid-cols-3 min-[400px]:grid-cols-5',
};

/**
 * Single-choice toggle buttons. Selecting the active option again clears it
 * (back to "not recorded"). Each button exposes its state with aria-pressed.
 */
export function ChoicePills<T extends string>({
  options,
  value,
  onChange,
  labelledBy,
  disabled,
  columns = 2,
  stacked,
  renderIcon,
}: ChoicePillsProps<T>) {
  return (
    <div role="group" aria-labelledby={labelledBy} className={stacked ? 'space-y-1.5' : `grid ${GRID[columns]} gap-2`}>
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onChange(isSelected ? null : option)}
            className={`min-h-[44px] px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-60 ${
              stacked ? 'w-full justify-start' : 'justify-center'
            } ${
              isSelected
                ? 'bg-[#D81B60] text-white shadow-2xs border border-[#D81B60]'
                : 'bg-[#FAF8FA] hover:bg-pink-50 text-[#55607A] hover:text-[#17152B] border border-gray-100'
            }`}
          >
            {renderIcon && <span className="shrink-0" aria-hidden="true">{renderIcon(option)}</span>}
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
}
