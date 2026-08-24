import React from 'react';

interface TodayInsightsProps {
  insights: string[];
}

export const TodayInsights: React.FC<TodayInsightsProps> = ({ insights }) => {
  return (
    <div className="w-full space-y-2.5">
      <h3 className="text-[0.98rem] font-bold text-[#1F2937] tracking-tight">
        Today's Insights
      </h3>

      <div className="space-y-2.5 pl-1">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[0.82rem] text-[#4B5563] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shrink-0 mt-1.5 shadow-2xs" />
            <span className="break-words">{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
