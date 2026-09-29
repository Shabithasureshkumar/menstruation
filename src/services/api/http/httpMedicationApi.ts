import { apiRequest } from '../client';
import type { MedicationApi } from '../medicationApi';
import type { ListResponseDto, MedicationDto } from '../dto';
import { fromMedicationDto, toMedicationWriteDto } from '../mappers';

/** HTTP implementation of MedicationApi (not active while API_MODE is 'demo'). */
export const httpMedicationApi: MedicationApi = {
  async list(range, signal) {
    const res = await apiRequest<ListResponseDto<MedicationDto>>('/medications', { query: { from: range.start, to: range.end }, signal });
    return res.items.map(fromMedicationDto);
  },
  async create(input) {
    return fromMedicationDto(await apiRequest<MedicationDto>('/medications', { method: 'POST', body: toMedicationWriteDto(input) }));
  },
  async update(id, input) {
    return fromMedicationDto(
      await apiRequest<MedicationDto>(`/medications/${encodeURIComponent(id)}`, { method: 'PATCH', body: toMedicationWriteDto(input) }),
    );
  },
  async remove(id) {
    await apiRequest<void>(`/medications/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};
