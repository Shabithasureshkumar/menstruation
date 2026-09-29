import React, { useState } from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import doctorAvatar from '../../assets/doctor-avatar.png';
import { navigateToTab } from '../../lib/router';
import { usePatient } from '../../hooks/usePatient';
import { useNotifications } from '../../hooks/useNotifications';
import { useToast } from '../../hooks/useToast';
import { TOP_NAV_ITEMS } from './navItems';
import { MobileNavDrawer } from './MobileNavDrawer';
import { SearchDialog } from './SearchDialog';
import { NotificationsDialog } from './NotificationsDialog';

/** 44×44 hit area around a smaller circular visual. */
const iconButton =
  'group w-11 h-11 shrink-0 flex items-center justify-center rounded-full cursor-pointer';
/** Reference style: search sits in a soft grey disc; settings and bell are bare filled icons. */
const discVisual =
  'relative w-10 h-10 rounded-full bg-[#ECEDF1] group-hover:bg-[#E2E4EA] text-[#17152B] flex items-center justify-center transition-colors';
const bareVisual =
  'relative w-9 h-9 rounded-full group-hover:bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center transition-colors';

export const TopHeader: React.FC = () => {
  const { currentUser } = usePatient();
  const notifications = useNotifications();
  const { showToast } = useToast();
  const [openDialog, setOpenDialog] = useState<'menu' | 'search' | 'notifications' | null>(null);
  const close = () => setOpenDialog(null);

  const handleModule = (label: string, available: boolean) => {
    if (available) navigateToTab('overview');
    else showToast(`${label} isn't available in this build yet.`, 'info');
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="w-full max-w-none mx-0 px-4 sm:px-6 lg:px-8 xl:px-10 h-[60px] sm:h-[64px] min-[1100px]:h-[84px] flex items-center gap-1 sm:gap-3">
        {/* < 1100px: hamburger */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={openDialog === 'menu'}
          onClick={() => setOpenDialog('menu')}
          className={`${iconButton} min-[1100px]:hidden`}
        >
          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FAF8FA] group-hover:bg-gray-100 text-[#17152B] flex items-center justify-center transition-colors border border-[#F1DDE8]/70 shadow-2xs">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
            </svg>
          </span>
        </button>

        {/* >= 1100px: module navigation */}
        <nav aria-label="Modules" className="hidden min-[1100px]:flex items-center min-w-0">
          <div className="flex items-center gap-1 p-1.5 bg-white rounded-full border border-[#F1F1F4] shadow-[0_2px_10px_rgba(23,21,43,0.03)]">
            {TOP_NAV_ITEMS.map((item) => {
              const isActive = item.id === 'dashboard';
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={item.available ? undefined : true}
                  title={item.available ? undefined : 'Not available in this build yet'}
                  onClick={() => handleModule(item.label, item.available)}
                  className={`flex items-center gap-2.5 min-h-[44px] rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'px-6 bg-gradient-to-r from-[#5B4BE0] to-[#9384F5] text-white shadow-[0_6px_16px_rgba(91,75,224,0.28)]'
                      : 'px-[18px] text-[#17152B] hover:bg-[#F6F5FB]'
                  }`}
                >
                  {item.id === 'dashboard' && (
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="3" y="3" width="8" height="8" rx="2" />
                      <rect x="13" y="3" width="8" height="8" rx="2" />
                      <rect x="3" y="13" width="8" height="8" rx="2" />
                      <rect x="13" y="13" width="8" height="8" rx="2" />
                    </svg>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-0 sm:gap-1 min-w-0 ml-auto">
          <button
            type="button"
            aria-label="Search"
            aria-haspopup="dialog"
            onClick={() => setOpenDialog('search')}
            className={iconButton}
          >
            <span className={discVisual}>
              <Search className="w-[18px] h-[18px]" strokeWidth={2.4} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            aria-label="Settings"
            onClick={() => navigateToTab('settings')}
            className={`${iconButton} hidden min-[1100px]:flex`}
          >
            <span className={bareVisual}>
              <Settings className="w-5 h-5 fill-current stroke-white" strokeWidth={1.6} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            aria-label={notifications.length > 0 ? `Notifications, ${notifications.length} new` : 'Notifications'}
            aria-haspopup="dialog"
            onClick={() => setOpenDialog('notifications')}
            className={iconButton}
          >
            <span className={bareVisual}>
              <Bell className="w-5 h-5 fill-current" aria-hidden="true" />
              {notifications.length > 0 && (
                <span aria-hidden="true" className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F43F8F] ring-2 ring-white" />
              )}
            </span>
          </button>

          {/* Doctor / User profile: always visible at every width */}
          <div className="flex items-center gap-2 sm:gap-2.5 pl-1.5 sm:pl-3 min-[1100px]:pl-5 ml-0.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-purple-100 border-2 border-white shadow-xs shrink-0 flex items-center justify-center">
              <img
                src={currentUser?.avatarUrl ?? doctorAvatar}
                alt={currentUser?.name ?? 'David Brock'}
                width={40}
                height={40}
                className="w-full h-full object-cover object-top select-none"
              />
            </div>
            <div className="text-left leading-tight min-w-0">
              <p
                className="text-xs sm:text-[13px] min-[1100px]:text-sm font-bold text-[#17152B] leading-none truncate max-w-[92px] min-[360px]:max-w-[120px] sm:max-w-[180px]"
                title={currentUser?.name ?? 'David Brock'}
              >
                {currentUser?.name ?? 'David Brock'}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#8A92A6] font-medium mt-0.5 tracking-tight whitespace-nowrap">
                General Physician
              </p>
            </div>
          </div>
        </div>
      </div>

      <MobileNavDrawer isOpen={openDialog === 'menu'} onClose={close} onModule={handleModule} />
      <SearchDialog isOpen={openDialog === 'search'} onClose={close} />
      <NotificationsDialog isOpen={openDialog === 'notifications'} onClose={close} notifications={notifications} />
    </header>
  );
};
