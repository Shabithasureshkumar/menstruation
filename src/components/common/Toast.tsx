import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import type { ToastState } from '../../hooks/useDailyLog';

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
  };

  const bgColors = {
    success: 'bg-white border-emerald-100 text-gray-800',
    info: 'bg-white border-blue-100 text-gray-800',
    warning: 'bg-white border-amber-100 text-gray-800',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[60] max-w-sm w-full animate-fade-in pointer-events-auto"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl border ${
          bgColors[toast.type]
        } backdrop-blur-md transition-all`}
      >
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug flex-1 break-words">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
