import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ToastContext } from './contexts';
import type { ToastType } from './contexts';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const DURATION_MS = 3500;

const ICONS: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />,
  error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />,
};

/**
 * The app's single toast container. A new toast replaces the current one (and
 * its timer), so toasts never stack or overlap. Sits below modals (z-40 < z-50)
 * so it can never cover a dialog's primary action.
 */
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const timerRef = useRef<number | null>(null);
  const idRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const dismissToast = useCallback(() => {
    clearTimer();
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    clearTimer();
    idRef.current += 1;
    setToast({ id: idRef.current, message, type });
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setToast(null);
    }, DURATION_MS);
  }, []);

  useEffect(() => clearTimer, []);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role={toast?.type === 'error' ? 'alert' : 'status'}
        aria-live={toast?.type === 'error' ? 'assertive' : 'polite'}
        className="fixed z-40 inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96 pointer-events-none"
      >
        {toast && (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 pl-4 pr-1 py-1 rounded-2xl shadow-xl border border-[#F1DDE8] bg-white text-gray-800 animate-fade-in"
          >
            {ICONS[toast.type]}
            <p className="text-sm font-medium leading-snug flex-1 min-w-0 break-words py-2.5">{toast.message}</p>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="w-11 h-11 shrink-0 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};
