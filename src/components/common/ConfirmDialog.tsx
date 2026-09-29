import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { buttonClass } from './buttonStyles';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => Promise<boolean> | boolean;
  onClose: () => void;
}

/** Confirmation for destructive actions; the confirm button is disabled while running. */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, confirmLabel, onConfirm, onClose }) => {
  const [busy, setBusy] = useState(false);
  const confirm = async () => {
    setBusy(true);
    const ok = await onConfirm();
    setBusy(false);
    if (ok) onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      role="alertdialog"
      size="sm"
      icon={<AlertTriangle className="w-5 h-5" />}
      title={title}
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonClass.secondary} data-autofocus>
            Cancel
          </button>
          <button type="button" onClick={confirm} disabled={busy} className={buttonClass.danger}>
            {busy ? 'Working…' : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-[#4A5568]">{message}</p>
    </Modal>
  );
};
