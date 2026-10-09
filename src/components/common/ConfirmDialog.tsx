import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Modal } from './Modal';
import { buttonClass } from './buttonStyles';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  /** 'danger' (default) for destructive actions, 'primary' for ordinary confirmations. */
  confirmVariant?: 'danger' | 'primary';
  /** Overrides the default warning icon. */
  icon?: ReactNode;
  cancelLabel?: string;
  onConfirm: () => Promise<boolean> | boolean;
  onClose: () => void;
}

/** Confirmation dialog; the confirm button is disabled while the action runs. */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmVariant = 'danger',
  icon,
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}) => {
  const [busy, setBusy] = useState(false);
  const confirm = async () => {
    if (busy) return;
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
      icon={icon ?? <AlertTriangle className="w-5 h-5" />}
      title={title}
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonClass.secondary} data-autofocus>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={busy}
            className={confirmVariant === 'primary' ? buttonClass.primary : buttonClass.danger}
          >
            {busy ? 'Working…' : confirmLabel}
          </button>
        </>
      }
    >
      <div className="text-sm text-[#4A5568] leading-relaxed">{message}</div>
    </Modal>
  );
};
