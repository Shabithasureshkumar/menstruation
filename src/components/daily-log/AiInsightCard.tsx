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
      className="w-full rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1.25rem,2vw,1.5rem)] border border-[#EBE6EC] shadow-sm flex flex-col justify-between"
      style={{
        background: 'linear-gradient(111deg, #FFE6E7 0%, #FFFFFF 100%)',
      }}
    >
      {/* Top Header with Sparkles */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#DE1D3F] flex items-center justify-center text-white shadow-xs shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B6578]">
          AI Insight
        </span>
      </div>

      {/* Content */}
      <div className="mt-3">
        <h4 className="text-[1.05rem] font-bold text-[#1C1923] tracking-tight leading-snug">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-[#6B6578] leading-relaxed mt-1.5 break-words">
          {description}
        </p>
      </div>
    </div>
  );
};
