/**
 * Combines a date and time into a single Date instance.
 */
export const combineDateAndTime = (dateOnly: Date, timeOnly: Date): Date => {
  const combined = new Date(dateOnly);
  combined.setHours(timeOnly.getHours(), timeOnly.getMinutes(), 0, 0);
  return combined;
};

/**
 * Formats local date to ISO string without timezone offset.
 */
export const formatLocalAsISO = (date: Date): string => {
  const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
};
