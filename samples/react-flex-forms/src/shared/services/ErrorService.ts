import type { HttpRequestError } from '@pnp/queryable';

export function toUserMessage(error: unknown): string {
  if (isHttpRequestError(error)) {
    switch (error.status) {
      case 400:
        return 'SharePoint rejected the request. Check the form and target list configuration.';
      case 403:
        return 'You do not have permission to complete this action.';
      case 404:
        return 'The configured form or target list could not be found.';
      case 429:
        return 'SharePoint is busy. Wait a moment, then try again.';
    }
  }

  return 'Something went wrong. Try again or contact the site owner.';
}

export function isHttpRequestError(error: unknown): error is HttpRequestError {
  return typeof error === 'object' && error !== null &&
    'isHttpRequestError' in error && error.isHttpRequestError === true &&
    'status' in error && typeof error.status === 'number' &&
    'statusText' in error && typeof error.statusText === 'string';
}
