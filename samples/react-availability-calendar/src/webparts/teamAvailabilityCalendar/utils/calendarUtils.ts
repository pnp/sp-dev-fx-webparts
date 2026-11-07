import type { IAbsence } from '../models/IAbsence';

/** One day cell in the month grid. `date` is at local midnight. */
export interface IDayCell {
  date: Date;
  day: number; // 1..31
  inCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

/** One row of the grid: seven cells normally, five when weekends are hidden. */
export type IWeek = IDayCell[];

/** A single absence drawn as one horizontal bar inside one week row. */
export interface IAbsenceBar {
  absence: IAbsence;
  /** 0-based stacking row within the week. */
  lane: number;
  /** Column the bar starts in, 0 (first cell shown) to `week.length - 1`. */
  startCol: number;
  /** Width of the bar in columns. */
  span: number;
  /** Part of this absence is shown in an earlier week row; draw a flat left edge. */
  continuesLeft: boolean;
  /** Part of this absence is shown in a later week row; draw a flat right edge. */
  continuesRight: boolean;
}

export interface IWeekLayout {
  week: IWeek;
  bars: IAbsenceBar[];
  /** Absences hidden because their lane is past `maxLanes`, counted per column. */
  overflowByDay: number[];
  /** Total absences covering each column, before any lane capping. Feeds the capacity tint. */
  countByDay: number[];
}

/** An entry in the "Out this week" strip. */
export interface IOutEntry {
  absence: IAbsence;
  /** The person is away today. */
  activeToday: boolean;
  /** First day within the window they are away (today if already away), local midnight. */
  from: Date;
}

export interface IGridOptions {
  startWeekOnMonday: boolean;
  showWeekends: boolean;
}

export const MS_PER_DAY = 86400000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Whole days from `a` to `b` (`b - a`), each snapped to local midnight first so a
 * clock change inside the range still yields a whole number.
 */
export function diffDays(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_PER_DAY);
}

/**
 * Builds a whole number of week rows covering `month`, padded with the
 * neighbouring months' days. Rows have seven cells, or five (Monday-first, no
 * Saturday/Sunday) when `options.showWeekends` is false.
 */
export function buildMonthWeeks(
  year: number,
  month: number,
  options: IGridOptions,
  today: Date = new Date()
): IWeek[] {
  const firstDayOfWeek: number = options.showWeekends
    ? options.startWeekOnMonday
      ? 1
      : 0
    : 1;
  const firstOfMonth: Date = new Date(year, month, 1);
  const startOffset: number = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  const gridStart: Date = addDays(firstOfMonth, -startOffset);
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const weekCount: number = Math.ceil((startOffset + daysInMonth) / 7);
  const todayMid: Date = startOfDay(today);

  const weeks: IWeek[] = [];
  for (let w = 0; w < weekCount; w++) {
    const week: IDayCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date: Date = addDays(gridStart, w * 7 + d);
      const dow: number = date.getDay();
      const isWeekend: boolean = dow === 0 || dow === 6;
      if (!options.showWeekends && isWeekend) {
        continue;
      }
      week.push({
        date,
        day: date.getDate(),
        inCurrentMonth: date.getMonth() === month,
        isToday: isSameDay(date, todayMid),
        isWeekend
      });
    }
    weeks.push(week);
  }
  return weeks;
}

function layoutWeek(
  week: IWeek,
  absences: IAbsence[],
  maxLanes: number,
  prevBoundary: Date | undefined,
  nextBoundary: Date | undefined,
  standalone: boolean = false
): IWeekLayout {
  const cols: number = week.length;
  const weekStart: Date = week[0].date;
  const weekEnd: Date = week[cols - 1].date;
  const overflowByDay: number[] = new Array(cols).fill(0) as number[];
  const countByDay: number[] = new Array(cols).fill(0) as number[];

  interface ISegment {
    absence: IAbsence;
    startCol: number;
    endCol: number;
    continuesLeft: boolean;
    continuesRight: boolean;
  }

  const segments: ISegment[] = [];
  for (const absence of absences) {
    if (diffDays(absence.start, weekEnd) < 0 || diffDays(weekStart, absence.end) < 0) {
      continue;
    }

    // First shown column on or after the start, last shown column on or before the end.
    let startCol = 0;
    while (startCol < cols && diffDays(absence.start, week[startCol].date) < 0) {
      startCol++;
    }
    let endCol: number = cols - 1;
    while (endCol >= 0 && diffDays(week[endCol].date, absence.end) < 0) {
      endCol--;
    }
    if (startCol > endCol) {
      // Only touches hidden weekend days in this row.
      continue;
    }

    for (let c = startCol; c <= endCol; c++) {
      countByDay[c]++;
    }

    segments.push({
      absence,
      startCol,
      endCol,
      // Standalone (week view): an arrow whenever the absence reaches past this
      // row's real edges. Multi-week (month view): only when a visible portion
      // lands in an adjacent row, so a hidden weekend does not trigger one.
      continuesLeft: standalone
        ? diffDays(weekStart, absence.start) < 0
        : prevBoundary !== undefined && diffDays(absence.start, prevBoundary) >= 0,
      continuesRight: standalone
        ? diffDays(weekEnd, absence.end) > 0
        : nextBoundary !== undefined && diffDays(nextBoundary, absence.end) >= 0
    });
  }

  // Deterministic order so lanes do not depend on list sort: earliest start,
  // then longest run, then name, then id.
  segments.sort(
    (x, y) =>
      x.startCol - y.startCol ||
      y.endCol - y.startCol - (x.endCol - x.startCol) ||
      x.absence.employeeName.localeCompare(y.absence.employeeName) ||
      x.absence.id - y.absence.id
  );

  const laneLastCol: number[] = [];
  const bars: IAbsenceBar[] = [];
  for (const seg of segments) {
    let lane: number = laneLastCol.findIndex((last) => last < seg.startCol);
    if (lane === -1) {
      lane = laneLastCol.length;
    }
    laneLastCol[lane] = seg.endCol;

    if (lane >= maxLanes) {
      for (let c = seg.startCol; c <= seg.endCol; c++) {
        overflowByDay[c]++;
      }
      continue;
    }

    bars.push({
      absence: seg.absence,
      lane,
      startCol: seg.startCol,
      span: seg.endCol - seg.startCol + 1,
      continuesLeft: seg.continuesLeft,
      continuesRight: seg.continuesRight
    });
  }

  return { week, bars, overflowByDay, countByDay };
}

