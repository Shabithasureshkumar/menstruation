import type { SubNavTab } from '../types/cycleTracker';

/**
 * Minimal History-API router for the Cycle Tracker's five views.
 * Production hosting must serve index.html for these paths (SPA fallback).
 */
export const ROUTES: Record<SubNavTab, string> = {
  overview: '/overview',
  calendar: '/calendar',
  dailyLog: '/daily-log',
  insights: '/insights',
  settings: '/settings',
};

export type RouteMatch = { tab: SubNavTab } | { tab: null; path: string };

const NAVIGATE_EVENT = 'app:navigate';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBase(pathname: string): string {
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return path.replace(/\/+$/, '') || '/';
}

export function matchPath(pathname: string): RouteMatch {
  const path = stripBase(pathname);
  if (path === '/') return { tab: 'overview' };
  const entry = (Object.entries(ROUTES) as [SubNavTab, string][]).find(([, p]) => p === path);
  return entry ? { tab: entry[0] } : { tab: null, path };
}

export function getCurrentPath(): string {
  return window.location.pathname;
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  const url = `${BASE}${to}`;
  if (url === window.location.pathname) return;
  if (options.replace) window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function navigateToTab(tab: SubNavTab) {
  navigate(ROUTES[tab]);
}

export function subscribeToLocation(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  window.addEventListener(NAVIGATE_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(NAVIGATE_EVENT, callback);
  };
}
