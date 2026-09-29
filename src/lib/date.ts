/**
 * Date-only helpers. Every calendar date in the app is a `YYYY-MM-DD` string
 * interpreted in the user's local time zone.
 *
 * Never use `new Date('YYYY-MM-DD')`: the ISO date-only form is parsed as UTC
 * midnight, which lands on the previous day in time zones west of UTC.
 */

export type DateOnly = string;

const DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Formats a local Date as `YYYY-MM-DD` using its local calendar fields. */
export function formatDateOnly(date: Date): DateOnly {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Builds a date-only string from local calendar parts (monthIndex is 0-based). */
export function toDateOnly(year: number, monthIndex: number, day: number): DateOnly {
  return formatDateOnly(new Date(year, monthIndex, day));
}

/** True when the value is a real calendar date in `YYYY-MM-DD` form. */
export function isValidDateOnly(value: unknown): value is DateOnly {
  if (typeof value !== 'string') return false;
  const m = DATE_ONLY_RE.exec(value);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
}

/** Parses `YYYY-MM-DD` into a local Date at 12:00 (noon avoids DST edge cases). */
export function parseDateOnly(value: DateOnly): Date {
  const m = DATE_ONLY_RE.exec(value);
  if (!m) throw new Error(`Invalid date-only value: ${value}`);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
}

export function getToday(): DateOnly {
  return formatDateOnly(new Date());
}

export function isToday(value: DateOnly, today: DateOnly = getToday()): boolean {
  return value === today;
}

export function addDays(value: DateOnly, days: number): DateOnly {
  const d = parseDateOnly(value);
  d.setDate(d.getDate() + days);
  return formatDateOnly(d);
}

/** Whole days from `from` to `to` (positive when `to` is later). */
export function diffDays(from: DateOnly, to: DateOnly): number {
  const a = parseDateOnly(from);
  const b = parseDateOnly(to);
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / 86_400_000);
}

export function compareDateOnly(a: DateOnly, b: DateOnly): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function getDateParts(value: DateOnly) {
  const d = parseDateOnly(value);
  return { year: d.getFullYear(), monthIndex: d.getMonth(), day: d.getDate(), weekday: d.getDay() };
}

export type DateFormat = 'long' | 'medium' | 'short' | 'weekday-long' | 'month-year';

/** Human-readable formatting of a date-only value. */
export function formatDate(value: DateOnly, format: DateFormat = 'medium'): string {
  const { year, monthIndex, day, weekday } = getDateParts(value);
  switch (format) {
    case 'long':
      return `${MONTHS_LONG[monthIndex]} ${day}, ${year}`;
    case 'short':
      return `${MONTHS_SHORT[monthIndex]} ${day}`;
    case 'weekday-long':
      return `${WEEKDAYS_LONG[weekday]}, ${MONTHS_LONG[monthIndex]} ${day}, ${year}`;
    case 'month-year':
      return `${MONTHS_LONG[monthIndex]} ${year}`;
    case 'medium':
    default:
      return `${MONTHS_SHORT[monthIndex]} ${day}, ${year}`;
  }
}

export function getMonthShort(monthIndex: number): string {
  return MONTHS_SHORT[monthIndex];
}

export function getMonthLong(monthIndex: number): string {
  return MONTHS_LONG[monthIndex];
}

/** Milliseconds until the next local midnight (used to roll "today" over). */
export function msUntilNextMidnight(now: Date = new Date()): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  return next.getTime() - now.getTime();
}

/** Month arithmetic on (year, 0-based monthIndex) pairs, e.g. for calendar paging. */
export function addMonths(year: number, monthIndex: number, delta: number): { year: number; monthIndex: number } {
  const d = new Date(year, monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
}

/**
 * ISO 8601 datetime with the local UTC offset, e.g. `2026-09-22T08:30:00+05:30`.
 * This is the only datetime format sent to the API; Date objects are never sent directly.
 */
export function toIsoDateTime(date: Date = new Date()): string {
  const offsetMin = -date.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  return (
    `${formatDateOnly(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
}

/** Current local time as `HH:mm`. */
export function getCurrentTime(date: Date = new Date()): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && TIME_RE.test(value);
}

/** Formats `HH:mm` (24h) as a localized 12h label, e.g. `08:00 AM`. */
export function formatTime(value: string): string {
  const m = TIME_RE.exec(value);
  if (!m) return value;
  const h = Number(m[1]);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${m[2]} ${suffix}`;
}
