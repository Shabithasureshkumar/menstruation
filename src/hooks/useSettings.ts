import { SettingsContext } from '../context/contexts';
import type { SettingsContextValue } from '../context/contexts';
import { useContextStrict } from './useContextStrict';

export function useSettings(): SettingsContextValue {
  return useContextStrict(SettingsContext, 'useSettings');
}
