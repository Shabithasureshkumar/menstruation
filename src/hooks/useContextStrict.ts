import { useContext } from 'react';
import type { Context } from 'react';

/** Reads a context and fails loudly if its provider is missing. */
export function useContextStrict<T>(context: Context<T | null>, name: string): T {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`${name} must be used within its provider`);
  }
  return value;
}
