import { PatientContext } from '../context/contexts';
import type { PatientContextValue } from '../context/contexts';
import { useContextStrict } from './useContextStrict';

export function usePatient(): PatientContextValue {
  return useContextStrict(PatientContext, 'usePatient');
}
