export interface ITemplateLicense {
  skuPartNumber: string;
  required: boolean;
}

export interface ITemplateTeam {
  teamId: string;
  role: 'member' | 'owner';
}

export interface ITemplateSite {
  siteUrl: string;
  role: 'visitor' | 'member' | 'owner';
}

export interface IDepartmentTemplate {
  department: string;
  licenses: ITemplateLicense[];
  securityGroups: string[];
  m365Groups: string[];
  teams: ITemplateTeam[];
  sharePointSites: ITemplateSite[];
  applications: string[];
  approverGroupId: string | null;
  expirationPolicyDays: number | null;
  usageLocationDefault: string;
}

export interface ITemplateListItem {
  itemId: number;
  title: string;
  template: IDepartmentTemplate;
  isActive: boolean;
  version: number;
}
