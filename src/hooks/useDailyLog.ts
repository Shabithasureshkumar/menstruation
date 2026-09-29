import { DailyLogContext } from '../context/contexts';
import type { DailyLogContextValue } from '../context/contexts';
import { useContextStrict } from './useContextStrict';

export function useDailyLog(): DailyLogContextValue {
  return useContextStrict(DailyLogContext, 'useDailyLog');
}
