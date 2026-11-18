export interface ITeamsCatalogItem {
  itemId: number;
  title: string;
  teamId: string;
  category: string;
  defaultRole: 'member' | 'owner';
}

export interface ISiteCatalogItem {
  itemId: number;
  title: string;
  siteUrl: string;
  businessOwner: string | null;
  category: string;
}

export type ApplicationProvisioningType = 'Manual' | 'GroupBased';

export interface IApplicationCatalogItem {
  itemId: number;
  title: string;
  owner: string | null;
  provisioningType: ApplicationProvisioningType;
  targetGroupId: string | null;
  approvalRequired: boolean;
  instructions: string;
  isActive: boolean;
}
