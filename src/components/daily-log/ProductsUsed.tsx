import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { ProductsUsed as ProductsUsedType } from '../../types/dailyLog';

interface ProductsUsedProps {
  products: ProductsUsedType;
  onUpdateCount: (product: keyof ProductsUsedType, delta: number) => void;
}

export const ProductsUsed: React.FC<ProductsUsedProps> = ({
  products,
  onUpdateCount,
}) => {
  const items: Array<{
    key: keyof ProductsUsedType;
    label: string;
    iconSvg: React.ReactNode;
  }> = [
    {
      key: 'pads',
      label: 'Pads',
      iconSvg: (
        <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="4" width="14" height="16" rx="7" />
          <path d="M5 12h14" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      key: 'tampons',
      label: 'Tampons',
      iconSvg: (
        <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="3" width="6" height="13" rx="3" />
          <path d="M12 16v5" />
        </svg>
      ),
    },
    {
      key: 'menstrualCup',
      label: 'Menstrual Cup',
      iconSvg: (
        <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 4h12c0 6-3 10-6 10s-6-4-6-10z" />
          <path d="M12 14v6" />
          <path d="M10 20h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-[clamp(1.5rem,2.5vw,3rem)] p-[clamp(1.25rem,2vw,1.5rem)] border-[5px] border-[#F0F0F0] shadow-sm flex flex-col justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6578] block mb-3">
        Products Used
      </span>

      <div className="space-y-3 flex-1 flex flex-col justify-between">
        {items.map((item) => {
          const count = products[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-full bg-[#FFF5F6] border border-pink-100/60"
            >
              {/* Product Icon & Name */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs shrink-0">
                  {item.iconSvg}
                </div>
                <span className="text-sm font-medium text-[#1C1923] truncate">
                  {item.label}
                </span>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdateCount(item.key, -1)}
                  disabled={count <= 0}
                  aria-label={`Decrease ${item.label} count`}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all bg-white border border-[#EBE6EC] text-gray-700 shadow-2xs ${
                    count <= 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer active:scale-95'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="w-5 text-center text-sm font-semibold text-[#1C1923] tabular-nums select-none">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={() => onUpdateCount(item.key, 1)}
                  aria-label={`Increase ${item.label} count`}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#1C1923] text-white hover:bg-black transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
