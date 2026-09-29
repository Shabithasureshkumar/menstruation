import React from 'react';
import type { ProductType } from '../../types/dailyLog';

export const ProductIcon: React.FC<{ type: ProductType }> = ({ type }) => {
  const common = { viewBox: '0 0 24 24', fill: 'none', className: 'w-5 h-5 text-[#F43F8F]', 'aria-hidden': true } as const;
  switch (type) {
    case 'Pad':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
          <path d="M4 12C4 9.5 7 9.5 7 9.5V14.5C7 14.5 4 14.5 4 12Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 12C20 9.5 17 9.5 17 9.5V14.5C17 14.5 20 14.5 20 12Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'Tampon':
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M12 17V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'Menstrual cup':
      return (
        <svg {...common}>
          <path d="M6 5H18C18 5 18 14 12 17C6 14 6 5 6 5Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
};
