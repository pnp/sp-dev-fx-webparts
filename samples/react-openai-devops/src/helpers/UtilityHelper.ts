import { DateTime } from "luxon";

export function stripHtml(htmlString: string) {
  const pattern = /<[^>]+>/g;
  const strippedString = htmlString.replace(pattern, "");
  return strippedString;
}
export function getRelativeTime(dateString: string): string {
  const now = DateTime.now().toMillis();
  const date = DateTime.fromISO(dateString).toMillis();

  const difference = now - date;

  if (difference < 60 * 1000) {
    return `${Math.round(difference / 1000)} seconds ago`;
  } else if (difference < 60 * 60 * 1000) {
    return `${Math.round(difference / 60000)} minutes ago`;
  } else if (difference < 24 * 60 * 60 * 1000) {
    return `${Math.round(difference / 3600000)} hours ago`;
  } else {
    return `${Math.round(difference / 86400000)} days ago`;
  }
}
export function getInitials(fullName: string): string {
  const initials = [];
  const words = fullName.split(" ");
  for (const word of words) {
    initials.push(word[0].toUpperCase());
  }
  return initials.join("");
}
