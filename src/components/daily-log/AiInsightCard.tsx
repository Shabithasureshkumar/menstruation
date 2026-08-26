import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiInsightCardProps {
  title: string;
  description: string;
}

export const AiInsightCard: React.FC<AiInsightCardProps> = ({
  title,
  description,
}) => {
  return (
    <div
      className="w-full rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1.15rem,2vw,1.5rem)] border border-[#EBE6EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6"
      style={{
        background: 'linear-gradient(111deg, #FFE6E7 0%, #FFFFFF 100%)',
      }}
    >
      {/* Left side / Header with Sparkles & Title */}
      <div className="flex items-start md:items-center gap-3 min-w-0 shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#DE1D3F] flex items-center justify-center text-white shadow-xs shrink-0 mt-0.5 md:mt-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider text-[#6B6578] block">
            AI Insight
          </span>
          <h4 className="text-sm sm:text-[1.05rem] font-bold text-[#1C1923] tracking-tight leading-snug truncate">
            {title}
          </h4>
        </div>
      </div>

      {/* Right side / Description text */}
      <div className="flex-1 min-w-0 md:border-l md:border-pink-200/60 md:pl-5">
        <p className="text-xs sm:text-sm text-[#6B6578] leading-relaxed break-words">
          {description}
        </p>
      </div>
    </div>
  );
};
