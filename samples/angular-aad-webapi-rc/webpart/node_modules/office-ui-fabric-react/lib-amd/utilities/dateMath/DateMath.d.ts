/**
 * Returns a date offset from the given date by the specified number of days.
 * @param {Date} date - The origin date
 * @param {number} days - The number of days to offset. 'days' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of days
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Returns a date offset from the given date by the specified number of weeks.
 * @param {Date} date - The origin date
 * @param {number} weeks - The number of weeks to offset. 'weeks' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of weeks
 */
export declare function addWeeks(date: Date, weeks: number): Date;
/**
 * Returns a date offset from the given date by the specified number of months.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} months - The number of months to offset. 'months' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of months
 */
export declare function addMonths(date: Date, months: number): Date;
/**
 * Returns a date offset from the given date by the specified number of years.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} years - The number of years to offset. 'years' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of years
 */
export declare function addYears(date: Date, years: number): Date;
/**
 * Returns a date that is a copy of the given date, aside from the month changing to the given month.
 *  The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} month - The 0-based index of the month to set on the date.
 * @return {Date} A new Date object with the given month set.
 */
export declare function setMonth(date: Date, month: number): Date;
/**
 * Compares two dates, and returns true if the two dates (not accounting for time-of-day) are equal.
 * @return {boolean} True if the two dates represent the same date (regardless of time-of-day), false otherwise.
 */
export declare function compareDates(date1: Date, date2: Date): boolean;
