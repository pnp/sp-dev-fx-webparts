import { AuditSourceType } from '../models/AuditModels';

export const isSafeRemediationUrl = (candidate: string, siteUrl: string): boolean => {
  if (!/^https?:\/\//i.test(candidate) && !candidate.startsWith('/')) {
    return false;
  }

  try {
    const url = new URL(candidate, siteUrl);
    const site = new URL(siteUrl);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.origin === site.origin && url.pathname.startsWith('/');
  } catch {
    return false;
  }
};

export const safeRemediationUrl = (candidate: string, siteUrl: string): string =>
  isSafeRemediationUrl(candidate, siteUrl) ? new URL(candidate, siteUrl).toString() : '';

export const buildRemediationUrl = (siteUrl: string, sourceType: AuditSourceType, listTitle: string, itemId: string): string => {
  const path = sourceType === 'page' ? '/SitePages/Forms/EditForm.aspx' : `/Lists/${encodeURIComponent(listTitle)}/EditForm.aspx`;
  return safeRemediationUrl(`${siteUrl.replace(/\/+$/, '')}${path}?ID=${encodeURIComponent(itemId)}`, siteUrl);
};
