/**
 * The photo endpoint the SharePoint UI itself uses. Works with the site's own
 * credentials, so no Microsoft Graph permission is needed. Returns undefined when
 * there is no address to look up.
 */
export function getPhotoUrl(
  siteUrl: string,
  email: string | undefined,
  size: 'S' | 'M' | 'L' = 'M'
): string | undefined {
  if (!email) {
    return undefined;
  }
  const base: string = siteUrl.replace(/\/$/, '');
  return `${base}/_layouts/15/userphoto.aspx?size=${size}&username=${encodeURIComponent(email)}`;
}

/** `mailto:` link pre-filled with a subject, or undefined when there is no address. */
export function mailtoHref(email: string | undefined, subject: string): string | undefined {
  return email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}`
    : undefined;
}

/** Deep link that opens a 1:1 Teams chat with the person. */
export function teamsChatHref(email: string | undefined): string | undefined {
  return email
    ? `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`
    : undefined;
}
