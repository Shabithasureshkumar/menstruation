import React, { useId, useState } from 'react';
import { Search } from 'lucide-react';
import { Modal } from '../common/Modal';
import { navigateToTab } from '../../lib/router';
import { SUB_NAV_ITEMS } from './navItems';

/** Jump-to search across the Cycle Tracker's pages. */
export const SearchDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const results = SUB_NAV_ITEMS.filter((item) => !q || `${item.label} ${item.keywords}`.toLowerCase().includes(q));

  const handleClose = () => {
    setQuery('');
    onClose();
  };
  const go = (id: (typeof SUB_NAV_ITEMS)[number]['id']) => {
    navigateToTab(id);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Search" description="Jump to a page in the Cycle Tracker." icon={<Search className="w-5 h-5" />}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) go(results[0].id);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Search pages
        </label>
        <input
          id={inputId}
          type="search"
          data-autofocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. symptoms, reminders, calendar"
          autoComplete="off"
          className="w-full min-h-[44px] bg-[#FAF8FA] border border-[#F1DDE8] rounded-xl px-3.5 text-sm font-medium text-[#17152B] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30"
        />
      </form>
      <ul className="mt-3 space-y-1" aria-label="Results">
        {results.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => go(item.id)}
              className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-semibold text-[#17152B] hover:bg-[#FFF0F6] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      {results.length === 0 && <p className="mt-3 text-sm text-[#68708A]">No pages match "{query}".</p>}
    </Modal>
  );
};