/** Lays out every week's bars and per-day overflow counts. */
export function layoutWeeks(
  weeks: IWeek[],
  absences: IAbsence[],
  maxLanes: number
): IWeekLayout[] {
  return weeks.map((week, i) =>
    layoutWeek(
      week,
      absences,
      maxLanes,
      i > 0 ? weeks[i - 1][weeks[i - 1].length - 1].date : undefined,
      i < weeks.length - 1 ? weeks[i + 1][0].date : undefined
    )
  );
}

/**
 * The single week row containing `anchor`, honouring the same first-day and
 * weekend options as the month grid.
 */
export function buildWeek(anchor: Date, options: IGridOptions, today: Date = new Date()): IWeek {
  const firstDayOfWeek: number = options.showWeekends
    ? options.startWeekOnMonday
      ? 1
      : 0
    : 1;
  const anchorMid: Date = startOfDay(anchor);
  const offset: number = (anchorMid.getDay() - firstDayOfWeek + 7) % 7;
  const weekStart: Date = addDays(anchorMid, -offset);
  const todayMid: Date = startOfDay(today);

  const week: IDayCell[] = [];
  for (let d = 0; d < 7; d++) {
    const date: Date = addDays(weekStart, d);
    const dow: number = date.getDay();
    const isWeekend: boolean = dow === 0 || dow === 6;
    if (!options.showWeekends && isWeekend) {
      continue;
    }
    week.push({
      date,
      day: date.getDate(),
      inCurrentMonth: true, // no month dimming in the week view
      isToday: isSameDay(date, todayMid),
      isWeekend
    });
  }
  return week;
}

/** Lays out one week on its own, with arrows for any absence reaching past its edges. */
export function layoutSingleWeek(
  week: IWeek,
  absences: IAbsence[],
  maxLanes: number
): IWeekLayout {
  return layoutWeek(week, absences, maxLanes, undefined, undefined, true);
}

/** Everyone away on `date`, sorted by name. */
export function getAbsencesForDay(absences: IAbsence[], date: Date): IAbsence[] {
  return absences
    .filter((a) => diffDays(a.start, date) >= 0 && diffDays(date, a.end) >= 0)
    .sort((x, y) => x.employeeName.localeCompare(y.employeeName) || x.id - y.id);
}

/**
 * Absences that overlap the `windowDays`-day window starting today, soonest first.
 * Feeds the "Out this week" strip above the grid.
 */
export function getOutThisWeek(
  absences: IAbsence[],
  today: Date,
  windowDays: number = 7
): IOutEntry[] {
  const start: Date = startOfDay(today);
  const end: Date = addDays(start, windowDays - 1);

  return absences
    .filter((a) => diffDays(a.start, end) >= 0 && diffDays(start, a.end) >= 0)
    .map((a) => {
      const activeToday: boolean =
        diffDays(a.start, start) >= 0 && diffDays(start, a.end) >= 0;
      return { absence: a, activeToday, from: activeToday ? start : startOfDay(a.start) };
    })
    .sort(
      (x, y) =>
        diffDays(y.from, x.from) ||
        x.absence.employeeName.localeCompare(y.absence.employeeName) ||
        x.absence.id - y.absence.id
    );
}

/**
 * Normalises a list choice value to a stable key used for the bar colour, icon
 * and legend grouping.
 *
 * Known values (and a few synonyms) map to a fixed key with a hand-picked colour.
 * Any other non-empty value gets its own `x-<slug>` key so distinct custom
 * categories keep distinct colours. Empty values fall back to `other`.
 */
export function getAbsenceTypeKey(type: string): string {
  const normalised: string = (type || '').trim().toLowerCase();
  switch (normalised) {
    case 'vacation':
    case 'holiday':
    case 'annual leave':
      return 'vacation';
    case 'sick':
    case 'sick leave':
      return 'sick';
    case 'parental':
    case 'parental leave':
    case 'maternity':
    case 'paternity':
      return 'parental';
    case 'training':
    case 'course':
      return 'training';
    case 'business trip':
    case 'travel':
      return 'businessTrip';
    case '':
      return 'other';
    default: {
      const slug: string = normalised.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return slug ? `x-${slug}` : 'other';
    }
  }
}

/** Formats an inclusive day range for tooltips and the details panel. */
export function formatDateRange(start: Date, end: Date, locale?: string): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const withYear: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  if (isSameDay(start, end)) {
    return new Intl.DateTimeFormat(locale, withYear).format(start);
  }
  const sameYear: boolean = start.getFullYear() === end.getFullYear();
  return (
    new Intl.DateTimeFormat(locale, sameYear ? opts : withYear).format(start) +
    ' – ' +
    new Intl.DateTimeFormat(locale, withYear).format(end)
  );
}
