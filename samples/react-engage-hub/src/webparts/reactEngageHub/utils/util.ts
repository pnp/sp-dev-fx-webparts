/**
 * Formats a given date into a human-readable string based on the time difference
 * between the current date and the provided date.
 *
 * - If the difference is less than 60 seconds, it returns "just now".
 * - If the difference is less than 60 minutes, it returns the number of minutes followed by "m".
 * - If the difference is less than 24 hours, it returns the number of hours followed by "h".
 * - If the difference is less than 7 days, it returns the number of days followed by "d".
 * - Otherwise, it returns the absolute date in the format "MMM d" (e.g., "Apr 27").
 *
 * @param date - The date to format.
 * @returns A formatted string representing the relative or absolute date.
 */
export const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return "Just now"
  } else if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else if (days < 7) {
    return `${days}d ago`
  } else {
    // Show absolute date as "MMM d" (e.g., "Apr 27")
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    }
    return date.toLocaleDateString(undefined, options)
  }
}
