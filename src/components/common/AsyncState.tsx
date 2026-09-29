import React from 'react';
import type { ReactNode } from 'react';
import { AlertCircle, Inbox } from 'lucide-react';

/** Skeleton placeholder while data loads. */
export const LoadingState: React.FC<{ label?: string; rows?: number; className?: string }> = ({
  label = 'Loading…',
  rows = 3,
  className = '',
}) => (
  <div role="status" aria-live="polite" className={`w-full space-y-3 ${className}`}>
    <span className="sr-only">{label}</span>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} aria-hidden="true" className="h-16 rounded-2xl bg-[#FFF0F6]/70 animate-pulse" />
    ))}
  </div>
);

/** Error message with a retry action. */
export const ErrorState: React.FC<{ message?: string; onRetry?: () => void; className?: string }> = ({
  message = "We couldn't load this information.",
  onRetry,
  className = '',
}) => (
  <div
    role="alert"
    className={`w-full rounded-2xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}
  >
    <div className="flex items-start gap-2.5 flex-1 min-w-0">
      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm font-medium text-[#4A5568]">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="min-h-[44px] px-5 rounded-full bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-sm font-bold transition-colors cursor-pointer shrink-0"
      >
        Retry
      </button>
    )}
  </div>
);

/** Honest "nothing here yet" message, optionally with an action. */
export const EmptyState: React.FC<{
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}> = ({ title, description, action, icon, className = '' }) => (
  <div className={`w-full rounded-2xl border border-dashed border-[#F1DDE8] bg-[#FFFCFE] p-4 sm:p-5 text-center ${className}`}>
    <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center">
      {icon ?? <Inbox className="w-5 h-5" aria-hidden="true" />}
    </div>
    <p className="mt-2 text-sm font-bold text-[#17152B]">{title}</p>
    {description && <p className="mt-1 text-xs sm:text-[0.82rem] text-[#68708A] max-w-md mx-auto">{description}</p>}
    {action && <div className="mt-3 flex justify-center">{action}</div>}
  </div>
);
