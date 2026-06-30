/**
 * Keywords that indicate an access-denied / authentication error.
 * Covers SharePoint REST error codes, HTTP status strings, and common phrasing.
 */
const ACCESS_DENIED_KEYWORDS: string[] = [
  'access denied',
  'accessdenied',
  'unauthorized',
  '401',
  '403',
  '-2147024891', // SharePoint access-denied HRESULT
  '1926',        // SharePoint access-denied error code
];

/**
 * Generic message shown when a user lacks the required permissions.
 */
export const ACCESS_DENIED_MESSAGE =
  'You do not have permission to perform this action. Please contact your SharePoint administrator.';

/**
 * Generic message shown for any unexpected error that is not access-related.
 */
export const GENERIC_ERROR_MESSAGE =
  'Something went wrong. Please try again or contact your administrator.';

/**
 * Returns a safe, user-facing error message for the given caught value.
 *
 * - If the error looks like an access-denied / 401 / 403 error, returns
 *   `ACCESS_DENIED_MESSAGE`.
 * - For all other errors, returns `GENERIC_ERROR_MESSAGE`.
 *
 * Raw exception messages are **never** surfaced to the user.
 */
export function getErrorMessage(err: unknown): string {
  const raw = err instanceof Error
    ? err.message.toLowerCase()
    : String(err).toLowerCase();

  const isAccessDenied = ACCESS_DENIED_KEYWORDS.some((keyword) => raw.includes(keyword));

  return isAccessDenied ? ACCESS_DENIED_MESSAGE : GENERIC_ERROR_MESSAGE;
}
