const absoluteUrlExpression = /^https?:\/\//i;

const sharePointHostExpression = /\.sharepoint(\.com|\.us|\.de|\.cn)$/i;

export const isSharePointHost = (hostname: string): boolean => sharePointHostExpression.test(hostname);

export const tryParseUrl = (value: string): URL | undefined => {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
};

export const isSharePointUrl = (value: string): boolean => {
  const parsed = tryParseUrl(value);
  return !!parsed && parsed.protocol === 'https:' && isSharePointHost(parsed.hostname);
};

export const isSameOrigin = (candidateUrl: string, origin: string): boolean => {
  const parsed = tryParseUrl(candidateUrl);
  return !!parsed && parsed.origin.toLowerCase() === origin.toLowerCase();
};

export const ensureAbsoluteUrl = (siteUrl: string, candidateUrl: string): string => {
  if (absoluteUrlExpression.test(candidateUrl)) {
    return candidateUrl;
  }

  const base = new URL(siteUrl);
  if (candidateUrl.startsWith('/')) {
    return `${base.origin}${candidateUrl}`;
  }

  return `${base.origin}${base.pathname.replace(/\/$/, '')}/${candidateUrl.replace(/^\//, '')}`;
};

export const toDecodedServerRelativePath = (absoluteUrl: string): string => {
  const parsed = new URL(absoluteUrl);
  try {
    return decodeURIComponent(parsed.pathname);
  } catch {
    return parsed.pathname;
  }
};

const encodeODataValue = (value: string): string =>
  encodeURIComponent(value.replace(/'/g, "''"))
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');

export const odataStringLiteral = (value: string): string => `'${encodeODataValue(value)}'`;

export const odataPathLiteral = (path: string): string =>
  `'${encodeODataValue(path).replace(/%2F/gi, '/')}'`;

export const normalizePageName = (pageName: string): string => {
  return pageName.toLowerCase().endsWith('.aspx') ? pageName : `${pageName}.aspx`;
};

export const stripAspxExtension = (pageName: string): string => pageName.replace(/\.aspx$/i, '');

export const sanitizeFolderName = (value: string): string => {
  const sanitized = value
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 100);

  return sanitized || 'page';
};

export const sanitizeFileName = (value: string): string => {
  const sanitized = value
    .replace(/["*:<>?/\\|#%]/g, '-')
    .replace(/^[.~\s]+/, '')
    .replace(/[.\s]+$/, '')
    .slice(0, 128);

  return sanitized || 'asset';
};

export const normalizeSlashes = (path: string): string => path.replace(/\/{2,}/g, '/');

export const toSitePath = (siteUrl: string): string => new URL(siteUrl).pathname.replace(/\/$/, '');

export const toServerRelativePath = (siteUrl: string, ...segments: ReadonlyArray<string>): string =>
  normalizeSlashes(`${toSitePath(siteUrl)}/${segments.join('/')}`);

export const toAbsoluteUrl = (siteUrl: string, serverRelativePath: string): string =>
  `${new URL(siteUrl).origin}${normalizeSlashes(serverRelativePath)}`;

export const sitePagesPath = (siteUrl: string, pageName: string, folder = ''): string =>
  toServerRelativePath(
    siteUrl,
    'SitePages',
    ...folder.split('/').filter(Boolean),
    normalizePageName(pageName)
  );

export const sitePagesUrl = (siteUrl: string, pageName: string, folder = ''): string =>
  toAbsoluteUrl(siteUrl, sitePagesPath(siteUrl, pageName, folder));

export const sitePagesSubfolder = (pagePath: string): string => {
  const segments = normalizeSlashes(pagePath).split('/').filter(Boolean);
  const libraryIndex = segments.findIndex((segment) => segment.toLowerCase() === 'sitepages');

  if (libraryIndex === -1 || libraryIndex >= segments.length - 1) {
    return '';
  }

  return segments.slice(libraryIndex + 1, -1).join('/');
};

export const replaceAllUrls = (value: string, replacements: ReadonlyMap<string, string>): string => {
  let updatedValue = value;

  [...replacements.entries()]
    .sort((left, right) => right[0].length - left[0].length)
    .forEach(([sourceUrl, targetUrl]) => {
      if (sourceUrl) {
        updatedValue = updatedValue.split(sourceUrl).join(targetUrl);
      }
    });

  return updatedValue;
};
