export type CandidateRejectionReason =
  | 'reserved'
  | 'collision'
  | 'collision-soft-deleted'
  | 'invalid';

export interface IRejectedCandidate {
  candidate: string;
  reason: CandidateRejectionReason;
}

export interface INamingResult {
  chosen: string | null;
  rejected: IRejectedCandidate[];
  alternatives: string[];
}

export type UpnAvailability = 'available' | 'taken' | 'taken-soft-deleted';

export type AvailabilityChecker = (
  upn: string,
  signal?: AbortSignal
) => Promise<UpnAvailability>;
