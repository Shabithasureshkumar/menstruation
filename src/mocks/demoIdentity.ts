/**
 * DEMO FIXTURE — not real people.
 *
 * Stands in for `GET /me` and `GET /patients/{id}` until the backend exists.
 * The UI shows a "Demo data" badge wherever these values are displayed.
 */
import patientAvatar from '../assets/patient-avatar.webp';
import doctorAvatar from '../assets/doctor-avatar.png';
import type { CurrentUser, Patient } from '../types/identity';

export const demoPatient: Patient = {
  id: 'PT-10248',
  name: 'Jimmy Alexa',
  ageYears: 38,
  gender: 'Female',
  heightCm: 165,
  weightKg: 58,
  avatarUrl: patientAvatar,
};

export const demoCurrentUser: CurrentUser = {
  id: 'CL-2001',
  name: 'David Brock',
  role: 'Clinician',
  avatarUrl: doctorAvatar,
};
