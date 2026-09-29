import type { PatientApi } from '../api/patientApi';
import { demoCurrentUser, demoPatient } from '../../mocks/demoIdentity';

/** DEMO adapter for GET /me, backed by the fixture in src/mocks/demoIdentity.ts. */
export const demoPatientApi: PatientApi = {
  async getMe() {
    return { user: demoCurrentUser, patient: demoPatient };
  },
};
