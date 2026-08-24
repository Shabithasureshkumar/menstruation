import React from 'react';
import { Plus, Droplets, Activity, Smile, Scale, Moon, GlassWater } from 'lucide-react';
import type { QuickLogType } from '../../types/dailyLog';

interface QuickLogProps {
  onOpenQuickLog: (type: QuickLogType) => void;
}

export const QuickLog: React.FC<QuickLogProps> = ({ onOpenQuickLog }) => {
  const actions: Array<{
    type: QuickLogType;
    label: string;
    gradient: string;
    icon: React.ReactNode;
  }> = [
    {
      type: 'flow',
      label: 'Flow',
      gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)',
      icon: <Droplets className="w-5 h-5 text-white fill-white/80" />,
    },
    {
      type: 'symptoms',
      label: 'Symptoms',
      gradient: 'linear-gradient(135deg, #FA8BCE 0%, #F65CBE 100%)',
      icon: <Activity className="w-5 h-5 text-white" />,
    },
    {
      type: 'mood',
      label: 'Mood',
      gradient: 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)',
      icon: <Smile className="w-5 h-5 text-white" />,
    },
    {
      type: 'weight',
      label: 'Weight',
      gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
      icon: <Scale className="w-5 h-5 text-white" />,
    },
    {
      type: 'sleep',
      label: 'Sleep',
      gradient: 'linear-gradient(135deg, #F881F0 0%, #F163C6 100%)',
      icon: <Moon className="w-5 h-5 text-white fill-white/80" />,
    },
    {
      type: 'water',
      label: 'Water',
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
      icon: <GlassWater className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#1F2937] tracking-tight">
          Quick Log
        </h3>
        <button
          type="button"
          onClick={() => onOpenQuickLog('flow')}
          aria-label="Add quick log"
          className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act) => (
          <button
            key={act.type}
            type="button"
            onClick={() => onOpenQuickLog(act.type)}
            className="p-3.5 rounded-2xl bg-white/85 hover:bg-white border border-gray-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-95 min-h-[92px]"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
              style={{ background: act.gradient }}
            >
              {act.icon}
            </div>
            <span className="text-xs font-semibold text-[#374151] tracking-tight">
              {act.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
