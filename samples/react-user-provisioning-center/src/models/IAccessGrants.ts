import type { ITemplateSite, ITemplateTeam } from './ITemplate';

export interface IAccessGrants {
  securityGroups: string[];
  m365Groups: string[];
  teams: ITemplateTeam[];
  sharePointSites: ITemplateSite[];
  applications: string[];
}

export const EMPTY_ACCESS_GRANTS: IAccessGrants = {
  securityGroups: [],
  m365Groups: [],
  teams: [],
  sharePointSites: [],
  applications: []
};

export function hasAnyAccessGrant(grants: IAccessGrants): boolean {
  return (
    grants.securityGroups.length > 0 ||
    grants.m365Groups.length > 0 ||
    grants.teams.length > 0 ||
    grants.sharePointSites.length > 0 ||
    grants.applications.length > 0
  );
}
