export interface IGroup {
  '@odata.type': string;
  id: string;
  deletedDateTime?: any;
  classification?: any;
  createdDateTime: string;
  creationOptions: string[];
  description: string;
  displayName: string;
  groupTypes: string[];
  isAssignableToRole?: any;
  mail: string;
  mailEnabled: boolean;
  mailNickname: string;
  onPremisesLastSyncDateTime?: string;
  onPremisesSecurityIdentifier?: string;
  onPremisesSyncEnabled?: boolean;
  preferredDataLocation?: any;
  proxyAddresses: string[];
  renewedDateTime: string;
  resourceBehaviorOptions: any[];
  resourceProvisioningOptions: string[];
  securityEnabled: boolean;
  visibility: string;
  onPremisesProvisioningErrors: any[];
}
