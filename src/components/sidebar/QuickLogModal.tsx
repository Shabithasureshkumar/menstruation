import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { BloodFlow, MoodType, QuickLogType, SymptomKey, WellnessMetricsData } from '../../types/dailyLog';
import { symptomDefinitions } from '../../data/dailyLogData';

interface QuickLogModalProps {
  type: QuickLogType | null;
  onClose: () => void;
  currentFlow: BloodFlow;
  wellness: WellnessMetricsData;
  symptoms: Record<SymptomKey, number>;
  onUpdateFlow: (flow: BloodFlow) => void;
  onUpdateWellness: (metrics: Partial<WellnessMetricsData>) => void;
  onUpdateSymptom: (key: SymptomKey, val: number) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  type,
  onClose,
  currentFlow,
  wellness,
  symptoms,
  onUpdateFlow,
  onUpdateWellness,
  onUpdateSymptom,
}) => {
  if (!type) return null;

  const titles: Record<QuickLogType, string> = {
    flow: 'Quick Log: Blood Flow',
    symptoms: 'Quick Log: Symptom Intensity',
    mood: 'Quick Log: Daily Mood',
    weight: 'Quick Log: Body Weight',
    sleep: 'Quick Log: Sleep Duration',
    water: 'Quick Log: Water Intake',
  };

  return (
    <Modal isOpen={Boolean(type)} onClose={onClose} title={titles[type]} maxWidth="max-w-md">
      <QuickLogForm
        type={type}
        onClose={onClose}
        currentFlow={currentFlow}
        wellness={wellness}
        symptoms={symptoms}
        onUpdateFlow={onUpdateFlow}
        onUpdateWellness={onUpdateWellness}
        onUpdateSymptom={onUpdateSymptom}
      />
    </Modal>
  );
};

const QuickLogForm: React.FC<{
  type: QuickLogType;
  onClose: () => void;
  currentFlow: BloodFlow;
  wellness: WellnessMetricsData;
  symptoms: Record<SymptomKey, number>;
  onUpdateFlow: (flow: BloodFlow) => void;
  onUpdateWellness: (metrics: Partial<WellnessMetricsData>) => void;
  onUpdateSymptom: (key: SymptomKey, val: number) => void;
}> = ({
  type,
  onClose,
  currentFlow,
  wellness,
  symptoms,
  onUpdateFlow,
  onUpdateWellness,
  onUpdateSymptom,
}) => {
  const [tempFlow, setTempFlow] = useState<BloodFlow>(currentFlow);
  const [tempMood, setTempMood] = useState<MoodType>(wellness.mood);
  const [tempWater, setTempWater] = useState<number>(wellness.waterCurrent);
  const [tempWeight, setTempWeight] = useState<number>(wellness.weightKg);
  const [tempSleep, setTempSleep] = useState<number>(wellness.sleepHours);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomKey>('cramps');
  const [tempSymptomValue, setTempSymptomValue] = useState<number>(symptoms[selectedSymptom] || 5);

  const handleSymptomSelect = (key: SymptomKey) => {
    setSelectedSymptom(key);
    setTempSymptomValue(symptoms[key] ?? 5);
  };

  const handleSave = () => {
    switch (type) {
      case 'flow':
        onUpdateFlow(tempFlow);
        break;
      case 'mood':
        onUpdateWellness({ mood: tempMood });
        break;
      case 'water':
        onUpdateWellness({ waterCurrent: tempWater });
        break;
      case 'weight':
        onUpdateWellness({ weightKg: tempWeight });
        break;
      case 'sleep':
        onUpdateWellness({ sleepHours: tempSleep });
        break;
      case 'symptoms':
        onUpdateSymptom(selectedSymptom, tempSymptomValue);
        break;
    }
    onClose();
  };

  return (
    <div className="space-y-4 pt-1">
      {type === 'flow' && (
        <div className="grid grid-cols-2 gap-2.5">
          {(['Light', 'Medium', 'Heavy', 'Spotting'] as BloodFlow[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTempFlow(f)}
              className={`py-3 px-4 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                tempFlow === f
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {type === 'mood' && (
        <div className="grid grid-cols-3 gap-2">
          {(['Great', 'Good', 'Neutral', 'Low', 'Tired', 'Anxious'] as MoodType[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setTempMood(m)}
              className={`py-3 px-2 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                tempMood === m
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {type === 'water' && (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-600 uppercase">
            Current Liters Logged
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={tempWater}
              onChange={(e) => setTempWater(parseFloat(e.target.value))}
              className="flex-1 cursor-pointer"
            />
            <span className="text-base font-bold text-gray-800 tabular-nums w-14 text-right">
              {tempWater} L
            </span>
          </div>
          <div className="flex gap-2">
            {[0.25, 0.5, 1.0].map((add) => (
              <button
                key={add}
                type="button"
                onClick={() => setTempWater((w) => +(w + add).toFixed(2))}
                className="flex-1 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                +{add} L
              </button>
            ))}
          </div>
        </div>
      )}

      {type === 'weight' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={tempWeight}
            onChange={(e) => setTempWeight(parseFloat(e.target.value) || 0)}
            className="w-full p-3 rounded-2xl border border-gray-200 text-base font-semibold focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {type === 'sleep' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase">
            Sleep Duration (hours)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="24"
            value={tempSleep}
            onChange={(e) => setTempSleep(parseFloat(e.target.value) || 0)}
            className="w-full p-3 rounded-2xl border border-gray-200 text-base font-semibold focus:ring-2 focus:ring-purple-400"
          />
        </div>
      )}

      {type === 'symptoms' && (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-600 uppercase">
            Select Symptom
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {symptomDefinitions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSymptomSelect(s.id)}
                className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer truncate ${
                  selectedSymptom === s.id
                    ? 'bg-purple-100 border-purple-400 text-purple-800 shadow-2xs'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{s.emoji}</span>
                <span className="truncate">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
              <span>Intensity Rating</span>
              <span className="tabular-nums font-bold text-brand-purple-600">{tempSymptomValue} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={tempSymptomValue}
              onChange={(e) => setTempSymptomValue(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 mt-5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-[#EA33A1] text-white text-xs font-semibold shadow-md hover:bg-[#d8218f] transition-colors cursor-pointer"
        >
          Confirm Log
        </button>
      </div>
    </div>
  );
};
