import React from 'react';

/** Marks values that come from a demo fixture rather than a real record. */
export const DemoBadge: React.FC<{ className?: string; label?: string }> = ({ className = '', label = 'Demo data' }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[0.62rem] font-bold uppercase tracking-wide whitespace-nowrap ${className}`}
  >
    {label}
  </span>
);
