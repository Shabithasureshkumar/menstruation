import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { patientApi } from '../services/api/patientApi';
import type { CurrentUser, Patient } from '../types/identity';
import { PatientContext } from './contexts';
import type { LoadStatus } from './contexts';

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    patientApi.getMe().then(
      ({ patient: p, user: u }) => {
        if (!active) return;
        setPatient(p);
        setCurrentUser(u);
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
  const value = useMemo(() => ({ status, patient, currentUser, retry }), [status, patient, currentUser, retry]);

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};
