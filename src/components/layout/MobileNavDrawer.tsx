import React from 'react';
import { Modal } from '../common/Modal';
import { navigateToTab } from '../../lib/router';
import { useRoute } from '../../hooks/useRoute';
import { usePatient } from '../../hooks/usePatient';
import { SUB_NAV_ITEMS, TOP_NAV_ITEMS } from './navItems';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onModule: (label: string, available: boolean) => void;
}

const itemClass =
  'w-full min-h-[44px] px-3 rounded-xl flex items-center justify-between gap-2 text-sm font-semibold text-left transition-colors cursor-pointer';

/** Navigation for < 1100px, where the desktop module pills are hidden. */
export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose, onModule }) => {
  const route = useRoute();
  const { currentUser } = usePatient();

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="drawer" title="Menu">
      <nav aria-label="Cycle Tracker" className="space-y-1">
        <p className="px-3 pb-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#8A92A6]">Cycle Tracker</p>
        {SUB_NAV_ITEMS.map((item) => {
          const active = route.tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                navigateToTab(item.id);
                onClose();
              }}
              className={`${itemClass} ${active ? 'bg-[#FFF0F6] text-[#F43F8F]' : 'text-[#17152B] hover:bg-gray-50'}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <nav aria-label="Modules" className="space-y-1 mt-5">
        <p className="px-3 pb-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#8A92A6]">Modules</p>
        {TOP_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-disabled={item.available ? undefined : true}
            onClick={() => {
              onModule(item.label, item.available);
              onClose();
            }}
            className={`${itemClass} ${item.available ? 'text-[#17152B] hover:bg-gray-50' : 'text-[#8A92A6] hover:bg-gray-50'}`}
          >
            <span>{item.label}</span>
            {!item.available && <span className="text-[0.66rem] font-bold uppercase tracking-wide">Not available</span>}
          </button>
        ))}
      </nav>

      {currentUser && (
        <p className="mt-6 px-3 text-xs text-[#68708A]">
          Signed in as <span className="font-bold text-[#17152B]">{currentUser.name}</span> ({currentUser.role})
        </p>
      )}
    </Modal>
  );
};
