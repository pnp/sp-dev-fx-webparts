export interface IOrganizationReturnData {
  '@odata.context': string;
  value: IOrganization[];
}

export interface IOrganization {
  id: string;
  deletedDateTime?: any;
  businessPhones: string[];
  city: string;
  country?: any;
  countryLetterCode: string;
  createdDateTime: string;
  displayName: string;
  marketingNotificationEmails: any[];
  isMultipleDataLocationsForServicesEnabled?: any;
  onPremisesLastSyncDateTime: string;
  onPremisesLastPasswordSyncDateTime: string;
  onPremisesSyncEnabled: boolean;
  postalCode: string;
  preferredLanguage: string;
  securityComplianceNotificationMails: any[];
  securityComplianceNotificationPhones: any[];
  state?: any;
  street: string;
  technicalNotificationMails: string[];
  tenantType: string;
  privacyProfile?: any;
  assignedPlans: AssignedPlan[];
  provisionedPlans: ProvisionedPlan[];
  directorySizeQuota: DirectorySizeQuota;
  verifiedDomains: VerifiedDomain[];
}

interface VerifiedDomain {
  capabilities: string;
  isDefault: boolean;
  isInitial: boolean;
  name: string;
  type: string;
}

interface DirectorySizeQuota {
  used: number;
  total: number;
}

interface ProvisionedPlan {
  capabilityStatus: string;
  provisioningStatus: string;
  service: string;
}

interface AssignedPlan {
  assignedDateTime: string;
  capabilityStatus: string;
  service: string;
  servicePlanId: string;
}
