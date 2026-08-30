export const getTenantOrigin = (absoluteUrl: string): string | undefined => {
  try {
    const url: URL = new URL(absoluteUrl);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : undefined;
  } catch (_) {
    return undefined;
  }
};

export const getSafeSameTenantUrl = (rawUrl: string, tenantOrigin: string): string | undefined => {
  try {
    const base: URL = new URL(tenantOrigin);
    const url: URL = new URL(rawUrl, base.origin + '/');
    if ((base.protocol !== 'http:' && base.protocol !== 'https:') || url.origin !== base.origin || url.username || url.password) {
      return undefined;
    }
    return url.href;
  } catch (_) {
    return undefined;
  }
};
