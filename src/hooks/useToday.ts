import { TodayContext } from '../context/contexts';
import { useContextStrict } from './useContextStrict';

/** The current local date (YYYY-MM-DD). Updates automatically at midnight. */
export function useToday(): string {
  return useContextStrict(TodayContext, 'useToday');
}
