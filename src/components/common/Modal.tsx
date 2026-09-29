import React, { useEffect, useId, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let scrollLockCount = 0;

function lockScroll() {
  scrollLockCount += 1;
  if (scrollLockCount === 1) document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = '';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  /** Pinned below the scrollable body so primary actions stay reachable. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dialog' | 'drawer';
  role?: 'dialog' | 'alertdialog';
  closeOnBackdrop?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  bodyClassName?: string;
}

const SIZE_CLASS: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-[620px]',
};

/**
 * Accessible modal: portal, focus moved in and trapped, focus restored to the
 * trigger on close, Escape to close, optional backdrop close, scroll lock, and
 * a height capped at 90dvh with a scrollable body.
 */
export const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) return null;
  return createPortal(<ModalPanel {...props} />, document.body);
};

const ModalPanel: React.FC<ModalProps> = ({
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = 'md',
  variant = 'dialog',
  role = 'dialog',
  closeOnBackdrop = true,
  initialFocusRef,
  bodyClassName,
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Move focus in on open, give it back to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const target =
      initialFocusRef?.current ??
      panel?.querySelector<HTMLElement>('[data-autofocus]') ??
      panel?.querySelector<HTMLElement>(FOCUSABLE) ??
      panel;
    target?.focus({ preventScroll: true });
    lockScroll();
    return () => {
      unlockScroll();
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
    // Runs once per open; initialFocusRef is read on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    e.stopPropagation();
    const focusables = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const isDrawer = variant === 'drawer';

  return (
    <div className={`fixed inset-0 z-50 flex ${isDrawer ? 'justify-start' : 'items-center justify-center p-3 sm:p-5'}`}>
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-fade-in"
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={
          isDrawer
            ? 'relative h-full w-[min(85vw,320px)] bg-white shadow-2xl border-r border-[#F1DDE8] flex flex-col text-left animate-drawer-in focus:outline-none'
            : `relative w-full ${SIZE_CLASS[size]} max-h-[90vh] supports-[height:100dvh]:max-h-[90dvh] bg-white rounded-[1.5rem] sm:rounded-[1.75rem] shadow-2xl border border-[#F1DDE8] flex flex-col text-left animate-modal-in focus:outline-none`
        }
      >
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-[#F5E6EF] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <div className="w-9 h-9 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h2 id={titleId} className="text-base sm:text-lg font-black text-[#17152B] tracking-tight leading-tight">
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="text-xs sm:text-[0.82rem] text-[#68708A] font-medium leading-snug mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-11 h-11 -mr-2 -mt-1 rounded-full text-[#8A92A6] hover:text-[#17152B] hover:bg-pink-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={bodyClassName ?? 'flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4'}>{children}</div>

        {footer && (
          <div className="px-5 sm:px-6 py-3 border-t border-[#F5E6EF] shrink-0 flex flex-wrap items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
