import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { settingsApi } from '../services/api/settingsApi';
import { DEFAULT_SETTINGS } from '../types/settings';
import type { JourneyType, SettingsState } from '../types/settings';
import { useToast } from '../hooks/useToast';
import { useToday } from '../hooks/useToday';
import { SettingsContext } from './contexts';
import type { LoadStatus } from './contexts';

/** App-wide settings: every page reads the same values through `useSettings()`. */
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const today = useToday();
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [attempt, setAttempt] = useState(0);
  // Latest committed settings, so concurrent updates build on each other.
  const latestRef = useRef<SettingsState>(DEFAULT_SETTINGS);

  useEffect(() => {
    let active = true;
    settingsApi.get().then(
      (loaded) => {
        if (!active) return;
        latestRef.current = loaded;
        setSettings(loaded);
        setStatus('ready');
      },
      () => {
        if (active) setStatus('error');
      },
    );
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }, []);

  const update = useCallback(
    async (patch: Partial<SettingsState>) => {
      const previous = latestRef.current;
      const next = { ...previous, ...patch };
      latestRef.current = next;
      setSettings(next);
      try {
        const saved = await settingsApi.save(next);
        if (latestRef.current === next) {
          latestRef.current = saved;
          setSettings(saved);
        }
        return true;
      } catch {
        if (latestRef.current === next) {
          latestRef.current = previous;
          setSettings(previous);
        }
        showToast('Could not save your settings. Please try again.', 'error');
        return false;
      }
    },
    [showToast],
  );

  const setJourney = useCallback(
    (journey: JourneyType) => {
      if (journey === latestRef.current.journeyType) return Promise.resolve(true);
      return update({ journeyType: journey, journeyStartedOn: today });
    },
    [update, today],
  );

  const value = useMemo(
    () => ({ status, settings, retry, update, setJourney }),
    [status, settings, retry, update, setJourney],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
