import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Modal } from '../common/Modal';
import { symptomTrendMockData } from '../../data/dailyLogData';

interface SymptomTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SymptomTrendsModal: React.FC<SymptomTrendsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d'>('7d');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Symptom Trends & Patterns" maxWidth="max-w-2xl">
      <div className="space-y-4">
        {/* Filter controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/80">
            <button
              type="button"
              onClick={() => setSelectedRange('7d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedRange === '7d'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('30d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedRange === '30d'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Past Cycle (30 Days)
            </button>
          </div>

          <div className="text-xs text-gray-500">
            Intensity Scale: <span className="font-semibold text-gray-800">0 (None) to 10 (Severe)</span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-purple-50/30 to-pink-50/20 p-2 sm:p-3 rounded-2xl border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={symptomTrendMockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="crampsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA33A1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EA33A1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fatigueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bloatingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  border: '1px solid #F3F4F6',
                  fontSize: '12px',
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '4px' }} />
              <Area type="monotone" dataKey="cramps" name="🌸 Cramps" stroke="#EA33A1" strokeWidth={2.5} fillOpacity={1} fill="url(#crampsGrad)" />
              <Area type="monotone" dataKey="fatigue" name="😴 Fatigue" stroke="#9333EA" strokeWidth={2} fillOpacity={1} fill="url(#fatigueGrad)" />
              <Area type="monotone" dataKey="bloating" name="🌊 Bloating" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#bloatingGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Box */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs shrink-0">
            AI Summary
          </div>
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Cramps and fatigue typically peak on Cycle Days 1–2 before sharply dropping by Day 4. Maintaining hydration and magnesium intake significantly shortens cramp duration.
          </div>
        </div>
      </div>
    </Modal>
  );
};
