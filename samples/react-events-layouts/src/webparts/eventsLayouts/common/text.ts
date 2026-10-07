/** Converts rich text (HTML) to trimmed plain text without executing any markup. */
export function toPlainText(html: string | undefined): string | undefined {
  if (!html) {
    return undefined;
  }
  const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  return normalized || undefined;
}
