export interface ITeam {
  guestSettings: GuestSettings;
  memberSettings: GuestSettings;
  messagingSettings: GuestSettings;
  funSettings: GuestSettings;
  discoverySettings: GuestSettings;
  internalId: string;
  isArchived: boolean;
  webUrl: string;
  displayName: string;
  description: string;
  classification: string;
  specialization: string;
  visibility: string;
  classSettings: GuestSettings;
  isMembershipLimitedToOwners: string;
  id:string;
}

interface GuestSettings {
  '@odata.type': string;
}