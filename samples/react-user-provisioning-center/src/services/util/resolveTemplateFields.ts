import type { IAccessGrants, IDepartmentTemplate, ILicenseOption, ILicenseSelection } from '../../models';

export interface IResolvedTemplateFields {
  department: string;
  usageLocation: string | undefined;
  licenses: ILicenseSelection[];
  access: IAccessGrants;
  expirationReviewDays: number | null;
}

export function resolveTemplateFields(
  template: IDepartmentTemplate,
  licenseOptions: ILicenseOption[]
): IResolvedTemplateFields {
  const bySkuPart: Map<string, string> = new Map(licenseOptions.map((o) => [o.skuPartNumber, o.skuId]));
  const licenses: ILicenseSelection[] = template.licenses
    .map((l) => ({
      skuId: bySkuPart.get(l.skuPartNumber) ?? '',
      skuPartNumber: l.skuPartNumber,
      displayName: licenseOptions.filter((o) => o.skuPartNumber === l.skuPartNumber)[0]?.displayName
    }))
    .filter((l) => !!l.skuId);
  return {
    department: template.department,
    usageLocation: template.usageLocationDefault || undefined,
    licenses,
    access: {
      securityGroups: template.securityGroups,
      m365Groups: template.m365Groups,
      teams: template.teams,
      sharePointSites: template.sharePointSites,
      applications: template.applications
    },
    expirationReviewDays: template.expirationPolicyDays
  };
}
