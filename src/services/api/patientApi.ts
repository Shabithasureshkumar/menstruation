import type { CurrentUser, Patient } from '../../types/identity';
import { API_MODE } from './config';
import { demoPatientApi } from '../demo/demoPatientApi';
import { httpPatientApi } from './http/httpPatientApi';

export interface MeResult {
  user: CurrentUser;
  patient: Patient;
}

/** Identity of the signed-in user and the patient in view. See docs/API_CONTRACT.md: GET /me. */
export interface PatientApi {
  getMe(signal?: AbortSignal): Promise<MeResult>;
}

export const patientApi: PatientApi = API_MODE === 'http' ? httpPatientApi : demoPatientApi;
