import React from 'react';

interface ToggleFeatureCardProps {
  title: string;
  subtitle: string;
  isActive: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  iconBgColor?: string;
  activeToggleColor?: string;
}

export const ToggleFeatureCard: React.FC<ToggleFeatureCardProps> = ({
  title,
  subtitle,
  isActive,
  onToggle,
  icon,
  iconBgColor = 'bg-[#F8F3F9]',
  activeToggleColor = 'bg-[#F43F5E]',
}) => {
  return (
    <div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-pressed={isActive}
      className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(0.875rem,1.6vw,1.25rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-200 group select-none min-h-[145px] sm:min-h-[160px]"
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${iconBgColor} flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0`}
      >
        {icon}
      </div>

      {/* Texts */}
      <div className="my-1 min-w-0 w-full px-0.5">
        <h4 className="text-xs sm:text-sm font-bold text-[#1C1923] tracking-tight truncate">
          {title}
        </h4>
        <p className="text-[0.68rem] sm:text-xs text-[#6B6578] truncate mt-0.5">{subtitle}</p>
      </div>

      {/* Switch Toggle */}
      <div
        className={`w-10 h-5.5 sm:w-11 sm:h-6 rounded-full transition-colors relative p-0.5 shadow-inner ${
          isActive ? activeToggleColor : 'bg-gray-200'
        }`}
      >
        <div
          className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white shadow-md transition-transform duration-200 transform ${
            isActive ? 'translate-x-4.5 sm:translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};
