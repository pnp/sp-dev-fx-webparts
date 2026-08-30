import { DashboardError } from './errors';

export function toSafeTenantUrl(candidate: string, tenantUrl: string): string {
  let tenant: URL;
  let url: URL;
  try {
    tenant = new URL(tenantUrl);
    url = new URL(candidate, tenant);
  } catch (_) {
    throw new DashboardError('invalid-config', 'The source URL is not valid.');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== tenant.origin || url.username || url.password || url.hash) {
    throw new DashboardError('invalid-config', 'The source URL must stay on the current SharePoint tenant.');
  }
  return url.toString();
}
