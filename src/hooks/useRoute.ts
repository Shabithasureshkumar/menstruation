import { useSyncExternalStore } from 'react';
import { getCurrentPath, matchPath, subscribeToLocation } from '../lib/router';
import type { RouteMatch } from '../lib/router';

/** Current route, updated on navigation and browser back/forward. */
export function useRoute(): RouteMatch {
  const path = useSyncExternalStore(subscribeToLocation, getCurrentPath);
  return matchPath(path);
}
