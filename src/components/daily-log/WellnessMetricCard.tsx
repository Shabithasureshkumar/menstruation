import React from 'react';

interface WellnessMetricCardProps {
  label: string;
  value: string;
  iconSvg: React.ReactNode;
  iconBgColor: string;
  onClick?: () => void;
}

export const WellnessMetricCard: React.FC<WellnessMetricCardProps> = ({
  label,
  value,
  iconSvg,
  iconBgColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-start justify-between min-h-[135px] sm:min-h-[145px] transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5' : ''
      }`}
    >
      {/* Icon Circle */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${iconBgColor} flex items-center justify-center shadow-2xs shrink-0 mb-2`}
      >
        {iconSvg}
      </div>

      {/* Texts */}
      <div className="w-full min-w-0">
        <span className="text-xs font-medium text-[#9CA3AF] block truncate">
          {label}
        </span>
        <span className="text-sm sm:text-base font-bold text-[#1F2937] block truncate mt-0.5 tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
};
