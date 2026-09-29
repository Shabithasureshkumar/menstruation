/** The patient whose cycle is being tracked. */
export interface Patient {
  id: string;
  name: string;
  ageYears: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  avatarUrl: string | null;
}

/** The signed-in account (e.g. a clinician). Never labelled as the patient. */
export interface CurrentUser {
  id: string;
  name: string;
  role: 'Clinician' | 'Patient' | 'Administrator';
  avatarUrl: string | null;
}

export function getBmi(patient: Pick<Patient, 'heightCm' | 'weightKg'>): number | null {
  if (patient.heightCm <= 0 || patient.weightKg <= 0) return null;
  const m = patient.heightCm / 100;
  return Math.round((patient.weightKg / (m * m)) * 10) / 10;
}
