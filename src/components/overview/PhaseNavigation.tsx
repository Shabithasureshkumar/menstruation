import React, { useEffect, useRef } from 'react';
import { navigateToTab } from '../../lib/router';
import type { SubNavTab } from '../../types/cycleTracker';
import { SUB_NAV_ITEMS } from '../layout/navItems';

/**
 * Cycle Tracker section tabs. On narrow screens the pill row scrolls
 * horizontally inside its own container (never the page), and the active tab
 * is scrolled into view automatically.
 */
export const PhaseNavigation: React.FC<{ activeTab: SubNavTab | null }> = ({ activeTab }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!scroller || !active) return;
    const left = active.offsetLeft - scroller.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < scroller.scrollLeft) scroller.scrollTo({ left: left - 8 });
    else if (right > scroller.scrollLeft + scroller.clientWidth) scroller.scrollTo({ left: right - scroller.clientWidth + 8 });
  }, [activeTab]);

  return (
    <div className="w-full">
      <div ref={scrollerRef} className="w-full overflow-x-auto scrollbar-none overscroll-x-contain snap-x">
        <nav
          aria-label="Cycle Tracker sections"
          className="flex w-max min-w-full items-center gap-0.5 sm:gap-2 p-1.5 rounded-full bg-gradient-to-r from-[#FDEFF5] via-[#FEF3F8] to-[#FFF7FB]"
        >
          {SUB_NAV_ITEMS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => navigateToTab(tab.id)}
                className={`flex-1 sm:flex-initial shrink-0 snap-start px-3 sm:px-5 lg:px-6 min-h-[44px] rounded-full text-[13px] sm:text-[15px] lg:text-base transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center ${
                  isActive
                    ? 'bg-white text-[#F43F8F] font-semibold shadow-[0_2px_8px_rgba(236,72,153,0.12)]'
                    : 'text-[#4B5563] font-medium hover:text-[#17152B] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
