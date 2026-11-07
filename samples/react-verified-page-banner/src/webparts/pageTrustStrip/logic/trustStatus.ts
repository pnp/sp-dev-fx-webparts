export type TrustStatus = "current" | "stale" | "unconfirmed";

export interface ITrustStatus {
  status: TrustStatus;
  /** Whole calendar days from the confirmed date to today. Negative when the confirmed date is in the future. */
  daysSince?: number;
  /** Inclusive last day of the review period, as YYYY-MM-DD. */
  reviewDue?: string;
}

export interface IPersonIdentity {
  id?: number;
  loginName?: string;
  email?: string;
  displayName?: string;
}

export interface ICanConfirmInput {
  columnsReady: boolean;
  canEditPage: boolean;
  currentUser?: IPersonIdentity;
  pageOwner?: IPersonIdentity;
  author?: IPersonIdentity;
}

interface ICalendarDate {
  year: number;
  month: number;
  day: number;
}

const ISO_DATE: RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;

function twoDigits(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export function formatIsoDate(year: number, month: number, day: number): string {
  return `${year}-${twoDigits(month)}-${twoDigits(day)}`;
}

export function parseIsoDate(value: string | undefined): ICalendarDate | undefined {
  if (!value) {
    return undefined;
  }
  const match = ISO_DATE.exec(value.trim());
  if (!match) {
    return undefined;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    return undefined;
  }
  return { year, month, day };
}

/**
 * SharePoint date-only columns come back as midnight UTC (`YYYY-MM-DDT00:00:00Z`).
 * The calendar date is the part before `T`.
 */
export function sharePointDateToIso(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  const separator = trimmed.indexOf("T");
  const datePart = separator >= 0 ? trimmed.substring(0, separator) : trimmed.substring(0, 10);
  const parsed = parseIsoDate(datePart);
  if (!parsed) {
    return undefined;
  }
  return formatIsoDate(parsed.year, parsed.month, parsed.day);
}

export function todayIso(now: Date = new Date()): string {
  return formatIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function addIsoDays(iso: string, days: number): string | undefined {
  const parsed = parseIsoDate(iso);
  if (!parsed || !isFinite(days)) {
    return undefined;
  }
  const next = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day));
  next.setUTCDate(next.getUTCDate() + Math.trunc(days));
  return formatIsoDate(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate());
}

function utcDayNumber(date: ICalendarDate): number {
  return Math.floor(Date.UTC(date.year, date.month - 1, date.day) / 86400000);
}

export function normalizeReviewPeriodDays(value: unknown, fallback: number = 90): number {
  const numeric = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : Number.NaN;
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  const whole = Math.floor(numeric);
  if (whole < 1) {
    return 1;
  }
  if (whole > 3650) {
    return 3650;
  }
  return whole;
}

/**
 * Green (`current`) while the number of calendar days since last confirmed is
 * within the review period, including the due day. Amber (`stale`) the day after.
 * Missing or unreadable dates are `unconfirmed`, which the strip also shows as amber.
 */
export function getTrustStatus(
  lastConfirmed: string | undefined,
  reviewPeriodDays: number,
  today: string
): ITrustStatus {
  const period = normalizeReviewPeriodDays(reviewPeriodDays);
  const todayParsed = parseIsoDate(today);
  const confirmed = sharePointDateToIso(lastConfirmed);
  const confirmedParsed = confirmed ? parseIsoDate(confirmed) : undefined;
  if (!todayParsed || !confirmed || !confirmedParsed) {
    return { status: "unconfirmed" };
  }
  const daysSince = utcDayNumber(todayParsed) - utcDayNumber(confirmedParsed);
  const reviewDue = addIsoDays(confirmed, period);
  if (daysSince <= period) {
    return { status: "current", daysSince, reviewDue };
  }
  return { status: "stale", daysSince, reviewDue };
}

export function formatDisplayDate(iso: string | undefined, locale: string = "en-US"): string | undefined {
  const confirmed = sharePointDateToIso(iso);
  const parsed = confirmed ? parseIsoDate(confirmed) : undefined;
  if (!parsed) {
    return undefined;
  }
  const local = new Date(parsed.year, parsed.month - 1, parsed.day);
  return local.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function identityKey(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function isSamePerson(left: IPersonIdentity | undefined, right: IPersonIdentity | undefined): boolean {
  if (!left || !right) {
    return false;
  }
  if (typeof left.id === "number" && typeof right.id === "number" && left.id > 0 && right.id > 0 && left.id === right.id) {
    return true;
  }
  const leftEmail = identityKey(left.email);
  const rightEmail = identityKey(right.email);
  if (leftEmail && rightEmail && leftEmail === rightEmail) {
    return true;
  }
  const leftLogin = identityKey(left.loginName);
  const rightLogin = identityKey(right.loginName);
  return !!leftLogin && leftLogin === rightLogin;
}

export function hasPersonIdentity(person: IPersonIdentity | undefined): boolean {
  if (!person) {
    return false;
  }
  if (typeof person.id === "number" && person.id > 0) {
    return true;
  }
  if (identityKey(person.loginName) || identityKey(person.email)) {
    return true;
  }
  return !!person.displayName && person.displayName.trim().length > 0;
}

/**
 * The confirm action is available to the page owner, or to the page author when
 * no owner has been saved, and to anyone who can edit the page.
 */
export function canUserConfirm(input: ICanConfirmInput): boolean {
  if (!input.columnsReady) {
    return false;
  }
  if (input.canEditPage) {
    return true;
  }
  const owner = hasPersonIdentity(input.pageOwner) ? input.pageOwner : input.author;
  return isSamePerson(input.currentUser, owner);
}
