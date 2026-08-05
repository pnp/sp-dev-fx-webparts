/**
 * Every state the search can be in.
 *
 * `permissionDenied` is deliberately not folded into `error`. A tenant that has
 * not yet approved the Microsoft Graph permission is a normal installation
 * step, not a failure, and it needs an administrative instruction rather than
 * an apology. Telling the two apart is the whole point of this union.
 */
export type SearchStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'empty'
  | 'permissionDenied'
  | 'error';

/**
 * Why a request did not produce results.
 *
 * The service maps whatever Microsoft Graph returned onto one of these once,
 * so no component ever reads an HTTP status code or an SDK message.
 */
export type SearchFailure =
  /** The tenant has not approved the permission. Needs an administrator. */
  | 'permissionDenied'
  /** The sign-in expired or is missing. Not an administrative problem. */
  | 'notAuthenticated'
  /** Microsoft Graph is throttling. Worth retrying, once, after a wait. */
  | 'throttled'
  /** Microsoft Graph had a problem of its own. Transient. */
  | 'serviceError'
  /** Anything else, including a network failure. */
  | 'unknown';

export interface ISearchError {
  /**
   * What is known about the failure, not what caused it. `permissionDenied`
   * means Microsoft Graph refused the call, which a pending approval, a
   * conditional access policy or a tenant restriction can all produce.
   */
  failure: SearchFailure;
  /** Seconds Microsoft Graph asked us to wait. Only ever set for `throttled`. */
  retryAfterSeconds?: number;
}
