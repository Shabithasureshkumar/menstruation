import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  BloodColor,
  BloodFlow,
  CalendarDay,
  ConnectedDevice,
  CrampSeverity,
  DailyLogState,
  ProductsUsed,
  QuickLogType,
  SymptomKey,
  WellnessMetricsData,
} from '../types/dailyLog';
import {
  defaultDailyLogState,
  initialCalendarDays,
  initialConnectedDevices,
} from '../data/dailyLogData';

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export function useDailyLog() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-21');
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>(initialCalendarDays);
  const [logState, setLogState] = useState<DailyLogState>(defaultDailyLogState);
  const [devices, setDevices] = useState<ConnectedDevice[]>(initialConnectedDevices);
  
  // Modals state
  const [isEditWellnessOpen, setIsEditWellnessOpen] = useState(false);
  const [isSymptomTrendsOpen, setIsSymptomTrendsOpen] = useState(false);
  const [quickLogModalType, setQuickLogModalType] = useState<QuickLogType | null>(null);

  // Toast state & timer refs
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });
  const toastTimerRef = useRef<number | null>(null);
  const syncTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ show: true, message, type });
    toastTimerRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  }, []);

  const hideToast = useCallback(() => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  // Calendar Navigation
  const selectDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    const day = calendarDays.find((d) => d.dateStr === dateStr);
    if (day) {
      const getDynamicAiInsight = (cd: number) => {
        if (cd <= 2) {
          return {
            title: `Day ${cd} of your period`,
            description:
              'Moderate flow with mild cramps is completely normal. Stay hydrated, get iron-rich foods, and prioritise rest today.',
          };
        }
        if (cd <= 5) {
          return {
            title: `Day ${cd} of your period`,
            description:
              'Flow is expected to lighten. Energy levels will begin gradually rebounding as estrogen rises.',
          };
        }
        if (cd >= 12 && cd <= 16) {
          return {
            title: 'Fertile Window / Ovulation',
            description:
              'Estrogen and LH peak during this window. High energy and optimal endurance for workouts.',
          };
        }
        return {
          title: `Cycle Day ${cd} – ${day.phase}`,
          description:
            'Hormone levels are steadying. Maintain regular hydration and consistent sleep routines.',
        };
      };

      const getDynamicInsights = (cd: number) => {
        if (cd <= 2) {
          return [
            `You are on your period day ${cd}.`,
            "It's normal to feel low energy.",
            'Stay hydrated and take rest.',
            'Light exercise like walking may help with cramps.',
          ];
        }
        if (cd <= 5) {
          return [
            `You are on your period day ${cd}.`,
            'Flow is tapering off.',
            'Mild stretches help relax pelvic muscles.',
            'Maintain nutrient-dense meals.',
          ];
        }
        return [
          `Cycle Day ${cd} in ${day.phase}.`,
          'Metabolic rate is balanced.',
          'Great window for regular activities.',
          'Keep tracking daily wellness.',
        ];
      };

      setLogState((prev) => ({
        ...prev,
        dateStr: day.dateStr,
        formattedDate: `${day.isToday ? 'Today, ' : ''}${day.dayNumber} ${day.monthName} 2026`,
        cycleDay: day.cycleDay,
        phase: day.phase,
        aiInsight: getDynamicAiInsight(day.cycleDay),
        insights: getDynamicInsights(day.cycleDay),
      }));
    }
  }, [calendarDays]);

  const goToToday = useCallback(() => {
    selectDate('2026-06-21');
    showToast('Jumped to today: 21 June 2026', 'info');
  }, [selectDate, showToast]);

  const shiftCalendarRange = useCallback((direction: 'prev' | 'next') => {
    setCalendarDays((prev) => {
      const shiftDays = direction === 'next' ? 7 : -7;
      return prev.map((day) => {
        const currentDate = new Date(day.dateStr);
        currentDate.setDate(currentDate.getDate() + shiftDays);
        const newDateStr = currentDate.toISOString().split('T')[0];
        const newDayNum = currentDate.getDate();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newMonth = months[currentDate.getMonth()];
        const newCycleDay = ((day.cycleDay + shiftDays - 1 + 28) % 28) + 1;
        return {
          ...day,
          dateStr: newDateStr,
          dayNumber: newDayNum,
          monthName: newMonth,
          cycleDay: newCycleDay,
          isToday: newDateStr === '2026-06-21',
        };
      });
    });
  }, []);

  // Blood Flow
  const setBloodFlow = useCallback((flow: BloodFlow) => {
    setLogState((prev) => ({ ...prev, bloodFlow: flow }));
    showToast(`Blood Flow updated to ${flow}`);
  }, [showToast]);

  // Cramps
  const setCrampsSeverity = useCallback((severity: CrampSeverity) => {
    const defaultScores: Record<CrampSeverity, number> = {
      None: 0,
      Mild: 4,
      Moderate: 6,
      Severe: 9,
    };
    setLogState((prev) => ({
      ...prev,
      crampsSeverity: severity,
      crampsScore: defaultScores[severity],
    }));
  }, []);

  const setCrampsScore = useCallback((score: number) => {
    let severity: CrampSeverity = 'None';
    if (score > 0 && score <= 4) severity = 'Mild';
    else if (score > 4 && score <= 7) severity = 'Moderate';
    else if (score > 7) severity = 'Severe';

    setLogState((prev) => ({
      ...prev,
      crampsScore: score,
      crampsSeverity: severity,
    }));
  }, []);

  // Products Used
  const updateProductCount = useCallback((product: keyof ProductsUsed, delta: number) => {
    setLogState((prev) => {
      const current = prev.productsUsed[product];
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        productsUsed: {
          ...prev.productsUsed,
          [product]: next,
        },
      };
    });
  }, []);

  // Blood Color
  const setBloodColor = useCallback((color: BloodColor) => {
    setLogState((prev) => ({ ...prev, bloodColor: color }));
    showToast(`Blood Color updated to ${color}`);
  }, [showToast]);

  // Toggles
  const toggleClotsPresent = useCallback(() => {
    setLogState((prev) => {
      const next = !prev.clotsPresent;
      showToast(next ? 'Clots tracked: Yes' : 'Clots tracked: None');
      return { ...prev, clotsPresent: next };
    });
  }, [showToast]);

  const toggleMedication = useCallback(() => {
    setLogState((prev) => {
      const next = !prev.medicationActive;
      showToast(next ? 'Medication logged: Ibuprofen 400mg' : 'Medication unlogged');
      return { ...prev, medicationActive: next };
    });
  }, [showToast]);

  // Wellness Metrics
  const updateWellnessMetrics = useCallback((metrics: Partial<WellnessMetricsData>) => {
    setLogState((prev) => ({
      ...prev,
      wellnessMetrics: {
        ...prev.wellnessMetrics,
        ...metrics,
      },
    }));
    showToast('Wellness metrics saved');
  }, [showToast]);

  // Symptoms
  const updateSymptom = useCallback((key: SymptomKey, val: number) => {
    setLogState((prev) => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [key]: Math.min(10, Math.max(0, val)),
      },
    }));
  }, []);

  // Personal Notes
  const setPersonalNote = useCallback((note: string) => {
    setLogState((prev) => ({
      ...prev,
      personalNote: note.slice(0, 300),
    }));
  }, []);

  const savePersonalNote = useCallback(() => {
    showToast('Personal note saved successfully!');
  }, [showToast]);

  // Devices Sync
  const syncDevice = useCallback((deviceId: string) => {
    if (syncTimerRef.current) {
      window.clearTimeout(syncTimerRef.current);
    }

    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, isSyncing: true } : d))
    );

    syncTimerRef.current = window.setTimeout(() => {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === deviceId
            ? {
                ...d,
                isSyncing: false,
                syncedText: 'Synced · Just now',
                lastSyncedTimestamp: Date.now(),
              }
            : d
        )
      );
      showToast('Device synchronized successfully!');
    }, 900);
  }, [showToast]);

  return {
    selectedDate,
    calendarDays,
    logState,
    devices,
    toast,
    isEditWellnessOpen,
    isSymptomTrendsOpen,
    quickLogModalType,
    setIsEditWellnessOpen,
    setIsSymptomTrendsOpen,
    setQuickLogModalType,
    showToast,
    hideToast,
    selectDate,
    goToToday,
    shiftCalendarRange,
    setBloodFlow,
    setCrampsSeverity,
    setCrampsScore,
    updateProductCount,
    setBloodColor,
    toggleClotsPresent,
    toggleMedication,
    updateWellnessMetrics,
    updateSymptom,
    setPersonalNote,
    savePersonalNote,
    syncDevice,
  };
}
