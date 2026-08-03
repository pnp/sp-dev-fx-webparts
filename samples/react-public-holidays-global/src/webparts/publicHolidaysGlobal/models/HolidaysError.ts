/**
 * Why a holiday request failed. The UI needs to distinguish these: an
 * unsupported country code is the user's configuration, an unreachable API is
 * not, and only one of them is worth a retry button.
 */
export enum HolidaysErrorKind {
  UnknownCountry = 'unknownCountry',
  Unreachable = 'unreachable',
  ServiceError = 'serviceError'
}

export class HolidaysError extends Error {
  public readonly kind: HolidaysErrorKind;
  public readonly countryCode: string;
  public readonly year: number;
  public readonly status?: number;

  constructor(kind: HolidaysErrorKind, countryCode: string, year: number, status?: number) {
    super(`${kind}: ${countryCode} ${year}${status ? ` (HTTP ${status})` : ''}`);
    this.kind = kind;
    this.countryCode = countryCode;
    this.year = year;
    this.status = status;

    // Required when targeting ES5: without it, instanceof fails on subclasses
    // of built-ins.
    Object.setPrototypeOf(this, HolidaysError.prototype);
  }
}
