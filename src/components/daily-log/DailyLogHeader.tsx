import React from 'react';

export const DailyLogHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-[clamp(1.5rem,2.2vw,1.875rem)] font-bold text-gray-900 tracking-tight leading-tight">
        Daily Log
      </h1>
    </div>
  );
};
