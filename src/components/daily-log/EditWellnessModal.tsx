import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { MoodType, WellnessMetricsData } from '../../types/dailyLog';

interface EditWellnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: WellnessMetricsData;
  onSave: (updated: Partial<WellnessMetricsData>) => void;
}

export const EditWellnessModal: React.FC<EditWellnessModalProps> = ({
  isOpen,
  onClose,
  metrics,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Wellness Metrics">
      <EditWellnessForm metrics={metrics} onClose={onClose} onSave={onSave} />
    </Modal>
  );
};

const EditWellnessForm: React.FC<{
  metrics: WellnessMetricsData;
  onClose: () => void;
  onSave: (updated: Partial<WellnessMetricsData>) => void;
}> = ({ metrics, onClose, onSave }) => {
  const [formData, setFormData] = useState<WellnessMetricsData>(metrics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const moods: MoodType[] = ['Great', 'Good', 'Neutral', 'Low', 'Tired', 'Anxious'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sleep Hours */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Sleep (Hours)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="24"
            value={formData.sleepHours}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sleepHours: parseFloat(e.target.value) || 0 }))
            }
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-400 text-sm font-medium"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Mood
          </label>
          <select
            value={formData.mood}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mood: e.target.value as MoodType }))
            }
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-400 text-sm font-medium bg-white"
          >
            {moods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Water Intake */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Water Logged (L)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.waterCurrent}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, waterCurrent: parseFloat(e.target.value) || 0 }))
            }
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-400 text-sm font-medium"
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Steps
          </label>
          <input
            type="number"
            min="0"
            max="100000"
            value={formData.steps}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, steps: parseInt(e.target.value, 10) || 0 }))
            }
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-400 text-sm font-medium"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            min="20"
            max="300"
            value={formData.weightKg}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, weightKg: parseFloat(e.target.value) || 0 }))
            }
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-400 text-sm font-medium"
          />
        </div>

        {/* Sex Activity */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Sex Activity
          </label>
          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.sexActivityLogged}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sexActivityLogged: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded text-brand-pink-600 focus:ring-brand-pink-500 border-gray-300"
              />
              <span>Active / Logged</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F475C1] to-[#FF24AF] text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
