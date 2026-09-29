import { apiRequest } from '../client';
import type { PatientApi } from '../patientApi';
import type { MeResponseDto } from '../dto';
import { fromMeDto } from '../mappers';

/** HTTP implementation of PatientApi (not active while API_MODE is 'demo'). */
export const httpPatientApi: PatientApi = {
  async getMe(signal) {
    return fromMeDto(await apiRequest<MeResponseDto>('/me', { signal }));
  },
};
