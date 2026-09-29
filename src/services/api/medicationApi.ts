import type { DateRange } from '../../types/cycle';
import type { MedicationEntry, MedicationInput } from '../../types/dailyLog';
import { API_MODE } from './config';
import { demoMedicationApi } from '../demo/demoMedicationApi';
import { httpMedicationApi } from './http/httpMedicationApi';

/**
 * Medications (a separate resource linked to logs by date). See docs/API_CONTRACT.md:
 * GET /medications?from&to, POST /medications, PATCH /medications/{id}, DELETE /medications/{id}.
 */
export interface MedicationApi {
  list(range: DateRange, signal?: AbortSignal): Promise<MedicationEntry[]>;
  create(input: MedicationInput): Promise<MedicationEntry>;
  update(id: string, input: MedicationInput): Promise<MedicationEntry>;
  remove(id: string): Promise<void>;
}

export const medicationApi: MedicationApi = API_MODE === 'http' ? httpMedicationApi : demoMedicationApi;
