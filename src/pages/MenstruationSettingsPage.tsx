import React, { useState } from 'react';
import { Bell, ChevronRight, Clock, Heart, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import settingsCalendarImg from '../assets/settings-calendar.png';
import { isPreventingPregnancy, isTryingToConceive } from '../types/settings';
import { useSettings } from '../hooks/useSettings';
import { useToast } from '../hooks/useToast';
import { ErrorState, LoadingState } from '../components/common/AsyncState';
import { SettingRow } from '../components/settings/SettingRow';
import { LeadDaysPicker } from '../components/settings/LeadDaysPicker';
import { ManageJourneyModal } from '../components/settings/ManageJourneyModal';
import { JourneyIcon } from '../components/settings/JourneyIcon';
import { getJourneyOption } from '../components/settings/JourneyOptions';

const SettingsCard: React.FC<{ title: string; icon: ReactNode; iconClass: string; children: ReactNode }> = ({
  title,
  icon,
  iconClass,
  children,
}) => (
  <section className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#F1DDE8]/80 shadow-[0_4px_20px_rgba(23,21,43,0.03)] space-y-5 h-full flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`} aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#17152B] tracking-tight">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  </section>
);

export const MenstruationSettingsPage: React.FC = () => {
  const { settings, status, retry, update, setJourney } = useSettings();
  const { showToast } = useToast();
  const [journeyOpen, setJourneyOpen] = useState(false);

  if (status === 'loading') return <LoadingState label="Loading settings" rows={4} />;
  if (status === 'error') return <ErrorState message="We couldn't load your settings." onRetry={retry} />;

  const journey = getJourneyOption(settings.journeyType);

  const changeJourney = async (next: typeof settings.journeyType) => {
    const ok = await setJourney(next);
    if (ok) showToast(`Journey set to "${getJourneyOption(next).title}"`);
    return ok;
  };

  return (
    <div className="w-full space-y-7 sm:space-y-8 pb-8 animate-fade-in text-left">
      {/* Health Journey Settings */}
      <section aria-labelledby="journey-title" className="space-y-2">
        <div>
          <h2 id="journey-title" className="text-xl sm:text-2xl font-bold text-[#17152B] tracking-tight">
            Health Journey Settings
          </h2>
          <p className="text-xs sm:text-sm text-[#68708A] font-medium mt-0.5">Manage your journey and life stages</p>
        </div>

        <div className="w-full bg-white rounded-[24px] p-6 sm:p-7 md:p-8 border border-[#F1DDE8]/80 shadow-[0_4px_20px_rgba(23,21,43,0.03)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mt-3">
          <div className="space-y-4 flex-1 min-w-0 w-full max-w-xl">
            <span className="text-[0.68rem] font-bold text-[#68708A] uppercase tracking-wider block">CURRENT JOURNEY</span>
            <div className="flex items-start sm:items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${journey.accentGradient} p-0.5 flex items-center justify-center shrink-0 shadow-md`}>
                <div className="w-full h-full bg-white/10 rounded-[14px] flex items-center justify-center text-white">
                  <JourneyIcon icon={journey.icon} className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#17152B] tracking-tight">{journey.title}</h3>
                <p className="text-xs sm:text-[0.84rem] text-[#68708A] font-medium leading-relaxed">{journey.description}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" aria-hidden="true" />
                <span className="text-xs font-bold text-[#15803D]">Currently Active</span>
              </div>
              <span className="text-xs text-[#68708A] font-medium">
                {settings.journeyStartedOn ? `Since Jul 5` : 'Since Jul 5'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setJourneyOpen(true)}
              aria-haspopup="dialog"
              className="w-full min-h-[44px] px-4 rounded-xl bg-[#F5F0FF] hover:bg-[#EDE5FF] text-[#6C5CE7] text-xs sm:text-sm font-bold tracking-tight transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <span>Manage Journey</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="w-44 h-44 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center relative">
            <img
              src={settingsCalendarImg}
              alt=""
              width={220}
              height={220}
              loading="lazy"
              className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-md select-none"
            />
          </div>
        </div>
      </section>

      {/* Settings & Preferences */}
      <section aria-labelledby="preferences-title" className="space-y-2 pt-1">
        <div>
          <h2 id="preferences-title" className="text-xl sm:text-2xl font-bold text-[#17152B] tracking-tight">
            Settings & Preferences
          </h2>
          <p className="text-xs sm:text-sm text-[#68708A] font-medium mt-0.5">Manage your wellness experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch w-full mt-3">
          {/* Top Left: Privacy */}
          <SettingsCard title="Privacy" icon={<Lock className="w-4.5 h-4.5" />} iconClass="bg-[#FFF0F6] text-[#F43F8F]">
            <SettingRow
              label="End-to-end encryption"
              description="Protect health data"
              checked={true}
              onChange={() => showToast('End-to-end encryption is active for your account', 'info')}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Share with provider"
              description="Anonymized insights"
              checked={settings.shareWithProvider}
              onChange={(v) => update({ shareWithProvider: v })}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Research participation"
              description="Contribute to studies"
              checked={settings.researchParticipation}
              onChange={(v) => update({ researchParticipation: v })}
            />
          </SettingsCard>

          {/* Top Right: Reminder Preferences */}
          <SettingsCard title="Reminder Preferences" icon={<Clock className="w-4.5 h-4.5" />} iconClass="bg-[#FEF3C7] text-[#D97706]">
            <SettingRow
              label="Medication reminders"
              description="Birth control pill"
              checked={settings.medicationReminders}
              onChange={(v) => update({ medicationReminders: v })}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Water intake"
              description="Every 2 hours"
              checked={settings.waterReminders}
              onChange={(v) => update({ waterReminders: v })}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Wellness Activity"
              description="Weekly summary"
              checked={settings.wellnessReminders}
              onChange={(v) => update({ wellnessReminders: v })}
            />
          </SettingsCard>

          {/* Bottom Left: Notifications */}
          <SettingsCard title="Notifications" icon={<Bell className="w-4.5 h-4.5" />} iconClass="bg-[#FFF0F6] text-[#F43F8F]">
            <div className="space-y-3">
              <SettingRow
                label="Period reminders"
                description="Alert 2 days before"
                checked={settings.periodReminders}
                onChange={(v) => update({ periodReminders: v })}
              />
              <LeadDaysPicker
                label="Remind me"
                value={settings.periodReminderDaysBefore}
                onChange={(d) => update({ periodReminderDaysBefore: d })}
              />
            </div>
            <hr className="border-[#F1DDE8]/60 my-3" />
            <div className="space-y-3">
              <SettingRow
                label="Ovulation alerts"
                description="Notify on fertile window"
                checked={settings.ovulationReminders}
                onChange={(v) => update({ ovulationReminders: v })}
              />
              <LeadDaysPicker
                label="Remind me"
                value={settings.ovulationReminderDaysBefore}
                onChange={(d) => update({ ovulationReminderDaysBefore: d })}
              />
            </div>
          </SettingsCard>

          {/* Bottom Right: Fertility Goals */}
          <SettingsCard title="Fertility Goals" icon={<Heart className="w-4.5 h-4.5 fill-[#16A34A] stroke-none" />} iconClass="bg-[#DCFCE7] text-[#16A34A]">
            <SettingRow
              label="Trying to conceive"
              description="Track ovulation closely"
              checked={isTryingToConceive(settings)}
              onChange={(v) => changeJourney(v ? 'trying_to_conceive' : 'cycle_tracking')}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Intercourse Tracking"
              description="Tracking across all cycle phases"
              checked={settings.intercourseTracking}
              onChange={(v) => update({ intercourseTracking: v })}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Cycle regularity"
              description="Monitor patterns"
              checked={settings.cycleRegularity}
              onChange={(v) => update({ cycleRegularity: v })}
            />
            <hr className="border-[#F1DDE8]/60 my-2" />
            <SettingRow
              label="Pregnancy prevention"
              description="Avoid fertile window"
              checked={isPreventingPregnancy(settings)}
              onChange={(v) => changeJourney(v ? 'pregnancy_prevention' : 'cycle_tracking')}
            />
          </SettingsCard>
        </div>
      </section>

      <ManageJourneyModal
        isOpen={journeyOpen}
        current={settings.journeyType}
        onClose={() => setJourneyOpen(false)}
        onSave={changeJourney}
      />
    </div>
  );
};
