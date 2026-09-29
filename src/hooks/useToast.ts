import { ToastContext } from '../context/contexts';
import type { ToastContextValue } from '../context/contexts';
import { useContextStrict } from './useContextStrict';

export function useToast(): ToastContextValue {
  return useContextStrict(ToastContext, 'useToast');
}
