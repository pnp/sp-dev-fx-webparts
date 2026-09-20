/**
 * One row from the absence list, normalised for the calendar.
 *
 * `start` and `end` are local date-only values (midnight in the browser's time
 * zone) and `end` is inclusive: a single-day absence has `start` and `end` on the
 * same day. See `parseSpDateOnly` in the service for why the raw SharePoint value
 * is not used directly.
 */
export interface IAbsence {
  id: number;
  /** Display name of the person who is away. */
  employeeName: string;
  /** Work e-mail, when the Person column resolves one. Drives the photo and the Email/Teams buttons. */
  employeeEmail?: string;
  /** Claims login name, e.g. i:0#.f|membership|alex@contoso.com. */
  employeeLogin?: string;
  /** Raw choice value from the list, e.g. "Vacation". Mapped to a colour by `getAbsenceTypeKey`. */
  type: string;
  /** Inclusive first day away, local midnight. */
  start: Date;
  /** Inclusive last day away, local midnight. */
  end: Date;
  notes?: string;
}

/** The six choices the sample list ships with. Any other value renders as "Other". */
export const ABSENCE_TYPES: string[] = [
  'Vacation',
  'Sick',
  'Parental',
  'Training',
  'Business trip',
  'Other'
];
