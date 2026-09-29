import React, { useState } from 'react';
import { Check, Compass } from 'lucide-react';
import { Modal } from '../common/Modal';
import { buttonClass } from '../common/buttonStyles';
import type { JourneyType } from '../../types/settings';
import { JOURNEY_OPTIONS } from './JourneyOptions';
import { JourneyIcon } from './JourneyIcon';

interface ManageJourneyModalProps {
  isOpen: boolean;
  current: JourneyType;
  onClose: () => void;
  onSave: (journey: JourneyType) => Promise<boolean>;
}

export const ManageJourneyModal: React.FC<ManageJourneyModalProps> = (props) => {
  if (!props.isOpen) return null;
  // Remount per open so the selection always starts from the saved journey.
  return <JourneyDialog {...props} />;
};

const JourneyDialog: React.FC<ManageJourneyModalProps> = ({ current, onClose, onSave }) => {
  const [selected, setSelected] = useState<JourneyType>(current);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const ok = await onSave(selected);
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      icon={<Compass className="w-5 h-5" />}
      title="Manage Your Journey"
      description="Choose one focus. You can change this anytime."
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonClass.secondary}>
            Cancel
          </button>
          <button type="button" onClick={save} disabled={saving} className={buttonClass.primary}>
            {saving ? 'Saving…' : 'Save Journey'}
          </button>
        </>
      }
    >
      <fieldset className="space-y-3">
        <legend className="sr-only">Journey</legend>
        {JOURNEY_OPTIONS.map((journey) => {
          const isSelected = selected === journey.id;
          return (
            <label
              key={journey.id}
              className={`relative w-full p-4 rounded-[1.25rem] border-2 transition-all cursor-pointer flex items-start sm:items-center justify-between gap-3.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#F43F8F] ${
                isSelected ? 'border-[#F43F8F] bg-[#FFF5F9]' : 'border-[#F1DDE8] bg-white hover:bg-[#FFF9FB]'
              }`}
            >
              <input
                type="radio"
                name="journey"
                value={journey.id}
                checked={isSelected}
                onChange={() => setSelected(journey.id)}
                className="sr-only"
                data-autofocus={isSelected ? true : undefined}
              />
              <span className="flex items-start gap-3.5 flex-1 min-w-0">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#F43F8F] text-white' : `${journey.iconBg} ${journey.iconColor}`
                  }`}
                >
                  <JourneyIcon icon={journey.icon} />
                </span>
                <span className="space-y-1 flex-1 min-w-0">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#17152B]">{journey.title}</span>
                    {current === journey.id && (
                      <span className="px-2 py-0.5 rounded-full text-[0.62rem] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                        Current
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-[#68708A] font-medium leading-relaxed">{journey.description}</span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-[#F43F8F] bg-[#F43F8F]' : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </span>
            </label>
          );
        })}
      </fieldset>
    </Modal>
  );
};
