import { IDateRange } from "../models"

// Native-Date calendar helpers. Kept dependency-free (no date-fns/moment) since
// the allowed-package list doesn't include a date library.

export function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

// First visible cell of the month grid: the `firstDayOfWeek`-aligned day on or
// before the 1st of the month.
function startOfCalendar(anchor: Date, firstDayOfWeek: number): Date {
  const first = startOfDay(new Date(anchor.getFullYear(), anchor.getMonth(), 1))
  const offset = (first.getDay() - firstDayOfWeek + 7) % 7
  return addDays(first, -offset)
}

// Six weeks × 7 days covering the month that `anchor` falls in. Six rows keeps
// the grid height stable across months.
export function getMonthMatrix(anchor: Date, firstDayOfWeek: number): Date[][] {
  const start = startOfCalendar(anchor, firstDayOfWeek)
  const weeks: Date[][] = []
  for (let w = 0; w < 6; w++) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(addDays(start, w * 7 + d))
    }
    weeks.push(week)
  }
  return weeks
}

// Inclusive-start / exclusive-end window covering the full visible month grid,
// used to scope the read query.
export function getMonthRange(anchor: Date, firstDayOfWeek: number): IDateRange {
  const matrix = getMonthMatrix(anchor, firstDayOfWeek)
  const first = matrix[0][0]
  const last = matrix[matrix.length - 1][6]
  return { start: first, end: addDays(last, 1) }
}

// Weekday header labels in display order, localized, starting at firstDayOfWeek.
export function getWeekdayLabels(
  firstDayOfWeek: number,
  locale: string,
  format: "short" | "long" = "short",
): string[] {
  const base = new Date(2021, 7, 1) // a Sunday
  const labels: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = addDays(base, (firstDayOfWeek + i) % 7)
    labels.push(d.toLocaleDateString(locale, { weekday: format }))
  }
  return labels
}

// First day of the week `date` falls in, aligned to firstDayOfWeek.
export function startOfWeek(date: Date, firstDayOfWeek: number): Date {
  const d = startOfDay(date)
  const offset = (d.getDay() - firstDayOfWeek + 7) % 7
  return addDays(d, -offset)
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7)
}

// The seven days of the week `date` falls in, in display order.
export function getWeekDays(date: Date, firstDayOfWeek: number): Date[] {
  const start = startOfWeek(date, firstDayOfWeek)
  const days: Date[] = []
  for (let i = 0; i < 7; i++) days.push(addDays(start, i))
  return days
}

// Inclusive-start / exclusive-end window for the visible week.
export function getWeekRange(date: Date, firstDayOfWeek: number): IDateRange {
  const start = startOfWeek(date, firstDayOfWeek)
  return { start, end: addDays(start, 7) }
}

// e.g. "Jul 27 – Aug 2, 2026" (drops the repeated month when both ends share it).
export function formatWeekLabel(
  date: Date,
  firstDayOfWeek: number,
  locale: string,
): string {
  const start = startOfWeek(date, firstDayOfWeek)
  const end = addDays(start, 6)
  const startStr = start.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  })
  const endStr = end.toLocaleDateString(
    locale,
    start.getMonth() === end.getMonth()
      ? { day: "numeric", year: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" },
  )
  return `${startStr} – ${endStr}`
}
