import React from 'react';
import { navigateToTab } from '../../lib/router';
import { EmptyState } from '../common/AsyncState';

export const NotFoundView: React.FC = () => (
  <EmptyState
    title="Page not found"
    description="This address doesn't match any Cycle Tracker page."
    action={
      <button
        type="button"
        onClick={() => navigateToTab('overview')}
        className="min-h-[44px] px-5 rounded-full bg-[#F43F8F] hover:bg-[#E11D48] text-white text-sm font-bold transition-colors cursor-pointer"
      >
        Go to Overview
      </button>
    }
  />
);
