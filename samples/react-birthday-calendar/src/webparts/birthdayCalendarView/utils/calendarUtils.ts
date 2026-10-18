import type { IBirthday } from '../models/IBirthday';

export interface ICalendarCell {
  date: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  birthdays: IBirthday[];
}

export interface IUpcomingBirthday {
  birthday: IBirthday;
  /** The next calendar date this birthday falls on, at local midnight. */
  date: Date;
  /** Whole days from today; 0 means today. */
  daysAway: number;
}

/** Number of birthday pill colours available; see the .accent* rules in the stylesheet. */
export const ACCENT_COUNT: number = 4;

/**
 * Picks a pill colour for a person. Derived from the name so it is stable across
 * renders, across the calendar and the "Coming up" strip, and independent of list
 * ordering or item ids.
 */
export function getAccentIndex(name: string): number {
  let hash: number = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % ACCENT_COUNT;
}

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 * Maps a stored birthday onto a day that actually exists in the given year.
 * Only 29 February needs this: in common years those birthdays share the 28th
 * rather than disappearing for three years at a time.
 */
export function resolveDayInYear(month: number, day: number, year: number): number {
  if (month === 1 && day === 29 && !isLeapYear(year)) {
    return 28;
  }
  return day;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Groups the birthdays that fall in `month`, keyed by the day cell they belong in. */
export function groupBirthdaysByDay(
  birthdays: IBirthday[],
  year: number,
  month: number
): Map<number, IBirthday[]> {
  const map: Map<number, IBirthday[]> = new Map();

  for (const bday of birthdays) {
    if (bday.month !== month) {
      continue;
    }
    const day: number = resolveDayInYear(bday.month, bday.day, year);
    const list: IBirthday[] = map.get(day) || [];
    list.push(bday);
    map.set(day, list);
  }

  // Sort within each day so the order does not depend on how the list happens to be sorted.
  map.forEach((list: IBirthday[]) => list.sort((a, b) => a.name.localeCompare(b.name)));

  return map;
}

/**
 * Builds a whole number of weeks covering `month`, padded with the neighbouring
 * months' days. `firstDayOfWeek` is 0 for Sunday or 1 for Monday.
 */
export function buildMonthGrid(
  year: number,
  month: number,
  birthdaysByDay: Map<number, IBirthday[]>,
  firstDayOfWeek: number,
  today: Date = new Date()
): ICalendarCell[] {
  const isCurrentMonth: boolean = today.getFullYear() === year && today.getMonth() === month;

  const firstOfMonth: Date = new Date(year, month, 1);
  const startOffset: number = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth: number = new Date(year, month, 0).getDate();

  const cells: ICalendarCell[] = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push({
      date: daysInPrevMonth - startOffset + i + 1,
      inCurrentMonth: false,
      isToday: false,
      birthdays: []
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: d,
      inCurrentMonth: true,
      isToday: isCurrentMonth && today.getDate() === d,
      birthdays: birthdaysByDay.get(d) || []
    });
  }

  const remainder: number = cells.length % 7;
  if (remainder > 0) {
    const trailing: number = 7 - remainder;
    for (let d = 1; d <= trailing; d++) {
      cells.push({
        date: d,
        inCurrentMonth: false,
        isToday: false,
        birthdays: []
      });
    }
  }

  return cells;
}

const MS_PER_DAY: number = 24 * 60 * 60 * 1000;

/** The next date this birthday falls on, today included. */
function nextOccurrence(bday: IBirthday, from: Date): Date {
  for (let offset = 0; offset <= 1; offset++) {
    const year: number = from.getFullYear() + offset;
    const candidate: Date = new Date(year, bday.month, resolveDayInYear(bday.month, bday.day, year));
    if (candidate.getTime() >= from.getTime()) {
      return candidate;
    }
  }
  // Unreachable for valid input: next year's occurrence is always ahead of today.
  return new Date(from.getFullYear() + 1, bday.month, bday.day);
}

/**
 * The soonest birthdays from today onwards, soonest first, limited to `count`
 * entries falling within `withinDays`.
 */
export function getUpcomingBirthdays(
  birthdays: IBirthday[],
  today: Date,
  count: number,
  withinDays: number
): IUpcomingBirthday[] {
  const from: Date = startOfDay(today);

  return birthdays
    .map((birthday: IBirthday) => {
      const date: Date = nextOccurrence(birthday, from);
      return {
        birthday,
        date,
        daysAway: Math.round((date.getTime() - from.getTime()) / MS_PER_DAY)
      };
    })
    .filter((entry: IUpcomingBirthday) => entry.daysAway <= withinDays)
    .sort((a: IUpcomingBirthday, b: IUpcomingBirthday) => {
      if (a.daysAway !== b.daysAway) {
        return a.daysAway - b.daysAway;
      }
      return a.birthday.name.localeCompare(b.birthday.name);
    })
    .slice(0, count);
}
