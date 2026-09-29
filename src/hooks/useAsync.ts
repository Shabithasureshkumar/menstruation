import { useCallback, useEffect, useState } from 'react';
import type { DependencyList } from 'react';

export type AsyncStatus = 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  /** Latest successful result (kept while a refetch is in flight). */
  data: T | null;
  error: unknown;
  /** True once any request has succeeded, so refetches don't blank the screen. */
  hasLoaded: boolean;
}

/**
 * Runs `load` whenever `deps` change or `retry` is called. Results from
 * superseded runs are ignored, so a slow response can never overwrite a newer one.
 */
export function useAsync<T>(load: () => Promise<T>, deps: DependencyList): AsyncState<T> & { retry: () => void } {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading', data: null, error: null, hasLoaded: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    load().then(
      (data) => {
        if (active) setState({ status: 'success', data, error: null, hasLoaded: true });
      },
      (error: unknown) => {
        if (active) setState((prev) => ({ ...prev, status: 'error', error }));
      },
    );
    return () => {
      active = false;
    };
    // `load` is intentionally excluded: callers pass the values it depends on in `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
