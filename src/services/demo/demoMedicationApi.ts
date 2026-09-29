import { ApiError } from '../api/client';
import type { MedicationApi } from '../api/medicationApi';
import { createId } from '../../lib/id';
import { sanitizeMedication } from '../../lib/validation';
import { readMedications, writeMedications } from './demoStore';

/** DEMO adapter: mirrors the /medications contract on top of localStorage. */
export const demoMedicationApi: MedicationApi = {
  async list(range) {
    return readMedications().filter((m) => m.date >= range.start && m.date <= range.end);
  },
  async create(input) {
    const entry = sanitizeMedication({ ...input, id: createId('med') });
    if (!entry) throw new ApiError('validation_error', 'Some details need fixing.', 422);
    writeMedications([...readMedications(), entry]);
    return entry;
  },
  async update(id, input) {
    const items = readMedications();
    if (!items.some((m) => m.id === id)) throw new ApiError('not_found', "We couldn't find that record.", 404);
    const entry = sanitizeMedication({ ...input, id });
    if (!entry) throw new ApiError('validation_error', 'Some details need fixing.', 422);
    writeMedications(items.map((m) => (m.id === id ? entry : m)));
    return entry;
  },
  async remove(id) {
    writeMedications(readMedications().filter((m) => m.id !== id));
  },
};
