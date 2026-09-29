import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { addDays, formatDate } from '../lib/date';
import type { DateOnly } from '../lib/date';
import { dailyLogApi } from '../services/api/dailyLogApi';
import { medicationApi } from '../services/api/medicationApi';
import { toUserMessage } from '../services/api/client';
import { createEmptyLog, isLogEmpty, logsEqual } from '../types/dailyLog';
import type { DailyLogEntry, DailyLogsByDate, MedicationEntry, MedicationInput } from '../types/dailyLog';
import { useToast } from '../hooks/useToast';
import { useToday } from '../hooks/useToday';
import { Modal } from '../components/common/Modal';
import { buttonClass } from '../components/common/buttonStyles';
import { DailyLogContext } from './contexts';
import type { LoadStatus } from './contexts';

/**
 * Daily log state = saved logs (source of truth) + one editable draft for the
 * selected date.
 *
 * - Selecting a date without a saved log shows an EMPTY draft; nothing is
 *   created or written.
 * - Nothing is persisted until `saveDraft`.
 * - Selecting another date while the draft is dirty opens an "Unsaved changes"
 *   dialog (continue editing / discard / save).
 */
/** How far back logs and medications are loaded. */
const HISTORY_DAYS = 365;

export const DailyLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const today = useToday();
  const { showToast } = useToast();

  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);
  const [savedLogs, setSavedLogs] = useState<DailyLogsByDate>({});
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateOnly>(today);
  const [draft, setDraft] = useState<DailyLogEntry>(() => createEmptyLog(today));
  const [isSaving, setIsSaving] = useState(false);
  const [isMedicationPending, setIsMedicationPending] = useState(false);
  const [pendingDate, setPendingDate] = useState<DateOnly | null>(null);
  const savingRef = useRef(false);

  // Initial load (and retry).
  useEffect(() => {
    let active = true;
    // Logs can't be in the future; load the past year (the range the Calendar and Insights use).
    const range = { start: addDays(today, -HISTORY_DAYS), end: today };
    Promise.all([dailyLogApi.list(range), medicationApi.list(range)]).then(
      ([logs, meds]) => {
        if (!active) return;
        setSavedLogs(Object.fromEntries(logs.map((l) => [l.date, l])));
        setMedications(meds);
        setStatus('ready');
      },
      () => {
        if (active) setStatus('error');
      },
    );
    return () => {
      active = false;
    };
    // Loaded once per attempt; `today` rolling over at midnight doesn't need a reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const savedLog = savedLogs[selectedDate] ?? null;
  const baseline = useMemo(() => savedLog ?? createEmptyLog(selectedDate), [savedLog, selectedDate]);

  // Once saved logs arrive, show the saved version of the selected date if the draft is untouched.
  const [syncedFor, setSyncedFor] = useState<DailyLogsByDate | null>(null);
  if (status === 'ready' && syncedFor !== savedLogs) {
    setSyncedFor(savedLogs);
    if (draft.date === selectedDate && isLogEmpty(draft) && savedLog) setDraft(savedLog);
  }

  const isDirty = draft.date === selectedDate && !logsEqual(draft, baseline);
  const canEditSelectedDate = selectedDate <= today;

  // Warn before a refresh / tab close throws away unsaved edits.
  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const goToDate = useCallback(
    (date: DateOnly, logs: DailyLogsByDate) => {
      setSelectedDate(date);
      setDraft(logs[date] ?? createEmptyLog(date));
    },
    [],
  );

  const selectDate = useCallback(
    (date: DateOnly) => {
      if (date === selectedDate) return;
      if (isDirty) {
        setPendingDate(date);
        return;
      }
      goToDate(date, savedLogs);
    },
    [selectedDate, isDirty, savedLogs, goToDate],
  );

  const updateDraft = useCallback(
    (update: (d: DailyLogEntry) => DailyLogEntry) => {
      if (!canEditSelectedDate) return;
      setDraft((d) => update(d));
    },
    [canEditSelectedDate],
  );

  const discardDraft = useCallback(() => setDraft(baseline), [baseline]);

  /** Persists the draft. Returns the logs after saving, or null on failure. */
  const persistDraft = useCallback(async (): Promise<DailyLogsByDate | null> => {
    if (savingRef.current) return null;
    if (!canEditSelectedDate) {
      showToast("Future dates can't be logged.", 'warning');
      return null;
    }
    savingRef.current = true;
    setIsSaving(true);
    try {
      const next = { ...savedLogs };
      if (isLogEmpty(draft)) {
        // Saving a cleared log removes it rather than storing an empty record.
        if (savedLog) await dailyLogApi.remove(draft.date);
        delete next[draft.date];
        setDraft(createEmptyLog(draft.date));
      } else {
        const stored = savedLog ? await dailyLogApi.update(draft) : await dailyLogApi.create(draft);
        next[stored.date] = stored;
        setDraft(stored);
      }
      setSavedLogs(next);
      return next;
    } catch (error) {
      showToast(`${toUserMessage(error, 'Could not save your log.')} Your changes are still here.`, 'error');
      return null;
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [canEditSelectedDate, savedLogs, draft, savedLog, showToast]);

  const saveDraft = useCallback(async () => {
    const hadLog = savedLog !== null;
    const result = await persistDraft();
    if (result) {
      showToast(result[draft.date] ? 'Log saved' : hadLog ? 'Log cleared' : 'Nothing to save', 'success');
    }
    return result !== null;
  }, [persistDraft, savedLog, draft.date, showToast]);

  const deleteSavedLog = useCallback(async () => {
    if (!savedLog || savingRef.current) return false;
    savingRef.current = true;
    setIsSaving(true);
    try {
      await dailyLogApi.remove(savedLog.date);
      const next = { ...savedLogs };
      delete next[savedLog.date];
      setSavedLogs(next);
      setDraft(createEmptyLog(savedLog.date));
      showToast(`Log for ${formatDate(savedLog.date, 'long')} deleted`, 'info');
      return true;
    } catch {
      showToast('Could not delete the log. Please try again.', 'error');
      return false;
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [savedLog, savedLogs, showToast]);

  // ---- unsaved-changes dialog ----
  const cancelPending = () => setPendingDate(null);
  const discardAndContinue = () => {
    if (pendingDate) goToDate(pendingDate, savedLogs);
    setPendingDate(null);
  };
  const saveAndContinue = async () => {
    const target = pendingDate;
    const logs = await persistDraft();
    if (!logs || !target) return;
    showToast('Log saved', 'success');
    goToDate(target, logs);
    setPendingDate(null);
  };

  // ---- medications ----
  const runMedication = useCallback(
    async (action: () => Promise<void>, success: string, failure: string) => {
      if (isMedicationPending) return false;
      setIsMedicationPending(true);
      try {
        await action();
        showToast(success, 'success');
        return true;
      } catch {
        showToast(failure, 'error');
        return false;
      } finally {
        setIsMedicationPending(false);
      }
    },
    [isMedicationPending, showToast],
  );

  const addMedication = useCallback(
    (input: MedicationInput) =>
      runMedication(
        async () => {
          const created = await medicationApi.create(input);
          setMedications((list) => [...list, created]);
        },
        `Logged ${input.name}`,
        'Could not save the medication. Please try again.',
      ),
    [runMedication],
  );

  const updateMedication = useCallback(
    (id: string, input: MedicationInput) =>
      runMedication(
        async () => {
          const updated = await medicationApi.update(id, input);
          setMedications((list) => list.map((m) => (m.id === id ? updated : m)));
        },
        `Updated ${input.name}`,
        'Could not update the medication. Please try again.',
      ),
    [runMedication],
  );

  const removeMedication = useCallback(
    (id: string) =>
      runMedication(
        async () => {
          await medicationApi.remove(id);
          setMedications((list) => list.filter((m) => m.id !== id));
        },
        'Medication removed',
        'Could not remove the medication. Please try again.',
      ),
    [runMedication],
  );

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }, []);

  const value = useMemo(
    () => ({
      status,
      retry,
      savedLogs,
      selectedDate,
      draft,
      savedLog,
      isDirty,
      canEditSelectedDate,
      isSaving,
      selectDate,
      updateDraft,
      discardDraft,
      saveDraft,
      deleteSavedLog,
      medications,
      isMedicationPending,
      addMedication,
      updateMedication,
      removeMedication,
    }),
    [
      status, retry, savedLogs, selectedDate, draft, savedLog, isDirty, canEditSelectedDate, isSaving,
      selectDate, updateDraft, discardDraft, saveDraft, deleteSavedLog, medications, isMedicationPending,
      addMedication, updateMedication, removeMedication,
    ],
  );

  return (
    <DailyLogContext.Provider value={value}>
      {children}
      <Modal
        isOpen={pendingDate !== null}
        onClose={cancelPending}
        role="alertdialog"
        size="sm"
        icon={<AlertTriangle className="w-5 h-5" />}
        title="Unsaved changes"
        description={`Your log for ${formatDate(selectedDate, 'long')} has changes that haven't been saved.`}
        footer={
          <>
            <button type="button" onClick={cancelPending} className={buttonClass.secondary} data-autofocus>
              Continue editing
            </button>
            <button type="button" onClick={discardAndContinue} className={buttonClass.secondary}>
              Discard changes
            </button>
            <button type="button" onClick={saveAndContinue} disabled={isSaving} className={buttonClass.primary}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </>
        }
      >
        <p className="text-sm text-[#4A5568]">
          Save them before opening {pendingDate ? formatDate(pendingDate, 'long') : 'another date'}, or discard them.
        </p>
      </Modal>
    </DailyLogContext.Provider>
  );
};
