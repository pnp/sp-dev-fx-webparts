export class PathValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'PathValidationError';
    Object.setPrototypeOf(this, PathValidationError.prototype);
  }
}

function containsControlCharacter(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

/** Return a canonical decoded server-relative path, or reject an unsafe path. */
export function normalizeServerRelativePath(value: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new PathValidationError('A server-relative path is required.');
  }

  const raw = value.trim();
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.indexOf('?') !== -1 || raw.indexOf('#') !== -1 || raw.indexOf('\\') !== -1) {
    throw new PathValidationError('The path must be server-relative and cannot contain a query, fragment, or backslash.');
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    throw new PathValidationError('The path contains invalid URL encoding.');
  }

  if (containsControlCharacter(decoded) || decoded.indexOf('\\') !== -1) {
    throw new PathValidationError('The path contains invalid characters.');
  }

  const segments = decoded.split('/');
  while (segments.length > 1 && segments[segments.length - 1] === '') {
    segments.pop();
  }
  if (segments[0] !== '' || segments.some((segment, index) => (index > 0 && segment === '') || segment === '.' || segment === '..')) {
    throw new PathValidationError('The path contains an empty, current, or parent segment.');
  }
  return segments.join('/') || '/';
}

export function isPathWithinRoot(rootPath: string, candidatePath: string): boolean {
  try {
    const root = normalizeServerRelativePath(rootPath).toLowerCase();
    const candidate = normalizeServerRelativePath(candidatePath).toLowerCase();
    return candidate === root || (root === '/' ? candidate.startsWith('/') : candidate.startsWith(`${root}/`));
  } catch {
    return false;
  }
}

export function resolveFolderPath(rootPath: string, folderPath: string): string {
  const root = normalizeServerRelativePath(rootPath);
  const folder = normalizeServerRelativePath(folderPath);
  if (!isPathWithinRoot(root, folder)) {
    throw new PathValidationError('The folder is outside the configured library root.');
  }
  return folder;
}

/** Join an API-provided child name only after treating it as one path segment. */
export function joinServerRelativePath(parentPath: string, childName: string): string {
  const parent = normalizeServerRelativePath(parentPath);
  if (typeof childName !== 'string' || childName.trim() === '' || childName === '.' || childName === '..' || childName.indexOf('/') !== -1 || childName.indexOf('\\') !== -1 || containsControlCharacter(childName)) {
    throw new PathValidationError('The child name is not a valid path segment.');
  }
  return normalizeServerRelativePath(`${parent === '/' ? '' : parent}/${encodeURIComponent(childName)}`);
}

function encodeServerRelativePath(path: string): string {
  return path.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
}

export function getSafeSharePointFileUrl(serverRelativeUrl: string, webUrl: string, libraryRoot: string): string {
  const filePath = normalizeServerRelativePath(serverRelativeUrl);
  if (!isPathWithinRoot(libraryRoot, serverRelativeUrl)) {
    throw new PathValidationError('The file is outside the configured library root.');
  }

  let base: URL;
  try {
    base = new URL(webUrl);
  } catch {
    throw new PathValidationError('The SharePoint web URL is invalid.');
  }
  if (base.protocol !== 'https:' && base.protocol !== 'http:') {
    throw new PathValidationError('The SharePoint web URL is not safe.');
  }

  const safeUrl = new URL(encodeServerRelativePath(filePath), base.origin);
  if (safeUrl.origin !== base.origin) {
    throw new PathValidationError('The file URL is not on the SharePoint web origin.');
  }
  return safeUrl.toString();
}

export function getSafeSharePointDownloadUrl(serverRelativeUrl: string, webUrl: string, libraryRoot: string): string {
  const url = new URL(getSafeSharePointFileUrl(serverRelativeUrl, webUrl, libraryRoot));
  url.searchParams.set('download', '1');
  return url.toString();
}

export function formatFileSize(bytes: number | undefined): string {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value >= 10 || Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
}

export function formatModifiedDate(value: string | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}
