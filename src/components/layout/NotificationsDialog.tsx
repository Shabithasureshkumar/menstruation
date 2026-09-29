import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/AsyncState';
import { navigateToTab } from '../../lib/router';
import type { AppNotification } from '../../hooks/useNotifications';

interface NotificationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
}

export const NotificationsDialog: React.FC<NotificationsDialogProps> = ({ isOpen, onClose, notifications }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="sm"
    icon={<Bell className="w-5 h-5" />}
    title="Notifications"
    description="Based on your reminder settings and saved logs."
  >
    {notifications.length === 0 ? (
      <EmptyState title="You're all caught up" description="Reminders you turn on in Settings appear here when they're due." />
    ) : (
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => {
                navigateToTab(n.target);
                onClose();
              }}
              className="w-full min-h-[44px] p-3 rounded-2xl border border-[#F1DDE8] bg-[#FFFCFE] hover:bg-[#FFF0F6] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-bold text-[#17152B]">{n.title}</span>
                <span className="block text-xs text-[#68708A] mt-0.5">{n.body}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#8A92A6] shrink-0" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    )}
  </Modal>
);
